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


            loadMoreButton = (local.loadMore && !this.props.processingAction && local.titles.length) ?
                <div className="load-more-action-button-wrapper">
                <span className="waves-effect waves-light btn-small load-more-action" onClick={() => {this.props.switchToWebsite(local.shortName , pos , true)}}
                      id = {local.shortName + "-load-more-action"}><i className="material-icons left">refresh</i><span>More</span>
                </span>
                </div> : null;

            loadMoreButton = (loadMoreButton === null && !this.props.loadMore && !this.props.processingAction && local.titles.length) ? <h5 className="center-align load-more-error-messages">{defaults.noMoreResultsFoundError + " on " + local.name}</h5> : loadMoreButton;

            let showLocation;
            let showImages;
            let showPrice;
            let bg;
            let currency;
            let preloader;
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
                showPrice = (local.prices[index]) ? <h6 className="green-text search-result-price">{currency}{local.prices[index]}</h6> : <h5 className="green-text search-result-price">price not specified</h5>;
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


            return (

                <div id={local.shortName} className="col s12 gallery" key={local.name}>

                    <p className='flow-text' style={{color : local.textColor}}>{local.name}</p>
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

