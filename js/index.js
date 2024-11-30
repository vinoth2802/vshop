const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    const links = document.querySelectorAll('.navbar ul li a');
    links.forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
    window.history.pushState({},"",event.target.href);
    handlePage();
};

const routes = {
    404 : {url : "./pages/404.html" , title : "404"},
    "/" : {url : "./pages/home.html" , title : "Home"},
    "/index.html" : {url : "./pages/home.html" , title : "Home"},
    "/shop" : {url : "./pages/shop.html" , title : "Shop"},
    "/lists" : {url : "./pages/lists.html" , title : "Lists"},
    "/account" : {url : "./pages/account.html" , title : "Account"}
};

const handlePage = async () => {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = loader;
    await new Promise((resolve) => setTimeout(resolve, 500));
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route.url).then((data) => data.text());
    contentDiv.innerHTML = html;
    document.title = route.title;

};

window.route = route;
window.onpopstate = handlePage;

window.addEventListener("load", (event) => {
    handlePage();
    updateActiveLink();
});


handlePage();
function updateActiveLink() {
    const links = document.querySelectorAll('.navbar ul li a');
    const currentPath = window.location.pathname;

    links.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}
updateActiveLink();

//shop.js
let currentPrimary = 'electronics';
let currentSecondary = 'all';

document.addEventListener('DOMContentLoaded', () => {    
    displayProducts();
    updateSecondaryLinks();
    const content = document.querySelector('#content'); 
    content.addEventListener('click', (event) => {
        const target = event.target;
        if (target.matches('.category-link')) {
            event.preventDefault(); 
            handleCategoryClick(target); 
        }
    });
});

const products = [
    { id: 1, name: 'Laptop', category: 'electronics', subcategory: 'computers' },
    { id: 2, name: 'Smartphone', category: 'electronics', subcategory: 'phones' },
    { id: 3, name: 'T-shirt', category: 'clothing', subcategory: 'men' },
    { id: 4, name: 'Cooking Pot', category: 'home', subcategory: 'kitchen' },
    { id: 5, name: 'Fiction Book', category: 'books', subcategory: 'novels' },
    { id: 6, name: 'Soccer Ball', category: 'sports', subcategory: 'equipment' },
];


function displayProducts() {
    const productsDiv = document.getElementById('products');
    productsDiv.innerHTML = '';

    const filteredProducts = products.filter(product => {
        const matchesPrimary =  product.category === currentPrimary;
        const matchesSecondary = currentSecondary === 'all' || product.subcategory === currentSecondary;
        return matchesPrimary && matchesSecondary;
    });

    if (filteredProducts.length === 0) {
        productsDiv.innerHTML = '<p>No products found.</p>';
        return;
    }

    filteredProducts.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `<h3>${product.name}</h3>`;
        productsDiv.appendChild(productDiv);
    });
}

function filterPrimary(event, category) {
    event.preventDefault();
    currentPrimary = category;
    currentSecondary = 'all';

    document.querySelectorAll('.primary-filter a').forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');

    updateSecondaryLinks();
    displayProducts();
}

function updateSecondaryLinks() {
    const secondaryLinks = document.getElementById('secondary-links');
    secondaryLinks.innerHTML = '<li><a href="#" onclick="filterSecondary(event, \'all\')">All</a></li>';

    const subcategories = [...new Set(products
        .filter(product =>  product.category === currentPrimary)
        .map(product => product.subcategory))];

    subcategories.forEach(subcategory => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#" onclick="filterSecondary(event, '${subcategory}')">${subcategory}</a>`;
        secondaryLinks.appendChild(li);
    });
}

function filterSecondary(event, subcategory) {
    event.preventDefault();
    currentSecondary = subcategory;

    document.querySelectorAll('.secondary-filter a').forEach(link => link.classList.remove('active'));
    event.target.classList.add('active');

    displayProducts();
}


const loader = `<!DOCTYPE html>
                            <html lang="en">
                            <head>
                                <meta charset="UTF-8">
                                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                <title>load</title>
                            </head>
                            <style>
                            .container{
                            position: relative;
                            display:flex;
                            align-items: center;
                            justify-content: center;
                            height: 90vh;
                            width: 100%;
                          
                            }
                            .dot-spinner {
                            --uib-size: 2.8rem;
                            --uib-speed: .9s;
                            --uib-color: #f44d0d;
                            position: relative;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: var(--uib-size);
                            width: var(--uib-size);
                           
                            }

                            .dot-spinner__dot {
                            position: absolute;
                            top: 0;
                            left: 0;
                            display: flex;
                            align-items: center;
                            justify-content: flex-start;
                            height: 100%;
                            width: 100%;
                            }

                            .dot-spinner__dot::before {
                            content: '';
                            height: 20%;
                            width: 20%;
                            border-radius: 50%;
                            background-color: var(--uib-color);
                            transform: scale(0);
                            opacity: 0.5;
                            animation: pulse0112 calc(var(--uib-speed) * 1.111) ease-in-out infinite;
                            box-shadow: 0 0 20px rgba(18, 31, 53, 0.3);
                            }

                            .dot-spinner__dot:nth-child(2) {
                            transform: rotate(45deg);
                            }

                            .dot-spinner__dot:nth-child(2)::before {
                            animation-delay: calc(var(--uib-speed) * -0.875);
                            }

                            .dot-spinner__dot:nth-child(3) {
                            transform: rotate(90deg);
                            }

                            .dot-spinner__dot:nth-child(3)::before {
                            animation-delay: calc(var(--uib-speed) * -0.75);
                            }

                            .dot-spinner__dot:nth-child(4) {
                            transform: rotate(135deg);
                            }

                            .dot-spinner__dot:nth-child(4)::before {
                            animation-delay: calc(var(--uib-speed) * -0.625);
                            }

                            .dot-spinner__dot:nth-child(5) {
                            transform: rotate(180deg);
                            }

                            .dot-spinner__dot:nth-child(5)::before {
                            animation-delay: calc(var(--uib-speed) * -0.5);
                            }

                            .dot-spinner__dot:nth-child(6) {
                            transform: rotate(225deg);
                            }

                            .dot-spinner__dot:nth-child(6)::before {
                            animation-delay: calc(var(--uib-speed) * -0.375);
                            }

                            .dot-spinner__dot:nth-child(7) {
                            transform: rotate(270deg);
                            }

                            .dot-spinner__dot:nth-child(7)::before {
                            animation-delay: calc(var(--uib-speed) * -0.25);
                            }

                            .dot-spinner__dot:nth-child(8) {
                            transform: rotate(315deg);
                            }

                            .dot-spinner__dot:nth-child(8)::before {
                            animation-delay: calc(var(--uib-speed) * -0.125);
                            }

                            @keyframes pulse0112 {
                            0%,
                            100% {
                                transform: scale(0);
                                opacity: 0.5;
                            }

                            50% {
                                transform: scale(1);
                                opacity: 1;
                            }
                            }

                            </style>
                            <body>
                            <div class="container">
                                <div class="dot-spinner">
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                </div>
                                </div>
                            </body>
                            </html>`;