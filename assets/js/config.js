

class Config {


    localSearchCookieKey = "localSearch";
    //Sets the value of the localSearch equal to true if there is no cookie key "localSearch"
    //initialLocalSearchCookieValue = Cookies.get(defaults.localSearchCookieKey) != undefined ? Cookies.get(defaults.localSearchCookieKey) != "false" : true;
    //initialShowImagesCookieValue = Cookies.get(defaults.showImagesCookieKey) != undefined ? Cookies.get(defaults.showImagesCookieKey) != "false" : true;
    state = {
        gallery : [] ,
        settings : {localSearch: true , showImages : true} ,
        query : null ,
        q : null,
        formSubmitted : false ,
        locale : [
            {shortName :  "olx"  , name : "olx"         ,       nameColor : 'purple lighten-4', textColor :  'purple' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] ,  locations:  [] , page : 0 , error : "" , loadMore : false} ,
            {shortName :  "jiji" , name : "jiji"        ,       nameColor : 'green lighten-5' ,  textColor : 'green' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] , linkTexts : [] , locations : [] , page : 0 , error : "" , loadMore : false} ,
            {shortName : "jumia" , name : "jumia"       ,       nameColor : 'black' ,          textColor : 'black' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,   linkTexts : [] , locations : [] , page : 0 , error : "" , loadMore : false} ,
            {shortName : "konga" , name : "konga"       ,       nameColor : 'yellow' ,         textColor :  'orange' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] , linkTexts : [] , locations : [] , page : 0 , error : "" , loadMore : false} ,
            {shortName :  "deals" ,name : "jumia deals" ,       nameColor : 'indigo darken-1' ,   textColor : 'indigo' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] , locations : [] , page : 0 , error : "" , loadMore : false}

        ]
    };





    rootReducer = (state = this.state, action) => {

        switch (action.type) {
            case 'NEW_DEFAULT_SEARCH_RESULT' :
            case  'SWITCH_WEBSITE' :
                localStorage.setItem(defaults.savedState , JSON.stringify(action.state));
                return action.state;
                break;
            case 'FORM_SUBMITTED' :
                return {
                    ...state ,
                    formSubmitted : action.formSubmitted
                };
                break;

            case 'RESET_STATE' :
                return this.initState;
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

    mapPropsToState = (state , ownProps) => {

        return state;

    };

    constructor (){
        this.state.currentWebsite = this.state.locale[0].shortName;

        const Provider = ReactRedux.Provider;
        let {connect} = ReactRedux;
        const {createStore} = Redux;

        const  store = createStore(this.rootReducer);

        Application = connect(this.mapPropsToState , this.mapDispatchToState)(Application);

        ReactDOM.render(<Provider store = {store} ><Application /></Provider> , document.getElementById('form-container') , () => {


        });

    }




}

let config = new Config();























