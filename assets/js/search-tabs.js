let {connect} = ReactRedux;


class  LocalSearchTab extends React.Component{


    constructor() {
        super();
    }






    defaultActions = () => {
        let tabs = $('.tabs#tabs');
        tabs.tabs();
        $('.gallery span.modal-link').lightbox();



    };


    componentDidUpdate() {
        this.defaultActions();

        let locale = this.props.locale;

        let ad1Price, ad2Price;

        let x ,sum, price , priceList , adsLength , isOddAdLength , average , priceListLengthDividedBy4 , firstNPrice , lastNPrice , sumOfFirstNPrice , sumOfLatNPrice ,
            newAdsPriceSum , newPriceList , newPriceListAverage , newSum;
        locale.forEach(local => {



            local.ads = local.ads.sort((a , b) => {
                ad1Price = parseInt(a.price.toString().replace(/\D/g,''));
                ad2Price = parseInt(b.price.toString().replace(/\D/g,''));

                return ad2Price < ad1Price;

            });


            if(!local.ads.length || local.ads.length <= 8) {
                local.average = 0;
                return;
            }
            // Calculate average price

            sum = 0;
            price = 0;
            priceList = [];
            adsLength = local.ads.length;
            isOddAdLength = adsLength%2!==0;

            local.ads.forEach(ad => {
                price = parseInt(ad.price.toString().replace(/\D/g,''));
                priceList.push(price);
                sum += price;
            });


            //if the total ads length is an odd number
            if(isOddAdLength)
            {
                average = Math.round(sum / adsLength);

                //add the average to the priceList to make the length of the priceList an even number
                priceList.push(average);

                //sort the price list

                priceList.sort((a , b ) => b > a)


                  }




                  //PriceList length dividedby2 divided by 2

            priceListLengthDividedBy4 = priceList.length / 4;

            //console.log(priceListLengthDividedBy4);


            //Removing the first n elements of the price list array

                      priceList.splice(0 , priceListLengthDividedBy4);




                      //Removing the last n elements of the price list array we have

            priceList = priceList.slice(0 , priceList.length - priceListLengthDividedBy4);



            sum = priceList.reduce((a , b) => a + b);


            average = Math.round(sum / priceList.length);


            local.average = average.toLocaleString();




        });


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




    render() {

        const tabListClickAction = (name , index) => {

            return  !this.props.processingAction ? this.props.switchToWebsite(name , index) : null;
        };

        const {settings} = this.props;
        let locale = settings.localSearch ? this.props.locale : this.props.international;

        let active;
        const tabList =  locale.map((local , index) => {

            active = !index ? "active" : "";
            return (


                <li id = {local.shortName + "-tab"} onClick={
                    () =>
                    { tabListClickAction(local.shortName , index);}}
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
            let template = (local.ads.length) ? local.ads.map((ad, index) => {
                let savedImage;
                let imageSaved = false;

                savedImage = this.props.gallery.find((imageObject , index)=> {
                    return  ad.image === imageObject.src;
                });

                imageSaved = savedImage !== undefined;

                bg = `${ad.image}`;
                showImages = (this.props.settings.showImages) && ad.image != null ?
                    <span className="modal-link"  data-caption = {ad.title} href = {ad.image}>
                    <div className="image-container" onClick={  imageSaved ? null : () => {this.saveImage(ad.title , ad.link , ad.image)}} data-image={ad.image}>
                        <div className="blurred-bg lazyload" data-bgset={bg}></div>
                    <div className="lazyload overlay" data-bgset={bg}  title = {ad.title} onClick={() => {return imageSaved ? null : null}}></div>
                    </div>
    </span>: null;

                currency = this.props.settings.localSearch ? <span>&#8358;</span> : <span>$</span>;
                showPrice = (ad.price) ? <h6 className="green-text search-result-price">{currency}{ad.price}</h6> : <h5 className="green-text search-result-price">price not specified</h5>;
                showLocation = ad.location.length ?

                    <span className="search-result-locations blue-grey-text"><i
                        className="tiny material-icons search-location-icons">location_on</i>{ad.location}</span> : null;
                return (

                    <div className="search-result" key = {Math.random()}>

                        {showPrice}

                        <h3 className="search-result-title-header"><a target="_blank" className="search-result-title-link"
                                                                      href={ad.link}>
                            {ad.title}
                        </a></h3>
                        <a className="search-result-link-address" target="_blank"
                           href={ad.link}>
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
            averagePrice = local.average !== 0 ? <span className="average-price right">~ &#8358;{local.average}</span> : null;

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

