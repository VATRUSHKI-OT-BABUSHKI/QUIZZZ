import { quizConstructor } from "./constructor-opener.js";
import { openPreviewBlock } from "./quiz-preview.js";

//Версия, в которой формируется массив, содержащий все вопросы.
const constructionMenu = document.querySelector('.construction-menu');
const newQuestionText = constructionMenu.querySelector('.new-question-text');
const addAnswersBlock = constructionMenu.querySelector('.add-answers');
const answers = constructionMenu.querySelectorAll('.new-answer');
const answerInputs = constructionMenu.querySelectorAll('.new-answer-text');
const correctRadios = constructionMenu.querySelectorAll('[name="correct-question"]');

const currentQuestion = document.querySelector('.current-question');
const questionCount = document.querySelector('.question-count');
const phonePreview = document.querySelector('.phone-preview');
const questionTextOutput = phonePreview.querySelector('.question-text');
const answerOutputs = phonePreview.querySelectorAll('.answer');

const buttonDelete = constructionMenu.querySelector('.button-delete');
const buttonSave = constructionMenu.querySelector('.button-save');

const flipper = document.querySelector('.creation-flipper');

const fullPreviewButton = quizConstructor.querySelector('.full-preview-button');

fullPreviewButton.setAttribute('disabled', 'disabled');

const blockPreviewButtonIfNeeded = () => {
	if ((questions.length === 0) !== fullPreviewButton.hasAttribute('disabled')) {
		fullPreviewButton.toggleAttribute('disabled');
	}
};

const fullPreviewButtonClickHandler = (evt) => {
	evt.preventDefault();
	openPreviewBlock();
};

fullPreviewButton.addEventListener('click', fullPreviewButtonClickHandler);

let values = [];

const isActiveButton = (values) => {	
	buttonSave.disabled = (!values.every((element) => element != '')) ? true : false;
}

const checkSaveButtonStatus = () => {
	values = [];
	for (let item of answerInputs){
		values.push(item.value)
	}
	values.push(newQuestionText.value)
	isActiveButton(values);
}

const questionInputHandler = () => {
  questionTextOutput.value = newQuestionText.value;
  checkSaveButtonStatus();
};

const answersInputHandler = (evt) => {
  const target = evt.target;
  if (!target.classList.contains('new-answer-text')) {
    return;
  }
  answerOutputs[Array.from(answerInputs).indexOf(target)].value = target.value
  checkSaveButtonStatus();	
}

const updatePreview = (question) => {
  questionTextOutput.value = question.text;
  for (let i = 0; i < answerOutputs.length; i++) {
    answerOutputs[i].value = question.answers[i];
  }
}

const checkNeedForDeletions = () => {
  if (currentQuestion.textContent !== questionCount.textContent) {
    buttonDelete.removeAttribute('disabled');
  }
  else {
    buttonDelete.setAttribute('disabled', 'disabled');
  }
}

const increaseCurrentQuestion = () => {
  currentQuestion.textContent = parseInt(currentQuestion.textContent) + 1;
}
const decreaseCurrentQuestion = () => {
  currentQuestion.textContent = parseInt(currentQuestion.textContent) - 1;
}
const increaseQuestionCount = () => {
  questionCount.textContent = parseInt(questionCount.textContent) + 1;
}
const decreaseQuestionCount = () => {
  questionCount.textContent = parseInt(questionCount.textContent) - 1;
}


const questions = [];
let cachedQuestion = {};

const saveQuestion = () => {
  const answers = [];
  answerInputs.forEach((answer) => {
    answers.push(answer.value)
  });
  let correct = 0;
  correctRadios.forEach((radio) => {
    if (radio.checked) {
      correct = Array.from(correctRadios).indexOf(radio);
      return;
    }
  })
  const question = {
    text: newQuestionText.value,
    answers: answers,
    correct: correct
  }
  questions[parseInt(currentQuestion.textContent) - 1] = question;
  blockPreviewButtonIfNeeded();
  console.log(questions);
}

const saveButtonHandler = (evt) => {
  evt.preventDefault();
  saveQuestion();
  buttonSave.disabled = true;
  if (currentQuestion.textContent === questionCount.textContent) {
    increaseQuestionCount();
    increaseCurrentQuestion();
    constructionMenu.reset();
  }
  checkNeedForDeletions();
}

const loadQuestionToForm = (question) => {
  newQuestionText.value = question.text;
  for (let i = 0; i < answerInputs.length; i++) {
    answerInputs[i].value = question.answers[i];
  }
  correctRadios[question.correct].checked = true;
  updatePreview(question);
}

const flipperClickHandler = (evt) => {
  const target = evt.target;
  if (!target.classList.contains('flip-arrow')) {
    return;
  }
  if (target.classList.contains('flip-left')) {
    if (currentQuestion.textContent === '1') {
      return;
    }
    if (currentQuestion.textContent === questionCount.textContent) {
      //saveQuestion();
    }
    decreaseCurrentQuestion();
    checkNeedForDeletions();
  }
  if (target.classList.contains('flip-right')) {
    if (currentQuestion.textContent === questionCount.textContent) {
      return;
    }
    increaseCurrentQuestion();
    checkNeedForDeletions();
    if (currentQuestion.textContent === questionCount.textContent) {
      constructionMenu.reset();
      return;
    }
  }
  loadQuestionToForm(questions[parseInt(currentQuestion.textContent) - 1]);
};

const deleteButtonHandler = (evt) => {
  evt.preventDefault()
  questions.splice(parseInt(currentQuestion.textContent) - 1, 1);
  //decreaseCurrentQuestion();
  decreaseQuestionCount();
  checkNeedForDeletions();
  buttonSave.disabled = true;
  blockPreviewButtonIfNeeded();
  console.log(questions);
  if (currentQuestion.textContent === questionCount.textContent) {
    constructionMenu.reset();	
    return;
  }
  loadQuestionToForm(questions[parseInt(currentQuestion.textContent) - 1]);
  checkNeedForDeletions();
};

const radiosChangeHandler = (evt) => {
  const target = evt.target;
  if (!target.type === 'RADIO') {
    return;
  }
  checkSaveButtonStatus();
}

buttonSave.disabled = true;
newQuestionText.addEventListener('input', questionInputHandler);
addAnswersBlock.addEventListener('input', answersInputHandler);
buttonSave.addEventListener('click', saveButtonHandler);
flipper.addEventListener('click', flipperClickHandler);
buttonDelete.addEventListener('click', deleteButtonHandler);

addAnswersBlock.addEventListener('click', radiosChangeHandler);

export {questions};
