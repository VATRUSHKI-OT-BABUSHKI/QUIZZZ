const presentation = document.body.querySelector('.choosing-game');
const navContainer = document.querySelector('.nav-container');
const createTestButton = document.querySelector('.create-test');
const createGameButton = presentation.querySelector('.create-game-button');
const quizConstructor = document.body.querySelector('.quiz-constructor-container');
const connectionCode = document.querySelector('.connection-code');

const openQuizConstructor = (evt) => {
  evt.preventDefault();
  presentation.classList.add('hidden');
  quizConstructor.classList.remove('hidden');
  navContainer.classList.add('constructor-open');
  connectionCode.classList.remove('hidden');
};

const closeQuizConstructor = (evt) => {
  evt.preventDefault();
  presentation.classList.remove('hidden');
  quizConstructor.classList.add('hidden');
  navContainer.classList.remove('constructor-open');
  connectionCode.classList.add('hidden');
};

createGameButton.addEventListener('click', openQuizConstructor);

createTestButton.addEventListener('click', closeQuizConstructor);
