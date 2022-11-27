// import * as React from 'react';
// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';

// import App from './App';

// const rootElement = document.getElementById('root');
// const root = createRoot(rootElement);

// root.render(

//     <App />

// );

import * as React from "react";
import { render } from "react-dom";
import { useState } from "react";
import { columns as dataColumns } from "./columns";
import { rows as dataRows, headerRow } from "./rows";
import {
  ReactGrid,
  Row,
  CellChange,
  ChevronCell,
  NumberCell
} from "@silevis/reactgrid";
import { Recetaunit, composition } from "./data";
import "@silevis/reactgrid/styles.css";
import "./styles.css";
import { calc } from "./Outputvariables";
import { Line } from "react-chartjs-2";
import { getChartOptions } from "./getChartOptions";
import { getChartData } from "./getChartData";

/* 
  searches for a chevron cell in given row
*/
const findChevronCell = (row: Row) =>
  row.cells.find((cell) => cell.type === "chevron") as ChevronCell | undefined;

/* 
  searches for a parent of given row
*/
const findParentRow = (rows: Row[], row: Row) =>
  rows.find((r) => {
    const foundChevronCell = findChevronCell(row);
    return foundChevronCell ? r.rowId === foundChevronCell.parentId : false;
  });

/* 
  check if the row has children
*/
const hasChildren = (rows: Row[], row: Row): boolean =>
  rows.some((r) => {
    const foundChevronCell = findChevronCell(r);
    return foundChevronCell ? foundChevronCell.parentId === row.rowId : false;
  });

/* 
  Checks is row expanded
*/
const isRowFullyExpanded = (rows: Row[], row: Row): boolean => {
  const parentRow = findParentRow(rows, row);
  if (parentRow) {
    const foundChevronCell = findChevronCell(parentRow);
    if (foundChevronCell && !foundChevronCell.isExpanded) return false;
    return isRowFullyExpanded(rows, parentRow);
  }
  return true;
};

const getExpandedRows = (rows: Row[]): Row[] =>
  rows.filter((row) => {
    const areAllParentsExpanded = isRowFullyExpanded(rows, row);
    return areAllParentsExpanded !== undefined ? areAllParentsExpanded : true;
  });

const getDirectChildRows = (rows: Row[], parentRow: Row): Row[] =>
  rows.filter(
    (row) =>
      !!row.cells.find(
        (cell) =>
          cell.type === "chevron" &&
          (cell as ChevronCell).parentId === parentRow.rowId
      )
  );

const assignIndentAndHasChildren = (
  rows: Row[],
  parentRow: Row,
  indent: number = 0
) => {
  ++indent;
  getDirectChildRows(rows, parentRow).forEach((row) => {
    const foundChevronCell = findChevronCell(row);
    const hasRowChildrens = hasChildren(rows, row);
    if (foundChevronCell) {
      foundChevronCell.indent = indent;
      foundChevronCell.hasChildren = hasRowChildrens;
    }
    if (hasRowChildrens) assignIndentAndHasChildren(rows, row, indent);
  });
};

const buildTree = (rows: Row[]): Row[] =>
  rows.map((row) => {
    const foundChevronCell = findChevronCell(row);
    if (foundChevronCell && !foundChevronCell.parentId) {
      const hasRowChildrens = hasChildren(rows, row);
      foundChevronCell.hasChildren = hasRowChildrens;
      if (hasRowChildrens) assignIndentAndHasChildren(rows, row);
    }
    return row;
  });

const initcompvalues = composition.map((x) => x.initvalue);
const MembApp: React.FunctionComponent = () => {
  const [columns] = useState(() => dataColumns());
  const [rows, setRows] = useState(() =>
    buildTree(
      dataRows(
        calc(
          Recetaunit.Feed,
          Recetaunit.WCF,
          Recetaunit.Diaw_Perm,
          initcompvalues
        ).datatable
      )
    )
  );
  const [rowsToRender, setRowsToRender] = useState<Row[]>([
    headerRow,
    ...getExpandedRows(rows)
  ]);

  const handleChanges = (changes: CellChange<NumberCell>[]) => {
    const newRows = [...rows];
    changes.forEach((change) => {
      const changeRowIdx = rows.findIndex((el) => el.rowId === change.rowId);
      const changeColumnIdx = columns.findIndex(
        (el) => el.columnId === change.columnId
      );
      newRows[changeRowIdx].cells[changeColumnIdx] = change.newCell;
    });

    const newinitcompvalues = newRows
      .slice(15, 26)
      .map((x) => x.cells[2].value);
    const newFeed = newRows[8].cells[2].value;
    const newWCF = newRows[13].cells.slice(3).map((x) => x.value);
    const newDiaw_Perm = newRows[12].cells.slice(3).map((x) => x.value);
    const datatable = calc(newFeed, newWCF, newDiaw_Perm, newinitcompvalues)
      .datatable;
    const row1 = dataRows(datatable);

    row1[row1.findIndex((x) => x.rowId === "Config")].cells[0] =
      newRows[newRows.findIndex((x) => x.rowId === "Config")].cells[0];
    row1[row1.findIndex((x) => x.rowId === "Retentate")].cells[0] =
      newRows[newRows.findIndex((x) => x.rowId === "Retentate")].cells[0];
    row1[row1.findIndex((x) => x.rowId === "r_Comp_retentate")].cells[0] =
      newRows[
        newRows.findIndex((x) => x.rowId === "r_Comp_retentate")
      ].cells[0];
    row1[row1.findIndex((x) => x.rowId === "r_TOP")].cells[0] =
      newRows[newRows.findIndex((x) => x.rowId === "r_TOP")].cells[0];
    row1[row1.findIndex((x) => x.rowId === "r_TRU")].cells[0] =
      newRows[newRows.findIndex((x) => x.rowId === "r_TRU")].cells[0];
    row1[row1.findIndex((x) => x.rowId === "r_Ash")].cells[0] =
      newRows[newRows.findIndex((x) => x.rowId === "r_Ash")].cells[0];
    row1[row1.findIndex((x) => x.rowId === "Permeate")].cells[0] =
      newRows[newRows.findIndex((x) => x.rowId === "Permeate")].cells[0];
    row1[row1.findIndex((x) => x.rowId === "p_Comp_permeate")].cells[0] =
      newRows[newRows.findIndex((x) => x.rowId === "p_Comp_permeate")].cells[0];

    setRows(buildTree(row1));
    setRowsToRender([headerRow, ...getExpandedRows(row1)]);
  };

  return (
    <div className="chart">
      <Line
        data={getChartData(rows)}
        options={getChartOptions("Membrane Calculator")}
      />
      <ReactGrid
        rows={rowsToRender}
        columns={columns}
        onCellsChanged={handleChanges}
        stickyTopRows={1}
        stickyLeftColumns={1}
      />
    </div>
  );
};

render(<MembApp />, document.getElementById("root"));