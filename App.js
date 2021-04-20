const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');
const container = document.querySelector('.container');
const app = document.getElementById('App');

class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name</strong>: ${product.name}
                    <strong>Product Price</strong>: ${product.price}
                    <strong>Product Year</strong>: ${product.year}
                    <a href="#" name="delete" class="btn btn-danger">Delete</a>
                </div>
            </div>
        `;
        productList.appendChild(element);
    }

    resetForm() {
        productForm.reset();
    }

    removeProduct(e) {
        if (e.name === 'delete') {
            e.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product Deleted Successfully', 'danger');
        }
    }

    showMessage(message, bClass) {
        const element = document.createElement('div');
        element.className = `alert alert-${bClass} mt-4`;
        element.appendChild( document.createTextNode(message) );

        container.insertBefore(element, app);

        setTimeout( () => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
}

// DOM Events
productForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;
    
    const product = new Product(name, price, year);

    const ui = new UI();
    
    ui.resetForm();

    if (name === '' || price === '' || year === '') {
        ui.showMessage('Please complete all the fields', 'danger');
    } else {        
        ui.addProduct(product);
        ui.showMessage('Product added successfully', 'success');
    }
});

productList.addEventListener('click', e => {
    const ui = new UI();
    ui.removeProduct(e.target);
});