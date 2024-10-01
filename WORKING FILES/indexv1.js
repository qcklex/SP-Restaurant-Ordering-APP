import menuArray from './data.js';


// Containers
const menuItemList = document.getElementById('menu-item-list');
const cartContainer = document.getElementById('cart-container');
const checkoutContainer = document.getElementById('checkout-container');




let cartList = [];

function renderMenuInfo() { 
let menuHtml = '';
menuArray.forEach((item, i) => {
    menuHtml += 
        `<div class="menu-item" id="menu-item-${i}">
                    <h2 class="emoji">${item.emoji}</h2>
                    <div class="menu-info">
                        <h3 class="item-title">${item.name}</h3>
                        <p class="item-description">${item.ingredients}</p>
                        <h3 class="item-price">£${item.price}</h3>
                    </div>
                    <button class="btn-addItem" value="+" id=button-${i}> 
                    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24.8395 32.8069V19.0114H26.169V32.8069H24.8395ZM18.6122 26.5796V25.2387H32.3963V26.5796H18.6122Z" fill="#3C3C3C"/>
                    <circle cx="25" cy="25.0001" r="24.25" stroke="#DEDEDE" stroke-width="1.5"/>
                    </svg>
                    </div>
                </div>`;
                
});

menuItemList.innerHTML = menuHtml;
}

function addItemButtonClick() {
    menuArray.forEach((item, i) => {  
       const button = document.getElementById(`button-${i}`);
        button.addEventListener('click', () => {
           addItemtoCart(item);  
           displayCheckoutMenu();
            renderCheckoutItem();
            removeItemButtonClick();

             
             
              });
    });
}

function addItemtoCart(item) {
    cartList.push(item);
    console.log(`Adding item ${item.name} to Cart: ${cartList.length} items.`);
}

function displayCheckoutMenu() {

    let checkoutMenu = ''
    checkoutMenu += `
    <h3 class="cart-container-title">Your Order</h3>
        <div class="cart-items-container" id="cart-items-container"></div>
    <div class="divider"></div>
    <h3 class="total-price" id="total-price"></h3>
    <button class="purchase-btn">Complete order</button>
`;

    cartContainer.innerHTML= checkoutMenu;
}

function renderCheckoutItem() {
    let orderCart = '';
    let sum = 0;
    const cartItemsContainer = document.getElementById('cart-items-container');
    cartList.forEach((item, i) => {
    orderCart += `
    <div class="cartItems" value="${item.id}">
      <p class="item-title">${item.name}</p> 
      <p class="btn-removeItem" id="btn-removeItem-${i}" value="${i}">remove</p>
      <p class="price">£${item.price}</p>
    </div>`;
    sum += item.price;
    });
    
     cartItemsContainer.innerHTML = orderCart;
     const totalPrice = document.getElementById('total-price');
     totalPrice.innerHTML = `Total price: <div class="price">£${sum}</div>`;
     removeItemButtonClick();
}


function removeItem(index) {
    
    // Si el ítem fue encontrado en el array
    if (index !== -1) {
        // Elimina el ítem del array `orderList`
        cartList.splice(index, 1);
        renderCheckoutItem();
        
    }
}


function removeItemButtonClick() {
    cartList.forEach((item, i) => {  
        const removeButton = document.getElementById(`btn-removeItem-${i}`);
        removeButton.addEventListener('click', () => {
            removeItem(i);
         console.log(`Removing item ${item.name} from Cart: ${cartList.length} items.`);
        });
    });
 }


renderMenuInfo();
addItemButtonClick();
console.log(cartList);
