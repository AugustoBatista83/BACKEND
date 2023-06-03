// Definir la clase Product que representa un producto con las propiedades: title, description, price, thumbnail, code y stock
class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

// Definir la clase ProductManager que gestiona un conjunto de productos
class ProductManager {
  constructor(products) {
    this.products = products || []; // Asignar el arreglo de productos dado o uno vacío si no se proporciona
    this.id = 0; // Inicializar el id autoincrementable
  }

  // Añadir un producto al conjunto de productos
  addProduct(product) {
    // Validar que todos los campos del producto sean obligatorios
    if (
      product.title &&
      product.description &&
      product.price &&
      product.thumbnail &&
      product.code &&
      product.stock
    ) {
      // Validar que no se repita el campo code
      let exists = this.products.some(
        (p) => p.code === product.code
      ); // Buscar si algún producto tiene el mismo código
      if (!exists) {
        // Si no existe ningún producto con el mismo código
        product.id = ++this.id; // Asignar el id autoincrementable al producto
        this.products.push(product); // Agregar el producto al final del arreglo
        console.log("Producto agregado con éxito"); // Mostrar un mensaje de éxito por consola
      } else {
        // Si existe algún producto con el mismo código
        console.log("Error: ya existe un producto con ese código"); // Mostrar un mensaje de error por consola
      }
    } else {
      // Si algún campo del producto está vacío
      console.log("Error: todos los campos son obligatorios"); // Mostrar un mensaje de error por consola
    }
  }

  // Obtener el arreglo con todos los productos creados hasta ese momento
  getProducts() {
    return this.products; // Devolver el arreglo de productos
  }

  // Obtener el producto que coincida con el id dado
  getProductById(id) {
    let product = this.products.find((p) => p.id === id); // Buscar el producto que tenga el mismo id
    if (product) {
      // Si se encuentra el producto
      return product; // Devolver el producto encontrado
    } else {
      // Si no se encuentra el producto
      console.log("Error: Not found"); // Mostrar un mensaje de error por consola
    }
  }
}
