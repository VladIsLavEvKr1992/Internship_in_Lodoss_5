$(document).ready(function () {

});


// Программа моделирует Учебный Курс, Курс Предполагает набор тем.
// В каждой теме несколько вопросов, на каждый вопрос несколько ответов.
// Правильных и неправильных.

// Класс Курс - РАБОТАЕТ!!!
class Course {
	constructor(theme) {
		this.theme = theme;
	}

	addTheme(theme) {
		var themes = [];
		themes.push(this.theme);

		console.log(themes);
	}
}

// Класс Тема - РАБОТАЕТ!!!
class Theme {
	constructor(question) {
		this.question = question;
	}

	addQuestion(question) {
		var questions = [];
		questions.push(this.question);
		console.log(questions);
	}
}


// Класс Вопрос - РАБОТАЕТ!!!
class Question {
	constructor(answer, correctAnswer) {
		this.answer = answer;
		this.correctAnswer = correctAnswer;
	}

	addAnswer(answer, correctAnswer) {
		var answers = [];
		answers.push(this.answer);
		answers.push(this.correctAnswer);
		console.log(answers);
	}
}

// Класс Ответ - РАБОТАЕТ!!!
class Answer {
	constructor(answer, correctAnswer) {
		this.answer = answer;
		this.correctAnswer = correctAnswer;
	}
}


/*
function setData() {
	var course = new Course(),
	theme = new Theme();

	course.addTheme(theme);
	
	new Theme("Первый вопрос?").addQuestion();

	new Question("Первый ответ на Первый вопрос.", false).addAnswer();
	new Question("Второй ответ на Первый вопрос.", true).addAnswer();
	new Question("Третий ответ на Первый вопрос.", false).addAnswer();

	new Theme("Второй вопрос?").addQuestion();

	new Question("Первый ответ на Второй вопрос.", false).addAnswer();
	new Question("Второй ответ на Второй вопрос.", true).addAnswer();
	new Question("Третий ответ на Второй вопрос.", false).addAnswer();

	new Theme("Третий вопрос?").addQuestion();

	new Question("Первый ответ на Третий вопрос.", false).addAnswer();
	new Question("Второй ответ на Третий вопрос.", true).addAnswer();
	new Question("Третий ответ на Третий вопрос.", false).addAnswer();

	return course;
}

setData();

*/

function getResult() {
	let course = new Course(),
	theme = new Theme(),
	question = new Question(),
	answer = new Answer;

	course.addTheme(theme);

	theme.addQuestion(question);

	question.addAnswer(answer);

	setData(theme);
}

getResult();

function setData(theme) {
	new Theme("Первый вопрос?").addQuestion();


}
