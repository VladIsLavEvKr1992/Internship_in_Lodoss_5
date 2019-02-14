$(document).ready(function () {

	setData();

});

/*
Задача 2 Движение товара
<2d
Существует товар, производитель товара, потребитель товара, 
и посредник между производителем и потребителем. 
Ежедневно производитель создает произвольное количество единиц 
товара в интервале 50-150шт. Ежедневно у потребителя возникает 
необходимость в 70-120шт товара. Посредник за один день может 
доставить максимум 100шт товара. 
Смоделировать движение товара за 10 дней и вывести в табличной 
форме результаты. 

Колонки таблицы:
	Количество товара у производителя
	Количество необходимого потребителю товара
	Количество доставленного товара за день
	Количество произведенного товара за последние 3 дня
	Количество доставленного товара за последние 3 дня
	КПД посредника
Любой объект в этом задании должен быть экземпляром класса. Чтение и модификация свойств объектов извне должны быть реализованы через методы.
*/

// класс производитель, производит товар сегодня и всегда
class Manufacturer {
	constructor() {
		this.minimum = 50;
		this.maximum = 150;
		this.goods = []; // массив с произведенными товарами
	}

	// счетчик произведенных за 3 дня товаров через метод slice() для отчета
	setCountThreeDay(day) {
		this.goodsThreeDay = this.goods.slice(day - 3, day);

		this.summThreeDay = this.goodsThreeDay.reduce(function(sum, current) {
			return sum + current;
		}, 0); // 0 - initialValue - это изначальное значение

		return this.summThreeDay;
	}

	setProducedToday(value) {
		this.goods.push(value);
	}

	// последний элемент массива с товарами
	getProducedToday() {
		return this.goods[this.goods.length - 1];
	}

	getProducedTotal() {
		return this.goods;
	}

	// сумма произведенных товаров
	getAllProduced() {
		this.summProduced = this.goods.reduce(function(sum, current) {
			return sum + current;
		}, 0);
		return this.summProduced;
	}
}

// класс потребитель, ему нужен товар сегодня и вообще
class Consumer {
	constructor() {
		this.minimum = 70;
		this.maximum = 120;
		this.goods = []; // массив с потребностью в товарах
	}

	setNeededToday(value) {
		this.goods.push(value);
	}
	
	// последний элемент массива
	getNeededToday() {
		return this.goods[this.goods.length - 1];
	}

	getNeededTotal() {
		return this.goods;
	}

	// сумма потребностей в товарах
	getAllNeeded() {
		this.summNeeded = this.goods.reduce(function(sum, current) {
			return sum + current;
		}, 0); // 0 - initialValue - это изначальное значение
		return this.summNeeded;
	}
}

//самый сложный класс посредник
class Middleman {
	constructor() {
		this.DELIVERY = 100;
		this.deliverArray = [];
	}

	takeData(manufacturerObject, consumerObject) {
		this.manufacturerObject = manufacturerObject;
		this.consumerObject = consumerObject;
	}

	// заполняю массив доставки товаров
	setDeliverToday() {
		var deliverToday = this.consumerObject.getNeededToday();

		if (deliverToday >= this.manufacturerObject.getProducedToday()) {
			deliverToday = this.manufacturerObject.getProducedToday();
		}

		if (deliverToday > this.DELIVERY) {
			deliverToday = this.DELIVERY;
		}

		this.deliverArray.push(deliverToday);
	}

	setEfficiency(day) {
		var efficiency,
		deliverTotal = 0;

		// доставка по дням
		for (let i = 0; i < day; i++) {
			deliverTotal += this.deliverArray[i];
		}

		// кпд
		efficiency = deliverTotal / (day * this.DELIVERY) * 100;
		return efficiency;
	}

	// счетчик доставленных за 3 дня товаров через метод slice() для отчета
	setCountThreeDay(day) {
		this.goodsThreeDay = this.deliverArray.slice(day - 3, day);

		this.summThreeDay = this.goodsThreeDay.reduce(function(sum, current) {
			return sum + current;
		}, 0); // 0 - initialValue - это изначальное значение

		return this.summThreeDay;
	}

	getDeliverToday() {
		return this.deliverArray[this.deliverArray.length - 1];
	}

	getDeliverTotal() {
		return this.deliverArray;
	}

	getEfficiency() {
		return summEfficiency;
	}
}


class Report {
	constructor() {

	}

	setReport(manufacturerObject, consumerObject, middlemanObject) {
		this.manufacturerObject = manufacturerObject;
		this.consumerObject = consumerObject;
		this.middlemanObject = middlemanObject;
	}

	getReport() {
		this.allProduced = this.manufacturerObject.getAllProduced();
		this.allNeeded = this.consumerObject.getAllNeeded();
		this.lastDeliver = this.middlemanObject.getDeliverToday();
		this.threeDayProduced = this.manufacturerObject.setCountThreeDay(3);
		this.threeDayDelivered = this.middlemanObject.setCountThreeDay(3);
		this.efficiencyMiddleman = this.middlemanObject.setEfficiency(10);
	}

	showResult() {
		// Количество товара у производителя:
		$('.all-produced').text(this.allProduced);

		// Количество необходимого потребителю товара:
		$('.all-needed').text(this.allNeeded);

		// Количество доставленного товара за последний день:
		$('.last-deliver').text(this.lastDeliver);

		// Количество произведенного товара за последние 3 дня:
		$('.three-produced').text(this.threeDayProduced);

		// Количество доставленного товара за последние 3 дня:
		$('.three-delivered').text(this.threeDayDelivered);

		// КПД посредника:
		$('.efficiency-middleman').text(this.efficiencyMiddleman);
	}
}

// генерирует случайные числа
function getRandom(min, max) {
	return Math.floor(min + Math.random() * (max + 1 - min));
};

// получаем данные о товарах и записываем их в экземпляры объектов
function setData() {
	var manufacturer = new Manufacturer(),
	consumer = new Consumer(),
	middleman = new Middleman(),
	report = new Report();

	middleman.takeData(manufacturer, consumer);
	report.setReport(manufacturer, consumer, middleman);

	for (let day = 1; day <= 10; day++) {
		// нижняя и верхняя граница производителя, должны быть свойствами производителя, может аргументами
		manufacturer.setProducedToday(getRandom(manufacturer.minimum, manufacturer.maximum));
		consumer.setNeededToday(getRandom(consumer.minimum, consumer.maximum));
		middleman.setDeliverToday(); // посредник получает товары от производителя
	}

	// формирует отчет
	report.getReport()
	// метод выводит на экран результаты
	report.showResult();

	// просто для контроля корректности работы программы!!!
	console.log("Произведено товаров за 10 дней:");
	console.log(manufacturer.getProducedTotal());
	console.log("Сумма товаров за последние 3 дня:");
	console.log(manufacturer.setCountThreeDay(3));
	console.log("Произведено за 3 дня:");
	console.log(manufacturer.goodsThreeDay); // просто получил значение из объекта

	console.log("Потребность в товарах за 10 дней:");
	console.log(consumer.getNeededTotal());
	
	console.log("Сумма доставленных товаров за последние 3 дня:");
	console.log(middleman.setCountThreeDay(3));
	console.log("Доставлено за 3 дня:");
	console.log(middleman.goodsThreeDay);
	console.log("Объект Посредник:");
	console.log(middleman);

	console.log("КПД Посредника:");
	console.log(middleman.setEfficiency(10));
	
	console.log("Класс Отчет:");
	console.log(report);
}