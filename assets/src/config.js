
$(function()
{
    $('.gallery span.modal-link').lightbox();
    $('.gallery-2 span.gallery-images-link').lightbox();
    // If you want seperate galleries on the same page
    // just specify different class names.
    //$('.gallery-2 a').lightbox();

});

class Config {


    localSearchCookieKey = "localSearch";
    //Sets the value of the localSearch equal to true if there is no cookie key "localSearch"
    //initialLocalSearchCookieValue = Cookies.get(defaults.localSearchCookieKey) != undefined ? Cookies.get(defaults.localSearchCookieKey) != "false" : true;
    //initialShowImagesCookieValue = Cookies.get(defaults.showImagesCookieKey) != undefined ? Cookies.get(defaults.showImagesCookieKey) != "false" : true;
    initState = {
        queryParameterString : 'q',
        defaultBackup : "konga" ,
        noDefaultResultsFound: false,
        currentWebsite : null,
        gallery : [] ,
        settings : {localSearch: true , showImages : false} ,
        query : null ,
        q : null,
        formSubmitted : false ,
        processingAction : false,
        locale : [
            {shortName : "olist" , name : "olist"        ,         textColor : 'blue' , ads : [] ,  page : 0 , error : "" , loadMore : false , average : 0 , max : 0 , lastSortedPage : 0 , shownSponsoredAds : false} ,
            {shortName : "konga" , name : "konga"       ,              textColor :  'orange' , ads : [] ,  page : 0 , error : "" , loadMore : false , average : 0 , max : 0 , lastSortedPage : 0, shownSponsoredAds : false} ,
            {shortName : "jumia" , name : "jumia"       ,                 textColor : 'black' , ads : [] , page : 0 , error : "" , loadMore : false , average : 0 , max : 0 , lastSortedPage : 0 , shownSponsoredAds : false} ,
            {shortName :  "habari" , name : "habari"         ,        textColor :  'tomato' , ads : [] , page : 0 , error : "" , loadMore : false , average : 0 , max : 0 , lastSortedPage : 0 , shownSponsoredAds : false} ,
            {shortName :  "deals" ,name : "jumia deals" ,          textColor : 'indigo' , ads : [] , page : 0 , error : "" , loadMore : false , average : 0 , max : 0 , lastSortedPage : 0, shownSponsoredAds : false}

        ] ,
        international : [
            {shortName :  "amazon"  , name : "amazon"         ,        textColor :  '#146eb4' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] ,  locations:  [] , page : 0 , error : "" , loadMore : false} ,
            {shortName :  "alibaba"  , name : "alibaba"         ,      textColor :  '#ff6a00' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] ,  locations:  [] , page : 0 , error : "" , loadMore : false} ,
            {shortName :  "walmart"  , name : "walmart"         ,      textColor :  '#79b9e7' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] ,  locations:  [] , page : 0 , error : "" , loadMore : false} ,
            {shortName :  "ebay"  , name : "ebay"         ,        textColor :  '#86b817' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] ,  locations:  [] , page : 0 , error : "" , loadMore : false} ,
            {shortName :  "bestbuy"  , name : "Best buy"         , textColor :  '#f6eb16' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] ,  locations:  [] , page : 0 , error : "" , loadMore : false} ,
        ],
        sponsoredAdsClicked : [] ,
        lastUpdated : /*dd-mm-yyyy HH:MM*/ "07-09-2019 19:51",
        updateOnlyAds : true,
        sponsoredAds : [],
    };


    rootReducer = (state = this.initState, action) => {
        let storageObject;
        switch (action.type) {
            case 'NEW_DEFAULT_SEARCH_RESULT' :
            case  'SWITCH_WEBSITE' :
                localStorage.setItem(defaults.savedState , JSON.stringify({...action.state}));
                return {...action.state};

            case 'FORM_SUBMITTED' :
                return {
                    ...state ,
                    formSubmitted : action.formSubmitted
                };

            case 'RESTORE_STATE' :
                storageObject = JSON.parse(localStorage.getItem(defaults.savedState));
                let newState = {...this.initState};


                if(!action.restoreAll) {
                    for (let key in storageObject) {
                        if (key in this.initState)
                            newState[key] = storageObject[key];
                    }
                }


                if(this.initState.updateOnlyAds) newState = {...newState , locale : this.initState.locale};

                localStorage.clear();
                localStorage.setItem(defaults.savedState , JSON.stringify({...newState}));
                return {...newState};

        }

        return state;


    };


    mapDispatchToState = dispatch => {


        return {
            newDefaultSearchResult : state => dispatch({type : 'NEW_DEFAULT_SEARCH_RESULT' , state}) ,
            restoreState : (restoreAll = false) => dispatch({type : 'RESTORE_STATE' , restoreAll}) ,
            switchWebsite : state => dispatch({type : 'SWITCH_WEBSITE' , state})
        };

    };

    mapStateToProps = (state , ownProps) => {

        return state;

    };

    constructor (){

        const {Provider , connect} = ReactRedux;

        const {createStore} = Redux;
        const  store = createStore(this.rootReducer);

        const App = connect(this.mapStateToProps , this.mapDispatchToState)(Application);

        ReactDOM.render(<Provider store = {store} ><App /></Provider> , document.getElementById('form-container'));

    }
}

let config = new Config();
























