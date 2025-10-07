// Fungsi untuk generate angka random
function getRandomData(count, min, max) {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return data;
}

// Generate tanggal (30 hari terakhir)
function getLast30Days() {
  const dates = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d.toISOString().slice(0, 10)); // format YYYY-MM-DD
  }
  return dates;
}

const options = {
  chart: {
    type: "area",
    height: 350
  },
  series: [
    {
      name: "Penjualan",
      data: getRandomData(30, 10, 100) // 30 data antara 10-100
    }
  ],
  xaxis: {
    categories: getLast30Days()
  }
};

const chart = new ApexCharts(document.querySelector("#chart"), options);
chart.render();
