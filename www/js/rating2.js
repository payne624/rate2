$(document).ready(function() {
$('.hero').on('click', function(event){
  console.log(event.target.classname);
  //e.preventDefault();
  console.log('hello');
  $("input[type='radio']").click(function(){
    console.log("hello2");
  var sim = $("input[type='radio']:checked").val();
  console.log(sim);
  console.log(document.getElementById('rating'));
  console.log('hello');
  document.getElementById('rating').innerText=sim;
  if (sim<3) {
    $('.myratings').css('color','red');
   $(".myratings").text(sim);
   }
   else
   {
      $('.myratings').css('color','green');
       $(".myratings").text(sim);
       } });
 });
});
  