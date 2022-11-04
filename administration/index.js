let productList = [];

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
    const {
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type,
      id,
    } = item;

    result.push(
      new ProductsAdmin(
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type,
        id
      )
    );
  });
  return result;
};
const renderProduct = (data) => {
  var productHTML = `
  <tr>
  <th>STT</th>
  <th>Tên Sản Phẩm</th>
  <th>Giá</th>
  <th>Thông Số</th>
  <th>Mô Tả</th>
  <th>Action</th>
</tr>
  `;
  for (let i in data) {
    productHTML += data[i].render(+i + 1);
  }
  document.getElementById("productListTable").innerHTML = productHTML;
};

//tạo sản phẩm mới
const createProduct = async () => {
  var isFormValid = validateForm();
  if (!isFormValid) return;
  // 1.lấy input
  let name = document.getElementById("txtnameProduct").value;
  let price = document.getElementById("txtpriceProduct").value;
  let screen = document.getElementById("txtscreenProduct").value;
  let backCamera = document.getElementById("txtbackCameraProduct").value;
  let frontCamera = document.getElementById("txtfrontCameraProduct").value;
  let img = document.getElementById("txtimgProduct").value;
  let desc = document.getElementById("txtdescProduct").value;
  let type = document.getElementById("txttypeProduct").value;

  // 2. check sản phẩm
  for (var i = 0; i < productList.length; i++) {
    let ab = productList[i].name.toLowerCase().trim();
    let cd = document
      .getElementById("txtnameProduct")
      .value.toLowerCase()
      .trim();
    if (ab === cd) {
      alert("sản phẩm đã tồn tại!!!");
      return;
    }
  }

  //3. tạo object sản phẩm mới (input)
  var newProduct = new ProductsAdmin(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  //4. push lên api
  try {
    await axios({
      url: "https://633f9e09e44b83bc73bda754.mockapi.io/Products",
      method: "POST",
      data: newProduct,
    });
  } catch (err) {
    console.log(err);
  }
  startInfor();
};

//xóa sản phẩm
const deleteProduct = async (id, index) => {
  try {
    await axios({
      url: `https://633f9e09e44b83bc73bda754.mockapi.io/Products/${id}`,
      method: "DELETE",
    });
  } catch (err) {
    console.log(err);
  }
  startInfor();
};
//cập nhật sản phẩm
let idResult;
const updateProduct = (id, index) => {
  let result = productList[index - 1];
  console.log(result);
  document.getElementById("txtnameProduct").value = result.name;
  document.getElementById("txtpriceProduct").value = result.price;
  document.getElementById("txtscreenProduct").value = result.screen;
  document.getElementById("txtbackCameraProduct").value = result.backCamera;
  document.getElementById("txtfrontCameraProduct").value = result.frontCamera;
  document.getElementById("txtimgProduct").value = result.img;
  document.getElementById("txtdescProduct").value = result.desc;
  document.getElementById("txttypeProduct").value = result.type;

  document.getElementById("txtUpdate").style.display = "inline-block";
  document.getElementById("txtAdd").style.display = "none";
  idResult = id;
};
const updateProduct2 = async () => {
  var isFormValid = validateForm();
  if (!isFormValid) return;
  let name = document.getElementById("txtnameProduct").value;
  let price = document.getElementById("txtpriceProduct").value;
  let screen = document.getElementById("txtscreenProduct").value;
  let backCamera = document.getElementById("txtbackCameraProduct").value;
  let frontCamera = document.getElementById("txtfrontCameraProduct").value;
  let img = document.getElementById("txtimgProduct").value;
  let desc = document.getElementById("txtdescProduct").value;
  let type = document.getElementById("txttypeProduct").value;
  //tạo mới
  var newProduct = new ProductsAdmin(
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );
  try {
    await axios({
      url: `https://633f9e09e44b83bc73bda754.mockapi.io/Products/${idResult}`,
      method: "PUT",
      data: newProduct,
    });
  } catch (err) {
    console.log(err);
  }

  startInfor();
  document.getElementById("txtUpdate").style.display = "none";
  document.getElementById("txtAdd").style.display = "inline-block";
  (document.getElementById("txtnameProduct").value = ""),
    (document.getElementById("txtpriceProduct").value = "");
  document.getElementById("txtscreenProduct").value = "";
  document.getElementById("txtbackCameraProduct").value = "";
  document.getElementById("txtfrontCameraProduct").value = "";
  document.getElementById("txtimgProduct").value = "";
  document.getElementById("txtdescProduct").value = "";
  document.getElementById("txttypeProduct").value = "";
};

const validateForm = () => {
  //kiểm tra form
  let nameProduct = document.getElementById("txtnameProduct").value;
  let priceProduct = document.getElementById("txtpriceProduct").value;
  let screenProduct = document.getElementById("txtscreenProduct").value;
  let backCameraProduct = document.getElementById("txtbackCameraProduct").value;
  let frontCameraProduct = document.getElementById(
    "txtfrontCameraProduct"
  ).value;
  let typeProduct = document.getElementById("txttypeProduct").value;
  let imgProduct = document.getElementById("txtimgProduct").value;
  let descProduct = document.getElementById("txtdescProduct").value;

  var isValid = true;

  isValid &=
    required(nameProduct, "txtnameProduct") &&
    checkLenght(nameProduct, "txtnameProduct", 5, 30) &&
    string(nameProduct, "txtnameProduct");
  isValid &=
    required(priceProduct, "txtpriceProduct") &&
    checkLenght(priceProduct, "txtpriceProduct", 4, 20) &&
    number(priceProduct, "txtpriceProduct");
  isValid &=
    required(screenProduct, "txtscreenProduct") &&
    checkLenght(screenProduct, "txtscreenProduct", 2, 40);
  isValid &=
    required(backCameraProduct, "txtbackCameraProduct") &&
    checkLenght(backCameraProduct, "txtbackCameraProduct", 2, 40);
  isValid &=
    required(frontCameraProduct, "txtfrontCameraProduct") &&
    checkLenght(frontCameraProduct, "txtfrontCameraProduct", 2, 40);
  isValid &= required(typeProduct, "txttypeProduct");
  isValid &= required(imgProduct, "txtimgProduct");
  isValid &= required(descProduct, "txtdescProduct");

  return isValid;
};

//validation
//required
const required = (val, spanId) => {
  if (val.length === 0) {
    document.getElementById(spanId).placeholder = "*trường này bắt buộc nhập";
    return false;
  }
  return true;
};
//min length, max length
const checkLenght = (val, spanId, min, max) => {
  if (val.length < min || val.length > max) {
    document.getElementById(spanId).value = "";
    document.getElementById(
      spanId
    ).placeholder = `*Độ dài phải từ ${min} tới ${max} kí tự`;
    return false;
  }

  return true;
};
//pattern check name
const string = (val, spanId) => {
  var pattern = /^[A-z 0-9 ]+$/g;
  if (pattern.test(val)) {
    return true;
  }
  document.getElementById(spanId).value = "";
  document.getElementById(
    spanId
  ).placeholder = `*chỉ chấp nhận kí tự từ a tới z`;
  return false;
};
const number = (val, spanId) => {
  var filter = /^[0-9-+]+$/;
  if (filter.test(val)) {
    return true;
  }
  document.getElementById(spanId).value = "";
  document.getElementById(
    spanId
  ).placeholder = `*chỉ chấp nhận kí tự từ 0 tới 9`;
  return false;
};

window.onload = () => {
  startInfor();
  document.getElementById("txtAdd").addEventListener("click", createProduct);
  document
    .getElementById("txtUpdate")
    .addEventListener("click", updateProduct2);
};
