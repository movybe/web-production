"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ReactRedux = ReactRedux,
    connect = _ReactRedux.connect;

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return _objectSpread({}, state, ownProps);
};

var AffiliateHeader =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AffiliateHeader, _React$Component);

  function AffiliateHeader() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AffiliateHeader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AffiliateHeader)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "faqs", [{
      question: "What is ".concat(defaults.siteName),
      answer: "".concat(defaults.siteName, " is Nigeria's first price/product Search engine, \n             we in-corporate Best Advertisement  programme into our product.")
    }, {
      question: "What is ".concat(defaults.siteName, " Affiliate programme"),
      answer: "".concat(defaults.siteName, " affiliate allows members to earn income from home, \n            at the comfort of their bed room, by  simply referring their friends/family to ").concat(defaults.siteName, ".")
    }, {
      question: "How can i refer friends/family to ".concat(defaults.siteName),
      answer: "It's very simple, just share your username with your friends when they signup. they simply input your username as their referer, it's as simple as that."
    }, {
      question: "Why is my account deactivated",
      answer: React.createElement("span", null, "When your account is deactivated,it simply means you have earned more than ", React.createElement("span", {
        className: "strong"
      }, "\u20A6", defaults.thresholdAmount), " in the last 30 days. therefore you're required to re-activate your account with a new referer username this time, different from your old referer.")
    }, {
      question: "How long does my account activation last",
      answer: React.createElement("span", null, "Your account will only be de-activated if You've earned more than ", React.createElement("span", {
        className: "strong"
      }, "\u20A6", defaults.thresholdAmount), " in the last 30 days. ", React.createElement("q", {
        className: "light strong"
      }, "else your account remains active"))
    }, {
      question: "What other way can i earn with ".concat(defaults.siteName),
      answer: React.createElement("span", null, "You can also earn when you invite your friends to ", defaults.siteName, " by sharing your invitation link: ", React.createElement("a", {
        className: "red-text strong",
        href: "#"
      }, defaults.siteAddressHttps + "/r/" + _this.props.user.username), " with your friends.", React.createElement("br", null), "you get paid ", React.createElement("span", {
        className: "strong"
      }, "\u20A6", defaults.amountPaidForUniqueVisitor), " for each unique visitor that visits that url.")
    }]);

    _defineProperty(_assertThisInitialized(_this), "mobileNavs", function () {
      return React.createElement("ul", {
        className: "sidenav",
        id: "mobile-nav"
      }, _this.navContents());
    });

    _defineProperty(_assertThisInitialized(_this), "handleNavClick", function (e) {
      _this.headerNav.removeClass('active');

      if ($(e.target).parent("li")) {
        $(e.target).parent("li").addClass("active");
      }
    });

    _defineProperty(_assertThisInitialized(_this), "defaultAction", function () {
      _this.faqModalPopUp = $('.modal#faq-modal');
      _this.tosModalPopUp = $('.modal#tos-modal');
      _this.demoModalPopUp = $('.modal#demo-modal');
      _this.withdrawalModalPopup = $('.modal#withdrawal-modal');

      _this.faqModalPopUp.modal({
        dismissible: false
      });

      _this.tosModalPopUp.modal({
        dismissible: false
      });

      _this.demoModalPopUp.modal({
        dismissible: false
      });

      _this.withdrawalModalPopup.modal({
        dismissible: false
      });
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

    _defineProperty(_assertThisInitialized(_this), "logout", function () {
      if (_this.props.factoryReset()) {
        window.location.reload();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleWithdrawalForm", function (e) {
      e.preventDefault();

      if (_this.withdrawalForm.valid()) {
        var _this$withdrawalField;

        var amount = parseInt(_this.withdrawalAmount.val()) - defaults.withdrawalCharge;
        var email = _this.props.email;
        var action = 'AFFILIATE_WITHDRAWAL';
        var withdrawalCharge = defaults.withdrawalCharge;
        var data = {
          amount: amount,
          email: email,
          action: action,
          withdrawal_charge: withdrawalCharge
        };
        data = JSON.stringify(data);

        (_this$withdrawalField = _this.withdrawalFieldSet).prop.apply(_this$withdrawalField, _toConsumableArray(defaults.disabledTrue));

        $.post(defaults.actions, {
          data: data
        }, function (response) {
          var _this$withdrawalField2;

          response = JSON.parse(response);

          _this.withdrawalResponseMessage.text(response.error);

          _this.withdrawalResponseMessage.show();

          defaults.showToast(response.error);

          (_this$withdrawalField2 = _this.withdrawalFieldSet).prop.apply(_this$withdrawalField2, _toConsumableArray(defaults.disabledFalse));

          if (response.success) {
            _this.withdrawalResponseMessage.removeClass('red-text');

            _this.withdrawalResponseMessage.addClass('green-text');

            _this.withdrawalAmount.val(null);

            _this.withdrawalModalPopup.modal('close');

            _this.refreshProfile();
          } else {
            _this.withdrawalResponseMessage.removeClass('green-text');

            _this.withdrawalResponseMessage.addClass('red-text');
          }

          setTimeout(function () {
            _this.withdrawalResponseMessage.text(null);

            _this.withdrawalResponseMessage.hide();
          }, 5000);
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "componentDidUpdate", function () {
      //Initialize the Modals
      _this.defaultAction();
    });

    _defineProperty(_assertThisInitialized(_this), "navContents", function () {
      return React.createElement("div", null, React.createElement("li", {
        className: "active header-nav"
      }, React.createElement("a", {
        href: "#",
        onClick: _this.handleNavClick
      }, React.createElement("i", {
        className: "material-icons small left"
      }, "home"), "Home")), React.createElement("li", {
        className: "header-nav"
      }, React.createElement("a", {
        href: "#faq-modal",
        className: "modal-trigger",
        onClick: _this.handleNavClick
      }, React.createElement("i", {
        className: "material-icons small left"
      }, "question_answer"), "Faq's", React.createElement("span", {
        className: "new badge blue notification-badge",
        "data-badge-caption": "Must read"
      }))), React.createElement("li", {
        className: "header-nav"
      }, React.createElement("a", {
        className: "modal-trigger",
        onClick: _this.handleNavClick,
        href: "#tos-modal"
      }, React.createElement("i", {
        className: "material-icons small left"
      }, "assignment"), "Terms", React.createElement("span", {
        className: "new badge play-badge",
        "data-badge-caption": "updated"
      }))), React.createElement("li", null, React.createElement("a", {
        onClick: _this.handleNavClick,
        href: defaults.whatsappContactLink
      }, React.createElement("i", {
        className: "material-icons small left"
      }, "message"), defaults.whatsappContact), " "), React.createElement("li", {
        className: "header-nav tourJS affiliate-account-tour tour-1",
        "data-step": "1",
        "data-caption": "Always click here to withdraw your money, anytime."
      }, React.createElement("a", {
        className: "modal-trigger",
        href: "#withdrawal-modal"
      }, React.createElement("i", {
        className: "material-icons small left"
      }, "payment"), "Withdraw")), React.createElement("li", {
        className: "tourJS affiliate-account-tour tour-2",
        "data-step": "2",
        "data-caption": "You can always logout anytime by clicking here."
      }, React.createElement("a", {
        onClick: _this.logout,
        href: "#"
      }, React.createElement("i", {
        className: "material-icons small left"
      }, "power_settings_new"), "Logout"), " "));
    });

    _defineProperty(_assertThisInitialized(_this), "withdrawalModal", function () {
      return React.createElement("div", {
        id: "withdrawal-modal",
        className: "modal modal-fixed-footer"
      }, React.createElement("div", {
        className: "modal-content"
      }, React.createElement("fieldset", {
        id: "withdrawal-fieldset"
      }, React.createElement("form", {
        id: "withdrawal-form",
        method: "POST",
        action: "#",
        onSubmit: _this.handleWithdrawalForm
      }, React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("h5", null, "Your bank details"), React.createElement("span", {
        id: "account-name",
        className: "bank-account-details"
      }, _this.props.user.account_name.truncate(defaults.accountNameLengthToShow)), React.createElement("span", {
        id: "account-number",
        className: "bank-account-details"
      }, _this.props.user.account_number.toString().substr(0, 3) + '...' + _this.props.user.account_number.toString().substr(7, 3)), React.createElement("span", {
        id: "bank-name",
        className: "bank-account-details"
      }, _this.props.user.bank_name), React.createElement("span", {
        className: "right"
      }, "Account Bal: ", React.createElement("span", {
        className: "strong"
      }, "\u20A6 ", _this.props.user.account_balance.toLocaleString()), " "))), React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("input", {
        id: "withdrawal-amount",
        pattern: "(\\d)$",
        required: "required",
        name: "withdrawal-amount",
        type: "number",
        min: defaults.minimumWithdrawalAmount,
        className: "validate"
      }), React.createElement("label", {
        htmlFor: "withdrawal-amount",
        className: "active"
      }, "Amount"), React.createElement("span", {
        className: "helper-text",
        id: "withdrawal-response-message"
      }), React.createElement("button", {
        type: "submit",
        id: "withdrawal-submit-button",
        className: "waves-effect waves-light btn-small"
      }, "Proceed"), React.createElement("span", {
        className: "helper-text right",
        id: "withdrawal-charge-message"
      }, "QuickTeller will charge ", React.createElement("span", {
        className: "strong"
      }, "\u20A6", defaults.withdrawalCharge), " for this transfer.")))))), React.createElement("div", {
        className: "modal-footer"
      }, React.createElement("a", {
        href: "#",
        onClick: function onClick() {
          _this.withdrawalModalPopup.modal('close');
        },
        className: "modal-close waves-effect waves-green btn-flat no-underline strong light"
      }, "CLOSE")));
    });

    _defineProperty(_assertThisInitialized(_this), "webNavs", function () {
      return React.createElement("div", {
        className: "site-header"
      }, React.createElement("nav", null, React.createElement("div", {
        className: "nav-wrapper"
      }, React.createElement("a", {
        href: "#",
        "data-target": "mobile-nav",
        className: "sidenav-trigger"
      }, React.createElement("i", {
        className: "material-icons"
      }, "menu")), React.createElement("a", {
        href: "#",
        onClick: function onClick(e) {
          e.preventDefault();
          tourJS.start('affiliate-account-tour');
        },
        className: "brand-logo  right watch-demo-video"
      }, "Hi, ", _this.props.user.username.capitalize()), React.createElement("ul", {
        className: "left hide-on-med-and-down"
      }, _this.navContents()))));
    });

    _defineProperty(_assertThisInitialized(_this), "faqModal", function () {
      var faqsQuestionsAndAnswers = _this.faqs.map(function (faq) {
        return React.createElement("div", {
          key: Math.random()
        }, React.createElement("h6", {
          className: "faq-question"
        }, faq.question, "?"), React.createElement("p", {
          className: "faq-answer"
        }, faq.answer));
      });

      return React.createElement("div", {
        id: "faq-modal",
        className: "modal modal-fixed-footer"
      }, React.createElement("div", {
        className: "modal-content"
      }, React.createElement("h5", null, "Our Frequently asked Questions"), faqsQuestionsAndAnswers), React.createElement("div", {
        className: "modal-footer"
      }, React.createElement("a", {
        href: "#",
        onClick: function onClick() {
          _this.faqModalPopUp.modal('close');
        },
        className: "modal-close waves-effect waves-green btn-flat no-underline strong light"
      }, "OK, I've read it")));
    });

    _defineProperty(_assertThisInitialized(_this), "demoModal", function () {
      return React.createElement("div", {
        id: "demo-modal",
        className: "modal modal-fixed-footer"
      }, React.createElement("div", {
        className: "modal-content"
      }, React.createElement("h5", null, "Tour Guide"), React.createElement("div", {
        className: "video-container"
      }, React.createElement("iframe", {
        width: "1102",
        height: "620",
        src: defaults.affiliateTourGuide,
        frameBorder: "0",
        allowFullScreen: true
      }))), React.createElement("div", {
        className: "modal-footer"
      }, React.createElement("a", {
        href: "#",
        onClick: function onClick() {
          _this.demoModalPopUp.modal('close');
        },
        className: "modal-close waves-effect waves-green btn-flat no-underline strong light"
      }, "Close")));
    });

    _defineProperty(_assertThisInitialized(_this), "tosModal", function () {
      return React.createElement("div", {
        id: "tos-modal",
        className: "modal modal-fixed-footer"
      }, React.createElement("div", {
        className: "modal-content"
      }, React.createElement("h5", null, "Our Terms Of Service(\"Terms\")"), React.createElement("h6", {
        className: "faq-question"
      }, " Last updated: 27-12-2018"), React.createElement("br", null), React.createElement("br", null), React.createElement("p", null, "Please read these Terms and Conditions (\"Terms\", \"Terms and Conditions\") carefully before using the website ", defaults.siteAddressHttp, " and mobile application (the \"Service\") operated by ", defaults.siteAddress, " (\"us\", \"we\", or \"our\").", React.createElement("br", null), React.createElement("br", null), "Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.", React.createElement("br", null), React.createElement("br", null), "By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.", React.createElement("br", null), React.createElement("br", null)), React.createElement("h6", {
        className: "faq-question"
      }, "Payments"), React.createElement("p", null, "All payments made on this website (", defaults.siteAddressHttp, ") are non-refundable, we are not held responsible for any damage as a result of payment on this website."), React.createElement("h6", {
        className: "faq-question"
      }, "Subscription (Affiliate)"), React.createElement("p", null, "Some parts of the Service are billed on a subscription basis i.e Affiliate  (\"Subscription(s)\"). You will be billed in advance on a recurring", React.createElement("br", null), React.createElement("br", null), "While we make every effort to ensure that we accurately represent all the products and services reviewed on ", defaults.siteAddress, " affiliate Income Program and their potential for income, it should be noted that earnings and income statements made by ", defaults.siteAddress, " and its advertisers / sponsors are estimates only of what we think you can possibly earn. There is no guarantee that you will make these levels of income and you accept the risk that the earnings and income statements differ by individual.", React.createElement("br", null), React.createElement("br", null), "As with any business, your results may vary, and will be based on your individual capacity, business experience, expertise, and level of desire. There are no guarantees concerning the level of success you may experience. The testimonials and examples used are exceptional results, which do not apply to the average purchaser, and are not intended to represent or guarantee that anyone will achieve the same or similar results. Each individual\u2019s success depends on his or her background, dedication, desire and motivation.", React.createElement("br", null), React.createElement("br", null), "There is no assurance that examples of past earnings can be duplicated in the future. We cannot guarantee your future results and/or success. There are some unknown risks in business and on the internet that we cannot foresee which could reduce results you experience. We are not responsible for your actions.", React.createElement("br", null), React.createElement("br", null), "The use of our information, products and services should be based on your own due diligence and you agree that ", defaults.siteAddress, " and the advertisers / sponsors of this website are not liable for any success or failure of your business that is directly or indirectly related to the purchase and use of our information, products and services reviewed or advertised on this website.", React.createElement("br", null), React.createElement("br", null), "All Affiliate accounts older than 6 Months , with a net profit of more than ", React.createElement("strong", null, "\u20A6", defaults.minimumAffliateProfit), " are subject to been deactivated."), React.createElement("h6", {
        className: "faq-question"
      }, "Terms of Participation (Affiliate)"), React.createElement("p", null, "Members must be 18 years of age or older to participate. Members must provide ", defaults.siteAddress, " affiliate Income Program with accurate, complete and updated registration information, including an accurate account name , bank name , account number  and email address. To the full extent allowed by applicable law, ", defaults.siteAddress, " affiliate Income Program at its sole discretion and for any or no reason may refuse to accept applications for membership."), React.createElement("h6", {
        className: "faq-question"
      }, "Refund Policy(Affiliate)"), React.createElement("p", {
        className: "strong light"
      }, "As we are offering non-tangible virtual digital goods (", defaults.siteAddress, " affiliate Pack) which is form of registration fee , we do not generally issue refunds after the purchase of ", defaults.siteAddress, " affiliate Pack has been made. Please note that by purchasing the ", defaults.siteAddress, " affiliate Pack, you agree to the terms of the Refund Policy."), React.createElement("p", null, "Member\u2019s discontinued participation in the ", defaults.siteAddress, " Income Program or failure to notify ", defaults.siteAddress, " Income Program of any address (mailing or email) changes may result in the termination of Member\u2019s membership and forfeiture of Member\u2019s unredeemed Earnings.", React.createElement("br", null), React.createElement("br", null), "If member objects to any of the Terms and Conditions of this Agreement, or any subsequent modifications to this agreement, or becomes dissatisfied with the Program, Member\u2019s only recourse is to immediately discontinue participation in ", defaults.siteAddress, " Income Program and properly terminate his or her membership."), React.createElement("h5", null, "Disclaimers"), "MEMBER EXPRESSLY AGREES THAT USE OF THE SERVICE IS AT MEMBER\u2019S SOLE RISK. THE SERVICE IS PROVIDED ON AN \u201CAS IS\u201D AND \u201CAS AVAILABLE\u201D BASIS. TO THE MAXIMUM EXTENT ALLOWED BY APPLICABLE LAW, ", defaults.siteAddress, " affiliate program EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED BY LAW, CUSTOM OR OTHERWISE, INCLUDING WITHOUT LIMITATION ANY WARRANTY OF MERCHANTABILITY, SATISFACTORY QUALITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT. ", defaults.siteAddress, " affiliate program MAKES NO WARRANTY REGARDING ANY GOODS OR SERVICES PURCHASED OR OBTAINED THROUGH THE PROGRAM OR ANY TRANSACTIONS ENTERED INTO THROUGH THE PROGRAM.", React.createElement("br", null), React.createElement("br", null), "TO THE MAXIMUM EXTENT ALLOWED BY APPLICABLE LAW, NEITHER ", defaults.siteAddress, " affiliate program NOR ANY OF ITS MEMBERS, SUBSIDIARIES, PUBLISHERS, SERVICE PROVIDERS, LICENSORS, OFFICERS, DIRECTORS OR EMPLOYEES SHALL BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR RELATING TO THIS AGREEMENT, RESULTING FROM THE USE OR THE INABILITY TO USE THE SERVICE OR FOR THE COST OF PROCUREMENT OF SUBSTITUTE GOODS AND SERVICES OR RESULTING FROM ANY GOODS OR SERVICES PURCHASED OR OBTAINED OR MESSAGES RECEIVED OR TRANSACTIONS ENTERED INTO THROUGH THE PROGRAM OR RESULTING FROM UNAUTHORIZED ACCESS TO OR ALTERATION OF USER\u2019S TRANSMISSIONS OR DATA, INCLUDING BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS, USE, DATA OR OTHER INTANGIBLE, EVEN IF SUCH PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.", React.createElement("br", null), React.createElement("br", null), "To prevent unauthorized access, maintain data accuracy, and ensure the correct use of information, ", defaults.siteAddress, " affiliate program uses appropriate industry standard procedures to safeguard the confidentiality of Member\u2019s personal information, such as SSL, firewall, encryption, token authentication, application proxies, monitoring technology, and adaptive analysis of the Website\u2019s traffic to track abuse of the ", defaults.siteAddress, " Income Website and its data. However, no data transmitted over the Internet can be 100% secure. As a result, while ", defaults.siteAddress, " affiliate program strives to protect its Members personal information, ", defaults.siteAddress, " affiliate program cannot guarantee the security of any information that Members transmit to or from the participating advertisers/merchants and Member does so at his/her own risk.", React.createElement("br", null), React.createElement("br", null), "This Agreement constitutes the entire Agreement between Member and ", defaults.siteAddress, " affiliate program in connection with general membership in the ", defaults.siteAddress, " affiliate program and supersedes all prior agreements between the parties regarding the subject matter contained herein. If any provision of this AGREEMENT is found invalid or unenforceable, that provision will be enforced to the maximum extent permissible, and the other provisions of this AGREEMENT will remain in force. No failure of either party to exercise or enforce any of its rights under this AGREEMENT will act as a waiver of such rights. ", React.createElement("br", null), React.createElement("br", null)), React.createElement("div", {
        className: "modal-footer"
      }, React.createElement("a", {
        href: "#",
        onClick: function onClick() {
          _this.tosModalPopUp.modal('close');
        },
        className: "modal-close waves-effect waves-green btn-flat no-underline strong light"
      }, "OK, I've accepted")));
    });

    return _this;
  }

  _createClass(AffiliateHeader, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      //Initialize the sidenavs
      $('.sidenav').sidenav();
      this.headerNav = $('li.header-nav');
      this.withdrawalForm = $('#withdrawal-form');
      this.withdrawalFieldSet = $('#withdrawal-fieldset');
      this.withdrawalAmount = $('#withdrawal-amount');
      this.withdrawalResponseMessage = $('#withdrawal-response-message');
      this.defaultAction();
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "header"
      }, this.faqModal(), this.tosModal(), this.demoModal(), this.webNavs(), this.mobileNavs(), this.withdrawalModal());
    }
  }]);

  return AffiliateHeader;
}(React.Component);

AffiliateHeader = connect(mapStateToProps)(AffiliateHeader);