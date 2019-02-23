d3.json("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json").then(function(data){
  dataset = data["data"];
  const w = '90%';
  const h = 400;
  const padding = 0;
  const color = '#e4aa7c';
  var yScale = d3.scaleLinear()
                    .range([padding,h - padding])
                    .domain([0, d3.max(dataset, (d) => d[1])]);
  const svg = d3.select("body")
                .append("svg")
                .attr("width",w)
                .attr("height",h)
  bars = svg.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class","bar")

  bars.attr("x",(d,i)=>i*90/dataset.length+'%')
      .attr("y",(d)=>h-yScale(d[1]))
      .attr("width",90/dataset.length+'%')
      .attr("height",(d)=>yScale(d[1]))
      .attr("fill", color)
      .on("mouseover", function() {
            d3.select(this)
            	.attr("fill", "red");
        })
      .on("mouseout", function() {
            d3.select(this)
            	.attr("fill", color);
        })
  console.log(dataset[0],dataset[dataset.length-1])
});
