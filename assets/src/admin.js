class Admin extends React.Component
{
    texts ={payments : 'payments' , ads : 'ads' , stats : 'stats'};
    state = {
        content : this.texts.payments ,
        payment_details : [
            {account_name : "Kosi Eric" , account_number : 2093954338 , bank_name : "Access Bank" , amount : 34000,
                number_of_withdrawals : 0, total_withdrawals_amount : 0}
        ]
        ,
        current_payment_index : -1,
        site_statistics : {} ,
        sponsored_ads : [],
        current_sponsored_ads_index  : 0
    };


    componentWillMount = () => {

            $.getScript('/assets/js/clipboard.js');
            document.title = defaults.siteName + " • Admin Panel";
    };


    refreshProfile = () => {
        let data = {email : this.props.email , action : 'FETCH_MERCHANT_DETAILS'};
        data = JSON.stringify(data);
        $.post(defaults.actions , {data} , response1 => {
            response1 = JSON.parse(response1);
            this.props.resetState({...this.props , user : response1.user , ads : response1.ads});
            this.setState({...this.state , site_statistics : response1.user.site_statistics});
        });
    };


    getNextSponsoredAds = (index = this.state.current_sponsored_ads_index) =>
    {

        let data = {email : this.props.email  , action : 'GET_SPONSORED_ADS' , index};
        data = JSON.stringify(data);

        $.post(defaults.actions , {data} , response => {
           response = JSON.parse(response);
           const nextIndex = index + defaults.numberOfAdsForAdminReview;
           this.setState({...this.state , sponsored_ads : response.sponsored_ads , current_sponsored_ads_index :nextIndex});

        });
    
    };


    getNextPaymentDetails = (index = this.state.current_payment_index) => {
        let data = {action : 'FETCH_NEXT_PAYMENT_DETAILS' , email : this.props.email , index};
        data = JSON.stringify(data);

        $.post(defaults.actions , {data} , response => {


                response = JSON.parse(response);


                if(response.payment_details.amount) {
                    let payment_details = response.payment_details.amount ? [response.payment_details] : [];

                    this.setState({
                        ...this.state,
                        payment_details,
                        current_payment_index: parseInt(response.payment_details.id)
                    });

                }
                else
                {
                    this.setState({
                        ...this.state,
                        payment_details : [],

                    });

                }

        });
    };

    handleAdminMessageForm = (e) => {
        e.preventDefault();

        const adminMessageFieldset = $('.admin-message-fieldset');
        const adminMessageForm = $(e.target);

        adminMessageForm.validate();

        if(adminMessageForm.valid())
        {
            adminMessageFieldset.prop(...defaults.disabledTrue);
            let adId = adminMessageForm.attr('data-ad-id');
            let message = $(`#${adId}-textarea`).val();
            let data = {message , ad_id : adId , action : 'DISAPPROVE_AD' , email : this.props.user.email};
            data = JSON.stringify(data);
            $.post(defaults.actions , {data} , response => {

                response = JSON.parse(response);


                defaults.showToast(response.error);
                adminMessageFieldset.prop(...defaults.disabledFalse);
                this.getNextSponsoredAds(0);

            });
        }
    };

    sponsoredAds = () => {


        let style = null;

        if(!this.state.sponsored_ads.length) return <h5>No ads yet.</h5>;

        const sponsoredAds = this.state.sponsored_ads.map(ad => {

            style = {backgroundImage: `url(${defaults.bannerImageLocation + ad.banner})`};


            return (

                <div className="olx-search-result" key = {ad.ad_id}>

                    <h6 className="green-text search-result-price"><span>AD ({ad.ad_id})</span></h6><h3
                    className="search-result-title-header"><a target="_blank"
                                                              className="search-result-title-link"
                                                              href={ad.link}>{ad.title}
                                                              </a>
                </h3><a className="search-result-link-address" target="_blank">{ad.link.truncate(defaults.maxLinkLength)}</a><span
                    className="search-result-link-description" >{ad.description.truncate(defaults.maxDescriptionLength)}</span>
                    <span className="modal-link" data-caption={ad.title} href = {`${defaults.bannerImageLocation}${ad.banner}`}>{null}</span>
                    <a target='_blank'
                        href='#'
                        className="image-download-link search-result-images blue-text"><i
                        className="tiny material-icons search-image-icons">image</i> Save Image</a>
                    <span className="search-result-locations blue-grey-text"><i
                        className="tiny material-icons search-location-icons">location_on</i><span id ="ad-location-preview">{ad.location}</span></span>

                    <span className="modal-link">
                    <div className="image-container ad-image-previews-container" style={style}>
                        <div className="blurred-bg ad-image-previews" style={style}></div>
                    <div className="overlay ad-image-previews" style={style}>
                    </div>
                    </div>
    </span>
                    <fieldset className='admin-message-fieldset'>
                    <form className='admin-message-form' data-ad-id = {ad.ad_id} onSubmit={this.handleAdminMessageForm}>
                    <div className="row what-is-wrong-with-this-ad">
                        <div className="input-field col s12">

                            <textarea id = {ad.ad_id + '-textarea'} className="materialize-textarea admin-ad-message" maxLength={defaults.maximumAdminAdMessageLength} data-length={defaults.maximumAdminAdMessageLength} required='required'></textarea>
                            <label htmlFor={ad.ad_id + '-textarea'}>What is wrong with this Ad?</label>
                            <button className='btn' type = 'submit'>Send</button>
                        </div>
                    </div>
                    </form>
                    </fieldset>
                </div>
            )
        });

        return (
            <div>
                {sponsoredAds}
                <a href='#' className="waves-effect waves-light next-payment-button next-ad-button btn right" onClick={() => {this.getNextSponsoredAds()}}>Next</a>
            </div>
        );
    };

    confirmPayment = (paid = true) => {


        let getNext = true;
        //if the user was actually paid
        if(paid) {
            getNext = false;
            let data = {
                action: 'CONFIRM_PAYMENT',
                email: this.props.email,
                reference_code: this.state.payment_details[0].reference_code,
                amount : this.state.payment_details[0].amount,
                username : this.state.payment_details[0].username
            };
            data = JSON.stringify(data);

            $.post(defaults.actions, {data}, response => {

                response = JSON.parse(response);
                defaults.showToast(response.error);

                this.getNextPaymentDetails();
            });

        }
        this.confirmPaymentModalPopup.modal('close');
        if(getNext)this.getNextPaymentDetails();

    };

    componentDidMount = () => {


        this.sidenav = $('.sidenav');
        this.sidenav.sidenav({preventScrolling:true});
        $('.collapsible').collapsible();

        //Fetch the next payment details

        this.getNextPaymentDetails();


            this.refreshProfile();
            this.confirmPaymentModalPopup = $('.modal#confirm-payment-modal');
            this.confirmPaymentModalPopup.modal({dismissible: false});


    };

    confirmPaymentModal = () => {
        return (
            <div id="confirm-payment-modal" className="modal">
                <div className="modal-content">
                    <h4>Confirm payment to user</h4>
                    <p>Have you made payment to this account?</p>
                </div>
                <div className="modal-footer">
                    <a href="#" className="modal-action modal-close waves-effect waves-green btn green payment-yes-click" onClick={this.confirmPayment}>YES</a>
                    <a href="#" className="modal-action modal-close waves-effect waves-red btn red" onClick={() => this.confirmPayment(false)}>NO</a>
                </div>
            </div>
        )
    };


    siteStatistics = () => {
        let value = 0;
        let field = null;
        const tableBody = Object.keys(this.state.site_statistics).map(key  => {

            field = key.replace(/_/g, ' ');
            value = this.state.site_statistics[key];
            value = !isNaN(value) ? this.convertDecimalToLocaleString(value) : value;
            switch (key) {
                case 'last_invitation_date':
                    value = timeago.format(value);
                    break;
            }

            return (
                <tr key = {Math.random()}>
                    <td>
                        <strong className='strong site-statistics-field-name'>{field}</strong>
                    </td>
                    <td>
                        {value}
                    </td>
                </tr>
            )
        });
        return (
        <table className="striped centered highlight">
        <thead>
        <tr>
            <th>Field</th>
            <th>Value</th>
        </tr>
        </thead>
            <tbody>
            {tableBody}
            </tbody>
        </table>
        )
    };

    paymentDetailsTable = () => {

        let display = this.state.payment_details.length ?
            <div>
            <table className="striped centered responsive-table highlight">
                <thead>
                <tr>
                    <th>Acc name</th>
                    <th>Acc No.</th>
                    <th>Bank</th>
                    <th>Amount</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>{this.state.payment_details[0].account_name.truncate(defaults.accountNameLengthToShow)}</td>
                    <td>{this.state.payment_details[0].account_number} <a href='#' className='no-underline' onClick={() => clipboard.writeText(this.state.payment_details[0].account_number)}>copy</a> </td>
                    <td>{this.state.payment_details[0].bank_name}</td>
                    <td>&#8358;{this.convertDecimalToLocaleString(this.state.payment_details[0].amount)}</td>
                </tr>
                </tbody>
            </table>
                <a href='#confirm-payment-modal' className="waves-effect waves-light next-payment-button btn right modal-trigger">Next</a>
            </div>
            : <h5>No payment Request yet.</h5>;

        return (



            <div>
                {display}
                </div>
           )
    };
    componentDidUpdate = () => {
        this.sidenav = $('.sidenav');

        this.sidenav.sidenav({preventScrolling:true});
        $('textarea.admin-ad-message').characterCounter()
    };


    changeAdminContent = (e) => {
        const content = $(e.target).attr('data-content');
        this.setState({...this.state , content});

      };

    header = () => {
        return (

            <header className = 'admin-account-header'>
                <nav className='admin-navbar'>
                    <div className="nav-wrapper">
                        <a href="#" data-target="slide-out" className="sidenav-trigger"><i
                            className="material-icons">menu</i></a>
                        <a href="#" className="brand-logo admin-brand-logo"><img src = {defaults.imageDirectory + 'm-shadow.png'} className='admin-nav-brand-logo'/>
                            <span className="brand-name">{defaults.siteName}</span> </a>
                    </div>
                </nav>


            </header>
        );
    };


    sideNav = () => {
        return (
            <ul id="slide-out" className="admin-sidenav sidenav sidenav-fixed">
                <li>
                    <div className="user-view">
                        <div className="background">
                            <img src={defaults.imageDirectory+'admin-image-background.jpg'} />
                        </div>
                        <a href="#"><img className="circle" src={defaults.imageDirectory+'favicon.png'} /></a>
                        <a href="#"><span className="white-text name admin-name">{defaults.siteName + ' Admin'}</span></a>
                        <a href="#"><span className="white-text email">{this.props.user.email}</span></a>
                    </div>
                </li>
                <li className="no-padding">
                    <ul className="collapsible collapsible-accordion">
                        <li>
                            <a className="collapsible-header">Payments<i
                                className="material-icons">payment</i>

                            </a>
                            <div className="collapsible-body">
                                <ul>
                                    <li>
                                        <a href="#" className="admin-action-links" data-content = {this.texts.payments} onClick={e => {this.changeAdminContent(e);this.getNextPaymentDetails(-1)}}><i className="fa fa-share"></i>Withdrawal Requests
                                        </a>
                                        <i className='material-icons admin-refresh-icon refresh-withdrawal-requests-icon' title='refresh' onClick={() => this.getNextPaymentDetails(-1)}>refresh</i>

                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </li>

                <li className="no-padding">
                    <ul className="collapsible collapsible-accordion">
                        <li>
                            <a className="collapsible-header"><i className="fa fa-bullhorn bullhorn-icon ad-management-icon"></i>Ad Management</a>
                            <div className="collapsible-body">
                                <ul>
                                    <li>
                                        <a href="#" className="admin-action-links" data-content = {this.texts.ads} onClick={this.changeAdminContent}>
                                        <i className="material-icons">rate_review</i> Review Ads
                                        </a>
                                        <i className='material-icons admin-refresh-icon refresh-withdrawal-requests-icon' title='refresh' onClick={() => {this.getNextSponsoredAds(0)}}>refresh</i>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </li>


                <li>
                    <div className="divider"></div>
                </li>


                <li className="no-padding">
                    <ul className="collapsible collapsible-accordion">
                        <li>
                            <a className="collapsible-header" href="#"><i className="material-icons">insert_chart</i>Statistics</a>
                            <div className="collapsible-body">
                                <ul>
                                    <li>
                                        <a href="#" className="admin-action-links" data-content = {this.texts.stats} onClick={this.changeAdminContent}><i className="material-icons">terrain</i>View stats</a>
                                        <i className='material-icons admin-refresh-icon' title='refresh' onClick={this.refreshProfile}>refresh</i>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </li>


                <li className="no-padding">
                    <ul className="collapsible collapsible-accordion">
                        <li>
                            <a className="collapsible-header" href="#"><i className="material-icons">person_pin</i>Account</a>
                            <div className="collapsible-body">
                                <ul>
                                    <li>
                                        <a href="#" className="admin-action-links" onClick={this.props.logout}><i className="material-icons">power_settings_new</i>Sign out</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </li>

            </ul>
        )
    };

    convertDecimalToLocaleString = decimal => {

        let number = parseInt(decimal);
        let dotPosition = decimal.toString().indexOf('.');
        if(dotPosition > 0)
        {
            number = number.toLocaleString() + '.' + decimal.toString().substring(dotPosition + 1);
            return number;
        }

        return number.toLocaleString();
    };
    render() {

        let content = null , firstStatusHeaderText = "Account Balance" , secondStatusHeaderText = "PROFIT";
        let firstHeaderValue = 0 , secondHeaderValue = 0;

        switch (this.state.content) {
            case this.texts.payments:
               content = this.paymentDetailsTable();
               firstStatusHeaderText = "No. of Withdrawals";
               secondStatusHeaderText = "Total Withdrawals Amount";

               firstHeaderValue = this.state.payment_details.length ? this.state.payment_details[0].number_of_withdrawals : firstHeaderValue;
               secondHeaderValue = this.state.payment_details.length ? this.state.payment_details[0].total_withdrawals_amount : secondHeaderValue;
               break;
            case this.texts.stats:
                content = this.siteStatistics();
                firstHeaderValue = <span>&#8358;{this.convertDecimalToLocaleString(this.props.user.site_statistics.account_balance)}</span>;
                secondHeaderValue = this.props.user.site_statistics.profit;
                break;
            case this.texts.ads:
                content = this.sponsoredAds();
        }

        return (
        <main className="admin-dashboard">
            {this.header()}
                       <aside>
                {this.sideNav()}
                           {this.confirmPaymentModal()}
            </aside>

            <div className="container admin-container">
            <div className="row">

                <div className="col s12 m6">
                    <h5 className="status-headers admin-status-headers">{firstStatusHeaderText}</h5>
                    <div className="card">
                        <div className="card-content">
                            <h5 className = 'cairo-font'>
                                {firstHeaderValue}

                            </h5>
                        </div>

                                           </div>
                </div>

                <div className="col s12 m6">
                    <h5 className="status-headers admin-status-headers">{secondStatusHeaderText}</h5>
                    <div className="card">
                        <div className="card-content">
                            <h5 className = 'cairo-font'>
                                &#8358;{this.convertDecimalToLocaleString(secondHeaderValue)}

                            </h5>
                        </div>

                    </div>
                </div>

            </div>

                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-content admin-actions-content-container">
                    {content}
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </main>

        );
    }
}



const mapStateToProps = (state , ownProps) => {
    return {
        ...state , ...ownProps
    }
};


const  mapDispatchToProps = dispatch =>
{

    return {
        resetState : (state , callback  = () => {}) => {
            dispatch({state , type : 'RESET_STATE'});
            callback();
        } ,
        restoreState : () => {
            dispatch({type : 'RESTORE_STATE'});
        } ,
        modifyState : state => {
            dispatch({type : 'MODIFY_STATE' , state});
        },
        factoryReset : (callback = () => {}) => {
            dispatch({type:'FACTORY_RESET'});
            return true;
        }

    }
};


const {connect} = ReactRedux;
Admin = connect(mapStateToProps , mapDispatchToProps)(Admin);

