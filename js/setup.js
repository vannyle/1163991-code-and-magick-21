'use strict';
//
// Constants
//
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

//
// Selectors
//
const userDialog = document.querySelector(`.setup`);
const similarListElement = userDialog.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`)
  .content
  .querySelector(`.setup-similar-item`);

//
// Functions
//
function getRandomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function generateWizard() {
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
}
function renderWizard(wizard) {
  const wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
  return wizardElement;
}
function createFragment() {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  return fragment;
}

//
// Data
//
const wizards = generateWizard();

//
// Presentation
//
similarListElement.appendChild(createFragment());
userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
userDialog.classList.remove(`hidden`);

