class MerchantPlugs extends React.Component {




    editAdFormActions = {UPDATE : "UPDATE" , RENEW : "RENEW" , NEW : "NEW"};
    serverFormActions = {UPDATE : 'UPDATE_AD' , RENEW : 'RENEW_AD' , NEW : 'NEW_AD'};

    initState = {

        currentlyViewedAdID : null ,
        currentlyViewedAd : {} ,
        editAdFormID : null , editAd :
            {
                title: "Your ad title goes here",
                description: "your ad description goes here",
                link: "http://www.link-to-your-ad.com",
                contact: defaults.whatsappContact.replace(/ /g,''),
                campaign: "Company name",
                location: "e.g Lagos, Nigeria",
                units: 20,
            },
        editAdFormAction : this.editAdFormActions.UPDATE,
        uploadImage : false ,
        adFormTriggerClicked : false,

    };


    state =
        {
    currentlyViewedAdID : null , 
    currentlyViewedAd : {} ,  
    editAdFormID : null ,
    editAd : {...this.initState.editAd} ,
    editAdFormAction : this.editAdFormActions.UPDATE,
    uploadImage : false ,
    adFormTriggerClicked : false,
        };


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
        maxPPV : 100,
        uploadImage : false
    };



    constructor ()
    {
        super();
    }


    changeAdActiveStatus = e => {
        e.persist();
        const action = $(e.target).attr('data-pause') == "true" ? 'PAUSE_AD' : 'PLAY_AD';
        const id = $(e.target).attr('data-ad-id');
        $(e.target).hide();
        let data = {action , id , email : this.props.email};
        data = JSON.stringify(data);
          $.post(defaults.actions , {data} , response  => {
              $(e.target).show();
              this.props.refreshProfile();
        });

    };

    closeEditAdFormModal =  () => {
        this.setState({...this.state , editAd:{} , editAdClicked : false});

    };
    loadDefaultTextsIntoFields = () => {


        const fieldValues = {
            ...this.initState.editAd
        };
        Object.keys(fieldValues).forEach(function (key) {
                $(`*[name="${key}"]`).val(fieldValues[key]);
            });
         };




    defaultActions = () => {

        this.adStatModalTrigger = $('.ad-stat-modal-trigger');
        this.editAdModalTrigger = $('.edit-ad-modal-trigger');
        this.adModalPopup = $('.modal#ad-modal');
        this.adEditForm = $('#ad-form');
        this.adFormFields = $('.ad-form-fields');
        this.newImageUploadError = $('.new-image-upload-error');
        this.adTypeSelection = $('#ad-type-selection');
        this.adTypeSelection.formSelect();
        this.adUnit = $('#ad-unit');

        this.progressBar   = $('.progress-bar');
        this.totalAdCharge = $('#total-ad-charge');
        this.adFormFieldset = $('#ad-form-fieldset');
        $('input#ad-title').characterCounter();
        $('textarea#ad-description').characterCounter();

        this.adTitlePreview = $('#ad-title-preview');
        this.adLinkPreview = $('#ad-link-preview');
        this.adDescriptionPreview = $('#ad-description-preview');
        this.adLocationPreview = $('#ad-location-preview');


        this.closeNewAdForm = $('#close-new-ad-form');
        this.defaultAdLinkPreviewText = "https://www.olx.com.ng/item/mac-book-pro-2017-iid-1051056268";
        this.defaultAdTitlePreviewText = "mac book pro 2017";
        this.defaultAdDescriptionPreviewText = "8gb ram 2.3ghz Intel core i5 13inch display";
        this.defaultAdLocationPreviewText = "Lagos";

        this.adTitle = $('#ad-title');
        this.adDescription = $('#ad-description');
        this.adLink = $('#ad-link');
        this.adLocation = $('#ad-location');
        this.adCampaignName = $('#ad-campaign-name');
        this.adContact = $('#ad-contact');
        this.mainAdLocation = "";
        this.adImage = $('#ad-image');
        this.merchantUploadImageIcon = $('.merchant-upload-image-icon');
        this.adImagePreviews = $('.ad-image-previews');
        this.adImageLabel = $('#ad-image-label');
        this.adStatModalPopup = $('#ad-stat-modal');

        try {
            this.filePath = $('input.file-path');
            //  this.adModalPopup.modal('open');
            let parent =  this;
            this.adImage.on('change' , () => {

                this.setState({...this.state , uploadImage : true});
            });

            this.adEditForm.on('submit' , function (e) {

                e.preventDefault();
                e.stopImmediatePropagation();
                let form = this;
                parent.handleAdForm(e , form);
            });


            if(!this.loaded) {
                this.adModalPopup.modal({dismissible: false});
                this.adStatModalPopup.modal({dismissible: false});
                this.loaded = true;
            }
        }
        catch (e) {
            this.loaded = false;
        }








    };

    refreshProfile () {
        let data = {email : this.props.email , action : 'FETCH_MERCHANT_DETAILS'};
        data = JSON.stringify(data);
        $.post(defaults.actions , {data} , response1 => {
            response1 = JSON.parse(response1);
            this.props.resetState({...this.props , user : response1.user , ads : response1.ads});
        });
    }


    normalActions = () => {

        this.adStatModalTrigger.on('click' , this.showCurrentAdStat);
        this.editAdModalTrigger.on('click' , this.modifyAdForm);

    };

    shouldComponentUpdate(nextProps, nextState) {
        return this.props !== nextProps;
    }

    componentDidMount() {

        this.defaultActions();
        this.normalActions();
        this.loaded = false;

    }

    componentDidUpdate() {
        this.defaultActions();
        this.normalActions();
    }


    handleAdForm = (e , form) => {


        M.updateTextFields();



        var shouldReturn = false;
        //Check if the form fields are valid
        if(!(this.adEditForm.validate() && this.adEditForm.valid())) {
            shouldReturn = true;
        }

        //Check if it's a new ad and the image is valid
        else if((this.state.editAdFormAction === this.editAdFormActions.NEW) && !this.isValidUploadedImage()){
                      shouldReturn = true;
        }
        // if the user wants to chenge the already existing image, check if it's a valid image
        else if(this.state.uploadImage && !this.isValidUploadedImage()){
            shouldReturn = true;
        }

        
        if(shouldReturn) return;


          this.adFormFieldset.prop(...defaults.disabledTrue);


          const isNewOrRenewedAd = this.state.editAdFormAction === this.editAdFormActions.NEW || this.state.editAdFormAction === this.editAdFormActions.RENEW;
          let payWithPaystack = isNewOrRenewedAd ? defaults.payWithPaystack :
            function(email , amount = 5000 , name , callback){
                callback({status : "success"});
            
            };
          payWithPaystack = this.props.user.is_site_advert_login_email ?
              function(email , amount = 5000 , name , callback){
                  callback({status : "success" , reference : Math.round(Math.random() * 1000000)});
          } : payWithPaystack;

          payWithPaystack(this.props.user.email , this.getTotalAdCharge().paystackAmount || null , this.adCampaignName.val() , response =>{


             
              if(response.status !== "success"){
                  this.adFormFieldset.prop(...defaults.disabledFalse);
                  defaults.showToast(defaults.transactionNotSuccessfulMessage);

                  return;
              }

              
              this.adFormFieldset.prop(...defaults.disabledFalse);


              let formData = new FormData(form);



              
              
              if(isNewOrRenewedAd)
              {

                  
              formData.append("ad_type" , this.adTypeSelection.val());
              formData.append("ad_rate" , this.getTotalAdCharge().rate);
              formData.append("total_amount" , this.getTotalAdCharge().totalAmount);
              formData.append("reference_code" , response.reference);
            }


            
           

            //Get the current form action and send it to the server

            let serverFormAction;
            switch (this.state.editAdFormAction)
            {
                case this.editAdFormActions.RENEW :
                serverFormAction = this.serverFormActions.RENEW;
                break;
                
                case this.editAdFormActions.NEW :
                serverFormAction = this.serverFormActions.NEW;
                break;

                case this.editAdFormActions.UPDATE :
                serverFormAction = this.serverFormActions.UPDATE;
                break;

            }

           


              formData.append("email" , this.props.user.email);
              formData.append("action" , serverFormAction);
              formData.append('UPLOAD_IMAGE' , this.state.uploadImage);
              formData.append("ad_id" , this.state.editAdFormID || "");
              
              formData.set("location" , this.updateAdPreview());
              formData.append("ad_location" , this.adLocation.val()); 
              let percentComplete = 0 , parent =  this;
              $.ajax({
                  xhr: function() {
                      parent.progressBar.loading(0);
                      parent.progressBar.show();

                      let xhr = new window.XMLHttpRequest();

                      xhr.upload.addEventListener("progress", e => {
                          if (e.lengthComputable) {
                              percentComplete = e.loaded / e.total;
                              percentComplete = parseInt(percentComplete * 100);
                              parent.progressBar.loading(0);
                              parent.progressBar.loading(percentComplete);



                              if (percentComplete === 100) {
                                  parent.progressBar.loading(0);
                                  parent.progressBar.hide();

                              }

                          }
                      }, false);

                      return xhr;
                  },
                  url: defaults.handleAdForm,
                  type: 'POST',
                  data: formData,
                  success:  response => {


                    response = JSON.parse(response);
                    this.adFormFieldset.prop(...defaults.disabledFalse);

                      defaults.showToast(response.error);
                      this.refreshProfile();
                      this.adModalPopup.modal('close');
                      this.setState({...this.state , adFormTriggerClicked : false , editAdClicked : false});
                      },
                  cache: false,
                  contentType: false,
                  processData: false
              });

              this.adFormFieldset.prop(...defaults.disabledTrue);




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
        /*
        this.adTitlePreview.text(isValidState ? this.state.editAd.title.truncate(defaults.maxTitleLength) : this.adTitle.val().truncate(defaults.maxTitleLength) || this.defaultAdTitlePreviewText);
        this.adLinkPreview.text(isValidState ? this.state.editAd.link.truncate(defaults.maxLinkLength) : this.adLink.val().truncate(defaults.maxLinkLength) || this.defaultAdLinkPreviewText.truncate(defaults.maxLinkLength));
        this.adLinkPreview.attr('href' , isValidState ? this.state.editAd.link : this.adLink.val() || this.defaultAdLinkPreviewText);
        this.adTitlePreview.attr('href' , isValidState ? this.state.editAd.link : this.adLink.val() || this.defaultAdLinkPreviewText);
        this.adDescriptionPreview.text(isValidState ? this.state.editAd.description.truncate(defaults.maxDescriptionLength): this.adDescription.val().truncate(defaults.maxDescriptionLength) || this.defaultAdDescriptionPreviewText);
        this.mainAdLocation = (isValidState ? this.state.editAd.ad_location.truncate(this.adFormRules.maxAdLocationLength) : this.adLocation.val().truncate(this.adFormRules.maxAdLocationLength) || this.defaultAdLocationPreviewText) + `. ${this.adCampaignName.val().truncate(this.adFormRules.maxAdCampaignNameLength)} ${this.adContact.val()}`;
        this.adLocationPreview.text(this.mainAdLocation);
*/

    };

    updateEditAdFormFromState = () => {

            this.adTitle.val(this.state.editAd.title);
            this.adDescription.val(this.state.editAd.description);
            this.adLink.val(this.state.editAd.link);
            this.adContact.val(this.state.editAd.contact);
            this.adCampaignName.val(this.state.editAd.campaign_name);
            this.adLocation.val(this.state.editAd.ad_location);




    };

    isValidUploadedImage = () => {


        let returnValue = true;


        if (!window.FileReader && !window.Blob) {
            // All the File APIs are supported.
            returnValue = false;
        }


        const labelID = this.adImageLabel.attr('id');


        let elemID = this.adImage.attr('id'), control = document.getElementById(elemID) , file , fileType;
        try {

             file = control.files[0];
             fileType = file.type;
        }
        catch (e) {
            this.newImageUploadError.text(`only png and jpeg images are allowed`);
            returnValue = false;
            return returnValue;
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
            returnValue = false;
        }
        else if (fileSizeInMb > this.adFormRules.maxAdImageSize) {
            this.newImageUploadError.text(`image size must not exceed ${this.adFormRules.maxAdImageSize}mb`);
            returnValue = false;
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


        const action = returnValue ? this.merchantUploadImageIcon.hide():this.merchantUploadImageIcon.show();
        return returnValue;
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
                return {plural : 'affiliates' , singular :'affiliate' , payper : 'pay per affiliate'};
        }
        return {plular : 'affiliates' , singular :'affiliate'};
    };

    adStatModal = () => {


        const getAdTypeTexts = ad_type => {

            return this.getAdTypeTexts(ad_type);
        };


        const isValidAd =  this.state.currentlyViewedAd !== null;
        const adType =  isValidAd ? this.state.currentlyViewedAd.ad_type : null;

        const toggleLastViewed = this.state.currentlyViewedAd.last_viewed && this.state.currentlyViewedAd.number_of_views >=1 ?
        <p className="ad-stats-property-value">
            <span className="left-aligned property">Last viewed</span>
            <span className="right-align value">{timeago.format(this.state.currentlyViewedAd.last_viewed)}</span>
        </p> : null;

        const toggleLastClicked = this.state.currentlyViewedAd.last_clicked && this.state.currentlyViewedAd.number_of_clicks >=1 ?
            <p className="ad-stats-property-value">
                <span className="left-aligned property">Last clicked</span>
                <span className="right-align value">{timeago.format(this.state.currentlyViewedAd.last_clicked)}</span>
            </p> : null;

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

                    <span className="left-align property">Number of Views</span>
                    <span className="right-align value">{this.state.currentlyViewedAd.number_of_views}</span>
            </p>

                {toggleLastViewed}


            <p className="ad-stats-property-value">

                <span className="left-align property">Number of Clicks</span>
                <span className="right-align value">{this.state.currentlyViewedAd.number_of_clicks}</span>
            </p>

                {toggleLastClicked}

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
                    <span className="right-align value">{this.state.currentlyViewedAd.total_units_paid_for + ' ' + getAdTypeTexts(adType).plural}</span>
                </p>

                <p className="ad-stats-property-value">
                    <span className="left-align property">Remaining units</span>
                    <span className="right-align value">{this.state.currentlyViewedAd.remaining_units + ' ' + getAdTypeTexts(adType).plural}</span>
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
                    <a href="#" onClick={(e) => {e.preventDefault(); this.adStatModalPopup.modal('close')}}
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
            <label for ="submit-ad-form-button" tabIndex="0" className="waves-effect waves-light btn" id="ad-form-proceed">Proceed</label> : null;
        const closeModalButtonPositionLeftOrRight = proceedButton === null ? "right"  : "left";
        return (
            <div id="ad-modal" className="modal modal-fixed-footer">

                <div className="modal-content">

                    {this.adModalContent()}
            </div>
    <div className="modal-footer">
        {proceedButton}
        <a href="#" onClick={(e) => {e.preventDefault(); this.adModalPopup.modal('close')}}
           className={`no-underline ${closeModalButtonPositionLeftOrRight} grey-text`} id="close-new-ad-form">CLOSE</a>
        </div>
    </div>
        )
    };

    adForm = () => {
        const adTypeAndAdUnitsStyle = (this.state.editAdFormAction ===  this.editAdFormActions.NEW) || (this.state.editAdFormAction === this.editAdFormActions.RENEW)  ?
            {} : {display: 'none'};
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
                                               defaultValue = {this.state.editAd.title}
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
                                                  defaultValue={this.state.editAd.description}
                                        ></textarea>
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
                                               defaultValue = {this.state.editAd.link}
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
                                               defaultValue = {this.state.editAd.contact}
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
                                               defaultValue = {this.state.editAd.campaign}
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
                                               required="required"
                                               defaultValue = {this.state.editAd.location} />
                                        <label htmlFor="ad-contact" className="active">Location</label>
                                    </div>
                                </div>
                                {/* Select Ad type */}
                                <div className="row" style={adTypeAndAdUnitsStyle}>
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
                                <div className="row" style={adTypeAndAdUnitsStyle}>
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
                                               defaultValue = {this.state.editAd.units}
                                        />
                                        <label htmlFor="ad-unit" className="active">No.of Units</label>
                                    </div>
                                </div>
                                <div className="row" style={adTypeAndAdUnitsStyle}>
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
                                                                 href="#" id="ad-link-preview">https://www.olx.com.ng/item/mac-book-pro-201...</a><span
                                        className="search-result-link-description" id="ad-description-preview">8gb ram 2.3ghzIntel core i5 13inch display</span><span className="modal-link" data-caption="mac book pro 2017"></span>

                                            <i className="small material-icons search-image-icons blue-text modified-ad-icons ad-image-icon">image</i>

                                        <a href="#"
                                           className="show-ad-image image-download-link search-result-images blue-text">View</a>
                                        <span className="view-save-separator">•</span>
                                        <a download="Your ad title goes here" target="_blank" href="/banner/Kk2zd6K.png"
                                           className="image-download-link search-result-images blue-text"> Save</a>
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

<input type = "submit" id = "submit-ad-form-button" className='hidden  hide' value = 'Submit'/>
                            </form>
                        </fieldset>
                    </div>

        )
    };
  

    adModalContent = () => {

        const modalContent  = Number(this.props.user.subscribed) ?
            this.adForm() : <div className="modal-activate-account-content">
                <div className="modal-account-activation-text"> Your account has not been activated yet.</div>
                <div className="modal-activate-button-container center-block"><button className="btn btn-small activate-account-modal-button" onClick={() => this.props.activateMerchantAccount(this.props.refreshProfile)}>Activate now</button></div>

            </div>;
        return (

            modalContent
        )
    };

    modifyAdForm = e => {
        const action = $(e.target).attr('data-edit-ad-form-action');
        let adID = null , clickedAd = {};
        switch (action) {
            case this.editAdFormActions.UPDATE:
            case this.editAdFormActions.RENEW:


                adID = $(e.target).attr('data-ad-id');

                this.props.ads.forEach(ad => {

                    if(ad.ad_id === adID) {
                        clickedAd = {...ad};
                        return 0;
                    }
                });


                //To prevent caching of images
                
                const randomNumber = Math.floor(Math.random() * 1000);
                
                this.adImageLabel.css('background-image' , `url(${defaults.bannerImageLocation + clickedAd.banner}?id=${randomNumber})`);
                this.adImagePreviews.css('background-image' , `url(${defaults.bannerImageLocation + clickedAd.banner}?id=${randomNumber})`);

                this.filePath.val(clickedAd.banner);
                this.merchantUploadImageIcon.hide();

                this.setState({...this.state , editAdFormAction : action , editAdFormID : adID , editAd : clickedAd , adFormTriggerClicked : true} , this.updateEditAdFormFromState);
                break;
        }
        if(!adID) {

            this.adImageLabel.css('background-image' , `url()`);
            this.adImagePreviews.css('background-image' , `url()`);
            this.filePath.val(null);
            this.merchantUploadImageIcon.show();
            this.setState({...this.state , editAdFormAction : action , editAd : {...this.initState.editAd} ,  editAdFormID : adID , uploadImage : false , adFormTriggerClicked : true} , this.loadDefaultTextsIntoFields);
            return;
        }

        return true;



    };



    showCurrentAdStat = e => {

        const currentlyViewedAdID = $(e.target).attr('data-ad-id');


        let currentlyViewedAd= "a";
        this.props.ads.forEach(ad => {

            if(ad.ad_id === currentlyViewedAdID) {
              currentlyViewedAd = {...ad};
              return 0;
            }
        });
        this.setState({
            ...this.state ,
            currentlyViewedAd,
            currentlyViewedAdID
        });
    };


    render() {

        let adsNumberMessage ,usedAdsMessage , adsPlural , adPublishedOnText , currentAd , adStatsModalLink
        , isEmptyAd , changeAdStatusSpan , pauseAdSpan , playAdSpan,editAdFormAction, suspended = null ,expired = null ,
        numberOfAdSpace, suspendedAdMessage;

        

        let numberOfMerchantActiveAds = 0;

        this.props.ads.forEach((obj , index) => {
            return Number(obj.active) ? numberOfMerchantActiveAds += 1 : null;
        });

        adsPlural = numberOfMerchantActiveAds === 1 ? "ad" : "ads";

        numberOfAdSpace = this.props.user.is_site_advert_login_email ? defaults.numberOfAdSpaceForOmoba : defaults.numberOfAdSpaceForMerchant;
        const newAdsModalTrigger = numberOfAdSpace.map(index => {
        currentAd   = this.props.ads[index] || false;
        adStatsModalLink = currentAd !== false && currentAd.updated_on ?  <a title="View stats" id = "ad-stat-modal-trigger" data-ad-id = {currentAd.ad_id} href="#ad-stat-modal" className ="right stats ad-stat-modal-link ad-stat-modal-trigger material-icons modal-trigger">insert_chart</a>
              : null;
        isEmptyAd = !Boolean(currentAd);
        adsNumberMessage = currentAd ? currentAd.title.truncate(defaults.adListTitleLength) : "Edit this ad space";
        adPublishedOnText = currentAd ? <span>Published  {timeago.format(currentAd.posted_on)}</span> : null;
        playAdSpan = isEmptyAd ? null : <span className = "ad-change-active-status"><span className = "activate-pause-ad-text red-text">PAUSED </span> <i className ="ad-pause-play-icon material-icons green-text cursor-pointer" data-ad-id = {currentAd.ad_id} data-pause = {false} onClick = {this.changeAdActiveStatus}>play_arrow </i></span>;
        pauseAdSpan =isEmptyAd ? null : <span className = "ad-change-active-status"><span className = "activate-pause-ad-text green-text">ACTIVE </span><i className ="ad-pause-play-icon material-icons red-text cursor-pointer" data-ad-id = {currentAd.ad_id} data-pause = {true} onClick = {this.changeAdActiveStatus}>pause</i></span>;
        suspendedAdMessage = null;
        expired = null;
            if(!isEmptyAd)
             {
                 editAdFormAction = Number(currentAd.active) ? this.editAdFormActions.UPDATE : this.editAdFormActions.RENEW;

                 suspendedAdMessage = !Number(currentAd.approved) ? <p><span className="suspended-text red-text">suspended :</span><span className="suspended-reason black-text">{currentAd.admin_message}</span><span></span></p> : suspendedAdMessage;
                 expired = !Number(currentAd.active)? <span className="red-text expired suspended">expired</span> : expired;
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
                 changeAdStatusSpan = null;
                 editAdFormAction = this.editAdFormActions.NEW;
                 }

             



            return (
                <div key = {Math.random()} className="row z-depth-3 merchant-ad-number-message">

                    <div className="col s12 valign-wrapper">
                        <p className="notice-header flow-text number-of-merchant-ads">{adsNumberMessage}
                            <a title="modify this ad" href="#ad-modal"  id="new-ad-dropdown" data-ad-id = {currentAd.ad_id}
                               className="material-icons add-ad-icon right modal-trigger edit-ad-modal-trigger no-underline" data-edit-ad-form-action = {editAdFormAction}>mode_edit</a>
                            {adStatsModalLink}
                            <span className="ad-published-on-text">{adPublishedOnText}{changeAdStatusSpan}</span>
                            {expired}
                            {suspendedAdMessage}
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

MerchantPlugs = connect(mapStateToProps)(MerchantPlugs);