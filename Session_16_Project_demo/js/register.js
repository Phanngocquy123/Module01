function signUpClick() {
  let userList = JSON.parse(localStorage.getItem("userList")) || [];
  let nameValue = document.getElementById("nameInput").value;
  let emailValue = document.getElementById("emailInput").value;
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
    let objUser = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      cart: [],
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
