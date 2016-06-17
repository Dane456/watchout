// start slingin' some d3 here.
var boardSpecs = {
  height: 700,
  width: 700
};
var numEnemies = 30;

var board = d3.select('body').append('svg')
  .attr('width', boardSpecs.width)
  .attr('height', boardSpecs.height);

var asteroids = _.range(0, numEnemies).map(function(i) {
  return {
    id: i,
    x: Math.random() * boardSpecs.width,
    y: Math.random() * boardSpecs.height
  };
});

board.selectAll('circle')
  .data(asteroids, function(d) { return d.id; })
  .enter()
  .append('image')
  .attr('r', 0)
  .attr('x', function(d) { return d.x; } )
  .attr('y', function(d) { return d.y; } )
  .attr('width', '30')
  .attr('height', '30')
  .attr('xlink:href', './asteroid.png')
  // .style({'href': 'url(./asteroid.png)'})
  .transition(1000).attr('r', 10);



