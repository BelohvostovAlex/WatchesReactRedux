import React from "react";

function Header( {onClickCart} ) {
    return (
        <header>
            <div className="headerLeft">
                <img width={40} height={40} src="/img/apple.png" alt="Logo" />
                <div className="headerInfo">
                    <h3>Apple</h3>
                    <p>Watch store</p>
                </div>
            </div>

            <ul className="headerRight">
                <li onClick={onClickCart}>
                    <img width={20} height={20} src="/img/bag.png" alt="Cart" />
                    <span>120 BYN</span>
                </li>
                <li>
                    <img width={20} height={20} src="/img/heart.png" alt="Favourite" />
                </li>
                <li>
                    <img width={20} height={20} src="/img/user.png" alt="User" />
                </li>
            </ul>
        </header>
    )
}

export default Header