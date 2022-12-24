import { quizConstructor } from "./constructor-opener.js";

const fullPreviewButton = quizConstructor.querySelector('.full-preview-button');
const fullQuizPreview = document.querySelector('.full-quiz-preview');
const goBackButton = fullQuizPreview.querySelector('.go-back');

const openPreviewBlock = () => {
  quizConstructor.classList.add('hidden');
  fullQuizPreview.classList.remove('hidden');
};

const closePreviewBlock = () => {
  quizConstructor.classList.remove('hidden');
  fullQuizPreview.classList.add('hidden');
};

const fullPreviewButtonClickHandler = (evt) => {
  evt.preventDefault();
  openPreviewBlock();
}

const goBackButtonClickHandler = (evt) => {
  evt.preventDefault();
  closePreviewBlock();
}

fullPreviewButton.addEventListener('click', fullPreviewButtonClickHandler);
goBackButton.addEventListener('click', goBackButtonClickHandler);



