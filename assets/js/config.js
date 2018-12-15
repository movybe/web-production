

class Config {


    localSearchCookieKey = "localSearch";
    //Sets the value of the localSearch equal to true if there is no cookie key "localSearch"
    initialLocalSearchCookieValue = Cookies.get(this.localSearchCookieKey) != undefined ? Cookies.get(this.localSearchCookieKey) != "false" : true;
    state = {
        localSearch: this.initialLocalSearchCookieValue,
        locale : [
            {shortName :  "olx"  , name : "olx"         ,       nameColor : 'purple lighten-4', textColor :  'purple' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] ,  locations:  [] , page : 0} ,
            {shortName :  "jiji" , name : "jiji"        ,       nameColor : 'green lighten-5' ,  textColor : 'green' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] , linkTexts : [] , locations : [] , page : 0 } ,
            {shortName : "jumia" , name : "jumia"       ,       nameColor : 'black' ,          textColor : 'black' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,   linkTexts : [] , locations : [] , page : 0 } ,
            {shortName : "konga" , name : "konga"       ,       nameColor : 'yellow' ,         textColor :  'orange' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] , linkTexts : [] , locations : [] , page : 0 } ,
            {shortName :  "deals" ,name : "jumia deals" ,       nameColor : 'indigo darken-1' ,   textColor : 'indigo' , titles : [] , descriptions : [] , prices : [] , images : [] , links : [] ,linkTexts : [] , locations : [] , page : 0 }
        ]
    };


    rootReducer = (state = this.state, action) => {

        switch (action.type) {
            case 'NEW_DEFAULT_SEARCH_RESULT' :
                return action.state;
                break;
        }

        return state;


    };


    mapDispatchToState = dispatch => {


        return {
            newDefaultSearchResult : state => dispatch({type : 'NEW_DEFAULT_SEARCH_RESULT' , state})

        };

    };

    mapPropsToState = (state , ownProps) => {

        return state;

    };

    constructor (){
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























