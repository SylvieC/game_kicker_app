
$(document).ready(function(){
  var team = [];
   $('#activatePlayer').hide();
   $('#restart').hide();

  var decks = [$(".box5"), $(".box6"), $(".box7"),$(".box8"), $(".box9"), $(".box10")];
  for (var i = 0 ; i < decks.length; i++){
     decks[i].hide();
  }

  $('#basic').hide();
  $('#basic').siblings().hide();
  $('#howMany').hide();


  var dict = {
    5: [3,2],
    6: [4,2],
    7: [4, 3],
    8: [5,3],
    9: [6,3],
    10: [6,4]
  };
 var num;
  $('.playerChoice').on('click', function(ev) {
    ev.preventDefault();
    num = parseInt($(this).find('.box').text());
    var config = dict[num];
    $('#goodCardCount').text(config[0]);
    $('#evilCardCount').text(config[1]);
    var box_to_show = $(this).attr('class').split(' ')[0]

    $('#howMany').show();
    $('h1.anim').addClass('animated tada zoominLeft');
  
    $(this).siblings().hide();
    $(this).css('margin-left', '400px');
    $("#restart").show();
    $('.box' + num).show();
    $('#activatePlayer').show();
    $('#restart').show();
});

  var changing = {  "mordred.JPG" : 'mordred', 
                    "oberon.JPG" : "oberon",
                    "morgana.JPG":'morgana'
                  }

  //part to deal  with the user changing his mind after he has chosen a character
  // $('.img1').on('click', function(e){
  //  e.preventDefault9);
  //  var src = this.src;
  //  var arr = src.split('/');
  //  var pict_name = arr[arr.length -1]; // for example 'mordred.JPG'
  //  //get the name
  //  var name = pict_name.split('.')[0];
  //  $('#' + name).show();
  //  -----
  //  $(this).hide();
  //   $('button#' + name).show();
  //   team.splice(team.indexOf(name));
  //  $(this).attr('src', );
  //  $('.newPercival').show();
  //  $('.perctitle').text('Loyal servant of Arthur')

  //  -----




  // })



//option to add percival
 $('#percival').on('click', function(ev){
  ev.preventDefault();
  // $('#rpercival').html("<div class='col-sm-4><img src='/assets/app3.png', class='img-responsive'>Percival</div>")
   $(".newPercival").attr("src", "/assets/percival.JPG");
   $('.perctitle').text('Percival');
   $('button#percival').hide();
   team.push('percival');
   
  });


 $('.newPercival').click(function(ev) {
    // remove percival
    ev.preventDefault();
    $(this).hide();
    $('button#percival').show();
    team.splice(team.indexOf('percival'));
   $('.newPercival').attr('src', '/assets/loyal2.JPG');
   $('.newPercival').show();
   $('.perctitle').text('Loyal servant of Arthur')
   
  
 });
 var spots_left; 


$('.evilbutton').on('click', function(ev){
  ev.preventDefault();

  var name_clicked = this.id;
  team.push(name_clicked);
  //if  player chooses Morgana without Percival it would be useless, so we put an alert if Morgana is 
  //chosen without Percival
  if ((name_clicked === 'morgana') && (team.indexOf('percival') === -1)){
  alert("For the powers of Morgana to be useful, make sure to select Percival too");
  } 
  //I grab the count of evil cards
  var evil_card_count = $('#evilCardCount').text();
  
  //the number of spots left for additional evil character is evil_card_count -1 (Because the assassin in
    //not optional)
  if (spots_left  == undefined){
    spots_left = evil_card_count -1;
  }else{
    spots_left -= 1;
  }
 
  //if the number of spots left is greater than 0, I can make a swap
  //but how do I know which one to choose : 2 spots left, I start with div2, 1 spot left div1, 3 spots left: div3
 // alert('name cliked is ' + name_clicked + ' ,spots_left is ' + spots_left + ' ,number of players is '+ num +  " ,evil_cards count: "+ evil_card_count);
  if (spots_left > 0) {
  add_evil_character(name_clicked, spots_left, num);
}
})

$('#restart').on('click', function(){
    location.reload();
})

$('#activatePlayer').on('click', function(){
   $('button').hide();
      show_audio_player(team); 
    })
});

//I want to add a function that when we click on a button, it checks if there is room to add that character on deck
//if there is room, it moves the card, making the button disappear (and all the others if the deck is full
 
  function add_evil_character(name, spots_left,num){
    var image_files = { 'morgana' : '/assets/morgana.JPG', 
    'oberon': '/assets/oberon.JPG',
    'mordred': '/assets/mordred.JPG'}
    
    //name is also the button id
    var target_element = $('.img' + spots_left);
    var tab_button = $('#' + name);
    var new_picture_source = image_files[name];
    target_element.attr("src", new_picture_source );
    var title_span = $('.title'+spots_left);
    title_span.text(capitalize(name));
    tab_button.hide();
    spots_left = spots_left - 1;
    if(spots_left === 0){
      $('.evilbuttonsdiv').hide();
    }
  }



  function capitalize(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function show_audio_player(team){
  var audio_files = {'':'basic.mp3',
   'percival': 'percival.mp3', 
   'mordred': 'mordred.mp3', 
   'morgana': 'basic.mp3', 
   'oberon' : 'oberon.mp3',
   'mordred,morgana': 'mordred.mp3',
   'mordred,percival': 'Mp.mp3', 
   'mordred,oberon': 'Mo.mp3', 
   'mordred,morgana,percival': 'Mmp.mp3',
   'mordred,oberon,percival': 'Mop.mp3',
   'morgana,oberon': 'oberon.mp3',
   'morgana,percival': 'morgPercival.mp3',
   'morgana,oberon,percival': 'morgObePer.mp3',
   'oberon,percival': 'obePer.mp3',
   'mordred,morgana,oberon,percival': 'Mmop.mp3'
 };
   team.sort();

   if (team.length === 0){
        $('#basic').show();
      }else if ( team.length === 1){
          var team_name = team.join();
          switch(team_name) {
            case 'morgana':
                $('#basic').show();
                break;
            case 'mordred':
                $('#mordred1').show()
                break;
            case 'oberon':
                $('#oberon1').show()
                break; 
            case 'percival':
                $('#percival1').show()
                break;      
          }
      }else{
          var team_name = team.join();
          var str = audio_files[team_name];
          var id_of_target = str.substring(0, str.length - 4);
          $('#' + id_of_target).show();
      }
      
}

$(function() {
    var moveLeft = 0;
    var moveDown = 0;
    $('a.popper').hover(function(e) {
   
        var target = '#' + ($(this).attr('data-popbox'));
         
        $(target).show();
        moveLeft = $(this).outerWidth();
        moveDown = ($(target).outerHeight() / 2);
    }, function() {
        var target = '#' + ($(this).attr('data-popbox'));
        $(target).hide();
    });
 
    $('a.popper').mousemove(function(e) {
        var target = '#' + ($(this).attr('data-popbox'));
         
        leftD = e.pageX + parseInt(moveLeft);
        maxRight = leftD + $(target).outerWidth();
        windowLeft = $(window).width() - 40;
        windowRight = 0;
        maxLeft = e.pageX - (parseInt(moveLeft) + $(target).outerWidth() + 20);
         
        if(maxRight > windowLeft && maxLeft > windowRight)
        {
            leftD = maxLeft;
        }
     
        topD = e.pageY - parseInt(moveDown);
        maxBottom = parseInt(e.pageY + parseInt(moveDown) + 20);
        windowBottom = parseInt(parseInt($(document).scrollTop()) + parseInt($(window).height()));
        maxTop = topD;
        windowTop = parseInt($(document).scrollTop());
        if(maxBottom > windowBottom)
        {
            topD = windowBottom - $(target).outerHeight() - 20;
        } else if(maxTop < windowTop){
            topD = windowTop + 20;
        }
     
        $(target).css('top', topD).css('left', leftD);
     
     
    });
 
}); 
  