d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json").then(function(data){
  dataset = data.monthlyVariance;
  const baseTemperature = data.baseTemperature

  const monthNames = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];

  const w = 1800;
  const h = 600;
  const padding = 60;
  const minYear = d3.min(dataset, (d) => d.year)
  const maxYear = d3.max(dataset, (d) => d.year)
  const cellWidth = (w-2*padding)/(maxYear-minYear+1);
  const cellHeight = (h-2*padding)/12;
  console.log(cellWidth,cellHeight);
  var xScale = d3.scaleLinear()
                  .domain([minYear, maxYear])
                  .range([padding, w-padding]);
  var yScale = d3.scaleLinear()
                  .domain([d3.max(dataset, (d) =>d.month)+0.5, d3.min(dataset, (d) =>d.month)-0.5])
                  .range([h - 2*padding,0]);
  const svg = d3.select("#container")
                .append("svg")
                .attr("width",w)
                .attr("height",h)

  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(yScale);

  svg.append("g")
     .attr("id","x-axis")
     .attr("transform", "translate(0,"+ (h-padding) + ")")
     .call(xAxis);

  svg.append("g")
     .attr("id","y-axis")
     .attr("transform", "translate(" +padding + " ,"+padding+")")
     .call(yAxis);

  dots = svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class","cell")

  dots.attr("x",(d)=>xScale(d.year))
      .attr("y",(d)=>yScale(d.month+1))
      .attr('width',cellWidth)
      .attr('height',cellHeight)
      .attr("data-month",(d)=>d.month-1)
      .attr("data-year",(d)=>d.year)
      .on("mouseover", function(d) {
				var xPosition = parseFloat(d3.select(this).attr("x")) ;
				var yPosition = parseFloat(d3.select(this).attr("y")) ;
        var year = d3.select(this).attr("data-year");
				d3.select("#tooltip")
					.style("left", (d3.event.pageX +10)+ "px")
					.style("top", (d3.event.pageY - 30) + "px")
          .attr("data-year",year)
					.select("#data-year")
					.text(year);

        d3.select("#tooltip")
          .select("#data-month")
  				.text(monthNames[d.month-1]);
        // d3.select("#tooltip")
        //   .select("#data-name")
  			// 	.text(d.Name);
				 d3.select("#tooltip").classed("hidden", false);
		   })
		   .on("mouseout", function() {
				d3.select("#tooltip").classed("hidden", true);
		   })


});
