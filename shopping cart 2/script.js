// Product class
class Product {
    constructor(id, name, price, image) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.image = image;
    }
  }
  
  // ShoppingCartItem class
  class ShoppingCartItem {
    constructor(product, quantity = 1) {
      this.product = product;
      this.quantity = quantity;
    }
  
    calculateTotalPrice() {
      return this.product.price * this.quantity;
    }
  }
  
  // ShoppingCart class
  class ShoppingCart {
    constructor() {
      this.items = [];
    }
  
    getTotalItems() {
      return this.items.reduce((total, item) => total + item.quantity, 0);
    }
  
    addItem(product) {
      const existingItem = this.items.find(item => item.product.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.items.push(new ShoppingCartItem(product));
      }
      this.updateTotal();
      this.render();
    }
  
    removeItem(productId) {
      this.items = this.items.filter(item => item.product.id !== productId);
      this.updateTotal();
      this.render();
    }
  
    updateTotal() {
      const total = this.items.reduce((acc, item) => acc + item.calculateTotalPrice(), 0);
      document.querySelector('.total').textContent = total + ' $';
    }
  
    render() {
      const productList = document.querySelector('.list-products');
      productList.innerHTML = '';
      this.items.forEach(item => {
        const productCard = document.createElement('div');
        productCard.className = 'card-body';
        productCard.innerHTML = `
          <div class="card" style="width: 18rem">
            <img src="${item.product.image}" class="card-img-top" alt="${item.product.name}" />
            <div class="card-body">
              <h5 class="card-title">${item.product.name}</h5>
              <p class="card-text">This is a ${item.product.name}</p>
              <h4 class="unit-price">${item.product.price} $</h4>
              <div>
                <i class="fas fa-plus-circle" data-id="${item.product.id}"></i>
                <span class="quantity">${item.quantity}</span>
                <i class="fas fa-minus-circle" data-id="${item.product.id}"></i>
              </div>
              <div>
                <i class="fas fa-trash-alt" data-id="${item.product.id}"></i>
                <i class="fas fa-heart" data-id="${item.product.id}"></i>
              </div>
            </div>
          </div>
        `;
        productList.appendChild(productCard);
      });
      this.addEventListeners();
    }
  
    addEventListeners() {
      document.querySelectorAll('.fa-plus-circle').forEach(button => {
        button.addEventListener('click', (e) => {
          const productId = parseInt(e.target.dataset.id);
          const product = products.find(p => p.id === productId);
          this.addItem(product);
        });
      });
  
      document.querySelectorAll('.fa-minus-circle').forEach(button => {
        button.addEventListener('click', (e) => {
          const productId = parseInt(e.target.dataset.id);
          this.decrementItem(productId);
        });
      });
  
      document.querySelectorAll('.fa-trash-alt').forEach(button => {
        button.addEventListener('click', (e) => {
          const productId = parseInt(e.target.dataset.id);
          this.removeItem(productId);
        });
      });
  
      document.querySelectorAll('.fa-heart').forEach(button => {
        button.addEventListener('click', (e) => {
          e.target.classList.toggle('liked');
        });
      });
    }
  
    decrementItem(productId) {
      const item = this.items.find(item => item.product.id === productId);
      if (item && item.quantity > 1) {
        item.quantity--;
        this.updateTotal();
        this.render();
      } else {
        this.removeItem(productId);
      }
    }
  }
  
  const products = [
    new Product(1, 'Baskets', 100, 'assets/baskets.png'),
    new Product(2, 'Socks', 20, 'assets/socks.png'),
    new Product(3, 'Bag', 50, 'assets/bag.png')
  ];
  
  const cart = new ShoppingCart();
  
  document.addEventListener('DOMContentLoaded', function() {
    const productList = document.querySelector('.list-products');
    products.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'card-body';
      productCard.innerHTML = `
        <div class="card" style="width: 18rem">
          <img src="${product.image}" class="card-img-top" alt="${product.name}" />
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">This is a ${product.name}</p>
            <h4 class="unit-price">${product.price} $</h4>
            <div>
              <i class="fas fa-plus-circle" data-id="${product.id}"></i>
              <span class="quantity">0</span>
              <i class="fas fa-minus-circle" data-id="${product.id}"></i>
            </div>
            <div>
              <i class="fas fa-trash-alt" data-id="${product.id}"></i>
              <i class="fas fa-heart" data-id="${product.id}"></i>
            </div>
          </div>
        </div>
      `;
      productList.appendChild(productCard);
    });
  
    cart.addEventListeners();
  });
  
  
  