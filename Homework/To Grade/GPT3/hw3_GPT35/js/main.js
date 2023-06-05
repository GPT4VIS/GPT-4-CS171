// DATASETS

// Global variable with 1198 pizza deliveries
// console.log(deliveryData);

// Global variable with 200 customer feedbacks
// console.log(feedbackData.length);
const areaSelect = document.querySelector('#area-select-box');
const orderSelect = document.querySelector('#order-select-box');

let selectedArea = areaSelect.value;
let selectedOrder = orderSelect.value;

areaSelect.addEventListener('change', function (e) {
  selectedArea = e.currentTarget.value;
  createVisualization();
});

orderSelect.addEventListener('change', function (e) {
  selectedOrder = e.currentTarget.value;
  createVisualization();
});


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
  // Filter by area and order type
  let displayedData = deliveryData;
  if (selectedArea !== 'all') {
    displayedData = displayedData.filter(d => d.area === selectedArea);
  }
  if (selectedOrder !== 'all') {
    displayedData = displayedData.filter(d => d.order_type === selectedOrder);
  }

  // key figures calculations
  let deliveryN = displayedData.length;
  let pizzaN = 0;
  let avgDeliveryTime = 0;
  let totalSales = 0;
  let feedbackN = feedbackData.length;
  let lowQualityN = 0;
  let mediumQualityN = 0;
  let highQualityN = 0;

  for (let i = 0; i < deliveryN; i++) {
    const delivery = displayedData[i];
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
    const feedbackDeliveryId = feedback.delivery_id;
    const matchingDelivery = displayedData.find(d => d.delivery_id === feedbackDeliveryId);
    if (!matchingDelivery) continue;
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

  renderBarChart(displayedData);
}