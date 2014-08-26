
$(document).ready(function(){
  var team = [];

   $('#1').hide();
   $('#show').hide();
   $('#six').hide()
  
  $(".fivePlayers").click(function(){
    $("#show").show();
  });
  $('#morgana').click(function(){
   $('#1').show();
  })
  var decks = [$(".box5"), $(".box6"), $(".box7"),$(".box8")]
  for (var i = 0 ; i < decks.length; i++){
     decks[i].hide();
  }

  $('#basic').hide();
  $('#basic').siblings().hide();
  
// $('#box6').click(function(){
//   $('#six').show();
//   $('.anim').addClass('animated tada zoominLeft');
// })

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
  //also make the right div active
  $('.box' + num).show();


 
 
  
});


//option to add percival
 $('#percival').on('click', function(ev){
  event.preventDefault();
  // $('#rpercival').html("<div class='col-sm-4><img src='/assets/app3.png', class='img-responsive'>Percival</div>")
   $("#newPercival").attr("src", "/assets/app3.png");
   $('#perctitle').text('Percival');
   $('button#percival').hide();
   team.push('percival');
   
 })
 var spots_left; 


$('.evilbutton').on('click', function(ev){

  var name_clicked = this.id;
  team.push(name_clicked);
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
var audio_files = {'basic':'basic2.mp3',
   'percival': 'percival.mp3'};

$('#activatePlayer').on('click', function(){
      $('#basic').show();
      team.sort();
      var name_audio_file = team.join();
    })


});

//I want to add a function that when we click on a button, it checks if there is room to add that character on deck
//if there is room, it moves the card, making the button disappear (and all the others if the deck is full
 
  function add_evil_character(name, spots_left,num){
    var image_files = { 'morgana' : '/assets/morgana.jpeg', 
    'oberon': '/assets/oberon.png',
    'mordred': '/assets/mordred.jpeg'}
    
    //name is also the button id
    var target_element = $('#img' + spots_left);
    var tab_button = $('#' + name);
    var new_picture_source = image_files[name];
    target_element.attr("src", new_picture_source );
    var title_span = $('#title'+spots_left);
    title_span.text(capitalize(name));
    tab_button.hide();
    spots_left = spots_left - 1;
    if(spots_left === 0){
      $('.evilbuttonsdiv').hide();
    }

    // 
  }



  function capitalize(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//how can I decide which dom element to go to 

 
  //   function showNumCharacters(num) {
  // //   // switching the active tab
  // //   // switchActiveTab(theTopic);
  // //   // revealing relevant articles
  // //   // displayArticles(theTopic);
 
  //      var tab = $(".numPlayer" + num);
  //      tab.show();
  //    }
  //   var slideDown = $('#slide-down');
  //   var articleRow = $('#' + theTopic + '-drop'); // "tech" -> "#tech-drop"
 
  //   tab.siblings().removeClass('active');
  //   tab.toggleClass('active');
 
  //   var isTabActive = tab.hasClass('active');
  //   if(isTabActive) {
  //     var isSlideDownOpen = slideDown.hasClass('open');
  //     if(isSlideDownOpen) {
  //       slideDown.find('.drop.open').hide().removeClass('open');
  //       articleRow.show().addClass('open');
  //     } else {
  //       slideDown.find('.drop').hide();
  //       articleRow.show().addClass('open');
  //       slideDown.slideDown(500).addClass('open');
  //     }
  //   } else {
  //     slideDown.slideUp(500).removeClass('open');
  //   }