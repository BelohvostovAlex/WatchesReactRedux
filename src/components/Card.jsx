import React from 'react'

function Card ( {id, title, price, src, onAdd, onLike, isLiked = false} ) {
    const [check, setCheck] = React.useState(false)
    const [like, setLike] = React.useState(isLiked)

    const handleCheck = () => {
        setCheck(!check)
        onAdd( {title, src, price} )
    }

    const handleLike = () => {
        setLike(!like)
        onLike({id, title,src,price})
    }


    return (
        <div className="card">
            <div className="cardTop">
                <img width={160} height={160} src={src} alt="Watches" />
                <button 
                className="button button-favor"
                onClick={handleLike}>
                  {!like ? <img width={11} height={11} src="/img/heart.png" alt="Favourite" /> : <img width={11} height={11} src="/img/heartliked.png" alt="Liked" />}
                </button>
            </div>
            <h5>{title}</h5>

            <div className="cardBottom">
                <div className="cardPrice">
                    <span>Price:</span>
                    <b>{price} BYN</b>
                </div>
                <button className="button" onClick={handleCheck}>
                    <img width={11} height={11} src={check ? "/img/check.png" : "/img/plus.png"} alt="Add" />
                </button>
            </div>
        </div>
    )
}

export default Card
