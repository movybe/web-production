class Campaign extends  React.Component
{
    //Default actions for non-logged useres
    nonLoggedDefaultActions = () =>
    {
        if(!this.main) {
            this.main = $('main#app');
            this.referrerUsername = $('#referer-username');

            this.emailField = $('#email');
            this.referrer = this.main.attr('data-referrer') || this.main.attr('data-next-referrer');
            this.isReferrallLink = parseInt(this.main.attr('data-is-referral-link'));
            this.nextReferrer = this.main.attr('data-next-referrer');
            this.campaignFormFieldset = $('#campaign-form-fieldset');
            this.selectBankName = $('#select-bank-name');
            $('input#account-number').characterCounter();
        }
    };

    logout = () => {


        if(this.props.factoryReset())
        {
            window.location.reload();
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps;
    }

    loggedInDefaultAction = () => {
        this.loginModalPopup.modal('close');
};
    //Initial actions to perform depending on the user's login status
    initActions = () =>
    {
        this.labels = $('label');

        const defaultAction = !this.props.alreadyExistingAccount ? this.nonLoggedDefaultActions() : this.loggedInDefaultAction();
    };

    componentDidMount() {
        this.campaignTypeChanged = false;
        this.stateRestored = false;

        let storageObj = this.props;
        if (localStorage.getItem(defaults.savedCampaignState)) {

              storageObj = JSON.parse(localStorage.getItem(defaults.savedCampaignState));

            /* checks if a new property (key) is added to the default state as a result of updates */
            {
                //We want to count the length of savedState keys and the default state keys

                let storageObjectKeysCount = 0, propsKeysCount = 0;

                Object.keys(storageObj).forEach(key =>
                {
                   return  typeof storageObj[key] !== 'function' ? storageObjectKeysCount += 1 : null;
                });

                Object.keys(this.props).forEach(key =>
                {
                    return  typeof this.props[key] !== 'function' ? propsKeysCount += 1 : null;
                });

                /*



               if there is a difference in the length of the savedState object keys
               and the length of the default state stored in the redux store,
               meaning there was a change in the source code this will trigger the automatic update of the savedState

               */
                if (storageObjectKeysCount !== propsKeysCount && this.props.restoreState())this.stateRestored = true;



            }










        }






            const stateToReset = this.stateRestored ? {...this.props , stateReset : true , emailVerified: false , showRefererEmailField : false} : {...storageObj , stateReset : true , emailVerified: false , showRefererEmailField : false};
            this.props.resetState(stateToReset , () => {

               if (!this.props.alreadyExistingAccount) {

                    $('.modal').modal();
                    this.loginModalPopup = $('.modal#login-modal');
                    this.loginModalPopup.modal({dismissible: false});

                   //this.loginModalPopup.modal('open');


                }


                this.initActions();

            });



    }


    defaultPage = () => {

        return (



            <div className="site-header">

                <nav>
                    <div className="nav-wrapper admin-navbar">
                        <span className="bullhorn-icon-container"><i className="fa fa-bullhorn bullhorn-icon"></i></span>
                        <a href="#" className="brand-logo admin-brand-logo left watch-demo-video campaign-page-header">{defaults.siteName} Campaign Programme
                        </a>
                                      </div>
                </nav>

                {this.loginModal()}
                <div className = "container">
                <div className="row notice-board z-depth-3">
                    <div className="col s12 valign-wrapper">
                        <p className="notice-header flow-text">Welcome to {defaults.siteName} Campaign.</p>
                    </div>
                    <div className="col s12 valign-wrapper">
                        <p className="notice-message">
                            <h5>Affiliate/Publishers</h5>
                            This is the easiest way to get paid from the comfort of your home in Nigeria, by simply referring your friends & family to {defaults.siteName}.

                            <h5>Merchant/Advertisers</h5>
                            Business owners can also Create a Merchant account to Advertise their Product/Services at a very affordable rate.
                            <br />


                             <br />Read more about this programme below to understand better.
                        </p>
                    </div>
                </div>


                    <div className="row">


                        <div className="col s12 m6">
                            <h5 className="status-headers">How {defaults.siteName} Affiliate works:</h5>
                            <div className="card campaign-card">
                                <div className="card-content">
                                    <h3>Turn your social skills into income</h3>
                                    <p className='strong'>Be your own boss</p>
                                        <p>Be ready to earn passive income with our affiliate programme, you earn <strong>&#8358;{defaults.amountPaidForReferer.toLocaleString()}</strong> for each
                                            person you refer to this programme.
                                        </p>
                                    <p className='strong'>It's as easy as that!</p>
                                    <h5>You can also earn without Referring</h5>
                                    <p className='strong'>Yes, you can earn without even referring.</p>
                                    <p>Imagine when you've referred everyone you know, what happens next?</p>
                                    <p>You also get paid <strong>&#8358;{defaults.amountPaidForReferer.toLocaleString()} </strong>
                                        when you re-activate any members account.<br />
                                    This way, you never run out of cash with our affiliate Programme.
                                    </p>

                                    <h5>It Doesn't End There</h5>
                                    <p className='strong'>What's the catch</p>
                                    <p>You can't register without a referrer</p>
                                    <p>Yes, you can't register without a referrer,
                                        someone must earn <strong>&#8358;{defaults.amountPaidForReferer.toLocaleString()} </strong> income from your registration.
                                    </p>
                                    <p>That way, you also get paid <strong>&#8358;{defaults.amountPaidForReferer.toLocaleString()} </strong> when you refer someone, its vice versa.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m6">

                            <h5 className="status-headers">How {defaults.siteName} Merchant works:</h5>
                            <div className="card campaign-card">
                                <div className="card-content">
                                    <h3>Get your ad on {defaults.siteName} today</h3>.

                                    <p>
                                        Be seen by customers at the very moment that they’re searching on {defaults.siteName} for the things you offer.
                                        And only pay when they click to visit your website, products page or call.
                                    </p>

                                    <h4>
                                        Why {defaults.siteName} Ads?
                                    </h4>

                                    <p className='strong'>Attract more customers.</p>

                                    <p>
                                        Whether you’re looking to bring in new website visitors, grow online sales,
                                        get the phones ringing or keep customers coming back for more,
                                        {defaults.siteName} Ads can help.
                                    </p>

                                    <h4>Reach the right people at the right time</h4>

                                    <p>
                                        Your business gets found by people on {defaults.siteName} precisely when they’re searching for the things that you offer.
                                    </p>
                                    <h4>You only pay for results.</h4>
                                    <p className='strong'>No visit, no fee.</p>
                                    <p>
                                        Signing up for {defaults.siteName} Ads is free. You only pay when someone clicks your ad to visit your website, or calls you. In other words, when your advertising is working.
                                    </p>
                                    <h4>
                                        Start with your own budget.
                                    </h4>
                                    <p>You set your own budget, so your costs will depend on what you are trying to accomplish with your advertising. Some businesses spend tens of thousands of dollars a month, and others are comfortable investing several hundred.</p>

                                    <h4>Take the guesswork out of advertising.</h4>
                                    <p className='strong'>See how your ads are doing.</p>
                                    <p>With {defaults.siteName} Ads you will see how many people are shown your ads, visit your website, or call your business. You can even target specific types of people if your business is specialized.</p>

                                                                   </div>


                            </div>
                        </div>

                        <div className="row z-depth-3 merchant-ad-number-message">

                            <div className="col s12 valign-wrapper">
                                <p className="notice-header flow-text number-of-merchant-ads">
                                    {/*
                                    <a title="Home page" href="/"
                                       className="no-underline back-url"><span className="back-text">Back</span></a>
                                       */}
                                    <a title="Login or Signup" href="#login-modal"
                                       className="btn btn-default modal-trigger text-right continue-modal-trigger no-underline">Continue {/*<i className="material-icons continue-arrow-icon">arrow_forward</i>*/}</a>

                                                                  </p>
                            </div>
                        </div>


                    </div>

                </div>

                <Footer accountType = "Campaign" />
            </div>


        )

    };

    componentDidUpdate()
    {


        try {
            this.initActions();
            const selectBankNameID = "select-bank-name";
            this.selectBankName = $('#' + selectBankNameID) ? $('#' + selectBankNameID) : null;
            const select = this.selectBankName ? document.getElementById(selectBankNameID) : null;
            this.selectCampaignType = $('select#select-campaign-type');
            this.selectCampaignType.formSelect();
            let option;
            const populateSelectBankNameAction = this.selectBankName != null ? defaults.banks.map((bank, index) => {

                option = document.createElement("option");
                option.text = bank;
                option.value = bank;
                select.add(option);

            }) : null;

            const formSelectAction = this.selectBankName ? this.selectBankName.formSelect() : null;
        }

        catch (e) {}

        $('select').formSelect();


        }

        getSelectedCampaignType = () => {
            return this.selectCampaignType.val();


        };
    handleCampaignTypeChange = (e) => {




        this.campaignTypeChanged = true;
         const action = this.getSelectedCampaignType().toLowerCase().indexOf("merchant") >= 0  ? this.props.resetState({...this.props , showRefererEmailField:  false})
    : this.props.resetState({...this.props , showRefererEmailField:  true});

        $('#login-proceed').prop('disabled' , false);
};

    enableStuffs = () => {
        this.emailField.prop(...defaults.disabledFalse);
        this.emailField.removeClass('disabled');
        this.loginModalPopup.modal('close');

    };

    handleCampaignFormSubmit = e => {


        e.preventDefault();



        const formID = e.target.id;
        this.campaignForm = $('#'+formID);
        M.updateTextFields();

         this.campaignForm.validate();

       // this.campaignFormFieldset.prop(...defaults.disabledTrue);
        if(!this.campaignForm.valid()) return M.toast({html: defaults.ensureAllFieldsAreFieldError});
        this.emailField.prop(...defaults.disabledTrue);
        this.emailField.addClass('disabled');

        let data , email = this.emailField.val().toLowerCase();

        if(!this.props.emailVerified) {

            data = {email, action: 'EMAIL_EXISTS'};
            data = JSON.stringify(data);
            //console.log(data);
            $.post(defaults.actions, {data}, response => {
                //console.log(response);
                this.emailField.removeClass('invalid');
                response = JSON.parse(response);


                //return;
                if(!response.error){

                    this.props.resetState({
                        ...this.props,
                        emailVerified: true,
                        stateReset: false,
                        defaultUsername: response.username
                    });

                    $('#login-proceed').prop('disabled' , true);
                }


                else if(response.user.account_type == 'merchant') {
                    this.loginModalPopup.modal('close');
                    this.props.resetState({
                            ...this.props,
                            emailVerified: true,
                            stateReset: false,
                            email,
                            user: response.user,
                            accountType: response.user.account_type,
                            alreadyExistingAccount: true
                        });
                    }
                else {

                    data = {email  , action : 'FETCH_AFFILIATE_DETAILS'};
                    data = JSON.stringify(data);
                    $.post(defaults.actions , {data} , response1 => {
                        response1 = JSON.parse(response1);

                        this.props.resetState({
                            ...this.props,
                            emailVerified: true,
                            stateReset: false,
                            email,
                            user: response1.user,
                            accountType: response1.user.account_type,
                            alreadyExistingAccount: true
                        });


                    });


                }

                this.campaignFormFieldset.prop(...defaults.disabledFalse);

            });
        }
        else if(!this.props.showRefererEmailField)
        {
            //It's a merchant signup
            data = {action : "SIGNUP_MERCHANT" , email , accountType: defaults.merchantAccountType};
            data = JSON.stringify(data);

            $.post(defaults.actions , {data} , response => {
                response = JSON.parse(response);
              this.enableStuffs();
              const action = response.error ? this.props.resetState({...this.props , user : response.user ,  email , accountType: defaults.merchantAccountType , alreadyExistingAccount: true}) : defaults.showToast(defaults.checkNetworkConnectionError);
            });
        }
        else {
            //Affiliate signup

            const username = $('#username').val().toLowerCase();
            const referrerUsername = $('#referer-username').val().toLowerCase();
            data = {email , referer_username : referrerUsername , username ,action : 'VALIDATE_AFFILIATE'};
            data = JSON.stringify(data);
            $.post(defaults.actions , {data} , response => {
               response = JSON.parse(response);
               if(!response.success) return defaults.showToast(response.error);


               //Disable the form field set
               this.campaignFormFieldset.prop(...defaults.disabledTrue);
               //Change the username generated
               this.props.resetState({...this.props, defaultUsername:  response.username});
               const amount = response.amount;
               const accountName = $('#account-name').val();
               const accountNumber = $('#account-number').val();
               const bankName = $('#select-bank-name').val();

               const changeAdminReferrer = (this.isReferrallLink === 0) && (referrerUsername === this.nextReferrer.toLowerCase()) ? 1 : 0;

               defaults.payWithPaystack(email , defaults.convertToPaystack(amount) , accountName , response => {

                   if(response.status !== defaults.successText)return defaults.showToast(defaults.transactionNotSuccessfulMessage);

                   let  data = {email , change_admin_referrer : changeAdminReferrer, referer_username : referrerUsername , username , action : 'SIGNUP_AFFILIATE' ,
                       account_name :accountName , is_referral_link : this.isReferrallLink , next_referrer : this.nextReferrer , account_number : accountNumber , bank_name : bankName , reference_code :
                       response.reference};
                   data = JSON.stringify(data);
                   $.post(defaults.actions , {data} , response =>{
                       console.log(response);
                       response = JSON.parse(response);

                       this.enableStuffs();

                       const action = !response.success  ? this.props.resetState({...this.props  ,  emailVerified:  true , stateReset : false}) : this.loginModalPopup.modal('close') && this.props.resetState({...this.props , emailVerified:  true , stateReset : false , email , user : response.user ,  accountType : response.user.account_type , alreadyExistingAccount: true});

                       //Start the affiliate tour
                       tourJS.start('affiliate-account-tour')

                   });



               });
            });
        };





    };

  loginModal = () => {



      const disabledUserEmailField = this.props.emailVerified ? "disabled" : null;
      const accountTypeSelection = this.props.emailVerified && !this.props.stateReset?
          <div className="row">
              <div className="input-field col s12">
                  <select id="select-campaign-type" autoComplete="off" required="required" onChange={this.handleCampaignTypeChange}>
                      <option defaultValue="" disabled>Choose your campaign type</option>
                      <option defaultValue="merchant">Merchant/Advertiser</option>
                      <option defaultValue="publisher">Affiliate/Publisher</option>
                  </select>
                  <label className="active">Campaign type</label>
              </div>
          </div>

          : null;
      const refererEmailAddressField = this.props.showRefererEmailField ?
<div>

    <div className="row">
          <div className="input-field col s12">
              <input id="referer-username" name="referer-username" defaultValue={this.referrer} type="text" required = "required" minLength={defaults.minimumAccountUsernameLength} maxLength={defaults.maximumAccountUsernameLength} pattern={`[a-zA-Z0-9]{${defaults.minimumAccountUsernameLength},${defaults.maximumAccountUsernameLength}}`} className="validate" />
              <label htmlFor="referer-username" className="active">Referrer username</label>
              <span className="helper-text referer-username" data-error="please,check the username again" data-success="">referer username is mandatory</span>
          </div>
      </div>
    <div className="row">
        <div className="input-field col s12">

            <h5>Bank Details</h5>

        </div>
    </div>
        <div className="row">
              <div className="input-field col s12">
          <input id="account-name" name = "account-name" type="text"  required="required" pattern="[a-zA-Z ]{2,60}" className="validate"/>
          <label htmlFor="account-name" className="active">Your account name</label>
      <span className="helper-text account-name strong" data-error="Please enter a valid account name" data-success="">Note: Bank details can't be changed later.</span>
      </div>
  </div>

    <div className="row">
        <div className="input-field col s12">
            <input id="account-number" data-length = "10"  size = "10" maxLength="10" minLength="10" pattern="(\d{10})$" required="required" name = "account-number" type="text" className="validate" />
            <label htmlFor="account-number" className="active">Your account number</label>
            <span className="helper-text account-number" data-length = "10"  data-error="Please enter a valid account number" data-success="">valid account number</span>
        </div>
    </div>
    <div className="row">
        <div className="input-field col s12">
            <select id="select-bank-name" required>
                <option defaultValue="" disabled>Select your Bank Name</option>

                 </select>
            <label className="active">Bank Name</label>

        </div>
    </div>
    <div className="row">
        <div className="input-field col s12">

            <h5>Profile Detail(s)</h5>

        </div>
    </div>

    <div className="row">
        <div className="input-field col s12">
            <input defaultValue={""/*this.props.defaultUsername*/} id="username" name = "username"  type="text" minLength={defaults.minimumAccountUsernameLength} maxLength={defaults.maximumAccountUsernameLength} pattern={`[a-zA-Z0-9]{${defaults.minimumAccountUsernameLength},${defaults.maximumAccountUsernameLength}}`} required="required" className="validate" />
            <label htmlFor="username" className="active">Your username</label>
            <span className="helper-text username"  data-error="username must be alphabet not more than 6 characters long" data-success=""></span>
        </div>
    </div>

</div>
  : null;
      let  headerToShow = this.props.showRefererEmailField ? <span>How Affiliate Works</span> : <span>How Merchant works</span>;
  headerToShow = this.props.emailVerified ? headerToShow : <span>Welcome to {defaults.siteName} Campaign</span>;
  let summaryToShow = this.props.showRefererEmailField ?
      <div>
          <p>Now, earning money has become easier with our affiliate account, we pay you <strong className="strong">&#8358;{defaults.amountPaidForReferer}</strong> for each user you refer.</p>
          {/*
          <p>We pay you <strong className="strong">&#8358;{defaults.amountPaidForUserInteraction}</strong> everyday, when you interact with our website.</p>
          */}
              <p>You also get paid <strong className="strong">&#8358;{defaults.amountPaidForUniqueVisitor}</strong> when a unique user visits our website via your link.</p>
          <p>We pay you when you share our ads on your social media account, and lots more.</p>
      </div>
      :
      <div>
      <p>You can now promote your products/services, to the reach of  millions of potential customers, at the cheapest price.</p>
      <p>Sign up now to get started:</p>
      </div>
      summaryToShow = this.props.emailVerified ? summaryToShow : null;
      return <div id="login-modal" className="modal modal-fixed-footer">
                <div className="modal-content">
                <h5>{headerToShow}</h5>
                    {summaryToShow}

                    <div className="row">
                        <fieldset id="campaign-form-fieldset">
                        <form  validate= "validate" className="col s12" autoComplete="on"  name="campaign-form" id="campaign-form" action="#" onSubmit={this.handleCampaignFormSubmit} noValidate="noValidate">
                            <div className="row">
                                <div className="input-field col s12">
                                    <input id="email" autoComplete="off" name = "email" required="required"  type="text" className="validate"
                                            pattern="^([a-zA-Z0-9_\-\._]+)@([a-zA-Z0-9_\-\._]+)\.([a-zA-Z0-9_\-\.]{2,5})$" />
                                        <label htmlFor="email" className="active">Your Email</label>
                                        <span className="helper-text email"  data-error="please enter a valid email" data-success="">Please enter a valid email address</span>
                                </div>
                            </div>

                            {accountTypeSelection}

                            {refererEmailAddressField}

                        </form>
                        </fieldset>
                    </div>
            </div>
            <div className="modal-footer">
                <a href="#" onClick={ e => {e.preventDefault(); this.loginModalPopup.modal('close')}}
                   className='no-underline grey-text' id="close-login-modal">CLOSE</a>
<button type="submit" form="campaign-form" className="waves-effect waves-light btn" id="login-proceed" value="Proceed">Proceed</button>
            </div>
             </div>


};
  render ()
    {

        let template = null;
        if(this.props.user.account_type !== undefined)
        {
            template  = this.props.user.account_type == "merchant" ? <Merchant /> : <Affiliate />;
            template =  this.props.user.is_site_admin_login_email ? <Admin logout = {this.logout} /> : template;
        }
        else {
            template = this.defaultPage();
        }
        return (

            <div id="campaign">

                {template}
                    <div id="paystackEmbedContainer"></div>

            </div>
        )
    }
}
