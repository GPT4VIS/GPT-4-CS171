

// DATASETS

// Global variable with 1198 pizza deliveries
// Number of pizza deliveries
// Number of all delivered pizzas (count)
// Average delivery time
// Total sales in USD
// Number of all feedback entries
// Number of feedback entries per quality category: low, medium, high

// Global variable with 200 customer feedbacks
// console.log("feedbackData.length", feedbackData.data);

// FILTER DATA, THEN DISPLAY SUMMARY OF DATA & BAR CHART

createVisualization();
function createVisualization() {
    let selectAreaBox = document.getElementById("area-category");
    let selectedArea = selectAreaBox.options[selectAreaBox.selectedIndex].value;
    let selectOrderTypeBox = document.getElementById("order-type-category");
    let selectedOrderType = selectOrderTypeBox.options[selectOrderTypeBox.selectedIndex].value;
    let filteredDeliveryData = deliveryData
    if (selectedArea !== "All" && selectedOrderType !== "all"){
        filteredDeliveryData = filteredDeliveryData.filter(delivery => delivery.area == selectedArea && delivery.order_type == selectedOrderType)
    }
    else if (selectedOrderType !== "all"){
        filteredDeliveryData = filteredDeliveryData.filter(delivery => delivery.order_type == selectedOrderType)
    }
    else if (selectedArea !== "All"){
        filteredDeliveryData = filteredDeliveryData.filter(delivery => delivery.area == selectedArea)
    }
    let s = new Set()
    filteredDeliveryData.forEach(entry => s.add(entry.delivery_id))
    let filteredFeedbackData = feedbackData.filter(feedback => s.has(feedback.delivery_id))
    renderBarChart(filteredDeliveryData)
    let total_delivered_pizzas = 0
    let total_delivery_time = 0
    let total_sales = 0
    filteredDeliveryData.forEach(function(delivery){
        total_delivered_pizzas += delivery.count;
        total_delivery_time += delivery.delivery_time;
        total_sales += delivery.price;
    });
    let low = 0
    let medium = 0
    let high = 0
    filteredFeedbackData.forEach(function(feedback){
        if(feedback.quality == "low"){
            low += 1
        } else if (feedback.quality == "medium") {
            medium += 1
        } else {
            high += 1
        }
    })
    let res = "<table>"
        + "<tr>"+ "<td>"+ "Number of pizza deliveries " +"</td>"+ "<td>"+ filteredDeliveryData.length +"</td>"
        + "<tr>"+ "<td>"+ "Number of all delivered pizzas (count) " +"</td>"+ "<td>"+ total_delivered_pizzas +"</td>"
        + "<tr>"+ "<td>"+ "Average delivery time " +"</td>"+ "<td>"+ (total_delivery_time/filteredDeliveryData.length).toFixed(3) +" minutes </td>"
        + "<tr>"+ "<td>"+ "Total sales in USD " +"</td>"+ "<td> $"+ parseInt(total_sales) +"</td>"
        + "<tr>"+ "<td>"+ "Number of all feedback entries " +"</td>"+ "<td>"+ filteredFeedbackData.length +"</td>"
        + "<tr>"+ "<td>"+ "Number of all feedback entries of low quality "+"</td>"+ "<td>" + low +"</td>"
        + "<tr>"+ "<td>"+ "Number of all feedback entries of medium quality "+"</td>"+ "<td>" + medium +"</td>"
        + "<tr>"+ "<td>"+ "Number of all feedback entries of high quality "+"</td>"+ "<td>" + high + "</td>"  + "</tr>" + "</table>"
    ;
    document.getElementById("stats").innerHTML = res
}