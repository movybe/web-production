class Affiliate extends React.Component
{


    adRates = {};
    defaultActions = () =>
    {

        let fundStatusTabs  = $('.tabs.fund-status-tabs');
        let accounInfoTabs = $('.tabs.account-info-tabs');

        $('.tabs').tabs();
        //  $('.tabs').tabs('updateTabIndicator');
        fundStatusTabs.tabs('select' , 'account-balance-tab');
        accounInfoTabs.tabs('select' , 'email-tab');
    };

    refreshProfile =  () => {
        let data = {email : this.props.email , action : 'FETCH_AFFILIATE_DETAILS'};
        data = JSON.stringify(data);
        $.post(defaults.actions , {data} , response1 => {
            response1 = JSON.parse(response1);
            this.props.resetState({...this.props , user : response1.user});
        });
    };

    componentDidMount()
    {
        this.defaultActions();
        let data = {email : this.props.email , action : 'FETCH_AFFILIATE_DETAILS'};
        data = JSON.stringify(data);
        $.post(defaults.actions , {data} , response1 => {

            this.registeredTimeago = timeago.format(this.props.user.registered_on);
            response1 = JSON.parse(response1);

            this.props.resetState({...this.props , user : response1.user , ads : response1.ads});

        });




    }

    componentDidUpdate () {
        this.defaultActions();
    }



    activateMerchantAccount = (callback = null) =>
    {

        defaults.payWithPaystack(this.props.email , defaults.convertToPaystack(defaults.merchantActivationFee) , "Account Activation" , (response) => {
            if(response.status !== defaults.successText) return defaults.showToast(defaults.transactionNotSuccessfulMessage);
            let data = {email : this.props.email , action : 'ACTIVATE_MERCHANT_ACCOUNT' , reference : response.reference};
            data = JSON.stringify(data);
            $.post(defaults.actions , {data} , response => {
                response = JSON.parse(response);
                if(this.props.resetState({...this.props , user : response.user})){
                    if(callback)callback();
                }
            })
        });

    };



    render() {



        let userSubscriptionStatus = Number(this.props.user.subscribed);
        let defaultEmailToShow = (this.props.user.email || "user@domain.com").truncate(defaults.emailTruncateSize);
        const subscriptionButtonType =  userSubscriptionStatus ?
            <div className="green-text"><span className="subscription-active-text">active</span><a className="waves-effect waves-light disabled btn-small right">Paid  &#8358; 700</a></div>     : <div><span className="materialize-red-text activate-account-text">NOT ACTIVATED</span> <a className="waves-effect waves-light btn-small right activate-account-button" onClick={this.activateMerchantAccount}>Activate  &#8358; {defaults.merchantActivationFee}</a></div>;
        return (
            <div>
                <AffiliateHeader refreshProfile = {this.refreshProfile} />
                <div className="container">
                    <div className="row notice-board z-depth-3">
                        <div className="col s12 valign-wrapper">
                            <p className="notice-header flow-text">Public message to Affiliates</p>
                        </div>
                        <div className="col s12 valign-wrapper">

                            <p className="notice-message">
                                Your affiliate account will require renewal once every 30 days, provided you've reached our threshold of &#8358;{defaults.thresholdAmount} for the month.
                                <br />our Demo Video is also a good tour guide for beginners.
                            </p>
                        </div>
                    </div>


                    <div className="row">


                        <div className="col s12 m6">
                            <h5 className="status-headers">Transaction History</h5>
                            <div className="card">
                                <div className="card-content">
                                    <p>
                                        The data below represents the record of all your transactions with us.


                                    </p>
                                </div>
                                <div className="card-tabs">
                                    <ul className="tabs fund-status-tabs tabs-fixed-width">
                                        <li className="tab" id="account-balance-tab"><a className="active" href="#account-balance">Acc Bal.</a></li>
                                        <li className="tab"><a  href="#total-amount-funded">Income</a></li>
                                        <li className="tab"><a href="#total-number-of-ads">Tot Ref.</a></li>
                                    </ul>
                                </div>
                                <div className="card-content grey lighten-4">
                                    <div id="account-balance" style={{display : 'none'}}>Acc balance :
                                        <span className="right amount-value">&#8358;{Number(this.props.user.account_balance).toLocaleString()}</span>
                                    </div>
                                    <div id="total-amount-funded">Total income :
                                        <span className="right amount-value">&#8358;{Number(this.props.user.total_income_earned).toLocaleString()}</span>
                                    </div>
                                    <div id="total-number-of-ads" style={{ display : 'none'}}>Total ref :
                                        <span className="right amount-value">{this.props.user.number_of_users_referred}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m6">

                            <h5 className="status-headers">Account Info</h5>
                            <div className="card">
                                <div className="card-content">
                                    <p>The data below contains other important info with regards to your account. </p>
                                </div>
                                <div className="card-tabs">
                                    <ul className="tabs tabs-fixed-width account-info-tabs">
                                        <li className="tab" id="email-tab"><a href="#email-address">E-mail</a></li>
                                        <li className="tab"><a href="#test5" className="flow-text">Status</a></li>
                                        <li className="tab"><a href="#test6" className="flow-text">Monthly</a></li>
                                    </ul>
                                </div>
                                <div className="card-content grey lighten-4">
                                    <div  id="email-address" style={{display : 'none'}}>E-mail<span className="right amount-value email-address" id="merchant-email-address">{defaultEmailToShow}</span></div>
                                    <div id="test5" className="active">{subscriptionButtonType}</div>
                                    <div id="test6" style={{ display : 'none'}}>Amount earned <span className="right">{this.props.user.amount_earned_for_the_month}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id = "break"></div>
                        <div className="col s12 m6">
                            <h5 className="status-headers">Important Links</h5>
                            <div className="card">
                                <div className="card-content">
                                    <p>
                                        list of all the links you need, for you to start earning
                                    </p>
                                </div>
                                <div className="card-tabs">
                                    <ul className="tabs fund-status-tabs tabs-fixed-width">
                                        <li className="tab" id="account-balance-tab"><a className="active" href="#referer-link">Link</a></li>
                                        <li className="tab"><a  href="#referer-username">Username</a></li>
                                        <li className="tab"><a href="#invite-link">Invite</a></li>
                                    </ul>
                                </div>
                                <div className="card-content grey lighten-4">
                                    <div id="referer-link" style={{display : 'none'}}>
                                        <span>{defaults.siteAddressHttps + `/campaign/${this.props.user.username}`}</span>
                                    </div>
                                    <div id="referer-username">
                                        <span>{this.props.user.username}</span>
                                    </div>
                                    <div id="invite-link" style={{ display : 'none'}}>
                                        <span>{defaults.siteAddressHttps + `/r/${this.props.user.username}`}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer accountType = "Affiliate" />
            </div>
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
Affiliate = connect(mapStateToProps , mapDispatchToProps)(Affiliate);

