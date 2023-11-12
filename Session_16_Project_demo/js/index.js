const VND = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

function signInClick() {
  window.location.href = "./pages/login.html";
}
function signUpClick() {
  window.location.href = "./pages/register.html";
}
let productGoodsList = [
  {
    name: "bolt1",
    price: 2003,
    img: "./assets/ImgFile/bolt1.jpg",
    id: 100,
  },
  {
    name: "bolt2",
    price: 2006,
    img: "./assets/ImgFile/bolt2.jpg",
    id: 101,
  },
  {
    name: "bolt3",
    price: 2090,
    img: "./assets/ImgFile/bolt3.jpg",
    id: 102,
  },
  {
    name: "bolt4",
    price: 2900,
    img: "./assets/ImgFile/bolt4.jpg",
    id: 103,
  },
  {
    name: "bolt5",
    price: 2700,
    img: "./assets/ImgFile/bolt5.jpg",
    id: 104,
  },
  {
    name: "bolt6",
    price: 2500,
    img: "./assets/ImgFile/bolt6.jpg",
    id: 105,
  },
  {
    name: "bolt7",
    price: 2050,
    img: "./assets/ImgFile/bolt7.webp",
    id: 106,
  },
  {
    name: "bolt8",
    price: 2040,
    img: "./assets/ImgFile/bolt8.webp",
    id: 107,
  },
  {
    name: "bolt9",
    price: 2200,
    img: "./assets/ImgFile/bolt9.jpg",
    id: 108,
  },
  {
    name: "bolt10",
    price: 2100,
    img: "./assets/ImgFile/bolt10.jpg",
    id: 109,
  },
];
localStorage.setItem("products", JSON.stringify(productGoodsList));

let itemPage = 3;
let totalPage = Math.ceil(productGoodsList.length / itemPage);
let currentPage = 1;
let start;
let end;

function startEnd(current) {
  start = (current - 1) * itemPage;
  end = start + itemPage;
}
startEnd(1);

function showProduct() {
  let text = "";
  for (let i = 0; i < productGoodsList.length; i++) {
    if (i >= start && i < end) {
      text += `
        <div class="products__content">
             <div class="products__content-img">
                <img src="${productGoodsList[i].img}" alt="" class="imgBolt" />
             </div>
             <div class="products__content-text">
               <p class="content-detail">Tên sản phẩm: ${productGoodsList[i].name}</p>
               <p class="content-detail"> Giá: ${VND.format(productGoodsList[i].price)}</p>
               <span class="content-addCart">
                  <p class="content-detail">Thêm vào giỏ hàng</p>
                  <span onclick="addToCartList(${productGoodsList[i].id})" class="material-symbols-outlined checkinCart"> shopping_cart </span>
               </span> 
            </div>
        </div>
        `;
    }
  }
  document.getElementsByClassName("products")[0].innerHTML = text;
}
showProduct();

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
  showProduct();
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
      for (let j = 0; j < productsLocal.length; j++) {
        if (productsLocal[j].id == idProductBuy) {
          let resultBoughtItemIndex = userLocal[i].cart.findIndex((itemBuy) => {
            return itemBuy.id == productsLocal[j].id;
          });
          
          if (resultBoughtItemIndex != -1) {
            userLocal[i].cart[resultBoughtItemIndex].quantity = ++userLocal[i]
              .cart[resultBoughtItemIndex].quantity;
            localStorage.setItem("userList", JSON.stringify(userLocal));
            showCartQuantity()
          } else {
            userLocal[i].cart.push({ ...productsLocal[j], quantity: 1 });
            localStorage.setItem("userList", JSON.stringify(userLocal));
            showCartQuantity()
          }
          break;
        }
      }
      break;
    }
    break;
  }
}

function showCartQuantity() {
  let cartOfUser=JSON.parse(localStorage.getItem("userList"))
  let checkLoginDone = localStorage.getItem("idUserLogin");
  if(checkLoginDone){
    document.getElementsByClassName("signBtn")[0].style.display="none"
    document.getElementsByClassName("signBtn")[1].style.display="none"
    let checkUsing=cartOfUser.findIndex((userUsing)=>{
      return userUsing.id==checkLoginDone
    })
    document.getElementsByClassName("helloUserUsing")[0].innerHTML=`Xin chào, ${cartOfUser[checkUsing].name}`
    document.getElementById("boughtQuantityCart").innerHTML=cartOfUser[checkUsing].cart.length
  }else{
    document.getElementsByClassName("helloUserUsing")[0].style.display="none"
    document.getElementsByClassName("signOut")[0].style.display="none"
  }
}
showCartQuantity()

function signOutClick() {
  localStorage.removeItem("idUserLogin");
  document.getElementsByClassName("signBtn")[0].style.display="block"
    document.getElementsByClassName("signBtn")[1].style.display="block"
    document.getElementsByClassName("helloUserUsing")[0].style.display="none"
    document.getElementsByClassName("signOut")[0].style.display="none"
}

function checkOutCart() {
  window.location.href = "./pages/checkout_cart.html";
}