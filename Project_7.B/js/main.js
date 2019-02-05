$(document).ready(function () {

});

/*
Существует Товар, Производитель Товара, Потребитель Товара и Посредник,
между Производителем и Потребителем Товара.
Каждый день Производитель Товара создаёт 50-150 Шт. Товара.
Каждый день у Потребителя возникает необходимость в 70-120 Шт. Товара.
Посредник за один день может доставить Максимум 100 Шт. Товара.
Необходимо смоделировать Движение Товара за 10 дней и вывести в табличной форме результаты.
Колво Товара у Производителя.
Колво Необходимого Потребителю Товара.
Колво доставленного Товара за День.
Колво произведенного товара за последние 3 дня.
Колво доставленного товара за последние 3 дня.
КПД Посредника.
Любой Объект должен быть Экземпляром Класса.
Чтение и модификация свойств Объектов извне должны быть реализованы через Методы.
*/


// !!!КЛАСС ГЕНЕРАТОР СЛУЧАНЫХ ЧИСЕЛ!!!
function Generetor() {

	var randomNumber;
	// для доступа внутренних/локальных/приватных методов
	var self = this;

	this.setGenerateRandomNumber = function(min, max) {
		randomNumber = Math.floor(min + Math.random() * (max + 1 - min));
		return randomNumber;
	};

	this.getGenerateRandomNumber = function() {
		return randomNumber;
	};
};


// !!!КЛАСС ПРОИЗВОДИТЕЛЬ / ПРОИЗВОДСТВО!!!
function Manufacturer() {

	var goodsProducedToday = 0,	// количество произведённых товаров в конкретный день
	goodsProducedTotal = 0;	// общее количество произведённых товаров
	
	// получить количество произведённого товара сегодня
	this.getCountGoodsProducedToday = function() {
		var generetor = new Generetor();
		generetor.setGenerateRandomNumber(50, 150);
		goodsProducedToday = generetor.getGenerateRandomNumber();
		return goodsProducedToday;
	};
	
	// получить количество произведённого товара за всё время
	this.getCountGoodsProducedTotal = function() {
		goodsProducedTotal += goodsProducedToday;
		return goodsProducedTotal;
	};
};


// !!!КЛАСС ПОТРЕБИТЕЛЬ!!!
function Consumer() {
	
	var goodsNeedToday = 0,	// счетчик необходимых товаров сегодня
	goodsNeedTotal = 0;	// счетчик необходимых товаров всего
	
	// получить количество необходимого товара сегодня
	this.getCountGoodsNeedToday = function() {
		var generetor = new Generetor();
		generetor.setGenerateRandomNumber(70, 120);
		goodsNeedToday = generetor.getGenerateRandomNumber();
		return goodsNeedToday;
	};

	// получить количество необходимого товара за всё время
	this.getCountGoodsNeedTotal = function() {
		goodsNeedTotal += goodsNeedToday;
		return goodsNeedTotal;
	};
};

/*
var newConsumer = new Consumer();
console.log(newConsumer.getCountGoodsNeedToday());
console.log(newConsumer.getCountGoodsNeedTotal());
*/


// !!!КЛАСС ПОСРЕДНИК!!!
function Middleman() {

	const MAXIMUMDELIVER = 100;

	var goodsDeliverToday = 0,	// счетчик необходимых товаров сегодня
	goodsDeliverTotal = 0,	// счетчик необходимых товаров всего
	KPD = 0, 
	SummKPD = 0;

	// получить количество доставленных товаров за сегодня
	this.getCountGoodsDeliverToday = function(_goodsProducedToday, _goodsNeedToday) {

		// если дневная потребность Меньше Произведённого за день
		if (_goodsNeedToday < _goodsProducedToday) {

			// если дневная потребность Меньше Максимально возможного для ДОставки
			if (_goodsNeedToday < MAXIMUMDELIVER)	{

				// доставим товара, сколько нужно в этот день
				goodsDeliverToday = _goodsNeedToday;
				// 100% КПД, сколько нужно, столько и доставили
				KPD = 100;
			}

			// если дневная потребность БОЛЬШЕ Максимально возможного для ДОставки (100)
			else {
				
				// доставим ТОвару, сколько Максимально сможем (100 штук)
				goodsDeliverToday = MAXIMUMDELIVER;
				KPD = 100 * (MAXIMUMDELIVER / _goodsNeedToday);
			}
		}

		// если дневная потребность БОЛЬШЕ Произведённого за день
		else	{
			// если Произведённое за День количество товара меньше Максимально возможного для доставки
			if (_goodsProducedToday < MAXIMUMDELIVER)	{														
				// доставим ТОвару, сколько Сегодня произведено
				goodsDeliverToday = _goodsProducedToday;
				KPD = 100;	// 100% КПД, сколько нужно, столько и доставили
			}

			// если Произведённое за День количество товара БОЛЬШЕ Максимально возможного для ДОставки
			else {
				// доставим ТОвару, сколько Максимально сможем (100 штук)
				goodsDeliverToday = MAXIMUMDELIVER;
				KPD = 100 * (MAXIMUMDELIVER / _goodsProducedToday);
			}
		}

		SummKPD = SummKPD + KPD;	// здесь наращивается КПД, чтобы потом посчитать среднее
		return goodsDeliverToday;
	};
	
	// получить КПД Посредника
	this.getKPD = function()	{
		return SummKPD;
	};

	// получить количество доставленных товаров за всё время
	this.getCountGoodsDeliverTotal = function() {
		goodsDeliverTotal = goodsDeliverTotal + goodsDeliverToday;
		return goodsDeliverTotal;
	};
};


// !!!КЛАСС ОТЧЕТ!!!
function Report() {
	var consumer = new Consumer(),
	manufacturer = new Manufacturer(),
	middleman = new Middleman();
	
	var Days = 10,	// количество Дней Для формирования отчёта
	goodsProducedToday,	// количество произведённых за день товаров
	goodsProducedTotal,	// общее Количество произведённых товаров на день отчёта
	goodsNeedToday,		// количество ежедневной потребности в товарах
	goodsNeedTotal,		// количество общей потребности в товарах за период
	goodsDeliverToday,	// количество товаров доставленных за сегодняшний день
	goodsDeliverTotal,	// количество доставленных товаров на день отчёта
	
	KPDMiddleman,	// КПД посредника
	goodsProducedThreeDay = 0,	// количество произведённого товара за последние 3 Дня
	goodsDeliverThreeDay = 0;	// количество доставленного товара за последние 3 Дня
		
	for (let i = 1; i <= Days; i++) {
		goodsProducedToday = manufacturer.getCountGoodsProducedToday();
		goodsProducedTotal = manufacturer.getCountGoodsProducedTotal();

		goodsNeedToday = consumer.getCountGoodsNeedToday();
		goodsNeedTotal = consumer.getCountGoodsNeedTotal();

		goodsDeliverToday = middleman.getCountGoodsDeliverToday(goodsProducedToday, goodsNeedToday);
		goodsDeliverTotal = middleman.getCountGoodsDeliverTotal();

		KPDMiddleman = middleman.getKPD() / i;	// ищем среднее Арифметическое из всех КПД
			
		if(i > Days - 3 && i <= Days) {
			goodsProducedThreeDay += goodsProducedToday;
			goodsDeliverThreeDay += goodsDeliverToday;
		}

		// день: i
		// количество Произведённого за i-й день товара:  goodsProducedToday
		// количество Необходимого в i-й день товара: goodsNeedToday
		// количество Доставленного за i-й день товара: goodsDeliverToday

		// общее Количество Произведённого за i дня товара: goodsProducedTotal
		// общее Количество Необходимого за i дня товара: goodsNeedTotal
		// общее Количество Доставленного за i дня товара: goodsDeliverTotal
		
		// коэффициент Полезного Действия Посредника: KPDMiddleman

		console.log(`ДЕНЬ: ${i}`);
		console.log(`Количество Произведённого за ${i}-й день товара: ${goodsProducedToday}`);
		console.log(`Количество Доставленного за ${i}-й день товара: ${goodsDeliverToday}`);
		console.log(`Количество Необходимого в ${i}-й день товара: ${goodsNeedToday}`);
		console.log(`Общее Количество Произведённого за ${i} дня товара: ${goodsProducedTotal}`);
		console.log(`Общее Количество Необходимого за ${i} дня товара: ${goodsNeedTotal}`);
		console.log(`Общее Количество Доставленного за ${i} дня товара: ${goodsDeliverTotal}`);
		console.log(`Коэффициент Полезного Действия Посредника: ${KPDMiddleman}`);

		if (i == Days) {

		// ИТОГОВАЯ ТАБЛИЦА!!!
		// Количество Произведённого за i-й день товара: goodsProducedToday
		// Количество Необходимого в i-й день товара: goodsNeedToday
		// Количество Доставленного за i-й день товара: goodsDeliverToday
		// Кол-во Произведённого товара за последние 3 дня: goodsProducedThreeDay
		// Кол-во Доставленного товара за последние 3 дня: goodsDeliverThreeDay
		// Коэффициент Полезного Действия Посредника: KPDMiddleman

		console.log(`!!!ИТОГОВАЯ ТАБЛИЦА!!!`);
		console.log(`Количество Произведённого за ${i}-й день товара: ${goodsProducedToday}`);
		console.log(`Количество Необходимого в ${i}-й день товара:  ${goodsNeedToday}`);
		console.log(`Количество Доставленного за i-й день товара: ${goodsDeliverToday}`);
		console.log(`Кол-во Произведённого товара за последние 3 дня: ${goodsProducedThreeDay}`);
		console.log(`Кол-во Доставленного товара за последние 3 дня: ${goodsDeliverThreeDay}`);
		console.log(`Коэффициент Полезного Действия Посредника: ${KPDMiddleman}`);
		}
	}
	return;
}

Report();