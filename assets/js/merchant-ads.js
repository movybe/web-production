class MerchantAds extends React.Component {



    units = 0;

    newAdFormRules = {
        minAdTitleLength: 20,
        maxAdTitleLength: defaults.maxTitleLength,
        minAdDescriptionLength: 10,
        maxAdDescriptionLength: defaults.maxDescriptionLength,
        maxAdCampaignNameLength: 120,
        maxCampaignLocationLength: 120,
        maxAdImageSize: 2
    };



    constructor ()
    {
        super();



    }
    defaultActions = () => {

        this.newAdModalPopUp = $('.modal#new-ad-modal');
        this.newAdModalPopUp.modal({dismissible: false});
        this.newAdForm = $('#new-ad-form');

        this.newAdFormFields = $('.new-ad-form-fields');
        this.newImageUploadError = $('.new-image-upload-error');

        this.adTypeSelection = $('#ad-type-selection');
        this.adUnit = $('#new-ad-unit');
    };

    componentDidMount() {

        this.defaultActions();

    }

    componentDidUpdate() {
        this.defaultActions();
        //console.log(this.props);
    }

    handleNewAdForm = (e) => {


        e.preventDefault();

        M.updateTextFields();

        this.newAdForm.validate();


    };


    isValidUploadedImage = (e, labelID) => {


        if (!window.FileReader && !window.Blob) {
            // All the File APIs are supported.
            return true;
        }

        const elemID = e.target.id;
        const control = document.getElementById(elemID);
        const file = control.files[0];
        const fileType = file.type;
        const fileSize = file.size;
        const fileSizeInMb = Math.round(fileSize / 1024000);
        const imageFileFormats = ["image/png", "image/jpeg"];

        $('#' + labelID).children('i').show();
        $('#' + elemID).css('background-image', 'url()');
        this.newImageUploadError.text(null);
        if ($.inArray(fileType, imageFileFormats) === -1) {
            this.newImageUploadError.text(`only png and jpeg images are allowed`);
            return false;
        }
        else if (fileSizeInMb > this.newAdFormRules.maxAdImageSize) {
            this.newImageUploadError.text(`image size must not exceed ${this.newAdFormRules.maxAdImageSize}mb`);
            return false;
        }


        else if (labelID) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#' + labelID).css('background-image', `url(${e.target.result})`);
                $('#' + labelID).children('i').hide();
            };

            reader.readAsDataURL(file);


        }
    };


    getSelectedAdType = () => {

        let selectedAdType = this.adTypeSelection.formSelect('getSelectedValues');

        selectedAdType = selectedAdType[0].toLowerCase();

        switch (selectedAdType) {
            case "ppv" :
                selectedAdType = "cpv";
                break;
            case "ppc" :
                selectedAdType = "cpc";
                break;
            case "ppa" :
                selectedAdType = "cpa";
                break;
        }

        return selectedAdType;
    };



    getTotalAdCharge = () => {


        const rate =  this.props.adRates[this.getSelectedAdType()];

        let totalAmount =  Number((rate  * Number(this.adUnit.val())).toFixed(2));


        let paystackAmount = defaults.convertToPaystack(totalAmount);

        totalAmount = (paystackAmount / 100).toFixed(2);



        $('#total-ad-charge').text(totalAmount);
         return [totalAmount , paystackAmount];
    };
    newAdModal = () =>
    {

        const proceedButton =Number(this.props.user.subscribed) ?
            <button type="submit" form="new-ad-form" className="waves-effect waves-light btn" id="login-proceed" value="Proceed">Proceed</button> : null;
        const closeModalButtonPositionLeftOrRight = proceedButton === null ? "right"  : "left";
        return (
            <div id="new-ad-modal" className="modal modal-fixed-footer">
                <div className="modal-content">
                    {this.newAdModalContent()}
            </div>
    <div className="modal-footer">
        {proceedButton}
        <a href="#" onClick={() => this.newAdModalPopUp.modal('close')}
           className={`no-underline ${closeModalButtonPositionLeftOrRight} grey-text`} id="close-new-ad-form">CLOSE</a>
        </div>
    </div>
        )
    };

    adForm = (newAd = true , adID = 1234 , index) => {
        return (



                    <div className="row">
                        <h5>Ad details</h5>
                        {/* Fieldset for new ad form */}
                        <fieldset id="new-ad-form-fieldset">
                            {/* New ad form */}
                            <form className="col s12" autoComplete="on" onSubmit={this.handleNewAdForm}
                                  name="new-ad-form" id="new-ad-form" action="#" encType="mutipart/form-data" noValidate="noValidate">
                                {/* Title */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">short_text</i>
                                        <input placeholder="Please write a clear title for your ad" id="new-ad-title"
                                               minLength={this.newAdFormRules.minAdTitleLength}
                                               name="new-ad-title" type="text"
                                               className="validate new-ad-form-fields"
                                               maxLength={this.newAdFormRules.maxAdTitleLength} required="required"/>
                                        <label htmlFor="new-ad-title" className="active">Title</label>
                                    </div>
                                </div>


                                {/* Description */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">subject</i>
                                        <textarea placeholder="Enter a detailed description" id="new-ad-description"
                                                  minLength={this.newAdFormRules.minAdDescriptionLength}
                                                  name="new-ad-description"
                                                  type="text"
                                                  rows="2"
                                                  className="validate new-ad-form-fields materialize-textarea"
                                                  maxLength={this.newAdFormRules.maxAdDescriptionLength}
                                                  required="required" />
                                        <label htmlFor="new-ad-description" className="active">Description</label>
                                    </div>
                                </div>
                                {/* Landing page */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">link</i>
                                        <input placeholder="e.g http://www.your-website.com/link" id="new-ad-link"
                                               name="new-ad-link"
                                               type="text"
                                               pattern="^(http|https|ftp):\/\/(www+\.)?[a-zA-Z0-9]+\.([a-zA-Z]{2,4})\/?"
                                               className="validate new-ad-form-fields" required="required"/>
                                        <label htmlFor="new-ad-link" className="active">Landing page</label>
                                        <span className="helper-text" data-error="Please enter a valid url"
                                              data-success=""> </span>
                                    </div>
                                </div>

                                {/* Contact (if any) */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">phone</i>
                                        <input placeholder="e.g +234 70 844 195 30" id="new-ad-contact"
                                               name="new-ad-contact"
                                               type="text"
                                               pattern="^(\+\d{2,4})?\s?(\d{10})$"
                                               className="validate new-ad-form-fields"/>
                                        <label htmlFor="new-ad-contact" className="active">Contact (if any)</label>
                                        <span className="helper-text" data-error="Please enter a valid phone number"
                                              data-success=""> </span>
                                    </div>
                                </div>
                                {/* Campaign/Business Name */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">business</i>
                                        <input placeholder="Enter your business name" id="new-ad-campaign-name"
                                               name="new-ad-campaign-name"
                                               type="text"
                                               className="validate new-ad-form-fields" minLength="1"
                                               maxLength={this.newAdFormRules.maxAdCampaignNameLength}
                                               required="required"/>
                                        <label htmlFor="new-ad-contact" className="active">Campaign/Business
                                            Name</label>
                                    </div>
                                </div>
                                {/* Business Location */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">location_on</i>
                                        <input placeholder="e.g Lagos, Nigeria (if any)" id="new-ad-location"
                                               name="new-ad-location"
                                               type="text"
                                               className="validate new-ad-form-fields"
                                               minLength="1"
                                               maxLength={this.newAdFormRules.maxCampaignLocationLength}
                                               required="required"/>
                                        <label htmlFor="new-ad-contact" className="active">Location</label>
                                    </div>
                                </div>

                                {/* Select Ad type */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">public</i>
                                        <select required="required" id="ad-type-selection" onChange={this.getTotalAdCharge}>
                                            <option value="" disabled="disabled">Choose your Ad option</option>
                                            <option value="ppv">Pay per view @ &#8358;{this.props.adRates.cpv} </option>
                                            <option value="ppc">Pay per click @ &#8358;{this.props.adRates.cpc}</option>
                                            <option value="ppa" disabled="disabled">Pay per affiliate @ &#8358;{this.props.adRates.cpa}</option>
                                        </select>
                                        <span className="blue-grey-text">our PPA option is unavailable at the moment</span>
                                        <label className="active">Ad type</label>
                                    </div>
                                </div>

                                {/* Number of units */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix">shopping_cart</i>
                                        <input placeholder="10+" id="new-ad-unit"
                                               name="new-ad-location"
                                               type="number"
                                               onChange={this.getTotalAdCharge}
                                               className="validate new-ad-form-fields"
                                               min="10"
                                               max="1000"
                                               required="required"
                                               />
                                        <label htmlFor="new-ad-contact" className="active">No.of Units</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12">

                                        <p>You will be charged : <strong className="strong">&#8358;<span id = "total-ad-charge"></span></strong></p>
                                    </div>
                                </div>

                                    {/* Hidden input field */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input placeholder="Valid location (if any)" name="new-ad-location"
                                               type="hidden"
                                               id="hidden-field"
                                        />
                                        <label htmlFor="new-ad-image" className="active">Banner image</label>
                                    </div>
                                </div>


                                {/* Banner Image */}
                                <div className="row">
                                    <span
                                        className="image-upload-error red-text new-image-upload-error error-text"></span>

                                    <div className="input-field file-field col s12">
                                        <input
                                            placeholder="Link to your image" id="new-ad-image"
                                            name="new-ad-image"
                                            type="file"
                                            className="validate merchant-ad-image new-ad-form-fields"
                                            required="required"
                                            accept="image/jpeg , image/png , image/x-png"
                                            onChange={e => {
                                                this.isValidUploadedImage(e, 'new-ad-image-label')
                                            }}
                                        />

                                        <label htmlFor="new-ad-image"
                                               className="active merchant-ad-image-label valign-wrapper"
                                               id="new-ad-image-label">
                                            <i className="large material-icons merchant-upload-image-icon">insert_photo</i>
                                        </label>
                                        <div className="file-path-wrapper merchant-upload-image-file-path-wrapper">
                                            <input className="file-path validate" type="text"
                                                   placeholder="Click on the icon" onKeyPress={(e) => {
                                                e.preventDefault(0);
                                            }}/>
                                        </div>

                                    </div>
                                </div>


                            </form>
                        </fieldset>
                    </div>

        )
    };
    newAdModalContent = () => {

        const modalContent  = Number(this.props.user.subscribed) ?
            this.adForm() : <div className="modal-activate-account-content">
                <div className="modal-account-activation-text"> Your account has not been activated yet.</div>
                <div className="modal-activate-button-container center-block"><button className="btn btn-small activate-account-modal-button" onClick={this.props.activateMerchantAccount}>Activate now</button></div>

            </div>;
        return (

            modalContent
        )
    };


    render() {

        let adsNumberMessage ,usedAdsMessage , adsPlural;

        let numberOfMerchantActiveAds = 0;

        this.props.ads.forEach((index , obj) => {

            return obj.active ? numberOfMerchantActiveAds += 1 : null;

        });

        adsPlural = numberOfMerchantActiveAds === 1 ? "ad" : "ads";
         const newAdsModalTrigger = defaults.numberOfAdSpaceForMerchant.map(index => {
             adsNumberMessage= this.props.ads[index] ? this.props.ads[index].title : "Edit this ad space";

            return (
                <div key = {Math.random()} className="row z-depth-3 merchant-ad-number-message">

                    <div className="col s12 valign-wrapper">
                        <p className="notice-header flow-text number-of-merchant-ads">{adsNumberMessage}
                            <a title="modify this ad" href="#new-ad-modal"  id="new-ad-dropdown"
                               className="material-icons add-ad-icon right modal-trigger  no-underline">mode_edit</a>
                        </p>
                    </div>
                </div>
            )

        });


        return (


            <div id="new-ad-form-container">

                {this.newAdModal()}
                <div className="col s12 valign-wrapper">
                <h6 className="blue-grey-text">You have <strong className="strong">{numberOfMerchantActiveAds}</strong> active {adsPlural} </h6>
                </div>
                {newAdsModalTrigger}
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