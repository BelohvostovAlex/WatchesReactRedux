import React from "react";

function Info({ title, description, img, onClose }) {
  return (
    <div className="cartEmpty">
      <div>
        <img width={120} height={120} src={img} alt="" />
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={onClose} className="orderButton">
          Go back
        </button>
      </div>
    </div>
  );
}

export default Info;
