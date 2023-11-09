let productsBolt = [
  {
    name: "bolt1",
    price: 2003,
    img: "./ImgFile/bolt1.jpg",
    id: 100,
  },
  {
    name: "bolt2",
    price: 2006,
    img: "./ImgFile/bolt2.jpg",
    id: 101,
  },
  {
    name: "bolt3",
    price: 2090,
    img: "./ImgFile/bolt3.jpg",
    id: 102,
  },
  {
    name: "bolt4",
    price: 2900,
    img: "./ImgFile/bolt4.jpg",
    id: 103,
  },
  {
    name: "bolt5",
    price: 2700,
    img: "./ImgFile/bolt5.jpg",
    id: 104,
  },
  {
    name: "bolt6",
    price: 2500,
    img: "./ImgFile/bolt6.jpg",
    id: 105,
  },
  {
    name: "bolt7",
    price: 2050,
    img: "./ImgFile/bolt7.webp",
    id: 106,
  },
  {
    name: "bolt8",
    price: 2040,
    img: "./ImgFile/bolt8.webp",
    id: 107,
  },
  {
    name: "bolt9",
    price: 2200,
    img: "./ImgFile/bolt9.jpg",
    id: 108,
  },
  {
    name: "bolt10",
    price: 2100,
    img: "./ImgFile/bolt10.jpg",
    id: 109,
  },
];
localStorage.setItem("products", JSON.stringify(productsBolt))

let itemPage = 4;
let totalPage = Math.ceil(productsBolt.length / itemPage);
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
  for (let i = 0; i < productsBolt.length; i++) {
    if (i >= start && i < end) {
      text += `
        <div class="products__content">
             <div class="products__content-img">
                <img src="${productsBolt[i].img}" alt="" class="imgBolt" />
             </div>
             <div class="products__content-text">
               <p class="content-name">${productsBolt[i].name}</p>
               <p class="content-price">${productsBolt[i].price}</p>
               <p onclick="addToCart"> Thêm vào giỏ hàng
                  <span class="material-symbols-outlined"> shopping_cart </span>
               </p>
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
       text += 
            `
            <li onclick=choosePage(${i}) class="page-item ">${i}</li>
            `;
  }
  document.getElementsByClassName("listPage")[0].innerHTML = 
            `
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
      pageItem[i].classList.add("page");
    } else {
      pageItem[i].classList.remove("page");
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
