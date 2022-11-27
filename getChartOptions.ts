import { ChartOptions } from "chart.js";

export const getChartOptions = (title: string): ChartOptions => ({
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: true,
    text: title
  },
  legend: {
    display: true,
    position: "left",
    labels: {
      boxWidth: 16,
      fontSize: 11
    }
  },
  layout: {
    padding: {
      left: 160
    }
  },
  scales: {
    xAxes: [
      {
        display: true
      }
    ],
    yAxes: [
      {
        id: "A",
        display: true,
        position: "left"
      },
      {
        id: "B",
        display: true,
        position: "right",
        gridLines: {
          display: false
        }
      }
    ]
  },
  plugins: {
    filler: {
      propagate: true
    }
  }
});
