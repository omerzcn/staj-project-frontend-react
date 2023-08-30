import React from 'react';
import Button from 'react-bootstrap/Button';
import TotalPrice from './TotalPrice';
import { postProfileStockData } from './Api';

function BuyMethod({ cartItems, amount, updateAmount, setCartItems }) {
  const totalPrice = TotalPrice.getTotalPrice(cartItems);

  const myMethod = () => {

    // Satın alınan ürünleri HTTP isteği ile sunucuya gönderme
    if (totalPrice <= amount){
        updateAmount(amount - totalPrice);
        cartItems.forEach(item => {
            const purchaseData = {
              //stockId: item.id, // veya item.symbol, burası veritabanınıza göre değişebilir
              quantity: item.quantity, // Satın alınan adet
              price: item.price * item.quantity, // Toplam fiyat
              // Diğer ürün bilgileri
              symbol: item.symbol,
              name: item.name,
              exchange: item.exchange,
              type: 'Stock',
            };
            
            // Sunucuya POST isteği gönderme
            postProfileStockData(purchaseData);
            
          });

        // Satın alınan ürünü sepetten kaldırma
        setCartItems([]);
          
    }
  };
  return (
    <Button variant="dark" onClick={myMethod} className='buttonBuy'>Satın Al</Button>
  );
}

export default BuyMethod;

