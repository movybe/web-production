

class Config {


    localSearchCookieKey = "localSearch";
    //Sets the value of the localSearch equal to true if there is no cookie key "localSearch"
    //initialLocalSearchCookieValue = Cookies.get(defaults.localSearchCookieKey) != undefined ? Cookies.get(defaults.localSearchCookieKey) != "false" : true;
    //initialShowImagesCookieValue = Cookies.get(defaults.showImagesCookieKey) != undefined ? Cookies.get(defaults.showImagesCookieKey) != "false" : true;
    initState = {
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
            {shortName :  "olx"  , name : "olx"         ,        textColor :  'purple' , ads : [] , page : 0 , error : "" , loadMore : false , average : 0 , max : 0} ,
            {shortName :  "jiji" , name : "jiji"        ,         textColor : 'green' , ads : [] ,  page : 0 , error : "" , loadMore : false , average : 0 , max : 0} ,
            {shortName : "jumia" , name : "jumia"       ,                 textColor : 'black' , ads : [] , page : 0 , error : "" , loadMore : false , average : 0 , max : 0} ,
            {shortName : "konga" , name : "konga"       ,              textColor :  'orange' , ads : [] ,  page : 0 , error : "" , loadMore : false , average : 0 , max : 0} ,
            {shortName :  "deals" ,name : "jumia deals" ,          textColor : 'indigo' , ads : [] , page : 0 , error : "" , loadMore : false , average : 0 , max : 0}

        ] ,
        international : [
            {shortName :  "amazon"  , name : "amazon"         ,        textColor :  '#146eb4' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] ,  locations:  [] , page : 0 , error : "" , loadMore : false} ,
            {shortName :  "alibaba"  , name : "alibaba"         ,      textColor :  '#ff6a00' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] ,  locations:  [] , page : 0 , error : "" , loadMore : false} ,
            {shortName :  "walmart"  , name : "walmart"         ,      textColor :  '#79b9e7' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] ,  locations:  [] , page : 0 , error : "" , loadMore : false} ,
            {shortName :  "ebay"  , name : "ebay"         ,        textColor :  '#86b817' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] ,  locations:  [] , page : 0 , error : "" , loadMore : false} ,
            {shortName :  "bestbuy"  , name : "Best buy"         , textColor :  '#f6eb16' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] ,  locations:  [] , page : 0 , error : "" , loadMore : false} ,
        ],
        lastUpdated : "02-04-2019",
        updateOnlyAds : true
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
                console.log("wants to reset state");
                storageObject = JSON.parse(localStorage.getItem(defaults.savedState));
                let newState = {...this.initState};


                for(let key in storageObject){
                    if(key in this.initState)
                      newState[key] = storageObject[key];
                }

                if(this.initState.updateOnlyAds) newState = {...newState , locale : this.initState.locale};


                localStorage.setItem(defaults.savedState , JSON.stringify({...newState}));
                return {...newState};

        }

        return state;


    };


    mapDispatchToState = dispatch => {


        return {
            newDefaultSearchResult : state => dispatch({type : 'NEW_DEFAULT_SEARCH_RESULT' , state}) ,
            restoreState : () => dispatch({type : 'RESTORE_STATE'}) ,
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

        Application = connect(this.mapStateToProps , this.mapDispatchToState)(Application);

        ReactDOM.render(<Provider store = {store} ><Application /></Provider> , document.getElementById('form-container') , () => {


        });

    }




}

let config = new Config();























