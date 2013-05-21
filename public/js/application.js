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

    if (($('.finished').text() === "") && ($('.countdown').text() === 'Go!') ) {
      update_player_position("player" + n);
      counters[n - 1]--;
      if (counters[n - 1] === 1 ) {
        $('.finished').text("Player " + n + " wins!!");
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
    $('tr td').removeClass();
    $('tr td:first-child').addClass('active');
    counter = 1;
    countdown;
  });


  var counter = 1
  var countdown = setInterval(function(){ 
    counter --; 
    if (counter > 0) {
      $('.countdown').text('Start in ' + counter);
    } else {
      $('.countdown').text('Go!');
    }
  }, 
  1000);
});
