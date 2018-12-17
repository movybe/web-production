let {connect} = ReactRedux;
let mapPropsToState = (state , ownProps) => {

    return state;

};


class  LocalSearchTab extends React.Component{



    switchToWebsite = (website , index)=> {

        let selectedEcommerce = this.props.locale.find(local => local.shortName == website
        );

        console.log(selectedEcommerce);
        //Check if page had already been already been clicked
        if(selectedEcommerce.page) return;

        $("."  + defaults.searchResultPreloaders).hide();

        //Resetting all the arrays of the selected E-commerce website
        Object.keys(selectedEcommerce).map( key => {

            return Array.isArray(selectedEcommerce[key]) ? selectedEcommerce[key] = [] : null;

        });

        $("#" + website + "-" + defaults.searchResultPreloader).show();

        switch (website) {

            case 'jiji' :
                //https://jiji.ng/search?query=samsung+galaxy+s7&page=1

                const url = "http://localhost:2021/jiji.php";

                $.get(defaults.crawler , {url} , response => {

                    let html = $(response.contents).find('.b-list-advert__template');


                    //Clearing some memory
                    response = null;


                    {
                        let title;
                        let description;
                        let image;
                        let price;
                        let location;
                        let link;
                        html.each(function (index) {


                            title = $.trim($(this).find('.qa-advert-title.js-advert-link').text()).truncate(defaults.maxTitleLength);
                            description = $.trim($(this).find('.b-list-advert__item-description-text').text()).truncate(defaults.maxDescriptionLength);
                            image = $.trim($(this).find('.squared.js-api-lazy-image').attr('src'));
                            price = $.trim($(this).find('.b-list-advert__item-price').text().replace( /^\D+/g, '')).toLocaleString();
                            link = $(this).find('.js-advert-link').attr('href');

                            location = $(this).find('.b-list-advert__item-region').text();
                            selectedEcommerce.titles.push(title);
                            selectedEcommerce.descriptions.push(description);
                            selectedEcommerce.images.push(image);
                            selectedEcommerce.prices.push(price);
                            selectedEcommerce.links.push(link);
                            selectedEcommerce.locations.push(location);
                            selectedEcommerce.linkTexts.push(String(link).truncate(defaults.maxLinkLength));

                        });

                        selectedEcommerce.page += 1;

                        this.props.locale[index] = selectedEcommerce;
                        let previousLocale = this.props.locale;

                        if(this.props.switchWebsite({...this.props , locale : previousLocale , currentWebsite : website})
                    ){
                            $("."  + defaults.searchResultPreloaders).hide();
                        }

                    }


                });



                break;
            case 'jumia' :
                //https://www.jumia.com.ng/catalog/?q=galaxy+s7&page=1
                break;
            case 'konga' :

        }
    };


    componentDidMount(){
        let tabs = $('.tabs#tabs');
        tabs.tabs();
        tabs.tabs('updateTabIndicator');
    }
    render() {


        const {locale} = this.props;

        let active;
        const tabList =  locale.map((local , index) => {

            active = !index ? "active" : "";
            return (


         <li id = {local.shortName + "-tab"} onClick={() => this.switchToWebsite(local.shortName , index)} key = {local.name} className="tab website-list-tabs"><a href= {"#" + local.shortName} id = {local.shortName + "-tab-link"} className={"tab-links " + active}><img src={defaults.imageDirectory + local.shortName +'.png'} className="responsive-img tab-icons" /></a></li>


            )


        });


        const tabContainers = locale.map(local => {


            const template = (local.images.length) ? local.images.map((image, index) => {

                return (

                    <div className="search-result" key = {Math.random()}>

                        <h5 className="green-text search-result-price">&#8358;{local.prices[index]}</h5>

                        <h3 className="search-result-title-header"><a className="search-result-title-link"
                                                                      href={local.links[index]}>
                            {local.titles[index]}
                        </a></h3>
                        <a className="search-result-link-address"
                           href={local.links[index]}>
                            {local.linkTexts[index]}
                        </a>
                        <span className="search-result-link-description">
{local.descriptions[index]}
</span>
                        <span className="search-result-images blue-text" data-image={local.images[index]}><i
                            className="tiny material-icons search-image-icons">image</i> View Image</span>

                        <span className="search-result-locations blue-grey-text"><i
                            className="tiny material-icons search-location-icons">location_on</i>{local.locations[index]}</span>

                    </div>)
            }) : null;


            return (

                <div id={local.shortName} className="col s12" key={local.name}>

                    <p className={`flow-text ${local.textColor}-text`}>{local.name}</p>
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
LocalSearchTab = connect(mapPropsToState , mapDispatchToProps)(LocalSearchTab);

