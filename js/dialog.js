'use strict';
(() => {
  // Selectors
  const userDialog = document.querySelector(`.setup`);
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = userDialog.querySelector(`.setup-close`);
  const setupWizardForm = userDialog.querySelector(`.setup-wizard-form`);
  const userName = userDialog.querySelector(`.setup-user-name`);
  const setupDialogElement = document.querySelector('.setup');
  const dialogHandle = setupDialogElement.querySelector('.upload');

  /* Open and close popup */
  const onPopupEscPress = (evt) => {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closePopup();
    }
  };

  let isPopupOpened = false;

  const openPopup = () => {
    userDialog.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onPopupEscPress);
    isPopupOpened = true;
  };
  const closePopup = () => {
    if (document.activeElement !== userName) {
      userDialog.classList.add(`hidden`);
      document.removeEventListener(`keydown`, onPopupEscPress);
      isPopupOpened = false;
    }
    setDefaultPosition();
  };

  /* Move the dialog */
  const setDefaultPosition = () => {
    setupDialogElement.style.top = `80px`;
    setupDialogElement.style.left = `50%`;
  }

  const setMovingDialogListener = (evt) => {
    evt.preventDefault();
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let dragged = false;
    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      dragged = true;
      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      setupDialogElement.style.top = (setupDialogElement.offsetTop - shift.y) + 'px';
      setupDialogElement.style.left = (setupDialogElement.offsetLeft - shift.x) + 'px';
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener('click', onClickPreventDefault)
        };
        dialogHandle.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  const setDialogHandler = () => {
    document.addEventListener(`keydown`, (evt) => {
      if (isPopupOpened && evt.key === `Enter`) {
        setupWizardForm.submit();
      }
    });
    setupOpen.addEventListener(`click`, openPopup);
    setupOpen.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        openPopup();
        evt.stopPropagation();
      }
    });
    setupClose.addEventListener(`click`, closePopup);
    setupClose.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        closePopup();
      }
    });
    dialogHandle.addEventListener('mousedown', setMovingDialogListener);
  }
  window.dialog = {
    setDialogHandler,
  }
})();
