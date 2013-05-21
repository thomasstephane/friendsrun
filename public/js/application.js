$(document).ready(function() {
  function update_player_position(name) {
    console.log("before " + counter);
    $('#' + name + '_strip .active').next().addClass('active');
    $('#' + name + '_strip .active').first().removeClass('active');
    console.log("after " + counter);
  };

  var game_id = $('.game_id').attr('name');

  var players = $('.racer_table').find('tr').length;

  var counters = [];
  for (var i = 0; i < players; ++i) {
    counters[i] = $('#player1_strip').find('td').length;
  }
  var timer_start  = new Date().getTime();

  $(document).on('keyup', function(event) {
    var n = event.keyCode - 48;
    var now_sec = Math.ceil((new Date().getTime()-timer_start-7000)/1000);
    var now_milli = (new Date().getTime()-timer_start)%1000;
    
    if (($('.finished').text() === "") && ($('.countdown p').text() === 'Go!') ) {
      update_player_position("player" + n);
      counters[n - 1]--;
      $('.timer p').text(now_sec + ":" + now_milli);
      if (counters[n - 1] === 2 ) {
        $('.finished').text(" ");
        $('.finished').toggle();
        var timer_finish = new Date().getTime();
        $.ajax ({
          type: 'post',
          url: '/finish',
          data: {'winner': n, "game_id": game_id, "time": timer_finish - timer_start }
        });
      };
    };
  });


  $('.restart').on('click', function(event) {
    $.ajax ({
      type: 'get',
      url: '/'
    })
    for (var i = 0; i < players; ++i) {
      counters[i] = $('#player1_strip').find('td').length;
    }
    $('.finished').text("");
    $('.finished').toggle();
    $('.timer p').text("0:000");
    $('tr td.active').removeClass();
    $('tr td:first-child').next().addClass('active');
    $('tr td:last-child').addClass('finish');
    counter = 6;
    timer_start  = new Date().getTime() - 1000;
    countdown;
  });


  var counter = 6
  var timer_start  = new Date().getTime();
  var countdown = setInterval(function(){ 
    counter --; 
    if (counter > 0) {
      $('.countdown p').text('Start in ' + counter);
    } else {
      $('.countdown p').text('Go!');
    }
  }, 
  1000);
});
