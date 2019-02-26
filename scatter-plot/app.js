d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json").then(function(data){
  dataset = data;
  const w = 800;
  const h = 600;
  const padding = 60;
  const colorDope = '#6b40bb';
  const colorNDope = '#40bbb8';

  const toDate = function(d){
    return new Date(0,0,0,0,d.Time.slice(0,2),d.Time.slice(3,5))
  }

  console.log(d3.min(dataset, (d) => toDate(d)))

  var xScale = d3.scaleLinear()
                  .domain([d3.min(dataset, (d) => d.Year)-1, d3.max(dataset, (d) => d.Year)+1])
                  .range([padding, w-padding]);
  var yScale = d3.scaleLinear()
                  .domain([d3.max(dataset, (d) =>                   toDate(d)), d3.min(dataset, (d) =>toDate(d))])
                  .range([h - 2*padding,0]);
  const svg = d3.select("#container")
                .append("svg")
                .attr("width",w)
                .attr("height",h)

  const xAxis = d3.axisBottom(xScale).tickFormat(d3.format("d"));
  const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));

  svg.append("g")
     .attr("id","x-axis")
     .attr("transform", "translate(0,"+ (h-padding) + ")")
     .call(xAxis);

  svg.append("g")
     .attr("id","y-axis")
     .attr("transform", "translate(" +padding + " ,"+padding+")")
     .call(yAxis);

  dots = svg.selectAll("circle")
            .data(dataset)
            .enter()
            .append("circle")
            .attr("class","dot")

  dots.attr("cx",(d)=>xScale(d.Year))
      .attr("cy",(d)=>padding+yScale(toDate(d)))
      .attr("r",8)
      .attr("data-xvalue",(d)=>d.Year)
      .attr("data-yvalue",(d)=>toDate(d))
      .attr("fill",(d)=>(d.Doping == '')? colorNDope:colorDope)
      .on("mouseover", function(d) {
				var xPosition = parseFloat(d3.select(this).attr("cx")) ;
				var yPosition = parseFloat(d3.select(this).attr("cy")) +padding*2;
        var year = d3.select(this).attr("data-xvalue");
				d3.select("#tooltip")
					.style("left", (d3.event.pageX+30)+ "px")
					.style("top", (d3.event.pageY - 30) + "px")
          .attr("data-year",year)
					.select("#data-year")
					.text(year);
        d3.select("#tooltip")
          .select("#data-doping")
  				.text((d.Doping == '')? 'None':d.Doping);
        d3.select("#tooltip")
          .select("#data-name")
  				.text(d.Name);
				d3.select("#tooltip").classed("hidden", false);
		   })
		   .on("mouseout", function() {
				d3.select("#tooltip").classed("hidden", true);
		   })

   var svgLegned4 = d3.select(".legend4").append("svg")
             .attr("width", width)
             .attr("height", height - 50)
});
