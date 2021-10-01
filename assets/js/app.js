// @TODO: YOUR CODE HERE!

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
    top: 60,
    right: 60,
    bottom: 100,
    left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


// Load data from data.csv
d3.csv("assets/data/data.csv").then(function (data) {

    // Print the data
    console.log(data);

    // Step 1: Parse Data/Cast as numbers
    // ==============================
    data.forEach(function (data) {
        data.poverty = +data.poverty;
        data.healthcare = +data.healthcare;
        data.age = +data.age;
        data.obesity = +data.obesity;
        data.income = +data.income;
        data.smokes = +data.smokes;
        data.stateabbr = data.abbr;
    });



    // Step 2: Create scale functions
    // ==============================
    var xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.poverty)).nice()
        .range([0, chartWidth])

    var yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.healthcare)).nice()
        .range([chartHeight, 0])

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xScale);
    var leftAxis = d3.axisLeft(yScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
        .classed("axis", true)
        .call(leftAxis);

    chartGroup.append("g")
        .classed("axis", true)
        .attr("transform", "translate(0, " + chartHeight + ")")
        .call(bottomAxis);

    // Add xaxis labels to the chart
    // ==============================
    var xlabelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);

    var povertyLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "poverty") // value to grab for event listener
        .classed("active", true)
        .text("In Poverty (%)");

    var ageLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "age") // value to grab for event listener
        .classed("inactive", true)
        .text("Age (Median)");

    var incomeLabel = xlabelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "income") // value to grab for event listener
        .classed("inactive", true)
        .text("Household income (median)");



    // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => xScale(d.poverty))
        .attr("cy", d => yScale(d.healthcare))
        .attr("r", "15")
        .attr("fill", "lightseagreen")
        .attr("opacity", ".5")
        ;

    // add state labels to circles
    var circlestext = chartGroup.selectAll(".st_label")
        .data(data)
        .enter()
        .append("text")
        .attr("x", d => xScale(d.poverty))
        .attr("y", d => yScale(d.healthcare))
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "central")
        .attr("fill", "azure")
        .text(d => d.stateabbr);

    //     const label = svg.append("g")
    //   .attr("font-family", "Yanone Kaffeesatz")
    //   .attr("font-weight", 700)
    //   .attr("text-anchor", "middle")
    // .selectAll("text")
    // .data(data)
    // .join("text")
    //   .attr("id", "isoCode")
    //   .attr("opacity", 0)
    //   .attr("dy", "0.35em")
    //   .attr("x", d => xScale(d.poverty))
    //   .attr("y", d => yScale(d.healthcare))
    // //   .attr("font-size", d => r(d.population)*1.5)
    // //   .attr("fill", d => color(d.population))
    //   .text(d => d.stateabbr);


}).catch(function (error) {
    console.log(error);
});

