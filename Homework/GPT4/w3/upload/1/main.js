// DATASETS

// Global variable with 1198 pizza deliveries
// console.log(deliveryData);

// Global variable with 200 customer feedbacks
// console.log(feedbackData.length);


// FILTER DATA, THEN DISPLAY SUMMARY OF DATA & BAR CHART

createVisualization();

function createVisualization() {

	/* ************************************************************
	 *
	 * ADD YOUR CODE HERE
	 * (accordingly to the instructions in the HW2 assignment)
	 *
	 * 1) Filter data
	 * 2) Display key figures
	 * 3) Display bar chart
	 * 4) React to user input and start with (1)
	 *
	 * ************************************************************/
	displayKeyFigures();
	renderBarChart(deliveryData);
}

function displayKeyFigures() {
	const numOfDeliveries = deliveryData.length;
	const numOfDeliveredPizzas = deliveryData.reduce((acc, cur) => acc + cur.count, 0);
	const totalDeliveryTime = deliveryData.reduce((acc, cur) => acc + cur.delivery_time, 0);
	const avgDeliveryTime = totalDeliveryTime / numOfDeliveries;
	const totalSales = deliveryData.reduce((acc, cur) => acc + cur.price, 0);
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