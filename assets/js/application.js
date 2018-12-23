

//https://api.olx.com.ng/relevance/search?facet_limit=100&location_facet_limit=6&query=samsung+galaxy+s7+edge&page=1&user=165548cb5dcx2e53159d

class Application extends React.Component {

    lastSearchQuery = null;
    formSubmitted = false;
    cookiesQueryKey = "queries";
    enabledFormFieldSet = ["disabled", false];
    disabledFormFieldSet = ["disabled", true];
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


        if (!this.searchQuery.length) return;

        this.replaceSearchText();

        let searchQueryToArray = this.searchQuery.split(" ");

        searchQueryToArray = searchQueryToArray.filter((word, pos, self) => {
            return self.indexOf(word) == pos && defaults.commonWords.indexOf(word) < 0;
        });

        this.searchQuery = searchQueryToArray.join(" ");

        let data = {query: this.searchQuery};
        data = JSON.stringify(data);


        //hide the site footer and the switch container
        this.searchResults.html(null);
        this.siteFooter.hide();
        this.searchResultPreloaders.hide();
        $(':focus').blur();
        this.searchFormFieldSet.prop(...this.disabledFormFieldSet);
        let validTitles = [];


        let searchFilterUrl = `https://api.olx.com.ng/relevance/search?facet_limit=100&location_facet_limit=6&query=${this.searchQuery.split(" ").join("+")}&page=1&user=165548cb5dcx2e53159d`;


        //let searchFilterUrl = 'http://localhost:2021/filter.php';//
        // Hide the preloaders just in case

        $('.' + defaults.searchResultPreloaders).hide();

        $.get(defaults.crawler, {url: searchFilterUrl}, response => {


            if (!response.contents) {
                return this.searchFormFieldSet.prop(...this.enabledFormFieldSet) && M.toast({html: this.networkError});
            }

            else if (!response.contents.data.length) {


                M.toast({html: this.enterValidKeywordsWarning});
                this.searchFormFieldSet.prop(...this.enabledFormFieldSet);

                return;

            }


            let titles = response.contents.data.forEach((obj, index) => {
                let currentTitle = obj.title.toLowerCase();
                let currentTitleToArray = currentTitle.split(" ");
                currentTitleToArray.forEach((word) => {
                    if (validTitles.indexOf(word) < 0) {
                        validTitles.push(word);
                    }
                });

            });

            //Filter the user search query

            searchQueryToArray = this.searchQuery.split(" ");
            searchQueryToArray = searchQueryToArray.filter((word, index) => {


                return validTitles.indexOf(word) >= 0 && searchQueryToArray[index] !== searchQueryToArray[index + 1];
            });


            this.searchQuery = searchQueryToArray.join(" ");

            if (!this.searchQuery.length) {
                this.searchFormFieldSet.prop(...this.enabledFormFieldSet);
                M.toast({html: this.enterValidKeywordsWarning});
                this.formSubmitted = false;

                return;
            }


            this.searchQueryField.val(this.searchQuery);


            $.post(defaults.queryProcessor, {data: data}, (t) => {


                this.searchFormFieldSet.prop(...this.enabledFormFieldSet);


                let action = this.props.localSearch ? (this.localSearchTabContainer.show()) : null;

                this.lastSearchQuery = this.searchQuery;
                this.switchContainer.hide();


                this.props.locale.forEach(obj => {

                    Object.keys(obj).map(key => {

                        if (Array.isArray(obj[key])) {
                            obj[key] = [];
                        }
                    })


                });

                let defaultEcommerceWebsite = this.props.locale[0];
                let defaultEcommerceWebsiteShortName = defaultEcommerceWebsite.shortName;


                response.contents.data.forEach(obj => {


                    defaultEcommerceWebsite.titles.push(obj.title.truncate(defaults.maxTitleLength));
                    defaultEcommerceWebsite.descriptions.push(obj.description.truncate(defaults.maxDescriptionLength));
                    defaultEcommerceWebsite.images.push(obj.images[0].url);
                    defaultEcommerceWebsite.prices.push(obj.price ? obj.price.value.raw.toLocaleString() : 0);
                    defaultEcommerceWebsite.locations.push(obj.locations_resolved.ADMIN_LEVEL_1_name);
                    defaultEcommerceWebsite.links.push('https://www.olx.com.ng/item/' + obj.title.split(" ").join("-").toLowerCase() + "-iid-" + obj.id);
                    defaultEcommerceWebsite.linkTexts.push(String('https://www.olx.com.ng/item/' + obj.title.split(" ").join("-").toLowerCase() + "-iid-" + obj.id).truncate(defaults.maxLinkLength));
                });

                let previousLocale = this.props.locale;
                //reset the pages to 0;
                this.props.locale.forEach(local => {
                    local.page = 0;
                    local.error = null;
                    local.loadMore = true;
                });


                defaultEcommerceWebsite.page += 1;
                let savedState = {
                    ...this.props,
                    q: this.searchQuery.split(" ").join("+"),
                    query: this.searchQuery,
                    locale: previousLocale,
                    currentWebsite: defaultEcommerceWebsiteShortName
                };
                if (this.props.newDefaultSearchResult({...savedState , processingAction : false})) {

                    //Switch the tab to the default behaviour;
                    this.formSubmitted = true;
                    this.searchQueryField.blur();
                    this.searchTabs.show();

                    $('#tabs.tabs').tabs('select', defaultEcommerceWebsiteShortName);

                }

            });

        });


    };

    /*

    Since i want to store the value of the localSearch in the browser Cookie, once the toggle button is changed
    i reset the cookie to the new boolean value of checked

    */
    handleSearchTypeSwitch = (e) => {

        //Sets the value of localSearch


        let checked = e.target.checked;

        this.props.newDefaultSearchResult({
            ...this.props,
            settings: {...this.props.settings, localSearch: checked}
        }, () => {

            Cookies.set(defaults.localSearchCookieKey, this.props.settings.showImages);
        });


    };


    // this function replaces the search text with a new text with only english alphabets and numbers


    // this function replaces the search text with a new text with only english alphabets and numbers

    replaceSearchText = () => {

        let query = this.searchQueryField.val();


        let searchQuery = query;

        {

            let searchQuery = query.replace(/[\W_ ]+/g, " ");

            //Replace the value of the input field with the new value

            //Trim the value of the search input field after filtering

            this.searchQueryField.val(searchQuery);


        }

    };


    handleSearchTextChange = (e) => {

        // filter the value of the search input field

        this.searchQuery = e.target.value;
        this.replaceSearchText();


        let data = {query: this.searchQuery};
        $.post(defaults.suggestions, {data: JSON.stringify(data)}, response => {

            let resp = JSON.parse(response);


            let query = null;
            resp.suggestions.forEach(obj => {

                query = obj.query;
                if (!(query in this.autoCompleteData)) this.autoCompleteData[query] = null;
            });


        });


    };


    defaultAction = () => {
        $('.tabs').tabs();
        $('.gallery-2 span.gallery-images-link').lightbox();

    };

    componentDidUpdate() {

        this.defaultAction();
        if (this.props.currentWebsite) {
            this.searchTabs.show();
            $('.tabs').tabs('select', this.props.currentWebsite);
            $('.tabs').tabs('updateTabIndicator');
            this.formSubmitted = true;


        }

    }

    //Toggles the Switch button automatically depending on the value of the 'localSearchCookieKey' variable

    componentDidMount() {
        this.localSearchTabContainer = $('#local-search-tab-container');
        this.searchTabs = $('.search-tabs');
        this.toggleImagesSwitch = $('#toggle-search-images');
        this.searchQueryField = $('.search-query-field');

        this.switchContainer = $('#switch-container');
        this.searchResults = $(".search-results");
        this.searchResultPreloaders = $('.search-result-preloaders');
        this.searchFormFieldSet = $('#search-form-fieldset');
        this.siteFooter = $('#site-footer');

        this.lastSearchQuery = this.searchQueryField.val().toLowerCase();
        let searchTypeSwitchButton = $("#search-type-switch-button");
        this.searchQueryField.focus();


        this.defaultAction();
        $('.dropdown-trigger').dropdown({
            alignment: 'right',
            coverTrigger: false,
            closeOnClick: false,
            container: document.getElementById(this.searchFormFieldSet.attr('id'))
        });
        //I want to get the auto-complete data from the cookies
        this.autoCompleteData = {};

        if (Cookies.get(this.cookiesQueryKey)) {
            let cookiesObj = JSON.parse(Cookies.get(this.cookiesQueryKey));
            cookiesObj.map((data) => {
                this.autoCompleteData[data] = null;
            });
        }
        if (localStorage.getItem(defaults.savedState)) {
            let cookieObj = JSON.parse(localStorage.getItem(defaults.savedState));
            if (this.props.switchWebsite(cookieObj)) {//Action};

                this.formSubmitted = true;
                this.toggleImagesSwitch.prop('checked', cookieObj.settings.showImages);
                if (this.props.currentWebsite != null) {
                    $('.tabs').tabs('select', this.props.currentWebsite);
                    this.formSubmitted = true;
                    this.searchTabs.show();

                }
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

     toggleShowSearchImages = (e) => {
         let checked = e.target.checked;

         let savedState = {...this.props, settings: {...this.props.settings, showImages: checked}};


         this.props.switchWebsite(savedState);

     };

    render () {
        /*
         I want to be able to store the user's default search type(whether local or Int'l)  in the browser
        * cookie
        */

        /*
        * the function below sets the initial search type according to the cookie value of 'localSearch' key
        * if the key 'localSearch' doesn't exists  int the browser cookie, then we set the value of localSearch to true

        */


        const {gallery} = this.props;
        const images = gallery.map(image => {

            return <span key={Math.random()} className="gallery-images-link" href={image.src} data-caption = {image.alt}></span>
        });

        const linkToSavedGallery = gallery.length ?

            <li><span className="gallery-2"><span className="gallery-images-link your-gallery" href={gallery[gallery.length -1].src} data-caption ={`<a href = '${gallery[gallery.length -1].link}'>${gallery[gallery.length -1].alt}</a>`}><i className="tiny material-icons search-image-icons">image</i> Your gallery</span></span><Gallery /></li> : null;

        return (


            <div>
            <fieldset id = "search-form-fieldset">
                <form autoComplete="off" id="search-form" onSubmit={this.handleSearchFormSubmit} method="get" action="#">
                    <div className="input-group">
                        <div className="input-field col s12">
                            <i className="material-icons prefix"></i>
                            <input  onBlur={() => {


                                if(this.lastSearchQuery === $.trim(this.searchQueryField.val().toLowerCase()) || this.formSubmitted){

                                    this.searchTabs.show();

                                }


                            }} onFocus={() => {this.searchTabs.hide();}  } type="text" defaultValue = {this.props.query ? this.props.query : ""} onChange={this.handleSearchTextChange} id="autocomplete-input" className="autocomplete search-query-field" />
                            <label htmlFor="autocomplete-input">What do you want to buy?</label>
                        </div>

                    </div>

                            <button type="submit" className="input-group-addon btn waves-effect waves-light left" id="search-button">Movybe Search</button>

                    <a className='dropdown-trigger btn-floating btn-large blue' href='#' data-target='settings-dropdown' id="settings-drop-down-link">More<span className="material-icons small" id="settings-more-icon">arrow_drop_down</span></a>

    <ul id='settings-dropdown' className='dropdown-content'>
        <li><a href="#" id="download-apk-link"><span className="small material-icons app-download-icon">vertical_align_bottom</span> Download APK</a></li>
        <li className="divider" tabIndex="-1"></li>

        <li id="local-search-setting">
             <div className="switch">

             <label>

                 <span id="local-search-text" className="settings-text">Local Search</span>
                 <input className="tooltipped"  defaultChecked={true} onChange={this.handleSearchTypeSwitch} type="checkbox" id="search-type-switch-button" />
                 <span className="lever"></span>
                  </label>
             </div>
         </li>
        <li className="divider" tabIndex="-1"></li>

        <li id="local-search-setting">
            <div className="switch">

                <label>

        <span id="show-images-text" className="settings-text">Show images</span>
        <input  defaultChecked={() => {return this.props.settings.showImages}}  onChange={this.toggleShowSearchImages} type="checkbox" id="toggle-search-images" />
        <span className="lever toggle-search-images"></span>
                </label>
            </div>
        </li>
        <li className="divider" tabIndex="-1"></li>
        {linkToSavedGallery}
    </ul>


                </form>
</fieldset>
                <LocalSearchTab  />


            </div>
        )

    }

}






