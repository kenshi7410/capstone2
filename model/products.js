//  export
class Products {
  constructor(name, price, screen, backCamera, frontCamera, img, desc, type) {
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
  }
  render(index) {
    return `
    <div class="item">
    <div class="img">
      <img
        src= ${this.img}
        alt=""
      />
    </div>
    <div >
      <div class="item-text">
      <h2>${this.name}</h2>
      <p>Mô Tả : ${this.desc}</p>
      <ul>
        <li>${this.screen}</li> 
        <li>${this.backCamera}</li> 
        <li>${this.frontCamera}</li>
      </ul>
      </div>
      <div class="item-price">
      <p>Giá Sản Phẩm : ${this.price}</p>
      <button onclick="purchase(${index})" id="${index}" >Add</button>
      </div>
    </div>
  </div>
    `;
  }
}
