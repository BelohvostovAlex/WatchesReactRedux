import React from "react";

function Drawer( {onClose} ) {
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
            <div className="cartItem">
              <img width={70} height={70} src="/img/watches/2.png" alt="Watch" />
              <div className="cartItemInfo">
                <div>
                  <p>Apple watch series 7</p>
                  <b>250 BYN</b>
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
            </div>

            <div className="cartItem">
              <img width={70} height={70} src="/img/watches/1.png" alt="Watch" />
              <div className="cartItemInfo">
                <div>
                  <p>Apple </p>
                  <b>250 BYN</b>
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
            </div>
          </div>
          <div className="drawerBottom">
            <ul>
              <li>
                <span>Total:</span>
                <div></div>
                <b>250 BYN</b>
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