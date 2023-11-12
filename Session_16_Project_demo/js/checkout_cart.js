const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
let userCheckOut = JSON.parse(localStorage.getItem("userList"));
let idCheckOut = localStorage.getItem("idUserLogin");
console.log(userCheckOut);

function checkOutCart() {
  for (let i = 0; i < userCheckOut.length; i++) {
    if (userCheckOut[i].id == idCheckOut) {
      let textOut = "";
      for (let j = 0; j < userCheckOut[i].cart.length; j++) {
        textOut += `
            <tr >
                <td>${j + 1}</td>
                <td>${userCheckOut[i].cart[j].name}</td>
                <td><img class="imgOut" src=.${
                  userCheckOut[i].cart[j].img
                }></td>
                <td>${VND.format(userCheckOut[i].cart[j].price)}</td>
                <td class="quantityOut"><span class="quantityBtn" onclick="decrease(${
                  userCheckOut[i].cart[j].id
                })"> - </span>
                <p class="quantityNumber">${
                  userCheckOut[i].cart[j].quantity
                } </p>
                
                <span class="quantityBtn" onclick="increase(${
                  userCheckOut[i].cart[j].id
                })">+</span></td>
                <td>${VND.format(
                  userCheckOut[i].cart[j].price *
                    userCheckOut[i].cart[j].quantity
                )}</td>
                <td><p  class="deleteProduct" onclick="deletePro(${
                  userCheckOut[i].cart[j].id
                })">xóa</p></td>
            </tr>
     `;
      }
      document.getElementById("buyTableTotal").innerHTML = textOut;
    }
    break;
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
          if (userCheckOut[i].cart[j].quantity <= 1) {
            userCheckOut[i].cart[j].quantity = 1;
            localStorage.setItem("userList", JSON.stringify(userCheckOut));
            checkOutCart();
          }
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
          confirm("Bạn có muốn xóa sản phẩm không");
          userCheckOut[i].cart.splice(userCheckOut[i].cart[j], 1);
          localStorage.setItem("userList", JSON.stringify(userCheckOut));
          checkOutCart();
          break;
        }
      }
    }
  }
}
