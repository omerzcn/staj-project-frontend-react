import React from 'react';
import { Row, Col } from 'react-bootstrap';
import BasketItem from '../components/BasketItem';
import TotalPrice from '../components/TotalPrice';
import NavBar from '../components/Navbar';
import BuyMethod from '../components/Buy';
import { useGlobal } from '../context/GlobalContext';

function Basket() {
  const {cartItems, removeItemFromCart, removeItemCompletelyFromCart, addItemToCart, amount, updateAmount, setCartItems } = useGlobal([]);

  return (
    <div className="basket-page">
      <NavBar cartItems={cartItems}/>
      <div className="basket-content">
        <h2 className="basket-title">Your Basket</h2>
        <BasketItem items={cartItems} removeFromCart={removeItemFromCart} addToCart={addItemToCart} />
        
        <Row>
          <Col>
            <TotalPrice cartItems={cartItems} />
          </Col>
          <Col className='Button-buy'>
            <BuyMethod cartItems={cartItems} removeItemCompletelyFromCart={removeItemCompletelyFromCart} amount={amount} setCartItems={setCartItems} updateAmount={updateAmount} />
          </Col>
        </Row>
        
      </div>
    </div>
  );
}
export default Basket;
