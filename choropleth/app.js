d3.json("https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json").then(function(topology){
d3.json("https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json").then(function(dataset){


  const w = 1000;
  const h = 600;
  const legendBoxHeight = 30;
  const padding = 60;
  const maxEdu = d3.max(dataset,(d)=>d.bachelorsOrHigher)
  const minEdu = d3.min(dataset,(d)=>d.bachelorsOrHigher)
  const colorList = ['#fcf2e7','#f8dec3','#f3c89c','#eeb274','#eaa256','#e69138','#e38932','#df7e2b','#db7424','#d56217'];
  var colors = d3.scaleQuantize()
    .domain([minEdu,maxEdu])
    .range(colorList);
  var colorBreaks = d3.range(1,colorList.length)
                      .map((i)=>i*(maxEdu-minEdu)/colorList.length+minEdu)


  const svg = d3.select("#container")
                .append("svg")
                .attr("width",w)
                .attr("height",h)

  const svgLegend = d3.select("#legend")
                .append("svg")
                .attr("width",legendBoxHeight*colorList.length)
                .attr("x",200)

  var path = d3.geoPath()
          // .projection(projection);
  var g = svg.append("g");

  g.selectAll("path")
   .data(topojson.object(topology, topology.objects.counties)    .geometries)
   .enter()
   .append("path")
   .attr("class","county")
   .attr("d", path)
   .attr("fill",(d)=>colors(dataset.find(x=>x.fips===d.id).bachelorsOrHigher))
   .attr("data-fips",(d)=>d.id)
   .attr("data-education",(d)=>dataset.find(x=>x.fips===d.id).bachelorsOrHigher)
   .on("mouseover", function(d) {
  		var xPosition = parseFloat(d3.select(this).attr("x")) ;
  		var yPosition = parseFloat(d3.select(this).attr("y")) ;
      var data = dataset.find(x=>x.fips===d.id)
      var county = data.area_name;
      var state = data.state;
      var education = data.bachelorsOrHigher;
  		d3.select("#tooltip")
  			.style("left", (d3.event.pageX +10)+ "px")
  			.style("top", (d3.event.pageY - 30) + "px")
        .attr("data-county",county)
  			.select("#data-county")
  			.text(county);
     d3.select("#tooltip")
       .attr("data-state",state)
       .select("#data-state")
  			.text(state);
     d3.select("#tooltip")
       .attr("data-education",education)
       .select("#data-education")
  		 .text(education)
     d3.select("#tooltip").classed("hidden", false);
    })
   .on("mouseout", function() {
  	d3.select("#tooltip").classed("hidden", true);
   })

  // svg.append("g")
  //    .attr("id","x-axis")
  //    .attr("transform", "translate(0,"+ (h-padding) + ")")
  //    .call(xAxis);
  //
  // svg.append("g")
  //    .attr("id","y-axis")
  //    .attr("transform", "translate(" +padding + " ,"+padding+")")
  //    .call(yAxis);
  //
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
             .text((d)=>Number.parseFloat(d).toFixed(0))
});
});
