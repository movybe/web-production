"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _ReactRedux = ReactRedux,
    connect = _ReactRedux.connect;

var mapStateToProps = function mapStateToProps(state, ownProps) {
    return { ...state,
        ...ownProps
    };
};

var MerchantHeader =
    /*#__PURE__*/
    function (_React$Component) {
        _inherits(MerchantHeader, _React$Component);

        function MerchantHeader() {
            var _getPrototypeOf2;

            var _this;

            _classCallCheck(this, MerchantHeader);

            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MerchantHeader)).call.apply(_getPrototypeOf2, [this].concat(args)));

            _defineProperty(_assertThisInitialized(_this), "faqs", [{
                question: "What is ".concat(defaults.siteName),
                answer: "".concat(defaults.siteName, " is Nigeria's first price/product Search engine, \n             we in-corporate Best Advertisement  programme into our product.")
            }, {
                question: "What is a Merchant account",
                answer: "A merchant account is an account created solely for advertisers,businesses & individuals \n             who wants to ensure  their products/services reaches Millions of Nigerians without leaving a hole in their pocket."
            }, {
                question: "Does our Ad rates consider SME's , individuals and small businesses",
                answer: "Yes, and Yes again, our ad rates are very affordable, we have also taken into consideration, \n            Students and small income earners to leverage this opportunity to advertise their product/services at a very low price."
            }, {
                question: "Why is my account deactivated",
                answer: React.createElement("span", null, "New Merchant accounts are deactivated by default, therefore are required to activate their account with a one-time(", React.createElement("strong", null, "non-refundable"), ") fee of ", React.createElement("strong", null, "\u20A6", defaults.merchantActivationFee), " , doing this means You've read and agreed to our Terms/Conditions of service.")
            }, {
                question: "How long does my activation last",
                answer: React.createElement("span", null, "The activation fee is a one-time payment, in other words,  it's just once, and you're ", React.createElement("q", {
                    className: "light strong"
                }, " forever activated."))
            }, {
                question: "What kind of Ads are not supported on ".concat(defaults.siteName),
                answer: React.createElement("span", null, "We reject ads for health remedies that make claims that have not been verified by NAFDAC because we know that they don't work as advertised.", React.createElement("br", null), "We also reject mailing list building ads because we don't want our members to be spammed.", React.createElement("br", null), "Sexual ads are also not supported and ads labelled with ", React.createElement("q", {
                    className: "strong"
                }, "Sugar Mummy"), " and ", React.createElement("q", {
                    className: "strong"
                }, "Sugar Daddy"), " are also not allowed at all.")
            }, {
                question: "If my ad gets Rejected, what happens to my money",
                answer: React.createElement("span", null, "Merchants are required to modify the content of the Ad that goes against our Ad policy,", React.createElement("br", null), "either the title of the Ad , landing page or the Ad image.", React.createElement("br", null), "once the Ad detail have been Modified, you're expected to wait for about 5 mins for approval.", React.createElement("br", null), "Once approved, your ad is good to go.")
            }, {
                question: "Can i submit an animated image as banner",
                answer: React.createElement("span", null, "No. This is because they are distracting. If your ads are attractive and well targeted, people will notice them without any animations.")
            }, {
                question: "How much does ".concat(defaults.siteName, " charge Merchants for Ads"),
                answer: "Our Ad rates depends on the type of Ad you want to display , the different types of Ads and their rate are further discussed below."
            }, {
                question: "What is PPV (pay per view)",
                answer: "Our Pay per view Ad option describes how much an Advertiser pays each time his/her Ad is shown to a user."
            }, {
                question: "What is PPC (pay per click)",
                answer: 'Our Pay per click option describes how much an Advertiser pays each time his/her Ad is clicked.'
            }, {
                question: "What is ".concat(defaults.siteName, " Publisher/Affiliate Program"),
                answer: "This is the easiest way Advertisers/Merchants and Big Companies can spread viral Ads \n            without spending Millions of Naira on Tv Commercials.  the Ads are simply given to our users,\n            who had signed up for our affiliate account , to post on their various social media accounts, creating an avenue for\n             easy dissemination of information in the most fashionable way."
            }, {
                question: "What is PPA (Pay per Affiliate)",
                answer: "Pay per Affiliate a.k.a (PPA) is the amount ".concat(defaults.siteName, " charges when one of our Affiliate account users\n            \n            posts a unique Ad on his/her social media platform,  this charge is dependent on various factors and Algorithms which we have devised,\n            to ensure Advertisers get value for their Money.             ")
            }, {
                question: "Why is there no password authentification",
                answer: React.createElement("span", null, "If you've paid attention to this website You'd notice that we do not require passwords for authentification.", React.createElement("br", null), "The reason for this decision is because of the fact that, users gaining access to your account, have nothing to gain, since all the actions require payments.", React.createElement("br", null), "all that is required to login to your account is simply your account email address which in turn, leads to a more convinient login process.")
            }, {
                question: "How many ad space do i have as a merchant",
                answer: React.createElement("span", null, "All merchant account owners are entitled to ", React.createElement("q", {
                    className: "strong light"
                }, "2(two) ad space"), " only.", React.createElement("br", null), "This is to prevent ad space monopoly by big companies , who have all the money to throw around, thereby preventing small businesses from seeing the light of the day.")
            }, {
                question: "Are there any discounts",
                answer: React.createElement("span", null, "No, our ad rates are too cheap for we to consider offering discounted ads.")
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

                _this.faqModalPopUp.modal({
                    dismissible: false
                });

                _this.tosModalPopUp.modal({
                    dismissible: false
                });

                _this.demoModalPopUp.modal({
                    dismissible: false
                });
            });

            _defineProperty(_assertThisInitialized(_this), "logout", function () {
                if (_this.props.factoryReset()) {
                    window.location.reload();
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
                }, "assignment"), "Terms of service ", React.createElement("span", {
                    className: "new badge play-badge",
                    "data-badge-caption": "updated"
                }))), React.createElement("li", null, React.createElement("a", {
                    onClick: _this.handleNavClick,
                    href: defaults.whatsappContactLink
                }, React.createElement("i", {
                    className: "material-icons small left"
                }, "message"), defaults.whatsappContact), " "), React.createElement("li", null, React.createElement("a", {
                    onClick: _this.logout,
                    href: "#"
                }, React.createElement("i", {
                    className: "material-icons small left"
                }, "power_settings_new"), "Logout"), " "));
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
                    href: "#demo-modal",
                    className: "brand-logo  right watch-demo-video modal-trigger"
                }, "Watch Demo Video"), React.createElement("ul", {
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
                }, React.createElement("h5", null, "Watch our Demo Video"), React.createElement("div", {
                    className: "video-container"
                }, React.createElement("iframe", {
                    width: "1102",
                    height: "620",
                    src: defaults.merchantTourGuide,
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

        _createClass(MerchantHeader, [{
            key: "shouldComponentUpdate",
            value: function shouldComponentUpdate(nextProps, nextState) {
                return this.props !== nextProps;
            }
        }, {
            key: "componentDidMount",
            value: function componentDidMount() {
                //Initialize the sidenavs
                $('.sidenav').sidenav();
                this.headerNav = $('li.header-nav');
                this.defaultAction();
            }
        }, {
            key: "render",
            value: function render() {
                return React.createElement("div", {
                    className: "header"
                }, this.faqModal(), this.tosModal(), this.demoModal(), this.webNavs(), this.mobileNavs());
            }
        }]);

        return MerchantHeader;
    }(React.Component);

MerchantHeader = connect(mapStateToProps)(MerchantHeader);