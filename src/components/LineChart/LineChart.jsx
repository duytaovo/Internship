import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const LineChart = ({ dataChart }) => {
  let arrTimes = [];
  for (let i = 0; i < dataChart?.chart.times.length; i = i + 2) {
    arrTimes.push(`${dataChart?.chart.times[i].hour}.00`);
  }

  // let idItems1 = []
  // for (let i = 0; i < 1; i++) {
  //   idItems1.push(dataChart?.items[i].encodeId)
  // }
  // let idItems2 = []
  // for (let i = 0; i < 1; i++) {
  //   idItems2.push(dataChart?.items[i].encodeId)
  // }
  // let idItems3 = []
  // for (let i = 0; i < 1; i++) {
  //   idItems3.push(dataChart?.items[i].encodeId)
  // }
  // let a = idItems1[0]

  let timeMili = [];
  for (let i = 0; i < 24; i++) {
    timeMili.push(dataChart?.chart.items.ZZBUE7ZA[i].counter);
  }

  let timeMili2 = [];
  for (let i = 0; i < 24; i++) {
    timeMili2.push(dataChart?.chart.items.ZZDFBFD8[i].counter);
  }

  let timeMili3 = [];
  for (let i = 0; i < 24; i++) {
    timeMili3.push(dataChart?.chart.items.ZZDI9B7U[i].counter);
  }

  ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const chartData = {
    data: {
      labels: arrTimes,
      datasets: [
        {
          label: dataChart?.items[0].title,
          data: timeMili,
          backgroundColor: "#e35050",
          borderColor: "#e35050",
          borderWidth: 1.5,
          tension: 0.4,
          pointBackgroundColor: "#000",
          pointBorderColor: "#4a90e2",
          pointBorderWidth: 3,
          pointRadius: 0,
          hoverRadius: 6,
        },
        {
          label: dataChart?.items[1].title,
          data: timeMili2,
          backgroundColor: "#27bd9c",
          borderColor: "#27bd9c",
          borderWidth: 1.5,
          tension: 0.4,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#27bd9c",
          pointBorderWidth: 3,
          hoverRadius: 6,
          pointRadius: 0,
        },
        {
          label: dataChart?.items[2].title,
          data: timeMili3,
          backgroundColor: "#4a90e2",
          borderColor: "#4a90e2",
          borderWidth: 1.5,
          tension: 0.4,
          pointBackgroundColor: "#fff",
          pointBorderColor: "#e35050",
          pointBorderWidth: 3,
          hoverRadius: 6,
          pointRadius: 0,
        },
      ],
    },

    options: {
      animation: {
        hover: {
          duration: 1000,
          easing: "linear",
          from: 1,
          to: 0,
          loop: true,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: "left",
        },
        tooltip: {
          mode: "index",
          position: "nearest",
          intersect: false,
          yAlign: "bottom",
          backgroundColor: "#e35050",
          titleFontSize: 16,
          titleFontColor: "#e35050",
          bodyFontColor: "#e35050",
          bodyFontSize: 14,
          displayColors: false,
          lable: {
            display: true,
          },
        },
      },
      interaction: {
        mode: "dataset",
        intersect: false,
      },
      stacked: false,

      scales: {
        y: {
          display: false,
        },
      },
    },
  };
  return <Line data={chartData.data} options={chartData.options} />;
};

export default LineChart;
