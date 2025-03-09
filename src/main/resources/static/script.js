document.addEventListener('DOMContentLoaded', function () {
    // 从localStorage获取产品数据，如果没有则使用默认数据
    let products = JSON.parse(localStorage.getItem('adminProducts'));
    if (!products) {
        products = {
            1: { name: 'Shampoo', price: 33.3, image: 'fullsize1.jpg', description: 'This is a detailed description of Shampoo.' },
            2: { name: 'Towel', price: 44.4, image: 'fullsize2.jpg', description: 'This is a detailed description of Towel.' },
            3: { name: 'Bowl', price: 55.5, image: 'fullsize3.jpg', description: 'This is a detailed description of Bowl.' }
        };
        localStorage.setItem('adminProducts', JSON.stringify(products));
    }

    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product');

    if (productId && products[productId]) {
        const product = products[productId];
        const productImage = document.querySelector('.product-image img');
        const productTitle = document.querySelector('.product-info h2');
        const productPrice = document.querySelector('.product-info .price');
        const productDescription = document.querySelector('.product-info .description');

        if (productImage) productImage.src = `images/${product.image}`;
        if (productTitle) productTitle.textContent = product.name;
        if (productPrice) productPrice.textContent = `$${product.price.toFixed(2)}`;
        if (productDescription) productDescription.textContent = product.description;
    }

    // 更新类别页面中的产品列表
    if (window.location.pathname.includes('category.html')) {
        const categoryThumbnails = document.querySelector('.category-thumbnails');
        if (categoryThumbnails) {
            categoryThumbnails.innerHTML = '';

            Object.keys(products).forEach(id => {
                const product = products[id];
                const productLink = document.createElement('a');
                productLink.href = `product.html?product=${id}`;
                productLink.innerHTML = `
                    <img src="images/${product.image}" alt="${product.name} Thumbnail">
                    <p>${product.name}</p>
                `;
                categoryThumbnails.appendChild(productLink);
            });
        }
    }

    // 更新首页中的产品缩略图
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        const productThumbnails = document.querySelector('.product-thumbnails');
        if (productThumbnails) {
            productThumbnails.innerHTML = '';

            // 只显示前3个产品
            const productIds = Object.keys(products).slice(0, 3);
            productIds.forEach(id => {
                const product = products[id];
                const productLink = document.createElement('a');
                productLink.href = `category.html`;
                productLink.innerHTML = `
                    <img src="images/${product.image}" alt="${product.name} Thumbnail">
                    <p>${product.name}</p>
                `;
                productThumbnails.appendChild(productLink);
            });
        }
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