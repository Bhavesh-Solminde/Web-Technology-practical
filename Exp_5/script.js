const questions = [
	{
		q: 'What is 2 + 2?',
		choices: ['3', '4', '5', '22'],
		answer: 1
	},
	{
		q: 'Which color is the sky on a clear day?',
		choices: ['Green', 'Blue', 'Red', 'Yellow'],
		answer: 1
	},
	{
		q: 'What do 6 and 7 make?',
		choices: ['13', '67', '42', '1'],
		answer: 1, // joke: concatenation "67"
		joke: true
	},
	{
		q: 'Which planet do we live on?',
		choices: ['Mars', 'Venus', 'Earth', 'Jupiter'],
		answer: 2
	},
	{
		q: 'What does HTML stand for?',
		choices: ['Hot Time Machine Language', 'HyperText Markup Language', 'Hyperlink Text Markup Language', 'HugeText Markup'],
		answer: 1
	}
];

let current = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const nextBtn = document.getElementById('nextBtn');
const resultEl = document.getElementById('result');

function renderQuestion() {
	const item = questions[current];
	questionEl.textContent = `Q${current + 1}. ${item.q}`;
	choicesEl.innerHTML = '';
	item.choices.forEach((ch, i) => {
		const li = document.createElement('li');
		const btn = document.createElement('button');
		btn.type = 'button';
		btn.className = 'choice-btn';
		btn.textContent = ch;
		btn.addEventListener('click', () => selectChoice(i));
		li.appendChild(btn);
		choicesEl.appendChild(li);
	});
}

function selectChoice(index) {
	const item = questions[current];
	const buttons = choicesEl.querySelectorAll('button');
	buttons.forEach(b => b.disabled = true);

	// record user's answer
	userAnswers[current] = index;

	if (index === item.answer) {
		score++;
		buttons[index].classList.add('correct');
		if (item.joke) {
			resultEl.hidden = false;
			resultEl.textContent = '67';
			// rotate left -> right -> left animation once
			document.body.classList.add('rotate-joke');
			const onAnimEnd = () => {
				document.body.classList.remove('rotate-joke');
				document.body.removeEventListener('animationend', onAnimEnd);
			};
			document.body.addEventListener('animationend', onAnimEnd);
		}
	} else {
		// mark wrong selection and reveal correct
		buttons[index].classList.add('wrong');
		if (buttons[item.answer]) buttons[item.answer].classList.add('correct');
		if (item.joke) {
			resultEl.hidden = false;
			resultEl.textContent = 'Close — but the joke answer was 67.';
		}
	}
}

nextBtn.addEventListener('click', () => {
	resultEl.hidden = true;
	if (current < questions.length - 1) {
		current++;
		renderQuestion();
	} else {
		showResults();
	}
});

function showResults() {
	const percent = Math.round((score / questions.length) * 100);
	// stop wobbling when quiz ends
	document.body.classList.remove('wobble');
	resultEl.hidden = false;

	// build detailed results list
	let html = `<strong>Your score:</strong> ${score}/${questions.length} (${percent}%)`;
	html += '<ol class="final-list">';
	for (let i = 0; i < questions.length; i++) {
		const q = questions[i];
		const user = userAnswers[i];
		const isCorrect = user === q.answer;
		const userText = user === null ? '<em>No answer</em>' : q.choices[user];
		const correctText = q.choices[q.answer];
		html += `<li class="final-item ${isCorrect ? 'final-correct' : 'final-wrong'}">`;
		html += `<div class="final-q">Q${i+1}. ${q.q}</div>`;
		html += `<div class="final-a">Your answer: <span class="user-answer ${isCorrect ? 'correct' : 'wrong'}">${userText}</span></div>`;
		if (!isCorrect) {
			html += `<div class="final-c">Correct answer: <span class="correct-answer">${correctText}</span></div>`;
			html += `<div class="final-mark">Mark: <strong class="mark-zero">0</strong></div>`;
		} else {
			html += `<div class="final-mark">Mark: <strong class="mark-one">1</strong></div>`;
		}
		html += '</li>';
	}
	html += '</ol>';

	resultEl.innerHTML = html;
	nextBtn.textContent = 'Restart';
	nextBtn.removeEventListener('click', nextHandler);
	nextBtn.addEventListener('click', restartQuiz);
}

function nextHandler() {
	// placeholder if needed
}

function restartQuiz() {
	current = 0;
	score = 0;
	nextBtn.textContent = 'Next';
	nextBtn.removeEventListener('click', restartQuiz);
	nextBtn.addEventListener('click', () => {
		if (current < questions.length - 1) { current++; renderQuestion(); } else { showResults(); }
	});
	renderQuestion();
	resultEl.hidden = true;
}

// initialize
renderQuestion();
