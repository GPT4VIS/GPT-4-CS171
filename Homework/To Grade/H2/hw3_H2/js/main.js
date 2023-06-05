

// DATASETS

// Global variable with 1198 pizza deliveries
// console.log(deliveryData);

// Global variable with 200 customer feedbacks
// console.log(feedbackData);

// FILTER DATA, THEN DISPLAY SUMMARY OF DATA & BAR CHART

createVisualization();

function createVisualization() {

// Retrieve select values
    let chooseArea = document.getElementById("choose-area").value;
    let chooseOrder = document.getElementById("choose-order").value;

//Apply values to filter by area and order
    let deliveryArea = chooseArea == "all"
        ? deliveryData
        : deliveryData.filter(a => a.area === chooseArea);

    let deliveryAreaType = chooseOrder === "all"
        ? deliveryArea
        : deliveryArea.filter(a => a.order_type == chooseOrder)

// join IDs of feedback data to delivered data
    let feedbackFilter = feedbackData.filter(a => deliveryAreaType.some(b => b.delivery_id == a.delivery_id));

//  get values from data
    let delivery = deliveryAreaType.length;
    let pizzas = 0;
    let meantime = 0;
    let sales = 0;

    let feedback = feedbackFilter.length;
    console.log(feedback)
    let low = 0;
    let medium = 0;
    let high = 0;

    for(let i = 0; i < deliveryAreaType.length; i++)
    {
        pizzas += deliveryAreaType[i].count;
        meantime += deliveryAreaType[i].delivery_time;
        sales += deliveryAreaType[i].price
    }
    meantime = meantime / delivery;

    for(let j = 0; j < feedback; j++) {
        if (feedbackFilter[j].quality == "high") {
            high++;
        } else if (feedbackFilter[j].quality == "low") {
            low++;
        } else {
            medium++;
        }
    }

// Display delivery
    document.getElementById("tot-delivery").innerText = "Total number of pizza deliveries: " + delivery.toString();
    document.getElementById("tot-pizzas").innerText = "Total number of delivered pizzas: " + pizzas.toString();
    document.getElementById("avgtime").innerText = "Average delivery time: " + meantime.toString();
    document.getElementById("tot-sales").innerText = "Total sales in USD: " + sales.toString();

    // Display feedback
    document.getElementById("tot-feedback").innerText = "Total number of feedback entries: " + feedback.toString();
    document.getElementById("tot-low").innerText = "Number of low quality: " + low.toString();
    document.getElementById("tot-medium").innerText = "Number of medium quality: " + medium.toString();
    document.getElementById("tot-high").innerText = "Number of high quality: " + high.toString();

    renderBarChart(deliveryAreaType)
}
