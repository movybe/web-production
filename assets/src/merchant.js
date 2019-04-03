class Merchant extends React.Component
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
    componentWillMount = () => {

        document.title = defaults.siteName + " • Merchant Account";
    };

    shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps;
    }

    componentDidMount()
    {
        this.defaultActions();
        let data = {email : this.props.email , action : 'FETCH_MERCHANT_DETAILS'};
        data = JSON.stringify(data);
        $.post(defaults.actions , {data} , response1 => {


            this.registeredTimeago = timeago.format(this.props.user.registered_on);
            response1 = JSON.parse(response1);


            data = {email : this.props.email , action : 'FETCH_AD_RATES'};
            data = JSON.stringify(data);
            $.post(defaults.actions , {data : data} , response2 =>  {

                response2 = JSON.parse(response2);
                this.props.resetState({...this.props , user : response1.user , ads : response1.ads , adRates : {...response2}});
            });

        });

    }

    componentDidUpdate () {
      this.defaultActions();
    }



    refreshProfile = () => {
        let data = {email : this.props.email , action : 'FETCH_MERCHANT_DETAILS'};
        data = JSON.stringify(data);
        $.post(defaults.actions , {data} , response1 => {
            response1 = JSON.parse(response1);
            this.props.resetState({...this.props , user : response1.user , ads : response1.ads});
        });
    };


    activateMerchantAccount = () =>
    {

        defaults.payWithPaystack(this.props.email , defaults.convertToPaystack(defaults.merchantActivationFee) , "Account Activation" , (response) => {
            if(response.status !== defaults.successText) return defaults.showToast(defaults.transactionNotSuccessfulMessage);
            let data = {email : this.props.email , action : 'ACTIVATE_MERCHANT_ACCOUNT' , reference : response.reference , amount: defaults.merchantActivationFee};
            data = JSON.stringify(data);
            $.post(defaults.actions , {data} , response => {
                this.refreshProfile();
            })
        });

    };


    render() {



        let userSubscriptionStatus = Number(this.props.user.subscribed);
        let defaultEmailToShow = (this.props.user.email || "user@domain.com").truncate(defaults.emailTruncateSize);
        const subscriptionButtonType =  userSubscriptionStatus ?
            <div className="green-text"><span className="subscription-active-text">active</span><a className="waves-effect waves-light disabled btn-small right">Paid &#8358;{defaults.merchantActivationFee}</a></div>     : <div><span className="materialize-red-text activate-account-text">NOT ACTIVATED</span> <a href = "#" className="waves-effect waves-light btn-small right activate-account-button" onClick={this.activateMerchantAccount}>Activate  &#8358; {defaults.merchantActivationFee}</a></div>;
        return (
            <div>
                <MerchantHeader />
            <div className="container">
                <div className="row notice-board z-depth-3">
                    <div className="col s12 valign-wrapper">
                        <p className="notice-header flow-text">Public message to advertisers</p>
                    </div>
                    <div className="col s12 valign-wrapper">

                    <p className="notice-message">
                        New Merchants are adviced to read our FAQ and our Terms of Service before proceeding with further actions on this page.
                        <br />our Demo Video is also a good tour guide.
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
                                    <li className="tab" id="account-balance-tab"><a className="active" href="#account-balance">Ad Bal.</a></li>
                                    <li className="tab"><a  href="#total-amount-funded">Trans.</a></li>
                                    <li className="tab"><a href="#total-number-of-ads">ADS</a></li>
                                     </ul>
                            </div>
                            <div className="card-content grey lighten-4">
                                <div id="account-balance" style={{display : 'none'}}>Ad balance :
                                <span className="right amount-value">&#8358;{Number(this.props.user.account_balance).toLocaleString()}</span>
                                </div>
                                <div id="total-amount-funded">Total transactions :
                                    <span className="right amount-value">&#8358;{Number(this.props.user.total_amount_funded).toLocaleString()}</span>
                                </div>
                                <div id="total-number-of-ads" style={{ display : 'none'}}>Total ads :
                                    <span className="right amount-value">{this.props.ads.length}</span>
                                </div>
                                </div>
                        </div>
                    </div>
                    <div className="col s12 m6">

                        <h5 className="status-headers">Account Info</h5>
                        <div className="card">
                            <div className="card-content">
                                <p>The data below contains your merchant account details and other important info. </p>
                            </div>
                            <div className="card-tabs">
                                <ul className="tabs tabs-fixed-width account-info-tabs">
                                    <li className="tab" id="email-tab"><a href="#email-address">E-mail</a></li>
                                    <li className="tab"><a href="#test5" className="flow-text">Status</a></li>
                                    <li className="tab"><a href="#test6" className="flow-text">Account</a></li>
                                   </ul>
                            </div>
                            <div className="card-content grey lighten-4">
                                <div  id="email-address" style={{display : 'none'}}>E-mail<span className="right amount-value email-address" id="merchant-email-address">{defaultEmailToShow}</span></div>
                                <div id="test5" className="active">{subscriptionButtonType}</div>
                                <div id="test6" style={{ display : 'none'}}>Registered <span className="right">{this.registeredTimeago}</span>
                                </div>
                            </div>
                        </div>
                        </div>

                </div>
                <MerchantAds activateMerchantAccount = {this.activateMerchantAccount} refreshProfile = {this.refreshProfile} />
            </div>
                <Footer accountType = "Merchant" refreshProfile = {this.refreshProfile} />
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
Merchant = connect(mapStateToProps , mapDispatchToProps)(Merchant);

