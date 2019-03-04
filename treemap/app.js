d3.json("https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json").then(function(data){
  function wrap(text, width) {
      text.each(function () {
          var text = d3.select(this),
              words = text.text().split(/\s+/).reverse(),
              word,
              line = [],
              lineNumber = 0,
              lineHeight = 1.1, // ems
              x = text.attr("x"),
              y = text.attr("y"),
              dy = 0, //parseFloat(text.attr("dy")),
              tspan = text.text(null)
                          .append("tspan")
                          .attr("x", x)
                          .attr("y", y)
                          .attr("dy", dy + "em");
          while (word = words.pop()) {
              line.push(word);
              tspan.text(line.join(" "));
              if (tspan.node().getComputedTextLength() > width) {
                  line.pop();
                  tspan.text(line.join(" "));
                  line = [word];
                  tspan = text.append("tspan")
                              .attr("x", x)
                              .attr("y", y)
                              .attr("dy", ++lineNumber * lineHeight + dy + "em")
                              .text(word);
              }
          }
      });
  }

  const margin = {top: 40, right:10, bottom:10, left:10}
        width = 960 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom,
        legendBoxHeight = 20;
        color = d3.scaleOrdinal().range(["#ffe5ea", "#eac117", "#b274d7", "#b9ff1f", "#e16666", "#9ff0f0", "#f09f9f", "#9f9ff0", "#f0960c", "#2f8ec6", "#bbbd1e", "#3aa2a3","#badbc1","#fffcd8","#6495ed","#b26666","#00bc6c", "#d8ccf4","#db4e76"]);

  const svg = d3.select("#container")
                .append("svg")
                .attr("width",width)
                .attr("height",height)

  const svgLegend = d3.select("#legend")
                      .append("svg")
                      .attr("width",600)
                      .attr("height",400)

  const treemap = d3.treemap().size([width, height]);

  const root = d3.hierarchy(data, (d) => d.children)
                 .sum((d) => d.value);

  const tree = treemap(root);

 const groups = svg.selectAll(".groups")
                  .data(tree.leaves())
                  .enter()
                  .append("g")
                  .attr("class", "tile")

  groups.append('rect')
        .attr("class", "tile")
        .attr("x", (d) => d.x0 + "px")
        .attr("y", (d) => d.y0 + "px")
        .attr("width", (d) => Math.max(0, d.x1 - d.x0 - 1) )
        .attr("height", (d) => Math.max(0, d.y1 - d.y0  - 1) )
        .attr("fill", (d) => color(d.parent.data.name))
        .attr("data-name",(d)=>d.data.name)
        .attr("data-category",(d)=>d.data.category)
        .attr("data-value",(d)=>d.data.value)
        .on("mouseover", function(d) {
  				var xPosition = parseFloat(d3.select(this).attr("x")) ;
  				var yPosition = parseFloat(d3.select(this).attr("y")) ;
          var name = d3.select(this).attr("data-name");
          var category = d3.select(this).attr("data-category");
          var value = d3.select(this).attr("data-value");
  				d3.select("#tooltip")
  					.style("left", (d3.event.pageX)+ "px")
  					.style("top", (d3.event.pageY ) + "px")
            .attr("data-name",name)
  					.select("#data-name")
  					.text(name);

          d3.select("#tooltip")
            .select("#data-category")
    				.text(category);
          d3.select("#tooltip")
            .attr("data-value",value)
            .select("#data-value")
    				.text(value);
  				 d3.select("#tooltip").classed("hidden", false);
  		   })
  		   .on("mouseout", function() {
  				d3.select("#tooltip").classed("hidden", true);
  		   })

   groups.append('text')
        .text((d)=>d.data.name)
        .attr("class", "inner-text")
        .attr("x", (d) => d.x0 +5+ "px")
        .attr("y", (d) => d.y0 +15+ "px")
        .call(wrap,40)


   legendRects = svgLegend.selectAll("rect")
             .data(color.range())
             .enter()
             .append("rect")
             .attr("class","legend-item")
             .attr("x",(d,i)=>200 *(i%3))
             .attr("y",(d,i)=>50+30 * Math.floor(i/3))
             .attr('width',legendBoxHeight )
             .attr('height',legendBoxHeight )
             .attr("fill",(d)=>d)
   legendTexts = svgLegend.selectAll("text")
             .data(tree.data.children.map((d)=>d.name))
             .enter()
             .append("text")
             .attr("class","legend-text")
             .attr("x",(d,i)=>legendBoxHeight+10+200 *(i%3))
             .attr("y",(d,i)=>65+30 * Math.floor(i/3))
             .text((d)=>d)

});
