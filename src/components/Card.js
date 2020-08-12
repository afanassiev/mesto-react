import React from "react";

export default function Card({card, onCardClick}) {

  function handleClick() {
    onCardClick(card.name, card.link);
  }

  return (
    <div className="item">
      <img
        className="item__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button className="item__delete-button"/>
      <div className="item__fragment item__fragment_textfield">
        <h2 className="item__title">{card.name}</h2>
        <div className="item__like">
          <button className="item__checkbox" type="button"/>
          <span className="item__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}