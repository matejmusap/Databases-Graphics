var minYear = birthData[0].year;
var maxYear = birthData[birthData.length - 1].year;
var width = 400;
var height = 400;
var barPadding = 8;
var numBars = 12;
var barWidth = width / numBars - barPadding;

d3.select("input")
    .property("min", minYear)
    .property("max", maxYear)
    .property("value", minYear);

d3.select("svg")
    .attr("width", width)
    .attr("height", height)
  .selectAll("rect")
  .data(birthData.filter(function(d) {
    return d.year === minYear;
  }))
  .enter()
  .append("rect")
    .attr("width", barWidth)
    .attr("height", function(d) {
      return d.births / 2.5e6 * height;
    })
    .attr("y", function(d) {
      return height - d.births / 2.5e6 * height;
    })
    .attr("x", function(d,i) {
      return (barWidth + barPadding) * i;
    })
    .attr("fill", "purple");
  
d3.select("svg")
.append("text")
  .classed("title", true)
  .text("Birth Data in " + minYear)
  .attr("x", width / 2)
  .attr("y", 30)
  .style("font-size", "2em")
  .style("text-anchor", "middle");

d3.select("input")
    .on("input", function() {
      var year = +d3.event.target.value;
      d3.selectAll("rect")
        .data(birthData.filter(function(d) {
          return d.year === year;
        }))
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .delay((d, i) => i * 100)
        .on("start", function(d, i) {
          if (i===0) {
          d3.select(".title")
            .text("Updating to " + year + " data..." );
          }
        })
        .on("end", function(d, i, nodes) {
          if (i === nodes.length -1) {
            d3.select(".title")
              .text("Birth data in " + year);
            }
        })
          .attr("height", function(d) {
            return d.births / 2.5e6 * height;
          })
          .attr("y", function(d) {
            return height - d.births / 2.5e6 * height;
          });
    });
