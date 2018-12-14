class  LocalSearchTab extends React.Component{





    render() {


        const {locale} = this.props;
        const tabList =  locale.map(local => {

            this.counter ++;
            return (


                this.counter == 1 ? <li key={local.name} className="tab disabled"><a className="active" href={"#" + local.shortName}><img src={imageDirectory + local.shortName +'.png'} className="responsive-img tab-icons"/></a></li> : <li key = {local.name} className="tab"><a href={"#" + local.shortName}><img src={imageDirectory + local.shortName +'.png'} className="responsive-img tab-icons"/></a></li>


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
                    <div className="container search-result-preloaders"
                         id={local.shortName + "-search-result-preloader"}>
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
                <ul className="tabs locale-tabs tabs-fixed-width tab-demo z-depth-1">
                    {tabList}
                </ul>
                {tabContainers}
            </div>
        );

    }
};