"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var Merchant =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Merchant, _React$Component);

  function Merchant() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Merchant);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Merchant)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "adRates", {});

    _defineProperty(_assertThisInitialized(_this), "defaultActions", function () {
      var fundStatusTabs = $('.tabs.fund-status-tabs');
      var accounInfoTabs = $('.tabs.account-info-tabs');
      $('.tabs').tabs(); //  $('.tabs').tabs('updateTabIndicator');

      fundStatusTabs.tabs('select', 'account-balance-tab');
      accounInfoTabs.tabs('select', 'email-tab');
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillMount", function () {
      document.title = defaults.siteName + " • Merchant Account";
    });

    _defineProperty(_assertThisInitialized(_this), "refreshProfile", function () {
      var data = {
        email: _this.props.email,
        action: 'FETCH_MERCHANT_DETAILS'
      };
      data = JSON.stringify(data);
      $.post(defaults.actions, {
        data: data
      }, function (response1) {
        response1 = JSON.parse(response1);

        _this.props.resetState(_objectSpread({}, _this.props, {
          user: response1.user,
          ads: response1.ads
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "activateMerchantAccount", function () {
      defaults.payWithPaystack(_this.props.email, defaults.convertToPaystack(defaults.merchantActivationFee), "Account Activation", function (response) {
        if (response.status !== defaults.successText) return defaults.showToast(defaults.transactionNotSuccessfulMessage);
        var data = {
          email: _this.props.email,
          action: 'ACTIVATE_MERCHANT_ACCOUNT',
          reference: response.reference,
          amount: defaults.merchantActivationFee
        };
        data = JSON.stringify(data);
        $.post(defaults.actions, {
          data: data
        }, function (response) {
          _this.refreshProfile();
        });
      });
    });

    return _this;
  }

  _createClass(Merchant, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props !== nextProps;
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.defaultActions();
      var data = {
        email: this.props.email,
        action: 'FETCH_MERCHANT_DETAILS'
      };
      data = JSON.stringify(data);
      $.post(defaults.actions, {
        data: data
      }, function (response1) {
        _this2.registeredTimeago = timeago.format(_this2.props.user.registered_on);
        response1 = JSON.parse(response1);
        data = {
          email: _this2.props.email,
          action: 'FETCH_AD_RATES'
        };
        data = JSON.stringify(data);
        $.post(defaults.actions, {
          data: data
        }, function (response2) {
          response2 = JSON.parse(response2);

          _this2.props.resetState(_objectSpread({}, _this2.props, {
            user: response1.user,
            ads: response1.ads,
            adRates: _objectSpread({}, response2)
          }));
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
      var userSubscriptionStatus = Number(this.props.user.subscribed);
      var defaultEmailToShow = (this.props.user.email || "user@domain.com").truncate(defaults.emailTruncateSize);
      var subscriptionButtonType = userSubscriptionStatus ? React.createElement("div", {
        className: "green-text"
      }, React.createElement("span", {
        className: "subscription-active-text"
      }, "active"), React.createElement("a", {
        className: "waves-effect waves-light disabled btn-small right"
      }, "Paid \u20A6", defaults.merchantActivationFee)) : React.createElement("div", null, React.createElement("span", {
        className: "materialize-red-text activate-account-text"
      }, "NOT ACTIVATED"), " ", React.createElement("a", {
        href: "#",
        className: "waves-effect waves-light btn-small right activate-account-button",
        onClick: this.activateMerchantAccount
      }, "Activate  \u20A6 ", defaults.merchantActivationFee));
      return React.createElement("div", null, React.createElement(MerchantHeader, null), React.createElement("div", {
        className: "container"
      }, React.createElement("div", {
        className: "row notice-board z-depth-3"
      }, React.createElement("div", {
        className: "col s12 valign-wrapper"
      }, React.createElement("p", {
        className: "notice-header flow-text"
      }, "Public message to advertisers")), React.createElement("div", {
        className: "col s12 valign-wrapper"
      }, React.createElement("p", {
        className: "notice-message"
      }, "New Merchants are adviced to read our FAQ and our Terms of Service before proceeding with further actions on this page.", React.createElement("br", null), "our Demo Video is also a good tour guide."))), React.createElement("div", {
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
        className: "active",
        href: "#account-balance"
      }, "Ad Bal.")), React.createElement("li", {
        className: "tab"
      }, React.createElement("a", {
        href: "#total-amount-funded"
      }, "Trans.")), React.createElement("li", {
        className: "tab"
      }, React.createElement("a", {
        href: "#total-number-of-ads"
      }, "ADS")))), React.createElement("div", {
        className: "card-content grey lighten-4"
      }, React.createElement("div", {
        id: "account-balance",
        style: {
          display: 'none'
        }
      }, "Ad balance :", React.createElement("span", {
        className: "right amount-value"
      }, "\u20A6", Number(this.props.user.account_balance).toLocaleString())), React.createElement("div", {
        id: "total-amount-funded"
      }, "Total transactions :", React.createElement("span", {
        className: "right amount-value"
      }, "\u20A6", Number(this.props.user.total_amount_funded).toLocaleString())), React.createElement("div", {
        id: "total-number-of-ads",
        style: {
          display: 'none'
        }
      }, "Total ads :", React.createElement("span", {
        className: "right amount-value"
      }, this.props.ads.length))))), React.createElement("div", {
        className: "col s12 m6"
      }, React.createElement("h5", {
        className: "status-headers"
      }, "Account Info"), React.createElement("div", {
        className: "card"
      }, React.createElement("div", {
        className: "card-content"
      }, React.createElement("p", null, "The data below contains your merchant account details and other important info. ")), React.createElement("div", {
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
        className: "flow-text"
      }, "Status")), React.createElement("li", {
        className: "tab"
      }, React.createElement("a", {
        href: "#test6",
        className: "flow-text"
      }, "Account")))), React.createElement("div", {
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
      }, "Registered ", React.createElement("span", {
        className: "right"
      }, this.registeredTimeago)))))), React.createElement(MerchantAds, {
        activateMerchantAccount: this.activateMerchantAccount,
        refreshProfile: this.refreshProfile
      })), React.createElement(Footer, {
        accountType: "Merchant",
        refreshProfile: this.refreshProfile
      }));
    }
  }]);

  return Merchant;
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
Merchant = connect(mapStateToProps, mapDispatchToProps)(Merchant);