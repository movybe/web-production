const LocalSearchTab = ({locale}) => {

    let counter = 0;
    let tabList =  locale.map((local) => {

        counter ++;
        return (


            (counter == 1) ? <li key={local.name} className="tab disabled"><a className="active" href={"#" + local.shortName}><img src={imageDirectory + local.shortName +'.png'} className="responsive-img tab-icons"/></a></li> : <li key = {local.name} className="tab"><a href={"#" + local.shortName}><img src={imageDirectory + local.shortName +'.png'} className="responsive-img tab-icons"/></a></li>


        )


    });



    let tabContainers = locale.map((local) => {

        return (


            <div id={local.shortName} className="col s12" key={local.name}>

                <p className={`flow-text ${local.textColor}-text`}>{local.name}</p>
                <div className="container search-result-preloaders" id={local.shortName + "search-result-preloader"}>
                    <div className="circular-container">
                        <div className="circle circular-loader1">
                            <div className="circle circular-loader2"></div>
                        </div>
                    </div>
                </div>

<div id = {local.shortName + "-search-result"} className = "search-results">

</div>
            </div>

         );
    });
    return (

        <div id="local-search-tab-container" className="search-tabs">
            <ul className="tabs tabs-fixed-width tab-demo z-depth-1">
                {tabList}
            </ul>
            {tabContainers}
        </div>
    );
};