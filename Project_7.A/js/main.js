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

	get getCourseName() {
		return this.courseName;
	}
}


// класс тема
class Theme {
	constructor(themeName) {
		this.themeName = themeName;
		this.questions = [];
	}

	// записываем объект с вопросом в тему?
	setQuestion(question) {
		this.questions.push(question);
	}

	get getThemeName() {
		return this.themeName;
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
class Answer {
	constructor(answer, correctAnswer) {
		this.answer = answer;
		this.correctAnswer = correctAnswer;
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


/*
// /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\
ВТОРАЯ ВЕРСИЯ ПРОГРАММЫ 7.А

// Класс курс
class Course {
	constructor(courseName) {
		this.courseName = courseName;
		this.themes = [];
	}

	// записываем объект с темой в курс
	setThemeObject(theme) {
		this.themes.push(theme);
	}

	get getCourseName() {
		return this.courseName;
	}
}


// Класс тема
class Theme {
	constructor(themeName) {
		this.themeName = themeName;
		this.questions = [];
	}

	// записываем объект с вопросом в тему?
	setQuestionObject(question) {
		this.questions.push(question);
	}

	get getThemeName() {
		return this.themeName;
	}
}

// Класс вопрос
class Question {
	constructor(questionName) {
		this.questionName = questionName;
		this.answers = [];
	}

	// записываем ответ в вопрос
	setAnswer(answer, correctAnswer) {
		this.answer = answer;
		this.correctAnswer = correctAnswer;
		this.answers.push([this.answer, this.correctAnswer]);
		
	}

	// записываем объект с ответом в вопрос
	setAnswerObject(answer) {
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

// Класс ответ
class Answer {
	constructor(answer, correctAnswer) {
		this.answer = answer;
		this.correctAnswer = correctAnswer;
	}

	get getAnswer() {
		return [this.answer, this.correctAnswer];
	}
}

// ввожу данные для темы
function setData() {
	var course = new Course("Первый курс."),
	theme = new Theme("Первая тема."),
	question = new Question("Первый вопрос?"),
	answer = new Answer();

	question.setAnswer("Первый ответ.", true);
	question.setAnswer("Второй ответ.", false);
	question.setAnswer("Третий ответ.", false);

	theme.setQuestionObject(question);

	course.setThemeObject(theme);
	
	console.log(course);
}

//setData();
*/