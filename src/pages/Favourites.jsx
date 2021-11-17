import React from 'react';

import { Card } from '../components';

function Favourites({ likedItems, onLikeItems }) {
  return (
    <div className="content">
      <div className="contentTitleBlock">
        <h1 className="contentTitle">My favourites</h1>
      </div>
      <div className="contentInner">
        {likedItems &&
          likedItems.map((item) => (
            <Card key={item.id} isLiked={true} onLike={onLikeItems} {...item}/>
          ))}
      </div>
    </div>
  );
}

export default Favourites;
