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
	resultEl.innerHTML = `<strong>Your score:</strong> ${score}/${questions.length} (${percent}%)`;
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
