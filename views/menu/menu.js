
var main = function(){



  $(".drop").click(function(){
  $(".cssmenu").css("display", "block");
  $(".row1").css("height","90px")
  })

$(".salads").hide();
$(".snacks").hide();
$(".sandwich").hide();
$(".sides").hide();
$(".shakes").hide();


$(".b").click(function(){

$(".burgers").slideDown('slow');
$(".salads").hide();
$(".snacks").hide();
$(".sandwich").hide();
$(".sides").hide();
$(".shakes").hide();




});


$(".sa").click(function(){

  $(".salads").slideDown('slow');
  $(".burgers").hide();
  $(".snacks").hide();
  $(".sandwich").hide();
$(".sides").hide();
$(".shakes").hide();


});


$(".si").click(function(){

  $(".sides").slideDown('slow');
  $(".burgers").hide();
  $(".snacks").hide();
  $(".sandwich").hide();
  $(".salads").hide();
$(".shakes").hide();

});



$(".sn").click(function(){

  $(".snacks").slideDown('slow');
  $(".burgers").hide();
  $(".salads").hide();
  $(".sandwich").hide();
  $(".sides").hide();
$(".shakes").hide();


});

$(".san").click(function(){

  $(".sandwich").slideDown('slow');
  $(".burgers").hide();
  $(".salads").hide();
  $(".shakes").hide();
  $(".snacks").hide();
  $(".sides").hide();

});

$(".sh").click(function(){

  $(".shakes").slideDown('slow');
  $(".burgers").hide();
  $(".snacks").hide();
  $(".sandwich").hide();
  $(".salads").hide();
  $(".sides").hide();



});


};

$(document).ready(main);
