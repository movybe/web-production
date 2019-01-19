class MerchantAds extends React.Component

{


    newAdFormRules = {
        minAdTitleLength : 20,
        maxAdTitleLength : defaults.maxTitleLength ,
        minAdDescriptionLength : 10,
        maxAdDescriptionLength : defaults.maxDescriptionLength,
        maxAdCampaignNameLength : 120,
        maxCampaignLocationLength : 120,
        maxAdImageSize : 2
    };

    defaultActions = () =>
    {

        this.newAdModalPopUp = $('.modal#new-ad-modal');
        this.newAdModalPopUp.modal({dismissible:false});
        this.newAdForm = $('#new-ad-form');

        this.newAdFormFields = $('.new-ad-form-fields');
        this.newImageUploadError = $('.new-image-upload-error');

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

    isValidUploadedImage = (e , labelID) =>
    {


            if (!window.FileReader && !window.Blob) {
                // All the File APIs are supported.
                return true;
            }

            const elemID = e.target.id;
            const  control = document.getElementById(elemID);
            const file = control.files[0];
            const fileType = file.type;
            const fileSize = file.size;
            const fileSizeInMb = Math.round(fileSize/102400);
            const imageFileFormats = ["image/png", "image/jpeg"];

        $('#' + labelID).children('i').show();
        $('#'+ elemID).css('background-image' , 'url()');
        this.newImageUploadError.text(null);
    if ($.inArray(fileType, imageFileFormats) === -1) {
        this.newImageUploadError.text(`only png and jpeg images are allowed`);
        return false;
    }
    else if (fileSizeInMb > this.newAdFormRules.maxAdImageSize){
                this.newImageUploadError.text(`image size must not exceed ${this.newAdFormRules.maxAdImageSize}mb`);
                return false;
            }




                else if(labelID)
        {
            var reader = new FileReader();

            reader.onload = function(e) {
                $('#' + labelID).css('background-image' , `url(${e.target.result})`);
                $('#' + labelID).children('i').hide();
            };

            reader.readAsDataURL(file);


        }
            };





    newAdModal = () =>
    {
        return(
            <div id="new-ad-modal" className="modal modal-fixed-footer">
                <div className="modal-content">
                    <h5>Ad details</h5>
                    <div className="row">
                        {/* Fieldset for new ad form */}
                        <fieldset id="new-ad-form-fieldset">
                            {/* New ad form */}
                            <form className="col s12" autoComplete= "on" onSubmit={this.handleNewAdForm} name="new-ad-form" id="new-ad-form" action="#" encType="mutipart/form-data">
                                {/* Title */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input placeholder="Please write a clear title for your ad" id="new-ad-title" minLength={this.newAdFormRules.minAdTitleLength}
                                                name = "new-ad-title"  type="text"
                                                className="validate new-ad-form-fields" maxLength={this.newAdFormRules.maxAdTitleLength} required="required" />
                                        <label htmlFor="new-ad-title" className="active">Title</label>
                                    </div>
                                </div>


                                {/* Description */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <textarea placeholder= "Enter a detailed description" id="new-ad-description" minLength={this.newAdFormRules.minAdDescriptionLength}
                                                 name = "new-ad-description"
                                                type="text"
                                                  rows="2"
                                                  className="validate new-ad-form-fields materialize-textarea" maxLength={this.newAdFormRules.maxAdDescriptionLength}  required="required"></textarea>
                                        <label htmlFor="new-ad-description" className="active">Description</label>
                                    </div>
                                </div>
                                {/* Landing page */}
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

                                {/* Contact (if any) */}
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
                                {/* Campaign/Business Name */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input placeholder= "Enter your business name" id="new-ad-campaign-name"
                                               name = "new-ad-campaign-name"
                                               type="text"
                                               className="validate new-ad-form-fields" minLength="1" maxLength={this.newAdFormRules.maxAdCampaignNameLength} required="required" />
                                        <label htmlFor="new-ad-contact" className="active">Campaign/Business Name</label>
                                      </div>
                                </div>
                                {/* Business Location */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input placeholder= "Valid location (if any)" id="new-ad-location"
                                               name = "new-ad-location"
                                               type="text"
                                               className="validate new-ad-form-fields"
                                               minLength= "1"
                                               maxLength={this.newAdFormRules.maxCampaignLocationLength} required="required" />
                                        <label htmlFor="new-ad-contact" className="active">Location</label>
                                       </div>
                                </div>

                                {/* Hidden input field */}
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input placeholder= "Valid location (if any)"                                              name = "new-ad-location"
                                               type="hidden"
                                               id ="hidden-field"
                                                />
                                        <label htmlFor="new-ad-image" className="active">Banner image</label>
                                     </div>
                                </div>



                                {/* Banner Image */}
                                <div className="row">
                                    <span className="image-upload-error red-text new-image-upload-error error-text"></span>

                                    <div className="input-field file-field col s12">
                                        <input
                                            placeholder= "Link to your image" id="new-ad-image"
                                               name = "new-ad-image"
                                               type="file"
                                               className="validate merchant-ad-image new-ad-form-fields"
                                               required="required"
                                               accept="image/jpeg , image/png , image/x-png"
                                               onChange={e => {this.isValidUploadedImage(e , 'new-ad-image-label')}}
                                        />

                                        <label htmlFor="new-ad-image" className="active merchant-ad-image-label valign-wrapper" id="new-ad-image-label">
                                            <i className="large material-icons merchant-upload-image-icon">insert_photo</i>
                                        </label>
                                        <div className="file-path-wrapper merchant-upload-image-file-path-wrapper">
                                            <input className="file-path validate" type="text"
                                                   placeholder="Click on the icon" onKeyPress ={(e) => {e.preventDefault(0);}} />
                                        </div>

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