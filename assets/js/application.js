

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

        e.preventDefault();
        this.formSubmitted = false;

        this.searchQuery = this.searchQueryField.val();


        if (!this.searchQuery.length) return;


        //Filters the search query
        this.replaceSearchText();

        //Spilts the words of the query into an array
        let searchQueryToArray = this.searchQuery.split(" ");

        //filters the words(i.e removes common words from the query and removes words that has more than one occurrence)
        searchQueryToArray = searchQueryToArray.filter((word, pos, self) => {
            return self.indexOf(word) === pos && defaults.commonWords.indexOf(word) < 0;
        });

        //Joins the new search query with " " to form a sentence
        this.searchQuery = searchQueryToArray.join(" ");


        let data = {query: this.searchQuery};
        data = JSON.stringify(data);


        //hide the site footer and the switch container
        this.searchResults.html(null);
        this.siteFooter.hide();
        this.searchResultPreloaders.hide();

        //blurs the search field
        $(':focus').blur();

        //disables the search form
        this.searchFormFieldSet.prop(...this.disabledFormFieldSet);

        //an array conntaining all the titles of the first search
        let validTitles = [];


        //default search website depending on the users's settings

        const q = this.searchQuery.split(" ").join("+");
        let searchFilterUrl = this.props.settings.localSearch ? `https://api.olx.com.ng/relevance/search?facet_limit=100&location_facet_limit=6&query=${q}&page=1&user=165548cb5dcx2e53159d` : `https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=${q}&page=1`;

        //let searchFilterUrl = 'http://localhost:2021/filter.php';//
        $('.' + defaults.searchResultPreloaders).hide();


        let titles;
        let html;
        let htmlContent  = '.s-result-item';
        let titleContent , descriptionContent , linkContent = '.s-access-detail-page';
        let priceContent = '.a-offscreen';
        let imageContent = '.s-access-image';
        let locationContent = '.a-spacing-none';

        $.get(defaults.crawler, {url: searchFilterUrl}, response => {

            if(this.props.settings.localSearch) {

                if (!response.contents || !response.contents.data) {
                    return this.searchFormFieldSet.prop(...this.enabledFormFieldSet) && M.toast({html: this.networkError});
                }
                else if (!response.contents.data.length) {


                    M.toast({html: this.enterValidKeywordsWarning});
                    this.searchFormFieldSet.prop(...this.enabledFormFieldSet);

                    return;

                }


                titles = response.contents.data.forEach((obj, index) => {
                    let currentTitle = obj.title.toLowerCase();
                    let currentTitleToArray = currentTitle.split(" ");
                    currentTitleToArray.forEach((word) => {
                        if (validTitles.indexOf(word) < 0) {
                            validTitles.push(word);
                        }
                    });

                });

            }

            else {
                html = $(response.contents).find(htmlContent);

                response = null;
                validTitles = [];

                if (!html.length) {
                    return this.searchFormFieldSet.prop(...this.enabledFormFieldSet) && M.toast({html: this.networkError});
                }


                response = null;

                titles = html.find(titleContent).each(() => {
                    let currentTitle = $(this).text().toLowerCase();
                    let currentTitleToArray = currentTitle.split(" ");
                    currentTitleToArray.forEach((word) => {
                        if (validTitles.indexOf(word) < 0) {
                            validTitles.push(word);
                        }
                    });

                });

            }

                    //Filter the user search query

                    searchQueryToArray = this.searchQuery.split(" ");

                    //Remove words that are not found in the list of titles from the array

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


                    $.post(defaults.queryProcessor, {data}, (t) => {


                        this.searchFormFieldSet.prop(...this.enabledFormFieldSet);


                        this.localSearchTabContainer.show();

                        this.lastSearchQuery = this.searchQuery;
                        this.switchContainer.hide();


                        this.props.locale.forEach(obj => {

                            Object.keys(obj).map(key => {

                                if (Array.isArray(obj[key])) {
                                    obj[key] = [];
                                }
                            })


                        });

                        let defaultEcommerceWebsite = this.props.settings.localSearch ? this.props.locale[0] : this.props.international[0];
                        let defaultEcommerceWebsiteShortName = defaultEcommerceWebsite.shortName;


                        if(this.props.settings.localSearch) {
                            response.contents.data.forEach(obj => {


                                defaultEcommerceWebsite.titles.push(obj.title.truncate(defaults.maxTitleLength));
                                defaultEcommerceWebsite.descriptions.push(obj.description.truncate(defaults.maxDescriptionLength));
                                defaultEcommerceWebsite.images.push(obj.images[0].url);
                                defaultEcommerceWebsite.prices.push(obj.price ? obj.price.value.raw.toLocaleString() : 0);
                                defaultEcommerceWebsite.locations.push(obj.locations_resolved.ADMIN_LEVEL_1_name);
                                defaultEcommerceWebsite.links.push('https://www.olx.com.ng/item/' + obj.title.split(" ").join("-").toLowerCase() + "-iid-" + obj.id);
                                defaultEcommerceWebsite.linkTexts.push(String('https://www.olx.com.ng/item/' + obj.title.split(" ").join("-").toLowerCase() + "-iid-" + obj.id).truncate(defaults.maxLinkLength));
                            });

                        }

                        else {

                            let title , link , description , price , location , image;

                            html.each(() => {


                                title = $(this).find(titleContent).text().truncate(defaults.maxTitleLength);
                                link = $(this).find(linkContent).attr('href');
                                description = $(this).find(descriptionContent).text();
                                price = $(this).find(priceContent).text().replace('$' , '');
                                location = $(this).find(locationContent).text();
                                image = $(this).find(imageContent).attr('srcset');

                                defaultEcommerceWebsite.titles.push(title);
                                defaultEcommerceWebsite.descriptions.push(description);
                                defaultEcommerceWebsite.prices.push(price);
                                defaultEcommerceWebsite.locations.push(location);
                                defaultEcommerceWebsite.images.push(image);
                                defaultEcommerceWebsite.linkTexts.push(link.truncate(defaults.maxLinkLength));


                            });

                        }
                        let previousLocale = this.props.settings.localSearch ?  this.props.locale : this.props.international;
                        //reset the pages to 0;
                     const action =  this.props.settings.localSearch ? this.props.locale.forEach(local => {
                            local.page = 0;
                            local.error = null;
                            local.loadMore = true;
                        }) : this.props.international.forEach(inter => {
                         inter.page = 0;
                         inter.error = null;
                         inter.loadMore = true;
                     });


                        defaultEcommerceWebsite.page += 1;
                        let savedState = this.props.settings.localSearch ? {
                            ...this.props,
                            q,
                            query: this.searchQuery,
                            locale: previousLocale,
                            currentWebsite: defaultEcommerceWebsiteShortName
                        } : {
                            ...this.props,
                            q,
                            query: this.searchQuery,
                            international: previousLocale,
                            currentWebsite: defaultEcommerceWebsiteShortName
                        } ;
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

    handleSearchTypeSwitch = (e) => {

        //Sets the value of localSearch


        let checked = e.target.checked;

        this.props.newDefaultSearchResult({
            ...this.props,
            settings: {...this.props.settings, localSearch: checked}
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


            this.loadSuggestions();



        });


    };


    defaultAction = () => {
        $('.tabs').tabs();
        $('.gallery-2 span.gallery-images-link').lightbox();

        this.searchTypeSwitchButton.prop('checked' , this.props.settings.localSearch);
        this.toggleImagesSwitch.prop('checked' , this.props.settings.showImages);
    };

    componentDidUpdate() {

        this.defaultAction();
        if (this.props.currentWebsite) {
            this.searchTabs.show();
            $('.tabs').tabs('select', this.props.currentWebsite);
            $('.tabs').tabs('updateTabIndicator');
            this.formSubmitted = true;

            $('input.autocomplete').autocomplete({
                limit: defaults.searchSuggestionsLimit,
                data: this.autoCompleteData,
                // The max amount of results that can be shown at once. Default: Infinity.
                onAutocomplete: function(val) {
                    // Callback function when value is autcompleted.
                },
                minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
            });

            this.loadSuggestions();

        }

    }

    loadSuggestions = () => {
        $('input.autocomplete').autocomplete({
            limit: defaults.searchSuggestionsLimit,
            data: this.autoCompleteData,
            // The max amount of results that can be shown at once. Default: Infinity.
            onAutocomplete: function(val) {
                // Callback function when value is autcompleted.
            },
            minLength: 1, // The minimum length of the input for the autocomplete to start. Default: 1.
        });

    };

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
        this.searchTypeSwitchButton = $("#search-type-switch-button");
        this.searchQueryField.focus();

        this.loadSuggestions();

        this.defaultAction();
        $('.dropdown-trigger').dropdown({
            alignment: 'right',
            coverTrigger: false,
            closeOnClick: false,
            container: document.getElementById(this.searchFormFieldSet.attr('id'))
        });
        //I want to get the auto-complete data from the cookies
        this.autoCompleteData = {};


        //Gets all the word typed by the user from cookie and displays in during search
        if (Cookies.get(this.cookiesQueryKey)) {
            let storageObj = JSON.parse(Cookies.get(this.cookiesQueryKey));
            storageObj.map((data) => {
                this.autoCompleteData[data] = null;
            });
        }
        if (localStorage.getItem(defaults.savedState)) {
            let storageObj = JSON.parse(localStorage.getItem(defaults.savedState));
            /* checks if a new property (key) is added to the default state as a result of updates */
            {
                //We want to count the length of savedState keys and the default state keys

                let storageObjectKeysCount , propsKeysCount = 0;
                Object.keys(storageObj).forEach(key => {
                    return typeof storageObj[key] != 'function' ? storageObjectKeysCount += 1 : null;
                });



                Object.keys(this.props).forEach(key => {
                    return typeof this.props[key] != 'function' ? propsKeysCount += 1 : null;
                });


                /*


               if there is a difference in the length of the savedState object keys
               and the length of the default state stored in the redux store,
               meaning there was a change in the source code this will trigger the automatic update of the savedState

               */
                if(storageObjectKeysCount != propsKeysCount) return this.props.resetState();
            }



            if (this.props.switchWebsite(storageObj)) {
                this.formSubmitted = true;
                this.toggleImagesSwitch.prop('checked', storageObj.settings.showImages);
                //searchTypeSwitchButton.prop('checked' , storageObj.settings.localSearch);
                if (this.props.currentWebsite != null) {
                    $('.tabs').tabs('select', this.props.currentWebsite);
                    this.formSubmitted = true;
                    this.searchTabs.show();

                }
            }

        }





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
                 <input defaultChecked={() => {return this.props.settings.localSearch}} onChange={this.handleSearchTypeSwitch} type="checkbox" id="search-type-switch-button" />
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






