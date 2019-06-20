let {connect} = ReactRedux;


class  LocalSearchTab extends React.Component{


    constructor() {
        super();
    }





    shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps;
    }


    defaultActions = () => {
        let tabs = $('.tabs#tabs');
        tabs.tabs();
        $('.gallery span.modal-link').lightbox();



    };


    componentDidUpdate() {
        this.defaultActions();

        let x ,sum, price , priceList , adsLength , isOddAdLength , average , priceListLengthDividedBy4 , priceListLengthDividedBy2, median , middleSum,  firstNPrice , lastNPrice , sumOfFirstNPrice , sumOfLatNPrice ,
            newAdsPriceSum , newPriceList , newPriceListAverage , newSum , sortAdInAscendingOrder , medianPlusMax;



        let locale = this.props.locale;




        let ad1Price, ad2Price;
        locale.forEach(local => {



            //Prevent the function from performing same action on same ad page
            if(!local.page || local.page === local.lastSortedPage || !local.ads.length || local.ads.length < 8) return;


            if (!local.shownSponsoredAds) {
                local.ads.push(...this.props.sponsoredAds);
                local.shownSponsoredAds = true;
            }

            if(!local.shownSponsoredAds ) return;




            sortAdInAscendingOrder = () => {


                local.ads.sort((a , b) => {
                    ad1Price = parseInt(a.price.toString().replace(/\D/g,''));
                    ad2Price = parseInt(b.price.toString().replace(/\D/g,''));
                    return ad1Price - ad2Price;
                });


            };








            isOddAdLength = !(!(local.ads.length%2));

            //Check if the ad length is an odd number

            priceList = [];

            local.ads.forEach((ad) => {

                price = parseInt(ad.price.toString().replace(/\D/g,''));
                priceList.push(price);
            });



            if(isOddAdLength)
            {

                sum = priceList.reduce((prev , next) => prev + next);

                average = Math.round(sum / priceList.length);

                priceList.push(average);
            }


            sortAdInAscendingOrder();

            //Sort the priceList
            priceList.sort((a , b) => a - b);


            priceListLengthDividedBy2 = priceList.length / 2;


            //Get the middle numbers of the price
            middleSum = priceList[priceListLengthDividedBy2 - 1] + priceList[priceListLengthDividedBy2];


            median = Math.round(middleSum / 2);








            local.average = numeral(median).format('0.0a');

            local.max = numeral(local.ads[local.ads.length -1].price).format('0.0a');

            medianPlusMax = median + priceList[priceList.length -1];

            local.bestOfferInt = parseInt(medianPlusMax / 2);

            local.bestOffer = numeral(local.bestOfferInt.toLocaleString()).format('0.0a');




            //To prevent resorting of already sorted ad array
            local.lastSortedPage += 1;

        });


        // this.props.switchWebsite({...this.props , locale});
        this.props.switchWebsite({...this.props , locale});



    }
    componentDidMount() {
        this.modal = $("#myModal");



        this.defaultActions();




        /*
        if (localStorage.getItem(defaults.savedState)) {
            let cookieObj = JSON.parse(localStorage.getItem(defaults.savedState));
            if(this.props.switchWebsite({...cookieObj , processingAction : false})){
                this.defaultActions();
            }
        }
        */
    }

    saveImage = (alt , link , src) => {

        this.props.switchWebsite({...this.props , gallery: [...this.props.gallery , {alt , link , src}]});

        M.toast({html: "image added to your gallery"});

    };


    handleSponsoredAdClicked = e => {

        const element = $(e.target);
        const adID = element.attr('data-ad-id');


        let data = {action : 'SPONSORED_AD_CLICKED' , email : defaults.dummyEmail , ad_id : adID};
        data = JSON.stringify(data);

        $.post(defaults.actions , {data} , response => {

            const sponsoredAdsClicked = [...this.props.sponsoredAdsClicked , adID];

            this.props.switchWebsite({...this.props , sponsoredAdsClicked});

        });
    };


    tabListClickAction = (name , index) => {


        return  !this.props.processingAction ? this.props.switchToWebsite(name , index) : null;
    };


    render() {


        const {settings} = this.props;
        let locale = settings.localSearch ? this.props.locale : this.props.international;

        let active;
        const tabList =  locale.map((local , index) => {

            active = !index ? "active" : "";
            return (


                <li id = {local.shortName + "-tab"} onClick={
                    () => {
                        return  !this.props.processingAction ? this.props.switchToWebsite(local.shortName , index) : null;
                    }
                }
                    key = {local.name} className="tab website-list-tabs"><a href= {"#" + local.shortName} id = {local.shortName + "-tab-link"} className={"tab-links " + active}><img data-src={defaults.imageDirectory + local.shortName +'.png'} className="responsive-img tab-icons lazyload" /></a></li>


            )




        });


        let loadMoreButton;
        let tabContainers = locale.map((local , pos)  => {




            loadMoreButton = (local.loadMore && !this.props.processingAction && local.ads.length) ?
                <div className="load-more-action-button-wrapper">
                <span className="waves-effect waves-light btn-small load-more-action" onClick={() => {this.props.switchToWebsite(local.shortName , pos , true)}}
                      id = {local.shortName + "-load-more-action"}><i className="material-icons left">refresh</i><span>More</span>
                </span>
                </div> : null;

            loadMoreButton = (loadMoreButton === null && !this.props.loadMore && !this.props.processingAction && local.ads.length) ? <h5 className="center-align load-more-error-messages">{defaults.noMoreResultsFoundError + " on " + local.name}</h5> : loadMoreButton;

            let showLocation;
            let showImages;
            let showPrice;
            let bg;
            let currency;
            let preloader;
            let averagePrice;
            let sponsoredAdLength = 0;
            let isValidSponsoredAd;
            let seenBestOffer = false;
            let bestOfferClass = "";
            let priceToNumber = 0;
            let template = (local.ads.length) ? local.ads.map((ad, index) => {

                priceToNumber = parseInt(ad.price.toString().replace(/,/g, ''));
                if(priceToNumber >= local.bestOfferInt && !seenBestOffer) {
                    seenBestOffer = true;
                    bestOfferClass = <div className="best-offer"></div> ;

                    console.log("Yah");
                }
                else {
                    bestOfferClass = "";
                }

                let savedImage;
                let imageSaved = false;

                savedImage = this.props.gallery.find((imageObject , index)=> {
                    return  ad.image === imageObject.src;
                });

                imageSaved = savedImage !== undefined;



                bg = `${ad.image}`;
                showImages = (this.props.settings.showImages) && ad.image != null ?
                    <span className="modal-link"  data-caption = {ad.title} href = {ad.image}>
                    <div className={"image-container"} onClick={  imageSaved ? null : () => {this.saveImage(ad.title , ad.link , ad.image)}} data-image={ad.image}>
                        {bestOfferClass}
                        <div className="blurred-bg lazyload" data-bgset={bg}></div>
                    <div className="lazyload overlay" data-bgset={bg}  title = {ad.title} onClick={() => {return imageSaved ? null : null}}></div>
                    </div>
    </span>: null;

                isValidSponsoredAd = ad.is_sponsored_ad && this.props.sponsoredAdsClicked.indexOf(ad.ad_id) < 0;
                currency = this.props.settings.localSearch ? <span>&#8358;</span> : <span>$</span>;
                showPrice = (ad.price !== 0) ? <h6 className="green-text search-result-price">{currency}{ad.price}</h6> : <h5 className="green-text search-result-price">{defaults.priceNotSpecifiedText}</h5>;
                showPrice = (ad.is_sponsored_ad) ? <h6 className="green-text search-result-price">{defaults.sponsoredAdText}</h6> : showPrice;
                showLocation = ad.location.length ?
                    <span className="search-result-locations blue-grey-text"><i
                        className="tiny material-icons search-location-icons">location_on</i>{ad.location}</span> : null;
                return (

                    <div className="search-result" key = {Math.random()}>
                        {showPrice}

                        <h3 className="search-result-title-header"><a target="_blank" data-ad-id = {isValidSponsoredAd ? ad.ad_id : null}  onClick={isValidSponsoredAd ? this.handleSponsoredAdClicked : null} className="search-result-title-link"
                                                                      href={ad.link}>
                            {ad.title}
                        </a></h3>
                        <a className="search-result-link-address"
                           href="#">
                            {ad.linkText}
                        </a>
                        <span className="search-result-link-description">
{ad.description}
</span>
                        {showImages}
                        <a download = {ad.title} target="_blank" href={ad.image}     className="image-download-link search-result-images blue-text"><i
                            className="tiny material-icons search-image-icons">image</i> {  imageSaved ? "Image Saved" : "Save Image"}</a>
                        {showLocation}


                    </div>)
            }) :  null;

            let boldedQuery = <strong>{this.props.query}</strong>;
            template = (template === null && local.page && !this.props.processingAction) ? <h5 className="center-align load-more-error-messages">{defaults.noResultsFoundError + ` for "`}{boldedQuery}{`" on ${local.name}` }</h5> : template;

            preloader = (template === null && this.props.processingAction) ?
                <div className={"container " + defaults.searchResultPreloaders}
                     id={local.shortName + "-" + defaults.searchResultPreloader}>
                    <div className="circular-container">
                        <div className="circle circular-loader1">
                            <div className="circle circular-loader2"></div>
                        </div>
                    </div>
                </div>
                : null;

            template = (template === null && this.props.processingAction) ? <h5 className="center-align load-more-error-messages">{defaults.pleaseWaitText}</h5> : template;
            averagePrice = local.average !== 0 ? <span className="average-price right"><span className="market-price">Mkt Price:</span> &#8358;{local.average} - &#8358;{local.max} </span> : null;

            return (

                <div id={local.shortName} className="col s12 gallery" key={local.name}>

                    <p className='flow-text' style={{color : local.textColor}}>{local.name} {averagePrice}</p>

                    {preloader}
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

let mapStateToProps = (state , ownProps) => {
    return {...state , ...ownProps};
};
LocalSearchTab = connect(mapStateToProps , mapDispatchToProps)(LocalSearchTab);