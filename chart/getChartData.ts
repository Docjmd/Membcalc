import { ChartData } from "chart.js";
import { headerline2 } from "./src/data";

// const prueba = calc(73000).datatable;
// console.log(prueba);

export const getChartData = (rawData): ChartData => ({
  
  labels: headerline2,
  datasets: [
    {
      type: "line",
      label: "Flux",
      data: rawData[29].cells
        .slice(3)
        .map((x) => Math.round(x.value * 100) / 100),
      borderColor: "#2797ff",
      backgroundColor: "rgba(39, 151, 255, 0.2)",
      pointRadius: 0,
      borderWidth: 3,
      yAxisID: "A"
    },
    {
      type: "line",
      label: "WCF",
      data: rawData[13].cells
        .slice(3)
        .map((x) => Math.round(x.value * 100) / 100),
      borderColor: "#dc143c",
      backgroundColor: "rgba(220, 20, 60, 0.2)",
      pointRadius: 0,
      borderWidth: 3,
      yAxisID: "B"
    },
    {
      type: "line",
      label: "Diawater",
      data: rawData[11].cells
        .slice(3)
        .map((x) => Math.round(x.value * 100) / 100),
      borderColor: "#ffd700",
      backgroundColor: "rgba(255, 215, 0, 0.2)",
      hidden: true,
      pointRadius: 0,
      borderWidth: 3,
      yAxisID: "B"
    },
    {
      type: "line",
      label: "TS",
      data: rawData[26].cells
        .slice(3)
        .map((x) => Math.round(x.value * 100) / 100),
      borderColor: "#107C41",
      backgroundColor: "#107C41",
      fill: true,
      hidden: true,
      pointRadius: 0,
      borderWidth: 2,
      yAxisID: "A"
    },
    {
      type: "line",
      label: "TOP/TS",
      data: rawData[27].cells
        .slice(3)
        .map((x) => Math.round(x.value * 100) / 100),
      borderColor: "rgba(0, 0, 0,  1)",
      backgroundColor: "rgba(0,0,0,  0)",
      showLine: true,
      hidden: true,
      borderDash: [5, 10],
      pointRadius: 4,
      borderWidth: 1,
      yAxisID: "B"
    }
  ]
});
