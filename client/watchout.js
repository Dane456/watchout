// start slingin' some d3 here.
var boardSpecs = {
  height: 700,
  width: 700
};
var numEnemies = 30;

var board = d3.select('body').append('svg')
  .attr('width', boardSpecs.width)
  .attr('height', boardSpecs.height);

var drag = d3.behavior.drag()
  .origin(function(){
    var t = d3.select(this);
    return {x: t.attr('x'), y: t.attr('y')};
  })
  .on('drag', function () {
    d3.select(this)
      .attr('x', d3.event.x)
      .attr('y', d3.event.y);
  });

var $player = board.append('image')
  .attr('class', 'player')
  .attr('x', boardSpecs.width / 2)
  .attr('y', boardSpecs.height / 2)
  .attr('width', '0')
  .attr('height', '0')
  .attr('xlink:href', './player.png')
  .call(drag)
  .transition().duration(500)
  .attr('width', '30')
  .attr('height', '30');

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

var collisionCheck = function (enemy) {
  var eBox = enemy.getBBox();
  var enemyLeft = eBox.x;
  var enemyRight = eBox.x + eBox.width;
  var enemyTop = eBox.y;
  var enemyBottom = eBox.y + eBox.height;

  var pBox = $player[0][0].getBBox();
  var playerLeft = pBox.x;
  var playerRight = pBox.x + pBox.width;
  var playerTop = pBox.y;
  var playerBottom = pBox.y + pBox.height;

  if (enemyLeft < playerRight 
      && enemyTop < playerBottom
      && enemyRight > playerLeft
      && enemyBottom > playerTop 
    ) {
    console.log('HIT');
  }
};

var placeAsteroids = function(data) {
  var $asteroids = board.selectAll('.asteroids')
    .data(data, function(d) { return d.id; });

  $asteroids 
    .transition().duration(1000)
    .attr('x', function(d) { return d.x; } )
    .attr('y', function(d) { return d.y; } )
    .tween('x', function () {
      return function () { collisionCheck(this); };
    });

  $asteroids.enter()
    .append('image')
    .attr('class', 'asteroids')
    .attr('x', function(d) { return d.x; } )
    .attr('y', function(d) { return d.y; } )
    .attr('width', '0')
    .attr('height', '0')
    .transition().duration(500)
    .attr('width', '40').attr('height', '40')
    .attr('xlink:href', './enemy.png');
};

setInterval(function() {
  placeAsteroids(makeAsteroids());
}, 2000);




