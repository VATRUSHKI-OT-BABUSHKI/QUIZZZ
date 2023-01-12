import { quizConstructor } from "./constructor-opener.js";
import { questions } from "./question-creation.js";

// const fullPreviewButton = quizConstructor.querySelector('.full-preview-button');
const fullQuizPreview = document.querySelector('.full-quiz-preview');
const goBackButton = fullQuizPreview.querySelector('.go-back');
const questionOutput = fullQuizPreview.querySelector('.preview-question-output');
const answerButtons = fullQuizPreview.querySelectorAll('.preview-answer-output');
const fullPreviewFlipper = fullQuizPreview.querySelector('.full-preview-flipper');
const currentQuestionOutput = fullPreviewFlipper.querySelector('.current-question');
const fullPreviewQuestion = fullPreviewFlipper.querySelector('.question-count');
const flipLeftButton = fullPreviewFlipper.querySelector('.flip-left');
const flipRightButton = fullPreviewFlipper.querySelector('.flip-right');
const answerButtonsWrapper = fullQuizPreview.querySelector('.preview-questions-wrapper');

let currentQuestion = 0;

const openPreviewBlock = () => {
  currentQuestion = 0;
  currentQuestionOutput.textContent = currentQuestion + 1;
  resetButtonColors();
  changeAnswerButtons(false);
  quizConstructor.classList.add('hidden');
  fullQuizPreview.classList.remove('hidden');
  loadQuestionToPreview(questions[currentQuestion]);
  fullPreviewQuestion.textContent = questions.length;
};

const closePreviewBlock = () => {
  quizConstructor.classList.remove('hidden');
  fullQuizPreview.classList.add('hidden');
};

// const fullPreviewButtonClickHandler = (evt) => {
//   evt.preventDefault();
//   openPreviewBlock();
// }

const goBackButtonClickHandler = (evt) => {
  evt.preventDefault();
  closePreviewBlock();
}

const loadQuestionToPreview = (question) => {
  questionOutput.value = question.text;
  for (let i = 0; i < answerButtons.length; i++) {
	answerButtons[i].textContent = question.answers[i]; 
  }
};

const resetButtonColors = () => {
	answerButtons.forEach((button) => button.style.backgroundColor = 'white');
};

const changeAnswerButtons = (blocked) => {
	if (answerButtons[0].hasAttribute('disabled') !== blocked) {
		answerButtons.forEach((button) => button.toggleAttribute('disabled'));
	}
};

const fullPreviewFlipperHandler = (evt) => {
  const target = evt.target;
  if (target.tagName !== 'BUTTON') {
	return;
  }
  if (target.classList.contains('flip-left')) {	
	if (currentQuestion !== 0) {
		currentQuestion--;
		loadQuestionToPreview(questions[currentQuestion]);
		resetButtonColors();
		changeAnswerButtons(false);
	}
  } else {
	if (currentQuestion !== questions.length - 1) {
		currentQuestion++;
		loadQuestionToPreview(questions[currentQuestion]);
		resetButtonColors();
		changeAnswerButtons(false);
	}	
  }
  currentQuestionOutput.textContent = currentQuestion + 1;
};

const answerButtonsClickHandler = (evt) => {
  const target = evt.target;
  if (target.tagName !== 'BUTTON') {
	return;
  }
  if (questions[currentQuestion].correct === Array.from(answerButtons).indexOf(target)) {
	target.style.backgroundColor = 'green';
  } else {
	target.style.backgroundColor = 'red';
  }
  changeAnswerButtons(true);
};

fullPreviewFlipper.addEventListener('click', fullPreviewFlipperHandler);
answerButtonsWrapper.addEventListener('click', answerButtonsClickHandler);

// fullPreviewButton.addEventListener('click', fullPreviewButtonClickHandler);
goBackButton.addEventListener('click', goBackButtonClickHandler);

export {openPreviewBlock};