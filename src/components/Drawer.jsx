import React from "react";

import Info from "./Info";

function Drawer({ cartItems = [], onClose, onRemove, sum }) {

  const [isOrderDone, setOrderDone] = React.useState(false)
  const onClickOrder = () => {
    setOrderDone(true)
  }

  return (
    <div className="overlay">
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
                  <b>{sum} BYN</b>
                </li>
                <li>
                  <span>Tax 5%:</span>
                  <div></div>
                  <b>12.5 BYN</b>
                </li>
                <button 
                className="orderButton"
                onClick={onClickOrder}>
                  Order it 
                  <img width={20} height={20} src="/img/next.png" alt="Next" />
                </button>
              </ul>
            </div>
          </>
          :
          <Info 
          title={'Cart is empty'}
          description={'Please add a watch that u are want and deserve!'}
          img={'/img/emptyBox.png'}
          onClose={onClose}/>}
      </div>
    </div>
  );
}

export default Drawer