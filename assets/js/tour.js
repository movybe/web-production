function _tourJS()
{
    var _this = this;

    var offset, height, width,  top , right , currentActiveElement;


    this.minScreenSize = 994;
    var start = window.screen.width >= _this.minScreenSize;

    var started = false;
    this.tourJSClassName = '.tourJS';
    this.overlayEffectClassName = this.tourJSClassName+'.overlay-effect';
    this.overlayClassName = 'overlay';
    this.stepAttribute = 'data-step';
    this.currentStepClass = 'current-step';
    this.tourJSTooltip = '#tourJS-tooltip';
    this.captionAttribute = 'data-caption';
    this.tourJSCaptiponText = '#tourJS-caption-text';
    this.tourJSNextTooltip = '#tourJS-next-tooltip';

    //Let the current index = 0
    var currentIndex = 0 , elementsWithTheClassName = [];

    var performWidowsOnResizeAction = false;
    var currentClassName = "" , firstOccurrenceClass = "" , classes = [];
    currentIndex = 0;

    _this.mainStart = function mainStart () {
        $(window).resize(function () {

            start = window.screen.width >= _this.minScreenSize;

            if(!start) _this.stop();
        });

    };
    _this.start = function _start(className) {

        _this.mainStart();

        if(!start) return;

        //Indicate that tourJS has started
        if(!started) started = true;


        //Get the class, and store all those elements in an array
        $(_this.tourJSClassName + '.' + className).each(
            function () {


                //Push each of those elements into the "elementsWithTheClassName" array

                //This gives us the className of this particular element
                currentClassName = '.' + $.trim($(this).attr('class')).split(/\s+/).join('.');


                //Add this particular class to the classes array if it doesn't already exist
                if(!defaults.inArray(currentClassName , classes)){
                    classes.push(currentClassName);
                    elementsWithTheClassName.push($(this));
                }


        });

        //Then sort the elements according to their "data-step" attribute value
        elementsWithTheClassName.sort(function (a , b) {
            return parseInt($(a).attr(_this.stepAttribute)) - parseInt($(b).attr(_this.stepAttribute));
        });


        //Add an overlay
        $(_this.overlayEffectClassName).addClass(_this.overlayClassName);
        //Make the element visible

        currentActiveElement = $(elementsWithTheClassName[currentIndex]);
        currentActiveElement.addClass(_this.currentStepClass);

        _this.placeToolTip();


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
        //Get the elements that has that class so you'd be able to move step by step
        elementsWithTheClassName = [];

        currentClassName = ""; firstOccurrenceClass = ""; classes = []; elementsWithTheClassName = [];
        currentIndex = 0; currentActiveElement = "";
    };
       _this.placeToolTip = function placeToolTip() {

           offset = currentActiveElement.offset();
           height = currentActiveElement.height();
           width  = currentActiveElement.width();
           top = offset.top + 10 + height + "px";
           right = offset.left + width + "px";


           $(_this.tourJSTooltip).css( {
               'position': 'absolute',
               'top': top ,
               'display' : 'block',
               'left' : offset.left,
                'width' : width
           });


           $(_this.tourJSCaptiponText).text(currentActiveElement.attr(_this.captionAttribute));

           $(_this.tourJSNextTooltip).on('click' , _this.next);
           //Scroll page to the bottom of the tooltip
           document.getElementById($(_this.tourJSTooltip).attr('id')).scrollIntoView(false);

       };

       _this.next = function next() {
           //Check if there is a next element

           console.log("Previous index : " , currentIndex);

           if(elementsWithTheClassName[currentIndex + 1])
        {
            //Increment the currentIndex variable
            currentIndex = currentIndex + 1;
            //Remove the currentActiveElement class from the current active element
            currentActiveElement.removeClass(_this.currentStepClass);

            //Assign the new currentActiveElement
            currentActiveElement = $(elementsWithTheClassName[currentIndex]);

            //Now, add the currentActiveElementClass to the current active element

            currentActiveElement.addClass(_this.currentStepClass);

            _this.placeToolTip();
            return;
        }
        _this.stop();


       }
}

var tourJS = new _tourJS();