const fs = require('fs');

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

class ProductManager {
  constructor(path) {
    this.path = path; // Ruta del archivo de productos
    this.products = []; // Arreglo para almacenar los productos
    this.id = 0; // ID autoincrementable para asignar a cada producto
  }

  // Carga los productos desde el archivo al arreglo de productos (versión asíncrona)
  async loadProductsAsync() {
    try {
      const data = await fs.promises.readFile(this.path, 'utf8'); // Lee el contenido del archivo
      this.products = JSON.parse(data); // Convierte el contenido en un objeto JavaScript
      if (this.products.length > 0) {
        const lastProduct = this.products[this.products.length - 1];
        this.id = lastProduct.id; // Actualiza el ID autoincrementable con el último ID encontrado
      }
    } catch (error) {
      console.log('Error loading products:', error);
    }
  }

  // Guarda los productos del arreglo en el archivo (versión asíncrona)
  async saveProductsAsync() {
    try {
      const data = JSON.stringify(this.products); // Convierte el arreglo de productos en una cadena JSON
      await fs.promises.writeFile(this.path, data, 'utf8'); // Escribe la cadena JSON en el archivo
    } catch (error) {
      console.log('Error saving products:', error);
    }
  }

  // Agrega un nuevo producto al arreglo y lo guarda en el archivo
  async addProduct(product) {
    product.id = ++this.id; // Asigna un ID autoincrementable al producto
    this.products.push(product); // Agrega el producto al arreglo
    await this.saveProductsAsync(); // Guarda los productos en el archivo
    console.log('Producto agregado con éxito');
  }

  // Obtiene todos los productos del arreglo
  getProducts() {
    return this.products;
  }

  // Obtiene un producto por su ID
  getProductById(id) {
    const product = this.products.find((p) => p.id === id); // Busca el producto por su ID
    if (product) {
      return product;
    } else {
      console.log('Error: Producto no encontrado');
    }
  }

  // Actualiza un producto por su ID
  async updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((p) => p.id === id); // Busca el índice del producto por su ID
    if (index !== -1) {
      this.products[index] = { ...updatedProduct, id }; // Actualiza el producto en el arreglo
      await this.saveProductsAsync(); // Guarda los productos en el archivo
      console.log('Producto actualizado con éxito');
    } else {
      console.log('Error: Producto no encontrado');
    }
  }

  // Elimina un producto por su ID
  async deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === id); // Busca el índice del producto por su ID
    if (index !== -1) {
      this.products.splice(index, 1); // Elimina el producto del arreglo
      await this.saveProductsAsync(); // Guarda los productos en el archivo
      console.log('Producto eliminado con éxito');
    } else {
      console.log('Error: Producto no encontrado');
    }
  }
}


//***********************************PRUEBAS********************************************** */
// Ejemplo de uso de la clase ProductManager
const manager = new ProductManager("./products.json");

(async function() {
  // Esperar a que los productos se carguen desde el archivo antes de continuar
  await manager.loadProductsAsync();

  // Agregar dos productos utilizando el método addProduct
  manager.addProduct({
    title: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc123",
    stock: 25,
  });

  manager.addProduct({
    title: "Producto 2",
    description: "Descripción del producto 2",
    price: 199.9,
    thumbnail: "thumbnail2.jpg",
    code: "PRD002",
    stock: 5,
  });

  // Obtener todos los productos utilizando el método getProducts
  console.log("Todos los productos:", manager.getProducts());

  // Obtener un producto por su ID utilizando el método getProductById
  console.log("Producto con ID 2:", await manager.getProductById(2));

  // Buscar un producto que no existe
  console.log("Producto con ID 3:", await manager.getProductById(3));

  // Eliminar un producto utilizando el método deleteProduct
  await manager.deleteProduct(1);
})();


