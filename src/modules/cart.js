const cart = () => {
    const  cartBtn = document.getElementById('cart');  
    const  cartModal = document.querySelector('.cart');
    const  cartClocseBtn = cartModal.querySelector('.cart-close');

    const openCart = () => {
        cartModal.style.display = 'flex';
    }
        const closeCart = () => {
        cartModal.style.display = '';
    }
    cartBtn.addEventListener('click', openCart);
    cartClocseBtn.addEventListener('click', closeCart);  


}

export default cart