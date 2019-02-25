d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json").then(function(data){
  dataset = data["data"];
  const w = 800;
  const h = 600;
  const padding = 60;
  const color = '#e4aa7c';

  var xScale = d3.scaleTime()
                  .domain([minDate, maxDate])
                  .range([padding, w-padding]);
  var yScale = d3.scaleLinear()
                  .domain([0, d3.max(dataset, (d) => d[Time])])
                  .range([h - 2*padding,0]);
  const svg = d3.select("#container")
                .append("svg")
                .attr("width",w)
                .attr("height",h)

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisRight(yScale);

  // svg.append("g")
  //    .attr("id","x-axis")
  //    .attr("transform", "translate(0, " + (h-padding) + ")")
  //    .call(xAxis);
  //
  // svg.append("g")
  //    .attr("id","y-axis")
  //    .attr("transform", "translate(" +(w-padding) + " ,"+padding+")")
  //    .call(yAxis);
  //
  // bars = svg.selectAll("rect")
  //           .data(dataset)
  //           .enter()
  //           .append("rect")
  //           .attr("class","bar")
  //
  // bars.attr("x",(d,i)=>padding+i*(w-padding*2)/dataset.length)
  //     .attr("y",(d)=>padding+yScale(d[1]))
  //     .attr("width",(w-padding*2)/dataset.length)
  //     .attr("height",(d)=>h-2*padding-yScale(d[1]))
  //     .attr("fill", color)
  //     .attr("data-date",(d)=>d[0])
  //     .attr("data-gdp",(d)=>d[1])
  //     .on("mouseover", function(d) {
	// 			var xPosition = parseFloat(d3.select(this).attr("x")) ;
	// 			var yPosition = parseFloat(d3.select(this).attr("y")) / 2 + h/ 2;
	// 			d3.select("#tooltip")
	// 				.style("left", xPosition + "px")
	// 				.style("top", yPosition + "px")
  //         .attr("data-date",d[0])
	// 				.select("#data-date")
	// 				.text(d[0])
  //       d3.select("#tooltip")
  //         .attr("data-gdp",d[1])
  //         .select("#data-gdp")
  // 				.text(d[1]);
	// 			d3.select("#tooltip").classed("hidden", false);
	// 	   })
	// 	   .on("mouseout", function() {
	// 			d3.select("#tooltip").classed("hidden", true);
	// 	   })

  console.log(dataset[0])
});
