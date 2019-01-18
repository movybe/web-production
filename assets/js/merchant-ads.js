class MerchantAds extends React.Component

{


    newAdFormRules = {
        minAdTitleLength : 20,
        maxAdTitleLength : defaults.maxTitleLength ,
        minAdDescriptionLength : 10,
        maxAdDescriptionLength : defaults.maxDescriptionLength,
        maxAdCampaignNameLength : 120,
        maxCampaignLocationLength : 120
    };

    defaultActions = () =>
    {

        this.newAdModalPopUp = $('.modal#new-ad-modal');
        this.newAdModalPopUp.modal({dismissible:false});
        this.newAdForm = $('#new-ad-form');

        this.newAdFormFields = $('.new-ad-form-fields')

    };

    componentDidMount()
    {

        this.defaultActions();


    }
    componentDidUpdate ()
    {
        this.defaultActions();
    }

    handleNewAdForm = (e) => {


        e.preventDefault();

        M.updateTextFields();




        const parent = this;
           this.newAdForm.validate();






    };


    newAdModal = () =>
    {
        return(
            <div id="new-ad-modal" className="modal modal-fixed-footer">
                <div className="modal-content">
                    <h5>Ad details</h5>
                    <div className="row">
                        <fieldset id="new-ad-form-fieldset">
                            <form className="col s12" autoComplete= "on" onSubmit={this.handleNewAdForm} name="new-ad-form" id="new-ad-form" action="#">
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input placeholder="Please write a clear title for your ad" id="new-ad-title" minLength={this.newAdFormRules.minAdTitleLength}
                                                name = "new-ad-title"  type="text"
                                                className="validate new-ad-form-fields" maxLength={this.newAdFormRules.maxAdTitleLength} required="required" />
                                        <label htmlFor="new-ad-title" className="active">Title</label>
                                    </div>
                                </div>



                                <div className="row">
                                    <div className="input-field col s12">
                                        <input placeholder= "Enter a detailed description" id="new-ad-description" minLength={this.newAdFormRules.minAdDescriptionLength}
                                                 name = "new-ad-description"
                                                type="text"
                                                className="validate new-ad-form-fields" maxLength={this.newAdFormRules.maxAdDescriptionLength}  required="required" />
                                        <label htmlFor="new-ad-description" className="active">Description</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12">
                                        <input placeholder= "e.g http://www.your-website.com/link" id="new-ad-link"
                                               name = "new-ad-link"
                                               type="text"
                                               pattern="^(http|https|ftp):\/\/(www+\.)?[a-zA-Z0-9]+\.([a-zA-Z]{2,4})\/?"
                                               className="validate new-ad-form-fields"  required="required" />
                                        <label htmlFor="new-ad-link" className="active">Landing page</label>
                                        <span className="helper-text" data-error="Please enter a valid url" data-success=""> </span>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12">
                                        <input placeholder= "e.g +234 70 844 195 30" id="new-ad-contact"
                                               name = "new-ad-contact"
                                               type="text"
                                               pattern="^(\+\d{2,4})?\s?(\d{10})$"
                                               className="validate new-ad-form-fields"  />
                                        <label htmlFor="new-ad-contact" className="active">Contact (if any)</label>
                                        <span className="helper-text" data-error="Please enter a valid phone number" data-success=""> </span>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12">
                                        <input placeholder= "Enter your business name" id="new-ad-campaign-name"
                                               name = "new-ad-campaign-name"
                                               type="text"
                                               className="validate new-ad-form-fields" minLength="1" maxLength={this.newAdFormRules.maxAdCampaignNameLength} required="required" />
                                        <label htmlFor="new-ad-contact" className="active">Campaign/Business Name</label>
                                      </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12">
                                        <input placeholder= "Valid location (if any)" id="new-ad-location"
                                               name = "new-ad-location"
                                               type="text"
                                               className="validate new-ad-form-fields" minLength= "1" maxLength={this.newAdFormRules.maxCampaignLocationLength} required="required" />
                                        <label htmlFor="new-ad-contact" className="active">Location</label>
                                       </div>
                                </div>


                            </form>
                        </fieldset>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="submit" form="new-ad-form" className="waves-effect waves-light btn" id="login-proceed" value="Proceed">Proceed</button>
                    <a href="#" onClick={() => this.newAdModalPopUp.modal('close')} className="no-underline left grey-text" id="close-new-ad-form">CLOSE</a>
                </div>
            </div>
        )
    };
    render () {

    const adsNumberMessage = this.props.ads.length ? `You've posted ${this.ads.length} ads` : "No ads yet";

        return (

            <div className="row z-depth-3 merchant-ad-number-message">
                <div className="col s12 valign-wrapper">
                    <p className="notice-header flow-text number-of-merchant-ads">{adsNumberMessage}
                    <a href="#new-ad-modal" id ="new-ad-dropdown"  className="material-icons add-ad-icon right modal-trigger  no-underline">add</a></p>
                </div>

        <div id="new-ad-form-container">

            {this.newAdModal()}
            </div>
            </div>
        )
    }
}

let {connect} = ReactRedux;
let mapStateToProps = (state , ownProps) =>
{
    return {
        ...state , ...ownProps
    }
};

MerchantAds = connect(mapStateToProps)(MerchantAds);