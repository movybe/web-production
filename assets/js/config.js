

class Config {


    localSearchCookieKey = "localSearch";
    //Sets the value of the localSearch equal to true if there is no cookie key "localSearch"
    //initialLocalSearchCookieValue = Cookies.get(defaults.localSearchCookieKey) != undefined ? Cookies.get(defaults.localSearchCookieKey) != "false" : true;
    //initialShowImagesCookieValue = Cookies.get(defaults.showImagesCookieKey) != undefined ? Cookies.get(defaults.showImagesCookieKey) != "false" : true;
    state = {
        currentWebsite : null,
        gallery : [] ,
        settings : {localSearch: true , showImages : false} ,
        query : null ,
        q : null,
        formSubmitted : false ,
        processingAction : false,
        locale : [
            {shortName :  "olx"  , name : "olx"         ,        textColor :  'purple' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] ,  locations:  [] , page : 0 , error : "" , loadMore : false} ,
            {shortName :  "jiji" , name : "jiji"        ,         textColor : 'green' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] , linkTexts : [] , locations : [] , page : 0 , error : "" , loadMore : false} ,
            {shortName : "jumia" , name : "jumia"       ,                 textColor : 'black' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,   linkTexts : [] , locations : [] , page : 0 , error : "" , loadMore : false} ,
            {shortName : "konga" , name : "konga"       ,              textColor :  'orange' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] , linkTexts : [] , locations : [] , page : 0 , error : "" , loadMore : false} ,
            {shortName :  "deals" ,name : "jumia deals" ,          textColor : 'indigo' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] , locations : [] , page : 0 , error : "" , loadMore : false}

        ] ,
        international : [
            {shortName :  "amazon"  , name : "amazon"         ,        textColor :  '#146eb4' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] ,  locations:  [] , page : 0 , error : "" , loadMore : false} ,
            {shortName :  "alibaba"  , name : "alibaba"         ,      textColor :  '#ff6a00' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] ,  locations:  [] , page : 0 , error : "" , loadMore : false} ,
            {shortName :  "walmart"  , name : "walmart"         ,      textColor :  '#79b9e7' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] ,  locations:  [] , page : 0 , error : "" , loadMore : false} ,
            {shortName :  "ebay"  , name : "ebay"         ,        textColor :  '#86b817' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] ,  locations:  [] , page : 0 , error : "" , loadMore : false} ,
            {shortName :  "bestbuy"  , name : "Best buy"         , textColor :  '#f6eb16' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] ,  locations:  [] , page : 0 , error : "" , loadMore : false} ,
        ]
    };


    rootReducer = (state = this.state, action) => {
        let storageObject;
        switch (action.type) {
            case 'NEW_DEFAULT_SEARCH_RESULT' :
            case  'SWITCH_WEBSITE' :
                localStorage.setItem(defaults.savedState , JSON.stringify({...action.state}));
                return {...action.state};
                break;
            case 'FORM_SUBMITTED' :
                return {
                    ...state ,
                    formSubmitted : action.formSubmitted
                };
                break;

            case 'RESET_STATE' :
                storageObject = JSON.parse(localStorage.getItem(defaults.savedState));
                let newState = {...this.state , storageObject};
                localStorage.setItem(defaults.savedState , JSON.stringify(newState));
                return newState;
                break;
        }

        return state;


    };


    mapDispatchToState = dispatch => {


        return {
            newDefaultSearchResult : state => dispatch({type : 'NEW_DEFAULT_SEARCH_RESULT' , state}) ,
            resetState : () => dispatch({type : 'RESET_STATE'}) ,
            switchWebsite : state => dispatch({type : 'SWITCH_WEBSITE' , state})
        };

    };

    mapStateToProps = (state , ownProps) => {

        return state;

    };

    constructor (){
        const Provider = ReactRedux.Provider;
        let {connect} = ReactRedux;
        const {createStore} = Redux;

        const  store = createStore(this.rootReducer);

        Application = connect(this.mapStateToProps , this.mapDispatchToState)(Application);

        ReactDOM.render(<Provider store = {store} ><Application /></Provider> , document.getElementById('form-container') , () => {


        });

    }




}

let config = new Config();























