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
	};

	this.getGenerateRandomNumber = function() {
		return randomNumber;
	};

}

/*
	var generetor = new Generetor();
	generetor.setGenerateRandomNumber(50, 150);
	alert(generetor.getGenerateRandomNumber());
*/
// !!!КЛАСС ГЕНЕРАТОР СЛУЧАНЫХ ЧИСЕЛ!!!



// !!!КЛАСС ПРОИЗВОДИТЕЛЬ / ПРОИЗВОДСТВО!!!
function Manufacture() {

	var goodsProducedToday = 0,	// количество произведённых товаров в конкретный день
	goodsProducedTotal = 0,	// общее количество произведённых товаров
	goodsOnStock = 0; // количество товара на Складе, можно убрать, так как непонятно нужно ли это
	
	// для доступа к объекту из внутреннего метода
	var self = this;
	
	// получить количество произведённого товара сегодня
	function countGoodsProducedToday() {
		var generetor = new Generetor();
		generetor.setGenerateRandomNumber(50, 150);
		goodsProducedToday = generetor.getGenerateRandomNumber();
	}
	countGoodsProducedToday();
	
	// получить количество произведённого товара за всё время
	function countGoodsProducedTotal() {
		goodsProducedTotal += goodsProducedToday;
		return goodsProducedTotal;
	}
	countGoodsProducedTotal();


	
	// ?????временное решение?????
	function getGoodsOnStock(_goodsProducedToday, _goodsDeliverToday) {

		if (_goodsProducedToday > _goodsDeliverToday) {
			goodsOnStock = _goodsProducedToday - _goodsDeliverToday;
		}

		else {
			goodsOnStock = 0;
		}

		return goodsOnStock;
	}



	// для получения доступа к методу из вне
	this.getGoodsProducedToday = function() {
		return goodsProducedToday;
	};

	this.getcountGoodsProducedTotal = function() {
		return goodsProducedTotal;
	};

};

/*
var newManufacture = new Manufacture();
console.log(newManufacture.getGoodsProducedToday());
console.log(newManufacture.getcountGoodsProducedTotal());
*/



// !!!КЛАСС ПОТРЕБИТЕЛЬ!!!
function Consumer() {
	
	var goodsNeedToday = 0,	// счетчик необходимых товаров сегодня
	goodsNeedTotal = 0;	// счетчик необходимых товаров всего
	
	// для доступа к объекту из внутреннего метода
	var self = this;

	// получить количество необходимого товара сегодня
	function countGoodsNeedToday() {
		var generetor = new Generetor();
		generetor.setGenerateRandomNumber(70, 120);
		goodsNeedToday = generetor.getGenerateRandomNumber();
	}
	countGoodsNeedToday();

	// получить количество необходимого товара за всё время
	function countGoodsNeedTotal() {
		goodsNeedTotal += goodsNeedToday;
	}
	countGoodsNeedTotal();

	this.getCountGoodsNeedToday = function() {
		return goodsNeedToday;
	};

	this.getCountGoodsNeedTotal = function() {
		return goodsNeedTotal;
	};

};

/*
var newConsumer = new Consumer();
console.log(newConsumer.getCountGoodsNeedToday());
console.log(newConsumer.getCountGoodsNeedTotal());
*/



// Класс Посредник
function Middleman() {

	// приватные свойства:
	const MAXIMUMDELIVER = 100;

	var goodsDeliverToday = 0,	// счетчик необходимых товаров сегодня
	goodsDeliverTotal = 0,	// счетчик необходимых товаров всего
	KPD = 0, 
	SummKPD = 0;

	
			
	// получить количество необходимого товара сегодня
	function getMaximumDeliverGoods() {
		return MAXIMUMDELIVER;
	}

	// получить количество доставленных товаров за сегодня
	function getCountGoodsDeliverToday(_goodsProducedToday, _goodsNeedToday) {

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
				KPD = 100*(MAXIMUMDELIVER / _goodsNeedToday);
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
	}
	
	// получить КПД Посредника
	function getKPD()	{
		return SummKPD;
	}

	// получить количество доставленных товаров за всё время
	function getCountGoodsDeliverTotal() {
		goodsDeliverTotal = goodsDeliverTotal + goodsDeliverToday;
		return goodsDeliverTotal;
	}

};



// Основная функция!!!
function main() {

	/*
	Manufacture manufacture;	// экземпляр класса Производитель
	Consumer consumer;	// экземпляр класса Производитель
	Middleman middleman;	// экземпляр класса Посредник
	*/

	var Dni = 10,	// количество Дней Для формирования отчёта
	goodsProducedToday,	// количество произведённых за день товаров
	goodsProducedTotal,	// общее Количество произведённых товаров на день отчёта
	goodsNeedToday,		// количество ежедневной потребности в товарах
	goodsNeedTotal,		// количество общей потребности в товарах за период
	goodsDeliverToday,	// количество товаров доставленных за сегодняшний день
	goodsDeliverTotal,	// количество доставленных товаров на день отчёта
	goodsOnStock,	// количество товаров на складе
	KPD_Middleman,	// КПД посредника
	goodsProduced_3_Day = 0,	// количество произведённого товара за последние 3 Дня
	goodsDeliver_3_Day = 0;	// количество доставленного товара за последние 3 Дня
		
	for (let i = 1; i <= Dni; i++) {
		goodsProducedToday = manufacture.getCountGoodsProducedToday();
		goodsProducedTotal = manufacture.getCountGoodsProducedTotal();
		goodsNeedToday = consumer.getCountGoodsNeedToday();
		goodsNeedTotal = consumer.getCountGoodsNeedTotal();
		goodsDeliverToday = middleman.getCountGoodsDeliverToday(goodsProducedToday, goodsNeedToday);
		goodsDeliverTotal = middleman.getCountGoodsDeliverTotal();
		goodsOnStock = manufacture.getGoodsOnStock(goodsProducedToday, goodsDeliverToday);	// удалить НАХРЕН!!!
		KPD_Middleman = middleman.getKPD() / i;	// ищем среднее Арифметическое из всех КПД
			
		if(i > Dni - 3 && i <= Dni) {
			goodsProduced_3_Day = goodsProduced_3_Day + goodsProducedToday;
			goodsDeliver_3_Day = goodsDeliver_3_Day + goodsDeliverToday;
		}
		// день: i
		// количество Произведённого за i-й день товара:  goodsProducedToday
		// количество Необходимого в i-й день товара: goodsNeedToday
		// количество Доставленного за i-й день товара: goodsDeliverToday
		// общее Количество Произведённого за i дня товара: goodsProducedTotal
		// общее Количество Необходимого за i дня товара: goodsNeedTotal
		// общее Количество Доставленного за i дня товара: goodsDeliverTotal
		// кол-во Товара на складе у Производителя i-й день: goodsOnStock
		// коэффициент Полезного Действия Посредника: KPD_Middleman
			
		// формирование Отчёта Итогового, который требуется по условиям задачи
		if (i == Dni) {
		// ИТОГОВАЯ ТАБЛИЦА!!!
		// Количество Произведённого за i-й день товара: goodsProducedToday
		// Количество Необходимого в i-й день товара: goodsNeedToday
		// Количество Доставленного за i-й день товара: goodsDeliverToday
		// Кол-во Произведённого товара за последние 3 дня: goodsProduced_3_Day
		// Кол-во Доставленного товара за последние 3 дня: goodsDeliver_3_Day
		// Коэффициент Полезного Действия Посредника: KPD_Middleman
		}
	}
	return 0;
} // завершение функции main