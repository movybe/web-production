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

var Affiliate =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Affiliate, _React$Component);

  function Affiliate() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Affiliate);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Affiliate)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "adRates", {});

    _defineProperty(_assertThisInitialized(_this), "defaultActions", function () {
      var fundStatusTabs = $('.tabs.fund-status-tabs');
      var accounInfoTabs = $('.tabs.account-info-tabs');
      $('.tabs').tabs(); //  $('.tabs').tabs('updateTabIndicator');

      fundStatusTabs.tabs('select', 'account-balance-tab');
      accounInfoTabs.tabs('select', 'email-tab');
    });

    _defineProperty(_assertThisInitialized(_this), "refreshProfile", function () {
      var data = {
        email: _this.props.email,
        action: 'FETCH_AFFILIATE_DETAILS'
      };
      data = JSON.stringify(data);
      $.post(defaults.actions, {
        data: data
      }, function (response1) {
        response1 = JSON.parse(response1);

        _this.props.resetState(_objectSpread({}, _this.props, {
          user: response1.user
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillMount", function () {
      document.title = defaults.siteName + " \u2022  ".concat(_this.props.user.username.capitalize());
    });

    _defineProperty(_assertThisInitialized(_this), "handleAccountActivation", function (e) {
      var _this$accountActivati;

      e.preventDefault();

      _this.accountActivationResponseMessage.text(null);

      if (!_this.accountActivationForm.valid()) return 0;

      var refererUsername = _this.refererUsername.val().toLowerCase();

      var refererUsernames = _this.props.user.referer_usernames.split(',');

      if (refererUsernames.indexOf(refererUsername) >= 0) {
        defaults.showToast(defaults.enterNewRefererUsernameMessage);
        return 0;
      }

      (_this$accountActivati = _this.accountActivationFieldset).prop.apply(_this$accountActivati, _toConsumableArray(defaults.disabledTrue));

      var data = {
        email: _this.props.email,
        action: 'TRY_RE-ACTIVATE_AFFILIATE_ACCOUNT',
        referer_username: refererUsername
      };
      data = JSON.stringify(data);
      $.post(defaults.actions, {
        data: data
      }, function (response) {
        response = JSON.parse(response);

        if (response.success) {
          _this.accountActivationModalPopUp.modal('close');

          return _this.refreshProfile();
        } else if (response.continue_with_paystack) {
          defaults.payWithPaystack(_this.props.email, defaults.convertToPaystack(response.amount), _this.props.user.username, function (response) {
            if (response.status !== defaults.successText) {
              var _this$accountActivati2;

              (_this$accountActivati2 = _this.accountActivationFieldset).prop.apply(_this$accountActivati2, _toConsumableArray(defaults.disabledFalse));

              defaults.showToast(defaults.transactionNotSuccessfulMessage);
              return 0;
            }

            data = {
              reference_code: response.reference,
              email: _this.props.email,
              action: 'RE-ACTIVATE_AFFILIATE_ACCOUNT',
              referer_username: refererUsername
            };
            data = JSON.stringify(data);
            $.post(defaults.actions, {
              data: data
            }, function (response) {
              response = JSON.parse(response);

              if (response.success) {
                _this.accountActivationModalPopUp.modal('close');

                return _this.refreshProfile();
              }
            });
          });
        } else {
          var _this$accountActivati3;

          (_this$accountActivati3 = _this.accountActivationFieldset).prop.apply(_this$accountActivati3, _toConsumableArray(defaults.disabledFalse));

          _this.accountActivationResponseMessage.text(response.error);

          defaults.showToast(response.error);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "accountActivationModal", function () {
      return React.createElement("div", {
        id: "account-activation-modal",
        className: "modal modal-fixed-footer"
      }, React.createElement("div", {
        className: "modal-content"
      }, React.createElement("fieldset", {
        id: "account-activation-fieldset"
      }, React.createElement("form", {
        id: "account-activation-form",
        method: "POST",
        action: "#",
        onSubmit: _this.handleAccountActivation
      }, React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("input", {
        id: "account-activation-referer-username",
        minLength: defaults.minimumAccountUsernameLength,
        maxLength: defaults.maximumAccountUsernameLength,
        pattern: "[a-zA-Z0-9]{".concat(defaults.minimumAccountUsernameLength, ",").concat(defaults.maximumAccountUsernameLength, "}"),
        required: "required",
        name: "withdrawal-amount",
        type: "text",
        className: "validate"
      }), React.createElement("label", {
        htmlFor: "referer-username",
        className: "active"
      }, "Referer"), React.createElement("span", {
        className: "helper-text",
        id: "account-activation-response-message"
      }), React.createElement("button", {
        type: "submit",
        id: "withdrawal-submit-button",
        className: "waves-effect waves-light btn-small"
      }, "Proceed"), React.createElement("span", {
        className: "helper-text right",
        id: "withdrawal-charge-message"
      }, "You can no longer use ", React.createElement("span", {
        className: "strong"
      }, _this.props.user.referer_username), " as your referer")))))), React.createElement("div", {
        className: "modal-footer"
      }, React.createElement("a", {
        href: "#",
        onClick: function onClick() {
          _this.accountActivationModalPopUp.modal('close');
        },
        className: "modal-close waves-effect waves-green btn-flat no-underline strong light"
      }, "CLOSE")));
    });

    _defineProperty(_assertThisInitialized(_this), "deletePaymentHistory", function (reference_code) {
      var data = {
        action: 'DELETE_PAYMENT_HISTORY',
        reference_code: reference_code,
        email: _this.props.email
      };
      data = JSON.stringify(data);
      $.post(defaults.actions, {
        data: data
      }, function (response) {
        response = JSON.parse(response);
        if (response.success) _this.refreshProfile();
      });
    });

    return _this;
  }

  _createClass(Affiliate, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.defaultActions();
      var data = {
        email: this.props.email,
        action: 'FETCH_AFFILIATE_DETAILS'
      };
      data = JSON.stringify(data);
      $.post(defaults.actions, {
        data: data
      }, function (response1) {
        _this2.registeredTimeago = timeago.format(_this2.props.user.registered_on);
        response1 = JSON.parse(response1);

        _this2.props.resetState(_objectSpread({}, _this2.props, {
          user: response1.user,
          ads: response1.ads
        }), function () {
          if (!Number(_this2.props.user.subscribed)) {
            _this2.accountActivationModalPopUp = $('.modal#account-activation-modal');

            _this2.accountActivationModalPopUp.modal({
              dismissible: false
            });

            _this2.accountActivationFieldset = $('#account-activation-fieldset');
            _this2.accountActivationForm = $('#account-activation-form');
            _this2.refererUsername = $('#account-activation-referer-username');
            _this2.accountActivationResponseMessage = $('#account-activation-response-message');
          }
        });
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.defaultActions();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var isActivateAccount = this.props.user.subscribed == 1;
      var accountActivationModal = isActivateAccount ? null : this.accountActivationModal();
      var userSubscriptionStatus = Number(this.props.user.subscribed);
      var withdrawalPaymentsSingularOrPlural = this.props.user.withdrawal_requests != 1 ? "payments" : "payment";
      var paymentsHistory = this.props.user.payments.length ? React.createElement("h5", null, "Payments History(", this.props.user.payments.length, ")") : null;
      var withdrawalRequests = this.props.user.withdrawal_requests ? React.createElement("h5", null, "Withdrawal Requests(", this.props.user.withdrawal_requests, ")") : null;
      var accountDeactivationMessage = !isActivateAccount ? React.createElement("div", {
        className: "row notice-board z-depth-3 account-deactivation-notice-board card-panel"
      }, React.createElement("div", {
        className: "col s12 valign-wrapper"
      }, React.createElement("span", {
        className: "affiliate-withdrawal-requests-message"
      }, "Your account is no longer active, click ", React.createElement("strong", {
        className: "strong"
      }, React.createElement("a", {
        className: "modal-trigger account-activation-modal-link",
        href: "#account-activation-modal"
      }, "here")), " to re-activate."))) : null;
      var paymentsMade = this.props.user.payments.map(function (payment) {
        return React.createElement("div", {
          className: "row notice-board z-depth-3 payments-notice-board card-panel",
          key: payment.reference_code
        }, React.createElement("i", {
          className: "material-icons hide-payment-history-icon",
          onClick: function onClick() {
            return _this3.deletePaymentHistory(payment.reference_code);
          }
        }, "cancel"), React.createElement("div", {
          className: "col s12 valign-wrapper"
        }, React.createElement("span", {
          className: "affiliate-withdrawal-requests-message"
        }, React.createElement("strong", {
          className: "strong"
        }, "\u20A6", payment.amount.toLocaleString()), " was paid to your account ", timeago.format(payment.payment_date))), React.createElement("span", {
          className: "affiliate-payment-reference-code"
        }, "ID : ", React.createElement("strong", {
          className: "strong"
        }, payment.reference_code)));
      });
      var withdrawalRequestsMessage = this.props.user.withdrawal_requests ? React.createElement("span", {
        className: "affiliate-withdrawal-requests-message"
      }, "You have ", React.createElement("strong", {
        className: "strong"
      }, this.props.user.withdrawal_requests), " pending ", withdrawalPaymentsSingularOrPlural, " of  ", React.createElement("strong", {
        className: "strong"
      }, "\u20A6", this.props.user.total_withdrawal_amount.toLocaleString()), " ") : null;
      var withdrawalRequestMessageExtraClass = withdrawalRequestsMessage != null ? null : 'hide';
      var defaultEmailToShow = (this.props.user.email || "user@domain.com").truncate(defaults.emailTruncateSize);
      var subscriptionButtonType = userSubscriptionStatus ? React.createElement("div", {
        className: "green-text"
      }, React.createElement("span", {
        className: "subscription-active-text"
      }, "active"), React.createElement("a", {
        className: "waves-effect waves-light disabled btn-small right"
      }, "Paid ")) : React.createElement("div", null, React.createElement("span", {
        className: "materialize-red-text activate-account-text"
      }, "INACTIVE"), " ", React.createElement("a", {
        className: "waves-effect modal-trigger waves-light btn-small right activate-account-button",
        href: "#account-activation-modal"
      }, "Activate"));
      return React.createElement("div", null, React.createElement(AffiliateHeader, {
        refreshProfile: this.refreshProfile
      }), accountDeactivationMessage, accountActivationModal, React.createElement("div", {
        className: "container"
      }, withdrawalRequests, React.createElement("div", {
        className: "row notice-board z-depth-3  withdrawal-notice-board card-panel ".concat(withdrawalRequestMessageExtraClass)
      }, React.createElement("div", {
        className: "col s12 valign-wrapper"
      }, withdrawalRequestsMessage)), paymentsHistory, paymentsMade, React.createElement("div", {
        className: "row notice-board z-depth-3"
      }, React.createElement("div", {
        className: "col s12 valign-wrapper"
      }, React.createElement("p", {
        className: "notice-header flow-text"
      }, "Public message to Affiliates")), React.createElement("div", {
        className: "col s12 valign-wrapper"
      }, React.createElement("p", {
        className: "notice-message"
      }, "Your affiliate account will require renewal once every 30 days, provided you've reached our threshold of ", React.createElement("strong", {
        className: "strong"
      }, "\u20A6", defaults.thresholdAmount.toLocaleString()), " for the month.", React.createElement("br", null), "our Demo Video is also a good tour guide for beginners."))), React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "col s12 m6"
      }, React.createElement("h5", {
        className: "status-headers"
      }, "Transaction History"), React.createElement("div", {
        className: "card"
      }, React.createElement("div", {
        className: "card-content"
      }, React.createElement("p", null, "The data below represents the record of all your transactions with us.")), React.createElement("div", {
        className: "card-tabs"
      }, React.createElement("ul", {
        className: "tabs fund-status-tabs tabs-fixed-width"
      }, React.createElement("li", {
        className: "tab",
        id: "account-balance-tab"
      }, React.createElement("a", {
        className: "active tourJS affiliate-account-tour tour-3",
        "data-step": "3",
        "data-caption": "Your account balance is shown here.",
        href: "#account-balance"
      }, "Acc Bal.")), React.createElement("li", {
        className: "tab"
      }, React.createElement("a", {
        href: "#total-amount-funded",
        className: "tourJS affiliate-account-tour tour-4",
        "data-step": "4",
        "data-caption": "This is the total amount you've earned."
      }, "Income")), React.createElement("li", {
        className: "tab me"
      }, React.createElement("a", {
        href: "#total-number-of-ads",
        className: "tourJS affiliate-account-tour tour-5",
        "data-step": "5",
        "data-caption": "This is the total users you've referred.",
        "data-tourjs-action": "click"
      }, "Tot Ref.")))), React.createElement("div", {
        className: "card-content grey lighten-4"
      }, React.createElement("div", {
        id: "account-balance",
        style: {
          display: 'none'
        }
      }, "Acc balance :", React.createElement("span", {
        className: "right amount-value"
      }, "\u20A6", Number(this.props.user.account_balance).toLocaleString())), React.createElement("div", {
        id: "total-amount-funded"
      }, "Total income :", React.createElement("span", {
        className: "right amount-value"
      }, "\u20A6", Number(this.props.user.total_income_earned).toLocaleString())), React.createElement("div", {
        id: "total-number-of-ads",
        style: {
          display: 'none'
        }
      }, "Total ref :", React.createElement("span", {
        className: "right amount-value"
      }, this.props.user.number_of_users_referred))))), React.createElement("div", {
        className: "col s12 m6"
      }, React.createElement("h5", {
        className: "status-headers"
      }, "Account Info"), React.createElement("div", {
        className: "card"
      }, React.createElement("div", {
        className: "card-content"
      }, React.createElement("p", null, "The data below contains other important info with regards to your account. ")), React.createElement("div", {
        className: "card-tabs"
      }, React.createElement("ul", {
        className: "tabs tabs-fixed-width account-info-tabs"
      }, React.createElement("li", {
        className: "tab",
        id: "email-tab"
      }, React.createElement("a", {
        href: "#email-address"
      }, "E-mail")), React.createElement("li", {
        className: "tab"
      }, React.createElement("a", {
        href: "#test5",
        className: "flow-text tourJS affiliate-account-tour tour-6",
        "data-step": "6",
        "data-caption": "Your account status is shown here."
      }, "Status")), React.createElement("li", {
        className: "tab"
      }, React.createElement("a", {
        href: "#test6",
        className: "flow-text tourJS affiliate-account-tour tour-7",
        "data-step": "7",
        "data-caption": "Your earnings for the last 30 days."
      }, "This Month")))), React.createElement("div", {
        className: "card-content grey lighten-4"
      }, React.createElement("div", {
        id: "email-address",
        style: {
          display: 'none'
        }
      }, "E-mail", React.createElement("span", {
        className: "right amount-value email-address",
        id: "merchant-email-address"
      }, defaultEmailToShow)), React.createElement("div", {
        id: "test5",
        className: "active"
      }, subscriptionButtonType), React.createElement("div", {
        id: "test6",
        style: {
          display: 'none'
        }
      }, "Amount earned ", React.createElement("span", {
        className: "right"
      }, this.props.user.amount_earned_for_the_month))))), React.createElement("div", {
        id: "break"
      }), React.createElement("div", {
        className: "col s12 m6"
      }, React.createElement("h5", {
        className: "status-headers"
      }, "Important Links"), React.createElement("div", {
        className: "card"
      }, React.createElement("div", {
        className: "card-content"
      }, React.createElement("p", null, "list of all the links you need, for you to start earning")), React.createElement("div", {
        className: "card-tabs"
      }, React.createElement("ul", {
        className: "tabs fund-status-tabs tabs-fixed-width"
      }, React.createElement("li", {
        className: "tab",
        id: "account-balance-tab"
      }, React.createElement("a", {
        className: "active tourJS affiliate-account-tour tour-9",
        "data-step": "9",
        "data-caption": "use this link to refer your friends to ".concat(defaults.siteName, "."),
        href: "#referer-link"
      }, "Moref")), React.createElement("li", {
        className: "tab"
      }, React.createElement("a", {
        href: "#referer-username"
      }, "Username")), React.createElement("li", {
        className: "tab"
      }, React.createElement("a", {
        href: "#invite-link",
        className: "tourJS affiliate-account-tour tour-8",
        "data-step": "8",
        "data-caption": "use this link to invite your friends to ".concat(defaults.siteName, ".")
      }, "Molin")))), React.createElement("div", {
        className: "card-content grey lighten-4"
      }, React.createElement("div", {
        id: "referer-link",
        style: {
          display: 'none'
        }
      }, React.createElement("span", null, defaults.siteAddressHttps + "/campaign/".concat(this.props.user.username))), React.createElement("div", {
        id: "referer-username"
      }, React.createElement("span", null, this.props.user.username)), React.createElement("div", {
        id: "invite-link",
        style: {
          display: 'none'
        }
      }, React.createElement("span", null, defaults.siteAddressHttps + "/r/".concat(this.props.user.username)))))))), React.createElement(Footer, {
        accountType: "Affiliate",
        refreshProfile: this.refreshProfile
      }));
    }
  }]);

  return Affiliate;
}(React.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return _objectSpread({}, state, ownProps);
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    resetState: function resetState(state) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      dispatch({
        state: state,
        type: 'RESET_STATE'
      });
      callback();
    },
    restoreState: function restoreState() {
      dispatch({
        type: 'RESTORE_STATE'
      });
    },
    modifyState: function modifyState(state) {
      dispatch({
        type: 'MODIFY_STATE',
        state: state
      });
    },
    factoryReset: function factoryReset() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      dispatch({
        type: 'FACTORY_RESET'
      });
      return true;
    }
  };
};

var _ReactRedux = ReactRedux,
    connect = _ReactRedux.connect;
Affiliate = connect(mapStateToProps, mapDispatchToProps)(Affiliate);