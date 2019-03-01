d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json").then(function(data){
  dataset = data.monthlyVariance;
  const baseTemperature = data.baseTemperature

  const monthNames = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];

  const w = 1800;
  const h = 600;
  const legendBoxHeight = 40;
  const padding = 60;
  const minYear = d3.min(dataset, (d) => d.year)
  const maxYear = d3.max(dataset, (d) => d.year)
  const minTemp = d3.min(dataset, (d) => d.variance)+baseTemperature;
  const maxTemp = d3.max(dataset, (d) => d.variance)+baseTemperature;
  const cellWidth = (w-2*padding)/(maxYear-minYear+1);
  const cellHeight = (h-2*padding)/12;

  const colorList = ["#a50026","#d73027","#f46d43","#fdae61","#fee090","#ffffbf","#e0f3f8","#abd9e9","#74add1","#4575b4","#313695"].reverse();
  var colors = d3.scaleQuantize()
    .domain([minTemp,maxTemp])
    .range(colorList);
  var colorBreaks = d3.range(1,colorList.length)
                      .map((i)=>i*(maxTemp-minTemp)/colorList.length+minTemp)

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
  const svgLegend = d3.select("#legend")
                .append("svg")
                .attr("width",legendBoxHeight*colorList.length)
                // .attr("height",legendBoxHeight*2)

  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(yScale).tickFormat((d)=>monthNames[d-1]);

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
      .attr("data-temp",(d)=>baseTemperature+d.variance)
      .attr("fill",(d)=>colors(baseTemperature+d.variance))
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
        d3.select("#tooltip")
          .select("#data-temp")
  				.text(Math.round((d.variance+baseTemperature)*100)/100);
				 d3.select("#tooltip").classed("hidden", false);
		   })
		   .on("mouseout", function() {
				d3.select("#tooltip").classed("hidden", true);
		   })


   legendRects = svgLegend.selectAll("rect")
             .data(colorList)
             .enter()
             .append("rect")
             .attr("class","legend-rect")
             .attr("x",(d,i)=>legendBoxHeight *i)
             // .attr("y",h)
             .attr('width',legendBoxHeight )
             .attr('height',legendBoxHeight )
             .attr("fill",(d)=>d)
   legendTexts = svgLegend.selectAll("text")
             .data(colorBreaks)
             .enter()
             .append("text")
              .attr("class","legend-text")
             .attr("x",(d,i)=>legendBoxHeight *(i+1)-10)
             .attr("y",legendBoxHeight*1.5)
             .text((d)=>Number.parseFloat(d).toFixed(1))

});
