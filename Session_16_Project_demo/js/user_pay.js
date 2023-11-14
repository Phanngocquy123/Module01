let userPay = JSON.parse(localStorage.getItem("userList"));
let idPay = localStorage.getItem("idUserLogin");

function payProduct() {
    for (let i = 0; i < userPay.length; i++) {
        if (userPay[i].id==idPay) {
            userPay[i].cart=[]
            localStorage.setItem("userList",JSON.stringify(userPay))
        }
        break;
    }
}

function homePage() {
    window.location.href="../index.html"
}