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
	addTheme(theme) {
		this.themes.push(theme);
	}

	getCourseName() {
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
	addQuestion(question) {
		this.questions.push(question);
	}

	getThemeName() {
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
	addAnswer(answer) {
		this.answers.push(answer);
		// return this; // для передачи контекста
	}

	getQuestionName() {
		return this.questionName;
	}

	getAnswers() {
		return this.answers;
	}
}

// класс ответ
class Answer {
	constructor(answer, correctAnswer) {
		this.answer = answer;
		this.correctAnswer = correctAnswer;
	}

	getAnswer() {
		return [this.answer, this.correctAnswer];
	}
}

// ввожу данные для темы
function setData() {
	var course = new Course("Первый курс."), 		// для ввода первичных данных из аргумента
	theme = new Theme("Первая тема."), 					// для ввода первичных данных из аргумента
	question = new Question("Первый вопрос?"); 	// для ввода первичных данных из аргумента

	// для ввода первичных данных из аргумента
	var answerOne = new Answer("Первый ответ на Первый вопрос.", false),
	answerTwo = new Answer("Второй ответ на Первый вопрос.", true),
	answerThree = new Answer("Третий ответ на Первый вопрос.", false);

	question.addAnswer(answerOne); // для передачи экземпляра объекта через аргумент
	question.addAnswer(answerTwo);
	question.addAnswer(answerThree);

	theme.addQuestion(question);

	course.addTheme(theme); // для передачи экземпляра объекта через аргумент
	
	console.log(course);
	console.log(question.getAnswers()); // для считывания из экземпляра объекта значений
	console.log(answerOne.getAnswer()); // для считывания из экземпляра объекта значения
}

setData();