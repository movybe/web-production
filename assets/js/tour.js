function _tourJS()
{
    var _this = this;
    var offset, height, width,  top , right , currentActiveElement , allElementsWithTheClassNameIsVisible;
    //The minimum screen size allowed
    this.minScreenSize = 994;
    //a boolean indicating if the "start" function should run
    var start = window.screen.width >= _this.minScreenSize;
    //a boolean indicating if the "start" function is running
    var started = false;
    this.tourJSClassName = '.tourJS';
    this.overlayEffectClassName =  this.tourJSClassName+' .overlay-effect';
    this.overlayClassName = 'overlay';
    this.closeClassName = 'close';
    this.stepAttribute = 'data-step';
    this.currentStepClass = 'current-step';
    this.tourJSTooltip = this.tourJSClassName + ' .tourJS-tooltip';
    this.captionAttribute = 'data-caption';
    this.tourJSCaptiponText = $(this.tourJSClassName + ' .tourJS-caption-text');
    this.tourJSNextTooltip = $(this.tourJSClassName + ' .tourJS-next-tooltip');
    this.tourJSCurrentProgress = $(this.tourJSClassName + ' .tourJS-current-progress');
    this.tourJSTotalProgress = $(this.tourJSClassName + ' .tourJS-total-progress');

    this.tourJSClose = $(this.tourJSClassName + ' .tourJS-close');

    this.actionAttribute = 'data-tourjs-action';

    this.tourJSClose.on('click' , function (e) {
       e.preventDefault();
       _this.stop();
    });


    var currentIndex, elementsWithTheClassName , currentClassName = "" , firstOccurrenceClass = "" , classes = [];

    _this.mainStart = function mainStart () {
        $(window).resize(function () {
            start = window.screen.width >= _this.minScreenSize;
            if(!start) _this.stop();
        });
    };

    _this.start = function _start(className) {

        _this.mainStart();
        if(!start || started) return;

        //Indicate that tourJS has started
        started = true;
        currentClassName = ""; firstOccurrenceClass = ""; classes = []; elementsWithTheClassName = [];
        currentIndex = -1; currentActiveElement = ""; allElementsWithTheClassNameIsVisible = true;

        //Get the class, and store all those elements in an array
        $(_this.tourJSClassName + '.' + className).each(
            function () {


                //Push each of those elements into the "elementsWithTheClassName" array

                //This gives us the className of this particular element
                currentClassName = '.' + $.trim($(this).attr('class')).split(/\s+/).join('.')+":visible";


                //Add this particular class to the classes array if it doesn't already exist
                if(!defaults.inArray(currentClassName , classes)){
                    classes.push(currentClassName);
                    elementsWithTheClassName.push($(this));
                }
                //if(!$(this).visible(false))allElementsWithTheClassNameIsVisible = false;





        });

        /*Check if all the necessary element is visible
        if(!allElementsWithTheClassNameIsVisible){
            started = false;
            return;
        }*/

        //Then sort the elements according to their "data-step" attribute value
        elementsWithTheClassName.sort(function (a , b) {
            return parseInt($(a).attr(_this.stepAttribute)) - parseInt($(b).attr(_this.stepAttribute));
        });


        //Add an overlay
        //$(_this.overlayEffectClassName).addClass(_this.overlayClassName);

        //Change the text of the total progress
        _this.tourJSTotalProgress.text(elementsWithTheClassName.length);

        //Change what happens next when clicked
        this.tourJSNextTooltip.on('click' , _this.next);
        this.tourJSNextTooltip.click();

    };

    _this.stop = function stop ()
    {
        //When the window is re-sized nothing should happen
        $(window).resize(function(){return false});
        //Remove the overlay
        $(_this.overlayEffectClassName).removeClass(_this.overlayClassName);
        //Remove the current step class from the current step
        try {
           currentActiveElement.removeClass(_this.currentStepClass);
        }catch (e) {}


        //Hide tourJS tooltip
        $(_this.tourJSTooltip).hide();
        tourJS = new _tourJS();

        //Now indicate that touJS has not started (meaning tourJS has stopped)
        started = false;
    };
       _this.placeToolTip = function placeToolTip() {

           offset = currentActiveElement.offset();
           height = currentActiveElement.height();
           width  = currentActiveElement.width();
           top = offset.top + 10 + height + 5 + "px";
           right = offset.left + width + 10 + "px";


           $(_this.tourJSTooltip).css( {
               'position': 'absolute',
               'top': top ,
               'display' : 'block',
               'left' : offset.left
                //'width' : width
           });


           //Change the text of the tooltip
           _this.tourJSCaptiponText.text(currentActiveElement.attr(_this.captionAttribute));

           //Scroll page to the bottom of the tooltip
           document.querySelector(_this.tourJSTooltip).scrollIntoView(false);
           if(currentActiveElement.attr(_this.actionAttribute)) {
               currentActiveElement.trigger(currentActiveElement.attr(_this.actionAttribute));
           }
       };

       _this.next = function next() {
           //Check if there is a next element
           if(elementsWithTheClassName[currentIndex + 1])
        {
            //Change the text of the button to "Next"

            if(elementsWithTheClassName[currentIndex + 2])
            {
                $(_this.tourJSNextTooltip).text("NEXT");
            }
            else {
                $(_this.tourJSNextTooltip).text("DONE");

            }
            //Increment the currentIndex variable

            if(currentIndex > -1) {
                //Remove the currentActiveElement class from the current active element
                currentActiveElement.removeClass(_this.currentStepClass);
            }

            currentIndex = currentIndex + 1;

            //Now change the text of the current progress
            _this.tourJSCurrentProgress.text(currentIndex + 1);


            //Assign the new currentActiveElement
            currentActiveElement = $(elementsWithTheClassName[currentIndex]);

            //Now, add the currentStepClass class to the current active element
            currentActiveElement.addClass(_this.currentStepClass);
            _this.placeToolTip();
            return;
        }
        _this.stop();
       }
}

var tourJS = new _tourJS();