import React from 'react';

function TotalPrice({ cartItems }) {
  const totalPrice = cartItems.reduce((total, item) => total + item.price*item.quantity, 0);
  return (
    <div className="total-price">
      <h3 className='price-t'>Total Price: ${totalPrice.toFixed(2)}</h3>
      {/* Ödeme ve diğer işlemler burada yer alabilir */}
    </div>
  );
}

TotalPrice.getTotalPrice = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.price*item.quantity, 0);
};

export default TotalPrice;