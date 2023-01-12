import Head from 'next/head'
import { useEffect } from 'react'
import styles from './index.module.scss'

export default function Home() {
  const сlickHandler = async () => {
    let currentQuestion = document.querySelector(".current-question").textContent;
    
    const responce = await fetch('/api/exampledb', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        currentQuestion: currentQuestion,
      })
    })
    const data = await responce.json();
    console.log(data);
  }

  const onSendResult = async () => {
    let currentQuestion = document.querySelector(".current-question").textContent;
    let question = document.getElementById("q-text").value;
    let firstAnswer = document.getElementById("fsta-text").value;
    let secondAnswer = document.getElementById("snda-text").value;
    let thirdAnswer = document.getElementById("trda-text").value;
    let fourthAnswer = document.getElementById("ftha-text").value;
    let correctAnswer;
    let radioButtons = document.querySelectorAll('input[name=correct-question]')
    for (let button of radioButtons) {
      if (button.checked) {
        correctAnswer = button.closest('.radio-correct-label').previousElementSibling.value;
        break;
      }
    }

    const responce = await fetch('/api/sendResult', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        currentQuestion: currentQuestion,
        question: question,
        firstAnswer: firstAnswer,
        secondAnswer: secondAnswer,
        thirdAnswer: thirdAnswer,
        fourthAnswer: fourthAnswer,
        correctAnswer: correctAnswer
      })
    })
    const data = await responce.json();
    console.log('Ответ от сервера = ', data);
  }

  // это выполнится один раз после отрисовки страницы
  useEffect(() => {
    //document.getElementById('two').
  }, [])


  return (
    <div>
        <Head>
            <meta charset="utf-8"/>
            <title>Quizzz</title>
        </Head>

        <div>
            <header>
                <div class="nav-container">
                    <nav class="header-nav">
                        <a href="#" class="main-logo">
                          <img src="/img/logo-2.svg" class="nav-item logo"/>
                        </a>                   
                        <a href="#" class="nav-item create-test">Создать тест</a>
                        <a href="#" class="nav-item info">Как это работает?</a>
                        <a href="#" class="nav-item contacts">Контакты</a>
                    </nav>
                    <button class="connection-code hidden">
                        Код присоединения
                    </button>
                </div>
            </header>
            <main>
                {/* <!--Блок с описаниями игр--> */}
                <div class="choosing-game">
                    <h1>
                        <span class="green">Обучение</span><span class="white"> - то ещё </span><span class="green pencil-underlined">развлечение</span>
                    </h1>
                    <div class="game-choice-container">
                        <div hidden class="arrow"></div>
                        <button class="side-button button-left" >
                            <div class="arrow arrow-left"></div>
                        </button>
                        <article class="game-description">
                            <div class="card-left">
                                <h2 class="game-name">Quizzz</h2>
                                <div class="p-wrapper">
                                    <p>
                                        Это игра, участникам которой предстоит пройти тест. Каждый вопрос имеет ограничение по времени, поэтому чем быстрее будет дан ответ, тем больше баллов можно будет заработать. Вы можете создать такой тест прямо сейчас, просто нажав на кнопку ниже.
                                    </p>
                                </div>
                                <button id="create-quiz" class="create-game-button" type="button">Создать Quizzz</button>
                            </div>
                            <img src="/img/phone-pic-1.png" width="315px" height="633px" class="phone-pic"/>
                        </article>
                        <div class="side-button button-right">
                            <div class="arrow arrow-right"></div>
                        </div>
                    </div>
                    <div class="circles">
                        <div class="circle circle-current"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                    </div>
                </div>
                {/* <!--Конструктор quiz. Переключение между ним и стартовой страницей с помощью класса hidden--> */}
                <div class="quiz-constructor-container hidden">
                    <div class="phone-wrapper">
                        <div class="phone-preview">
                            <output class="question-text" name="question-text" form="question-form">
                                В каком году родился Иван Грозный?
                            </output>
                            <div class="answers">
                                <output class="answer" id="answer-output-1" form="question-form">
                                    1530
                                </output>
                                <output class="answer" id="answer-output-2" form="question-form">
                                    1529
                                </output>
                                <output class="answer" id="answer-output-3" form="question-form">
                                    1528
                                </output>
                                <output class="answer" id="answer-output-4" form="question-form">
                                    1527
                                </output>
                                
                            </div>
                        </div>
                        <div class="flipper creation-flipper">
                            <button class="flip-arrow flip-left"></button>
                            <div>
                                <span class="current-question">1</span>/<span class="question-count">1</span>
                            </div>
                            <button class="flip-arrow flip-right"></button>
                        </div>
                    </div>
                    <form class="construction-menu" id="question-form" autocomplete="off">
                        <input type="text" name="new-question-text" id="q-text" class="new-question-text" placeholder="Введите текст вопроса..."/>
                        <div class="add-answers">
                            <div class="new-answer">
                                <input type="text" name="answer-text" id="fsta-text" class="new-answer-text" placeholder="Введите ответ..."/>
                                <label class="radio-correct-label">
                                    <input type="radio" name="correct-question" defaultChecked/>
                                    <span></span>
                                </label>
                            </div>
                            <div class="new-answer">
                                <input type="text" name="answer-text" id="snda-text" class="new-answer-text" placeholder="Введите ответ..."/>
                                <label class="radio-correct-label">
                                    <input type="radio" name="correct-question"/>
                                    <span></span>
                                </label>
                            </div>
                            <div class="new-answer">
                                <input type="text" name="answer-text" id="trda-text" class="new-answer-text" placeholder="Введите ответ..."/>
                                <label class="radio-correct-label">
                                    <input type="radio" name="correct-question"/>
                                    <span></span>
                                </label>
                            </div>
                            <div class="new-answer">
                                <input type="text" name="answer-text" id="ftha-text" class="new-answer-text" placeholder="Введите ответ..."/>
                                <label class="radio-correct-label">
                                    <input type="radio" name="correct-question"/>
                                    <span></span>
                                </label>
                            </div>
                        </div>
                        <div class="buttons">
                            <button onClick={сlickHandler} class="button-delete">
                                Удалить
                            </button>
                            <button onClick={onSendResult} class="button-save">
                                Сохранить
                            </button>
                            <button class="full-preview-button">
                                Предпросмотр
                            </button>
                        </div>
                    </form>
                </div>
                <div class="full-quiz-preview hidden">
                    <button class="go-back">
                        <img src="/img/go-back-arrow.svg"/>
                    </button>
                    <div class="outputs-container">
                        <div class="preview-wrapper">
                            <output class="preview-question-output">
                                В каком году родился Иван Грозный?
                            </output>
                            <div class="preview-questions-wrapper">
                                <button class="preview-answer-output">1530</button>
                                <button class="preview-answer-output">1529</button>
                                <button class="preview-answer-output">1528</button>
                                <button class="preview-answer-output">1527</button>
                            </div>
                            <div class="flipper full-preview-flipper">
                                <button class="flip-arrow flip-left"></button>
                                <div>
                                    <span class="current-question">1</span>/<span class="question-count">1</span>
                                </div>
                                <button class="flip-arrow flip-right"></button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--Второй лист стартовой страницы--> */}
                <div class="how-it-works-container">
                    <div class="how-it-works">
                        <h2 class="part-two-header">Как это работает?</h2>
                        <div class="decor">
                            <div class="decor-circle decor-circle-blue"></div>
                            <div class="decor-circle decor-circle-yellow"></div>
                            <img src="/img/auditorium.png"/>
                        </div>
                        <div class="steps">
                            <div class="step">
                                <div class="step-number">
                                    1
                                </div>
                                <div class="step-header">
                                    Создайте тест
                                </div>
                                <div class="step-text">
                                    Просто нажмите на кнопку создать тест и добавьте вопросы
                                </div>
                            </div>
                            <div class="step">
                                <div class="step-number">
                                    2
                                </div>
                                <div class="step-header">
                                    Дайте ученикам отсканировать QR код
                                </div>
                                <div class="step-text">
                                    После создания теста появится в отдельном окне
                                </div>
                            </div>
                            <div class="step">
                                <div class="step-number">
                                    3
                                </div>
                                <div class="step-header">
                                    Наблюдайте 
                                </div>
                                <div class="step-text">
                                    Просто наблюдайте за аудиторией
                                </div>
                            </div>
                            <div class="step">
                                <div class="step-number">
                                    4
                                </div>
                                <div class="step-header">
                                    Получите список учеников с баллами
                                </div>
                                <div class="step-text">
                                    Список формируется по алфавиту
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        {/* <!--Скрипт пока что только включает и отключает конструктор quiz по кнопкам "Создать Quizzz" и "Создать тест"--> */}
        <script src="./js/main.js" type="module" defer></script>
    </div>
  )
}

export function Button({ text, disabled = false }) {
  return <div className={`${styles.button} ${disabled ? styles.button_disabled : ''}`}>
    {text}
  </div>
}

export function Radio({ checked, disabled = false }) {
  return <div className={`${styles.radio} ${disabled ? styles.radio_disabled : ''}`}>
    <div className={`${styles.radio__outer} ${checked ? styles.radio__outer_checked : ''}`}>
      {checked && <div className={styles.radio__dot}></div>}
    </div>
  </div>
}

export function RadioBox({ text, checked, disabled }) {
  return <div className={styles.radioBox}>
    <Radio checked={checked} disabled={disabled} />
    <div className={styles.radioBox__text}>{text}</div>
  </div>
}