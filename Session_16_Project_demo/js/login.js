function signInClick() {
  let emailValue = document.getElementById("emailInputLogin").value;
  let passwordValue = document.getElementById("passwordInputLogin").value;
  let userLogin = JSON.parse(localStorage.getItem("userList")) || [];
  let loginTrue;
  for (let i = 0; i < userLogin.length; i++) {
    if (emailValue == "" && passwordValue == "") {
      alert("Bạn chưa nhập thông tin");
      return;
    } else if (userLogin[i].email != "" && passwordValue == "") {
      alert("Bạn chưa nhập mật khẩu");
      return;
    } else if (emailValue == "" && userLogin[i].password != "") {
      alert("Bạn chưa nhập email");
      return;
    } else if (
      userLogin[i].email == emailValue &&
      userLogin[i].password == passwordValue
    ) {
      loginTrue = true;
      var iValue = i;
      break;
    } else {
      loginTrue = false;
    }
  }

  if (loginTrue) {
    localStorage.setItem("idUserLogin", userLogin[iValue].id);
    alert("Đăng nhập thành công");
    window.location.href = "../index.html";
  } else {
    alert("Tài khoản không tồn tại");
  }
}
function signUpClick() {
  window.location.href = "./register.html";
}
function homeClick() {
  window.location.href = "../index.html";
}
