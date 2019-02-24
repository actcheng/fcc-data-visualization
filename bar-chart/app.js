d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(function(data){
  dataset = data["data"];
  const w = 700;
  const h = 500;
  const padding = 60;
  const color = '#e4aa7c';

  var minDate = new Date(1947,0,1);
  var maxDate = new Date(2015,6,1);

  var xScale = d3.scaleTime()
                  .domain([minDate, maxDate])
                  .range([padding, w-padding]);
  var yScale = d3.scaleLinear()
                  .domain([0, d3.max(dataset, (d) => d[1])])
                  .range([h - 2*padding,0]);
  const svg = d3.select("#container")
                .append("svg")
                .attr("width",w)
                .attr("height",h)

  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisRight(yScale);

  svg.append("g")
     .attr("id","x-axis")
     .attr("transform", "translate(0, " + (h-padding) + ")")
     .call(xAxis);

  svg.append("g")
     .attr("id","y-axis")
     .attr("transform", "translate(" +(w-padding) + " ,"+padding+")")
     .call(yAxis);


  bars = svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class","bar")


  bars.attr("x",(d,i)=>padding+i*(w-padding*2)/dataset.length)
      .attr("y",(d)=>padding+yScale(d[1]))
      .attr("width",(w-padding*2)/dataset.length)
      .attr("height",(d)=>h-2*padding-yScale(d[1]))
      .attr("fill", color)
      .attr("data-date",(d)=>d[0])
      .attr("data-gdp",(d)=>d[1])

  // d3.select("div#container")
  //   .append("div")
  //   .classed("svg-container", true) //container class to make it responsive
  //   .append("svg")
  //   //responsive SVG needs these 2 attributes and no width and height attr
  //   .attr("preserveAspectRatio", "xMinYMin meet")
  //   .attr("viewBox", "0 0 600 400")
  //   //class to make it responsive
  //   .classed("svg-content-responsive", true);

  console.log(dataset[0][0],dataset[dataset.length-1][0])
  console.log(minDate, maxDate)
});
