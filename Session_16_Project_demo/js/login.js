function signInClick() {
  let emailValue = document.getElementById("emailInputLogin").value;
  let passwordValue = document.getElementById("passwordInputLogin").value;
  let userLogin = JSON.parse(localStorage.getItem("userList")) || [];
  
  let email=false
  let pass=false
  for (let i = 0; i < userLogin.length; i++) {

    if (!emailValue) {
      document.getElementsByClassName("emailNotice")[0].textContent = "Bạn chưa nhập email";
    } else if(emailValue==userLogin[i].email) {
      document.getElementsByClassName("emailNotice")[0].textContent = "";
      email = true;
    } else{
      document.getElementsByClassName("emailNotice")[0].textContent = "";
    }

    if (!passwordValue) {
      document.getElementsByClassName("passNotice")[0].textContent =
        "Bạn chưa nhập mật khẩu";
    } else if (passwordValue==userLogin[i].password) {
      document.getElementsByClassName("passNotice")[0].textContent = "";
      pass = true;
    } else{
      document.getElementsByClassName("passNotice")[0].textContent = "";
    }

    if (email&&pass) {
      var idIndex=i
      break
    }
  }
  if (email&&pass) {
    localStorage.setItem("idUserLogin", userLogin[idIndex].id);
    alert("Đăng nhập thành công");
    window.location.href = "../index/index.html";
  } else if(emailValue&&passwordValue) {
    alert("Tài khoản không tồn tại");
  }

  
}
function signUpClick() {
  window.location.href = "./register.html";
}
function homeClick() {
  window.location.href = "../index/index.html";
}
