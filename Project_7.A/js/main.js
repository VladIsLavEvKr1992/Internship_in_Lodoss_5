$(document).ready(function () {

});

// Программа моделирует Учебный Курс, Курс Предполагает набор тем.
// В каждой теме несколько вопросов, на каждый вопрос несколько ответов.
// Правильных и неправильных.

// Класс курс
class Course {
	constructor(course) {
		this.course = course;
		this.themes = [];
	}

	setTheme(theme) {
		this.themes.push(theme);
	}
}

// Класс тема
class Theme {
	constructor(themeName) {
		this.themeName = themeName;
		this.questions = [];
	}

	setQuestion(questionName) {
		this.questions.push(new Question(questionName));
	}
}

// Класс вопрос
class Question {
	constructor(questionName) {
		this.questionName = questionName;
		this.answers = [];
	}

	setAnswer(answer) {
		this.answer = answer;
		this.answers.push(this.answer);
	}
}

// Класс ответ
class Answer {
	constructor(answer) {
		this.answer = answer;
		this.correctAnswers = []; // содержит true or false
	}

	isCorrect(correctAnswer) {
		this.correctAnswer = correctAnswer;
		this.correctAnswers.push(this.correctAnswer);
	}
}


// ввожу данные для темы
function setData(themeObject) {
	var questionObject = new Question(),
	answerObject = new Answer();

	themeObject.setQuestion("Первый вопрос?");

	questionObject.setAnswer("Первый ответ на Первый вопрос.");

	answerObject.isCorrect(false);

}


function getResult() {
	// объекты курс и тема
	var courseObject = new Course("Первый курс."),
	themeObject = new Theme("Первая тема.");

	setData(themeObject);

	courseObject.setTheme(themeObject);

	console.log(courseObject);
}

getResult();