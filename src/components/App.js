import React, {useState} from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({isOpen: false, name: '', link: ''});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(name, link) {
    setSelectedCard({isOpen: true, name: name, link: link});
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({isOpen: false, name: '', link: ''});
  }

  return (
    <div className="App">
      <div className="page__content">
        <Header/>
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer/>
        <PopupWithForm
          title="Редактировать профиль"
          name="edit"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          children={
            <>
              <label className="popup__label">
                <input className="popup__input popup__input_name" type="text" id="profileName-input"
                       name="profileNameInput" required minLength="2" maxLength="40"/>
                <span className="popup__error" id="profileName-input-error"/>
              </label>
              <label className="popup__label">
              <input className="popup__input popup__input_descr" type="text" id="descr-input" name="profileDescrInput"
              required minLength="2" maxLength="200"/>
              <span className="popup__error" id="descr-input-error"/>
              </label>
            </>
          }/>
        <PopupWithForm
          title="Новое место"
          name="add"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          children={
            <>
              <label className="popup__label">
                <input className="popup__input popup__input_placename" type="text" id="placename-input"
                       name="placeNameInput" placeholder="Название" required minLength="1" maxLength="30"/>
                <span className="popup__error" id="placename-input-error"/>
              </label>
              <label className="popup__label">
                <input className="popup__input popup__input_link" type="url" id="url-input" name="urlInput"
                       placeholder="Ссылка на картинку" required/>
                <span className="popup__error" id="url-input-error"/>
              </label>
            </>
          }
        />
          <PopupWithForm
            title="Вы уверены?"
            name="delete-confirmation"
            children={
              <>
                <button className="popup__savebutton popup__confirm-button" type="submit">Да</button>
              </>
            }
          />
          <PopupWithForm
            title="Обновить аватар"
            name="avatar"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            children={
              <>
                <label className="popup__label">
                  <input className="popup__input popup__input_avatar" type="url" id="url-avatar" name="urlAvatar"
                         placeholder="Ссылка на аватар" required/>
                  <span className="popup__error" id="url-avatar-error"/>
                </label>
              </>
            }
          />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </div>
    </div>
  );
}

export default App;
