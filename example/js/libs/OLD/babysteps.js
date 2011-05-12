/**
 * jQuery babySteps plugin
 * This jQuery plugin is just a small tool for binding 'steps' together
 * @name jquery.babysteps
 * @author Cory ODaniel http://coryodaniel.com
 * @version 0.2.2
 * @date March 17, 2009
 * @category jQuery plugin
 * @copyright (c) 2008 Vokle, Inc. (http://vokle.com)
 * @license MIT http://www.opensource.org/licenses/mit-license.php
 * @example Visit http://www.vokle.com/open-source/examples/babysteps/index.html
 * And yes, it is a "What About Bob?" reference.
 *
 * CHANGELOG (03/17/2009)
 *  - bindStep method will take a selector instead of just a jQuery object (do what you will)
 *  - added a gotToStep method
 */

(function($) {
  /** Binds to steps together
    * @param nextStep [jQuery Object | jquery Selector] 
    *   The step to bind to
    *
    * @param options  [Hash]
    *   override the default options
    *
    * @see $.fn.bindStep.defaults
    *   
    * @example
    *   $('step1').bindStep('#step2');
    * 
  **/
  $.fn.bindStep = function(nextStep,options) {
   
    // build main options before element iteration
    var opts = $.extend({}, $.fn.bindStep.defaults, options);
    
    //Preload images
    var nextBtnImg = new Image();
    var prevBtnImg = new Image();
    nextBtnImg.src = opts.nextBtn;
    prevBtnImg.src = opts.prevBtn;
   
    /**
     * Bind each step to each nextStep
     *  I usually only bind one step to one step, but i suppose someone may
     *  want to bind multiple steps together...? 
     */
    return this.each(function() {
      $currStep = $(this);
      $currStep.addClass('jQueryBabyStep');

      // build element specific options
      var o = $.meta ? $.extend({}, opts, $this.data()) : opts;
      
      //Preload images if they are different
      if(nextBtnImg.src != o.nextBtn) nextBtnImg.src = o.nextBtn;
      if(prevBtnImg.src != o.prevBtn) prevBtnImg.src = o.prevBtn;
      
      $(nextStep).each(function(){
        $nextStep = $(this);
        $nextStep.addClass('jQueryBabyStep');        
        
        //bind the next button
        displayAndBind($currStep,$nextStep,o,'next');
        //Bind the previous button
        if(o.bindPrev) displayAndBind($nextStep,$currStep,o,'prev');
      });
      
    });
  };
  
  // @param targetStep [jQuery Object or Selector]
  //    The step to skip to
  //
  // @param transition [function]
  //    How to transition between the two steps
  //    Should be a function that accepts to parameters (currStep, targetStep)
  //
  // @see $.fn.bindStep.defaults.transition
  //
  // @return jQuery Object
  jQuery.goToStep = function(targetStep,transition){
    if (transition === undefined) {
      transition = $.fn.bindStep.defaults.transition;
    }
    transition($('.jQueryBabyStep:visible'),$(targetStep));
  };
 
  function displayAndBind(s1,s2,_opts,type){
    //Create ids
    var imgId = s1.attr('id') + '_to_' + s2.attr('id') + '_btn';
    var containerId = imgId + '_container';
    
    //determine image and create markup
    var img = (type == 'next' ? _opts.nextBtn : _opts.prevBtn);
   var imgBtn = _opts.generateMarkup(containerId,imgId,img);
    
    //Layout the new button
  // _opts.layoutButton(s1,imgBtn,type);
    
    //Attach the transitions
    var imgRef = $('#'+ containerId);
    attachTransition(imgRef,_opts.transition,s1,s2,_opts.nextValidator);
  }
    
  // attach the transition to the image button and the steps
  function attachTransition(imgBtn,trans,s1,s2,valid){
    imgBtn.click(function(){
      if(valid && valid()) trans(s1,s2);
    });
  }
  
  // private function for debugging
  function debug($obj) {
    if (window.console && window.console.log)
      window.console.log('babySteps: ' + $obj);
  };
  
  // plugin defaults
  $.fn.bindStep.defaults = {
    //Path to your next button image
    nextBtn         :   '',
    //Path to your previous button image
    prevBtn         :   '',
    //When binding next step, should a previous button be bound?         
    bindPrev        :   true,
    /**
     * Validation callback called when 'next' is clicked
     * Validator should return Boolean
     * Make sure you output your error messages!
     */
    nextValidator   :   function(){return true;},
    /**
     * Transition between steps; function(thisStep,nextStep)
     * @params - currStep - jQuery reference to the step that is binding
     * @params - nextStep - jQuery reference to the step that is being bound
     */
    transition      :   function(currStep,nextStep){
      currStep.hide();  
      nextStep.show();
    },
    /**
     * How to lay the button out over/within the step container
     * @params - step - jQuery reference to step container
     * @params - imgBtn - Markup containing button
     * @params - imgType - 'next' or 'prev'
     */
    layoutButton    :   function(step,imgBtn,imgType){
      if(imgType=='next' || imgType=='prev'){
        step.append(imgBtn);
      }
    },
    /**
     * Generate the HTML to wrap the Image
     * @params - id1 - id that transition is bound to, could be used for container like div, or whatever
     * @params - id2 - id for the image, if you used id1 for the image, then just ignore id2
     * @params - img - image path
   */

    generateMarkup  :   function(id1,id2,img){        
       return([
         '<div ',
           'id="', id1, '" ',
         '>',
           '<img ',
             'src="', img, '" ',
             'id="', id2 , '" ',
           '/>',
         '</div>'
       ].join(''));
     }


  };
  
})(jQuery);