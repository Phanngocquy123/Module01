let userValue=[]
function signUpClick() {
  let nameValue = document.getElementById("nameInput").value;
    let emailValue=document.getElementById("emailInput").value
    let passwordValue=document.getElementById("paswordInput").value
    let confirmPasswordValue=document.getElementById("confirmPasswordInput").value

  if (nameValue=="") {
    alert("Bạn chưa nhập tên")
  } else if (emailValue=="") {
    alert("Bạn chưa nhập Email")
  } else if (passwordValue=="") {
    alert("Bạn chưa nhập Password")
  } else if (confirmPasswordValue=="") {
    alert("Bạn chưa xác nhận Password")
  } else if (passwordValue!=confirmPasswordValue) {
    alert("Password không khớp")
  } else{
    let objUser={
        name:nameValue,
        email:emailValue,
        passwordValue:passwordValue,
        cart:[],
        id: Math.floor(Math.random() * 848985956562) +
        new Date().getMilliseconds(),
    }
    userValue.push(objUser)
  }
    
  
  localStorage.setItem("userValue",JSON.stringify(userValue))
}
