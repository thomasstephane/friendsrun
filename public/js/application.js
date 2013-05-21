function Player(i) {
  this.id = i;
  this.name = "player" + i;
  this.counter = $('#player1_strip').find('td').length;
}

Player.prototype.update_player_position = function() {
  $('#' + this.name + '_strip .active').next().addClass('active');
  $('#' + this.name + '_strip .active').first().removeClass('active');
};


function Game() {
  this.nb_players = $('.racer_table').find('tr').length;
  this.players = [];
  this.game_id = $('.game_id').attr('name');
}

Game.prototype.addPlayers = function() {
  for (var i = 1; i <= this.nb_players; ++i) {
    player = new Player(i);
    this.players.push(player);
  }
};

Game.prototype.play = function() {
  var n = event.keyCode - 49;
  var now_sec = Math.ceil((new Date().getTime()-timer_start-7000)/1000);
  var now_milli = (new Date().getTime()-timer_start)%1000;

  if (($('.finished').text() === "") && ($('.countdown p').text() === 'Go!') ) {
    this.players[n].update_player_position();
    this.players[n].counter--;
    $('.timer p').text(now_sec + ":" + now_milli);
    if (this.players[n].counter === 2 ) {
      $('.finished').text(" ");
      $('.finished').toggle();
      var timer_finish = new Date().getTime();
      $.ajax ({
        type: 'post',
        url: '/finish',
        data: {'winner': n, "game_id": this.game_id, "time": timer_finish - timer_start }
      });
    }
  }
};

Game.prototype.countdown = function() {
  var timer = 6;
  timer_start = new Date().getTime();
  setInterval(function(){
    timer --;
    if (timer > 0) {
      $('.hint').show("slow");
      $('.hint').css('opacity',"1");
      $('.countdown p').text('Start in ' + timer);
    } else {
      $('.hint').hide("slow");
      $('.countdown p').text('Go!');
      $('.hint').css('opacity',0);
      clearInterval();
    }
  },
  1000);
};


Game.prototype.restart = function() {
  $.ajax ({
    type: 'get',
    url: '/'
  });
  for (var i = 0; i < this.nb_players; ++i) {
    this.players[i].counter = $('#player1_strip').find('td').length;
  }
  $('.finished').text("");
  $('.finished').toggle();
  $('.timer p').text("0:000");
  $('tr td.active').removeClass();
  $('tr td:first-child').next().addClass('active');
  $('tr td:last-child').addClass('finish');
  counter = 6;
  timer_start  = new Date().getTime() - 1000;
  this.countdown();
};

$(document).ready(function() {
  var friendsrun = new Game();
  friendsrun.addPlayers();
  var timer_start  = new Date().getTime();
  friendsrun.countdown();

  $(document).on('keyup', function(event) {
    friendsrun.play();
  });


  $('.restart').on('click', function(event) {
    friendsrun.restart();
  });
});
