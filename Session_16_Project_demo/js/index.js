const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

function signInClick() {
  window.location.href = "../pages/login.html";
}
function signUpClick() {
  window.location.href = "../pages/register.html";
}
/* let productStockList1 = [
  {
    name: "Bulong lục giác",
    price: 2003,
    img: "../assets/ImgFile/bolt1.jpg",
    status:true,
    id:Math.floor(Math.random() * 84345) + new Date().getMilliseconds(),
  },
  {
    name: "Bulong M10",
    price: 2006,
    img: "../assets/ImgFile/bolt2.jpg",
    status:true,
    id:Math.floor(Math.random() * 84345) + new Date().getMilliseconds(),
  },
  {
    name: "Bulong đầu bằng",
    price: 2090,
    img: "../assets/ImgFile/bolt3.jpg",
    status:true,
    id:Math.floor(Math.random() * 84345) + new Date().getMilliseconds(),
  },
  {
    name: "Bulong lục M8",
    price: 2900,
    img: "../assets/ImgFile/bolt4.jpg",
    status:true,
    id:Math.floor(Math.random() * 84345) + new Date().getMilliseconds(),
  },
  {
    name: "Bulong đầu trụ",
    price: 2700,
    img: "../assets/ImgFile/bolt5.jpg",
    status:true,
    id:Math.floor(Math.random() * 84345) + new Date().getMilliseconds(),
  },
  {
    name: "Bulong đầu dù",
    price: 2500,
    img: "../assets/ImgFile/bolt6.jpg",
    status:true,
    id:Math.floor(Math.random() * 84345) + new Date().getMilliseconds(),
  },
  {
    name: "Bulong ren suốt",
    price: 2050,
    img: "../assets/ImgFile/bolt7.webp",
    status:true,
    id:Math.floor(Math.random() * 84345) + new Date().getMilliseconds(),
  },
  {
    name: "Bulong M12",
    price: 2040,
    img: "../assets/ImgFile/bolt8.webp",
    status:true,
    id:Math.floor(Math.random() * 84345) + new Date().getMilliseconds(),
  },
  {
    name: "Bulong neo",
    price: 2200,
    img: "../assets/ImgFile/bolt9.jpg",
    status:true,
    id:Math.floor(Math.random() * 84345) + new Date().getMilliseconds(),
  },
  {
    name: "Bulong ren lửng",
    price: 2100,
    img: "../assets/ImgFile/bolt10.jpg",
    status:true,
    id:Math.floor(Math.random() * 84345) + new Date().getMilliseconds(),
  },
];
localStorage.setItem("products", JSON.stringify(productStockList1)); */

let productStockList = JSON.parse(localStorage.getItem("products")) || [];
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
    if (i >= start && i < end && productCurrent[i].status == true) {
      text += `
        <div class="products__content">
             <div class="products__content-img">
                <img src="${productCurrent[i].img}" alt="" class="imgBolt" />
             </div>
             <div class="products__content-text">
               <p class="content-detail">Sản phẩm:${productCurrent[i].name}</p>
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
  document.getElementsByClassName("products__detail")[0].innerHTML = text;
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
    document.getElementById("showNotice").textContent =
      "Hãy đăng nhập để mua hàng";
    showCartNotice();
    return;
  }

  for (let i = 0; i < userLocal.length; i++) {
    if (userLocal[i].id == checkIdLogin) {
      if (userLocal[i].status == 0) {
        document.getElementById("showNotice").textContent =
          "Tài khoản của bạn đã bị khóa";
        showCartNotice();
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
            showCartNotice();
          } else {
            userLocal[i].cart.push({ ...productsLocal[j], quantity: 1 });
            localStorage.setItem("userList", JSON.stringify(userLocal));
            showCartQuantity();
            showCartNotice();
          }
          break;
        }
      }
      break;
    }
  }
}

function showCartNotice() {
  let x = document.getElementById("showNotice");
  x.className = "show";
  setTimeout(function () {
    x.className = x.className.replace("show", "");
  }, 3000);
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
    )[0].innerHTML = `Xin chào,</br> ${cartOfUser[checkUsing].name}`;
    document.getElementById("boughtQuantityCart").innerHTML =
      cartOfUser[checkUsing].cart.length;
  } else {
    document.getElementsByClassName("header__fist-helloBtn")[0].style.display =
      "none";
  }
}
showCartQuantity();

function signOutClick() {
  localStorage.removeItem("idUserLogin");
  document.getElementsByClassName("signBtn")[0].style.display = "block";
  document.getElementsByClassName("signBtn")[1].style.display = "block";
  document.getElementsByClassName("header__fist-helloBtn")[0].style.display =
    "none";
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
  let idCart = localStorage.getItem("idUserLogin") || [];
  console.log(idCart);
  let userCart = JSON.parse(localStorage.getItem("userList")) || [];
  console.log(userCart);
  if (idCart == "") {
    document.getElementById("showNotice").textContent = "Bạn chưa đăng nhập";
    showCartNotice();
    return;
  } else {
    for (let i = 0; i < userCart.length; i++) {
      if (userCart[i].id == idCart) {
        if (userCart[i].status == 0) {
          document.getElementById("showNotice").textContent =
            "Tài khoản của bạn đã bị khóa";
          showCartNotice();
          return;
        }
      }
    }
  }
  window.location.href = "../pages/checkout_cart.html";
}

let slideIndex;
function showSlides() {
 
  let slides = document.getElementsByClassName("header-img");
  let dots = document.getElementsByClassName("dot");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active","");
  }
  slides[slideIndex].style.display = "block";
  dots[slideIndex].className += " active";  /* không xóa khoảng trống */
  slideIndex++;
  if (slideIndex > slides.length-1) {
    slideIndex = 0;
  }
  setTimeout(showSlides, 5000);
}
showSlides(slideIndex = 0);

function currentSlide(n) {
  showSlides(slideIndex = n);
}
