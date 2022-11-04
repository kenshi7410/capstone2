//  import { Products } from "./model/products.js";

let productList = [];
let cart = [];

const startInfor = async () => {
  //1. call api
  try {
    const res = await axios({
      url: "https://633f9e09e44b83bc73bda754.mockapi.io/Products",
      method: "GET",
    });
    productList = mapData(res.data);

    renderProduct(productList);
  } catch (err) {
    console.log(err);
  }
};

const mapData = (dataAPI) => {
  const result = [];
  dataAPI.forEach((item) => {
    const { name, price, screen, backCamera, frontCamera, img, desc, type } =
      item;

    result.push(
      new Products(
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type
      )
    );
  });
  return result;
};

const renderProduct = (data) => {
  var productHTML = "";
  for (let i in data) {
    productHTML += data[i].render(+i);
  }
  document.getElementById("productList").innerHTML = productHTML;
};

const selectProduct = () => {
  const result = [];
  let flag = false;

  let ab = document.getElementById("abc").value;

  for (let i in productList) {
    if (productList[i].type === ab) {
      result.push(productList[i]);
      flag = true;
    }
  }
  if (flag) {
    renderProduct(result);
  } else startInfor();
};
const purchase = (index) => {
  let cartItem = { product: {}, quantity: {} };
  cartItem.product = productList[index];
  cartItem.quantity = 1;
  let itemcart = cartItem.product.name;
  let indexNumber;
  let flag = true;
  cart.forEach((item, index) => {
    if (item.product.name === itemcart) {
      flag = false;
      indexNumber = index;
    }
  });
  if (flag) {
    cart.push(cartItem);
  } else {
    cart[indexNumber].quantity += 1;
  }
};

const renderCart = () => {
  var cartHTML = `<tr>
  <th>Tên</th>
  <th>Số Lượng</th>
  <th>Giá</th>
  <th>Xóa</th>
</tr>`;
  for (let i in cart) {
    cartHTML += `
      <tr>
        <td>${cart[i].product.name}</td>
        <td class="add">
        <button  value="minus" onclick="addCart(${i},value)"><i class="fa-solid fa-minus"></i></button>
        
        ${cart[i].quantity}
        <button  value="add" onclick="addCart(${i},value)"><i class="fa-solid fa-plus"></i></button>
        </td>
        <td class="price">${cart[i].quantity * cart[i].product.price}</td>
        <td class="delete"><button   onclick="deleteCart(${i})"><i class="fa-solid fa-trash"></i></button></td>
      </tr>
    
    `;
  }
  document.getElementById("cartshop").innerHTML = cartHTML;
  document.getElementById("row").style.display = "inline-block";
  document.getElementById("productList").style.position = "fixed";
  totalMoney();
  setCartList();
};

const addCart = (id, value) => {
  let result = cart[id];
  if (value === "add") {
    result.quantity += 1;
  } else {
    result.quantity -= 1;
  }
  renderCart();
  if (result.quantity <= 0) {
    deleteCart(id);
  }
};

const deleteCart = (id) => {
  cart.splice(id, 1);
  renderCart();
};

const totalMoney = () => {
  let totalmoney = 0;
  for (let i in cart) {
    totalmoney += cart[i].quantity * cart[i].product.price;
  }
  document.getElementById("allMoney").innerHTML = totalmoney;
};

const setCartList = () => {
  let cartListJSON = JSON.stringify(cart);
  localStorage.setItem("commodity", cartListJSON);
};
const getCartList = () => {
  let cartListJSON = localStorage.getItem("commodity");
  if (!cartListJSON) return;
  cart = JSON.parse(cartListJSON);
};
const pay = () => {
  cart=[];
  renderCart()
};

const close = ()=>{
  document.getElementById("row").style.display="none";
  document.getElementById("productList").style.position = ""
}

window.onload = () => {
  startInfor();
  document.getElementById("abc").addEventListener("change", selectProduct);
  document.getElementById("btn-cart").addEventListener("click", renderCart);
  document.getElementById("btn-pay").addEventListener("click", pay);
  getCartList();
  document.getElementById("close").addEventListener("click", close);
  document.getElementById("cartshop-full").addEventListener("click", close);
};
