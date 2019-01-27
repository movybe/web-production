class MerchantAds extends React.Component {



    units = 0;
    adFormRules = {
        minAdTitleLength: 20,
        maxAdTitleLength: defaults.maxTitleLength,
        minAdDescriptionLength: 10,
        maxAdDescriptionLength: defaults.maxDescriptionLength,
        maxAdCampaignNameLength: 30,
        maxAdLocationLength: 30,
        maxAdImageSize: 2,
        contactRegularExpression : "[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}",
        urlRegularExpression : "^(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]\\.[^\\s]{2,})$",
        maxPPC : 50,
        maxPPV : 100
    };



    constructor ()
    {
        super();



    }
    defaultActions = () => {

        this.adModalPopup = $('.modal#ad-modal');
        this.adModalPopup.modal({dismissible: false});
        this.adEditForm = $('#ad-form');

        this.adFormFields = $('.ad-form-fields');
        this.newImageUploadError = $('.new-image-upload-error');
        this.adTypeSelection = $('#ad-type-selection');
        this.adTypeSelection.formSelect();
        this.adUnit = $('#ad-unit');
        this.totalAdCharge = $('#total-ad-charge');
        this.adImagePreviews = $('.ad-image-previews');
        $('input#ad-title').characterCounter();
        $('textarea#ad-description').characterCounter();



        this.defaultAdLinkPreviewText = "https://www.olx.com.ng/item/mac-book-pro-2017-iid-1051056268";
        this.defaultAdTitlePreviewText = "mac book pro 2017";
        this.defaultAdDescriptionPreviewText = "8gb ram 2.3ghz Intel core i5 13inch display";
        this.defaultAdLocationPreviewText = "Lagos";
        this.adTitlePreview = $('#ad-title-preview');
        this.adLinkPreview = $('#ad-link-preview');
        this.adDescriptionPreview = $('#ad-description-preview');
        this.adLocationPreview = $('#ad-location-preview');

        this.adTitle = $('#ad-title');
        this.adDescription = $('#ad-description');
        this.adLink = $('#ad-link');
        this.adLocation = $('#ad-location');
        this.adCampaignName = $('#ad-campaign-name');
        this.adContact = $('#ad-contact');
        this.mainAdLocation = "";
        this.adImage = $('#ad-image');
        this.adImageLabel = $('#ad-image-label');



        this.updateAdPreview();
    };


    componentDidMount() {

        this.defaultActions();


    }

    componentDidUpdate() {
        this.defaultActions();

    }

    handleAdForm = (e) => {


        e.preventDefault();

        M.updateTextFields();

        this.adEditForm.validate();

        if(!(this.adEditForm.valid() && this.isValidUploadedImage())) return;
          this.updateAdPreview();

    };

    updateAdPreview = () => {



        this.adTitlePreview.text(this.adTitle.val().truncate(defaults.maxTitleLength) || this.defaultAdTitlePreviewText);
        this.adLinkPreview.text(this.adLink.val().truncate(defaults.maxLinkLength) || this.defaultAdLinkPreviewText.truncate(defaults.maxLinkLength));
        this.adLinkPreview.attr('href' , this.adLink.val() || this.defaultAdLinkPreviewText);
        this.adTitlePreview.attr('href' , this.adLink.val() || this.defaultAdLinkPreviewText);
        this.adDescriptionPreview.text(this.adDescription.val().truncate(defaults.maxDescriptionLength) || this.defaultAdDescriptionPreviewText);
        this.mainAdLocation = (this.adLocation.val().truncate(this.adFormRules.maxAdLocationLength) || this.defaultAdLocationPreviewText) + `. ${this.adCampaignName.val().truncate(this.adFormRules.maxAdCampaignNameLength)} ${this.adContact.val()}`;
        this.adLocationPreview.text(this.mainAdLocation);
        return this.mainAdLocation;

    };

    isValidUploadedImage = () => {


        if (!window.FileReader && !window.Blob) {
            // All the File APIs are supported.
            return true;
        }

        const labelID = this.adImageLabel.attr('id');

        const elemID =this.adImage.attr('id');
        const control = document.getElementById(elemID);
        const file = control.files[0];
        let fileType;
        try {
             fileType = file.type;
        }
        catch (e) {
            this.newImageUploadError.text(`only png and jpeg images are allowed`);
            return false;
        }
        const fileSize = file.size;
        const fileSizeInMb = Math.round(fileSize / 1024000);
        const imageFileFormats = ["image/png", "image/jpeg"];

        $('#' + labelID).children('i').show();
        $('#' + elemID).css('background-image', 'url()');
        this.adImagePreviews.css('background-image' , 'url()');
        this.newImageUploadError.text(null);
        if ($.inArray(fileType, imageFileFormats) === -1) {
            this.newImageUploadError.text(`only png and jpeg images are allowed`);
            return false;
        }
        else if (fileSizeInMb > this.adFormRules.maxAdImageSize) {
            this.newImageUploadError.text(`image size must not exceed ${this.adFormRules.maxAdImageSize}mb`);
            return false;
        }


        else if (labelID) {
            var reader = new FileReader();

            reader.onload = e => {
                $('#' + labelID).css('background-image', `url(${e.target.result})`);
                this.adImagePreviews.css('background-image', `url(${e.target.result})`);
                $('#' + labelID).children('i').hide();
            };

            reader.readAsDataURL(file);


        }

        return true;
    };


    getSelectedAdType = () => {

        let selectedAdType = this.adTypeSelection.val();

        switch (selectedAdType) {
            case "ppv" :
                selectedAdType = "cpv";
                this.adUnit.attr('max' , this.adFormRules.maxPPV);
                break;
            case "ppc" :
                selectedAdType = "cpc";
                this.adUnit.attr('max' , this.adFormRules.maxPPC);
                break;
            case "ppa" :
                selectedAdType = "cpa";
                break;
        }

        this.adEditForm.validate();
        return selectedAdType;
    };



    getTotalAdCharge = () => {


        const selectedAdType = this.getSelectedAdType();
        const rate =  this.props.adRates[selectedAdType];

        let totalAmount =  Number((rate  * Number(this.adUnit.val())).toFixed(2));


        let paystackAmount = defaults.convertToPaystack(totalAmount);

        totalAmount = Number((paystackAmount / 100).toFixed(2));



        this.totalAdCharge.text(totalAmount.toLocaleString());
         return [totalAmount , paystackAmount];
    };
    adModal = () =>
    {

        const proceedButton =Number(this.props.user.subscribed) ?
            <button type="submit" form="ad-form" className="waves-effect waves-light btn" id="login-proceed" value="Proceed">Proceed</button> : null;
        const closeModalButtonPositionLeftOrRight = proceedButton === null ? "right"  : "left";
        return (
            <div id="ad-modal" className="modal modal-fixed-footer">
                <div className="modal-content">
                    {this.adModalContent()}
            </div>
    <div className="modal-footer">
        {proceedButton}
        <a href="#" onClick={() => this.adModalPopup.modal('close')}
           className={`no-underline ${closeModalButtonPositionLeftOrRight} grey-text`} id="close-new-ad-form">CLOSE</a>
        </div>
    </div>
        )
    };

    adForm = () => {
        return (



                    <div className="row">
                        <h5>Ad details</h5>
                        {/* Fieldset for new ad form */}
                        <fieldset id="ad-form-fieldset">
                            {/*Ad form */}
                            <form className="col s12" autoComplete="on" onSubmit={this.handleAdForm}
                                  name="ad-form" id="ad-form" action="#" encType="mutipart/form-data" noValidate="noValidate">
                                {/* Title */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons small prefix">short_text</i>
                                        <input data-name = "title" placeholder="Please write a clear title for your ad" id="ad-title"
                                               minLength={this.adFormRules.minAdTitleLength}
                                               name="ad-title" type="text"
                                               className="validate ad-form-fields char-counter"
                                               maxLength={this.adFormRules.maxAdTitleLength} required="required"
                                        onChange={this.updateAdPreview}/>
                                        <span className="helper-text" data-length = {this.adFormRules.maxAdTitleLength}  data-error="" data-success=""></span>

                                        <label htmlFor="ad-title" className="active">Title</label>
                                    </div>
                                </div>


                                {/* Description */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons small prefix">subject</i>
                                        <textarea placeholder="Enter a detailed description" id="ad-description"
                                                  minLength={this.adFormRules.minAdDescriptionLength}
                                                  name="ad-description"
                                                  rows="2"
                                                  className="validate ad-form-fields materialize-textarea char-counter"
                                                  maxLength={this.adFormRules.maxAdDescriptionLength}
                                                  required="required"
                                                  onChange={this.updateAdPreview}
                                                  data-name = "description"
                                        />
                                        <span className="helper-text" data-length = {this.adFormRules.maxAdDescriptionLength}  data-error="" data-success=""></span>

                                        <label htmlFor="ad-description" className="active">Description</label>
                                    </div>
                                </div>
                                {/* Landing page */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons small prefix">link</i>
                                        <input placeholder="e.g http://www.your-website.com/link"
                                               id="ad-link"
                                               name="ad-link"
                                               type="text"
                                               data-name = "link"
                                               onChange={this.updateAdPreview}
                                               pattern={this.adFormRules.urlRegularExpression}
                                               className="validate ad-form-fields" required="required" />
                                        <label htmlFor="ad-link" className="active">Landing page</label>
                                        <span className="helper-text" data-error="Please enter a valid url"
                                              data-success=""> </span>
                                    </div>
                                </div>

                                {/* Contact (if any) */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons small prefix">phone</i>
                                        <input placeholder="e.g +234 70 844 195 30" id="ad-contact"
                                               name="ad-contact"
                                               type="text"
                                               data-name = "contact"
                                               onChange={this.updateAdPreview}
                                               pattern={this.adFormRules.contactRegularExpression}
                                               className="validate ad-form-fields"/>
                                        <label htmlFor="ad-contact" className="active">Contact (if any)</label>
                                        <span className="helper-text" data-error="Please enter a valid phone number"
                                              data-success=""> </span>
                                    </div>
                                </div>
                                {/* Campaign/Business Name */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix small">business</i>
                                        <input placeholder="Enter your business name" id="ad-campaign-name"
                                               name="ad-campaign-name"
                                               type="text"
                                               onChange={this.updateAdPreview}
                                               className="validate ad-form-fields" minLength="1"
                                               maxLength={this.adFormRules.maxAdCampaignNameLength}
                                               required="required"
                                               data-name = "campaign"
                                        />
                                        <label htmlFor="ad-campaign-name" className="active">Campaign/Business
                                            Name</label>
                                    </div>
                                </div>
                                {/* Business Location */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix small">location_on</i>
                                        <input placeholder="e.g Lagos, Nigeria (if any)" id="ad-location"
                                               name="ad-location"
                                               type="text"
                                               onChange={this.updateAdPreview}
                                               className="validate ad-form-fields"
                                               minLength="1"
                                               data-name = "location"
                                               maxLength={this.adFormRules.maxAdLocationLength}
                                               required="required"/>
                                        <label htmlFor="ad-contact" className="active">Location</label>
                                    </div>
                                </div>

                                {/* Select Ad type */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons prefix small">public</i>
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
                                        <i className="material-icons prefix small">shopping_cart</i>
                                        <input placeholder="10+" id="ad-unit"
                                               name="ad-unit"
                                               type="number"
                                               onChange={this.getTotalAdCharge}
                                               className="validate ad-form-fields"
                                               min="10"
                                               required="required"
                                               data-name = "units"
                                               />
                                        <label htmlFor="ad-unit" className="active">No.of Units</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="input-field col s12">

                                        <p>You will be charged : <strong className="strong">&#8358;<span id = "total-ad-charge">0</span></strong> &nbsp;(payment charges included)</p>
                                    </div>
                                </div>

                                    {/* Hidden input field */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input placeholder="Valid location (if any)" name="ad-location"
                                               type="hidden"
                                               id="hidden-field"
                                        />
                                        <label htmlFor="ad-image" className="active">Banner image (1000 x 500)</label>
                                    </div>
                                </div>


                                {/* Banner Image */}
                                <div className="row">
                                    <span
                                        className="image-upload-error red-text new-image-upload-error error-text"></span>

                                    <div className="input-field file-field col s12">
                                        <input
                                            placeholder="Link to your image" id="ad-image"
                                            name="ad-image"
                                            type="file"
                                            className="validate merchant-ad-image ad-form-fields"
                                            required="required"
                                            accept="image/jpeg , image/png , image/x-png"
                                            onChange={
                                                this.isValidUploadedImage }
                                        />

                                        <label htmlFor="ad-image"
                                               className="active merchant-ad-image-label valign-wrapper"
                                               id="ad-image-label">
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

                                <div className="row ad-preview">
                                    <div className="input-field col s12">
                                        <input placeholder="Valid location (if any)" name="ad-location"
                                               type="hidden"
                                               id="hidden-field"
                                        />
                                        <label htmlFor="ad-image" className="active strong">Preview</label>
                                    </div>

                                    <div className="olx-search-result">

                                        <h6 className="green-text search-result-price"><span>AD</span></h6><h3
                                        className="search-result-title-header"><a id = "ad-title-preview" target="_blank"
                                                                                  className="search-result-title-link"
                                                                                  href="https://www.olx.com.ng/item/mac-book-pro-2017-iid-1051056268">mac
                                        book pro 2017</a></h3><a className="search-result-link-address" target="_blank"
                                                                 href="https://www.olx.com.ng/item/mac-book-pro-2017-iid-1051056268" id="ad-link-preview">https://www.olx.com.ng/item/mac-book-pro-201...</a><span
                                        className="search-result-link-description" id="ad-description-preview">8gb ram 2.3ghzIntel core i5 13inch display</span><span className="modal-link" data-caption="mac book pro 2017"
                           href="https://apollo-ireland.akamaized.net:443/v1/files/231xkfnw1l9r-NG/image">
                                    </span>
                                        <a
                                        download="mac book pro 2017" target="_blank"
                                        href="#"
                                        className="image-download-link search-result-images blue-text"><i
                                        className="tiny material-icons search-image-icons">image</i> Save Image</a>
                                        <span className="search-result-locations blue-grey-text"><i
                                            className="tiny material-icons search-location-icons">location_on</i><span id ="ad-location-preview">Lagos</span></span>

                                        <span className="modal-link">
                    <div className="image-container ad-image-previews-container">
                        <div className="blurred-bg ad-image-previews"></div>
                    <div className="overlay ad-image-previews">

                    </div>
                    </div>
    </span>

                                    </div>
                                </div>


                            </form>
                        </fieldset>
                    </div>

        )
    };

    adModalContent = () => {

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
                            <a title="modify this ad" href="#ad-modal"  id="new-ad-dropdown"
                               className="material-icons add-ad-icon right modal-trigger  no-underline">mode_edit</a>
                        </p>
                    </div>
                </div>
            )

        });


        return (


            <div id="new-ad-form-container">

                {this.adModal()}
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