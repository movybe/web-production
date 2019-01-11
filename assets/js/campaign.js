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
                if (storageObjectKeysCount !== propsKeysCount)this.props.restoreState();



            }










        }





            this.props.resetState({...storageObj , stateReset : true , emailVerified: false} , () => {

               if (!this.props.alreadyExistingAccount) {

                    console.log(this.props.alreadyExistingAccount);
                    $('.modal').modal();
                    this.loginModalPopup = $('.modal#login-modal');
                    this.loginModalPopup.modal({dismissible: false});

                    this.loginModalPopup.modal('open');





                }


                this.initActions();

            });



    }

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
            let selectedCampaignType = this.selectCampaignType.formSelect('getSelectedValues');

            selectedCampaignType = selectedCampaignType[0].toLowerCase();
            return selectedCampaignType.indexOf("merchant") ? "merchant" : "member";


        }; 
    handleCampaignTypeChange = (e) => {




        this.campaignTypeChanged = true;
         const action = this.getSelectedCampaignType() === "merchant" ? this.props.resetState({...this.props , showRefererEmailField:  false})
    : this.props.resetState({...this.props , showRefererEmailField:  true});

};

    handleCampaignFormSubmit = e => {


        this.campaignForm = $(e.target);

        this.labels = $('label');

        e.preventDefault();
        this.labels.hide("");

        this.campaignFormFieldset.prop(...defaults.disabledTrue);
        if(!this.campaignForm.valid()) return M.toast({html: defaults.ensureAllFieldsAreFieldError});

        this.emailField.prop(...defaults.disabledTrue);
        this.emailField.addClass('disabled');

        let data , email = this.emailField.val().toLowerCase();
        if(!this.props.emailVerified) {

            data = {email , action : 'EMAIL_EXISTS'};
            data = JSON.stringify(data);


            $.post(defaults.activity ,  {data}, response => {
                console.log(response);
                this.emailField.removeClass('invalid');
                response = JSON.parse(response);

                console.log(response);
                //return;
                const action = !response.error  ? this.props.resetState({...this.props  ,  emailVerified:  true , stateReset : false}) : this.loginModalPopup.modal('close') && this.props.resetState({...this.props , emailVerified:  true , stateReset : false , email ,  accountType : response.details.account_type , alreadyExistingAccount: true});
                this.campaignFormFieldset.prop(...defaults.disabledFalse);
            });

        }

        else if(!this.props.showRefererEmailField)
        {
            data = {action : "SIGNUP_MERCHANT" , email , accountType: defaults.merchantAccountType};
            data = JSON.stringify(data);

            $.post(defaults.activity , {data} , response => {
              response = JSON.parse(response);
              const action = response.error ? this.props.resetState({...this.props , email , accountType: defaults.merchantAccountType , alreadyExistingAccount: true}) : defaults.showToast(defaults.checkNetworkConnectionError);
              //this.campaignFormFieldset.prop(...defaults.disabledFalse);

            });

        }





    };

  loginModal = () => {



      const disabledUserEmailField = this.props.emailVerified ? "disabled" : null;
      const accountTypeSelection = this.props.emailVerified && !this.props.stateReset?
          <div className="row">
              <div className="input-field col s12">
                  <select id="select-campaign-type" autoComplete="off" required onChange={this.handleCampaignTypeChange}>
                      <option defaultValue="" disabled>Choose your campaign type</option>
                      <option defaultValue="merchant" >Merchant/Advertiser</option>
                      <option defaultValue="affiliate">Affiliate/Member</option>
                  </select>
                  <label className="active">Campaign type</label>
              </div>
          </div>

          : null;
      const refererEmailAddressField = this.props.showRefererEmailField ?
<div>

    <div className="row">
          <div className="input-field col s12">
              <input id="referer-username" name="referer-username" type="text" required pattern="[a-zA-Z0-9]{5,12}" className="validate" />
              <label htmlFor="referer-username" className="active">Referer username</label>
              <span className="helper-text referer-username" data-error="try,check the username again" data-success="">referer username is mandatory</span>
          </div>
      </div>
    <div className="row">
        <div className="input-field col s12">

            <h5>Bank Details</h5>

        </div>
    </div>
        <div className="row">
              <div className="input-field col s12">
          <input id="account-name" name = "account-name" type="text" required pattern="[a-zA-Z ]{2,60}" className="validate"/>
          <label htmlFor="account-name" className="active">Your account name</label>
      <span className="helper-text account-name" data-error="Please enter a valid account name" data-success="">Note: Bank details can't be changed later.</span>
      </div>
  </div>

    <div className="row">
        <div className="input-field col s12">
            <input id="account-number" data-length = "10" pattern="(\d{10})$" required name = "account-number" type="text" className="validate" />
            <label htmlFor="account-number" className="active">Your account number</label>
            <span className="helper-text account-number" data-length = "10"  data-error="Please enter valid account number" data-success="">Acc No : 10 digits in length</span>
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
            <input id="username"  name = "username" type="text"  pattern="[a-zA-Z0-9]{5,12}" required className="validate"/>
            <label htmlFor="username" className="active">Your username</label>
            <span className="helper-text username" data-length = "12" data-error="username must be alpha numeric between 5-12 characters long" data-success="valid username">alpha numeric between 5 - 12 characters e.g (emax101 , anabel)</span>
        </div>
    </div>

</div>
  : null;
  return <div id="login-modal" className="modal modal-fixed-footer">
                <div className="modal-content">
                <h5>Connect with more customers</h5>
                <p>Be seen at the top of our Search page, with a badge of trust. <br/>
                    Advertising with the {defaults.siteName} guarantee is a powerful way to attract new customers. <br /> Get started: </p>

                    <div className="row">
                        <fieldset id="campaign-form-fieldset">
                        <form className="col s12"  name="campaign-form" id="campaign-form" action="#" method="POST" onSubmit={this.handleCampaignFormSubmit}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input   id="email" autoComplete="off"  name = "email" required  type="text" className="validate"
                                            pattern="([a-zA-Z0-9_\-\._]+)@([a-zA-Z0-9_\-\._]+)\.([a-zA-Z0-9_\-\.]{2,5})$" />
                                        <label htmlFor="email" className="active">Your Email</label>
                                        <span className="helper-text email" data-error="please enter a valid email" data-success="">Please enter a valid email address</span>
                                </div>
                            </div>



                            {accountTypeSelection}

                            {refererEmailAddressField}

                        </form>
                        </fieldset>
                    </div>
            </div>
            <div className="modal-footer">
<button type="submit" form="campaign-form" className="waves-effect waves-light btn" id="login-proceed" value="Proceed">Proceed</button>
            </div>
             </div>;


};



    render ()
    {

        const templateToShow = !this.props.alreadyExistingAccount ? this.loginModal() : <Merchant />;
         return (

            <div id="campaign">
                {templateToShow}
            </div>
        )
    }
}

