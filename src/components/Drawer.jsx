import React from "react";

import axios from "axios";

import Info from "./Info";
import {useCart} from '../hooks/useCart'


function Drawer({ cartItems = [], onClose, onRemove, opened }) {
  const { setCartItems, totalPrice } = useCart()
  const [isOrderDone, setOrderDone] = React.useState(false)
  const [orderId, setOrderId] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const delay = (ms, cllbck) => {
    return new Promise((resolve) => {
      setTimeout(resolve(cllbck), ms)
    })
  }

  const onClickOrder = async () => {
    try {
      setIsLoading(true)
      let response = await axios.post('https://6192739c57b14a0017c4a0c6.mockapi.io/order', {items: cartItems})
      for(let i = 0; i < cartItems.length; i++) {
        let item = cartItems[i]
        await delay(100, axios.delete(`https://6192739c57b14a0017c4a0c6.mockapi.io/carts/${item.id}`))
      }
      setOrderId(response.data.id)
      setOrderDone(true)
      setCartItems([])
    }
    catch(err) {
      alert('Cant make and order... :(')
    }
    setIsLoading(false)
  }
  

  return (
    <div className={`overlay ${opened ? 'overlayVisible' : ''} `}>
      <div className="drawer">
        <h2>
          Cart
          <button
            className="button button-remove"
            onClick={onClose}>
            <img className="removeImg" width={20} height={20} src="/img/close.png" alt="Remove" />
          </button>
        </h2>

        {cartItems.length > 0 ?
          <>
            <div className="items">
              {cartItems.map((item,index) => {
                return (<div
                  className="cartItem"
                  key={index}>
                  <img width={70} height={70} src={item.src} alt="Watch" />
                  <div className="cartItemInfo">
                    <div>
                      <p>{item.title}</p>
                      <b>{item.price} BYN</b>
                    </div>
                    <button
                      className="button button-remove"
                      onClick={() => onRemove(item.id)}>
                      <img
                        className="removeImg"
                        width={20}
                        height={20}
                        src="/img/close.png"
                        alt="Remove"
                      />
                    </button>
                  </div>
                </div>)
              })}
            </div>
            <div className="drawerBottom">
              <ul>
                <li>
                  <span>Total:</span>
                  <div></div>
                  <b>{totalPrice} BYN</b>
                </li>
                <li>
                  <span>Tax 2%:</span>
                  <div></div>
                  <b>{(totalPrice * 0.02).toFixed(2)} BYN</b>
                </li>
                <button 
                className="orderButton"
                onClick={onClickOrder}
                disabled={isLoading}>
                  Order it 
                  <img width={20} height={20} src="/img/next.png" alt="Next" />
                </button>
              </ul>
            </div>
          </>
          :
          <Info 
          title={isOrderDone ? `Your order #${orderId} is completed` : 'Cart is empty'}
          description={isOrderDone ? 'Soon ur super mega watches will be on ur hand' : 'Please add a watch that u are want and deserve!'}
          img={isOrderDone ? '/img/orderdone.png' : '/img/emptyBox.png'}
          onClose={onClose}/>}
      </div>
    </div>
  );
}

export default Drawer