import React from 'react';

import ContentLoader from 'react-content-loader';
import AppContext from '../context';

function Card({
  id,
  title,
  descr,
  price,
  src,
  itemId,
  onAdd,
  onLike,
  isLiked = false,
  isLoading = false,
  isOrder,
}) {

  const { isItemAdded } = React.useContext(AppContext)
  const [like, setLike] = React.useState(isLiked);
  const obj = { id, title, src, price, itemId }

  const handleCheck = () => {
    onAdd(obj);
  };

  const handleLike = () => {
    setLike(!like);
    onLike(obj);
  };

  return (
    <div className="card">
      {!isLoading ? (
        <>
          <div className="cardTop">
            <img width={160} height={160} src={src} alt="Watches" />
          {onLike && 
          <button 
            className="button button-favor" 
            onClick={handleLike}
            disabled={isOrder}>
              {!like ? (
                <img width={11} height={11} src="/img/heart.png" alt="Favourite" />
              ) : (
                <img width={11} height={11} src="/img/heartliked.png" alt="Liked" />
              )}
            </button>}
          </div>
          <h5>{title}</h5>
          <p>{descr}</p>

          <div className="cardBottom">
            <div className="cardPrice">
              <span>Price:</span>
              <b>{price} BYN</b>
            </div>
            <button 
            className="button" 
            onClick={handleCheck} 
            disabled={isOrder}>
              <img
                width={11}
                height={11}
                src={isItemAdded(id) || isOrder ? '/img/check.png' : '/img/plus.png'}
                alt="Add"
              />
            </button>
          </div>
        </>
      ) : (
        <ContentLoader
          speed={2}
          width={258}
          height={270}
          viewBox="0 0 258 314"
          backgroundColor="#f5f5f5"
          foregroundColor="#ecebeb">
          <rect x="0" y="384" rx="7" ry="7" width="97" height="44" />
          <rect x="57" y="403" rx="0" ry="0" width="0" height="5" />
          <rect x="113" y="384" rx="22" ry="22" width="165" height="44" />
          <rect x="0" y="0" rx="0" ry="0" width="210" height="210" />
          <rect x="0" y="225" rx="0" ry="0" width="120" height="15" />
          <rect x="0" y="255" rx="0" ry="0" width="130" height="21" />
          <circle cx="192" cy="252" r="22" />
          <circle cx="16" cy="16" r="16" />
        </ContentLoader>
      )}
    </div>
  );
}

export default Card;
