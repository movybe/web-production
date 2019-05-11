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

    componentWillMount = () => {

        document.title = defaults.siteName + ` •  ${this.props.user.username.capitalize()}`;

    };
    handleAccountActivation = e => {

        e.preventDefault();

        this.accountActivationResponseMessage.text(null);
        if(!this.accountActivationForm.valid()) return 0;

        const refererUsername = this.refererUsername.val().toLowerCase();

        const refererUsernames = this.props.user.referer_usernames.split(',');


        if(refererUsernames.indexOf(refererUsername) >= 0)
        {
            defaults.showToast(defaults.enterNewRefererUsernameMessage);
            return 0;
        }

        this.accountActivationFieldset.prop(...defaults.disabledTrue);


        let data = {email : this.props.email , action : 'TRY_RE-ACTIVATE_AFFILIATE_ACCOUNT' , referer_username : refererUsername};

        data = JSON.stringify(data);

        $.post(defaults.actions , {data} , response => {

            response = JSON.parse(response);
            if(response.success) {
                this.accountActivationModalPopUp.modal('close');
                return this.refreshProfile();
            }
            else if(response.continue_with_paystack){

                defaults.payWithPaystack(this.props.email , defaults.convertToPaystack(response.amount) , this.props.user.username , response => {

                    if(response.status !== defaults.successText){
                        this.accountActivationFieldset.prop(...defaults.disabledFalse);
                        defaults.showToast(defaults.transactionNotSuccessfulMessage);
                        return 0;
                    }


                    data = {reference_code : response.reference , email : this.props.email , action : 'RE-ACTIVATE_AFFILIATE_ACCOUNT' , referer_username : refererUsername};

                    data = JSON.stringify(data);
                    $.post(defaults.actions , {data} , response => {
                        response = JSON.parse(response);

                        if(response.success) {
                            this.accountActivationModalPopUp.modal('close');
                            return this.refreshProfile();
                        }
                    });
                });
            }
            else {
                this.accountActivationFieldset.prop(...defaults.disabledFalse);
                this.accountActivationResponseMessage.text(response.error);
                defaults.showToast(response.error);
            }



        });



    };

    accountActivationModal = ()  => {

        return (

            <div id="account-activation-modal" className="modal modal-fixed-footer">
                <div className="modal-content">
                    <fieldset id="account-activation-fieldset">
                        <form id = "account-activation-form" method="POST" action="#" onSubmit={this.handleAccountActivation}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="account-activation-referer-username" minLength={defaults.minimumAccountUsernameLength} maxLength={defaults.maximumAccountUsernameLength} pattern={`[a-zA-Z0-9]{${defaults.minimumAccountUsernameLength},${defaults.maximumAccountUsernameLength}}`} required="required" name = "withdrawal-amount" type="text"  className="validate" />
                                    <label htmlFor="referer-username" className="active">Referer</label>
                                    <span className="helper-text" id = "account-activation-response-message"></span>
                                    <button type="submit" id="withdrawal-submit-button" className="waves-effect waves-light btn-small">Proceed</button>
                                    <span className="helper-text right" id ="withdrawal-charge-message">You can no longer use <span className="strong">{this.props.user.referer_username}</span> as your referer</span>
                                </div>
                            </div>
                        </form>
                    </fieldset>
                </div>
                <div className="modal-footer">
                    <a href="#" onClick={() => {this.accountActivationModalPopUp.modal('close')}} className="modal-close waves-effect waves-green btn-flat no-underline strong light">CLOSE</a>
                </div>
            </div>
        )
    };

    componentDidMount()
    {

        this.defaultActions();




        let data = {email : this.props.email , action : 'FETCH_AFFILIATE_DETAILS'};
        data = JSON.stringify(data);
        $.post(defaults.actions , {data} , response1 => {


            this.registeredTimeago = timeago.format(this.props.user.registered_on);
            response1 = JSON.parse(response1);

            this.props.resetState({...this.props , user : response1.user , ads : response1.ads} , () => {
                if(!Number(this.props.user.subscribed)){
                    this.accountActivationModalPopUp = $('.modal#account-activation-modal');
                    this.accountActivationModalPopUp.modal({dismissible: false});
                    this.accountActivationFieldset = $('#account-activation-fieldset');
                    this.accountActivationForm = $('#account-activation-form');
                    this.refererUsername = $('#account-activation-referer-username');
                    this.accountActivationResponseMessage = $('#account-activation-response-message');
                }

            });

        });




    }

    componentDidUpdate () {
        this.defaultActions();

    }





    deletePaymentHistory = (reference_code) => {


        let data = {action : 'DELETE_PAYMENT_HISTORY' , reference_code , email : this.props.email};
        data = JSON.stringify(data);

        $.post(defaults.actions , {data} , response => {
            response = JSON.parse(response);
            if(response.success)this.refreshProfile();

        });
    };

    render() {



        let isActiveAccount = parseInt(this.props.user.subscribed) === 1;
        let accountActivationModal = isActiveAccount ? null:  this.accountActivationModal();
        let userSubscriptionStatus = isActiveAccount;
        let withdrawalPaymentsSingularOrPlural = this.props.user.withdrawal_requests !== 1 ? "payments" : "payment";

        let paymentsHistory = this.props.user.payments.length ? <h5>Payments History({this.props.user.payments.length})</h5> : null;
        let withdrawalRequests = this.props.user.withdrawal_requests ? <h5>Withdrawal Requests({this.props.user.withdrawal_requests})</h5> : null;
        let accountDeactivationMessage = !isActiveAccount ?
            <div className="row notice-board z-depth-3 account-deactivation-notice-board card-panel">
                <div className="col s12 valign-wrapper">
                        <span className="affiliate-withdrawal-requests-message">
                            Your account is no longer active, click <strong className="strong"><a className="modal-trigger account-activation-modal-link" href = "#account-activation-modal">here</a></strong> to re-activate.
                        </span>
                </div>
            </div>
 : null;

         let paymentsMade = this.props.user.payments.map(payment => {
            return (

                <div className="row notice-board z-depth-3 payments-notice-board card-panel" key = {payment.reference_code}>
                    <i className="material-icons hide-payment-history-icon" onClick={() => this.deletePaymentHistory(payment.reference_code)}>cancel</i>
                    <div className="col s12 valign-wrapper">
                        <span className="affiliate-withdrawal-requests-message"><strong className="strong">&#8358;{payment.amount.toLocaleString()}</strong> was paid to your account {timeago.format(payment.payment_date)}
                        </span>
                    </div>
                    <span className="affiliate-payment-reference-code">ID : <strong className="strong">{payment.reference_code}</strong></span>

                </div>

            )
        });
        let withdrawalRequestsMessage =this.props.user.withdrawal_requests ?
                <span className="affiliate-withdrawal-requests-message">You have <strong className="strong">{this.props.user.withdrawal_requests}</strong> pending {withdrawalPaymentsSingularOrPlural} of  <strong className="strong">&#8358;{this.props.user.total_withdrawal_amount.toLocaleString()}</strong> </span>: null;
               let withdrawalRequestMessageExtraClass = withdrawalRequestsMessage != null ? null : 'hide';
        let defaultEmailToShow = (this.props.user.email || "user@domain.com").truncate(defaults.emailTruncateSize);
        const subscriptionButtonType =  userSubscriptionStatus ?
            <div className="green-text"><span className="subscription-active-text">active</span><a className="waves-effect waves-light disabled btn-small right">Paid </a></div>     : <div><span className="materialize-red-text activate-account-text">INACTIVE</span> <a className="waves-effect modal-trigger waves-light btn-small right activate-account-button" href = "#account-activation-modal">Activate</a></div>;
        return (
            <div>
                <AffiliateHeader refreshProfile = {this.refreshProfile} />
                {accountDeactivationMessage}
                {accountActivationModal}

                <div className="container">
                    {withdrawalRequests}
                    <div className={`row notice-board z-depth-3  withdrawal-notice-board card-panel ${withdrawalRequestMessageExtraClass}`}>
                        <div className="col s12 valign-wrapper">

                        {withdrawalRequestsMessage}

                        </div>
                    </div>
                    {paymentsHistory}
                    {paymentsMade}
                    <div className="row notice-board z-depth-3">
                        <div className="col s12 valign-wrapper">
                            <p className="notice-header flow-text">Public message to Affiliates</p>
                        </div>
                        <div className="col s12 valign-wrapper">

                            <p className="notice-message">
                                Your affiliate account will require renewal once every 30 days, provided you've reached our threshold of <strong className='strong'>&#8358;{defaults.thresholdAmount.toLocaleString()}</strong> for the month.
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
                                        <li className="tab" id="account-balance-tab"><a className="active tourJS affiliate-account-tour tour-3" data-step ="3"  data-caption = "Your account balance is shown here." href="#account-balance">Acc Bal.</a></li>
                                        <li className="tab"><a href="#total-amount-funded" className="tourJS affiliate-account-tour tour-4" data-step ="4"  data-caption = "This is the total amount you've earned.">Income</a></li>
                                        <li className="tab me"><a href="#total-number-of-ads" className="tourJS affiliate-account-tour tour-5" data-step ="5"  data-caption = "This is the total users you've referred." data-tourjs-action = "click">Tot Ref.</a></li>
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
                                        <li className="tab"><a href="#test5" className="flow-text tourJS affiliate-account-tour tour-6" data-step ="6"  data-caption = "Your account status is shown here.">Status</a></li>
                                        <li className="tab"><a href="#test6" className="flow-text tourJS affiliate-account-tour tour-7" data-step ="7"  data-caption = "Your earnings for the last 30 days.">This Month</a></li>
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
                                        <li className="tab" id="account-balance-tab"><a className="active tourJS affiliate-account-tour tour-9" data-step ="9"  data-caption = {`use this link to refer your friends to ${defaults.siteName}.`} href="#referer-link">Moref</a></li>
                                        <li className="tab"><a href="#referer-username">Username</a></li>
                                        <li className="tab"><a href="#invite-link" className="tourJS affiliate-account-tour tour-8" data-step ="8"  data-caption = {`use this link to invite your friends to ${defaults.siteName}.`}>Molin</a></li>
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
                <Footer accountType = "Affiliate" refreshProfile = {this.refreshProfile} />
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

