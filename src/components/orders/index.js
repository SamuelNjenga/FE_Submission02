let config = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
  },
};

let currentPage = 1;
let pageSize = 50;

const filterFunction = () => {
  let searchText = document.getElementById("gsearch").value;
  axios
    .get(`${ORDERS_BASE_URL}?page=${currentPage}&q=${searchText}`, config)
    .then(function (response) {
      let ordersData = response.data.orders;

      function renderTable() {
        // create html
        let li = "";
        li += `<tr><th style="text-align: left; padding-left: 10px; font-weight: 300;"><span>Product Name</span></th>
                <th style="text-align: left; padding-left: 10px; font-weight: 300;"><span>Date</span></th>
                <th style="text-align: left; padding-left: 10px; font-weight: 300;"><span>Price</span></th>
                <th style="text-align: left; padding-left: 10px; font-weight: 300;"><span>Status</span></th></tr>`;
        ordersData
          .filter((row, index) => {
            let start = (currentPage - 1) * pageSize;
            let end = currentPage * pageSize;
            if (index >= start && index < end) return true;
          })
          .forEach((order) => {
            li += `<tr>
        <td>${order.product.name}</td>
        <td>${moment(order.created_at).format("MMMM Do YYYY, h:mm:ss a")} </td>
        <td>${(order.total / order.product.quantity).toFixed(2)}</td>
        <td data-status="${order.status}" style="text-transform: capitalize"> 
        ${order.status}
        </td>
      </tr>`;
          });
        document.getElementById("ordersTable").innerHTML = li;
      }
      renderTable();
    });
};

axios
  .get(`${ORDERS_BASE_URL}?page=${currentPage}`, config)
  .then(function (response) {
    let ordersData = response.data.orders;
    let total = response.data.total;

    // create html
    let li = "";
    li += `<tr><th style="text-align: left; padding-left: 10px; font-weight: 300;"><span>Product Name</span></th>
                <th style="text-align: left; padding-left: 10px; font-weight: 300;"><span>Date</span></th>
                <th style="text-align: left; padding-left: 10px; font-weight: 300;"><span>Price</span></th>
                <th style="text-align: left; padding-left: 10px; font-weight: 300;"><span>Status</span></th></tr>`;
    ordersData
      .filter((row, index) => {
        let start = (currentPage - 1) * pageSize;
        let end = currentPage * pageSize;
        if (index >= start && index < end) return true;
      })
      .forEach((order) => {
        li += `<tr>
        <td>${order.product.name}</td>
        <td>${moment(order.created_at).format("MMMM Do YYYY, h:mm:ss a")} </td>
        <td>${(order.total / order.product.quantity).toFixed(2)}</td>
        <td data-status="${order.status}" style="text-transform: capitalize"> 
        ${order.status}
        </td>
      </tr>`;
      });
    document.getElementById("orderPages").innerHTML =
      "Page " + currentPage + " of " + total / pageSize;
    document.getElementById("ordersTable").innerHTML = li;
  });

const nextFunction = async () => {
  if (currentPage * pageSize < 1000) currentPage++;
  await axios
    .get(`${ORDERS_BASE_URL}?page=${currentPage}`, config)
    .then(function (response) {
      let ordersData = response.data.orders;
      let total = response.data.total;

      // create html
      let li = "";
      li += `<tr><th style="text-align: left; padding-left: 10px; font-weight: 300;"><span>Product Name</span></th>
                <th style="text-align: left; padding-left: 10px; font-weight: 300;"><span>Date</span></th>
                <th style="text-align: left; padding-left: 10px; font-weight: 300;"><span>Price</span></th>
                <th style="text-align: left; padding-left: 10px; font-weight: 300;"><span>Status</span></th></tr>`;
      let list = ordersData.filter((row, index) => {
        let start = 0;
        let end = 50;
        if (index >= start && index < end) return true;
      });
      list.forEach((order) => {
        li += `<tr>
        <td>${order.product.name}</td>
        <td>${moment(order.created_at).format("MMMM Do YYYY, h:mm:ss a")} </td>
        <td>${(order.total / order.product.quantity).toFixed(2)}</td>
        <td data-status="${order.status}" style="text-transform: capitalize"> 
        ${order.status}
        </td>
      </tr>`;
      });

      document.getElementById("orderPages").innerHTML =
        "Page " + currentPage + " of " + total / pageSize;
      document.getElementById("ordersTable").innerHTML = li;
    });
};

const previousFunction = async () => {
  if (currentPage > 1) currentPage--;
  await axios
    .get(`${ORDERS_BASE_URL}?page=${currentPage}`, config)
    .then(function (response) {
      let ordersData = response.data.orders;
      let total = response.data.total;

      // create html
      let li = "";
      li += `<tr><th style="text-align: left; padding-left: 10px; font-weight: 300;"><span>Product Name</span></th>
                <th style="text-align: left; padding-left: 10px; font-weight: 300;"><span>Date</span></th>
                <th style="text-align: left; padding-left: 10px; font-weight: 300;"><span>Price</span></th>
                <th style="text-align: left; padding-left: 10px; font-weight: 300;"><span>Status</span></th></tr>`;

      let list = ordersData.filter((row, index) => {
        let start = 0;
        let end = 50;
        if (index >= start && index < end) return true;
      });

      list.forEach((order) => {
        li += `<tr>
        <td>${order.product.name}</td>
        <td>${moment(order.created_at).format("MMMM Do YYYY, h:mm:ss a")} </td>
        <td>${(order.total / order.product.quantity).toFixed(2)}</td>
        <td data-status="${order.status}" style="text-transform: capitalize"> 
        ${order.status}
        </td>
      </tr>`;
      });
      document.getElementById("orderPages").innerHTML =
        "Page " + currentPage + " of " + total / pageSize;
      document.getElementById("ordersTable").innerHTML = li;
    });
};

const toMainDashboard = () => {
  window.location.replace("../dashboard/dashboard.html");
};

const toLogout = () => {
  localStorage.removeItem("accessToken");
  window.location.replace("../../index.html");
};
