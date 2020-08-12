import React, {useState, useEffect} from "react";
import api from "../utils/api";
import Card from "./Card";

export default function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then(({name, description, avatar}) => {
        setUserName(name)
        setUserDescription(description)
        setUserAvatar(avatar)
      });
    api.getInitialCards()
      .then((data) => {
        setCards(data)
      })
  }, [])

  return (
    <main className="contain">
      <section className="profile">
        <div className="profile__data">
          <button className="profile__avatar-button" onClick={onEditAvatar}>
            <img src={userAvatar} className="profile__avatar" alt="аватар пользователя"/>
          </button>
          <ul className="profile__info">
            <li className="profile__name">{userName}</li>
            <li className="profile__descr">{userDescription}</li>
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
          />
          )
        }
      </section>
    </main>
  )
}