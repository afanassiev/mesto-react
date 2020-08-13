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
  const [selectedCard, setSelectedCard] = useState({isOpen: false});


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard({...card, isOpen: true});
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({isOpen: false});
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
          buttonText="Сохранить"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          >
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
        </PopupWithForm>
        <PopupWithForm
          title="Новое место"
          name="add"
          buttonText="Добавить!"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          >
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
        </PopupWithForm>
        <PopupWithForm
            title="Вы уверены?"
            name="delete-confirmation"
            buttonText="Да"
            >
          </PopupWithForm>
          <PopupWithForm
            title="Обновить аватар"
            name="avatar"
            buttonText="Сохранить"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            >
              <>
                <label className="popup__label">
                  <input className="popup__input popup__input_avatar" type="url" id="url-avatar" name="urlAvatar"
                         placeholder="Ссылка на аватар" required/>
                  <span className="popup__error" id="url-avatar-error"/>
                </label>
              </>
          </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      </div>
    </div>
  );
}

export default App;