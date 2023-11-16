const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

function signInClick() {
  window.location.href = "./pages/login.html";
}
function signUpClick() {
  window.location.href = "./pages/register.html";
}
let productStockList = [
  {
    name: "Bulong lục giác",
    price: 2003,
    img: "./assets/ImgFile/bolt1.jpg",
    id: 100,
  },
  {
    name: "Bulong M10",
    price: 2006,
    img: "./assets/ImgFile/bolt2.jpg",
    id: 101,
  },
  {
    name: "Bulong đầu bằng",
    price: 2090,
    img: "./assets/ImgFile/bolt3.jpg",
    id: 102,
  },
  {
    name: "Bulong lục M8",
    price: 2900,
    img: "./assets/ImgFile/bolt4.jpg",
    id: 103,
  },
  {
    name: "Bulong đầu trụ",
    price: 2700,
    img: "./assets/ImgFile/bolt5.jpg",
    id: 104,
  },
  {
    name: "Bulong đầu dù",
    price: 2500,
    img: "./assets/ImgFile/bolt6.jpg",
    id: 105,
  },
  {
    name: "Bulong ren suốt",
    price: 2050,
    img: "./assets/ImgFile/bolt7.webp",
    id: 106,
  },
  {
    name: "Bulong M12",
    price: 2040,
    img: "./assets/ImgFile/bolt8.webp",
    id: 107,
  },
  {
    name: "Bulong neo",
    price: 2200,
    img: "./assets/ImgFile/bolt9.jpg",
    id: 108,
  },
  {
    name: "Bulong ren lửng",
    price: 2100,
    img: "./assets/ImgFile/bolt10.jpg",
    id: 109,
  },
];
localStorage.setItem("products", JSON.stringify(productStockList));

let itemPage = 3;
let totalPage = 1;
let currentPage = 1;
let start;
let end;

function totalPageCurrent(pages) {
  totalPage = Math.ceil(pages.length / itemPage);
  showListPage;
}
totalPageCurrent(productStockList);

function startEnd(current) {
  start = (current - 1) * itemPage;
  end = start + itemPage;
}
startEnd(1);

function showProduct(productCurrent) {
  let text = "";
  for (let i = 0; i < productCurrent.length; i++) {
    if (i >= start && i < end) {
      text += `
        <div class="products__content">
             <div class="products__content-img">
                <img src="${productCurrent[i].img}" alt="" class="imgBolt" />
             </div>
             <div class="products__content-text">
               <p class="content-detail">Tên sản phẩm: ${
                 productCurrent[i].name
               }</p>
               <p class="content-detail"> Giá: ${VND.format(
                 productCurrent[i].price
               )}</p>
               <span class="content-addCart">
                  <p class="content-detail">Thêm vào giỏ hàng</p>
                  <span onclick="addToCartList(${
                    productCurrent[i].id
                  })" class="material-symbols-outlined checkinCart"> shopping_cart </span>
               </span> 
            </div>
        </div>
        `;
    }
  }
  document.getElementsByClassName("products")[0].innerHTML = text;
}
showProduct(productStockList);

function showListPage() {
  let text = "";
  for (let i = 1; i <= totalPage; i++) {
    text += `
            <li onclick=choosePage(${i}) class="page-item ">${i}</li>
            `;
  }
  document.getElementsByClassName("listPage")[0].innerHTML = `
            <span class="material-symbols-outlined pageBtn" onclick="prePage()"> navigate_before </span>
            ${text}
            <span class="material-symbols-outlined pageBtn" onclick="nextPage()" > navigate_next </span>
           `;
}
showListPage();

function choosePage(a) {
  let pageItem = document.getElementsByClassName("page-item");
  currentPage = a;
  for (let i = 0; i < pageItem.length; i++) {
    if (i == a - 1) {
      pageItem[i].classList.add("pageActived");
    } else {
      pageItem[i].classList.remove("pageActived");
    }
  }
  startEnd(currentPage);
  showProduct(productStockList);
}

function nextPage() {
  currentPage++;
  if (currentPage > totalPage) {
    currentPage = totalPage;
  }
  choosePage(currentPage);
}
function prePage() {
  currentPage--;
  if (currentPage < 1) {
    currentPage = 1;
  }
  choosePage(currentPage);
}

function addToCartList(idProductBuy) {
  let productsLocal = JSON.parse(localStorage.getItem("products")) || [];
  let userLocal = JSON.parse(localStorage.getItem("userList")) || [];
  let checkIdLogin = localStorage.getItem("idUserLogin");

  if (!checkIdLogin) {
    alert("Vui lòng đăng nhập để mua hàng");
    return;
  }

  for (let i = 0; i < userLocal.length; i++) {
    if (userLocal[i].id == checkIdLogin) {
      if (userLocal[i].status == 0) {
        alert("Tài khoản của bạn đã bị khóa");
        return;
      }
      for (let j = 0; j < productsLocal.length; j++) {
        if (productsLocal[j].id == idProductBuy) {
          let resultBoughtItemIndex = userLocal[i].cart.findIndex((itemBuy) => {
            return itemBuy.id == productsLocal[j].id;
          });

          if (resultBoughtItemIndex != -1) {
            userLocal[i].cart[resultBoughtItemIndex].quantity = ++userLocal[i]
              .cart[resultBoughtItemIndex].quantity;
            localStorage.setItem("userList", JSON.stringify(userLocal));
            showCartQuantity();
            alert("Sản phẩm đã được thêm vào giỏ hàng");
          } else {
            userLocal[i].cart.push({ ...productsLocal[j], quantity: 1 });
            localStorage.setItem("userList", JSON.stringify(userLocal));
            showCartQuantity();
            alert("Sản phẩm đã được thêm vào giỏ hàng");
          }
          break;
        }
      }
      break;
    }
  }
}

function showCartQuantity() {
  let cartOfUser = JSON.parse(localStorage.getItem("userList"));
  let checkLoginDone = localStorage.getItem("idUserLogin");
  if (checkLoginDone) {
    document.getElementsByClassName("signBtn")[0].style.display = "none";
    document.getElementsByClassName("signBtn")[1].style.display = "none";
    let checkUsing = cartOfUser.findIndex((userUsing) => {
      return userUsing.id == checkLoginDone;
    });
    document.getElementsByClassName(
      "helloUserUsing"
    )[0].innerHTML = `Xin chào, ${cartOfUser[checkUsing].name}`;
    document.getElementById("boughtQuantityCart").innerHTML =
      cartOfUser[checkUsing].cart.length;
  } else {
    document.getElementsByClassName("helloUserUsing")[0].style.display = "none";
    document.getElementsByClassName("signOut")[0].style.display = "none";
  }
}
showCartQuantity();

function signOutClick() {
  localStorage.removeItem("idUserLogin");
  document.getElementsByClassName("signBtn")[0].style.display = "block";
  document.getElementsByClassName("signBtn")[1].style.display = "block";
  document.getElementsByClassName("helloUserUsing")[0].style.display = "none";
  document.getElementsByClassName("signOut")[0].style.display = "none";
  document.getElementById("boughtQuantityCart").innerText = "0";
}

function startSearch() {
  let searchValue = document.getElementById("searchProduct").value;
  let resultSearch = productStockList.filter((itemSearch) => {
    return itemSearch.name.indexOf(searchValue) != -1;
  });
  showProduct(resultSearch);
  totalPageCurrent(resultSearch);
  showListPage();
}
let timeId;
function search(param1, param2) {
  if (timeId) {
    clearTimeout(timeId);
  }
  timeId = setTimeout(() => {
    param1();
  }, param2);
}

function checkOutCart() {
  window.location.href = "./pages/checkout_cart.html";
}
