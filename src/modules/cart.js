import renderCart from "./renderCart";
import postData from "./postData";
const cart = () => {
    const  cartBtn = document.getElementById('cart');  
    const  cartModal = document.querySelector('.cart');
    const  cartClocseBtn = cartModal.querySelector('.cart-close');
    const  cartTotal = cartModal.querySelector('.cart-total span');
    const counter = document.querySelector('.counter');   
    const  cartSendBtn = cartModal.querySelector('.cart-confirm');    
    const goodsWrapper = document.querySelector('.goods');
    const cartWrapper = document.querySelector(".cart-wrapper");   

    const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : [];
    counter.textContent =  cart.length;

    const openCart = () => {
        const cart = localStorage.getItem('cart') ?
        JSON.parse(localStorage.getItem('cart')) : [];
        cartModal.style.display = 'flex';
        renderCart(cart);
        console.log(cart.length)
        // считаем сумму всех товаров с помощью метода reduce
        cartTotal.textContent = cart.reduce((sum, goodsItem) =>{
            return sum + goodsItem.price;
        }, 0) 
        // считаем количество всех товаров 
        counter.textContent =  cart.length;   
    }
    const closeCart = () => {
        cartModal.style.display = '';                
    }
    
    cartBtn.addEventListener('click', openCart);
    cartClocseBtn.addEventListener('click', closeCart);  

    goodsWrapper.addEventListener('click', (event) => {
        if(event.target.classList.contains('btn-primary')){
            const card = event.target.closest('.card');
            const key = card.dataset.key;
            const goods = JSON.parse(localStorage.getItem('goods'));
            const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : [];
            const goodsItem = goods.find((item) =>{
                 return item.id === +key;
            })
            cart.push(goodsItem);
            localStorage.setItem('cart', JSON.stringify(cart));   
            // считаем количество всех товаров 
            counter.textContent =  cart.length      
        }
    })

    cartWrapper.addEventListener('click', (event) => {
       
        if(event.target.classList.contains('btn-primary')){         
            
            const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : [];

            console.log(cart)    
            const card = event.target.closest('.card');
            const key = card.dataset.key;

            const index = cart.findIndex((item) =>{
                return item.id === +key;
            })

            cart.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(cart));

            renderCart(cart);            
            //   считаем сумму всех товаров с помощью метода reduce
                cartTotal.textContent = cart.reduce((sum, goodsItem) =>{
                    return sum + goodsItem.price;
                }, 0);   
                // считаем количество всех товаров 
            counter.textContent =  cart.length             
        }
         
    })
    cartSendBtn.addEventListener('click', () => {
        const cart = localStorage.getItem('cart') ?
        JSON.parse(localStorage.getItem('cart')) : [];
        postData(cart).then(() =>{
            localStorage.removeItem('cart');
            renderCart([]);
            cartTotal.textContent = 0;
            // считаем количество всех товаров 
            counter.textContent =  0;      
        });       
    })


}

export default cart