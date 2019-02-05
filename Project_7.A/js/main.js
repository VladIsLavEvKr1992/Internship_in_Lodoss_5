$(document).ready(function () {

});

// Программа моделирует Учебный Курс, Курс Предполагает набор тем.
// В каждой теме несколько вопросов, на каждый вопрос несколько ответов.
// Правильных и неправильных.

// КЛАСС УЧЕБНЫЕ КУРСЫ
function Courses() {
	var course,
	courseOne,
	courseTwo,
	courseThree,

	self = this;

	//numberCourse = prompt("Выберите учебный курс: 1, 2, 3.", 1);

	this.getCourse = function(numberCourse) {

		if (numberCourse == 1) {
			course = courseOne;
		}

		if (numberCourse == 2) {
			course = courseTwo;
		}

		if (numberCourse == 3) {
			course = courseThree;
		}

		return course;
	}

}

/*
var newCourse = new Courses();
var test = newCourse.getCourse();
console.log(test);
*/




// КЛАСС УЧЕБНЫЕ ТЕМЫ
function Themes() {
	var theme,
	themeOne,
	themeTwo,
	themeThree;

	//numberTheme = prompt("Выберите учебную тему: 1, 2, 3.", 1);

	this.getCourse = function(numberTheme) {

		if (numberTheme == 1) {
			theme = themeOne;
		}

		if (numberTheme == 2) {
			theme = themeTwo;
		}

		if (numberTheme == 3) {
			theme = themeThree;
		}
		
		return theme;
	}
}


// КЛАСС ВОПРОСЫ
function Questions() {

	var question,
	questionOne = "Первый вопрос?",
	questionTwo = "Второй вопрос?",
	questionThree = "Третий вопрос?";

	// задать вопрос по учебному курсу
	this.getQuestion = function(_numberQuestion) {

		if (_numberQuestion == 1) {
			question = questionOne;
		}

		if (_numberQuestion == 2) {
			question = questionTwo;
		}

		if (_numberQuestion == 3) {
			question = questionThree;
		}
		return question;
	}			
}


// КЛАСС ОТВЕТЫ
function Answers() {

	var answer, 
	answerOneOne = false,
	answerOneTwo = true,
		
	answerTwoOne = true,
	answerTwoTwo = false,
			
	answerThreeOne = false,
	answerThreTwo = true;


	this.getAnswers = function(_numberQuestion, _numberAnswer) {

		if (_numberQuestion == 1 && _numberAnswer == 1) {
			answer = answerOneOne;
		}
		
		if (_numberQuestion == 1 && _numberAnswer == 2) {
			answer = answerOneTwo;
		}
		

		if (_numberQuestion == 2 && _numberAnswer == 1) {
			answer = answerTwoOne;
		}
		
		if (_numberQuestion == 2 && _numberAnswer == 2) {
			answer = answerTwoTwo;
		}

		if (_numberQuestion == 3 && _numberAnswer == 1) {
			answer = answerThreeOne;
		}
		
		if (_numberQuestion == 3 && _numberAnswer == 2) {
			answer = answerThreTwo;
		}

		return answer;
	}
}


// КЛАСС АНАЛИЗ ОТВЕТОВ НА ВОПРОСЫ
function AnswersAnalysis() {	// за правильные ответы начисляются баллы																								
	var finalRezult = 0,	// Итоговая оценка прохождения Тестирования
	points = 0;

	this.getAnalysisAnswer = function(_numberQuestion, _numberAnwer) {
		if (_numberQuestion == 1 && _numberAnwer == 2) {
			points = 100;
		}

		if (_numberQuestion == 2 && _numberAnwer == 1) {
			points = 100;
		}
			
		if (_numberQuestion == 3 && _numberAnwer == 2) {
			points = 100;
		}
					
		finalRezult += points;

		return points;				// Баллы, начисляемые за правильные ответы
	}
}



// КЛАСС ОЦЕНКА ЗНАНИЙ
function EvaluateOfKnowledge() { // формируется Оценка Знаний Тестируемого
	var finalRezult, knowledgeEvaluation;

	this.getEvaluateOfKnowledge = function(_numberOfQuestions) { // формируется Оценка Знаний Тестируемого
		knowledgeEvaluation = finalRezult / _numberOfQuestions;
		return knowledgeEvaluation;
	}
}


// КЛАСС ОБРАБОТКА ДАННЫХ
function processData() {	

	var newCourse = new Courses(),
	newTheme = new Themes(),
	newQuestion = new Questions(),
	//console.log(newQuestion.getQuestion());
	newAnswer = new Answers(),
	newAnswersAnalysis = new AnswersAnalysis(),
	newEvaluateOfKnowledge = new EvaluateOfKnowledge();
	
	var	question,					// Переменная для вывода Формулировки вопроса
	answer,					// Переменная для выода Формулировки ответа
	newNumber,						
	numberOfQuestions	=	3,	// Общее количество вопросов задаётся здесь
	rezult;					// Для оценки правильности/неправильности ответа на вопрос

	
	var toAgree = confirm(`Вы согласны ответить, на следующие вопросы?`);

	if (toAgree) {

		for (let i = 1; i <= numberOfQuestions; i++) {

			question = newQuestion.getQuestion(i);
			
			console.log(`Вопрос № ${i}`);
			console.log(question);
			console.log(`Варианты ответов: `);

			var test = prompt(`Вопрос № ${i}. ${question} Варианты ответов: 1, 2`, 1);

			for (let j = 1; j <= 3; j++) {

				answer = newAnswer.getAnswers(i,j);
				console.log(`${j}  .  Answer`);
			}
				
			console.log(`Введите Номер Верного Ответа на поставленный Вопрос:`);
			console.log(`ПРИНЯТЬ ВВОД- newNumber`);

			rezult = newAnswersAnalysis.getAnalysisAnswer(i, newNumber);

			if (rezult == 0) {
				console.log(`Вы ввели Неверный ответ!`);
		
			} else {
				console.log("Ok");
			}
		
			console.log(`Поздравляем, Вы ввели Верный ответ!`);
			console.log(`Итоговые Баллы: " ${rezult}`);

			if (i == numberOfQuestions)
			{
				rezult = newEvaluateOfKnowledge.getEvaluateOfKnowledge(numberOfQuestions);
				console.log(`Вы ответили верно на ${rezult} % Вопросов.`);
			}
		}
		} else {
			alert(`Вы отказались отвечать на вопросы!`);
		}

	return;
}

processData();	