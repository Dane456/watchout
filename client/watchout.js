// start slingin' some d3 here.
var boardSpecs = {
  height: 700,
  width: 700
};
var numEnemies = 30;

var board = d3.select('body').append('svg')
  .attr('width', boardSpecs.width)
  .attr('height', boardSpecs.height);

var makeAsteroids = function() {
  var asteroids = _.range(0, numEnemies).map(function(i) {
    return {
      id: i,
      x: Math.random() * boardSpecs.width,
      y: Math.random() * boardSpecs.height
    };
  });
  return asteroids;
};

var placeAsteroids = function(data){
  var $asteroids = board.selectAll('image')
    .data(data, function(d) { return d.id; });

  $asteroids 
    .transition().duration(1000)
    .attr('x', function(d) { return d.x; } )
    .attr('y', function(d) { return d.y; } );

  $asteroids.enter()
    .append('image')
    .attr('x', function(d) { return d.x; } )
    .attr('y', function(d) { return d.y; } )
    .attr('width', '0')
    .attr('height', '0')
    .transition().duration(500).attr('width', '30').attr('height', '30')
    .attr('xlink:href', './asteroid.png');
};

setInterval(function() {
  placeAsteroids(makeAsteroids());
}, 2000);


