// add kruglendar to DOM
$('body').prepend('<svg id="kruglendar-showcase"></svg>');


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
    var scene = new ScrollMagic.Scene({
            triggerElement: "div[data-name="+$(this).data("name")+"]", 
            duration: 40, 
            offset: 200,
            triggerHook: 'onEnter',
            tweenChanges: true})
        .setTween(tweenText)
        //.addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    var scene = new ScrollMagic.Scene({
            triggerElement: "div[data-name="+$(this).data("name")+"]", 
            duration: 40, 
            offset: 200,
            triggerHook: 'onEnter',
            tweenChanges: true})
        .setTween(tweenSVG)
        //.addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    var scene = new ScrollMagic.Scene({
            triggerElement: "div[data-name="+$(this).data("name")+"]", 
            duration: 20, 
            offset: 200,
            triggerHook: 'onEnter',
            tweenChanges: true})
        .setTween(tweenSVGTranslate)
        //.addIndicators() // add indicators (requires plugin)
        .addTo(controller);
    var tweensCouple = [];
    tweens.push([ tweenText, tweenSVG ]);
    scenes.push(scene);
  });
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
