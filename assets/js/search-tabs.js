let {connect} = ReactRedux;


class  LocalSearchTab extends React.Component{


    constructor() {
        super();
    }



    switchToWebsite = (website , index , loadMore = false) => {


        if(!this.props.locale[0].images.length) return;

        let selectedEcommerce = this.props.locale.find(local => local.shortName === website
        );

        const showError = () => {

            selectedEcommerce.error = defaults.noDataError;
            selectedEcommerce.page = selectedEcommerce.page + 1;

            selectedEcommerce.loadMore = false;
            this.props.locale[index] = selectedEcommerce;
            if (this.props.switchWebsite({...this.props, locale: this.props.locale, currentWebsite: website})) {


                $("." + defaults.searchResultPreloaders).hide();
                M.toast({html: defaults.networkError});
                return true;

            }
        };

        const {query , q} = this.props;
        let pageNumber = selectedEcommerce.page + 1;

        //Check if page had already been already been clicked
        if(!loadMore && selectedEcommerce.page > 0){
            if(this.props.currentWebsite !== website){
                this.props.switchWebsite({...this.props , currentWebsite : website});
            }

            return ;
        }

        if(!this.props.switchWebsite({...this.props , processingAction:  true , currentWebsite : website})) return;


        $("."  + defaults.searchResultPreloaders).hide();

        //Resetting all the arrays of the selected E-commerce website
        if(!loadMore) {

            Object.keys(selectedEcommerce).map(key => {

                return Array.isArray(selectedEcommerce[key]) ? selectedEcommerce[key] = [] : null;

            });
        }

        else {
            Object.keys(selectedEcommerce).map(key => {

                return Array.isArray(selectedEcommerce[key]) ? selectedEcommerce[key] = [...selectedEcommerce[key]] : null;

            });
        }




        $("#" + website + "-" + defaults.searchResultPreloader).show();

        let savedState = {};
        const  defaultAction = () => {
            if(this.props.switchWebsite({...savedState , processingAction: false}))
            {
                $("."  + defaults.searchResultPreloaders).hide();


            }
        };
        const user_agent = "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36";

        switch (website) {
            case 'jiji' :

                let url = `https://jiji.ng/search?query=${q}&page=${pageNumber}`;


                $.get(defaults.crawler , {url : url, user_agent : user_agent} , response => {

                    let html = $(response.contents).find('.b-list-advert__template').has('img.squared.js-api-lazy-image');


                    if(!html.length) return showError();




                    //Clearing some memory
                    response = null;


                    {
                        let title;
                        let description;
                        let image;
                        let price;
                        let location;
                        let link;
                        let counter = 0;
                        html.each(function (index) {

                            title = $.trim($(this).find('.qa-advert-title.js-advert-link').text()).truncate(defaults.maxTitleLength);
                            description = $.trim($(this).find('.b-list-advert__item-description-text').text()).truncate(defaults.maxDescriptionLength);
                            price = $.trim($(this).find('.b-list-advert__item-price').text().replace( /^\D+/g, '')).toLocaleString();
                            link = $(this).find('.js-advert-link');

                            image = $(this).find('img').attr('data-src');




                            location = $(this).find('.b-list-advert__item-region').text();
                            selectedEcommerce.titles.push(title);
                            selectedEcommerce.descriptions.push(description);
                            selectedEcommerce.images.push(image);
                            selectedEcommerce.prices.push(price);
                            selectedEcommerce.links.push(link.attr('href'));
                            selectedEcommerce.locations.push(location);
                            selectedEcommerce.linkTexts.push(String(link.attr('href')).truncate(defaults.maxLinkLength));

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
                $.get(defaults.crawler , {url : url , user_agent : user_agent} , response => {

                    let html = $(response.contents).find('.sku.-gallery');


                    if(!html.length) return showError();



                    response = null;


                    {
                        let title;
                        let description;
                        let image;
                        let price;
                        //let location;
                        let link;
                        html.each(function (index) {


                            title = $.trim($(this).find('.name').text()).truncate(defaults.maxTitleLength);
                            description = $.trim($(this).find('.name').text()).truncate(defaults.maxDescriptionLength);
                            image = $.trim($(this).find('.lazy.image').attr('data-src'));
                            price = $.trim($(this).find('.price').first().text().replace(/^\D+/g, '')).toLocaleString();
                            link = $(this).find('.link').attr('href');

                            //location = $(this).find('.b-list-advert__item-region').text();
                            if(title !== "") {
                                selectedEcommerce.titles.push(title);
                                selectedEcommerce.descriptions.push(description);
                                selectedEcommerce.images.push(image);
                                selectedEcommerce.prices.push(price);
                                selectedEcommerce.links.push(link);
                                selectedEcommerce.locations.push("");
                                selectedEcommerce.linkTexts.push(String(link).truncate(defaults.maxLinkLength));
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


                    if(!response.results.length) return showError();

                    response.results[0].hits.forEach(obj => {


                        selectedEcommerce.titles.push(obj.name.truncate(defaults.maxTitleLength));
                        selectedEcommerce.descriptions.push(obj.description.truncate(defaults.maxDescriptionLength));
                        selectedEcommerce.images.push("https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product" + obj.image_thumbnail_path);
                        selectedEcommerce.prices.push(obj.price.toLocaleString());
                        selectedEcommerce.locations.push("");

                        selectedEcommerce.links.push('https://konga.com/product/' + obj.url_key);
                        selectedEcommerce.linkTexts.push(String('https://konga.com/product/' + obj.url_key).truncate(defaults.maxLinkLength));


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


                $.get(defaults.crawler , {url : url , user_agent : user_agent} , response => {

                    let html = $(response.contents).find('.post');



                    if(!html.length) return showError();


                    //Clearing some memory
                    response = null;


                    {
                        let title;
                        let description;
                        let image;
                        let price;
                        let location;
                        let link;
                        let counter = 0;
                        html.each(function (index) {


                            title = $.trim($(this).find('.post-link').text()).truncate(defaults.maxTitleLength);
                            description = $.trim($(this).find('.post-link').text()).truncate(defaults.maxDescriptionLength);
                            image = $.trim($(this).find('.product-images').attr('data-src'));
                            price = $.trim($(this).find('.price').text().replace( /^\D+/g, '')).toLocaleString();
                            link = "https://deals.jumia.com.ng/" + $(this).find('.post-link').attr('href');

                            location = $(this).find('.address').text();
                            selectedEcommerce.titles = [...selectedEcommerce.titles , title];
                            selectedEcommerce.descriptions = [...selectedEcommerce.descriptions , description];
                            selectedEcommerce.images = [...selectedEcommerce.images , image];
                            selectedEcommerce.prices = [...selectedEcommerce.prices , price];
                            selectedEcommerce.links = [...selectedEcommerce.links , link];
                            selectedEcommerce.locations = [...selectedEcommerce.locations, location];
                            selectedEcommerce.linkTexts = [...selectedEcommerce.linkTexts , String(link).truncate(defaults.maxLinkLength)];

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

                $.get(defaults.crawler, {url , user_agent}, response => {


                    if (!response.contents || response.contents.data.length ) {
                        return showError();
                    }


                    {


                        response.contents.data.forEach(obj => {


                            selectedEcommerce.titles.push(obj.title.truncate(defaults.maxTitleLength));
                            selectedEcommerce.descriptions.push(obj.description.truncate(defaults.maxDescriptionLength));
                            selectedEcommerce.images.push(obj.images[0].url);
                            selectedEcommerce.prices.push(obj.price ? obj.price.value.raw.toLocaleString() : 0);
                            selectedEcommerce.locations.push(obj.locations_resolved.ADMIN_LEVEL_1_name);
                            selectedEcommerce.links.push('https://www.olx.com.ng/item/' + obj.title.split(" ").join("-").toLowerCase() + "-iid-" + obj.id);
                            selectedEcommerce.linkTexts.push(String('https://www.olx.com.ng/item/' + obj.title.split(" ").join("-").toLowerCase() + "-iid-" + obj.id).truncate(defaults.maxLinkLength));
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


    handleLoadMore = (website) => {

    };

    defaultActions = () => {
        let tabs = $('.tabs#tabs');
        tabs.tabs();
        $('.gallery span.modal-link').lightbox();



    };

    componentDidUpdate() {
        this.defaultActions();
    }
    componentDidMount() {
        this.modal = $("#myModal");



        this.defaultActions();




        if (localStorage.getItem(defaults.savedState)) {
            let cookieObj = JSON.parse(localStorage.getItem(defaults.savedState));
            if(this.props.switchWebsite({...cookieObj , processingAction : false})){

                this.defaultActions();
            }
        }
    }

    saveImage = (alt , link , src) => {

        this.props.switchWebsite({...this.props , gallery: [...this.props.gallery , {alt , link , src}]});

        M.toast({html: "image added to your gallery"});

    };




    render() {

        const {settings} = this.props;
        let locale = settings.localSearch ? this.props.locale : this.props.international;

        let active;
        const tabList =  locale.map((local , index) => {

            active = !index ? "active" : "";
            return (


                <li id = {local.shortName + "-tab"} onClick={() => this.switchToWebsite(local.shortName , index)} key = {local.name} className="tab website-list-tabs"><a href= {"#" + local.shortName} id = {local.shortName + "-tab-link"} className={"tab-links " + active}><img src={defaults.imageDirectory + local.shortName +'.png'} className="responsive-img tab-icons" /></a></li>


            )


        });



        let tabContainers = locale.map((local , pos)  => {

            let loadMoreButton = (local.loadMore && !this.props.processingAction) ?
                <div className="load-more-action-button-wrapper">
                <span className="waves-effect waves-light btn-small load-more-action" onClick={() => this.switchToWebsite(local.shortName , pos , true)}
                      id = {local.shortName + "-load-more-action"}><i className="material-icons left">refresh</i><span>More</span>
                </span>
                </div> : null;


            let showLocation;
            let showImages;
            let showPrice;
            let bg;
            let currency;
            let template = (local.titles.length) ? local.images.map((image, index) => {
                let savedImage;
                let imageSaved = false;

                savedImage = this.props.gallery.find((imageObject , index)=> {
                    return  image === imageObject.src;
                });

                imageSaved = savedImage !== undefined;

                bg = `${local.images[index]}`;
                showImages = (this.props.settings.showImages) && local.images[index] != null ?
                    <span className="modal-link"  data-caption = {local.titles[index]} href = {local.images[index]}>
                    <div className="image-container" onClick={  imageSaved ? null : () => {this.saveImage(local.titles[index] , local.links[index] , image)}} data-image={local.images[index]}>
                        <div className="blurred-bg lazyload" data-bgset={bg}></div>
                    <div className="lazyload overlay" data-bgset={bg}  title = {local.titles[index]} onClick={() => {return imageSaved ? null : null}}></div>
                    </div>
    </span>: null;

                currency = this.props.settings.localSearch ? <span>&#8358;</span> : <span>$</span>;
                showPrice = (local.prices[index]) ? <h5 className="green-text search-result-price">{currency}{local.prices[index]}</h5> : <h5 className="green-text search-result-price">price not specified</h5>;
                showLocation = local.locations[index].length ?

                    <span className="search-result-locations blue-grey-text"><i
                        className="tiny material-icons search-location-icons">location_on</i>{local.locations[index]}</span> : null;
                return (

                    <div className="search-result" key = {Math.random()}>

                        {showPrice}

                        <h3 className="search-result-title-header"><a target="_blank" className="search-result-title-link"
                                                                      href={local.links[index]}>
                            {local.titles[index]}
                        </a></h3>
                        <a className="search-result-link-address" target="_blank"
                           href={local.links[index]}>
                            {local.linkTexts[index]}
                        </a>
                        <span className="search-result-link-description">
{local.descriptions[index]}
</span>
                        {showImages}
                        <a download = {local.titles[index]} target="_blank" href={image}     className="image-download-link search-result-images blue-text"><i
                            className="tiny material-icons search-image-icons">image</i> {  imageSaved ? "Image Saved" : "Save Image"}</a>
                        {showLocation}


                    </div>)
            }) : <p className="helper-text error-text" data-error = {local.error}>{local.error}</p>;


            return (

                <div id={local.shortName} className="col s12 gallery" key={local.name}>

                    <p className='flow-text' style={{color : local.textColor}}>{local.name}</p>
                    <div className={"container " + defaults.searchResultPreloaders}
                         id={local.shortName + "-" + defaults.searchResultPreloader}>
                        <div className="circular-container">
                            <div className="circle circular-loader1">
                                <div className="circle circular-loader2"></div>
                            </div>
                        </div>
                    </div>

                    <div id={local.shortName + searchResults}>

                        {template}

                        {loadMoreButton}
                    </div>


                </div>

            );

        });


        return (

            <div id="local-search-tab-container" className="search-tabs">
                <ul id = "tabs" className="tabs locale-tabs tabs-fixed-width tab-demo z-depth-1">
                    {tabList}
                </ul>
                {tabContainers}


            </div>
        );

    }
}

let mapDispatchToProps = dispatch => {

    return {
        switchWebsite : state => dispatch({type : 'SWITCH_WEBSITE' , state})
    };
};

let mapStateToProps = state => {
    return state;
};
LocalSearchTab = connect(mapStateToProps , mapDispatchToProps)(LocalSearchTab);

