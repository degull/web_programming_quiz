const questions = [
   {
       question: "고양이의 평균 수명은 몇 년일까요?",
       choices: ["5-7년", "10-12년", "15-20년", "25-30년"],
       answer: 2
   },
   {
       question: "고양이는 보통 몇 개의 발가락을 가지고 있을까요?",
       choices: ["16개", "18개", "20개", "22개"],
       answer: 1
   },
   {
       question: "고양이는 어떤 색의 빛을 가장 잘 볼 수 있을까요?",
       choices: ["빨간색", "파란색", "초록색", "보라색"],
       answer: 1
   },
   {
       question: "고양이가 가장 좋아하는 수면 시간대는 언제일까요?",
       choices: ["오전", "오후", "밤", "새벽"],
       answer: 2
   },
   {
       question: "고양이의 발톱은 몇 개일까요?",
       choices: ["16개", "18개", "20개", "22개"],
       answer: 1
   },
   {
       question: "고양이는 몇 년 정도 기억을 유지할 수 있을까요?",
       choices: ["몇 시간", "몇 일", "몇 주", "몇 년"],
       answer: 3
   },
   {
       question: "고양이는 주로 어떤 소리를 내며 의사소통을 할까요?",
       choices: ["멍멍", "야옹", "으르렁", "찍찍"],
       answer: 1
   },
   {
       question: "고양이의 털이 많이 빠지는 시기는 언제일까요?",
       choices: ["봄과 가을", "여름과 겨울", "언제나 동일", "털이 안 빠짐"],
       answer: 0
   },
   {
       question: "고양이에게 위험한 음식은 무엇일까요?",
       choices: ["닭고기", "초콜릿", "생선", "쌀"],
       answer: 1
   },
   {
       question: "고양이가 꼬리를 세우고 있을 때의 기분은 무엇일까요?",
       choices: ["화남", "두려움", "만족함", "피곤함"],
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
           label.parentElement.parentElement.appendChild(correctAnswerText);
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
