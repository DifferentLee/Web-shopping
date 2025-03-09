document.addEventListener('DOMContentLoaded', function () {
    // 初始化：从localStorage获取产品数据，如果没有则使用默认数据
    let products = JSON.parse(localStorage.getItem('adminProducts'));
    if (!products) {
        products = {
            1: { name: 'Shampoo', price: 33.3, image: 'fullsize1.jpg', description: 'This is a detailed description of Shampoo.' },
            2: { name: 'Towel', price: 44.4, image: 'fullsize2.jpg', description: 'This is a detailed description of Towel.' },
            3: { name: 'Bowl', price: 55.5, image: 'fullsize3.jpg', description: 'This is a detailed description of Bowl.' }
        };
        localStorage.setItem('adminProducts', JSON.stringify(products));
    }

    // 导航管理
    const adminNavLinks = document.querySelectorAll('.admin-nav');
    const adminSections = document.querySelectorAll('.admin-section');

    adminNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');

            adminSections.forEach(section => {
                section.classList.add('hidden');
            });

            document.getElementById(targetSection).classList.remove('hidden');
        });
    });

    // 加载产品列表
    function loadProductList() {
        const tableBody = document.getElementById('product-table-body');
        tableBody.innerHTML = '';

        Object.keys(products).forEach(id => {
            const product = products[id];
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${id}</td>
                <td>${product.name}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td><img src="images/${product.image}" alt="${product.name}"></td>
                <td class="action-buttons">
                    <button class="action-button edit-button" data-id="${id}">Edit</button>
                    <button class="action-button delete-button" data-id="${id}">Delete</button>
                </td>
            `;

            tableBody.appendChild(row);
        });

        // 为编辑按钮添加事件监听
        document.querySelectorAll('.edit-button').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                openEditProductForm(productId);
            });
        });

        // 为删除按钮添加事件监听
        document.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.getAttribute('data-id');
                openDeleteConfirmation(productId);
            });
        });
    }

    // 更新产品下拉列表
    function updateProductDropdown() {
        const selectElement = document.getElementById('edit-product-select');
        selectElement.innerHTML = '<option value="">-- Select a product --</option>';

        Object.keys(products).forEach(id => {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = `${id}: ${products[id].name}`;
            selectElement.appendChild(option);
        });
    }

    // 监听产品选择
    document.getElementById('edit-product-select').addEventListener('change', function() {
        const productId = this.value;
        if (productId) {
            openEditProductForm(productId);
        } else {
            document.getElementById('edit-product-form').classList.add('hidden');
        }
    });

    // 打开编辑产品表单
    function openEditProductForm(productId) {
        const product = products[productId];
        if (!product) return;

        // 切换到编辑产品页面
        adminSections.forEach(section => {
            section.classList.add('hidden');
        });
        document.getElementById('edit-product').classList.remove('hidden');

        // 更新下拉列表选中的值
        document.getElementById('edit-product-select').value = productId;

        // 填充表单
        document.getElementById('edit-product-name').value = product.name;
        document.getElementById('edit-product-price').value = product.price;
        document.getElementById('edit-product-image').value = product.image;
        document.getElementById('edit-product-description').value = product.description;

        // 显示当前图片
        const currentImagePreview = document.getElementById('current-image-preview');
        currentImagePreview.innerHTML = `<img src="images/${product.image}" alt="${product.name}">`;

        // 显示表单
        document.getElementById('edit-product-form').classList.remove('hidden');

        // 储存当前编辑的产品ID
        document.getElementById('edit-product-form').setAttribute('data-product-id', productId);
    }

    // 添加产品表单提交
    document.getElementById('add-product-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const id = document.getElementById('new-product-id').value;
        const name = document.getElementById('new-product-name').value;
        const price = parseFloat(document.getElementById('new-product-price').value);
        const image = document.getElementById('new-product-image').value;
        const description = document.getElementById('new-product-description').value;

        // 检查ID是否已存在
        if (products[id]) {
            alert(`Product ID ${id} already exists. Please use a different ID.`);
            return;
        }

        // 添加新产品
        products[id] = {
            name: name,
            price: price,
            image: image,
            description: description
        };

        // 保存到localStorage
        localStorage.setItem('adminProducts', JSON.stringify(products));

        // 更新脚本文件中的products对象
        updateScriptFile();

        // 更新UI
        loadProductList();
        updateProductDropdown();

        // 重置表单
        this.reset();
        document.getElementById('new-image-preview').innerHTML = '';

        alert('Product added successfully!');
    });

    // 编辑产品表单提交
    document.getElementById('edit-product-form').addEventListener('submit', function(e) {
        e.preventDefault();

        const productId = this.getAttribute('data-product-id');
        const name = document.getElementById('edit-product-name').value;
        const price = parseFloat(document.getElementById('edit-product-price').value);
        const image = document.getElementById('edit-product-image').value;
        const description = document.getElementById('edit-product-description').value;

        // 更新产品
        products[productId] = {
            name: name,
            price: price,
            image: image,
            description: description
        };

        // 保存到localStorage
        localStorage.setItem('adminProducts', JSON.stringify(products));

        // 更新脚本文件中的products对象
        updateScriptFile();

        // 更新UI
        loadProductList();
        updateProductDropdown();

        alert('Product updated successfully!');
    });

    // 删除产品按钮
    document.getElementById('delete-product').addEventListener('click', function(e) {
        e.preventDefault();
        const productId = document.getElementById('edit-product-form').getAttribute('data-product-id');
        openDeleteConfirmation(productId);
    });

    // 打开删除确认模态框
    function openDeleteConfirmation(productId) {
        const modal = document.getElementById('confirmation-modal');
        modal.style.display = 'flex';

        // 储存要删除的产品ID
        modal.setAttribute('data-product-id', productId);
    }

    // 确认删除
    document.getElementById('confirm-delete').addEventListener('click', function() {
        const modal = document.getElementById('confirmation-modal');
        const productId = modal.getAttribute('data-product-id');

        // 删除产品
        delete products[productId];

        // 保存到localStorage
        localStorage.setItem('adminProducts', JSON.stringify(products));

        // 更新脚本文件中的products对象
        updateScriptFile();

        // 更新UI
        loadProductList();
        updateProductDropdown();

        // 隐藏模态框和编辑表单
        modal.style.display = 'none';
        document.getElementById('edit-product-form').classList.add('hidden');

        alert('Product deleted successfully!');
    });

    // 取消删除
    document.getElementById('cancel-delete').addEventListener('click', function() {
        const modal = document.getElementById('confirmation-modal');
        modal.style.display = 'none';
    });

    // 图片预览功能 - 添加产品
    document.getElementById('new-product-image-file').addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewContainer = document.getElementById('new-image-preview');
                previewContainer.innerHTML = `<img src="${e.target.result}" alt="Preview">`;

                // 自动填充文件名
                const filename = file.name;
                document.getElementById('new-product-image').value = filename;
            };
            reader.readAsDataURL(file);
        }
    });

    // 图片预览功能 - 编辑产品
    document.getElementById('edit-product-image-file').addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewContainer = document.getElementById('edit-image-preview');
                previewContainer.innerHTML = `<img src="${e.target.result}" alt="Preview">`;

                // 自动填充文件名
                const filename = file.name;
                document.getElementById('edit-product-image').value = filename;
            };
            reader.readAsDataURL(file);
        }
    });

    // 更新script.js文件中的products对象
    function updateScriptFile() {
        // 在实际环境中，这个函数需要与后端结合使用
        // 由于这是纯前端实现，我们只在localStorage中保存数据
        // 在现实中，你需要一个API来更新服务器上的script.js文件
        console.log('Products data updated in localStorage. In a real environment, this would update the script.js file on the server.');
    }

    // 后退按钮功能
    const backButton = document.getElementById('back-button');
    if (backButton) {
        backButton.addEventListener('click', function() {
            window.history.back();
        });
    }

    // 初始化页面
    loadProductList();
    updateProductDropdown();
});