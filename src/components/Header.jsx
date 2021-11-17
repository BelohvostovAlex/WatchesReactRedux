import React from "react";
import { Link } from 'react-router-dom'

function Header( {onClickCart, sum} ) {
    return (
        <header>
            <Link to="/">
            <div className="headerLeft">
                <img width={40} height={40} src="/img/apple.png" alt="Logo" />
                <div className="headerInfo">
                    <h3>Apple</h3>
                    <p>Watch store</p>
                </div>
            </div>
            </Link>

            <ul className="headerRight">
                <li onClick={onClickCart}>
                    <img width={20} height={20} src="/img/bag.png" alt="Cart" />
                    <span>{sum} BYN</span>
                </li>
                <li>
                   <Link to="/favourites">
                   <img width={20} height={20} src="/img/heart.png" alt="Favourite" />
                   </Link>
                </li>
                <li>
                    <img width={20} height={20} src="/img/user.png" alt="User" />
                </li>
            </ul>
        </header>
    )
}

export default Header