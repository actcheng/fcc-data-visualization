d3.json("https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json").then(function(data){
  const margin = {top: 40, right:10, bottom:10, left:10}
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        color = d3.scaleOrdinal().range(["gold", "blue", "green", "yellow", "black", "grey", "darkgreen", "pink", "brown", "slateblue", "grey1", "orange"]);

  const svg = d3.select("#container")
                .append("svg")
                .attr("width",width)
                .attr("height",height)

  const treemap = d3.treemap().size([width, height]);

  const root = d3.hierarchy(data, (d) => d.children)
                 .sum((d) => d.value);

  const tree = treemap(root);

  const node = svg.selectAll("rect")
                 .data(tree.leaves())
                 .enter()
                 .append("rect")
                 .attr("class", "tile")
                 .attr("x", (d) => d.x0 + "px")
                 .attr("y", (d) => d.y0 + "px")
                 .attr("width", (d) => Math.max(0, d.x1 - d.x0 - 1) + "px")
                 .attr("height", (d) => Math.max(0, d.y1 - d.y0  - 1) + "px")
                 .attr("fill", (d) => color(d.parent.data.name))
                 .attr("data-name",(d)=>d.data.name)
                 .attr("data-category",(d)=>d.data.category)
                 .attr("data-value",(d)=>d.data.value)
                 // .text((d) => return d.data.name);


  // dots = svg.selectAll("rect")
  //           .data(dataset)
  //           .enter()
  //           .append("rect")
  //           .attr("class","cell")
  //
  // dots.attr("x",(d)=>xScale(d.year))
  //     .attr("y",(d)=>yScale(d.month+1))
  //     .attr('width',cellWidth)
  //     .attr('height',cellHeight)
  //     .attr("data-month",(d)=>d.month-1)
  //     .attr("data-year",(d)=>d.year)
  //     .attr("data-temp",(d)=>baseTemperature+d.variance)
  //     .attr("fill",(d)=>colors(baseTemperature+d.variance))
  //     .on("mouseover", function(d) {
	// 			var xPosition = parseFloat(d3.select(this).attr("x")) ;
	// 			var yPosition = parseFloat(d3.select(this).attr("y")) ;
  //       var year = d3.select(this).attr("data-year");
	// 			d3.select("#tooltip")
	// 				.style("left", (d3.event.pageX +10)+ "px")
	// 				.style("top", (d3.event.pageY - 30) + "px")
  //         .attr("data-year",year)
	// 				.select("#data-year")
	// 				.text(year);
  //
  //       d3.select("#tooltip")
  //         .select("#data-month")
  // 				.text(monthNames[d.month-1]);
  //       d3.select("#tooltip")
  //         .select("#data-temp")
  // 				.text(Math.round((d.variance+baseTemperature)*100)/100);
	// 			 d3.select("#tooltip").classed("hidden", false);
	// 	   })
	// 	   .on("mouseout", function() {
	// 			d3.select("#tooltip").classed("hidden", true);
	// 	   })
  //
  //
  //  legendRects = svgLegend.selectAll("rect")
  //            .data(colorList)
  //            .enter()
  //            .append("rect")
  //            .attr("class","legend-rect")
  //            .attr("x",(d,i)=>legendBoxHeight *i)
  //            // .attr("y",h)
  //            .attr('width',legendBoxHeight )
  //            .attr('height',legendBoxHeight )
  //            .attr("fill",(d)=>d)
  //  legendTexts = svgLegend.selectAll("text")
  //            .data(colorBreaks)
  //            .enter()
  //            .append("text")
  //             .attr("class","legend-text")
  //            .attr("x",(d,i)=>legendBoxHeight *(i+1)-10)
  //            .attr("y",legendBoxHeight*1.5)
  //            .text((d)=>Number.parseFloat(d).toFixed(1))

});
