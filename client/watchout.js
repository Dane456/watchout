// start slingin' some d3 here.
var boardSpecs = {
  height: 700,
  width: 1500
};
var numEnemies = 100;
var currentScore = 0;
var totalCollisions = 0;
var highscore = 0;
var collisions = {};

var board = d3.select('body').append('svg')
  .attr('width', '100%')
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

    $asteroids.each(function (d, i) { collisionCheck(this, i); });
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

var $asteroids = d3.selectAll('.asteroids');

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

var collisionCheck = function (enemy, index) {
  //debugger;
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
      && !collisions[index]
    ) {
    updateScore();
    collisions[index] = true;
  }
};
var updateScore = function() {
  d3.select('.collisions span').text(++totalCollisions);
  if (currentScore > highscore) {
    highscore = currentScore;
    d3.select('.highscore span').text(currentScore);
  }
  currentScore = 0;
};
var placeAsteroids = function(data) {
  $asteroids = board.selectAll('.asteroids')
    .data(data, function(d) { return d.id; });

  $asteroids 
    .transition().duration(3000)
    .attr('x', function(d) { return d.x; } )
    .attr('y', function(d) { return d.y; } )
    .tween('x', function (d, i) {
      return function () { collisionCheck(this, i); };
    })
    .each('end', function (d, i) { collisions[i] = false; });

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
}, 5000);


setInterval(function() {
  currentScore++;
  d3.select('.current span').text(currentScore);
}, 50);




