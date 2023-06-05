// DATASETS

// Global variable with 1198 pizza deliveries
// console.log(deliveryData);

// Global variable with 200 customer feedbacks
// console.log(feedbackData.length);

// FILTER DATA, THEN DISPLAY SUMMARY OF DATA & BAR CHART

createVisualization();

function createVisualization() {
	const filteredData = filterData();
	const filteredFeedbackData = feedbackData.filter((feedback) =>
		filteredData.some((delivery) => delivery.delivery_id === feedback.delivery_id)
	);
	displayKeyFigures(filteredData, filteredFeedbackData);
	renderBarChart(filteredData);
}

function displayKeyFigures(data, feedbackData) {
	const numOfDeliveries = data.length;
	const numOfDeliveredPizzas = data.reduce((acc, cur) => acc + cur.count, 0);
	const totalDeliveryTime = data.reduce((acc, cur) => acc + cur.delivery_time, 0);
	const avgDeliveryTime = totalDeliveryTime / numOfDeliveries;
	const totalSales = data.reduce((acc, cur) => acc + cur.price, 0);
	const numOfFeedbackEntries = feedbackData.length;
	const feedbackCounts = feedbackData.reduce((acc, cur) => {
		acc[cur.quality] = acc[cur.quality] ? acc[cur.quality] + 1 : 1;
		return acc;
	}, {});

	document.getElementById('total-deliveries').innerText = `Total Deliveries: ${numOfDeliveries}`;
	document.getElementById('total-pizzas').innerText = `Total Delivered Pizzas: ${numOfDeliveredPizzas}`;
	document.getElementById('avg-delivery-time').innerText = `Average Delivery Time: ${avgDeliveryTime.toFixed(2)} minutes`;
	document.getElementById('total-sales').innerText = `Total Sales: $${totalSales.toFixed(2)}`;
	document.getElementById('feedback-entries').innerText = `Total Feedback Entries: ${numOfFeedbackEntries}`;
	document.getElementById('feedback-low').innerText = `Low Quality Feedback Entries: ${feedbackCounts.low || 0}`;
	document.getElementById('feedback-medium').innerText = `Medium Quality Feedback Entries: ${feedbackCounts.medium || 0}`;
	document.getElementById('feedback-high').innerText = `High Quality Feedback Entries: ${feedbackCounts.high || 0}`;
}

function filterData() {
	const areaSelect = document.getElementById("area-select");
	const selectedArea = areaSelect.value;

	const orderTypeSelect = document.getElementById("order-type-select");
	const selectedOrderType = orderTypeSelect.value;

	const filteredData = deliveryData.filter((delivery) => {
		const areaFilter = selectedArea === "All" || delivery.area === selectedArea;
		const orderTypeFilter =
			selectedOrderType === "All" || delivery.order_type === selectedOrderType;
		return areaFilter && orderTypeFilter;
	});

	return filteredData;
}