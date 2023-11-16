function signUpClick() {
  let userList = JSON.parse(localStorage.getItem("userList")) || [];
  let nameValue = document.getElementById("nameInput").value;
  let emailValue = document.getElementById("emailInput").value;
  let sdtValue = document.getElementById("sdtInput").value;
  let passwordValue = document.getElementById("passwordInput").value;
  let confirmPasswordValue = document.getElementById(
    "confirmPasswordInput"
  ).value;

  if (nameValue == "") {
    alert("Bạn chưa nhập tên");
    return;
  } else if (emailValue == "") {
    alert("Bạn chưa nhập Email");
    return;
  } else if (sdtValue == "") {
    alert("Bạn chưa nhập SĐT");
    return;
  } else if (passwordValue == "") {
    alert("Bạn chưa nhập Password");
    return;
  } else if (confirmPasswordValue == "") {
    alert("Bạn chưa xác nhận Password");
    return;
  } else if (passwordValue != confirmPasswordValue) {
    alert("Password không khớp");
    return;
  } else {
    let day = new Date();
    let date = day.getDate();
    let month = day.getMonth() + 1;
    let year = day.getFullYear();
    let hours = day.getHours();
    let minutes = day.getMinutes();
    let seconds = day.getSeconds();
    let time = `${date}/${month}/${year} - ${hours}:${minutes}:${seconds}`;
    if (hours == 0) {
      hours = 12;
    }
    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    let timeSort = `${year}${month}${date}${hours}${minutes}${seconds}`;
    let objUser = {
      name: nameValue,
      email: emailValue,
      sdt: sdtValue,
      password: passwordValue,
      cart: [],
      status: 1,
      time: time,
      timeSort: timeSort,
      id:
        Math.floor(Math.random() * 848985956562) + new Date().getMilliseconds(),
    };

    let findUserEmail = userList.findIndex((UserElement) => {
      return UserElement.email == emailValue;
    });
    if (findUserEmail != -1) {
      alert("Email đã được đăng ký");
      return;
    }
    userList.push(objUser);
    localStorage.setItem("userList", JSON.stringify(userList));
  }
  document.getElementById("nameInput").value = "";
  document.getElementById("emailInput").value = "";
  document.getElementById("passwordInput").value = "";
  document.getElementById("confirmPasswordInput").value = "";

  alert("Bạn đã đăng ký thành công");
  signInClick();
}

function signInClick() {
  window.location.href = "../pages/login.html";
}

function homeClick() {
  window.location.href = "../index.html";
}
