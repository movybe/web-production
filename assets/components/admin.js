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

var Admin =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Admin, _React$Component);

  function Admin() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Admin);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Admin)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "texts", {
      payments: 'payments',
      ads: 'ads',
      stats: 'stats'
    });

    _defineProperty(_assertThisInitialized(_this), "state", {
      content: _this.texts.payments,
      payment_details: [{
        account_name: "Kosi Eric",
        account_number: 2093954338,
        bank_name: "Access Bank",
        amount: 34000,
        number_of_withdrawals: 0,
        total_withdrawals_amount: 0
      }],
      current_payment_index: -1,
      site_statistics: {},
      sponsored_ads: [],
      current_sponsored_ads_index: 0
    });

    _defineProperty(_assertThisInitialized(_this), "componentWillMount", function () {
      $.getScript(defaults.getFileLocation('/assets/js/clipboard.js'));
      document.title = defaults.siteName + " • Admin Panel";
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

        _this.setState(_objectSpread({}, _this.state, {
          site_statistics: response1.user.site_statistics
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getNextSponsoredAds", function () {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.current_sponsored_ads_index;
      var data = {
        email: _this.props.email,
        action: 'GET_SPONSORED_ADS',
        index: index
      };
      data = JSON.stringify(data);
      $.post(defaults.actions, {
        data: data
      }, function (response) {
        response = JSON.parse(response);
        var nextIndex = index + defaults.numberOfAdsForAdminReview;

        _this.setState(_objectSpread({}, _this.state, {
          sponsored_ads: response.sponsored_ads,
          current_sponsored_ads_index: nextIndex
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getNextPaymentDetails", function () {
      var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.current_payment_index;
      var data = {
        action: 'FETCH_NEXT_PAYMENT_DETAILS',
        email: _this.props.email,
        index: index
      };
      data = JSON.stringify(data);
      $.post(defaults.actions, {
        data: data
      }, function (response) {
        response = JSON.parse(response);

        if (response.payment_details.amount) {
          var payment_details = response.payment_details.amount ? [response.payment_details] : [];

          _this.setState(_objectSpread({}, _this.state, {
            payment_details: payment_details,
            current_payment_index: parseInt(response.payment_details.id)
          }));
        } else {
          _this.setState(_objectSpread({}, _this.state, {
            payment_details: []
          }));
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleAdminMessageForm", function (e) {
      e.preventDefault();
      var adminMessageFieldset = $('.admin-message-fieldset');
      var adminMessageForm = $(e.target);
      adminMessageForm.validate();

      if (adminMessageForm.valid()) {
        adminMessageFieldset.prop.apply(adminMessageFieldset, _toConsumableArray(defaults.disabledTrue));
        var adId = adminMessageForm.attr('data-ad-id');
        var message = $("#".concat(adId, "-textarea")).val();
        var data = {
          message: message,
          ad_id: adId,
          action: 'DISAPPROVE_AD',
          email: _this.props.user.email
        };
        data = JSON.stringify(data);
        $.post(defaults.actions, {
          data: data
        }, function (response) {
          response = JSON.parse(response);
          defaults.showToast(response.error);
          adminMessageFieldset.prop.apply(adminMessageFieldset, _toConsumableArray(defaults.disabledFalse));

          _this.getNextSponsoredAds(0);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "sponsoredAds", function () {
      var style = null;
      if (!_this.state.sponsored_ads.length) return React.createElement("h5", null, "No ads yet.");

      var sponsoredAds = _this.state.sponsored_ads.map(function (ad) {
        style = {
          backgroundImage: "url(".concat(defaults.bannerImageLocation + ad.banner, ")")
        };
        return React.createElement("div", {
          className: "olx-search-result",
          key: ad.ad_id
        }, React.createElement("h6", {
          className: "green-text search-result-price"
        }, React.createElement("span", null, "AD (", ad.ad_id, ")")), React.createElement("h3", {
          className: "search-result-title-header"
        }, React.createElement("a", {
          target: "_blank",
          className: "search-result-title-link",
          href: ad.link
        }, ad.title)), React.createElement("a", {
          className: "search-result-link-address",
          target: "_blank"
        }, ad.link.truncate(defaults.maxLinkLength)), React.createElement("span", {
          className: "search-result-link-description"
        }, ad.description.truncate(defaults.maxDescriptionLength)), React.createElement("span", {
          className: "modal-link",
          "data-caption": ad.title,
          href: "".concat(defaults.bannerImageLocation).concat(ad.banner)
        }, null), React.createElement("a", {
          target: "_blank",
          href: "#",
          className: "image-download-link search-result-images blue-text"
        }, React.createElement("i", {
          className: "tiny material-icons search-image-icons"
        }, "image"), " Save Image"), React.createElement("span", {
          className: "search-result-locations blue-grey-text"
        }, React.createElement("i", {
          className: "tiny material-icons search-location-icons"
        }, "location_on"), React.createElement("span", {
          id: "ad-location-preview"
        }, ad.location)), React.createElement("span", {
          className: "modal-link"
        }, React.createElement("div", {
          className: "image-container ad-image-previews-container",
          style: style
        }, React.createElement("div", {
          className: "blurred-bg ad-image-previews",
          style: style
        }), React.createElement("div", {
          className: "overlay ad-image-previews",
          style: style
        }))), React.createElement("fieldset", {
          className: "admin-message-fieldset"
        }, React.createElement("form", {
          className: "admin-message-form",
          "data-ad-id": ad.ad_id,
          onSubmit: _this.handleAdminMessageForm
        }, React.createElement("div", {
          className: "row what-is-wrong-with-this-ad"
        }, React.createElement("div", {
          className: "input-field col s12"
        }, React.createElement("textarea", {
          id: ad.ad_id + '-textarea',
          className: "materialize-textarea admin-ad-message",
          maxLength: defaults.maximumAdminAdMessageLength,
          "data-length": defaults.maximumAdminAdMessageLength,
          required: "required"
        }), React.createElement("label", {
          htmlFor: ad.ad_id + '-textarea'
        }, "What is wrong with this Ad?"), React.createElement("button", {
          className: "btn",
          type: "submit"
        }, "Send"))))));
      });

      return React.createElement("div", null, sponsoredAds, React.createElement("a", {
        href: "#",
        className: "waves-effect waves-light next-payment-button next-ad-button btn right",
        onClick: function onClick() {
          _this.getNextSponsoredAds();
        }
      }, "Next"));
    });

    _defineProperty(_assertThisInitialized(_this), "confirmPayment", function () {
      var paid = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var getNext = true; //if the user was actually paid

      if (paid) {
        getNext = false;
        var data = {
          action: 'CONFIRM_PAYMENT',
          email: _this.props.email,
          reference_code: _this.state.payment_details[0].reference_code,
          amount: _this.state.payment_details[0].amount,
          username: _this.state.payment_details[0].username
        };
        data = JSON.stringify(data);
        $.post(defaults.actions, {
          data: data
        }, function (response) {
          response = JSON.parse(response);
          defaults.showToast(response.error);

          _this.getNextPaymentDetails();
        });
      }

      _this.confirmPaymentModalPopup.modal('close');

      if (getNext) _this.getNextPaymentDetails();
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidMount", function () {
      _this.sidenav = $('.sidenav');

      _this.sidenav.sidenav({
        preventScrolling: true
      });

      $('.collapsible').collapsible(); //Fetch the next payment details

      _this.getNextPaymentDetails();

      _this.refreshProfile();

      _this.confirmPaymentModalPopup = $('.modal#confirm-payment-modal');

      _this.confirmPaymentModalPopup.modal({
        dismissible: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "confirmPaymentModal", function () {
      return React.createElement("div", {
        id: "confirm-payment-modal",
        className: "modal"
      }, React.createElement("div", {
        className: "modal-content"
      }, React.createElement("h4", null, "Confirm payment to user"), React.createElement("p", null, "Have you made payment to this account?")), React.createElement("div", {
        className: "modal-footer"
      }, React.createElement("a", {
        href: "#",
        className: "modal-action modal-close waves-effect waves-green btn green payment-yes-click",
        onClick: _this.confirmPayment
      }, "YES"), React.createElement("a", {
        href: "#",
        className: "modal-action modal-close waves-effect waves-red btn red",
        onClick: function onClick() {
          return _this.confirmPayment(false);
        }
      }, "NO")));
    });

    _defineProperty(_assertThisInitialized(_this), "siteStatistics", function () {
      var value = 0;
      var field = null;
      var tableBody = Object.keys(_this.state.site_statistics).map(function (key) {
        field = key.replace(/_/g, ' ');
        value = _this.state.site_statistics[key];
        value = !isNaN(value) ? _this.convertDecimalToLocaleString(value) : value;

        switch (key) {
          case 'last_invitation_date':
            value = timeago.format(value);
            break;
        }

        return React.createElement("tr", {
          key: Math.random()
        }, React.createElement("td", null, React.createElement("strong", {
          className: "strong site-statistics-field-name"
        }, field)), React.createElement("td", null, value));
      });
      return React.createElement("table", {
        className: "striped centered highlight"
      }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Field"), React.createElement("th", null, "Value"))), React.createElement("tbody", null, tableBody));
    });

    _defineProperty(_assertThisInitialized(_this), "paymentDetailsTable", function () {
      var display = _this.state.payment_details.length ? React.createElement("div", null, React.createElement("table", {
        className: "striped centered responsive-table highlight"
      }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Acc name"), React.createElement("th", null, "Acc No."), React.createElement("th", null, "Bank"), React.createElement("th", null, "Amount"))), React.createElement("tbody", null, React.createElement("tr", null, React.createElement("td", null, _this.state.payment_details[0].account_name.truncate(defaults.accountNameLengthToShow)), React.createElement("td", null, _this.state.payment_details[0].account_number, " ", React.createElement("a", {
        href: "#",
        className: "no-underline",
        onClick: function onClick() {
          clipboard.writeText(_this.state.payment_details[0].account_number);
          defaults.showToast("Copied!");
        }
      }, "copy"), " "), React.createElement("td", null, _this.state.payment_details[0].bank_name), React.createElement("td", null, "\u20A6", _this.convertDecimalToLocaleString(_this.state.payment_details[0].amount))))), React.createElement("a", {
        href: "#confirm-payment-modal",
        className: "waves-effect waves-light next-payment-button btn right modal-trigger"
      }, "Next")) : React.createElement("h5", null, "No payment Request yet.");
      return React.createElement("div", null, display);
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function () {
      _this.sidenav = $('.sidenav');

      _this.sidenav.sidenav({
        preventScrolling: true
      });

      $('textarea.admin-ad-message').characterCounter();
    });

    _defineProperty(_assertThisInitialized(_this), "changeAdminContent", function (e) {
      var content = $(e.target).attr('data-content');

      _this.setState(_objectSpread({}, _this.state, {
        content: content
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "header", function () {
      return React.createElement("header", {
        className: "admin-account-header"
      }, React.createElement("nav", {
        className: "admin-navbar"
      }, React.createElement("div", {
        className: "nav-wrapper"
      }, React.createElement("a", {
        href: "#",
        "data-target": "slide-out",
        className: "sidenav-trigger"
      }, React.createElement("i", {
        className: "material-icons"
      }, "menu")), React.createElement("a", {
        href: "#",
        className: "brand-logo admin-brand-logo"
      }, React.createElement("img", {
        src: defaults.imageDirectory + 'm-shadow.png',
        className: "admin-nav-brand-logo"
      }), React.createElement("span", {
        className: "brand-name"
      }, defaults.siteName), " "))));
    });

    _defineProperty(_assertThisInitialized(_this), "sideNav", function () {
      return React.createElement("ul", {
        id: "slide-out",
        className: "admin-sidenav sidenav sidenav-fixed"
      }, React.createElement("li", null, React.createElement("div", {
        className: "user-view"
      }, React.createElement("div", {
        className: "background"
      }, React.createElement("img", {
        src: defaults.imageDirectory + 'admin-image-background.jpg'
      })), React.createElement("a", {
        href: "#"
      }, React.createElement("img", {
        className: "circle",
        src: defaults.imageDirectory + 'favicon.png'
      })), React.createElement("a", {
        href: "#"
      }, React.createElement("span", {
        className: "white-text name admin-name"
      }, defaults.siteName + ' Admin')), React.createElement("a", {
        href: "#"
      }, React.createElement("span", {
        className: "white-text email"
      }, _this.props.user.email)))), React.createElement("li", {
        className: "no-padding"
      }, React.createElement("ul", {
        className: "collapsible collapsible-accordion"
      }, React.createElement("li", null, React.createElement("a", {
        className: "collapsible-header"
      }, "Payments", React.createElement("i", {
        className: "material-icons"
      }, "payment")), React.createElement("div", {
        className: "collapsible-body"
      }, React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {
        href: "#",
        className: "admin-action-links",
        "data-content": _this.texts.payments,
        onClick: function onClick(e) {
          _this.changeAdminContent(e);

          _this.getNextPaymentDetails(-1);
        }
      }, React.createElement("i", {
        className: "fa fa-share"
      }), "Withdrawal Requests"), React.createElement("i", {
        className: "material-icons admin-refresh-icon refresh-withdrawal-requests-icon",
        title: "refresh",
        onClick: function onClick() {
          return _this.getNextPaymentDetails(-1);
        }
      }, "refresh"))))))), React.createElement("li", {
        className: "no-padding"
      }, React.createElement("ul", {
        className: "collapsible collapsible-accordion"
      }, React.createElement("li", null, React.createElement("a", {
        className: "collapsible-header"
      }, React.createElement("i", {
        className: "fa fa-bullhorn bullhorn-icon ad-management-icon"
      }), "Ad Management"), React.createElement("div", {
        className: "collapsible-body"
      }, React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {
        href: "#",
        className: "admin-action-links",
        "data-content": _this.texts.ads,
        onClick: _this.changeAdminContent
      }, React.createElement("i", {
        className: "material-icons"
      }, "rate_review"), " Review Ads"), React.createElement("i", {
        className: "material-icons admin-refresh-icon refresh-withdrawal-requests-icon",
        title: "refresh",
        onClick: function onClick() {
          _this.getNextSponsoredAds(0);
        }
      }, "refresh"))))))), React.createElement("li", null, React.createElement("div", {
        className: "divider"
      })), React.createElement("li", {
        className: "no-padding"
      }, React.createElement("ul", {
        className: "collapsible collapsible-accordion"
      }, React.createElement("li", null, React.createElement("a", {
        className: "collapsible-header",
        href: "#"
      }, React.createElement("i", {
        className: "material-icons"
      }, "insert_chart"), "Statistics"), React.createElement("div", {
        className: "collapsible-body"
      }, React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {
        href: "#",
        className: "admin-action-links",
        "data-content": _this.texts.stats,
        onClick: _this.changeAdminContent
      }, React.createElement("i", {
        className: "material-icons"
      }, "terrain"), "View stats"), React.createElement("i", {
        className: "material-icons admin-refresh-icon",
        title: "refresh",
        onClick: _this.refreshProfile
      }, "refresh"))))))), React.createElement("li", {
        className: "no-padding"
      }, React.createElement("ul", {
        className: "collapsible collapsible-accordion"
      }, React.createElement("li", null, React.createElement("a", {
        className: "collapsible-header",
        href: "#"
      }, React.createElement("i", {
        className: "material-icons"
      }, "person_pin"), "Account"), React.createElement("div", {
        className: "collapsible-body"
      }, React.createElement("ul", null, React.createElement("li", null, React.createElement("a", {
        href: "#",
        className: "admin-action-links",
        onClick: _this.props.logout
      }, React.createElement("i", {
        className: "material-icons"
      }, "power_settings_new"), "Sign out"))))))));
    });

    _defineProperty(_assertThisInitialized(_this), "convertDecimalToLocaleString", function (decimal) {
      var number = parseInt(decimal);
      var dotPosition = decimal.toString().indexOf('.');

      if (dotPosition > 0) {
        number = number.toLocaleString() + '.' + decimal.toString().substring(dotPosition + 1);
        return number;
      }

      return number.toLocaleString();
    });

    return _this;
  }

  _createClass(Admin, [{
    key: "render",
    value: function render() {
      var content = null,
          firstStatusHeaderText = "Account Balance",
          secondStatusHeaderText = "PROFIT";
      var firstHeaderValue = 0,
          secondHeaderValue = 0;

      switch (this.state.content) {
        case this.texts.payments:
          content = this.paymentDetailsTable();
          firstStatusHeaderText = "No. of Withdrawals";
          secondStatusHeaderText = "Total Withdrawals Amount";
          firstHeaderValue = this.state.payment_details.length ? this.state.payment_details[0].number_of_withdrawals : firstHeaderValue;
          secondHeaderValue = this.state.payment_details.length ? this.state.payment_details[0].total_withdrawals_amount : secondHeaderValue;
          break;

        case this.texts.stats:
          content = this.siteStatistics();
          firstHeaderValue = React.createElement("span", null, "\u20A6", this.convertDecimalToLocaleString(this.props.user.site_statistics.account_balance));
          secondHeaderValue = this.props.user.site_statistics.profit;
          break;

        case this.texts.ads:
          content = this.sponsoredAds();
      }

      return React.createElement("main", {
        className: "admin-dashboard"
      }, this.header(), React.createElement("aside", null, this.sideNav(), this.confirmPaymentModal()), React.createElement("div", {
        className: "container admin-container"
      }, React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "col s12 m6"
      }, React.createElement("h5", {
        className: "status-headers admin-status-headers"
      }, firstStatusHeaderText), React.createElement("div", {
        className: "card"
      }, React.createElement("div", {
        className: "card-content"
      }, React.createElement("h5", {
        className: "cairo-font"
      }, firstHeaderValue)))), React.createElement("div", {
        className: "col s12 m6"
      }, React.createElement("h5", {
        className: "status-headers admin-status-headers"
      }, secondStatusHeaderText), React.createElement("div", {
        className: "card"
      }, React.createElement("div", {
        className: "card-content"
      }, React.createElement("h5", {
        className: "cairo-font"
      }, "\u20A6", this.convertDecimalToLocaleString(secondHeaderValue)))))), React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "col s12"
      }, React.createElement("div", {
        className: "card"
      }, React.createElement("div", {
        className: "card-content admin-actions-content-container"
      }, content))))));
    }
  }]);

  return Admin;
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
Admin = connect(mapStateToProps, mapDispatchToProps)(Admin);