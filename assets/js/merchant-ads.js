class MerchantAds extends React.Component {




    state = {currentlyViewedAdID : null , currentlyViewedAd : {}};


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

    refreshProfile () {

        let data = {email : this.props.email , action : 'FETCH_MERCHANT_DETAILS'};
        data = JSON.stringify(data);
        $.post(defaults.actions , {data} , response1 => {

            response1 = JSON.parse(response1);
            this.props.resetState({...this.props , user : response1.user , ads : response1.ads});



        });

    }

    changeAdActiveStatus = (e) => {

        e.persist();
        const action = $(e.target).attr('data-pause') == "true" ? 'PAUSE_AD' : 'PLAY_AD';
        const id = $(e.target).attr('data-ad-id');
        
        $(e.target).hide();
        let data = {action , id , email : this.props.email};
        data = JSON.stringify(data);
        console.log(data);
        $.post(defaults.actions , {data} , response  => {

            $(e.target).show();
            
            this.refreshProfile();
        });

    };

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
        this.adFormFieldset = $('#ad-form-fieldset');
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
        this.adStatModalPopup = $('#ad-stat-modal');
        $('.modal').modal();
        this.adStatModalPopup.modal({dismissible: false});
        this.adStatModalTrigger = $('#ad-stat-modal-trigger');
        //  this.adModalPopup.modal('open');

        let parent =  this;
        this.adEditForm.on('submit' , function (e) {

            e.preventDefault();
            e.stopImmediatePropagation();
             let form = this;
            parent.handleAdForm(e , form);
        });

        this.adStatModalTrigger.on('click' , function () {

            parent.showCurrentAdStat(this);
        });


        const fieldValues = {
            title: "Click here to buy your 2019 JAMB e-PIN",
            description: "purchase your jamb pin from remita , without stress",
            link: "http://www.google.com/remita",
            contact: "07084419530",
            campaign: "Remita",
            location: "Nigeria",
            units: 20,
        };

        Object.keys(fieldValues).forEach(function (key) {


            $(`*[name="${key}"]`).val(fieldValues[key]);

        });



        this.updateAdPreview();
    };


    componentDidMount() {

        this.defaultActions();



    }

    componentDidUpdate() {
        this.defaultActions();

    }


    handleAdForm = (e , form) => {



        M.updateTextFields();



        if(!(this.adEditForm.validate() && this.adEditForm.valid() && this.isValidUploadedImage())) return;
          this.updateAdPreview();
          this.adFormFieldset.prop(...defaults.disabledTrue);

          defaults.payWithPaystack(this.props.user.email , this.getTotalAdCharge().paystackAmount, this.adCampaignName.val() , response =>{


              if(response.status !== "success"){
                  this.adFormFieldset.prop(...defaults.disabledFalse);
                  defaults.showToast(defaults.transactionNotSuccessfulMessage);

                  return;
              }

              this.adFormFieldset.prop(...defaults.disabledFalse);

              let formData = new FormData(form);




              formData.append("ad_type" , this.adTypeSelection.val());
              formData.append("ad_rate" , this.getTotalAdCharge().rate);
              formData.append("total_amount" , this.getTotalAdCharge().totalAmount);
              formData.append("email" , this.props.user.email);
              formData.append("action" , "NEW_AD");
              formData.append('UPLOAD_IMAGE' , true);
              formData.append("ad_id" , "");
              formData.append("reference_code" , response.reference);
              formData.set("location" , this.updateAdPreview());

              $.ajax({
                  url: defaults.handleAdForm,
                  type: 'POST',
                  data: formData,
                  success:  (response)=> {


                      console.log(response);
                      this.refreshProfile();

                  }

                  ,
                  cache: false,
                  contentType: false,
                  processData: false
              });

          });




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


    getAdTypeTexts = ad_type => {
        switch (ad_type) {

            case 'ppc':
                return {plural : 'clicks' , singular : 'click' , payper : 'pay per click'};
            case 'ppv':
                return {plural : 'views' , singular : 'view' , payper : 'pay per view'};
            case 'ppa':
                return {plular : 'affiliates' , singular :'affiliate' , payper : 'pay per affiliate'};

        }
        return {plular : 'affiliates' , singular :'affiliate'};
    };

    adStatModal = () => {


        const getAdTypeTexts = ad_type => {

            return this.getAdTypeTexts(ad_type);
        };


        const isValidAd =  this.state.currentlyViewedAd !== null;
        const adType =  isValidAd ? this.state.currentlyViewedAd.ad_type : null;
        const modalContent = !isValidAd ? null :

            <div>
            <h5>{this.state.currentlyViewedAd.title}</h5>
            <p className="ad-stats-property-value">
                <span className="left-aligned property">Posted</span>
                <span className="right-align value">{timeago.format(this.state.currentlyViewedAd.posted_on)}</span>
            </p>

            <p className="ad-stats-property-value">
                <span className="left-aligned property">Last updated</span>
                <span className="right-align value">{timeago.format(this.state.currentlyViewedAd.updated_on)}</span>
            </p>

            <p className="ad-stats-property-value">
                <span className="left-align property">Balance</span>
                <span className="right-align value">&#8358;{this.state.currentlyViewedAd.balance}</span>
            </p>

            <p className="ad-stats-property-value">
                <span className="left-align property">Cost</span>
                <span className="right-align value">&#8358;{this.state.currentlyViewedAd.amount_paid}</span>
            </p>


            <p className="ad-stats-property-value">
                <span className="left-align property">Ad ID</span>
                <span className="right-align value">{this.state.currentlyViewedAd.ad_id}</span>
            </p>

            <p className="ad-stats-property-value">
                <span className="left-align property">Active</span>
                <span className="right-align value">{Number(this.state.currentlyViewedAd.active) ? "YES" : "NO"}</span>
            </p>

            <p className="ad-stats-property-value">
                <span className="left-align property">Approved</span>
                <span className="right-align value">{Number(this.state.currentlyViewedAd.approved) ? "YES" : "NO"}</span>
            </p>

                <p className="ad-stats-property-value">
                    <span className="left-align property">Ad type</span>
                    <span className="right-align value">{getAdTypeTexts(adType).payper}</span>
                </p>

                <p className="ad-stats-property-value">
                    <span className="left-align property">Ad rate</span>
                    <span className="right-align value">&#8358;{this.state.currentlyViewedAd.ad_rate + ' per ' + getAdTypeTexts(adType).singular}</span>
                </p>

                <p className="ad-stats-property-value">
                    <span className="left-align property">Total units paid</span>
                    <span className="right-align value">&#8358;{this.state.currentlyViewedAd.total_units_paid_for + ' ' + getAdTypeTexts(adType).plural}</span>
                </p>

                <p className="ad-stats-property-value">
                    <span className="left-align property">Remaining units</span>
                    <span className="right-align value">&#8358;{this.state.currentlyViewedAd.remaining_units + ' ' + getAdTypeTexts(adType).plural}</span>
                </p>


                <p className="ad-stats-property-value">
                    <span className="left-align property">Payment Code</span>
                    <span className="right-align value">{this.state.currentlyViewedAd.reference_code}</span>
                </p>




            </div>
        return (

            <div id="ad-stat-modal" className="modal modal-fixed-footer">
                <div className="modal-content">

                        {modalContent}

                </div>
                <div className="modal-footer">
                    <a href="#" onClick={() => this.adStatModalPopup.modal('close')}
                       className={`no-underline grey-text close-modal-right`} id="close-new-ad-form">CLOSE</a>
                </div>
            </div>
        )
    };

    getTotalAdCharge = () => {


        const selectedAdType = this.getSelectedAdType();
        const rate =  this.props.adRates[selectedAdType];

        let totalAmount =  Number((rate  * Number(this.adUnit.val())).toFixed(2));


        let paystackAmount = defaults.convertToPaystack(totalAmount);

        totalAmount = Number((paystackAmount / 100).toFixed(2));



        this.totalAdCharge.text(totalAmount.toLocaleString());
         return {totalAmount , paystackAmount , rate};
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
                            <form className="col s12" autoComplete="on"
                                  name="ad-form" id="ad-form" action="#" encType="mutipart/form-data" noValidate="noValidate">
                                {/* Title */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <i className="material-icons small prefix">short_text</i>
                                        <input data-name = "title" placeholder="Please write a clear title for your ad" id="ad-title"
                                               minLength={this.adFormRules.minAdTitleLength}
                                               name="title" type="text"
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
                                                  name="description"
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
                                               name="link"
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
                                               name="contact"
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
                                               name="campaign"
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
                                               name="location"
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
                                               name="units"
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
                                        <input placeholder="Valid location (if any)"
                                               type="hidden"
                                               id="hidden-field"
                                               required="required"
                                               value="hey there"

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
                                            name="banner"
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
                                        <input placeholder="Valid location (if any)"
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



    showCurrentAdStat = target => {


        const currentlyViewedAdID = $(target).attr('data-ad-id');
        let currentlyViewedAd= "a";
        this.props.ads.forEach(ad => {

            if(ad.ad_id === currentlyViewedAdID) {
              currentlyViewedAd = ad;
              return 0;
            }
        });

        console.log(currentlyViewedAd);
        this.setState({
            ...this.state ,
            currentlyViewedAd,
            currentlyViewedAdID
        });




};


    render() {

        let adsNumberMessage ,usedAdsMessage , adsPlural , adPublishedOnText , currentAd , adStatsModalLink
        , isEmptyAd , changeAdStatusSpan , pauseAdSpan , playAdSpan ;
        

        let numberOfMerchantActiveAds = 0;

        this.props.ads.forEach((obj , index) => {

            return Number(obj.active) ? numberOfMerchantActiveAds += 1 : null;

        });




        adsPlural = numberOfMerchantActiveAds === 1 ? "ad" : "ads";
         const newAdsModalTrigger = defaults.numberOfAdSpaceForMerchant.map(index => {


             currentAd   = this.props.ads[index] || false;
             adStatsModalLink = currentAd !== false && currentAd.updated_on ?  <a title="View stats" id = "ad-stat-modal-trigger" data-ad-id = {currentAd.ad_id} href="#ad-stat-modal" className ="right stats ad-stat-modal-link material-icons modal-trigger">insert_chart</a>
              : null;
             isEmptyAd = !Boolean(currentAd);
             adsNumberMessage = currentAd ? currentAd.title.truncate(defaults.adListTitleLength) : "Edit this ad space";
             adPublishedOnText = currentAd ? <span>Published  {timeago.format(currentAd.updated_on)}</span> : null;
             
             playAdSpan = isEmptyAd ? null : <span className = "ad-change-active-status"><span className = "activate-pause-ad-text red-text">PAUSED </span> <i className ="ad-pause-play-icon material-icons green-text cursor-pointer" data-ad-id = {currentAd.ad_id} data-pause = {false} onClick = {this.changeAdActiveStatus}>play_arrow </i></span>;
             pauseAdSpan =isEmptyAd ? null : <span className = "ad-change-active-status"><span className = "activate-pause-ad-text green-text">ACTIVE </span><i className ="ad-pause-play-icon material-icons red-text cursor-pointer" data-ad-id = {currentAd.ad_id} data-pause = {true} onClick = {this.changeAdActiveStatus}>pause</i></span>;
             
             if(!isEmptyAd)
             {

                if(Number(currentAd.paused) /* i.e the ad is paused */)
                
                {
                    changeAdStatusSpan = playAdSpan;
                }
                else 
                {
                    changeAdStatusSpan = pauseAdSpan;
                }
             }
             else {
                 changeAdStatusSpan = null
             }
             



            return (
                <div key = {Math.random()} className="row z-depth-3 merchant-ad-number-message">

                    <div className="col s12 valign-wrapper">
                        <p className="notice-header flow-text number-of-merchant-ads">{adsNumberMessage}
                            <a title="modify this ad" href="#ad-modal"  id="new-ad-dropdown"
                               className="material-icons add-ad-icon right modal-trigger  no-underline">mode_edit</a>
                            {adStatsModalLink}
                            <span className="ad-published-on-text">{adPublishedOnText}{changeAdStatusSpan}</span>

                        </p>
                    </div>
                </div>
            )

        });


        return (


            <div id="new-ad-form-container">

                {this.adModal()}
                {this.adStatModal()}
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