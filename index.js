import menuArray from './data.js';

let name;

// Containers
const menuItemList = document.getElementById('menu-item-list');
const cartContainer = document.getElementById('cart-container');
const payForm = document.getElementById('payform');

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
                        <h3 class="item-price">$${item.price}</h3>
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
            console.log(cartList);

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
    <button class="purchase-btn" id="purchase-btn">Complete order</button>
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
      <span class="item-title">${item.name}</span> 
      <span class="btn-removeItem" id="btn-removeItem-${i}" value="${i}">remove</span>
      <span class="price item-price">$${item.price}</span>
    </div>`;
    sum += item.price;
    });
    
     cartItemsContainer.innerHTML = orderCart;
     const totalPrice = document.getElementById('total-price');
     totalPrice.innerHTML = `Total price: <span class="price">$${sum}</span>`;
     removeItemButtonClick();
     hideCart();
     CompleteOrder()


}

function hideCart() {
    if (cartList.length === 0) {
       document.querySelector('.cart-container').style.visibility = 'hidden';
    }
    else {
        document.querySelector('.cart-container').style.visibility = 'visible';
    }
        // when using js to modify css clases always use document.querySelector
        // to select the class that you want to target in the CSS (or create) and the always use '.nameoftheclass'
    
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
         console.log(cartList);
        });

    });
 }

 function CompleteOrder() {
    const modal = document.querySelector(".modal");

        document.getElementById('purchase-btn').addEventListener('click', () => {
         modal.classList.remove("hidden");
        });
        PayButtonClick();

    }

 function PayButtonClick() {
    const payFormData = new FormData(payForm);

    payForm.addEventListener('submit', (e) => {
        e.preventDefault();
        AfterPaybutton();
    });
     }

function AfterPaybutton() {
    loading();

    setTimeout(() => {
       modal.classList.add("hidden");
       document.querySelector('.cart-container').style.visibility = 'hidden';
        ThanksMessage();
    }, 1000);

}

function loading(){
    const modal = document.querySelector(".modal");
    modal.innerHTML = `
        <div class="modal-inner-loading"> 
        <img src="/assets/loading.svg" class="loading">
        </div>` 
}

 function ThanksMessage() {
    const thanksMessage = document.getElementById('thanks-message');
    const payFormData = new FormData(payForm);

    
        let name = payFormData.get('name');

        document.querySelector('.cart-container').style.visibility = 'hidden';
        thanksMessage.innerHTML =`Thanks, ${name}! Your order is on its way!`;
        thanksMessage.classList.remove("hidden");
    }
       

renderMenuInfo();
addItemButtonClick();

