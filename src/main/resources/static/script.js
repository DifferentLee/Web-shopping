document.addEventListener('DOMContentLoaded', function () {
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');
    const products = {
        1: { name: 'Shampoo', price: 33.3, image: 'fullsize1.jpg', description: 'This is a detailed description of Shampoo.' },
        2: { name: 'Towel', price: 44.4, image: 'fullsize2.jpg', description: 'This is a detailed description of Towel.' },
        3: { name: 'Bowl', price: 55.5, image: 'fullsize3.jpg', description: 'This is a detailed description of Bowl.' }
    };
    if (productId && products[productId]) {
        const product = products[productId];
        document.querySelector('.product-image img').src = `images/${product.image}`;
        document.querySelector('.product-info h2').textContent = product.name;
        document.querySelector('.product-info .price').textContent = `$${product.price.toFixed(2)}`;
        document.querySelector('.product-info .description').textContent = product.description;
    }
    const addToCartButton = document.getElementById('add-to-cart');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', function () {
            const productName = document.querySelector('.product-info h2').textContent;
            const productPrice = parseFloat(document.querySelector('.product-info .price').textContent.replace('$', ''));
            shoppingCart.push({ name: productName, price: productPrice });
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
            updateCartDisplay();
            alert(`Added to cart: ${productName} - $${productPrice.toFixed(2)}`);
        });
    }
    const clearCartButton = document.getElementById('clear-cart');
    if (clearCartButton) {
        clearCartButton.addEventListener('click', function () {
            shoppingCart = [];
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
            updateCartDisplay();
            alert('Cart cleared!');
        });
    }
    function updateCartDisplay() {
        const cartItemsElement = document.querySelector('.cart-items');
        const cartTotalElement = document.querySelector('.cart-total');

        if (cartItemsElement && cartTotalElement) {
            cartItemsElement.innerHTML = '';
            shoppingCart.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
                cartItemsElement.appendChild(li);
            });
            const cartTotal = shoppingCart.reduce((total, item) => total + item.price, 0);
            cartTotalElement.textContent = `$${cartTotal.toFixed(2)}`;
        }
    }
    updateCartDisplay();
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', function () {
            window.history.back();
        });
    }
});