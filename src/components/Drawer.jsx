import React from "react";

function Drawer( {cartItems = [], onClose} ) {
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

          <div className="items">
            {cartItems.map(item => {
              return (<div className="cartItem">
                <img width={70} height={70} src={item.src} alt="Watch" />
                <div className="cartItemInfo">
                  <div>
                    <p>{item.title}</p>
                    <b>{item.price} BYN</b>
                  </div>
                  <button className="button button-remove">
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
                <b>{cartItems.reduce((acc,cur) => acc + cur.price,0)} BYN</b>
              </li>
              <li>
                <span>Tax 5%:</span>
                <div></div>
                <b>12.5 BYN</b>
              </li>
              <button className="orderButton">
                Order it <img width={20} height={20} src="/img/next.png" alt="Next" />
              </button>
            </ul>
          </div>
        </div>
      </div>
    );
}

export default Drawer