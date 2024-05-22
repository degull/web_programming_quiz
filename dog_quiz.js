const questions = [
   {
       question: "강아지의 평균 임신 기간은 몇 일일까요?",
       choices: ["45일", "63일", "75일", "90일"],
       answer: 1
   },
   {
       question: "강아지가 태어날 때부터 사용할 수 있는 감각은 무엇일까요?",
       choices: ["시각", "청각", "후각", "미각"],
       answer: 2
   },
   {
       question: "강아지의 사회화 시기는 보통 생후 몇 주부터 시작되나요?",
       choices: ["2주", "4주", "6주", "8주"],
       answer: 3
   },
   {
       question: "강아지에게 초콜릿을 먹이면 안 되는 이유는 무엇일까요?",
       choices: ["칼로리가 너무 높아서", "이빨이 썩을 수 있어서", "강아지에게 독성 물질이 있어서", "소화가 안 돼서"],
       answer: 2
   },
   {
       question: "다음 중 강아지의 정상 체온 범위는 무엇일까요?",
       choices: ["35.5도 - 37.5도", "37.5도 - 39.5도", "39.5도 - 41.5도", "41.5도 - 43.5도"],
       answer: 1
   },
   {
       question: "강아지의 평균 수명은 몇 년일까요?",
       choices: ["5-8년", "8-12년", "10-15년", "15-20년"],
       answer: 2
   },
   {
       question: "강아지가 짖는 이유가 아닌 것은?",
       choices: ["경계심", "즐거움", "두려움", "졸음"],
       answer: 3
   },
   {
       question: "강아지가 가장 흔히 겪는 건강 문제는?",
       choices: ["탈모", "눈병", "비만", "감기"],
       answer: 2
   },
   {
       question: "강아지가 꼬리를 흔드는 이유는?",
       choices: ["기분이 좋아서", "배가 고파서", "낯선 사람을 만나서", "졸려서"],
       answer: 0
   },
   {
       question: "강아지의 평균 심박수는 분당 몇 회일까요?",
       choices: ["60-80회", "80-100회", "100-140회", "140-180회"],
       answer: 2
   }
];

document.addEventListener('DOMContentLoaded', () => {
   startQuiz();
});

function startQuiz() {
   document.getElementById('result').innerHTML = '';
   document.getElementById('restart-button').style.display = 'none';
   document.getElementById('submit-button').style.display = 'block';
   const quizContainer = document.getElementById('quiz-container');
   quizContainer.innerHTML = '';

   const selectedQuestions = getRandomQuestions(questions, 5);
   selectedQuestions.forEach((question, index) => {
       const questionDiv = document.createElement('div');
       questionDiv.classList.add('question');

       const questionTitle = document.createElement('p');
       questionTitle.textContent = `${index + 1}. ${question.question}`;
       questionDiv.appendChild(questionTitle);

       question.choices.forEach((choice, choiceIndex) => {
           const choiceLabel = document.createElement('label');
           const choiceInput = document.createElement('input');
           choiceInput.type = 'radio';
           choiceInput.name = `question${index}`;
           choiceInput.value = choiceIndex;
           choiceLabel.appendChild(choiceInput);
           choiceLabel.appendChild(document.createTextNode(choice));
           questionDiv.appendChild(choiceLabel);
           questionDiv.appendChild(document.createElement('br'));
       });

       quizContainer.appendChild(questionDiv);
   });
}

function getRandomQuestions(questions, num) {
   const shuffled = [...questions].sort(() => 0.5 - Math.random());
   return shuffled.slice(0, num);
}

function submitQuiz() {
   const quizContainer = document.getElementById('quiz-container');
   const answers = Array.from(quizContainer.querySelectorAll('input[type=radio]:checked'));
   if (answers.length < 5) {
       alert('모든 문제를 풀어주세요.');
       return;
   }

   const name = document.getElementById('name').value;
   const studentId = document.getElementById('student-id').value;
   const department = document.getElementById('department').value;

   let score = 0;
   answers.forEach((answer) => {
       const questionIndex = parseInt(answer.name.replace('question', ''));
       const selectedAnswer = parseInt(answer.value);
       const correctAnswer = questions[questionIndex].answer;

       const label = answer.parentElement;
       const icon = document.createElement('span');
       if (selectedAnswer === correctAnswer) {
           score++;
           icon.classList.add('correct');
           icon.textContent = 'O';
       } else {
           icon.classList.add('incorrect');
           icon.textContent = 'X';

           const correctAnswerText = document.createElement('div');
           correctAnswerText.textContent = `${questionIndex + 1}번 문제의 정답: ${questions[questionIndex].choices[correctAnswer]}`;
           correctAnswerText.classList.add('correct-answer');
           label.parentElement.parentElement.appendChild(correctAnswerText); // 정답을 해당 질문 하단에 추가
       }
       label.insertBefore(icon, answer);
   });

   const resultDisplay = document.getElementById('result');
   resultDisplay.textContent = `${department} ${name}(${studentId})의 점수는 ${score}/5 입니다.`;
   resultDisplay.classList.add('centered-text');
   document.getElementById('submit-button').style.display = 'none';
   document.getElementById('restart-button').style.display = 'block';
}



function restartQuiz() {
   startQuiz();
}
