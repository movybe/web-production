class Application extends React.Component {
    lastSearchQuery = null;
    formSubmitted = false;
    cookiesQueryKey = "queries";
    enabledFormFieldSet = ["disabled", false];
    disabledFormFieldSet = ["disabled", true];
    lastSearchedQueryKey = "lastSearchedQuery";
    enterValidKeywordsWarning = "Please enter valid keyword(s)";
    networkError = "failed to receive response, check your network connection";
    updateSearchResultAction = 'UPDATE_SEARCH_RESULT';

    getRandomUserAgent = (desktop = true) =>
    {
        let DesktopUserAgentStrings = [
            "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36" ,
            "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:70.0) Gecko/20100101 Firefox/70.0",
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3763.0 Safari/537.36 Edg/75.0.131.0",
            "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 UBrowser/7.0.185.1002 Safari/537.36",
            //"Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Safari/537.36"
        ];

        let mobileUserAgentStrings = [
            "Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev> (KHTML, like Gecko) Chrome/<Chrome Rev> Mobile Safari/<WebKit Rev>",
            "Mozilla/5.0 (Android; Mobile; rv:40.0) Gecko/40.0 Firefox/40.0"
        ];

        let platformArray = desktop ? DesktopUserAgentStrings : mobileUserAgentStrings;
        return platformArray[Math.floor(Math.random() * platformArray.length)];

    };


    getRandomCrawler = () => {
        let crawlers = [
            "https://nypd1.000webhostapp.com/crawler.php",
            "https://nypd2.000webhostapp.com/crawler.php",
            "https://nypd4.000webhostapp.com/crawler.php",
            "https://nypd5.000webhostapp.com/crawler.php",
            "https://nypd6.000webhostapp.com/crawler.php",
            defaults.crawler
        ];
        return crawlers[Math.floor(Math.random() * crawlers.length)];
    };

    getRequestObject = (url , desktop = true) => {
        return {url , mode : 'native', send_cookies : true , send_session : true , user_agent_string : this.getRandomUserAgent(desktop)}

    };


    constructor() {
        super();
    }
    switchToWebsite = (website , /* not event necessary */ index = 0 , /* if the user clicks on load more button */
                       loadMore = false , /* if the default E-commerce website doesn't return any result*/backup = false ,  isfirstSearch = false , queryObject = {} , callback = null) => {
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

        const getTitles = (ads , titles = []) => {

            ads.forEach(function (ad) {

                titles.push(ad.title);
            });
        };



        /*
        query : "samsung galaxy s7 edge"
        q : "samsung+galaxy+s7+edge" //default query type for most modern E-commerce websites
         */

        let {query , q} = isfirstSearch ? queryObject : this.props;

        //increments the pageNumber so that it can pass it to the search url
        // e.g if the previous page for olx = 1
        // the new page number becomes 2
        // the new value (which is 2) is then parsed to the search url of the website
        let pageNumber = selectedEcommerce.page + 1;

        /*
        Check if this tab had already been clicked , meaning content has either loaded or is still loading
        to prevent this function from being recursive
        */


        if(!isfirstSearch && !loadMore && selectedEcommerce.page > 0 && !backup){
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




        if(!isfirstSearch && !this.props.switchWebsite({...this.props , processingAction:  true , currentWebsite : website})) return;

        /*
        Resets all the arrays of the selected E-commerce website
        so that new titles , descriptions , prices , images will be replaced with new ones
        */
        if(!isfirstSearch && !backup && !this.props.noDefaultResultsFound) {
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
            if (!isfirstSearch) {
                this.searchFormFieldSet.prop(...defaults.disabledFalse);
                if (this.props.switchWebsite({...savedState, processingAction: false})) return;
            }
        };

        let resp , ads = [];
        let titles = [];


        switch (website) {
            case defaults.websites.olist :
                let url = `https://olist.ng/search?keyword=${q}&state_id=&page=${pageNumber}`;
                this.tryGetCachedResult(this.getRandomCrawler() , this.getRequestObject(url) , url ,  response => {


                    resp = response;

                    if(response.is_html) {
                        let html;
                        try {
                            html = $(response.html).find('.b-list-advert__item');
                        }
                        catch (e) {
                            showError();
                        }

                        if (!html.length) return showError();

                        //Clearing some memory
                        response = null;


                        {
                            let ad;
                            let counter = 0;


                            let prop, addNewAd = true;
                            html.each(function (index) {
                                ad = {
                                    title: null,
                                    description: null,
                                    price: null,
                                    image: null,
                                    link: null,
                                    linkText: null,
                                    location: null
                                };
                                ad.title = $.trim((($(this).find("*[class*='title']:first") || $(this).find('.b-advert-title-inner:first')).text())).truncate(defaults.maxTitleLength);
                                ad.description = $.trim((($(this).find("*[class*='description']:first") || $(this).find('.b-list-advert__item-description-text:first')).text())).truncate(defaults.maxDescriptionLength);
                                ad.price = $.trim(($(this).find('.qa-advert-price.b-list-advert__item-price:first') || $(this).find("span:contains(₦):first , small:contains(₦):first")).text()).replace(/^\D+/g, '').toLocaleString();
                                ad.price = ad.price === '' ? 0 : ad.price;
                                ad.link = ($(this).find("a[href*='item']:first") || $(this).find('.js-advert-link:first')).attr('href');
                                ad.link = ad.link.charAt(0) === '/' ? "https://olist.ng" + ad.link : ad.link;
                                ad.image = ($(this).find("img[src*='thumbnail']:first") || ($(this).find('.b-list-advert__item-image:first').find('img:first'))).attr('src');
                                ad.location = $.trim((($(this).find("*[class*='region']:first") || $(this).find("*[class*='location']:first") || $(this).find('.b-list-advert__item-region:first')).text())).truncate(defaults.maxLocationLength);
                                ad.linkText = ad.link.truncate(defaults.maxLinkLength);
                                for (prop in ad) {
                                    if (prop === "showAdImage") continue;
                                    else if (ad[prop] === null || typeof ad[prop] === 'undefined') {
                                        addNewAd = false;
                                        break;
                                    }
                                }
                                if (addNewAd) {
                                    if(!isfirstSearch)selectedEcommerce.ads.push(ad);
                                    ads.push(ad);
                                }

                            });
                        }
                    }
                    else {

                        response.ads.forEach(ad => {
                            ads.push(ad);
                            selectedEcommerce.ads.push(ad);
                            titles.push(ad.title);
                        });
                    }

                    if(resp.update){

                        let data = {url , ads : selectedEcommerce.ads, email : 'username@domain.com' , action : this.updateSearchResultAction};
                        data = JSON.stringify(data);
                        $.post(defaults.actions ,  {data} , response=> {});
                    }


                    selectedEcommerce.page += 1;

                    this.props.locale[index] = selectedEcommerce;
                    let previousLocale = this.props.locale;


                    savedState = {...this.props , locale : previousLocale , currentWebsite : website};

                    defaultAction();

                    return callback ? callback({...resp , titles , all_ads : ads}) : null;
                });

                break;

            case defaults.websites.jiji :

                url = `https://jiji.ng/search?query=${q}&page=${pageNumber}`;


                this.tryGetCachedResult(this.getRandomCrawler() , this.getRequestObject(url) , url ,  response => {


                    resp = response;

                    if(response.is_html) {
                        let html;
                        try {
                            html = $(response.html).find('.b-list-advert__template');
                        }
                        catch (e) {
                            showError();
                        }

                        if (!html.length) return showError();

                        //Clearing some memory
                        response = null;


                        {
                            let ad;
                            let counter = 0;


                            let prop, addNewAd = true;
                            html.each(function (index) {
                                ad = {
                                    title: null,
                                    description: null,
                                    price: null,
                                    image: null,
                                    link: null,
                                    linkText: null,
                                    location: null
                                };

                                ad.title = $.trim((($(this).find("*[class*='title']:first") || $(this).find('.qa-advert-title.js-advert-link:first')).text())).truncate(defaults.maxTitleLength);
                                ad.description = $.trim((($(this).find("*[class*='description']:first") || $(this).find('.b-list-advert__item-description-text:first')).text())).truncate(defaults.maxDescriptionLength);
                                ad.price = $.trim(($(this).find('.b-list-advert__item-price:first') || $(this).find("span:contains(₦):first , small:contains(₦):first")).text()).replace(/^\D+/g, '').toLocaleString();
                                ad.price = ad.price === '' ? 0 : ad.price;
                                ad.link = ($(this).find("a[class*='link']:first") || $(this).find('.js-advert-link:first')).attr('href');
                                ad.link = ad.link.charAt(0) === '/' ? "https://jiji.ng" + ad.link : ad.link;
                                ad.image = $(this).find('.b-list-slider__sub-img').eq(0).attr('data-img') || $(this).find('img').attr('data-src') || $(this).find('img').attr('src');
                                ad.location = $.trim((($(this).find("*[class*='region']:first") || $(this).find("*[class*='location']:first") || $(this).find('.b-list-advert__item-region:first')).text())).truncate(defaults.maxLocationLength);
                                ad.linkText = ad.link.truncate(defaults.maxLinkLength);

                                for (prop in ad) {
                                    if (prop === "showAdImage") continue;
                                    else if (ad[prop] === null || typeof ad[prop] === 'undefined') {
                                        addNewAd = false;
                                        break;
                                    }
                                }
                                if (addNewAd) {
                                    if(!isfirstSearch)selectedEcommerce.ads.push(ad);
                                    ads.push(ad);
                                }
                            });

                        }
                    }
                    else {

                        response.ads.forEach(ad => {
                            ads.push(ad);
                            selectedEcommerce.ads.push(ad);
                            titles.push(ad.title);
                        });
                    }

                    if(resp.update){

                        let data = {url , ads : selectedEcommerce.ads, email : 'username@domain.com' , action : this.updateSearchResultAction};
                        data = JSON.stringify(data);
                        $.post(defaults.actions ,  {data} , response=> {});
                    }




                    selectedEcommerce.page += 1;

                    this.props.locale[index] = selectedEcommerce;
                    let previousLocale = this.props.locale;


                    savedState = {...this.props , locale : previousLocale , currentWebsite : website};

                    defaultAction();

                    return callback ? callback({...resp , titles , all_ads : ads}) : null;
                });

                break;

            case 'jumia' :
                url = `https://www.jumia.com.ng/catalog/?q=${q}&page=${pageNumber}`;
                this.tryGetCachedResult(this.getRandomCrawler() , this.getRequestObject(url) , url, response => {

                    resp = response;

                    let html;
                    if(response.is_html) {

                        try {
                            html = $(response.html).find('.sku.-gallery');
                        }
                        catch (e) {
                            return showError();
                        }

                        if (!html.length) return showError();

                        response = null;
                        {
                            let title;
                            let description;
                            let image;
                            let price;
                            let ad;
                            //let location;
                            let link, prop, addNewAd = true;
                            html.each(function (index) {

                                ad = {
                                    title: null,
                                    description: null,
                                    price: null,
                                    image: null,
                                    link: null,
                                    linkText: null,
                                    location: null
                                };

                                title = $.trim($(this).find('.name').text()).truncate(defaults.maxTitleLength);
                                description = $.trim($(this).find('.name').text()).truncate(defaults.maxDescriptionLength);
                                image = $.trim($(this).find('.lazy.image').attr('data-src'));
                                price = $.trim($(this).find('.price').first().text().replace(/^\D+/g, '')).toLocaleString();
                                link = $(this).find('.link').attr('href');

                                //location = $(this).find('.b-list-advert__item-region').text();
                                if (title !== "") {
                                    ad.title = title;
                                    ad.description = description;
                                    ad.image = image;
                                    ad.price = price;
                                    ad.link = link;
                                    ad.location = "";
                                    ad.linkText = link.truncate(defaults.maxLinkLength);

                                    for (prop in ad) {
                                        if (prop === "showAdImage") continue;
                                        else if (ad[prop] === null || typeof ad[prop] === 'undefined') {
                                            addNewAd = false;
                                            break;
                                        }
                                    }
                                    if (addNewAd) selectedEcommerce.ads.push(ad);
                                }
                            });
                        }
                    }
                    else {

                        response.ads.forEach(ad => {

                            selectedEcommerce.ads.push(ad);
                        })
                    }

                    if(resp.update){

                        let data = {url , ads : selectedEcommerce.ads, email : 'username@domain.com' , action : this.updateSearchResultAction};
                        data = JSON.stringify(data);
                        $.post(defaults.actions ,  {data} , response=> {

                        });
                    }

                    titles = selectedEcommerce.ads.length ? getTitles(selectedEcommerce.ads) : titles;
                    selectedEcommerce.page += 1;

                    this.props.locale[index] = selectedEcommerce;
                    let previousLocale = this.props.locale;
                    savedState = {...this.props , locale : previousLocale , currentWebsite : website};

                    defaultAction();
                });
                break;
            case 'konga' :


                url = "https://b9zcrrrvom-3.algolianet.com/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.30.0%3Breact-instantsearch%205.3.2%3BJS%20Helper%202.26.1&x-algolia-application-id=B9ZCRRRVOM&x-algolia-api-key=cb605b0936b05ce1a62d96f53daa24f7";
                let req = {"requests":[{"indexName":"catalog_store_konga","params":`query=${query.replace(" " , "%20")}&maxValuesPerFacet=50&page=${pageNumber}&highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&facets=%5B%22special_price%22%2C%22attributes.brand%22%2C%22attributes.screen_size%22%2C%22attributes.ram_gb%22%2C%22attributes.sim%22%2C%22attributes.sim_slots%22%2C%22attributes.capacity%22%2C%22attributes.battery%22%2C%22attributes.connectivity%22%2C%22attributes.hard_drive%22%2C%22attributes.internal%22%2C%22attributes.tv_screen_size%22%2C%22attributes.operating_system%22%2C%22attributes.kids_shoes%22%2C%22attributes.heel_type%22%2C%22attributes.heel_height%22%2C%22attributes.leg_width%22%2C%22attributes.fastening%22%2C%22attributes.shirt_size%22%2C%22attributes.shoe_size%22%2C%22attributes.lingerie_size%22%2C%22attributes.pants_size%22%2C%22attributes.size%22%2C%22attributes.color%22%2C%22attributes.mainmaterial%22%2C%22konga_fulfilment_type%22%2C%22is_pay_on_delivery%22%2C%22is_free_shipping%22%2C%22pickup%22%2C%22categories.lvl0%22%5D&tagFilters=&ruleContexts=%5B%22%22%5D`}]};;

                this.tryGetCachedResult(this.getRandomCrawler() , this.getRequestObject(url) , url ,  response => {


                    resp = response;
                    if(response.is_html) {
                        if (!response.html.results) return showError();
                        if (!response.html.results.length) return showError(false);


                        let resultObject = response.html.results[0].hits;
                        const titlesArray = [];

                        resultObject.forEach(obj => titlesArray.push(obj.name));


                        //Check if Konga is used as a backup search result website and filter the titles if so
                        let filterAction = backup ? this.filterTitles(titlesArray) : null;

                        let ad;

                        let specialPrice, prop, addNewAd = true;
                        resultObject.forEach(obj => {
                            ad = {
                                title: null,
                                description: null,
                                price: null,
                                image: null,
                                link: null,
                                linkText: null,
                                location: null
                            };
                            ad.title = obj.name.truncate(defaults.maxTitleLength);
                            ad.description = obj.description.truncate(defaults.maxDescriptionLength);
                            ad.image = "https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product" + obj.image_thumbnail_path;

                            specialPrice = obj.special_price || obj.price;
                            ad.price = specialPrice.toLocaleString();
                            ad.location = "";

                            ad.link = 'https://konga.com/product/' + obj.url_key;
                            ad.linkText = ('https://konga.com/product/' + obj.url_key).truncate(defaults.maxLinkLength);

                            for (prop in ad) {
                                if (prop === "showAdImage") continue;
                                else if (ad[prop] === null || typeof ad[prop] === 'undefined') {
                                    addNewAd = false;
                                    break;
                                }
                            }

                            if (addNewAd) selectedEcommerce.ads.push(ad);

                        });

                    }
                    else {
                        response.ads.forEach(ad => {

                            selectedEcommerce.ads.push(ad);
                        })
                    }

                    titles = selectedEcommerce.ads.length ? getTitles(selectedEcommerce.ads) : titles;
                    selectedEcommerce.page += 1;

                    if(resp.update){

                        let data = {url : req , ads : selectedEcommerce.ads, email : 'username@domain.com' , action : this.updateSearchResultAction};
                        data = JSON.stringify(data);
                        $.post(defaults.actions ,  {data} , response=> {

                        });
                    }



                    this.props.locale[index] = selectedEcommerce;
                    let previousLocale = this.props.locale;
                    savedState = {...this.props , locale : previousLocale , currentWebsite : website};
                    defaultAction();
                } , "konga" , req);
                break;
            case 'deals' :
                url = `https://deals.jumia.com.ng/catalog?search-keyword=${q}&page=${pageNumber}`;

                this.tryGetCachedResult(this.getRandomCrawler() , this.getRequestObject(url) , url , response => {

                    resp = response;

                    let html;


                    if(response.is_html) {
                        try {
                            html = $(response.html).find('.post') ? $(response.html).find('.post') : html;
                        }
                        catch (e) {
                            return showError();

                        }


                        if (!html.length) return showError();


                        //Clearing some memory
                        response = null;


                        {

                            let counter = 0;
                            let ad, prop, addNewAd = true;
                            html.each(function (index) {

                                ad = {
                                    title: null,
                                    description: null,
                                    price: null,
                                    image: null,
                                    link: null,
                                    linkText: null,
                                    location: null
                                };
                                ad.title = $.trim($(this).find('.post-link').text()).truncate(defaults.maxTitleLength);
                                ad.description = $.trim($(this).find('.post-link').text()).truncate(defaults.maxDescriptionLength);
                                ad.image = $.trim($(this).find('.product-images').attr('data-src'));
                                ad.price = $.trim($(this).find('.price').text().replace(/^\D+/g, '')).toLocaleString();
                                ad.link = "https://deals.jumia.com.ng" + $(this).find('.post-link').attr('href');
                                ad.location = $(this).find('.address').text();
                                ad.linkText = ad.link.truncate(defaults.maxLinkLength);

                                for (prop in ad) {
                                    if (prop === "showAdImage") continue;
                                    else if (ad[prop] === null || typeof ad[prop] === 'undefined') {
                                        addNewAd = false;
                                        break;
                                    }
                                }
                                if (addNewAd) {
                                    if(!isfirstSearch)selectedEcommerce.ads.push(ad);
                                    ads.push(ad);
                                }
                            });

                        }
                    }
                    else {

                        response.ads.forEach(ad => {

                            ads.push(ad);
                            selectedEcommerce.ads.push(ad);
                            titles.push(ad.title);
                        })
                    }

                    if(resp.update){

                        let data = {url , ads : selectedEcommerce.ads, email : 'username@domain.com' , action : this.updateSearchResultAction};
                        data = JSON.stringify(data);
                        $.post(defaults.actions ,  {data} , response=> {

                        });

                    }


                    selectedEcommerce.page = selectedEcommerce.page + 1;

                    this.props.locale[index] = selectedEcommerce;
                    let previousLocale = this.props.locale;

                    savedState = {...this.props , locale : previousLocale , currentWebsite : website};

                    defaultAction();

                    return callback ? callback({...resp , titles , all_ads : ads}) : null;
                });
                break;

        }




    };

    shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps;
    }


    fetchSponsoredAds = (callback) => {

        let data = {action : 'FETCH_SPONSORED_ADS' , email : 'test@mail.com'};
        data = JSON.stringify(data);
        $.post(defaults.actions , {data} , response => {
            response = JSON.parse(response);
            if(!response.sponsored_ads.length) return [];
            response.sponsored_ads.forEach(sponsored_ad => {
                sponsored_ad.is_sponsored_ad = true;
                sponsored_ad.image = defaults.bannerImageLocation + sponsored_ad.banner;
                sponsored_ad.linkText = sponsored_ad.link.truncate(defaults.maxLinkLength);
                sponsored_ad.price = 0;
            });

            response = response.sponsored_ads;

            callback(response);
        });
    };


    /*******     ***********/

    tryGetCachedResult = (url , dataObject , searchUrl , callback , siteName = "other" , req = {}) => {

        let isKongaRequest = siteName.toLowerCase().indexOf('konga') >= 0;


        let data = JSON.stringify({
            url : isKongaRequest ? req : searchUrl,
            action : 'FETCH_CACHED_AD',
            email : 'username@domain.com'
        });


        $.post(defaults.actions , {data} , cacheResponse => {



            //return;


            cacheResponse = JSON.parse(cacheResponse);



            cacheResponse['is_html'] = true;



            if(cacheResponse.update && !isKongaRequest)
            {

                $.post(url , dataObject , function (response) {



                    cacheResponse['html'] = response;

                    return callback(cacheResponse);

                })

            }

            else if(cacheResponse.update && isKongaRequest){



                $.post(searchUrl , JSON.stringify(req) ,  function (response) {


                    cacheResponse['html'] = response;
                    return callback(cacheResponse);
                });
            }
            else {
                cacheResponse['is_html'] = false;
                return callback(cacheResponse);
            }
        });

    };

    getRandomDefaultWebsite = () =>{

        //First check classified ad websites before E-commerce websites

        let classifiedAdsWebsites = [defaults.websites.olist , defaults.websites.deals , defaults.websites.jiji];
        let ecommerceWebsites = [defaults.websites.jumia , defaults.websites.konga];

        let randomClassifiedAdWebsite = classifiedAdsWebsites[Math.floor(Math.random() * classifiedAdsWebsites.length)];
        let randomEcommerceWebsite = ecommerceWebsites[Math.floor(Math.random() * ecommerceWebsites.length)];
        return [randomClassifiedAdWebsite , randomEcommerceWebsite]
    };

    handleSearchFormSubmit = (e) => {

        e.preventDefault();
        //e.stopImmediatePropagation();

        this.formSubmitted = false;

        this.searchQuery = this.searchQueryField.val().toLowerCase().replace(/ +(?= )/g,'');


        if (!this.searchQuery.length) return;


        //Filters the search query
        //this.replaceSearchText();

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


        //default search website depending on the users's settings
        const q = this.searchQuery.split(" ").join("+");


        const queryObject = {query : this.searchQuery , q};

        this.props.locale.forEach(obj => {

            Object.keys(obj).map(key => {


                if (Array.isArray(obj[key])) {
                    obj[key] = [];
                }
                switch (key) {
                    case "average":
                    case "lastSortedPage":
                        obj[key] = 0;
                        break;
                    case "shownSponsoredAds":
                        obj[key] = false;
                        break;
                }
            });
        });


        //set the loadMore key of this website object to false
        this.props.locale[0].loadMore = true;
        while (this.props.sponsoredAdsClicked.length) {
            this.props.sponsoredAdsClicked.pop();
        }


        this.searchFormFieldSet.prop(...defaults.disabledTrue);





        let defaultRandomEcommerceWebsites = this.getRandomDefaultWebsite();
        let defaultRandomClassifiedAdWebsite = defaultRandomEcommerceWebsites[0];
        let defaultRandomEcommerceWebsite = defaultRandomEcommerceWebsites[1];

        console.log(defaultRandomClassifiedAdWebsite , defaultRandomEcommerceWebsite);


        this.switchToWebsite(defaultRandomClassifiedAdWebsite , 0 , false , false , true , queryObject ,  response =>  {









            let selectedIndex = 0;
            let selectedEcommerce = this.props.locale.find((local  , pos )=> {
                    selectedIndex = pos;
                    // if the current E-commerce shortName is equal to the "website" parameter sent to the function
                    return local.shortName === defaultRandomClassifiedAdWebsite;
                }
            );





            //Check if there is no title returned, meaning empty result
            if (!response.all_ads.length) {



                //M.toast({html: this.enterValidKeywordsWarning});

                this.searchTabs.show();
                $('#tabs.tabs').tabs('select', defaultRandomEcommerceWebsite);
                this.searchQueryField.blur();
                this.formSubmitted = true;

                //Make another request to Backup
                this.props.locale.forEach(obj => {
                    return obj.page = 0;
                });

                //also set the loadMore key of this website object to false
                this.props.locale[selectedIndex].loadMore = false;
                if (this.props.switchWebsite({
                    ...this.props,
                    q,
                    query: this.searchQuery,
                    noDefaultResultsFound: true
                })) {

                    this.switchToWebsite(defaultRandomEcommerceWebsite, null, null, true);
                    return;
                }
            }


            response.all_ads.forEach(ad => {

                selectedEcommerce.ads.push(ad);
            });

            let returnNow = false;

            this.fetchSponsoredAds(response => {
                if (response.length) {
                    if (!this.props.switchWebsite({
                        ...this.props,
                        currentWebsite: defaultRandomClassifiedAdWebsite,
                        noDefaultResultsFound: false,
                        processingAction: false,
                        sponsoredAds: response
                    })) {
                        returnNow = true;
                    }
                }
                returnNow = true
            });

            if (returnNow) return;

            if(response.is_html) {

                this.filterTitles(response.titles, function () {

                });
            }

            let previousLocale = this.props.locale;
            //reset the pages to 0;
            this.props.locale.forEach(local => {
                local.page = 0;
                local.error = null;
                local.loadMore = true;
            });



            selectedEcommerce.page += 1;
            let savedState = {
                ...this.props,
                q,
                query: this.searchQuery,
                locale: previousLocale,
                currentWebsite: defaultRandomClassifiedAdWebsite,
                processingAction: false
            };

            if (this.props.newDefaultSearchResult({...savedState})) {

                //Switch the tab to the default behaviour;
                this.formSubmitted = true;
                this.searchQueryField.blur();
                this.searchTabs.show();
                $('#tabs.tabs').tabs('select', defaultRandomClassifiedAdWebsite);
            }

            this.searchFormFieldSet.prop(...defaults.disabledFalse);

        });


    };

    handleSearchTypeSwitch = e => {

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
        //this.replaceSearchText();


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

    filterTitles = (titlesArr , callback) => {


        //an array containing all the titles of the first search
        let validTitles = [];

        const titles = titlesArr.forEach(title => {
            let currentTitle = title.toLowerCase().replace(/ +(?= )/g,'');
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
            M.toast({html: this.enterValidKeywordsWarning});
            this.formSubmitted = false;

            return;
        }


        this.searchQueryField.val(this.searchQuery);

        //data to be sent to the server
        let data = {query: this.searchQuery};
        data = JSON.stringify(data);

        $.post(defaults.queryProcessor, {data}, t => {



            this.localSearchTabContainer.show();

            this.lastSearchQuery = this.searchQuery;
            this.switchContainer.hide();

            return callback();
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
        this.moreDropDownContents = $('.more-dropdown-contents');
        this.moreDropDownContents.show();
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
                if(storageObjectKeysCount !== propsKeysCount || this.props.lastUpdated !== storageObj.lastUpdated) return this.props.restoreState(true);
            }
            if (this.props.switchWebsite(storageObj)) {
                //hello
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

        const downloadApkLink = navigator.userAgent === defaults.siteWebPackageName ? null :
            <li><a href={defaults.apkDownloadLink} id="download-apk-link"><span className="small material-icons app-download-icon">vertical_align_bottom</span> Download APK</a></li>
        const downloadApkDivider = downloadApkLink === null ? null :  <li className="divider" tabIndex="-1"></li>;

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
                                    if(this.props.locale[0].ads.length  || this.props.locale[3].ads.length){

                                        this.searchTabs.show();

                                    }


                                }} onFocus={() => {this.searchTabs.hide();}  } type="text" defaultValue = {this.props.query ? this.props.query : ""} onChange={this.handleSearchTextChange}  id="autocomplete-input" className="autocomplete search-query-field" />
                                <label htmlFor="autocomplete-input">{this.props.query ? "" : "What do you want to buy?"}</label>
                            </div>

                        </div>

                        <button type="submit" className="input-group-addon btn waves-effect waves-light left" id="search-button">Search</button>

                        <a className='dropdown-trigger more-dropdown-contents btn-floating btn-large blue' href='#' data-target='settings-dropdown' id="settings-drop-down-link">More<span className="material-icons small" id="settings-more-icon">arrow_drop_down</span></a>

                        <ul id='settings-dropdown' className='dropdown-content more-dropdown-contents'>
                            {downloadApkLink}
                            {downloadApkDivider}
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
