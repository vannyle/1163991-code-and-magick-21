'use strict';

// Constants
const WIZARDS_COUNT = 4;
const WIZARDS_FIRSTNAME = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARDS_SURNAME = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const WIZARDS_EYESCOLOR = [`black`, `red`, `blue`, `yellow`, `green`];
const WIZARDS_COATCOLOR = [
  `rgb(101, 137, 164)`,
  `rgb(241, 43, 107)`,
  `rgb(146, 100, 161)`,
  `rgb(56, 159, 117)`,
  `rgb(215, 210, 55)`,
  `rgb(0, 0, 0)`
];
const WIZARD_FIREBALL = [
  `#ee4830`,
  `#30a8ee`,
  `#5ce6c0`,
  `#e848d5`,
  `#e6e848`,
];

// Selectors
const userDialog = document.querySelector(`.setup`);
const similarListElement = userDialog.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

const setupOpen = document.querySelector(`.setup-open`);
const setupClose = userDialog.querySelector(`.setup-close`);

const wizardCoat = userDialog.querySelector(`.setup-wizard .wizard-coat`);
const wizardEyes = userDialog.querySelector(`.setup-wizard .wizard-eyes`);
const wizardFireball = userDialog.querySelector(`.setup-fireball-wrap`);
const userName = userDialog.querySelector(`.setup-user-name`);
const setupWizardForm = userDialog.querySelector(`.setup-wizard-form`);

// Functions
const getRandomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const generateWizard = () => {
  const wizards = [];
  for (let i = 0; i < WIZARDS_COUNT; i++) {
    const wizard = {
      name: `${getRandomFrom(WIZARDS_FIRSTNAME)} ${getRandomFrom(WIZARDS_SURNAME)}`,
      coatColor: getRandomFrom(WIZARDS_COATCOLOR),
      eyesColor: getRandomFrom(WIZARDS_EYESCOLOR)
    };
    wizards.push(wizard);
  }
  return wizards;
};
const renderWizard = (wizard) => {
  const wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
  return wizardElement;
};
const createFragment = () => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return fragment;
};

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
};

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

/* Change wizard colors */
wizardCoat.addEventListener(`click`, () => {
  wizardCoat.style.fill = getRandomFrom(WIZARDS_COATCOLOR);
});

wizardEyes.addEventListener(`click`, () => {
  wizardEyes.style.fill = getRandomFrom(WIZARDS_EYESCOLOR);
});

wizardFireball.addEventListener(`click`, () => {
  const wizardFireballColor = wizardFireball.style.background = getRandomFrom(WIZARD_FIREBALL);
  wizardFireball.querySelector(`input`).value = wizardFireballColor;
  return wizardFireballColor;
});

// Data
const wizards = generateWizard();

// Presentation
similarListElement.appendChild(createFragment());
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);

