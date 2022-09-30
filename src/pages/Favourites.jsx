import React from "react";

import { Card } from "../components";
import AppContext from "../context";

function Favourites({ onLikeItems }) {
  const { likedItems } = React.useContext(AppContext);

  return (
    <div className="content">
      <div className="contentTitleBlock">
        <h1 className="contentTitle">My favourites</h1>
      </div>
      <div className="contentInner">
        {likedItems &&
          likedItems.map((item) => (
            <Card key={item.id} isLiked={true} onLike={onLikeItems} {...item} />
          ))}
      </div>
    </div>
  );
}

export default Favourites;
