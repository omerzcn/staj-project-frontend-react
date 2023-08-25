import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

function BasketItem({ items, removeFromCart, addToCart }) {
  return (
    <Accordion defaultActiveKey={[]} alwaysOpen>
      {items.map((item, index) => (
        <Accordion.Item key={index} eventKey={index.toString()}>
          <Accordion.Header>
            {item.name} - Adet: {item.quantity}
          </Accordion.Header>
          <Accordion.Body>
            <div className="basket-item">
              <div>
                <p>{item.symbol}</p>
                <p>{item.exchange}</p>
                <p>Item change: {item.change}</p>
                <h3>Price: ${(item.price * item.quantity).toFixed(2)}</h3>
                <Button variant="danger" onClick={() => removeFromCart(item.symbol)}>-</Button>
                <span className='count-span'>{item.quantity}</span>
                <Button onClick={() => addToCart(item)}>+</Button>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default BasketItem;