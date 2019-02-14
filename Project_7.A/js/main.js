$(document).ready(function () {

});

// Программа моделирует Учебный Курс, Курс Предполагает набор тем.
// В каждой теме несколько вопросов, на каждый вопрос несколько ответов.
// Правильных и неправильных.


// класс курс
class Course {
	constructor(courseName) {
		this.courseName = courseName;
		this.themes = [];
	}
  
	// записываем объект с темой в курс
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


	// записываем объект с вопросом в тему?
	setQuestion(question) {
		this.questions.push(question);
	}
}

// класс вопрос

class Question {
	constructor(questionName) {
		this.questionName = questionName;
		this.answers = [];
	}

	// записываем объект с ответом в вопрос
	setAnswer(answer) {
		this.answers.push(answer);
		// return this; // для передачи контекста
	}

	get getQuestionName() {
		return this.questionName;
	}

	get getAnswer() {
		return this.answers;
	}
}

// класс ответ

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

	get getAnswer() {
		return [this.answer, this.correctAnswer];
	}
}

// ввожу данные для темы

function setData() {
	var course = new Course("Первый курс."),
	theme = new Theme("Первая тема."),
	question = new Question("Первый вопрос?");


	var answerOne = new Answer("Первый ответ на Первый вопрос.", false);
	var answerTwo = new Answer("Второй ответ на Первый вопрос.", true);
	var answerThree = new Answer("Третий ответ на Первый вопрос.", false);

	question.setAnswer(answerOne);
	question.setAnswer(answerTwo);
	question.setAnswer(answerThree);

	theme.setQuestion(question);

	course.setTheme(theme);
	
	console.log(course);
}

setData();