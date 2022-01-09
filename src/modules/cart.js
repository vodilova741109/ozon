import renderCart from "./renderCart";
const cart = () => {
    const  cartBtn = document.getElementById('cart');  
    const  cartModal = document.querySelector('.cart');
    const  cartClocseBtn = cartModal.querySelector('.cart-close');
    const  cartTotal = cartModal.querySelector('.cart-total span');
    const goodsWrapper = document.querySelector('.goods');
    const cartWrapper = document.querySelector(".cart-wrapper");
    
    const openCart = () => {
        const cart = localStorage.getItem('cart') ?
        JSON.parse(localStorage.getItem('cart')) : [];
        cartModal.style.display = 'flex';
        renderCart(cart);
    //   считаем сумму всех товаров с помощью метода reduce
        cartTotal.textContent = cart.reduce((sum, goodsItem) =>{
            return sum + goodsItem.price;
        }, 0) 

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
        }
    })

    cartWrapper.addEventListener('click', (event) => {

        if(event.target.classList.contains('btn-primary')){         
            
            const cart = localStorage.getItem('cart') ?
            JSON.parse(localStorage.getItem('cart')) : [];
            const card = event.target.closest('.card');
            const key = card.dataset.key;

            const index = cart.findIndex((item) =>{
                return item.id === +key
            })

            cart.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(cart));

            renderCart(cart);
            //   считаем сумму всех товаров с помощью метода reduce
                cartTotal.textContent = cart.reduce((sum, goodsItem) =>{
                    return sum + goodsItem.price;
                }, 0) 
        }
    })


}

export default cart