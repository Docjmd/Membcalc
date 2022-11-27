import {
  nonEditable,
  textCell,
  headerCell,
  numberCell,
  noSideBorders
} from "./cells";

export const Unitconfig = [
  {
    Id: "UF1",
    Loops: 13,
    Brand: "Alfa Laval",
    Model: "GR73PE",
    Type: "6338/30",
    Housing: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 12, 8, 8],
    Elmts: 3,
    Area: 23.4,
    Recetas: {
      Id: "MP80",
      Feed: 73200,
      Diaw_Perm: [0, 0, 0, 0, 0, 63, 89, 89, 89, 89, 87, 0, 0],
      WCF: [
        1.02,
        1.02,
        1.14,
        1.17,
        1.18,
        1.08,
        1.02,
        1.02,
        1.02,
        1.02,
        1.03,
        1.14,
        1.15
      ],
      Temp: 10
    }
  }
];

export const Configrows = [
  "Brand / Model",
  "Memb. type",
  "Housing",
  "Elmts/hous.",
  "Area"
];
export const composition = [
  {
    Id: "Fat",
    parent: "",
    rejection: 1,
    initvalue: 0.043
  },
  {
    Id: "TOP",
    parent: "",
    rejection: NaN,
    initvalue: NaN
  },
  {
    Id: "TRU",
    parent: "TOP",
    rejection: NaN,
    initvalue: NaN
  },
  {
    Id: "Cas",
    parent: "TRU",
    rejection: 1,
    initvalue: 2.46
  },
  {
    Id: "WP",
    parent: "TRU",
    rejection: 0.99,
    initvalue: 0.62
  },
  {
    Id: "NNP",
    parent: "TOP",
    rejection: 0.2,
    initvalue: 0.2
  },
  {
    Id: "Lactose",
    parent: "",
    rejection: 0.12,
    initvalue: 4.66
  },
  {
    Id: "Acid",
    parent: "",
    rejection: 0.4,
    initvalue: 0.2
  },
  {
    Id: "Ash",
    parent: "",
    rejection: NaN,
    initvalue: NaN
  },
  {
    Id: "Solub.",
    parent: "Ash",
    rejection: 0.4,
    initvalue: 0.508
  },
  {
    Id: "Non solub.",
    parent: "Ash",
    rejection: 1,
    initvalue: 0.192
  },
  {
    Id: "TS",
    parent: "",
    rejection: NaN,
    initvalue: NaN
  },
  {
    Id: "TOP/TS",
    parent: "",
    rejection: NaN,
    initvalue: NaN
  }
];

export const Unit = Unitconfig.find((x) => x.Id === "UF1");
export const Recetaunit = [Unit.Recetas].find((x) => x.Id === "MP80");

//Creamos array vacio
export function columnsarray(x: number): any[] {
  return new Array(x).fill(0);
}

export const headerline = columnsarray(Unit.Loops).map((x, idx) => {
  return nonEditable(headerCell("L" + (idx + 1), "justify-content-center"));
});

export const headerline2 = columnsarray(Unit.Loops).map((x, idx) => {
  return "L" + (idx + 1);
});
export const emptyline = columnsarray(Unit.Loops).map(() =>
  nonEditable(numberCell(NaN))
);

export const emptylinenoside = columnsarray(Unit.Loops + 2).map(() =>
  noSideBorders(nonEditable(textCell("", "disabled")))
);
