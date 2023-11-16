const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
let userCheckOut = JSON.parse(localStorage.getItem("userList"));
let idCheckOut = localStorage.getItem("idUserLogin");

function checkOutCart() {
  for (let i = 0; i < userCheckOut.length; i++) {
    if (userCheckOut[i].id == idCheckOut) {
      let Moneytotal=0
      let textOut = "";
      for (let j = 0; j < userCheckOut[i].cart.length; j++) {
        Moneytotal+= userCheckOut[i].cart[j].price *
        userCheckOut[i].cart[j].quantity
        textOut += `
            <tr >
                <td>${j + 1}</td>
                <td>${userCheckOut[i].cart[j].name}</td>
                <td><img class="imgOut" src=.${userCheckOut[i].cart[j].img}></td>
                <td>${VND.format(userCheckOut[i].cart[j].price)}</td>
                <td>
                  <div  class="quantityOut">
                    <span class="quantityBtn" onclick="decrease(${userCheckOut[i].cart[j].id})"> - </span>
                    <p class="quantityNumber">${userCheckOut[i].cart[j].quantity} </p>
                    <span class="quantityBtn" onclick="increase(${userCheckOut[i].cart[j].id})">+</span></td>
                  </div>
                <td>${VND.format(userCheckOut[i].cart[j].price * userCheckOut[i].cart[j].quantity)}</td>
                <td class="boderHidden">
                  <span onclick="deletePro(${userCheckOut[i].cart[j].id})" class="material-symbols-outlined deleteProduct">remove_shopping_cart</span>
                </td>
            </tr>
     `;
      }
      document.getElementById("buyTableTotal").innerHTML = textOut;
      document.getElementById("total").innerHTML=`${VND.format(Moneytotal)}`
      break;
    }
  }
}
checkOutCart();

function increase(idProduct) {
  for (let i = 0; i < userCheckOut.length; i++) {
    if (userCheckOut[i].id == idCheckOut) {
      for (let j = 0; j < userCheckOut[i].cart.length; j++) {
        if (userCheckOut[i].cart[j].id == idProduct) {
          userCheckOut[i].cart[j].quantity = ++userCheckOut[i].cart[j].quantity;
          localStorage.setItem("userList", JSON.stringify(userCheckOut));
          checkOutCart();
          break;
        }
      }
    }
  }
}

function decrease(idProduct) {
  for (let i = 0; i < userCheckOut.length; i++) {
    if (userCheckOut[i].id == idCheckOut) {
      for (let j = 0; j < userCheckOut[i].cart.length; j++) {
        if (userCheckOut[i].cart[j].id == idProduct) {
          userCheckOut[i].cart[j].quantity = --userCheckOut[i].cart[j].quantity;
          if (userCheckOut[i].cart[j].quantity <2) {
            userCheckOut[i].cart[j].quantity = 1;
            localStorage.setItem("userList", JSON.stringify(userCheckOut));
            checkOutCart();
          }
          checkOutCart();
        }
      }
    }
  }
}

function deletePro(idProduct) {
  for (let i = 0; i < userCheckOut.length; i++) {
    if (userCheckOut[i].id == idCheckOut) {
      for (let j = 0; j < userCheckOut[i].cart.length; j++) {
        if (userCheckOut[i].cart[j].id == idProduct) {
          let confirmOk=confirm("Bạn có muốn xóa sản phẩm không");
          if (confirmOk) {
            userCheckOut[i].cart.splice(userCheckOut[i].cart[j], 1);
          localStorage.setItem("userList", JSON.stringify(userCheckOut));
          checkOutCart();
          break;
          }
        }
      }
    }
  }
}
function homeBack() {
  window.location.href="../index.html"
}
function payMoney() {
  window.location.href="../pages/user_pay.html"
}