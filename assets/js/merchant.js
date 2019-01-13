class Merchant extends React.Component
{


    defaultActions = () =>
    {

        let fundStatusTabs  = $('.tabs.fund-status-tabs');
        let accounInfoTabs = $('.tabs.account-info-tabs');

        $('.tabs').tabs();
      //  $('.tabs').tabs('updateTabIndicator');
    fundStatusTabs.tabs('select' , 'account-balance-tab');
    accounInfoTabs.tabs('select' , 'email-tab');

    };
    componentDidMount()
    {
        this.defaultActions();
        let data = {email : this.props.email , action : 'FETCH_MERCHANT_DETAILS'};
        data = JSON.stringify(data);
        $.post(defaults.activity , {data} , response => {


            this.registeredTimeago = timeago.format(this.props.user.registered_on);
            response = JSON.parse(response);

            this.props.resetState({...this.props , user : response.user , ads : response.ads});
        });
    }
    componentDidUpdate () {
      this.defaultActions();
    }
    render() {



        const subscriptionButtonType = parseInt(this.props.user.subscribed) ?
            <div className="green-text"><span className="subscription-active-text">active</span><a className="waves-effect waves-light disabled btn-small right">Paid  &#8358; 700</a></div>     : <div><span className="materialize-red-text activate-account-text">NOT ACTIVATED</span> <a className="waves-effect waves-light btn-small right activateaccount-button">Activate  &#8358; 700</a></div>;
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
                                <div id="account-balance" style={{display : 'none'}}>Your ad balance :
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
                                <div  id="email-address" style={{display : 'none'}}>Account E-mail<span className="right amount-value email-address" id="merchant-email-address">{this.props.user.email.truncate(defaults.emailTruncateSize)}</span></div>
                                <div id="test5" className="active">{subscriptionButtonType}</div>
                                <div id="test6" style={{ display : 'none'}}>Registered <span className="right">{this.registeredTimeago}</span>
                                </div>
                            </div>
                        </div>
                        </div>

                </div>
            </div>
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
        }

    }
};


const {connect} = ReactRedux;
Merchant = connect(mapStateToProps , mapDispatchToProps)(Merchant);

