// add kruglendar to DOM
$('body').prepend('<div id="kruglendar-showcase-wrapper"><svg id="kruglendar-showcase"></svg></div>');


// hiding cases
//var $cases = $("#cases > div");
//$cases.css({color: "#FF0000", opacity: 0});


// Snap SVG
//
//
var artboard;
Snap.load("/img/kruglendar-showcase.svg", function(f){
  artboard = f.select("#artboard");
  var cases = artboard.selectAll("#cases>g");
  var casesInner = artboard.selectAll("#cases>g>g");
  cases.attr({opacity: 0, fill: "#FF0000"});
  casesInner.attr({transform: "translate(-100, 0)"});
  kruglendarShowcase = Snap("#kruglendar-showcase");
  kruglendarShowcase.append(artboard);
  initScrollMagic();
});

//
// ScrollMagic
//
//
function initScrollMagic(){
  var controller = new ScrollMagic.Controller();
  var $cases = $("#cases > div");
  var scenes = [];
  var tweens = [];
  $cases.each(function(){
    var tweenText = new TimelineMax()
        .add(
          TweenMax.to(
            $(this), 
            0.1, 
            {
              opacity: 1, 
              left: 0,
              ease:Linear.easeNone
            }
          )
        )
        .add(
          TweenMax.to(
            $(this), 
            0.1, 
            {
              color: "#000000", 
              ease:Linear.easeNone
            }
          )
        );
    var tweenSVG = new TimelineMax()
        .add(
          TweenMax.to(
            $("#"+$(this).data("name")), 
            0.1, 
            {
              opacity: 1, 
              ease:Linear.easeNone
            }
          )
        )
        .add(
          TweenMax.to(
            $("#"+$(this).data("name")), 
            0.1, 
            {
              fill: "#000000", 
              ease:Linear.easeNone
            }
          )
        );
    var tweenSVGTranslate = new TimelineMax()
        .add(
          TweenMax.to(
            $("#"+$(this).data("name")+">g"), 
            0.1, 
            {
              transform: "translate(0, 0)", 
              ease:Linear.easeNone
            }
          )
        );
    new ScrollMagic.Scene({
            triggerElement: "div[data-name="+$(this).data("name")+"]", 
            duration: 40, 
            offset: 200,
            triggerHook: 'onEnter',
            tweenChanges: true})
        .setTween(tweenSVG)
        .addTo(controller);
    new ScrollMagic.Scene({
            triggerElement: "div[data-name="+$(this).data("name")+"]", 
            duration: 20, 
            offset: 200,
            triggerHook: 'onEnter',
            tweenChanges: true})
        .setTween(tweenSVGTranslate)
        .addTo(controller);
    new ScrollMagic.Scene({
            triggerElement: "div[data-name="+$(this).data("name")+"]",
            duration: 40, 
            offset: 200,
            triggerHook: 'onEnter',
            tweenChanges: true})
        .setTween(tweenText)
        .addTo(controller);
    var tweensCouple = [];
  });
  // Showcase fading
  new ScrollMagic.Scene({
          triggerElement: "section#description", 
          duration: 400, 
          offset: 400,
          triggerHook: 'onEnter',
          tweenChanges: true})
      .setTween(new TimelineMax().add(
        TweenMax.to(
          $("#artboard"), 
          0.1, 
          {
            opacity: 1, 
            ease:Linear.easeNone
          }
        )
      ))
      //.addIndicators()
      .addTo(controller);
  new ScrollMagic.Scene({
          triggerElement: "section#whatfor", 
          duration: 300, // 400
          offset: $("section#whatfor").height() + 0, // + 200
          triggerHook: 'onEnter',
          tweenChanges: true})
      .setTween(new TimelineMax().add(
        TweenMax.to(
          $("#artboard"), 
          0.1, 
          {
            opacity: 0, 
            ease:Linear.easeNone
          }
        )
      ))
      //.addIndicators()
      .addTo(controller);
  //var tweenArtboard = new TimelineMax()
      //.add(
        //TweenMax.to(
          //$("#artboard"), 
          //0.1, 
          //{
            //transform: "transform: translate(-50%, -52%) scale(1.4) translate(-400px, 0) rotate3d(0, 0, 1, 0deg);", 
            //ease:Linear.easeNone
          //}
        //)
      //);
  //var sceneArtboard = new ScrollMagic.Scene({
          //duration: 400, 
          //offset: 200,
          //tweenChanges: true})
      //.setTween(tweenArtboard)
      //.addIndicators() // add indicators (requires plugin)
      //.addTo(controller);
  //// init controller
  //// build tween
  //var tween = new TimelineMax()
          //.add(TweenMax.to($caseBirthdays, 0.1, {fill: "#ffffff", ease:Linear.easeNone}));
  //// build scene
  //var scene = new ScrollMagic.Scene({triggerElement: "#trigger2", duration: 50, tweenChanges: true})
          //.setTween(tween)
          //.addIndicators() // add indicators (requires plugin)
          //.addTo(controller);
}

