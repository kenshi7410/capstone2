class ProductsAdmin {
  constructor(name, price, screen, backCamera, frontCamera, img, desc, type,id) {
    this.name = name;
    this.price = price;
    this.screen = screen;
    this.backCamera = backCamera;
    this.frontCamera = frontCamera;
    this.img = img;
    this.desc = desc;
    this.type = type;
    this.id=id
  }
  render(index) {
    return `
      <tr>
                <td>${index}</td>
                <td>${this.name}</td>
                <td>${this.price}</td>
                <td>
                <ul>
                <li>${this.screen}</li>
                <li>${this.backCamera}</li>
                <li>${this.frontCamera}</li>
                </ul>
                </td>
                <td>${this.desc}</td>
                <td>
                <button class="btn-delete" onclick="deleteProduct(${this.id},${index})">Delete</button>
                <button class="btn-update" onclick="updateProduct(${this.id},${index})">Update</button>
                </td>
            </tr>
      `;
  }
}
