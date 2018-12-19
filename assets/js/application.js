

//https://api.olx.com.ng/relevance/search?facet_limit=100&location_facet_limit=6&query=samsung+galaxy+s7+edge&page=1&user=165548cb5dcx2e53159d

class Application extends React.Component{
    
    lastSearchQuery = null;
    formSubmitted = false;
    cookiesQueryKey = "queries";
    enabledFormFieldSet = ["disabled" , false];
    disabledFormFieldSet = ["disabled" , true];
    lastSearchedQueryKey = "lastSearchedQuery";
    enterValidKeywordsWarning = "Please enter valid keyword(s)";
    networkError = "failed to receive response, check your network connection";


    constructor() {
        super();
    }



    handleSearchFormSubmit = (e) => {

        this.formSubmitted = false;
        e.preventDefault();

        this.searchQuery = this.searchQueryField.val();



        if(!this.searchQuery.length) return;

        this.replaceSearchText();

        let searchQueryToArray = this.searchQuery.split(" ");

        searchQueryToArray = searchQueryToArray.filter((word, pos, self) => {
            return self.indexOf(word) == pos && defaults.commonWords.indexOf(word) < 0;
        });

        this.searchQuery = searchQueryToArray.join(" ");

        let data = {query : this.searchQuery};
        data = JSON.stringify(data);


        //hide the site footer and the switch container
        this.searchResults.html(null);
        this.siteFooter.hide();
        this.searchResultPreloaders.hide();
        $(':focus').blur();
        this.searchFormFieldSet.prop(...this.disabledFormFieldSet);
        let validTitles = [];






            let searchFilterUrl = `https://api.olx.com.ng/relevance/search?facet_limit=100&location_facet_limit=6&query=${this.searchQuery.split(" ").join("+")}&page=1&user=165548cb5dcx2e53159d`;


//            let searchFilterUrl = 'http://localhost:2021/filter.php';//
            // Hide the preloaders just in case

            $('.' + defaults.searchResultPreloaders).hide();

            $.get(defaults.crawler , {url : searchFilterUrl} , response => {

                console.log(searchFilterUrl);

                if(!response.contents){
                    return this.searchFormFieldSet.prop(...this.enabledFormFieldSet) && M.toast({html: this.networkError});
                }

                else if(!response.contents.data.length) {


                            M.toast({html: this.enterValidKeywordsWarning});
                            this.searchFormFieldSet.prop(...this.enabledFormFieldSet);

                            return;

                }


                let titles = response.contents.data.forEach((obj , index) => {
                    let currentTitle = obj.title.toLowerCase();
                    let currentTitleToArray = currentTitle.split(" ");
                    currentTitleToArray.forEach((word) => {
                        if(validTitles.indexOf(word) < 0){
                            validTitles.push(word);
                        }
                    });

                });

                //Filter the user search query

                searchQueryToArray = this.searchQuery.split(" ");
                searchQueryToArray =  searchQueryToArray.filter((word , index) => {


                    return validTitles.indexOf(word) >= 0 &&  searchQueryToArray[index] != searchQueryToArray[index + 1];
                });


                this.searchQuery = searchQueryToArray.join(" ");

                if(!this.searchQuery.length) {
                    this.searchFormFieldSet.prop(...this.enabledFormFieldSet);
                    M.toast({html: this.enterValidKeywordsWarning});
                    this.formSubmitted = false;

                    return;
                }


                this.searchQueryField.val(this.searchQuery);


                $.post(defaults.queryProcessor , {data : data} , (t) => {

                    if(Cookies.get(this.cookiesQueryKey)){

                        let cookiesObject = JSON.parse(Cookies.get(this.cookiesQueryKey));



                        if(cookiesObject.indexOf(this.searchQuery))cookiesObject.push(this.searchQuery);


                        Cookies.set(this.cookiesQueryKey ,JSON.stringify(cookiesObject) , {expires : 365});
                    }

                    else {

                        Cookies.set(this.cookiesQueryKey , JSON.stringify([this.searchQuery] , {expires : 365}));

                    }

                    Cookies.set(this.lastSearchedQueryKey , this.searchQuery , {expires : 7});


                    this.searchFormFieldSet.prop(...this.enabledFormFieldSet);
                    $(':focus').blur();
                    let action = this.props.localSearch ? (this.localSearchTabContainer.show()) : null;
                    this.formSubmitted = true;

                    this.lastSearchQuery = this.searchQuery;
                    this.switchContainer.hide();


                    this.props.locale.forEach( obj => {

                        Object.keys(obj).map(key => {

                            if(Array.isArray(obj[key])){
                                obj[key] = [];
                            }
                        })


                    });

                    let defaultEcommerceWebsite = this.props.locale[0];
                    let defaultEcommerceWebsiteShortName  = defaultEcommerceWebsite.shortName;





                    response.contents.data.forEach(obj => {

                        defaultEcommerceWebsite.titles.push(obj.title.truncate(defaults.maxTitleLength));
                        defaultEcommerceWebsite.descriptions.push(obj.description.truncate(defaults.maxDescriptionLength));
                        defaultEcommerceWebsite.images.push(obj.images[0].url);
                        defaultEcommerceWebsite.prices.push(obj.price.value.raw.toLocaleString());
                        defaultEcommerceWebsite.locations.push(obj.locations_resolved.ADMIN_LEVEL_1_name);
                        defaultEcommerceWebsite.links.push('https://www.olx.com.ng/item/' + obj.title.split(" ").join("-").toLowerCase() + "-iid-" + obj.id);
                        defaultEcommerceWebsite.linkTexts.push(String('https://www.olx.com.ng/item/' + obj.title.split(" ").join("-").toLowerCase() + "-iid-" + obj.id).truncate(defaults.maxLinkLength));
                                            });

                    let previousLocale = this.props.locale;
                    //reset the pages to 0;
                    this.props.locale.forEach(local => {
                       local.page =0;
                       local.error = null;
                    });


                    defaultEcommerceWebsite.page += 1;
                    let savedState = {...this.props , q : this.searchQuery.split(" ").join("+") , query : this.searchQuery , locale : previousLocale , currentWebsite : defaultEcommerceWebsiteShortName};

                    localStorage.setItem(defaults.savedState , JSON.stringify(savedState));

                    if(this.props.newDefaultSearchResult(savedState)){

                        //Switch the tab to the default behaviour;
                        $('#tabs.tabs').tabs('select', defaultEcommerceWebsiteShortName);

                    }
                    
                });
                
            });






       
    };

    /*

    Since i want to store the value of the localSearch in the browser Cookie, once the toggle button is changed
    i reset the cookie to the new boolean value of checked

    */
    handleSearchTypeSwitch =  (e) => {

        //Sets the value of localSearch


        let checked = e.target.checked;

        this.setState({localSearch : checked} , () => {

            Cookies.set(this.localSearchCookieKey , this.props.localSearch);
        });


        // console.log(checked);



    };



    // this function replaces the search text with a new text with only english alphabets and numbers

    
    // this function replaces the search text with a new text with only english alphabets and numbers

    replaceSearchText =  () => {

         let query =  this.searchQueryField.val();



        let searchQuery = query;

        {

            let searchQuery = query.replace(/[\W_ ]+/g," ");

            //Replace the value of the input field with the new value

            //Trim the value of the search input field after filtering

            this.searchQueryField.val(searchQuery);


        }

    };


    handleSearchTextChange = (e) => {

        // filter the value of the search input field

        this.searchQuery = e.target.value;
        this.replaceSearchText();


        let data = {query : this.searchQuery};
        $.post(defaults.suggestions , {data : JSON.stringify(data)} , response => {

            let resp = JSON.parse(response);


            let query = null;
            resp.suggestions.forEach(obj => {

                query = obj.query;
                if(!(query in this.autoCompleteData)) this.autoCompleteData[query] = null;
            });




        });






    };


    //Toggles the Switch button automatically depending on the value of the 'localSearchCookieKey' variable

    componentDidMount () {
        console.log(this.props);
        this.switchContainer = $('#switch-container');
        this.searchTabs = $('.search-tabs');
        this.localSearchTabContainer = $('#local-search-tab-container');
        this.searchResults = $(".search-results");
        this.searchResultPreloaders = $('.search-result-preloaders');
        this.searchFormFieldSet = $('#search-form-fieldset');
        this.siteFooter = $('#site-footer');

        this.searchQueryField = $('.search-query-field');
        this.lastSearchQuery = this.searchQueryField.val().toLowerCase();
        let  searchTypeSwitchButton = $("#search-type-switch-button");
        this.searchQueryField.focus();

       searchTypeSwitchButton.prop("checked" , this.props.localSearch);

        $('.tabs').tabs();

        //I want to get the auto-complete data from the cookies

        this.autoCompleteData = {};

        if(Cookies.get(this.cookiesQueryKey)){
            let cookiesObj = JSON.parse(Cookies.get(this.cookiesQueryKey));
            cookiesObj.map((data) => {
                this.autoCompleteData[data] = null;
            });
        }

        if(localStorage.getItem(defaults.savedState)) {
            let cookieObj = JSON.parse(localStorage.getItem(defaults.savedState));
            if (this.props.switchWebsite(cookieObj)) {//Action};
                this.formSubmitted = true;
                $('#local-search-tab-container').css('display' , 'block');
                $('.tabs').tabs();

            }
        }

        $('input.autocomplete').autocomplete({
            limit: 7000,
            data: this.autoCompleteData,
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


            <div>
            <fieldset id = "search-form-fieldset">
                <form autoComplete="off" id="search-form" onSubmit={this.handleSearchFormSubmit} method="get" action="#">
                    <div className="input-group">
                        <div className="input-field col s12">
                            <i className="material-icons prefix"></i>
                            <input onBlur={() => {

                                this.switchContainer.hide();
                                if(this.lastSearchQuery == $.trim(this.searchQueryField.val().toLowerCase()) && this.formSubmitted == true){

                                    this.searchTabs.show();

                                }

                                else {
                                    this.switchContainer.show();
                                }
                            }} onFocus={() => {this.switchContainer.show(); this.searchTabs.hide();  }} type="text" defaultValue = {Cookies.get(this.lastSearchedQueryKey) ? Cookies.get(this.lastSearchedQueryKey) : ""} onChange={this.handleSearchTextChange} id="autocomplete-input" className="autocomplete search-query-field" />
                            <label htmlFor="autocomplete-input">What do you want to buy?</label>
                        </div>

                    </div>

                        <div className="switch" id="switch-container">
                            <button type="submit" className="input-group-addon btn waves-effect waves-light left" id="search-button">Movybe Search</button>
<div id="main-switch">
                            <label>

                                <input className="tooltipped" data-position="bottom" defaultChecked="false" onChange={this.handleSearchTypeSwitch} type="checkbox" id="search-type-switch-button" data-tooltip ="Hey, watch where you're going"/>
                                    <span className="lever"></span>
                                    NG
                            </label>
</div>
                    </div>

                </form>
</fieldset>
                <LocalSearchTab  />


            </div>
        )

    }

}






