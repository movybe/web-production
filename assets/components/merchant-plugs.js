"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MerchantPlugs =
/*#__PURE__*/
function (_React$Component) {
  _inherits(MerchantPlugs, _React$Component);

  function MerchantPlugs() {
    var _this;

    _classCallCheck(this, MerchantPlugs);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MerchantPlugs).call(this));

    _defineProperty(_assertThisInitialized(_this), "editAdFormActions", {
      UPDATE: "UPDATE",
      RENEW: "RENEW",
      NEW: "NEW"
    });

    _defineProperty(_assertThisInitialized(_this), "serverFormActions", {
      UPDATE: 'UPDATE_AD',
      RENEW: 'RENEW_AD',
      NEW: 'NEW_AD'
    });

    _defineProperty(_assertThisInitialized(_this), "initState", {
      currentlyViewedAdID: null,
      currentlyViewedAd: {},
      editAdFormID: null,
      editAd: {
        title: "Your ad title goes here",
        description: "your ad description goes here",
        link: "http://www.link-to-your-ad.com",
        contact: defaults.whatsappContact.replace(/ /g, ''),
        campaign: "Company name",
        location: "e.g Lagos, Nigeria",
        units: 20
      },
      editAdFormAction: _this.editAdFormActions.UPDATE,
      uploadImage: false,
      adFormTriggerClicked: false
    });

    _defineProperty(_assertThisInitialized(_this), "state", {
      currentlyViewedAdID: null,
      currentlyViewedAd: {},
      editAdFormID: null,
      editAd: _objectSpread({}, _this.initState.editAd),
      editAdFormAction: _this.editAdFormActions.UPDATE,
      uploadImage: false,
      adFormTriggerClicked: false
    });

    _defineProperty(_assertThisInitialized(_this), "units", 0);

    _defineProperty(_assertThisInitialized(_this), "adFormRules", {
      minAdTitleLength: 20,
      maxAdTitleLength: defaults.maxTitleLength,
      minAdDescriptionLength: 10,
      maxAdDescriptionLength: defaults.maxDescriptionLength,
      maxAdCampaignNameLength: 30,
      maxAdLocationLength: 30,
      maxAdImageSize: 2,
      contactRegularExpression: "[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}",
      urlRegularExpression: "^(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]\\.[^\\s]{2,})$",
      maxPPC: 50,
      maxPPV: 100,
      uploadImage: false
    });

    _defineProperty(_assertThisInitialized(_this), "changeAdActiveStatus", function (e) {
      e.persist();
      var action = $(e.target).attr('data-pause') == "true" ? 'PAUSE_AD' : 'PLAY_AD';
      var id = $(e.target).attr('data-ad-id');
      $(e.target).hide();
      var data = {
        action: action,
        id: id,
        email: _this.props.email
      };
      data = JSON.stringify(data);
      $.post(defaults.actions, {
        data: data
      }, function (response) {
        $(e.target).show();

        _this.props.refreshProfile();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "closeEditAdFormModal", function () {
      _this.setState(_objectSpread({}, _this.state, {
        editAd: {},
        editAdClicked: false
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "loadDefaultTextsIntoFields", function () {
      var fieldValues = _objectSpread({}, _this.initState.editAd);

      Object.keys(fieldValues).forEach(function (key) {
        $("*[name=\"".concat(key, "\"]")).val(fieldValues[key]);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "defaultActions", function () {
      _this.adStatModalTrigger = $('.ad-stat-modal-trigger');
      _this.editAdModalTrigger = $('.edit-ad-modal-trigger');
      _this.adModalPopup = $('.modal#ad-modal');
      _this.adEditForm = $('#ad-form');
      _this.adFormFields = $('.ad-form-fields');
      _this.newImageUploadError = $('.new-image-upload-error');
      _this.adTypeSelection = $('#ad-type-selection');

      _this.adTypeSelection.formSelect();

      _this.adUnit = $('#ad-unit');
      _this.progressBar = $('.progress-bar');
      _this.totalAdCharge = $('#total-ad-charge');
      _this.adFormFieldset = $('#ad-form-fieldset');
      $('input#ad-title').characterCounter();
      $('textarea#ad-description').characterCounter();
      _this.adTitlePreview = $('#ad-title-preview');
      _this.adLinkPreview = $('#ad-link-preview');
      _this.adDescriptionPreview = $('#ad-description-preview');
      _this.adLocationPreview = $('#ad-location-preview');
      _this.closeNewAdForm = $('#close-new-ad-form');
      _this.defaultAdLinkPreviewText = "https://www.olx.com.ng/item/mac-book-pro-2017-iid-1051056268";
      _this.defaultAdTitlePreviewText = "mac book pro 2017";
      _this.defaultAdDescriptionPreviewText = "8gb ram 2.3ghz Intel core i5 13inch display";
      _this.defaultAdLocationPreviewText = "Lagos";
      _this.adTitle = $('#ad-title');
      _this.adDescription = $('#ad-description');
      _this.adLink = $('#ad-link');
      _this.adLocation = $('#ad-location');
      _this.adCampaignName = $('#ad-campaign-name');
      _this.adContact = $('#ad-contact');
      _this.mainAdLocation = "";
      _this.adImage = $('#ad-image');
      _this.merchantUploadImageIcon = $('.merchant-upload-image-icon');
      _this.adImagePreviews = $('.ad-image-previews');
      _this.adImageLabel = $('#ad-image-label');
      _this.adStatModalPopup = $('#ad-stat-modal');

      try {
        _this.filePath = $('input.file-path'); //  this.adModalPopup.modal('open');

        var parent = _assertThisInitialized(_this);

        _this.adImage.on('change', function () {
          _this.setState(_objectSpread({}, _this.state, {
            uploadImage: true
          }));
        });

        _this.adEditForm.on('submit', function (e) {
          e.preventDefault();
          e.stopImmediatePropagation();
          var form = this;
          parent.handleAdForm(e, form);
        });

        if (!_this.loaded) {
          _this.adModalPopup.modal({
            dismissible: false
          });

          _this.adStatModalPopup.modal({
            dismissible: false
          });

          _this.loaded = true;
        }
      } catch (e) {
        _this.loaded = false;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "normalActions", function () {
      _this.adStatModalTrigger.on('click', _this.showCurrentAdStat);

      _this.editAdModalTrigger.on('click', _this.modifyAdForm);
    });

    _defineProperty(_assertThisInitialized(_this), "handleAdForm", function (e, form) {
      var _this$adFormFieldset;

      M.updateTextFields();
      var shouldReturn = false; //Check if the form fields are valid

      if (!(_this.adEditForm.validate() && _this.adEditForm.valid())) {
        shouldReturn = true;
      } //Check if it's a new ad and the image is valid
      else if (_this.state.editAdFormAction === _this.editAdFormActions.NEW && !_this.isValidUploadedImage()) {
          shouldReturn = true;
        } // if the user wants to chenge the already existing image, check if it's a valid image
        else if (_this.state.uploadImage && !_this.isValidUploadedImage()) {
            shouldReturn = true;
          }

      if (shouldReturn) return;

      (_this$adFormFieldset = _this.adFormFieldset).prop.apply(_this$adFormFieldset, _toConsumableArray(defaults.disabledTrue));

      var isNewOrRenewedAd = _this.state.editAdFormAction === _this.editAdFormActions.NEW || _this.state.editAdFormAction === _this.editAdFormActions.RENEW;
      var payWithPaystack = isNewOrRenewedAd ? defaults.payWithPaystack : function (email) {
        var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
        var name = arguments.length > 2 ? arguments[2] : undefined;
        var callback = arguments.length > 3 ? arguments[3] : undefined;
        callback({
          status: "success"
        });
      };
      payWithPaystack = _this.props.user.is_site_advert_login_email ? function (email) {
        var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
        var name = arguments.length > 2 ? arguments[2] : undefined;
        var callback = arguments.length > 3 ? arguments[3] : undefined;
        callback({
          status: "success",
          reference: Math.round(Math.random() * 1000000)
        });
      } : payWithPaystack;
      payWithPaystack(_this.props.user.email, _this.getTotalAdCharge().paystackAmount || null, _this.adCampaignName.val(), function (response) {
        var _this$adFormFieldset3, _this$adFormFieldset5;

        if (response.status !== "success") {
          var _this$adFormFieldset2;

          (_this$adFormFieldset2 = _this.adFormFieldset).prop.apply(_this$adFormFieldset2, _toConsumableArray(defaults.disabledFalse));

          defaults.showToast(defaults.transactionNotSuccessfulMessage);
          return;
        }

        (_this$adFormFieldset3 = _this.adFormFieldset).prop.apply(_this$adFormFieldset3, _toConsumableArray(defaults.disabledFalse));

        var formData = new FormData(form);

        if (isNewOrRenewedAd) {
          formData.append("ad_type", _this.adTypeSelection.val());
          formData.append("ad_rate", _this.getTotalAdCharge().rate);
          formData.append("total_amount", _this.getTotalAdCharge().totalAmount);
          formData.append("reference_code", response.reference);
        } //Get the current form action and send it to the server


        var serverFormAction;

        switch (_this.state.editAdFormAction) {
          case _this.editAdFormActions.RENEW:
            serverFormAction = _this.serverFormActions.RENEW;
            break;

          case _this.editAdFormActions.NEW:
            serverFormAction = _this.serverFormActions.NEW;
            break;

          case _this.editAdFormActions.UPDATE:
            serverFormAction = _this.serverFormActions.UPDATE;
            break;
        }

        formData.append("email", _this.props.user.email);
        formData.append("action", serverFormAction);
        formData.append('UPLOAD_IMAGE', _this.state.uploadImage);
        formData.append("ad_id", _this.state.editAdFormID || "");
        formData.set("location", _this.updateAdPreview());
        formData.append("ad_location", _this.adLocation.val());

        var percentComplete = 0,
            parent = _assertThisInitialized(_this);

        $.ajax({
          xhr: function xhr() {
            parent.progressBar.loading(0);
            parent.progressBar.show();
            var xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener("progress", function (e) {
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
          success: function success(response) {
            var _this$adFormFieldset4;

            response = JSON.parse(response);

            (_this$adFormFieldset4 = _this.adFormFieldset).prop.apply(_this$adFormFieldset4, _toConsumableArray(defaults.disabledFalse));

            defaults.showToast(response.error);

            _this.refreshProfile();

            _this.adModalPopup.modal('close');

            _this.setState(_objectSpread({}, _this.state, {
              adFormTriggerClicked: false,
              editAdClicked: false
            }));
          },
          cache: false,
          contentType: false,
          processData: false
        });

        (_this$adFormFieldset5 = _this.adFormFieldset).prop.apply(_this$adFormFieldset5, _toConsumableArray(defaults.disabledTrue));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "updateAdPreview", function () {
      _this.adTitlePreview.text(_this.adTitle.val().truncate(defaults.maxTitleLength) || _this.defaultAdTitlePreviewText);

      _this.adLinkPreview.text(_this.adLink.val().truncate(defaults.maxLinkLength) || _this.defaultAdLinkPreviewText.truncate(defaults.maxLinkLength));

      _this.adLinkPreview.attr('href', _this.adLink.val() || _this.defaultAdLinkPreviewText);

      _this.adTitlePreview.attr('href', _this.adLink.val() || _this.defaultAdLinkPreviewText);

      _this.adDescriptionPreview.text(_this.adDescription.val().truncate(defaults.maxDescriptionLength) || _this.defaultAdDescriptionPreviewText);

      _this.mainAdLocation = (_this.adLocation.val().truncate(_this.adFormRules.maxAdLocationLength) || _this.defaultAdLocationPreviewText) + ". ".concat(_this.adCampaignName.val().truncate(_this.adFormRules.maxAdCampaignNameLength), " ").concat(_this.adContact.val());

      _this.adLocationPreview.text(_this.mainAdLocation);

      return _this.mainAdLocation;
      /*
      this.adTitlePreview.text(isValidState ? this.state.editAd.title.truncate(defaults.maxTitleLength) : this.adTitle.val().truncate(defaults.maxTitleLength) || this.defaultAdTitlePreviewText);
      this.adLinkPreview.text(isValidState ? this.state.editAd.link.truncate(defaults.maxLinkLength) : this.adLink.val().truncate(defaults.maxLinkLength) || this.defaultAdLinkPreviewText.truncate(defaults.maxLinkLength));
      this.adLinkPreview.attr('href' , isValidState ? this.state.editAd.link : this.adLink.val() || this.defaultAdLinkPreviewText);
      this.adTitlePreview.attr('href' , isValidState ? this.state.editAd.link : this.adLink.val() || this.defaultAdLinkPreviewText);
      this.adDescriptionPreview.text(isValidState ? this.state.editAd.description.truncate(defaults.maxDescriptionLength): this.adDescription.val().truncate(defaults.maxDescriptionLength) || this.defaultAdDescriptionPreviewText);
      this.mainAdLocation = (isValidState ? this.state.editAd.ad_location.truncate(this.adFormRules.maxAdLocationLength) : this.adLocation.val().truncate(this.adFormRules.maxAdLocationLength) || this.defaultAdLocationPreviewText) + `. ${this.adCampaignName.val().truncate(this.adFormRules.maxAdCampaignNameLength)} ${this.adContact.val()}`;
      this.adLocationPreview.text(this.mainAdLocation);
      */
    });

    _defineProperty(_assertThisInitialized(_this), "updateEditAdFormFromState", function () {
      _this.adTitle.val(_this.state.editAd.title);

      _this.adDescription.val(_this.state.editAd.description);

      _this.adLink.val(_this.state.editAd.link);

      _this.adContact.val(_this.state.editAd.contact);

      _this.adCampaignName.val(_this.state.editAd.campaign_name);

      _this.adLocation.val(_this.state.editAd.ad_location);
    });

    _defineProperty(_assertThisInitialized(_this), "isValidUploadedImage", function () {
      var returnValue = true;

      if (!window.FileReader && !window.Blob) {
        // All the File APIs are supported.
        returnValue = false;
      }

      var labelID = _this.adImageLabel.attr('id');

      var elemID = _this.adImage.attr('id'),
          control = document.getElementById(elemID),
          file,
          fileType;

      try {
        file = control.files[0];
        fileType = file.type;
      } catch (e) {
        _this.newImageUploadError.text("only png and jpeg images are allowed");

        returnValue = false;
        return returnValue;
      }

      var fileSize = file.size;
      var fileSizeInMb = Math.round(fileSize / 1024000);
      var imageFileFormats = ["image/png", "image/jpeg"];
      $('#' + labelID).children('i').show();
      $('#' + elemID).css('background-image', 'url()');

      _this.adImagePreviews.css('background-image', 'url()');

      _this.newImageUploadError.text(null);

      if ($.inArray(fileType, imageFileFormats) === -1) {
        _this.newImageUploadError.text("only png and jpeg images are allowed");

        returnValue = false;
      } else if (fileSizeInMb > _this.adFormRules.maxAdImageSize) {
        _this.newImageUploadError.text("image size must not exceed ".concat(_this.adFormRules.maxAdImageSize, "mb"));

        returnValue = false;
      } else if (labelID) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $('#' + labelID).css('background-image', "url(".concat(e.target.result, ")"));

          _this.adImagePreviews.css('background-image', "url(".concat(e.target.result, ")"));

          $('#' + labelID).children('i').hide();
        };

        reader.readAsDataURL(file);
      }

      var action = returnValue ? _this.merchantUploadImageIcon.hide() : _this.merchantUploadImageIcon.show();
      return returnValue;
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectedAdType", function () {
      var selectedAdType = _this.adTypeSelection.val();

      switch (selectedAdType) {
        case "ppv":
          selectedAdType = "cpv";

          _this.adUnit.attr('max', _this.adFormRules.maxPPV);

          break;

        case "ppc":
          selectedAdType = "cpc";

          _this.adUnit.attr('max', _this.adFormRules.maxPPC);

          break;

        case "ppa":
          selectedAdType = "cpa";
          break;
      }

      _this.adEditForm.validate();

      return selectedAdType;
    });

    _defineProperty(_assertThisInitialized(_this), "getAdTypeTexts", function (ad_type) {
      switch (ad_type) {
        case 'ppc':
          return {
            plural: 'clicks',
            singular: 'click',
            payper: 'pay per click'
          };

        case 'ppv':
          return {
            plural: 'views',
            singular: 'view',
            payper: 'pay per view'
          };

        case 'ppa':
          return {
            plural: 'affiliates',
            singular: 'affiliate',
            payper: 'pay per affiliate'
          };
      }

      return {
        plular: 'affiliates',
        singular: 'affiliate'
      };
    });

    _defineProperty(_assertThisInitialized(_this), "adStatModal", function () {
      var getAdTypeTexts = function getAdTypeTexts(ad_type) {
        return _this.getAdTypeTexts(ad_type);
      };

      var isValidAd = _this.state.currentlyViewedAd !== null;
      var adType = isValidAd ? _this.state.currentlyViewedAd.ad_type : null;
      var toggleLastViewed = _this.state.currentlyViewedAd.last_viewed && _this.state.currentlyViewedAd.number_of_views >= 1 ? React.createElement("p", {
        className: "ad-stats-property-value"
      }, React.createElement("span", {
        className: "left-aligned property"
      }, "Last viewed"), React.createElement("span", {
        className: "right-align value"
      }, timeago.format(_this.state.currentlyViewedAd.last_viewed))) : null;
      var toggleLastClicked = _this.state.currentlyViewedAd.last_clicked && _this.state.currentlyViewedAd.number_of_clicks >= 1 ? React.createElement("p", {
        className: "ad-stats-property-value"
      }, React.createElement("span", {
        className: "left-aligned property"
      }, "Last clicked"), React.createElement("span", {
        className: "right-align value"
      }, timeago.format(_this.state.currentlyViewedAd.last_clicked))) : null;
      var modalContent = !isValidAd ? null : React.createElement("div", null, React.createElement("h5", null, _this.state.currentlyViewedAd.title), React.createElement("p", {
        className: "ad-stats-property-value"
      }, React.createElement("span", {
        className: "left-aligned property"
      }, "Posted"), React.createElement("span", {
        className: "right-align value"
      }, timeago.format(_this.state.currentlyViewedAd.posted_on))), React.createElement("p", {
        className: "ad-stats-property-value"
      }, React.createElement("span", {
        className: "left-aligned property"
      }, "Last updated"), React.createElement("span", {
        className: "right-align value"
      }, timeago.format(_this.state.currentlyViewedAd.updated_on))), React.createElement("p", {
        className: "ad-stats-property-value"
      }, React.createElement("span", {
        className: "left-align property"
      }, "Balance"), React.createElement("span", {
        className: "right-align value"
      }, "\u20A6", _this.state.currentlyViewedAd.balance)), React.createElement("p", {
        className: "ad-stats-property-value"
      }, React.createElement("span", {
        className: "left-align property"
      }, "Number of Views"), React.createElement("span", {
        className: "right-align value"
      }, _this.state.currentlyViewedAd.number_of_views)), toggleLastViewed, React.createElement("p", {
        className: "ad-stats-property-value"
      }, React.createElement("span", {
        className: "left-align property"
      }, "Number of Clicks"), React.createElement("span", {
        className: "right-align value"
      }, _this.state.currentlyViewedAd.number_of_clicks)), toggleLastClicked, React.createElement("p", {
        className: "ad-stats-property-value"
      }, React.createElement("span", {
        className: "left-align property"
      }, "Cost"), React.createElement("span", {
        className: "right-align value"
      }, "\u20A6", _this.state.currentlyViewedAd.amount_paid)), React.createElement("p", {
        className: "ad-stats-property-value"
      }, React.createElement("span", {
        className: "left-align property"
      }, "Ad ID"), React.createElement("span", {
        className: "right-align value"
      }, _this.state.currentlyViewedAd.ad_id)), React.createElement("p", {
        className: "ad-stats-property-value"
      }, React.createElement("span", {
        className: "left-align property"
      }, "Active"), React.createElement("span", {
        className: "right-align value"
      }, Number(_this.state.currentlyViewedAd.active) ? "YES" : "NO")), React.createElement("p", {
        className: "ad-stats-property-value"
      }, React.createElement("span", {
        className: "left-align property"
      }, "Approved"), React.createElement("span", {
        className: "right-align value"
      }, Number(_this.state.currentlyViewedAd.approved) ? "YES" : "NO")), React.createElement("p", {
        className: "ad-stats-property-value"
      }, React.createElement("span", {
        className: "left-align property"
      }, "Ad type"), React.createElement("span", {
        className: "right-align value"
      }, getAdTypeTexts(adType).payper)), React.createElement("p", {
        className: "ad-stats-property-value"
      }, React.createElement("span", {
        className: "left-align property"
      }, "Ad rate"), React.createElement("span", {
        className: "right-align value"
      }, "\u20A6", _this.state.currentlyViewedAd.ad_rate + ' per ' + getAdTypeTexts(adType).singular)), React.createElement("p", {
        className: "ad-stats-property-value"
      }, React.createElement("span", {
        className: "left-align property"
      }, "Total units paid"), React.createElement("span", {
        className: "right-align value"
      }, _this.state.currentlyViewedAd.total_units_paid_for + ' ' + getAdTypeTexts(adType).plural)), React.createElement("p", {
        className: "ad-stats-property-value"
      }, React.createElement("span", {
        className: "left-align property"
      }, "Remaining units"), React.createElement("span", {
        className: "right-align value"
      }, _this.state.currentlyViewedAd.remaining_units + ' ' + getAdTypeTexts(adType).plural)), React.createElement("p", {
        className: "ad-stats-property-value"
      }, React.createElement("span", {
        className: "left-align property"
      }, "Payment Code"), React.createElement("span", {
        className: "right-align value"
      }, _this.state.currentlyViewedAd.reference_code)));
      return React.createElement("div", {
        id: "ad-stat-modal",
        className: "modal modal-fixed-footer"
      }, React.createElement("div", {
        className: "modal-content"
      }, modalContent), React.createElement("div", {
        className: "modal-footer"
      }, React.createElement("a", {
        href: "#",
        onClick: function onClick(e) {
          e.preventDefault();

          _this.adStatModalPopup.modal('close');
        },
        className: "no-underline grey-text close-modal-right",
        id: "close-new-ad-form"
      }, "CLOSE")));
    });

    _defineProperty(_assertThisInitialized(_this), "getTotalAdCharge", function () {
      var selectedAdType = _this.getSelectedAdType();

      var rate = _this.props.adRates[selectedAdType];
      var totalAmount = Number((rate * Number(_this.adUnit.val())).toFixed(2));
      var paystackAmount = defaults.convertToPaystack(totalAmount);
      totalAmount = Number((paystackAmount / 100).toFixed(2));

      _this.totalAdCharge.text(totalAmount.toLocaleString());

      return {
        totalAmount: totalAmount,
        paystackAmount: paystackAmount,
        rate: rate
      };
    });

    _defineProperty(_assertThisInitialized(_this), "adModal", function () {
      var proceedButton = Number(_this.props.user.subscribed) ? React.createElement("label", {
        "for": "submit-ad-form-button",
        tabIndex: "0",
        className: "waves-effect waves-light btn",
        id: "ad-form-proceed"
      }, "Proceed") : null;
      var closeModalButtonPositionLeftOrRight = proceedButton === null ? "right" : "left";
      return React.createElement("div", {
        id: "ad-modal",
        className: "modal modal-fixed-footer"
      }, React.createElement("div", {
        className: "modal-content"
      }, _this.adModalContent()), React.createElement("div", {
        className: "modal-footer"
      }, proceedButton, React.createElement("a", {
        href: "#",
        onClick: function onClick(e) {
          e.preventDefault();

          _this.adModalPopup.modal('close');
        },
        className: "no-underline ".concat(closeModalButtonPositionLeftOrRight, " grey-text"),
        id: "close-new-ad-form"
      }, "CLOSE")));
    });

    _defineProperty(_assertThisInitialized(_this), "adForm", function () {
      var adTypeAndAdUnitsStyle = _this.state.editAdFormAction === _this.editAdFormActions.NEW || _this.state.editAdFormAction === _this.editAdFormActions.RENEW ? {} : {
        display: 'none'
      };
      return React.createElement("div", {
        className: "row"
      }, React.createElement("h5", null, "Ad details"), React.createElement("fieldset", {
        id: "ad-form-fieldset"
      }, React.createElement("form", {
        className: "col s12",
        autoComplete: "on",
        name: "ad-form",
        id: "ad-form",
        action: "#",
        encType: "mutipart/form-data",
        noValidate: "noValidate"
      }, React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("i", {
        className: "material-icons small prefix"
      }, "short_text"), React.createElement("input", {
        "data-name": "title",
        placeholder: "Please write a clear title for your ad",
        id: "ad-title",
        minLength: _this.adFormRules.minAdTitleLength,
        name: "title",
        type: "text",
        className: "validate ad-form-fields char-counter",
        defaultValue: _this.state.editAd.title,
        maxLength: _this.adFormRules.maxAdTitleLength,
        required: "required",
        onChange: _this.updateAdPreview
      }), React.createElement("span", {
        className: "helper-text",
        "data-length": _this.adFormRules.maxAdTitleLength,
        "data-error": "",
        "data-success": ""
      }), React.createElement("label", {
        htmlFor: "ad-title",
        className: "active"
      }, "Title"))), React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("i", {
        className: "material-icons small prefix"
      }, "subject"), React.createElement("textarea", {
        placeholder: "Enter a detailed description",
        id: "ad-description",
        minLength: _this.adFormRules.minAdDescriptionLength,
        name: "description",
        rows: "2",
        className: "validate ad-form-fields materialize-textarea char-counter",
        maxLength: _this.adFormRules.maxAdDescriptionLength,
        required: "required",
        onChange: _this.updateAdPreview,
        "data-name": "description",
        defaultValue: _this.state.editAd.description
      }), React.createElement("span", {
        className: "helper-text",
        "data-length": _this.adFormRules.maxAdDescriptionLength,
        "data-error": "",
        "data-success": ""
      }), React.createElement("label", {
        htmlFor: "ad-description",
        className: "active"
      }, "Description"))), React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("i", {
        className: "material-icons small prefix"
      }, "link"), React.createElement("input", {
        placeholder: "e.g http://www.your-website.com/link",
        id: "ad-link",
        name: "link",
        type: "text",
        "data-name": "link",
        onChange: _this.updateAdPreview,
        pattern: _this.adFormRules.urlRegularExpression,
        defaultValue: _this.state.editAd.link,
        className: "validate ad-form-fields",
        required: "required"
      }), React.createElement("label", {
        htmlFor: "ad-link",
        className: "active"
      }, "Landing page"), React.createElement("span", {
        className: "helper-text",
        "data-error": "Please enter a valid url",
        "data-success": ""
      }, " "))), React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("i", {
        className: "material-icons small prefix"
      }, "phone"), React.createElement("input", {
        placeholder: "e.g +234 70 844 195 30",
        id: "ad-contact",
        name: "contact",
        type: "text",
        "data-name": "contact",
        onChange: _this.updateAdPreview,
        defaultValue: _this.state.editAd.contact,
        pattern: _this.adFormRules.contactRegularExpression,
        className: "validate ad-form-fields"
      }), React.createElement("label", {
        htmlFor: "ad-contact",
        className: "active"
      }, "Contact (if any)"), React.createElement("span", {
        className: "helper-text",
        "data-error": "Please enter a valid phone number",
        "data-success": ""
      }, " "))), React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("i", {
        className: "material-icons prefix small"
      }, "business"), React.createElement("input", {
        placeholder: "Enter your business name",
        id: "ad-campaign-name",
        name: "campaign",
        type: "text",
        onChange: _this.updateAdPreview,
        className: "validate ad-form-fields",
        minLength: "1",
        maxLength: _this.adFormRules.maxAdCampaignNameLength,
        required: "required",
        "data-name": "campaign",
        defaultValue: _this.state.editAd.campaign
      }), React.createElement("label", {
        htmlFor: "ad-campaign-name",
        className: "active"
      }, "Campaign/Business Name"))), React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("i", {
        className: "material-icons prefix small"
      }, "location_on"), React.createElement("input", {
        placeholder: "e.g Lagos, Nigeria (if any)",
        id: "ad-location",
        name: "location",
        type: "text",
        onChange: _this.updateAdPreview,
        className: "validate ad-form-fields",
        minLength: "1",
        "data-name": "location",
        maxLength: _this.adFormRules.maxAdLocationLength,
        required: "required",
        defaultValue: _this.state.editAd.location
      }), React.createElement("label", {
        htmlFor: "ad-contact",
        className: "active"
      }, "Location"))), React.createElement("div", {
        className: "row",
        style: adTypeAndAdUnitsStyle
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("i", {
        className: "material-icons prefix small"
      }, "public"), React.createElement("select", {
        required: "required",
        id: "ad-type-selection",
        onChange: _this.getTotalAdCharge
      }, React.createElement("option", {
        value: "",
        disabled: "disabled"
      }, "Choose your Ad option"), React.createElement("option", {
        value: "ppv"
      }, "Pay per view @ \u20A6", _this.props.adRates.cpv, " "), React.createElement("option", {
        value: "ppc"
      }, "Pay per click @ \u20A6", _this.props.adRates.cpc), React.createElement("option", {
        value: "ppa",
        disabled: "disabled"
      }, "Pay per affiliate @ \u20A6", _this.props.adRates.cpa)), React.createElement("span", {
        className: "blue-grey-text"
      }, "our PPA option is unavailable at the moment"), React.createElement("label", {
        className: "active"
      }, "Ad type"))), React.createElement("div", {
        className: "row",
        style: adTypeAndAdUnitsStyle
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("i", {
        className: "material-icons prefix small"
      }, "shopping_cart"), React.createElement("input", {
        placeholder: "10+",
        id: "ad-unit",
        name: "units",
        type: "number",
        onChange: _this.getTotalAdCharge,
        className: "validate ad-form-fields",
        min: "10",
        required: "required",
        "data-name": "units",
        defaultValue: _this.state.editAd.units
      }), React.createElement("label", {
        htmlFor: "ad-unit",
        className: "active"
      }, "No.of Units"))), React.createElement("div", {
        className: "row",
        style: adTypeAndAdUnitsStyle
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("p", null, "You will be charged : ", React.createElement("strong", {
        className: "strong"
      }, "\u20A6", React.createElement("span", {
        id: "total-ad-charge"
      }, "0")), " \xA0(payment charges included)"))), React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("input", {
        placeholder: "Valid location (if any)",
        type: "hidden",
        id: "hidden-field",
        required: "required",
        value: "hey there"
      }), React.createElement("label", {
        htmlFor: "ad-image",
        className: "active"
      }, "Banner image (1000 x 500)"))), React.createElement("div", {
        className: "row"
      }, React.createElement("span", {
        className: "image-upload-error red-text new-image-upload-error error-text"
      }), React.createElement("div", {
        className: "input-field file-field col s12"
      }, React.createElement("input", {
        placeholder: "Link to your image",
        id: "ad-image",
        name: "banner",
        type: "file",
        className: "validate merchant-ad-image ad-form-fields",
        required: "required",
        accept: "image/jpeg , image/png , image/x-png",
        onChange: _this.isValidUploadedImage
      }), React.createElement("label", {
        htmlFor: "ad-image",
        className: "active merchant-ad-image-label valign-wrapper",
        id: "ad-image-label"
      }, React.createElement("i", {
        className: "large material-icons merchant-upload-image-icon"
      }, "insert_photo")), React.createElement("div", {
        className: "file-path-wrapper merchant-upload-image-file-path-wrapper"
      }, React.createElement("input", {
        className: "file-path validate",
        type: "text",
        placeholder: "Click on the icon",
        onKeyPress: function onKeyPress(e) {
          e.preventDefault(0);
        }
      })))), React.createElement("div", {
        className: "row ad-preview"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("input", {
        placeholder: "Valid location (if any)",
        type: "hidden",
        id: "hidden-field"
      }), React.createElement("label", {
        htmlFor: "ad-image",
        className: "active strong"
      }, "Preview")), React.createElement("div", {
        className: "olx-search-result"
      }, React.createElement("h6", {
        className: "green-text search-result-price"
      }, React.createElement("span", null, "AD")), React.createElement("h3", {
        className: "search-result-title-header"
      }, React.createElement("a", {
        id: "ad-title-preview",
        target: "_blank",
        className: "search-result-title-link",
        href: "https://www.olx.com.ng/item/mac-book-pro-2017-iid-1051056268"
      }, "mac book pro 2017")), React.createElement("a", {
        className: "search-result-link-address",
        target: "_blank",
        href: "#",
        id: "ad-link-preview"
      }, "https://www.olx.com.ng/item/mac-book-pro-201..."), React.createElement("span", {
        className: "search-result-link-description",
        id: "ad-description-preview"
      }, "8gb ram 2.3ghzIntel core i5 13inch display"), React.createElement("span", {
        className: "modal-link",
        "data-caption": "mac book pro 2017"
      }), React.createElement("i", {
        className: "small material-icons search-image-icons blue-text modified-ad-icons ad-image-icon"
      }, "image"), React.createElement("a", {
        href: "#",
        className: "show-ad-image image-download-link search-result-images blue-text"
      }, "View"), React.createElement("span", {
        className: "view-save-separator"
      }, "\u2022"), React.createElement("a", {
        download: "Your ad title goes here",
        target: "_blank",
        href: "/banner/Kk2zd6K.png",
        className: "image-download-link search-result-images blue-text"
      }, " Save"), React.createElement("span", {
        className: "search-result-locations blue-grey-text"
      }, React.createElement("i", {
        className: "tiny material-icons search-location-icons"
      }, "location_on"), React.createElement("span", {
        id: "ad-location-preview"
      }, "Lagos")), React.createElement("span", {
        className: "modal-link"
      }, React.createElement("div", {
        className: "image-container ad-image-previews-container"
      }, React.createElement("div", {
        className: "blurred-bg ad-image-previews"
      }), React.createElement("div", {
        className: "overlay ad-image-previews"
      }))))), React.createElement("input", {
        type: "submit",
        id: "submit-ad-form-button",
        className: "hidden  hide",
        value: "Submit"
      }))));
    });

    _defineProperty(_assertThisInitialized(_this), "adModalContent", function () {
      var modalContent = Number(_this.props.user.subscribed) ? _this.adForm() : React.createElement("div", {
        className: "modal-activate-account-content"
      }, React.createElement("div", {
        className: "modal-account-activation-text"
      }, " Your account has not been activated yet."), React.createElement("div", {
        className: "modal-activate-button-container center-block"
      }, React.createElement("button", {
        className: "btn btn-small activate-account-modal-button",
        onClick: function onClick() {
          return _this.props.activateMerchantAccount(_this.props.refreshProfile);
        }
      }, "Activate now")));
      return modalContent;
    });

    _defineProperty(_assertThisInitialized(_this), "modifyAdForm", function (e) {
      var action = $(e.target).attr('data-edit-ad-form-action');
      var adID = null,
          clickedAd = {};

      switch (action) {
        case _this.editAdFormActions.UPDATE:
        case _this.editAdFormActions.RENEW:
          adID = $(e.target).attr('data-ad-id');

          _this.props.ads.forEach(function (ad) {
            if (ad.ad_id === adID) {
              clickedAd = _objectSpread({}, ad);
              return 0;
            }
          }); //To prevent caching of images


          var randomNumber = Math.floor(Math.random() * 1000);

          _this.adImageLabel.css('background-image', "url(".concat(defaults.bannerImageLocation + clickedAd.banner, "?id=").concat(randomNumber, ")"));

          _this.adImagePreviews.css('background-image', "url(".concat(defaults.bannerImageLocation + clickedAd.banner, "?id=").concat(randomNumber, ")"));

          _this.filePath.val(clickedAd.banner);

          _this.merchantUploadImageIcon.hide();

          _this.setState(_objectSpread({}, _this.state, {
            editAdFormAction: action,
            editAdFormID: adID,
            editAd: clickedAd,
            adFormTriggerClicked: true
          }), _this.updateEditAdFormFromState);

          break;
      }

      if (!adID) {
        _this.adImageLabel.css('background-image', "url()");

        _this.adImagePreviews.css('background-image', "url()");

        _this.filePath.val(null);

        _this.merchantUploadImageIcon.show();

        _this.setState(_objectSpread({}, _this.state, {
          editAdFormAction: action,
          editAd: _objectSpread({}, _this.initState.editAd),
          editAdFormID: adID,
          uploadImage: false,
          adFormTriggerClicked: true
        }), _this.loadDefaultTextsIntoFields);

        return;
      }

      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "showCurrentAdStat", function (e) {
      var currentlyViewedAdID = $(e.target).attr('data-ad-id');
      var currentlyViewedAd = "a";

      _this.props.ads.forEach(function (ad) {
        if (ad.ad_id === currentlyViewedAdID) {
          currentlyViewedAd = _objectSpread({}, ad);
          return 0;
        }
      });

      _this.setState(_objectSpread({}, _this.state, {
        currentlyViewedAd: currentlyViewedAd,
        currentlyViewedAdID: currentlyViewedAdID
      }));
    });

    return _this;
  }

  _createClass(MerchantPlugs, [{
    key: "refreshProfile",
    value: function refreshProfile() {
      var _this2 = this;

      var data = {
        email: this.props.email,
        action: 'FETCH_MERCHANT_DETAILS'
      };
      data = JSON.stringify(data);
      $.post(defaults.actions, {
        data: data
      }, function (response1) {
        response1 = JSON.parse(response1);

        _this2.props.resetState(_objectSpread({}, _this2.props, {
          user: response1.user,
          ads: response1.ads
        }));
      });
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props !== nextProps;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.defaultActions();
      this.normalActions();
      this.loaded = false;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.defaultActions();
      this.normalActions();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var adsNumberMessage,
          usedAdsMessage,
          adsPlural,
          adPublishedOnText,
          currentAd,
          adStatsModalLink,
          isEmptyAd,
          changeAdStatusSpan,
          pauseAdSpan,
          playAdSpan,
          editAdFormAction,
          suspended = null,
          expired = null,
          numberOfAdSpace,
          suspendedAdMessage;
      var numberOfMerchantActiveAds = 0;
      this.props.ads.forEach(function (obj, index) {
        return Number(obj.active) ? numberOfMerchantActiveAds += 1 : null;
      });
      adsPlural = numberOfMerchantActiveAds === 1 ? "ad" : "ads";
      numberOfAdSpace = this.props.user.is_site_advert_login_email ? defaults.numberOfAdSpaceForOmoba : defaults.numberOfAdSpaceForMerchant;
      var newAdsModalTrigger = numberOfAdSpace.map(function (index) {
        currentAd = _this3.props.ads[index] || false;
        adStatsModalLink = currentAd !== false && currentAd.updated_on ? React.createElement("a", {
          title: "View stats",
          id: "ad-stat-modal-trigger",
          "data-ad-id": currentAd.ad_id,
          href: "#ad-stat-modal",
          className: "right stats ad-stat-modal-link ad-stat-modal-trigger material-icons modal-trigger"
        }, "insert_chart") : null;
        isEmptyAd = !Boolean(currentAd);
        adsNumberMessage = currentAd ? currentAd.title.truncate(defaults.adListTitleLength) : "Edit this ad space";
        adPublishedOnText = currentAd ? React.createElement("span", null, "Published  ", timeago.format(currentAd.posted_on)) : null;
        playAdSpan = isEmptyAd ? null : React.createElement("span", {
          className: "ad-change-active-status"
        }, React.createElement("span", {
          className: "activate-pause-ad-text red-text"
        }, "PAUSED "), " ", React.createElement("i", {
          className: "ad-pause-play-icon material-icons green-text cursor-pointer",
          "data-ad-id": currentAd.ad_id,
          "data-pause": false,
          onClick: _this3.changeAdActiveStatus
        }, "play_arrow "));
        pauseAdSpan = isEmptyAd ? null : React.createElement("span", {
          className: "ad-change-active-status"
        }, React.createElement("span", {
          className: "activate-pause-ad-text green-text"
        }, "ACTIVE "), React.createElement("i", {
          className: "ad-pause-play-icon material-icons red-text cursor-pointer",
          "data-ad-id": currentAd.ad_id,
          "data-pause": true,
          onClick: _this3.changeAdActiveStatus
        }, "pause"));
        suspendedAdMessage = null;
        expired = null;

        if (!isEmptyAd) {
          editAdFormAction = Number(currentAd.active) ? _this3.editAdFormActions.UPDATE : _this3.editAdFormActions.RENEW;
          suspendedAdMessage = !Number(currentAd.approved) ? React.createElement("p", null, React.createElement("span", {
            className: "suspended-text red-text"
          }, "suspended :"), React.createElement("span", {
            className: "suspended-reason black-text"
          }, currentAd.admin_message), React.createElement("span", null)) : suspendedAdMessage;
          expired = !Number(currentAd.active) ? React.createElement("span", {
            className: "red-text expired suspended"
          }, "expired") : expired;

          if (Number(currentAd.paused)
          /* i.e the ad is paused */
          ) {
              changeAdStatusSpan = playAdSpan;
            } else {
            changeAdStatusSpan = pauseAdSpan;
          }
        } else {
          changeAdStatusSpan = null;
          editAdFormAction = _this3.editAdFormActions.NEW;
        }

        return React.createElement("div", {
          key: Math.random(),
          className: "row z-depth-3 merchant-ad-number-message"
        }, React.createElement("div", {
          className: "col s12 valign-wrapper"
        }, React.createElement("p", {
          className: "notice-header flow-text number-of-merchant-ads"
        }, adsNumberMessage, React.createElement("a", {
          title: "modify this ad",
          href: "#ad-modal",
          id: "new-ad-dropdown",
          "data-ad-id": currentAd.ad_id,
          className: "material-icons add-ad-icon right modal-trigger edit-ad-modal-trigger no-underline",
          "data-edit-ad-form-action": editAdFormAction
        }, "mode_edit"), adStatsModalLink, React.createElement("span", {
          className: "ad-published-on-text"
        }, adPublishedOnText, changeAdStatusSpan), expired, suspendedAdMessage)));
      });
      return React.createElement("div", {
        id: "new-ad-form-container"
      }, this.adModal(), this.adStatModal(), React.createElement("div", {
        className: "col s12 valign-wrapper"
      }, React.createElement("h6", {
        className: "blue-grey-text"
      }, "You have ", React.createElement("strong", {
        className: "strong"
      }, numberOfMerchantActiveAds), " active ", adsPlural, " ")), newAdsModalTrigger);
    }
  }]);

  return MerchantPlugs;
}(React.Component);

var _ReactRedux = ReactRedux,
    connect = _ReactRedux.connect;

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return _objectSpread({}, state, ownProps);
};

MerchantPlugs = connect(mapStateToProps)(MerchantPlugs);