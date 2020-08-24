import React, {useState, useEffect} from "react";
import api from "../utils/api";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {

  const currentUser = React.useContext(CurrentUserContext);
  // const [userName, setUserName] = useState('');
  // const [userDescription, setUserDescription] = useState('');
  // const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // api.getUserInfo()
    //   .then(({name, description, avatar}) => {
    //     setUserName(name)
    //     setUserDescription(description)
    //     setUserAvatar(avatar)
    //   });
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
  }, [])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      // Формируем новый массив на основе имеющегося, подставляя в него новую карточку
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      // Обновляем стейт
      setCards(newCards);
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
      })
  }

  return (
    <main className="contain">
      <section className="profile">
        <div className="profile__data">
          <button className="profile__avatar-button" onClick={onEditAvatar}>
            <img src={currentUser.avatar} className="profile__avatar" alt="аватар пользователя"/>
          </button>
          <ul className="profile__info">
            <li className="profile__name">{currentUser.name}</li>
            <li className="profile__descr">{currentUser.about}</li>
          </ul>
          <button className="profile__editbutton" type="button" onClick={onEditProfile}/>
        </div>
        <button className="profile__addbutton" type="button" onClick={onAddPlace}/>
      </section>
      <section className="elements">
        {
          cards.map((card) =>
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          )
        }
      </section>
    </main>
  )
}