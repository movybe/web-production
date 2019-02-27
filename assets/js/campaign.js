class Campaign extends  React.Component
{

    //Default actions for non-logged useres
    nonLoggedDefaultActions = () =>
    {

        this.main = $('main#app');
        this.refererUsername = $('#referer-username');

        this.emailField = $('#email');
        this.referer = this.main.attr('data-referer');
        this.refererUsername.val(this.referer ? this.referer : this.refererUsername.val());
        this.campaignFormFieldset = $('#campaign-form-fieldset');

        this.selectBankName = $('#select-bank-name');


        $('input#account-number').characterCounter();

    };


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
                    <div className="nav-wrapper">
                        <span className="bullhorn-icon-container"><i className="fa fa-bullhorn bullhorn-icon"></i></span>
                        <a href="#" className="brand-logo  left watch-demo-video campaign-page-header">{defaults.siteName} Campaign Programme
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


                             <br />Watch our demo videos below to understand better.
                        </p>
                    </div>
                </div>


                    <div className="row">


                        <div className="col s12 m6">
                            <h5 className="status-headers">How {defaults.siteName} Affiliate works:</h5>
                            <div className="card">
                                <div className="card-content">
                                    <p>
                                        Watch as our CEO explains how {defaults.siteName} Affiliate works,
                                        and how you too can start making money right now with {defaults.siteName} Affiliate.
                                    </p>
                                    <div className="video-container demo-video-container">

                                        <iframe width="853" height="480" src={defaults.affiliateIntroductionVideo}
                                                frameBorder="0" allowFullScreen></iframe>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col s12 m6">

                            <h5 className="status-headers">How {defaults.siteName} Merchant works:</h5>
                            <div className="card">
                                <div className="card-content">
                                    <p>Watch as our CEO explains how Businesses can advertise their products/services with millions of potential online customers in Nigeria.</p>
                                    <div className="video-container demo-video-container">
                                        <iframe width="853" height="480" src={defaults.merchantIntroductionVideo} frameBorder="0" allowFullScreen></iframe>

                                        <video className="responsive-video" controls>
                                            <source src={defaults.demoVideo2} type="video/mp4"></source>
                                        </video>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="row z-depth-3 merchant-ad-number-message">

                            <div className="col s12 valign-wrapper">
                                <p className="notice-header flow-text number-of-merchant-ads">
                                    <a title="Home page" href="/"
                                       className="no-underline back-url"><span className="back-text">Back</span></a>

                                    <a title="Login or Signup" href="#login-modal"
                                       className="modal-trigger text-right continue-modal-trigger no-underline">Continue<i className="material-icons continue-arrow-icon">arrow_forward</i> </a>

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

            if(this.props.reloadPage){

                this.loginModalPopup.modal('open');
                this.emailField.prop(...defaults.disabledTrue);
                this.emailField.addClass('disabled');

                this.props.resetState({...this.props , reloadPage : false});
                return;
            }


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


            $.post(defaults.actions, {data}, response => {

                this.emailField.removeClass('invalid');
                response = JSON.parse(response);


                //return;
                if(!response.error){

                    this.props.resetState({
                        ...this.props,
                        emailVerified: true,
                        stateReset: false
                    })
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
            const refererUsername = $('#referer-username').val().toLowerCase();
            data = {email , referer_username : refererUsername , username ,action : 'VALIDATE_AFFILIATE'};
            data = JSON.stringify(data);
            $.post(defaults.actions , {data} , response => {
               response = JSON.parse(response);
               if(!response.success) return defaults.showToast(response.error);


               //Disable the form field set
               this.campaignFormFieldset.prop(...defaults.disabledTrue);

               const amount = response.amount;
               const accountName = $('#account-name').val();
               const accountNumber = $('#account-number').val();
               const bankName = $('#select-bank-name').val();
               defaults.payWithPaystack(email , defaults.convertToPaystack(amount) , accountName , response => {

                   if(response.status !== defaults.successText)return defaults.showToast(defaults.transactionNotSuccessfulMessage);

                   let  data = {email , referer_username : refererUsername , username , action : 'SIGNUP_AFFILIATE' ,
                       account_name :accountName , account_number : accountNumber , bank_name : bankName , reference_code :
                       response.reference};
                   data = JSON.stringify(data);
                   $.post(defaults.actions , {data} , response =>{

                       response = JSON.parse(response);

                       this.enableStuffs();

                       const action = !response.success  ? this.props.resetState({...this.props  ,  emailVerified:  true , stateReset : false}) : this.loginModalPopup.modal('close') && this.props.resetState({...this.props , emailVerified:  true , stateReset : false , email , user : response.user ,  accountType : response.user.account_type , alreadyExistingAccount: true});

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
              <input id="referer-username" name="referer-username" type="text" required = "required" minLength={defaults.minimumAccountUsernameLength} maxLength={defaults.maximumAccountUsernameLength} pattern={`[a-zA-Z0-9]{${defaults.minimumAccountUsernameLength},${defaults.maximumAccountUsernameLength}}`} className="validate" />
              <label htmlFor="referer-username" className="active">Referer username</label>
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
            <input id="username"  name = "username"  type="text" minLength={defaults.minimumAccountUsernameLength} maxLength={defaults.maximumAccountUsernameLength} pattern={`[a-zA-Z0-9]{${defaults.minimumAccountUsernameLength},${defaults.maximumAccountUsernameLength}}`} required="required" className="validate" />
            <label htmlFor="username" className="active">Your username</label>
            <span className="helper-text username"  data-error="username must be alpha numeric between 5-12 characters long" data-success="">e.g (emax101 , anabel)</span>
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
                <a href="#" onClick={() => this.loginModalPopup.modal('close')}
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

            template  = this.props.user.account_type === "merchant" ? <Merchant /> : <Affiliate />;

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
