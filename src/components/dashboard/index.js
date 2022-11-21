let weekSales = [];
let yearSales = [];

let prevMonthName = moment().subtract(1, "month").format("MMMM");
let previousMonthNumber = moment().month(prevMonthName).format("M");

let li = `<tr><th style="text-align: left; padding-left:10px"><span>Product Name</span></th>
                <th><span>Price</span></th>
                <th><span># Units Sold</span></th>
                <th><span>Revenue</span></th></tr>`;

let config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
};

axios
  .get(DASHBOARD_BASE_URL, config)
  .then(function (response) {
    let bestSellersData = response.data.dashboard.bestsellers;
    bestSellersData.forEach((bestSeller) => {
      li += `<tr>
        <td style="text-align: left">${bestSeller.product.name}</td>
        <td style="text-align: left">${
          bestSeller.revenue / bestSeller.units
        } </td>
        <td style="text-align: left">${bestSeller.units}</td>
        <td style="text-align: left">${bestSeller.revenue}</td>
      </tr>`;
    });
    document.getElementById("bestsellersTable").innerHTML = li;

    let todayData = response.data.dashboard.sales_over_time_week["1"];
    document.getElementById("today-id").innerHTML =
      "$ " + kFormatter(todayData.total) + " / " + todayData.orders + " orders";

    let weekTotals = 0;
    let weekOrders = 0;
    for (let key in response.data.dashboard.sales_over_time_week) {
      weekSales.push(response.data.dashboard.sales_over_time_week[key].total);
      weekOrders += response.data.dashboard.sales_over_time_week[key].orders;
      weekTotals += response.data.dashboard.sales_over_time_week[key].total;
    }
    document.getElementById("last-week").innerHTML =
      "$ " + kFormatter(weekTotals) + " / " + weekOrders + " orders";

    const lastMonthData =
      response.data.dashboard.sales_over_time_year[`${previousMonthNumber}`];

    let lastMonthTotals = lastMonthData.total;
    let lastMonthOrders = lastMonthData.orders;

    document.getElementById("last-month").innerHTML =
      "$ " + kFormatter(lastMonthTotals) + " / " + lastMonthOrders + " orders";
  })

  .catch(function (err) {
    console.log(err);
  });

var weekValues = [
  "today",
  "yesterday",
  "day 3",
  "day 4",
  "day 5",
  "day 6",
  "day 7",
];
var barColors = ["red", "green", "blue", "orange", "brown", "purple", "orange"];

var yearValues = [
  "this month",
  "last month",
  "month 3",
  "month 4",
  "month 5",
  "month 6",
  "month 7",
  "month 8",
  "month 9",
  "month 10",
  "month 11",
  "month 12",
];
var barColors = [
  "red",
  "green",
  "blue",
  "orange",
  "brown",
  "purple",
  "orange",
  "grey",
  "yellow",
  "pink",
  "black",
  "maroon",
];

const displayChart = async () => {
  await axios
    .get(DASHBOARD_BASE_URL, config)
    .then(function (response) {
      for (let key in response.data.dashboard.sales_over_time_week) {
        weekSales.push(response.data.dashboard.sales_over_time_week[key].total);
      }
      for (let key in response.data.dashboard.sales_over_time_year) {
        yearSales.push(response.data.dashboard.sales_over_time_year[key].total);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
  await new Chart("myChartOne", {
    type: "bar",
    data: {
      labels: weekValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: weekSales,
        },
      ],
    },
    options: {
      legend: { display: false },
    },
  });

  await new Chart("myChartTwo", {
    type: "bar",
    data: {
      labels: yearValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yearSales,
        },
      ],
    },
    options: {
      legend: { display: false },
    },
  });
};
displayChart();

const toggleDiv = (divid) => {
  varon = divid + "on";
  varoff = divid + "off";

  if (document.getElementById(varon).style.display == "block") {
    document.getElementById(varon).style.display = "none";
    document.getElementById(varoff).style.display = "block";
    document.getElementById("revenue-duration").innerHTML =
      "Revenue (last 12 months)";
  } else {
    document.getElementById(varoff).style.display = "none";
    document.getElementById(varon).style.display = "block";
    document.getElementById("revenue-duration").innerHTML =
      "Revenue (last 7 days)";
  }
};

const toOrders = () => {
  window.location.replace("../orders/orders.html");
};

const toLogout = () => {
  localStorage.removeItem("accessToken");
  window.location.replace("../../index.html");
};
