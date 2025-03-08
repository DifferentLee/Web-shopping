document.addEventListener('DOMContentLoaded', function() {
    loadProducts();

    document.getElementById('product-form').addEventListener('submit', function(event) {
        event.preventDefault();

        let name = document.getElementById('name').value;
        let price = document.getElementById('price').value;
        let description = document.getElementById('description').value;
        let imageInput = document.getElementById('image').files[0];

        let formData = new FormData();
        formData.append("file", imageInput);

        // 1. 上传图片
        fetch('/api/uploads/image', { method: 'POST', body: formData })
            .then(response => response.text())
            .then(imageUrl => {
                // 2. 添加商品到数据库
                return fetch('/api/products', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name, price, description, imageUrl })
                });
            })
            .then(() => {
                alert("Product added successfully!");
                loadProducts();
            });
    });
});

// 读取产品列表
function loadProducts() {
    fetch('/api/products/1') // 假设catid=1
        .then(response => response.json())
        .then(products => {
            let list = document.getElementById('product-list');
            list.innerHTML = "";
            products.forEach(product => {
                let li = document.createElement("li");
                li.innerHTML = `
                ${product.name} - $${product.price} 
                <button onclick="deleteProduct(${product.pid})">Delete</button>
            `;
                list.appendChild(li);
            });
        });
}

// 删除产品
function deleteProduct(pid) {
    fetch(`/api/products/${pid}`, { method: 'DELETE' })
        .then(() => {
            alert("Product deleted!");
            loadProducts();
        });
}
