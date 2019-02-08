


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


    switchToWebsite = (website , /* not event necessary */ index = 0 , /* if the user clicks on load more button */
                       loadMore = false , /* if the default E-commerce website doesn't return any result*/backup = false) => {





        // here i want to find the E-commerce website object from the props using the "website" parameter
        let selectedEcommerce = this.props.locale.find((local  , pos)=> {
                index = pos;

                // if the current E-commerce shortName is equal to the "website" parameter sent to the function
                return local.shortName === website;
            }
        );


        /*

        The function below warns the user of two possible error outcomes:

        1. a network Error, meaning that there was no response at all from the server
        2. a result Error , ,meaning that the search query did not return any result

        */

        const showError = (networkError = true) => {
            selectedEcommerce.error = defaults.noDataError;
            selectedEcommerce.page = selectedEcommerce.page + 1;

            selectedEcommerce.loadMore = false;
            this.props.locale[index] = selectedEcommerce;

            if (this.props.switchWebsite({...this.props, processingAction : false , locale: this.props.locale, currentWebsite: website})) {




                return networkError ?  M.toast({html: defaults.networkError}) :  M.toast({html: this.enterValidKeywordsWarning});

            }
        };

        /*


        query : "samsung galaxy s7 edge"
        q : "samsung+galaxy+s7+edge" //default query type for most modern E-commerce websites


         */

        const {query , q} = this.props;

        //increments the pageNumber so that it can pass it to the search url
        // e.g if the previous page for olx = 1
        // the new page number becomes 2
        // the new value (which is 2) is then parsed to the search url of the website
        let pageNumber = selectedEcommerce.page + 1;

        /*
        Check if this tab had already been clicked , meaning content has either loaded or is still loading
        to prevent this function from being recursive
        */

        if(!loadMore && selectedEcommerce.page > 0 && !backup){
            /*
            Since the user had clicked on this current tab
            if the "currentWebsite" property of the store is not equal to
            the "website" paramater, set the "currentWebsite" key of the state
            to the parameter "website";
         */

            if(this.props.currentWebsite !== website){
                this.props.switchWebsite({...this.props , currentWebsite : website});
            }

            //Then,  return to prevent a recursion of this function
            return ;
        }







        /*
        Sets the "currentWebsite" key of the props to the "website" parameter an sets processingAction = true in the props

        just in case this action fails it should return {just in case (~_~) }

        */
        if(!this.props.switchWebsite({...this.props , processingAction:  true , currentWebsite : website})) return;




        /*

        Resets all the arrays of the selected E-commerce website
        so that new titles , descriptions , prices , images will be replaced with new ones
        */
        if(!backup && !this.props.noDefaultResultsFound) {
            if (!loadMore) {

                Object.keys(selectedEcommerce).map(key => {

                    return Array.isArray(selectedEcommerce[key]) ? selectedEcommerce[key] = [] : null;

                });
            }

            else {
                Object.keys(selectedEcommerce).map(key => {

                    return Array.isArray(selectedEcommerce[key]) ? selectedEcommerce[key] = [...selectedEcommerce[key]] : null;

                });
            }
        }




        let savedState = {};
        const  defaultAction = () => {
            if(this.props.switchWebsite({...savedState , processingAction: false})) return




        };

        switch (website) {
            case 'jiji' :

                let url = `https://jiji.ng/search?query=${q}&page=${pageNumber}`;


                $.get(defaults.crawler , {url} , response => {

                    let html;
                    try{
                        html = $(response.contents).find('.b-list-advert__template');
                    }
                    catch (e) {
                        showError();
                    }


                    if(!html.length) return showError();




                    //Clearing some memory
                    response = null;


                    {
                        let ad;
                        let counter = 0;


                        html.each(function (index) {
                            ad = {title : null , description : null , price : null , image : null , link : null, linkText : null , location : null};

                            ad.title = $.trim($(this).find('.qa-advert-title.js-advert-link').text()).truncate(defaults.maxTitleLength);
                            ad.description = $.trim($(this).find('.b-list-advert__item-description-text').text()).truncate(defaults.maxDescriptionLength);
                            ad.price = $.trim($(this).find('.b-list-advert__item-price').text().replace( /^\D+/g, '')).toLocaleString();
                            ad.link = $(this).find('.js-advert-link').attr('href');
                            ad.image = $(this).find('.b-list-slider__sub-img').eq(0).attr('data-img') || $(this).find('img').attr('data-src') || $(this).find('img').attr('src');
                            ad.location = $(this).find('.b-list-advert__item-region').text();
                            ad.linkText = ad.link.truncate(defaults.maxLinkLength);
                            selectedEcommerce.ads.push(ad);

                        });

                        selectedEcommerce.page += 1;

                        this.props.locale[index] = selectedEcommerce;
                        let previousLocale = this.props.locale;


                        savedState = {...this.props , locale : previousLocale , currentWebsite : website};

                        defaultAction();


                    }


                });
                break;
            case 'jumia' :

                url = `https://www.jumia.com.ng/catalog/?q=${q}&page=${pageNumber}`;


                //url = "http://localhost:2021/jumia.php";
                $.get(defaults.crawler , {url} , response => {

                    let html;

                    try{
                        html = $(response.contents).find('.sku.-gallery');

                    }
                    catch (e) {
                        return showError();
                    }


                    if(!html.length) return showError();



                    response = null;


                    {
                        let title;
                        let description;
                        let image;
                        let price;
                        let ad;
                        //let location;
                        let link;
                        html.each(function (index) {

                            ad = {title : null , description : null , price : null , image : null , link : null, linkText : null , location : null};

                            title = $.trim($(this).find('.name').text()).truncate(defaults.maxTitleLength);
                            description = $.trim($(this).find('.name').text()).truncate(defaults.maxDescriptionLength);
                            image = $.trim($(this).find('.lazy.image').attr('data-src'));
                            price = $.trim($(this).find('.price').first().text().replace(/^\D+/g, '')).toLocaleString();
                            link = $(this).find('.link').attr('href');

                            //location = $(this).find('.b-list-advert__item-region').text();
                            if(title !== "") {
                                ad.title = title;
                                ad.description = description;
                                ad.image = image;
                                ad.price = price;
                                ad.link = link;
                                ad.location = "";
                                ad.linkText =link.truncate(defaults.maxLinkLength);

                                selectedEcommerce.ads.push(ad);
                            }
                        });

                        selectedEcommerce.page += 1;

                        this.props.locale[index] = selectedEcommerce;
                        let previousLocale = this.props.locale;
                        savedState = {...this.props , locale : previousLocale , currentWebsite : website};

                        defaultAction();
                    }

                });



                break;
            case 'konga' :

                url = "https://b9zcrrrvom-3.algolianet.com/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.30.0%3Breact-instantsearch%205.3.2%3BJS%20Helper%202.26.1&x-algolia-application-id=B9ZCRRRVOM&x-algolia-api-key=cb605b0936b05ce1a62d96f53daa24f7";
                let postData = {"requests":[{"indexName":"catalog_store_konga","params":`query=${query.replace(" " , "%20")}&maxValuesPerFacet=50&page=${pageNumber}&highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&facets=%5B%22special_price%22%2C%22attributes.brand%22%2C%22attributes.screen_size%22%2C%22attributes.ram_gb%22%2C%22attributes.sim%22%2C%22attributes.sim_slots%22%2C%22attributes.capacity%22%2C%22attributes.battery%22%2C%22attributes.connectivity%22%2C%22attributes.hard_drive%22%2C%22attributes.internal%22%2C%22attributes.tv_screen_size%22%2C%22attributes.operating_system%22%2C%22attributes.kids_shoes%22%2C%22attributes.heel_type%22%2C%22attributes.heel_height%22%2C%22attributes.leg_width%22%2C%22attributes.fastening%22%2C%22attributes.shirt_size%22%2C%22attributes.shoe_size%22%2C%22attributes.lingerie_size%22%2C%22attributes.pants_size%22%2C%22attributes.size%22%2C%22attributes.color%22%2C%22attributes.mainmaterial%22%2C%22konga_fulfilment_type%22%2C%22is_pay_on_delivery%22%2C%22is_free_shipping%22%2C%22pickup%22%2C%22categories.lvl0%22%5D&tagFilters=&ruleContexts=%5B%22%22%5D`}]};


                $.post(url , JSON.stringify(postData) , response => {


                    if(!response.results) return showError();
                    if(!response.results.length) return showError(false);


                    let resultObject  =  response.results[0].hits;
                    const titlesArray = [];

                    resultObject.forEach(obj => titlesArray.push(obj.name));


                    //Check if Konga is used as a backup search result website and filter the titles if so
                    let filterAction = backup ? this.filterTitles(titlesArray) : null;


                    let ad;




                    let specialPrice;
                    resultObject.forEach(obj => {
                        ad = {title : null , description : null , price : null , image : null , link : null, linkText : null , location : null};
                        ad.title = obj.name.truncate(defaults.maxTitleLength);
                        ad.description = obj.description.truncate(defaults.maxDescriptionLength);
                        ad.image = "https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product" + obj.image_thumbnail_path;

                        specialPrice = obj.special_price || obj.price;
                        ad.price = specialPrice.toLocaleString();
                        ad.location = "";

                        ad.link = 'https://konga.com/product/' + obj.url_key;
                        ad.linkText = ('https://konga.com/product/' + obj.url_key).truncate(defaults.maxLinkLength);
                        selectedEcommerce.ads.push(ad);


                    });




                    selectedEcommerce.page += 1;

                    this.props.locale[index] = selectedEcommerce;
                    let previousLocale = this.props.locale;
                    savedState = {...this.props , locale : previousLocale , currentWebsite : website};



                    defaultAction();

                });
                break;
            case 'deals' :
                url = `https://deals.jumia.com.ng/catalog?search-keyword=${q}&page=${pageNumber}`;


                $.get(defaults.crawler , {url} , response => {

                    let html;


                    try {
                        html = $(response.contents).find('.post') ? $(response.contents).find('.post') : html;

                    }

                    catch (e) {
                        return showError();

                    }
                    if(!html.length) return showError();




                    //Clearing some memory
                    response = null;


                    {

                        let counter = 0;
                        let ad;
                        html.each(function (index) {

                            ad = {title : null , description : null , price : null , image : null , link : null, linkText : null , location : null};
                            ad.title = $.trim($(this).find('.post-link').text()).truncate(defaults.maxTitleLength);
                            ad.description = $.trim($(this).find('.post-link').text()).truncate(defaults.maxDescriptionLength);
                            ad.image = $.trim($(this).find('.product-images').attr('data-src'));
                            ad.price = $.trim($(this).find('.price').text().replace( /^\D+/g, '')).toLocaleString();
                            ad.link = "https://deals.jumia.com.ng" + $(this).find('.post-link').attr('href');
                            ad.location = $(this).find('.address').text();
                            ad.linkText = ad.link.truncate(defaults.maxLinkLength);

                            selectedEcommerce.ads.push(ad);
                        });

                        selectedEcommerce.page = selectedEcommerce.page + 1;

                        this.props.locale[index] = selectedEcommerce;
                        let previousLocale = this.props.locale;

                        savedState = {...this.props , locale : previousLocale , currentWebsite : website};

                        defaultAction();
                    }



                });

                break;

            case 'olx' :
                url = `https://api.olx.com.ng/relevance/search?facet_limit=100&location_facet_limit=6&query=${q}&page=${pageNumber}&user=165548cb5dcx2e53159d`;

                $.get(defaults.crawler, {url}, response => {


                    if (!response.contents || !response.contents.data.length ) {
                        return showError();
                    }


                    {


                        let ad;
                        response.contents.data.forEach(obj => {

                            ad = {title : null , description : null , price : null , image : null , link : null, linkText : null , location : null};

                            try {
                                ad.location = obj.locations_resolved.ADMIN_LEVEL_1_name;
                            }
                            catch (e) {
                                ad.location = "Not specified";
                            }
                                ad.title = obj.title.truncate(defaults.maxTitleLength);
                                ad.description = obj.description.truncate(defaults.maxDescriptionLength);
                                ad.image = obj.images[0].url;
                                ad.price = obj.price ? obj.price.value.raw.toLocaleString() : 0;
                                ad.link = 'https://www.olx.com.ng/item/' + obj.title.split(" ").join("-").toLowerCase() + "-iid-" + obj.id;
                                ad.linkText = ('https://www.olx.com.ng/item/' + obj.title.split(" ").join("-").toLowerCase() + "-iid-" + obj.id).truncate(defaults.maxLinkLength);

                                selectedEcommerce.ads.push(ad);
                            });


                        selectedEcommerce.page = selectedEcommerce.page + 1;

                        this.props.locale[index] = selectedEcommerce;
                        let previousLocale = this.props.locale;

                        savedState = {...this.props , locale : previousLocale , currentWebsite : website};

                        defaultAction();

                    }

                });


        }




    };





    /*******     ***********/





    handleSearchFormSubmit = (e) => {

        e.preventDefault();
        this.formSubmitted = false;

        this.searchQuery = this.searchQueryField.val().toLowerCase();


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





        //hide the site footer and the switch container
        this.searchResults.html(null);
        this.siteFooter.hide();

        //blurs the search field
        $(':focus').blur();

        //disables the search form
        this.searchFormFieldSet.prop(...this.disabledFormFieldSet);




        //default search website depending on the users's settings
        const q = this.searchQuery.split(" ").join("+");

        //The default website to make the search and filter contents
        let searchFilterUrl = `https://api.olx.com.ng/relevance/search?facet_limit=100&location_facet_limit=6&query=${q}&page=0&user=165548cb5dcx2e53159d`;


        this.props.locale.forEach(obj => {

            Object.keys(obj).map(key => {

                if (Array.isArray(obj[key])) {
                    obj[key] = [];
                }
                else if(key === "average")
                {
                    obj[key] = 0;
                }
            })


        });


        //set the loadMore key of this website object to false
        this.props.locale[0].loadMore = true;
        if(!this.props.switchWebsite({...this.props , currentWebsite : this.props.locale[0].shortName , noDefaultResultsFound : false , processingAction : true}))return;


        $.get(defaults.crawler, {url: searchFilterUrl}, response => {



            //Check if a response was received from the server
            if (!response.contents || !response.contents.data) {
                return this.searchFormFieldSet.prop(...this.enabledFormFieldSet) && M.toast({html: this.networkError});
            }

            //Check if there is not data returned, meaning empty result
            else if (!response.contents.data.length) {



                //M.toast({html: this.enterValidKeywordsWarning});

                this.searchFormFieldSet.prop(...this.enabledFormFieldSet);

                this.searchTabs.show();
                $('#tabs.tabs').tabs('select', this.props.defaultBackup);
                this.searchQueryField.blur();
                this.formSubmitted = true;


                //Make another request to Backup
                this.props.locale.forEach(obj => {
                    return  obj.page = 0;
                });

                //also set the loadMore key of this website object to false
                this.props.locale[0].loadMore = false;
                if(this.props.switchWebsite({...this.props , q , query : this.searchQuery ,  noDefaultResultsFound: true})){

                    this.switchToWebsite(this.props.defaultBackup , null , null , true);

                    return;
                }
            }


            let titles = [];

            response.contents.data.forEach(obj => {

                titles.push(obj.title.toLowerCase());

            });

            this.filterTitles(titles);



            let defaultEcommerceWebsite = this.props.locale[0];
            let defaultEcommerceWebsiteShortName = defaultEcommerceWebsite.shortName;


            let ad;

            response.contents.data.forEach(obj => {



                ad = {title : null , description : null , price : null , image : null , link : null, linkText : null , location : null};


                try {
                    ad.location = obj.locations_resolved.ADMIN_LEVEL_1_name;
                }
                catch (e) {
                    ad.location = "not specified";
                }





                ad.title = obj.title.truncate(defaults.maxTitleLength);
                ad.description = obj.description.truncate(defaults.maxDescriptionLength);
                ad.image = obj.images[0].url;
                ad.price = obj.price ? obj.price.value.raw.toLocaleString() : 0;
                ad.link = 'https://www.olx.com.ng/item/' + obj.title.split(" ").join("-").toLowerCase() + "-iid-" + obj.id;
                ad.linkText = ('https://www.olx.com.ng/item/' + obj.title.split(" ").join("-").toLowerCase() + "-iid-" + obj.id).truncate(defaults.maxLinkLength);
                defaultEcommerceWebsite.ads.push(ad)


 });
            let previousLocale =  this.props.locale;
            //reset the pages to 0;
            this.props.locale.forEach(local => {
                local.page = 0;
                local.error = null;
                local.loadMore = true;
            });


            defaultEcommerceWebsite.page += 1;
            let savedState = {
                ...this.props,
                q,
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

        let query = this.searchQueryField.val().toLowerCase();


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

        this.searchTypeSwitchButton.prop('checked' , this.props.settings.localSearch);
        this.toggleImagesSwitch.prop('checked' , this.props.settings.showImages);
    };


    componentDidUpdate () {

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



        }

        this.loadSuggestions();

    }

    filterTitles = titlesArr => {


        //an array conntaining all the titles of the first search
        let validTitles = [];

        const titles = titlesArr.forEach(title => {
            let currentTitle = title.toLowerCase();
            let currentTitleToArray = currentTitle.split(" ");
            currentTitleToArray.forEach(word => {
                if (validTitles.indexOf(word) < 0) {
                    validTitles.push(word);
                }
            });

        });



        //Filter the user search query
        let searchQueryToArray = this.searchQuery.split(" ");

        //Remove words that are not found in the list of titles from the array
        /*
        searchQueryToArray = searchQueryToArray.filter((word, index) => {


            return validTitles.indexOf(word) >= 0 && searchQueryToArray[index] !== searchQueryToArray[index + 1];
        });
*/

        this.searchQuery = searchQueryToArray.join(" ");

        if (!this.searchQuery.length) {
            this.searchFormFieldSet.prop(...this.enabledFormFieldSet);
            M.toast({html: this.enterValidKeywordsWarning});
            this.formSubmitted = false;

            return;
        }


        this.searchQueryField.val(this.searchQuery);

        //data to be sent to the server
        let data = {query: this.searchQuery};
        data = JSON.stringify(data);


        $.post(defaults.queryProcessor, {data}, t => {


            this.searchFormFieldSet.prop(...this.enabledFormFieldSet);


            this.localSearchTabContainer.show();

            this.lastSearchQuery = this.searchQuery;
            this.switchContainer.hide();

            /*

            this.props.locale.forEach(obj => {

                Object.keys(obj).map(key => {

                    if (Array.isArray(obj[key])) {
                        obj[key] = [];
                    }
                })


            });

*/
        });
    };
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
        this.searchFormFieldSet = $('#search-form-fieldset');
        this.siteFooter = $('#site-footer');

        this.lastSearchQuery = this.searchQueryField.val().toLowerCase();
        this.searchTypeSwitchButton = $("#search-type-switch-button");
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

                let storageObjectKeysCount = 0 , propsKeysCount = 0;

                Object.keys(storageObj).forEach(key =>
                {
                    return  typeof storageObj[key] !== 'function' ? storageObjectKeysCount += 1 : null;
                });

                Object.keys(this.props).forEach(key =>
                {
                    return  typeof this.props[key] !== 'function' ? propsKeysCount += 1 : null;
                });


                /*


               if there is a difference in the length of the savedState object keys
               and the length of the default state stored in the redux store,
               meaning there was a change in the source code this will trigger the automatic update of the savedState


               */

                //console.log(storageObjectKeysCount , propsKeysCount);
                if(storageObjectKeysCount !== propsKeysCount || this.props.lastUpdated !== storageObj.lastUpdated) return //this.props.restoreState();
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



        this.loadSuggestions();



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


                                   // if(!this.searchQueryField.val().length) return;
                                    if(this.props.locale[0].ads.length){

                                        this.searchTabs.show();

                                    }


                                }} onFocus={() => {this.searchTabs.hide();}  } type="text" defaultValue = {this.props.query ? this.props.query : ""} onChange={this.handleSearchTextChange}  id="autocomplete-input" className="autocomplete search-query-field" />
                                <label htmlFor="autocomplete-input">What do you want to buy?</label>
                            </div>

                        </div>

                        <button type="submit" className="input-group-addon btn waves-effect waves-light left" id="search-button">Search</button>

                        <a className='dropdown-trigger btn-floating btn-large blue' href='#' data-target='settings-dropdown' id="settings-drop-down-link">More<span className="material-icons small" id="settings-more-icon">arrow_drop_down</span></a>

                        <ul id='settings-dropdown' className='dropdown-content'>
                            <li><a href="#" id="download-apk-link"><span className="small material-icons app-download-icon">vertical_align_bottom</span> Download APK</a></li>
                            <li className="divider" tabIndex="-1"></li>

                            <li id="local-search-setting">
                                <div className="switch">

                                    <label>

                                        <span id="local-search-text" className="settings-text">Local Search</span>
                                        <input defaultChecked={() => {return true}} disabled={true} onChange={this.handleSearchTypeSwitch} type="checkbox" id="search-type-switch-button" />
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
                <LocalSearchTab switchToWebsite = {this.switchToWebsite} />


            </div>
        )

    }

}






