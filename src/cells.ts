import {
  DefaultCellTypes,
  CellStyle,
  NumberCell,
  TextCell,
  ChevronCell
} from "@silevis/reactgrid";

export const emptyTextCell: TextCell = { type: "text", text: "" };

const numberFormat = new Intl.NumberFormat("de", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});
const numberFormat2 = new Intl.NumberFormat("de", {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3
});

export const textCell = (
  text: string,
  className = "",
  style?: CellStyle
): TextCell => ({ type: "text", text, className, style });

export const chevronCell = (
  text: string,
  isExpanded: boolean,
  className = "",
  style?: CellStyle
): ChevronCell => ({
  type: "chevron",
  text,
  className,
  style,
  isExpanded
});

export const chevronCellchild = (
  text: string,
  parentId: string,
  className = "",
  style?: CellStyle
): ChevronCell => ({
  type: "chevron",
  text,
  parentId,
  className,
  style,
  isExpanded: false
});

export const numberCell = (
  value: number,
  className = "",
  style?: CellStyle
): NumberCell => ({
  type: "number",
  value,
  className,
  style,
  format: numberFormat
});

export const numberCell2 = (
  value: number,
  className = "",
  style?: CellStyle
): NumberCell => ({
  type: "number",
  value,
  className,
  style,
  format: numberFormat2
});

export const nonEditable = (cell: DefaultCellTypes): DefaultCellTypes => ({
  ...cell,
  nonEditable: true
});

export const showZero = (cell: NumberCell): NumberCell => ({
  ...cell,
  nanToZero: true,
  hideZero: false
});

export const bottomLine = (cell: DefaultCellTypes): DefaultCellTypes => ({
  ...cell,
  style: {
    ...cell.style,
    border: {
      ...cell.style?.border,
      bottom: {
        width: "1px",
        color: "#A6A6A6",
        style: "solid"
      }
    }
  }
});

export const noSideBorders = (cell: DefaultCellTypes): DefaultCellTypes => ({
  ...cell,
  style: {
    ...cell.style,
    border: {
      ...cell.style?.border,
      left: {
        style: "none"
      },
      right: {
        style: "none"
      }
    }
  }
});

export function headerCell(
  title: string,
  additionalClassNames = ""
): DefaultCellTypes {
  return nonEditable(
    textCell(title, `text-lg font-bold ${additionalClassNames}`, {
      background: "#42b0f5",
      color: "white",
      border: {
        bottom: { style: "none" },
        left: { style: "none" },
        right: { style: "none" }
      }
    })
  );
}