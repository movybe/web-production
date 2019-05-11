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

var Campaign =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Campaign, _React$Component);

  function Campaign() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Campaign);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Campaign)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "nonLoggedDefaultActions", function () {
      if (!_this.main) {
        _this.main = $('main#app');
        _this.refererUsername = $('#referer-username');
        _this.emailField = $('#email');
        _this.referer = _this.main.attr('data-referer');
        console.log(_this.referer);

        _this.refererUsername.val(_this.referer);

        _this.campaignFormFieldset = $('#campaign-form-fieldset');
        _this.selectBankName = $('#select-bank-name');
        $('input#account-number').characterCounter();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "logout", function () {
      if (_this.props.factoryReset()) {
        window.location.reload();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "loggedInDefaultAction", function () {
      _this.loginModalPopup.modal('close');
    });

    _defineProperty(_assertThisInitialized(_this), "initActions", function () {
      _this.labels = $('label');
      var defaultAction = !_this.props.alreadyExistingAccount ? _this.nonLoggedDefaultActions() : _this.loggedInDefaultAction();
    });

    _defineProperty(_assertThisInitialized(_this), "defaultPage", function () {
      return React.createElement("div", {
        className: "site-header"
      }, React.createElement("nav", null, React.createElement("div", {
        className: "nav-wrapper admin-navbar"
      }, React.createElement("span", {
        className: "bullhorn-icon-container"
      }, React.createElement("i", {
        className: "fa fa-bullhorn bullhorn-icon"
      })), React.createElement("a", {
        href: "#",
        className: "brand-logo admin-brand-logo left watch-demo-video campaign-page-header"
      }, defaults.siteName, " Campaign Programme"))), _this.loginModal(), React.createElement("div", {
        className: "container"
      }, React.createElement("div", {
        className: "row notice-board z-depth-3"
      }, React.createElement("div", {
        className: "col s12 valign-wrapper"
      }, React.createElement("p", {
        className: "notice-header flow-text"
      }, "Welcome to ", defaults.siteName, " Campaign.")), React.createElement("div", {
        className: "col s12 valign-wrapper"
      }, React.createElement("p", {
        className: "notice-message"
      }, React.createElement("h5", null, "Affiliate/Publishers"), "This is the easiest way to get paid from the comfort of your home in Nigeria, by simply referring your friends & family to ", defaults.siteName, ".", React.createElement("h5", null, "Merchant/Advertisers"), "Business owners can also Create a Merchant account to Advertise their Product/Services at a very affordable rate.", React.createElement("br", null), React.createElement("br", null), "Watch our demo videos below to understand better."))), React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "col s12 m6"
      }, React.createElement("h5", {
        className: "status-headers"
      }, "How ", defaults.siteName, " Affiliate works:"), React.createElement("div", {
        className: "card"
      }, React.createElement("div", {
        className: "card-content"
      }, React.createElement("p", null, "Watch as our CEO explains how ", defaults.siteName, " Affiliate works, and how you too can start making money right now with ", defaults.siteName, " Affiliate."), React.createElement("div", {
        className: "video-container demo-video-container"
      }, React.createElement("iframe", {
        width: "560",
        height: "315",
        src: defaults.affiliateIntroductionVideo,
        frameBorder: "0",
        allowFullScreen: true,
        allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      }))))), React.createElement("div", {
        className: "col s12 m6"
      }, React.createElement("h5", {
        className: "status-headers"
      }, "How ", defaults.siteName, " Merchant works:"), React.createElement("div", {
        className: "card"
      }, React.createElement("div", {
        className: "card-content"
      }, React.createElement("p", null, "Watch as our CEO explains how Businesses can advertise their products/services with millions of potential online customers in Nigeria."), React.createElement("div", {
        className: "video-container demo-video-container"
      }, React.createElement("iframe", {
        width: "560",
        height: "315",
        src: defaults.merchantIntroductionVideo,
        frameBorder: "0",
        allowFullScreen: true
      }))))), React.createElement("div", {
        className: "row z-depth-3 merchant-ad-number-message"
      }, React.createElement("div", {
        className: "col s12 valign-wrapper"
      }, React.createElement("p", {
        className: "notice-header flow-text number-of-merchant-ads"
      }, React.createElement("a", {
        title: "Home page",
        href: "/",
        className: "no-underline back-url"
      }, React.createElement("span", {
        className: "back-text"
      }, "Back")), React.createElement("a", {
        title: "Login or Signup",
        href: "#login-modal",
        className: "modal-trigger text-right continue-modal-trigger no-underline"
      }, "Continue", React.createElement("i", {
        className: "material-icons continue-arrow-icon"
      }, "arrow_forward"), " ")))))), React.createElement(Footer, {
        accountType: "Campaign"
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "getSelectedCampaignType", function () {
      return _this.selectCampaignType.val();
    });

    _defineProperty(_assertThisInitialized(_this), "handleCampaignTypeChange", function (e) {
      _this.campaignTypeChanged = true;
      var action = _this.getSelectedCampaignType().toLowerCase().indexOf("merchant") >= 0 ? _this.props.resetState(_objectSpread({}, _this.props, {
        showRefererEmailField: false
      })) : _this.props.resetState(_objectSpread({}, _this.props, {
        showRefererEmailField: true
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "enableStuffs", function () {
      var _this$emailField;

      (_this$emailField = _this.emailField).prop.apply(_this$emailField, _toConsumableArray(defaults.disabledFalse));

      _this.emailField.removeClass('disabled');

      _this.loginModalPopup.modal('close');
    });

    _defineProperty(_assertThisInitialized(_this), "handleCampaignFormSubmit", function (e) {
      var _this$emailField2;

      e.preventDefault();
      var formID = e.target.id;
      _this.campaignForm = $('#' + formID);
      M.updateTextFields();

      _this.campaignForm.validate(); // this.campaignFormFieldset.prop(...defaults.disabledTrue);


      if (!_this.campaignForm.valid()) return M.toast({
        html: defaults.ensureAllFieldsAreFieldError
      });

      (_this$emailField2 = _this.emailField).prop.apply(_this$emailField2, _toConsumableArray(defaults.disabledTrue));

      _this.emailField.addClass('disabled');

      var data,
          email = _this.emailField.val().toLowerCase();

      if (!_this.props.emailVerified) {
        data = {
          email: email,
          action: 'EMAIL_EXISTS'
        };
        data = JSON.stringify(data); //console.log(data);

        $.post(defaults.actions, {
          data: data
        }, function (response) {
          var _this$campaignFormFie;

          //console.log(response);
          _this.emailField.removeClass('invalid');

          response = JSON.parse(response); //return;

          if (!response.error) {
            _this.props.resetState(_objectSpread({}, _this.props, {
              emailVerified: true,
              stateReset: false,
              defaultUsername: response.username
            }));
          } else if (response.user.account_type == 'merchant') {
            _this.loginModalPopup.modal('close');

            _this.props.resetState(_objectSpread({}, _this.props, {
              emailVerified: true,
              stateReset: false,
              email: email,
              user: response.user,
              accountType: response.user.account_type,
              alreadyExistingAccount: true
            }));
          } else {
            data = {
              email: email,
              action: 'FETCH_AFFILIATE_DETAILS'
            };
            data = JSON.stringify(data);
            $.post(defaults.actions, {
              data: data
            }, function (response1) {
              response1 = JSON.parse(response1);

              _this.props.resetState(_objectSpread({}, _this.props, {
                emailVerified: true,
                stateReset: false,
                email: email,
                user: response1.user,
                accountType: response1.user.account_type,
                alreadyExistingAccount: true
              }));
            });
          }

          (_this$campaignFormFie = _this.campaignFormFieldset).prop.apply(_this$campaignFormFie, _toConsumableArray(defaults.disabledFalse));
        });
      } else if (!_this.props.showRefererEmailField) {
        //It's a merchant signup
        data = {
          action: "SIGNUP_MERCHANT",
          email: email,
          accountType: defaults.merchantAccountType
        };
        data = JSON.stringify(data);
        $.post(defaults.actions, {
          data: data
        }, function (response) {
          response = JSON.parse(response);

          _this.enableStuffs();

          var action = response.error ? _this.props.resetState(_objectSpread({}, _this.props, {
            user: response.user,
            email: email,
            accountType: defaults.merchantAccountType,
            alreadyExistingAccount: true
          })) : defaults.showToast(defaults.checkNetworkConnectionError);
        });
      } else {
        //Affiliate signup
        var username = $('#username').val().toLowerCase();
        var refererUsername = $('#referer-username').val().toLowerCase();
        data = {
          email: email,
          referer_username: refererUsername,
          username: username,
          action: 'VALIDATE_AFFILIATE'
        };
        data = JSON.stringify(data);
        $.post(defaults.actions, {
          data: data
        }, function (response) {
          var _this$campaignFormFie2;

          response = JSON.parse(response);
          if (!response.success) return defaults.showToast(response.error); //Disable the form field set

          (_this$campaignFormFie2 = _this.campaignFormFieldset).prop.apply(_this$campaignFormFie2, _toConsumableArray(defaults.disabledTrue)); //Change the username generated


          _this.props.resetState(_objectSpread({}, _this.props, {
            defaultUsername: response.username
          }));

          var amount = response.amount;
          var accountName = $('#account-name').val();
          var accountNumber = $('#account-number').val();
          var bankName = $('#select-bank-name').val();
          defaults.payWithPaystack(email, defaults.convertToPaystack(amount), accountName, function (response) {
            if (response.status !== defaults.successText) return defaults.showToast(defaults.transactionNotSuccessfulMessage);
            var data = {
              email: email,
              referer_username: refererUsername,
              username: username,
              action: 'SIGNUP_AFFILIATE',
              account_name: accountName,
              account_number: accountNumber,
              bank_name: bankName,
              reference_code: response.reference
            };
            data = JSON.stringify(data);
            $.post(defaults.actions, {
              data: data
            }, function (response) {
              response = JSON.parse(response);

              _this.enableStuffs();

              var action = !response.success ? _this.props.resetState(_objectSpread({}, _this.props, {
                emailVerified: true,
                stateReset: false
              })) : _this.loginModalPopup.modal('close') && _this.props.resetState(_objectSpread({}, _this.props, {
                emailVerified: true,
                stateReset: false,
                email: email,
                user: response.user,
                accountType: response.user.account_type,
                alreadyExistingAccount: true
              })); //Start the affiliate tour

              tourJS.start('affiliate-account-tour');
            });
          });
        });
      }

      ;
    });

    _defineProperty(_assertThisInitialized(_this), "loginModal", function () {
      var disabledUserEmailField = _this.props.emailVerified ? "disabled" : null;
      var accountTypeSelection = _this.props.emailVerified && !_this.props.stateReset ? React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("select", {
        id: "select-campaign-type",
        autoComplete: "off",
        required: "required",
        onChange: _this.handleCampaignTypeChange
      }, React.createElement("option", {
        defaultValue: "",
        disabled: true
      }, "Choose your campaign type"), React.createElement("option", {
        defaultValue: "merchant"
      }, "Merchant/Advertiser"), React.createElement("option", {
        defaultValue: "publisher"
      }, "Affiliate/Publisher")), React.createElement("label", {
        className: "active"
      }, "Campaign type"))) : null;
      var refererEmailAddressField = _this.props.showRefererEmailField ? React.createElement("div", null, React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("input", {
        id: "referer-username",
        name: "referer-username",
        type: "text",
        required: "required",
        minLength: defaults.minimumAccountUsernameLength,
        maxLength: defaults.maximumAccountUsernameLength,
        pattern: "[a-zA-Z0-9]{".concat(defaults.minimumAccountUsernameLength, ",").concat(defaults.maximumAccountUsernameLength, "}"),
        className: "validate"
      }), React.createElement("label", {
        htmlFor: "referer-username",
        className: "active"
      }, "Referer username"), React.createElement("span", {
        className: "helper-text referer-username",
        "data-error": "please,check the username again",
        "data-success": ""
      }, "referer username is mandatory"))), React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("h5", null, "Bank Details"))), React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("input", {
        id: "account-name",
        name: "account-name",
        type: "text",
        required: "required",
        pattern: "[a-zA-Z ]{2,60}",
        className: "validate"
      }), React.createElement("label", {
        htmlFor: "account-name",
        className: "active"
      }, "Your account name"), React.createElement("span", {
        className: "helper-text account-name strong",
        "data-error": "Please enter a valid account name",
        "data-success": ""
      }, "Note: Bank details can't be changed later."))), React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("input", {
        id: "account-number",
        "data-length": "10",
        size: "10",
        maxLength: "10",
        minLength: "10",
        pattern: "(\\d{10})$",
        required: "required",
        name: "account-number",
        type: "text",
        className: "validate"
      }), React.createElement("label", {
        htmlFor: "account-number",
        className: "active"
      }, "Your account number"), React.createElement("span", {
        className: "helper-text account-number",
        "data-length": "10",
        "data-error": "Please enter a valid account number",
        "data-success": ""
      }, "valid account number"))), React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("select", {
        id: "select-bank-name",
        required: true
      }, React.createElement("option", {
        defaultValue: "",
        disabled: true
      }, "Select your Bank Name")), React.createElement("label", {
        className: "active"
      }, "Bank Name"))), React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("h5", null, "Profile Detail(s)"))), React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("input", {
        defaultValue: _this.props.defaultUsername,
        id: "username",
        name: "username",
        type: "text",
        minLength: defaults.minimumAccountUsernameLength,
        maxLength: defaults.maximumAccountUsernameLength,
        pattern: "[a-zA-Z0-9]{".concat(defaults.minimumAccountUsernameLength, ",").concat(defaults.maximumAccountUsernameLength, "}"),
        required: "required",
        className: "validate"
      }), React.createElement("label", {
        htmlFor: "username",
        className: "active"
      }, "Your username"), React.createElement("span", {
        className: "helper-text username",
        "data-error": "username must be alphabet not more than 6 characters long",
        "data-success": ""
      })))) : null;
      var headerToShow = _this.props.showRefererEmailField ? React.createElement("span", null, "How Affiliate Works") : React.createElement("span", null, "How Merchant works");
      headerToShow = _this.props.emailVerified ? headerToShow : React.createElement("span", null, "Welcome to ", defaults.siteName, " Campaign");
      var summaryToShow = _this.props.showRefererEmailField ? React.createElement("div", null, React.createElement("p", null, "Now, earning money has become easier with our affiliate account, we pay you ", React.createElement("strong", {
        className: "strong"
      }, "\u20A6", defaults.amountPaidForReferer), " for each user you refer."), React.createElement("p", null, "You also get paid ", React.createElement("strong", {
        className: "strong"
      }, "\u20A6", defaults.amountPaidForUniqueVisitor), " when a unique user visits our website via your link."), React.createElement("p", null, "We pay you when you share our ads on your social media account, and lots more.")) : React.createElement("div", null, React.createElement("p", null, "You can now promote your products/services, to the reach of  millions of potential customers, at the cheapest price."), React.createElement("p", null, "Sign up now to get started:"));
      summaryToShow = _this.props.emailVerified ? summaryToShow : null;
      return React.createElement("div", {
        id: "login-modal",
        className: "modal modal-fixed-footer"
      }, React.createElement("div", {
        className: "modal-content"
      }, React.createElement("h5", null, headerToShow), summaryToShow, React.createElement("div", {
        className: "row"
      }, React.createElement("fieldset", {
        id: "campaign-form-fieldset"
      }, React.createElement("form", {
        validate: "validate",
        className: "col s12",
        autoComplete: "on",
        name: "campaign-form",
        id: "campaign-form",
        action: "#",
        onSubmit: _this.handleCampaignFormSubmit,
        noValidate: "noValidate"
      }, React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("input", {
        id: "email",
        autoComplete: "off",
        name: "email",
        required: "required",
        type: "text",
        className: "validate",
        pattern: "^([a-zA-Z0-9_\\-\\._]+)@([a-zA-Z0-9_\\-\\._]+)\\.([a-zA-Z0-9_\\-\\.]{2,5})$"
      }), React.createElement("label", {
        htmlFor: "email",
        className: "active"
      }, "Your Email"), React.createElement("span", {
        className: "helper-text email",
        "data-error": "please enter a valid email",
        "data-success": ""
      }, "Please enter a valid email address"))), accountTypeSelection, refererEmailAddressField)))), React.createElement("div", {
        className: "modal-footer"
      }, React.createElement("a", {
        href: "#",
        onClick: function onClick() {
          return _this.loginModalPopup.modal('close');
        },
        className: "no-underline grey-text",
        id: "close-login-modal"
      }, "CLOSE"), React.createElement("button", {
        type: "submit",
        form: "campaign-form",
        className: "waves-effect waves-light btn",
        id: "login-proceed",
        value: "Proceed"
      }, "Proceed")));
    });

    return _this;
  }

  _createClass(Campaign, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props !== nextProps;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.campaignTypeChanged = false;
      this.stateRestored = false;
      var storageObj = this.props;

      if (localStorage.getItem(defaults.savedCampaignState)) {
        storageObj = JSON.parse(localStorage.getItem(defaults.savedCampaignState));
        /* checks if a new property (key) is added to the default state as a result of updates */

        {
          //We want to count the length of savedState keys and the default state keys
          var storageObjectKeysCount = 0,
              propsKeysCount = 0;
          Object.keys(storageObj).forEach(function (key) {
            return typeof storageObj[key] !== 'function' ? storageObjectKeysCount += 1 : null;
          });
          Object.keys(this.props).forEach(function (key) {
            return typeof _this2.props[key] !== 'function' ? propsKeysCount += 1 : null;
          });
          /*
               if there is a difference in the length of the savedState object keys
          and the length of the default state stored in the redux store,
          meaning there was a change in the source code this will trigger the automatic update of the savedState
           */

          if (storageObjectKeysCount !== propsKeysCount && this.props.restoreState()) this.stateRestored = true;
        }
      }

      var stateToReset = this.stateRestored ? _objectSpread({}, this.props, {
        stateReset: true,
        emailVerified: false,
        showRefererEmailField: false
      }) : _objectSpread({}, storageObj, {
        stateReset: true,
        emailVerified: false,
        showRefererEmailField: false
      });
      this.props.resetState(stateToReset, function () {
        if (!_this2.props.alreadyExistingAccount) {
          $('.modal').modal();
          _this2.loginModalPopup = $('.modal#login-modal');

          _this2.loginModalPopup.modal({
            dismissible: false
          }); //this.loginModalPopup.modal('open');

        }

        _this2.initActions();
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      try {
        this.initActions();
        var selectBankNameID = "select-bank-name";
        this.selectBankName = $('#' + selectBankNameID) ? $('#' + selectBankNameID) : null;
        var select = this.selectBankName ? document.getElementById(selectBankNameID) : null;
        this.selectCampaignType = $('select#select-campaign-type');
        this.selectCampaignType.formSelect();
        var option;
        var populateSelectBankNameAction = this.selectBankName != null ? defaults.banks.map(function (bank, index) {
          option = document.createElement("option");
          option.text = bank;
          option.value = bank;
          select.add(option);
        }) : null;
        var formSelectAction = this.selectBankName ? this.selectBankName.formSelect() : null;
      } catch (e) {}

      $('select').formSelect();
    }
  }, {
    key: "render",
    value: function render() {
      var template = null;

      if (this.props.user.account_type !== undefined) {
        template = this.props.user.account_type == "merchant" ? React.createElement(Merchant, null) : React.createElement(Affiliate, null);
        template = this.props.user.is_site_admin_login_email ? React.createElement(Admin, {
          logout: this.logout
        }) : template;
      } else {
        template = this.defaultPage();
      }

      return React.createElement("div", {
        id: "campaign"
      }, template, React.createElement("div", {
        id: "paystackEmbedContainer"
      }));
    }
  }]);

  return Campaign;
}(React.Component);