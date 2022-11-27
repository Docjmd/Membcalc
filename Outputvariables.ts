import { Unit, Recetaunit, columnsarray, composition } from "./data";

export function getConfig() {
  const dataconfig = [];
  dataconfig.push({
    rowId: "Brand / Model",
    values: columnsarray(Unit.Loops + 1).map((x, idx) =>
      idx === 0 ? Unit.Brand : Unit.Model
    )
  });
  dataconfig.push({
    rowId: "Memb. type",
    values: columnsarray(Unit.Loops + 1).map((x, idx) =>
      idx === 0 ? "" : Unit.Type
    )
  });
  dataconfig.push({
    rowId: "Housing",
    values: columnsarray(Unit.Loops + 1).map((x, idx) =>
      idx === 0 ? 0 : Unit.Housing[idx - 1]
    )
  });
  dataconfig[2].values[0] = dataconfig[2].values.reduce(
    (acc: number, curr: number) => acc + curr
  );
  dataconfig.push({
    rowId: "Elmts/hous.",
    values: columnsarray(Unit.Loops + 1).map((x, idx) =>
      idx === 0 ? dataconfig[2].values[0] * Unit.Elmts : Unit.Elmts
    )
  });
  dataconfig.push({
    rowId: "Area",
    values: columnsarray(Unit.Loops + 1).map((x, idx) =>
      idx === 0 ? 0 : Math.round(Unit.Elmts * Unit.Housing[idx - 1] * Unit.Area)
    )
  });
  dataconfig[4].values[0] = dataconfig[4].values.reduce(
    (acc: number, curr: number) => acc + curr
  );
  return { dataconfig };
}

export function calc(
  feed: number,
  WCF: number[],
  Diaw_Perm: number[],
  initcompvalues: number[]
) {
  const datatable = [];
  let lastvalue: number;
  datatable[0] = {
    rowId: "rMassflow",
    values: columnsarray(Unit.Loops + 1).map((x, idx) =>
      idx === 0
        ? (lastvalue = feed)
        : (lastvalue = Math.round(lastvalue / WCF[idx - 1]))
    )
  };
  datatable[1] = {
    rowId: "rVolflow",
    values: NaN
  };
  datatable[2] = {
    rowId: "pMassflow",
    values: columnsarray(Unit.Loops + 1).map((x, idx) =>
      idx === 0
        ? 0
        : Math.round(
            (datatable[0].values[idx - 1] - datatable[0].values[idx]) /
              (1 - Diaw_Perm[idx - 1] / 100)
          )
    )
  };

  datatable[3] = {
    rowId: "pVolflow",
    values: NaN
  };

  datatable[4] = {
    rowId: "pFlux",
    values: columnsarray(Unit.Loops + 1).map(
      (x, idx) =>
        datatable[2].values[idx] / getConfig().dataconfig[4].values[idx]
    )
  };
  datatable[5] = {
    rowId: "Diawaterr",
    values: columnsarray(Unit.Loops + 1).map((x, idx) =>
      idx === 0
        ? 0
        : Math.round((datatable[2].values[idx] * Diaw_Perm[idx - 1]) / 100)
    )
  };
  datatable.push({
    rowId: "WCF",
    values: columnsarray(Unit.Loops + 1).map((x, idx) =>
      idx === 0
        ? datatable[0].values[0] / datatable[0].values.slice(-1)
        : WCF[idx - 1]
    )
  });
  datatable.push({
    rowId: "Diaw_Perm",
    values: columnsarray(Unit.Loops + 1).map((x, idx) =>
      idx === 0 ? 0 : Diaw_Perm[idx - 1]
    )
  });
  datatable.push({
    rowId: "Temp",
    values: columnsarray(Unit.Loops + 1).map((x, idx) => Recetaunit.Temp)
  });
  function calccomposition(
    title: string,
    initvalue: number,
    rejection: number
  ) {
    const valuesret = columnsarray(Unit.Loops + 1).map((x, idx) =>
      idx === 0
        ? (lastvalue = initvalue)
        : (lastvalue =
            lastvalue *
            Math.exp(
              (WCF[idx - 1] / datatable[0].values[idx]) * (rejection - 1)
            ) *
            Math.pow(WCF[idx - 1], rejection))
    );

    if (datatable.findIndex((x) => x.rowId === "r" + title) === -1) {
      datatable.push({
        rowId: "r" + title,
        values: valuesret
      });
    } else {
      datatable[
        datatable.findIndex((x) => x.rowId === "r" + title)
      ].values = valuesret;
    }
    const valuesper = columnsarray(Unit.Loops + 1).map((x, idx) =>
      idx === 0
        ? 0
        : Math.abs(
            (datatable[0].values[idx - 1] * valuesret[idx - 1] -
              datatable[0].values[idx] * valuesret[idx]) /
              datatable[2].values[idx]
          )
    );

    if (datatable.findIndex((x) => x.rowId === "p" + title) === -1) {
      datatable.push({
        rowId: "p" + title,
        values: valuesper
      });
    } else {
      datatable[
        datatable.findIndex((x) => x.rowId === "p" + title)
      ].values = valuesper;
    }
  }
  composition.map((x, idx) =>
    calccomposition(x.Id, initcompvalues[idx], x.rejection)
  );

  function Totales() {
    datatable.find((x) => x.rowId === "rTRU").values = columnsarray(
      Unit.Loops + 1
    ).map(
      (x, idx) =>
        datatable.find((x) => x.rowId === "rCas").values[idx] +
        datatable.find((x) => x.rowId === "rWP").values[idx]
    );
    datatable.find((x) => x.rowId === "pTRU").values = columnsarray(
      Unit.Loops + 1
    ).map(
      (x, idx) =>
        datatable.find((x) => x.rowId === "pCas").values[idx] +
        datatable.find((x) => x.rowId === "pWP").values[idx]
    );

    datatable.find((x) => x.rowId === "rTOP").values = columnsarray(
      Unit.Loops + 1
    ).map(
      (x, idx) =>
        datatable.find((x) => x.rowId === "rTRU").values[idx] +
        datatable.find((x) => x.rowId === "rNNP").values[idx]
    );
    datatable.find((x) => x.rowId === "pTOP").values = columnsarray(
      Unit.Loops + 1
    ).map(
      (x, idx) =>
        datatable.find((x) => x.rowId === "pTRU").values[idx] +
        datatable.find((x) => x.rowId === "pNNP").values[idx]
    );

    datatable.find((x) => x.rowId === "rAsh").values = columnsarray(
      Unit.Loops + 1
    ).map(
      (x, idx) =>
        datatable.find((x) => x.rowId === "rSolub.").values[idx] +
        datatable.find((x) => x.rowId === "rNon solub.").values[idx]
    );
    datatable.find((x) => x.rowId === "pAsh").values = columnsarray(
      Unit.Loops + 1
    ).map(
      (x, idx) =>
        datatable.find((x) => x.rowId === "pSolub.").values[idx] +
        datatable.find((x) => x.rowId === "pNon solub.").values[idx]
    );

    datatable.find((x) => x.rowId === "rTS").values = columnsarray(
      Unit.Loops + 1
    ).map(
      (x, idx) =>
        datatable.find((x) => x.rowId === "rFat").values[idx] +
        datatable.find((x) => x.rowId === "rTOP").values[idx] +
        datatable.find((x) => x.rowId === "rLactose").values[idx] +
        datatable.find((x) => x.rowId === "rAcid").values[idx] +
        datatable.find((x) => x.rowId === "rAsh").values[idx]
    );
    datatable.find((x) => x.rowId === "pTS").values = columnsarray(
      Unit.Loops + 1
    ).map(
      (x, idx) =>
        datatable.find((x) => x.rowId === "pFat").values[idx] +
        datatable.find((x) => x.rowId === "pTOP").values[idx] +
        datatable.find((x) => x.rowId === "pLactose").values[idx] +
        datatable.find((x) => x.rowId === "pAcid").values[idx] +
        datatable.find((x) => x.rowId === "pAsh").values[idx]
    );

    datatable.find((x) => x.rowId === "rTOP/TS").values = columnsarray(
      Unit.Loops + 1
    ).map(
      (x, idx) =>
        (datatable.find((x) => x.rowId === "rTOP").values[idx] /
          datatable.find((x) => x.rowId === "rTS").values[idx]) *
        100
    );
    datatable.find((x) => x.rowId === "pTOP/TS").values = columnsarray(
      Unit.Loops + 1
    ).map(
      (x, idx) =>
        (datatable.find((x) => x.rowId === "pTOP").values[idx] /
          datatable.find((x) => x.rowId === "pTS").values[idx]) *
        100
    );
    datatable.find((x) => x.rowId === "pMassflow").values[0] = datatable
      .find((x) => x.rowId === "pMassflow")
      .values.reduce((acc: number, cur: number) => acc + cur, 0);
    datatable.find((x) => x.rowId === "pFlux").values[0] =
      datatable[2].values[0] / getConfig().dataconfig[4].values[0];
    datatable.find((x) => x.rowId === "Diawaterr").values[0] = datatable
      .find((x) => x.rowId === "Diawaterr")
      .values.reduce((acc: number, cur: number) => acc + cur, 0);

    datatable.find((x) => x.rowId === "Diaw_Perm").values[0] = Math.round(
      (datatable.find((x) => x.rowId === "Diawaterr").values[0] /
        datatable.find((x) => x.rowId === "pMassflow").values[0]) *
        100
    );
  }

  Totales();
  function Density() {
    const temp = Recetaunit.Temp;
    datatable.push({
      rowId: "rDensity",
      values: columnsarray(Unit.Loops + 1).map((x, idx) =>
        Math.round(
          (1 /
            ((datatable.find((x) => x.rowId === "rFat").values[idx] * 10) /
              920 +
              (datatable.find((x) => x.rowId === "rTOP").values[idx] * 10) /
                1400 +
              (datatable.find((x) => x.rowId === "rLactose").values[idx] * 10) /
                1780 +
              (datatable.find((x) => x.rowId === "rAsh").values[idx] * 10) /
                1850 +
              ((100 - datatable.find((x) => x.rowId === "rTS").values[idx]) *
                10) /
                ((999.83952 +
                  16.945176 * temp -
                  7.9870401 * Math.pow(10, -3) * Math.pow(temp, 2) -
                  46.170461 * Math.pow(10, -6) * Math.pow(temp, 3) +
                  105.56302 * Math.pow(10, -9) * Math.pow(temp, 4) -
                  280.54253 * Math.pow(10, -12) * Math.pow(temp, 5)) /
                  (1 + 16.89785 * Math.pow(10, -3) * temp)))) *
            1000
        )
      )
    });

    datatable.find((x) => x.rowId === "rVolflow").values = columnsarray(
      Unit.Loops + 1
    ).map((x, idx) =>
      Math.round(
        (datatable[0].values[idx] /
          datatable.find((x) => x.rowId === "rDensity").values[idx]) *
          1000
      )
    );

    datatable.push({
      rowId: "pDensity",
      values: columnsarray(Unit.Loops + 1).map((x, idx) =>
        Math.round(
          (1 /
            ((datatable.find((x) => x.rowId === "pFat").values[idx] * 10) /
              920 +
              (datatable.find((x) => x.rowId === "pTOP").values[idx] * 10) /
                1400 +
              (datatable.find((x) => x.rowId === "pLactose").values[idx] * 10) /
                1780 +
              (datatable.find((x) => x.rowId === "pAsh").values[idx] * 10) /
                1850 +
              ((100 - datatable.find((x) => x.rowId === "pTS").values[idx]) *
                10) /
                ((999.83952 +
                  16.945176 * temp -
                  7.9870401 * Math.pow(10, -3) * Math.pow(temp, 2) -
                  46.170461 * Math.pow(10, -6) * Math.pow(temp, 3) +
                  105.56302 * Math.pow(10, -9) * Math.pow(temp, 4) -
                  280.54253 * Math.pow(10, -12) * Math.pow(temp, 5)) /
                  (1 + 16.89785 * Math.pow(10, -3) * temp)))) *
            1000
        )
      )
    });

    datatable.find((x) => x.rowId === "pVolflow").values = columnsarray(
      Unit.Loops + 1
    ).map((x, idx) =>
      Math.round(
        (datatable[2].values[idx] /
          datatable.find((x) => x.rowId === "pDensity").values[idx]) *
          1000
      )
    );
  }
  Density();
  return { datatable };
}
