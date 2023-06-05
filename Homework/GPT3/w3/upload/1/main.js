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
  const deliveryN = deliveryData.length;
  let pizzaN = 0;
  let avgDeliveryTime = 0;
  let totalSales = 0;
  const feedbackN = feedbackData.length;
  let lowQualityN = 0;
  let mediumQualityN = 0;
  let highQualityN = 0;

  for (let i = 0; i < deliveryN; i++) {
    const delivery = deliveryData[i];
    const count = delivery.count;
    const price = delivery.price;
    const deliveryTime = delivery.delivery_time;
    pizzaN += count;
    totalSales += count * price;
    avgDeliveryTime += deliveryTime;
  }
  avgDeliveryTime = Math.round(avgDeliveryTime / deliveryN);

  for (let j = 0; j < feedbackN; j++) {
    const feedback = feedbackData[j];
    switch (feedback.quality) {
      case 'low':
        lowQualityN++;
        break;
      case 'medium':
        mediumQualityN++;
        break;
      case 'high':
        highQualityN++;
        break;
    }
  }

  const pizzaDeliveriesEle = document.getElementById('pizza-deliveries');
  pizzaDeliveriesEle.innerText = deliveryN;
  const allPizzasEle = document.getElementById('all-pizzas');
  allPizzasEle.innerText = pizzaN;
  const avgDeliveryTimeEle = document.getElementById('avg-delivery-time');
  avgDeliveryTimeEle.innerText = avgDeliveryTime + ' min';
  const totalSalesEle = document.getElementById('total-sales');
  totalSalesEle.innerText = '$' + totalSales;
  const feedbackEntriesEle = document.getElementById('feedback-entries');
  feedbackEntriesEle.innerText = feedbackN;
  const lowQualityEle = document.getElementById('low-quality');
  lowQualityEle.innerText = lowQualityN;
  const mediumQualityEle = document.getElementById('medium-quality');
  mediumQualityEle.innerText = mediumQualityN;
  const highQualityEle = document.getElementById('high-quality');
  highQualityEle.innerText = highQualityN;

  renderBarChart(deliveryData);
}