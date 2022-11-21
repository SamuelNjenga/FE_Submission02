let loginForm = document.getElementById("loginForm");

const headers_ = {
  "Content-Type": "application/json",
};

// When the form is submitted...
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("EH");
  // POST the data
  axios
    .post(
      LOGIN_BASE_URL,
      {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      },
      { headers: headers_ }
    )
    .then((resp) => {
      const tokenValue = resp.data.access_token;
      localStorage.setItem("accessToken", tokenValue);
      window.location.replace("./components/dashboard/dashboard.html");
    })
    .catch(function (error) {
      alert("The username or password is incorrect");
    });
});

