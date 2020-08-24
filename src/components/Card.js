import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export default function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);
// Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
// Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `item__delete-button ${isOwn ? '' : 'item__delete-button_hidden'}`
  );
// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i._id === currentUser._id);
// Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (`item__checkbox ${isLiked ? 'item__checkbox_active' : ''}`);



  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="item">
      <img
        className="item__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        // className="item__delete-button"
        className={`${cardDeleteButtonClassName}`}
        onClick={handleDeleteClick}
      />
      <div className="item__fragment item__fragment_textfield">
        <h2 className="item__title">{card.name}</h2>
        <div className="item__like">
          {/*<button className="item__checkbox" type="button" onClick={handleLikeClick}/>*/}
          <button
            className={`${cardLikeButtonClassName}`}
            type="button"
            onClick={handleLikeClick}
          />
          <span className="item__like-counter">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}