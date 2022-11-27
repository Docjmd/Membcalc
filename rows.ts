import { Row } from "@silevis/reactgrid";
import {
  emptyTextCell,
  nonEditable,
  textCell,
  headerCell,
  //bottomLine,
  numberCell,
  //showZero,
  //noSideBorders,
  chevronCell,
  chevronCellchild
} from "./cells";
import { headerline, emptylinenoside } from "./data";
import { getConfig } from "./Outputvariables";

const height = 25;

export const headerRow: Row = {
  rowId: "header",
  reorderable: false,
  height: 30,
  cells: [
    ...[
      nonEditable(emptyTextCell),
      nonEditable(headerCell("Unit", "justify-content-center")),
      nonEditable(headerCell("Total", "justify-content-center"))
    ],
    ...headerline
  ]
};

export const rows = (datatable): Row[] => [
  {
    rowId: "Config",
    height,
    cells: [...[chevronCell("Config.", false, "disabled")], ...emptylinenoside]
  },
  {
    rowId: "Brand / Model",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Brand / Model", "Config", "disabled")),
        nonEditable(textCell(""))
      ],
      ...getConfig().dataconfig[0].values.map((x) =>
        nonEditable(textCell(x, "justify-content-center"))
      )
    ]
  },
  {
    rowId: "Memb. type",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Memb. type", "Config", "disabled")),
        nonEditable(textCell(""))
      ],
      ...getConfig().dataconfig[1].values.map((x) =>
        nonEditable(textCell(x, "justify-content-center"))
      )
    ]
  },
  {
    rowId: "Housing",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Housing", "Config", "disabled")),
        nonEditable(textCell(""))
      ],
      ...getConfig().dataconfig[2].values.map((x) =>
        nonEditable(numberCell(x, "justify-content-center"))
      )
    ]
  },
  {
    rowId: "Elmts/hous.",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Elmts/hous.", "Config", "disabled")),
        nonEditable(textCell(""))
      ],
      ...getConfig().dataconfig[3].values.map((x) =>
        nonEditable(numberCell(x, "justify-content-center"))
      )
    ]
  },
  {
    rowId: "Area",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Area", "Config", "disabled")),
        nonEditable(textCell(""))
      ],
      ...getConfig().dataconfig[4].values.map((x) =>
        nonEditable(numberCell(x, "justify-content-center"))
      )
    ]
  },
  {
    rowId: "r_Temp.",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Temp.", "Config", "disabled")),
        nonEditable(textCell("ºC", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "Temp")
        .values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "Retentate",
    height,
    cells: [
      ...[chevronCell("Feed/retentate", true, "disabled")],
      ...emptylinenoside
    ]
  },
  {
    rowId: "r_Mass flow",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Mass flow", "Retentate", "disabled")),
        nonEditable(textCell("kg/h", "justify-content-center")),
        numberCell(datatable[0].values[0], "text-green")
      ],
      ...datatable[0].values.slice(1).map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "r_Volume flow",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Volume flow", "Retentate", "disabled")),
        nonEditable(textCell("l/h", "justify-content-center"))
      ],
      ...datatable[1].values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "r_Density",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Density", "Retentate", "disabled")),
        nonEditable(textCell("kg/m3", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "rDensity")
        .values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "r_Diawater",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Diawater", "Retentate", "disabled")),
        nonEditable(textCell("kg/h", "justify-content-center"))
      ],
      ...datatable[5].values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "Diaw_Perm",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Diaw./ Perm", "Retentate", "disabled")),
        nonEditable(textCell("%", "justify-content-center")),
        nonEditable(
          numberCell(datatable.find((x) => x.rowId === "Diaw_Perm").values[0])
        )
      ],
      ...datatable
        .find((x) => x.rowId === "Diaw_Perm")
        .values.slice(1)
        .map((x) => numberCell(x, "text-green"))
    ]
  },
  {
    rowId: "r_WCF",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("WCF", "Retentate", "disabled")),
        nonEditable(textCell("x", "justify-content-center")),
        nonEditable(
          numberCell(datatable.find((x) => x.rowId === "WCF").values[0])
        )
      ],
      ...datatable
        .find((x) => x.rowId === "WCF")
        .values.slice(1)
        .map((x) => numberCell(x, "text-green"))
    ]
  },
  {
    rowId: "r_Comp_retentate",
    height,
    cells: [
      ...[chevronCell("Composition", false, "disabled")],
      ...emptylinenoside
    ]
  },
  {
    rowId: "r_Fat",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Fat", "r_Comp_retentate", "disabled")),
        nonEditable(textCell("%", "justify-content-center")),
        numberCell(
          datatable.find((x) => x.rowId === "rFat").values[0],
          "text-green"
        )
      ],
      ...datatable
        .find((x) => x.rowId === "rFat")
        .values.slice(1)
        .map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "r_TOP",
    height,
    cells: [
      ...[
        chevronCellchild("TOP", "r_Comp_retentate", "disabled"),
        nonEditable(textCell("%", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "rTOP")
        .values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "r_TRU",
    height,
    cells: [
      ...[
        chevronCellchild("TRU", "r_TOP", "disabled"),
        nonEditable(textCell("%", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "rTRU")
        .values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "r_Cas",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Cas", "r_TRU", "disabled")),
        nonEditable(textCell("%", "justify-content-center")),
        numberCell(
          datatable.find((x) => x.rowId === "rCas").values[0],
          "text-green"
        )
      ],
      ...datatable
        .find((x) => x.rowId === "rCas")
        .values.slice(1)
        .map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "r_WP",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("WP", "r_TRU", "disabled")),
        nonEditable(textCell("%", "justify-content-center")),
        numberCell(
          datatable.find((x) => x.rowId === "rWP").values[0],
          "text-green"
        )
      ],
      ...datatable
        .find((x) => x.rowId === "rWP")
        .values.slice(1)
        .map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "r_NNP",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("NNP", "r_TOP", "disabled")),
        nonEditable(textCell("%", "justify-content-center")),
        numberCell(
          datatable.find((x) => x.rowId === "rNNP").values[0],
          "text-green"
        )
      ],
      ...datatable
        .find((x) => x.rowId === "rNNP")
        .values.slice(1)
        .map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "r_Lac",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Lac", "r_Comp_retentate", "disabled")),
        nonEditable(textCell("%", "justify-content-center")),
        numberCell(
          datatable.find((x) => x.rowId === "rLactose").values[0],
          "text-green"
        )
      ],
      ...datatable
        .find((x) => x.rowId === "rLactose")
        .values.slice(1)
        .map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "r_Acid",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Acid", "r_Comp_retentate", "disabled")),
        nonEditable(textCell("%", "justify-content-center")),
        numberCell(
          datatable.find((x) => x.rowId === "rAcid").values[0],
          "text-green"
        )
      ],
      ...datatable
        .find((x) => x.rowId === "rAcid")
        .values.slice(1)
        .map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "r_Ash",
    height,
    cells: [
      ...[
        chevronCellchild("Ash", "r_Comp_retentate", "disabled"),
        nonEditable(textCell("%", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "rAsh")
        .values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "r_Solub.Ash",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Solub.", "r_Ash", "disabled")),
        nonEditable(textCell("%", "justify-content-center")),
        numberCell(
          datatable.find((x) => x.rowId === "rSolub.").values[0],
          "text-green"
        )
      ],
      ...datatable
        .find((x) => x.rowId === "rSolub.")
        .values.slice(1)
        .map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "r_Nonsolub.Ash",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Non solub.", "r_Ash", "disabled")),
        nonEditable(textCell("%", "justify-content-center")),
        numberCell(
          datatable.find((x) => x.rowId === "rNon solub.").values[0],
          "text-green"
        )
      ],
      ...datatable
        .find((x) => x.rowId === "rNon solub.")
        .values.slice(1)
        .map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "r_TS",
    height,
    cells: [
      ...[
        nonEditable(chevronCell("TS", true, "disabled2")),
        nonEditable(textCell("%", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "rTS")
        .values.map((x) => nonEditable(numberCell(x, "font-bold")))
    ]
  },
  {
    rowId: "r_TOP/TS",
    height,
    cells: [
      ...[
        nonEditable(chevronCell("TOP/TS", true, "disabled2")),
        nonEditable(textCell("%", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "rTOP/TS")
        .values.map((x) => nonEditable(numberCell(x, "font-bold")))
    ]
  },
  {
    rowId: "Permeate",
    height,
    cells: [...[chevronCell("Permeate", true, "disabled")], ...emptylinenoside]
  },
  {
    rowId: "p_Flux",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Flux", "Permeate", "disabled")),
        nonEditable(textCell("kg/m2xh", "justify-content-center"))
      ],
      ...datatable[4].values.map((x) => nonEditable(numberCell(x, "text-blue")))
    ]
  },
  {
    rowId: "p_Mass Flow",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Mass Flow", "Permeate", "disabled")),
        nonEditable(textCell("kg/h", "justify-content-center"))
      ],
      ...datatable[2].values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "p_Volume Flow",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Volume Flow", "Permeate", "disabled")),
        nonEditable(textCell("l/h", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "pVolflow")
        .values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "p_Density",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Density", "Permeate", "disabled")),
        nonEditable(textCell("kg/m3", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "pDensity")
        .values.map((x) => nonEditable(numberCell(x)))
    ]
  },

  {
    rowId: "p_Comp_permeate",
    height,
    cells: [
      ...[chevronCell("Composition", false, "disabled")],
      ...emptylinenoside
    ]
  },
  {
    rowId: "p_Fat",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Fat", "p_Comp_permeate", "disabled")),
        nonEditable(textCell("%", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "pFat")
        .values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "p_TOP",
    height,
    cells: [
      ...[
        chevronCellchild("TOP", "p_Comp_permeate", "disabled"),
        nonEditable(textCell("%", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "pTOP")
        .values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "p_TRU",
    height,
    cells: [
      ...[
        chevronCellchild("TRU", "p_TOP", "disabled"),
        nonEditable(textCell("%", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "pTRU")
        .values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "p_Cas",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Cas", "p_TRU", "disabled")),
        nonEditable(textCell("%", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "pCas")
        .values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "p_WP",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("WP", "p_TRU", "disabled")),
        nonEditable(textCell("%", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "pWP")
        .values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "p_NNP",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("NNP", "p_TOP", "disabled")),
        nonEditable(textCell("%", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "pNNP")
        .values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "p_Lac",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Lac", "p_Comp_permeate", "disabled")),
        nonEditable(textCell("%", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "pLactose")
        .values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "p_Acid",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Acid", "p_Comp_permeate", "disabled")),
        nonEditable(textCell("%", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "pAcid")
        .values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "p_Ash",
    height,
    cells: [
      ...[
        chevronCellchild("Ash", "p_Comp_permeate", "disabled"),
        nonEditable(textCell("%", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "pAsh")
        .values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "p_Solub.Ash",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Solub.", "p_Ash", "disabled")),
        nonEditable(textCell("%", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "pSolub.")
        .values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "p_Nonsolub.Ash",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("Non solub.", "p_Ash", "disabled")),
        nonEditable(textCell("%", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "pNon solub.")
        .values.map((x) => nonEditable(numberCell(x)))
    ]
  },
  {
    rowId: "p_TS",
    height,
    cells: [
      ...[
        nonEditable(chevronCell("TS", true, "disabled2")),
        nonEditable(textCell("%", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "pTS")
        .values.map((x) => nonEditable(numberCell(x, "font-bold")))
    ]
  },
  {
    rowId: "p_TOP/TS",
    height,
    cells: [
      ...[
        nonEditable(chevronCellchild("TOP/TS", "p_Comp_permeate", "disabled")),
        nonEditable(textCell("%", "justify-content-center"))
      ],
      ...datatable
        .find((x) => x.rowId === "pTOP/TS")
        .values.map((x) => nonEditable(numberCell(x, "font-bold")))
    ]
  }
];
