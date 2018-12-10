

//https://api.olx.com.ng/relevance/search?facet_limit=100&location_facet_limit=6&latitude=8.696492&query=samsung+galaxy+s7+edge&location=10000000000&page=2&user=165548cb5dcx2e53159d&longitude=7.300361

class Application extends React.Component{





    localSearchCookieKey = "localSearch";


    cookiesQueryKey = "queries";
    //Sets the value of the localSearch equal to true if there is no cookie key "localSearch"

    initialLocalSearchCookieValue = Cookies.get(this.localSearchCookieKey) != undefined ? Cookies.get(this.localSearchCookieKey) != "false" : true;
    state = {
        localSearch: this.initialLocalSearchCookieValue,
        locale : [
            {shortName : "jumia" , name : "jumia"       ,       nameColor : 'black' ,          textColor : 'black'} ,
            {shortName : "konga" , name : "konga"       ,       nameColor : 'yellow' ,         textColor :  'orange'} ,
            {shortName :  "olx"  , name : "olx"         ,       nameColor : 'purple lighten-4', textColor :  'purple'} ,
            {shortName :  "jiji" , name : "jiji"        ,       nameColor : 'green lighten-5' ,  textColor : 'green'} ,
            {shortName :  "deals" ,name : "jumia deals" ,       nameColor : 'indigo darken-1' ,   textColor : 'indigo'}
            ]



    };


    maxSearchResultTitleLength = 60;
    maxSearchREsultDescriptionLength = 300;
    maxSearchResultLinkLength = 100;




    //Constructor


    constructor() {
        super();

    }



    handleSearchFormSubmit = (e) => {

        e.preventDefault();


        this.searchQueryField = $('.search-query-field');
        this.replaceSearchFormText(this.searchQueryField);
        this.searchQuery = this.searchQueryField.val();

        let data = {query : this.searchQuery};
        data = JSON.stringify(data);

        let parent = this;

        $.post(this.queryProcessor , {data : data} , function (t) {

            if(Cookies.get(parent.cookiesQueryKey)){

                let cookiesObject = JSON.parse(Cookies.get(parent.cookiesQueryKey));



                if(cookiesObject.indexOf(parent.searchQuery))cookiesObject.push(parent.searchQuery);


                Cookies.set(parent.cookiesQueryKey ,JSON.stringify(cookiesObject) , {expires : 365});
            }

            else {

              Cookies.set(parent.cookiesQueryKey , JSON.stringify([parent.searchQuery] , {expires : 365}));

            }


        })

    };

    /*

    Since i want to store the value of the localSearch in the browser Cookie, once the toggle button is changed
    i reset the cookie to the new boolean value of checked

    */
    handleSearchTypeSwitch =  (e) => {

        //Sets the value of localSearch


        let checked = e.target.checked;

        this.setState({localSearch : checked} , () => {

            Cookies.set(this.localSearchCookieKey , this.state.localSearch);
        });


        // console.log(checked);



    };



    // this function replaces the search text with a new text with only english alphabets and numbers

    replaceSearchFormText =  (targetElement) => {

        var query =  targetElement.val();



        let searchQuery = query;

        {

            let searchQuery = query.replace(/[\W_ ]+/g," ");

            //Replace the value of the input field with the new value

            //Trim the value of the search input field after filtering

            targetElement.val($.trim(searchQuery));


        }

    };


    // this function replaces the search text with a new text with only english alphabets and numbers

    replaceSearchText (targetElement) {

         var query =  targetElement.value;



        let searchQuery = query;

        {

            let searchQuery = query.replace(/[\W_ ]+/g," ");

            //Replace the value of the input field with the new value

            //Trim the value of the search input field after filtering

            targetElement.value = $.trim(searchQuery);


        }

    }


    handleSearchTextChange = (e) => {

        // filter the value of the search input field

        this.replaceSearchText(e.target);




    };


    //Toggles the Switch button automatically depending on the value of the 'localSearchCookieKey' variable

    componentDidMount () {
       let  searchTypeSwitchButton = $("#search-type-switch-button");
       searchTypeSwitchButton.prop("checked" , this.state.localSearch);
        $('.tabs').tabs();

        //I want to get the auto-complete data from the cookies

        let autoCompleteData = {};

        if(Cookies.get(this.cookiesQueryKey)){
            let cookiesObj = JSON.parse(Cookies.get(this.cookiesQueryKey));
            cookiesObj.map((data) => {
                autoCompleteData[data] = null;
            });
        }


        $('input.autocomplete').autocomplete({
            limit: 7,
            data: autoCompleteData,
            // The max amount of results that can be shown at once. Default: Infinity.
            onAutocomplete: function(val) {
                // Callback function when value is autcompleted.
            },
            minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
        });


    }


    render () {
        /*
         I want to be able to store the user's default search type(whether local or Int'l)  in the browser
        * cookie
        */

        /*
        * the function below sets the initial search type according to the cookie value of 'localSearch' key
        * if the key 'localSearch' doesn't exists  int the browser cookie, then we set the value of localSearch to true

        */



        return (


            <div className="container">
                <form autoComplete="off" id="search-form" onSubmit={this.handleSearchFormSubmit} method="get" action="#">
                    <div className="input-group">
                        <div className="input-field col s12">
                            <i className="material-icons prefix"></i>
                            <input type="text" onChange={this.handleTextChange} id="autocomplete-input" className="autocomplete search-query-field" />
                            <label htmlFor="autocomplete-input">Type your keyword.</label>
                        </div>

                    </div>

                    <button type="submit" className="input-group-addon btn waves-effect waves-light left" id="search-button">Movybe Search</button>
                        <div className="switch" id="switch-container">
                            <label>

                                <input defaultChecked="false" onChange={this.handleSearchTypeSwitch} type="checkbox" id="search-type-switch-button" />
                                    <span className="lever"></span>
                                    NG
                            </label>

                    </div>

                </form>
                <LocalSearchTab locale = {this.state.locale}  />
                <div className="container" id="search-result-preloader">
                     <div className="circular-container">
                        <div className="circle circular-loader1">
                            <div className="circle circular-loader2"></div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}





    ReactDOM.render(<Application /> , document.getElementById('form-container') , () => {



    });



