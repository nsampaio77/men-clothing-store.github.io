let carts = document.querySelectorAll('.add-cart');
let products = [

    {
        name: 'SLIM FIT Jogger',
        tag: 'c1',
        price: 150,
        inCart: 0
    },
    {
        name: 'Comfort Chino',
        tag: 'c4',
        price: 150,
        inCart: 0

    },
    {
        name: 'Comfort Chino 2',
        tag: 'c3',
        price: 145,
        inCart: 0

    },
    {
        name: 'Ripped Skinny Jeans',
        tag: 't1',
        price: 150,
        inCart: 0
    },
    {
        name: 'Basic Slim Fit Jeans',
        tag: 't2',
        price: 120,
        inCart: 0

    },
    {
        name: 'Loose fit jeans',
        tag: 't3',
        price: 100,
        inCart: 0

    },
    {
        name: 'Textured Suit Trousers',
        tag: 't4',
        price: 260,
        inCart: 0
    },
    {
        name: 'Textured Suit Trousers D',
        tag: 't5',
        price: 230,
        inCart: 0


    },
    {
        name: 'Tuxed Trousers with Side taping',
        tag: 't6',
        price: 200,
        inCart: 0


    },

]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}


function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }

}


// Increase cart
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    // If items were already selected add 1, if not put 1
    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }


    setItems(product)
}



function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}


// to calculate the total Cost
function totalCost(product) {
    //console.log("The log product price is", product.price);
    let cartCost = localStorage.getItem('totalCost');

    console.log("My cartCost is", cartCost);


    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
}


// Run when we load the page
function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');

    // JSON.parse - in order to convert from json to javaScript object
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem('totalCost');


    if (cartItems && productContainer) {
        console.log("running");
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `<div class="product">
                                                <ion-icon name="close-circle"></ion-icon>
                                                <img src="img/${item.tag}.jpg" alt="Snow" style="width:20%">
                                                <span>${item.name}</span>
                                            </div>
                                            <div class="price">${item.price}</div>
                                            <div class="quantity">
                                                <ion-icon class="decrease" 
                                                name="arrow-dropleft-circle"></ion-icon>
                                                <span>${item.inCart}</span>
                                                <ion-icon class="increase" 
                                                name="arrow-dropright-circle"></ion-icon>
                                            </div>
                                            `
        });
    }
}


onLoadCartNumbers();
displayCart();