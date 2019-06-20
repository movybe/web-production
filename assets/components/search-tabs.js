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

var _ReactRedux = ReactRedux,
    connect = _ReactRedux.connect;

var LocalSearchTab =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LocalSearchTab, _React$Component);

  function LocalSearchTab() {
    var _this;

    _classCallCheck(this, LocalSearchTab);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LocalSearchTab).call(this));

    _defineProperty(_assertThisInitialized(_this), "defaultActions", function () {
      var tabs = $('.tabs#tabs');
      tabs.tabs();
      $('.gallery span.modal-link').lightbox();
    });

    _defineProperty(_assertThisInitialized(_this), "saveImage", function (alt, link, src) {
      _this.props.switchWebsite(_objectSpread({}, _this.props, {
        gallery: [].concat(_toConsumableArray(_this.props.gallery), [{
          alt: alt,
          link: link,
          src: src
        }])
      }));

      M.toast({
        html: "image added to your gallery"
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSponsoredAdClicked", function (e) {
      var element = $(e.target);
      var adID = element.attr('data-ad-id');
      var data = {
        action: 'SPONSORED_AD_CLICKED',
        email: defaults.dummyEmail,
        ad_id: adID
      };
      data = JSON.stringify(data);
      $.post(defaults.actions, {
        data: data
      }, function (response) {
        var sponsoredAdsClicked = [].concat(_toConsumableArray(_this.props.sponsoredAdsClicked), [adID]);

        _this.props.switchWebsite(_objectSpread({}, _this.props, {
          sponsoredAdsClicked: sponsoredAdsClicked
        }));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "tabListClickAction", function (name, index) {
      return !_this.props.processingAction ? _this.props.switchToWebsite(name, index) : null;
    });

    return _this;
  }

  _createClass(LocalSearchTab, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props !== nextProps;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this2 = this;

      this.defaultActions();
      var x, sum, price, priceList, adsLength, isOddAdLength, average, priceListLengthDividedBy4, priceListLengthDividedBy2, median, middleSum, firstNPrice, lastNPrice, sumOfFirstNPrice, sumOfLatNPrice, newAdsPriceSum, newPriceList, newPriceListAverage, newSum, sortAdInAscendingOrder, medianPlusMax;
      var locale = this.props.locale;
      var ad1Price, ad2Price;
      locale.forEach(function (local) {
        //Prevent the function from performing same action on same ad page
        if (!local.page || local.page === local.lastSortedPage || !local.ads.length || local.ads.length < 8) return;

        if (!local.shownSponsoredAds) {
          var _local$ads;

          (_local$ads = local.ads).push.apply(_local$ads, _toConsumableArray(_this2.props.sponsoredAds));

          local.shownSponsoredAds = true;
        }

        if (!local.shownSponsoredAds) return;

        sortAdInAscendingOrder = function sortAdInAscendingOrder() {
          local.ads.sort(function (a, b) {
            ad1Price = parseInt(a.price.toString().replace(/\D/g, ''));
            ad2Price = parseInt(b.price.toString().replace(/\D/g, ''));
            return ad1Price - ad2Price;
          });
        };

        isOddAdLength = !!(local.ads.length % 2); //Check if the ad length is an odd number

        priceList = [];
        local.ads.forEach(function (ad) {
          price = parseInt(ad.price.toString().replace(/\D/g, ''));
          priceList.push(price);
        });

        if (isOddAdLength) {
          sum = priceList.reduce(function (prev, next) {
            return prev + next;
          });
          average = Math.round(sum / priceList.length);
          priceList.push(average);
        }

        sortAdInAscendingOrder(); //Sort the priceList

        priceList.sort(function (a, b) {
          return a - b;
        });
        priceListLengthDividedBy2 = priceList.length / 2; //Get the middle numbers of the price

        middleSum = priceList[priceListLengthDividedBy2 - 1] + priceList[priceListLengthDividedBy2];
        median = Math.round(middleSum / 2);
        local.average = numeral(median).format('0.0a');
        local.max = numeral(local.ads[local.ads.length - 1].price).format('0.0a');
        medianPlusMax = median + priceList[priceList.length - 1];
        local.bestOfferInt = parseInt(medianPlusMax / 2);
        local.bestOffer = numeral(local.bestOfferInt.toLocaleString()).format('0.0a'); //To prevent resorting of already sorted ad array

        local.lastSortedPage += 1;
      }); // this.props.switchWebsite({...this.props , locale});

      this.props.switchWebsite(_objectSpread({}, this.props, {
        locale: locale
      }));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.modal = $("#myModal");
      this.defaultActions();
      /*
      if (localStorage.getItem(defaults.savedState)) {
          let cookieObj = JSON.parse(localStorage.getItem(defaults.savedState));
          if(this.props.switchWebsite({...cookieObj , processingAction : false})){
              this.defaultActions();
          }
      }
      */
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var settings = this.props.settings;
      var locale = settings.localSearch ? this.props.locale : this.props.international;
      var active;
      var tabList = locale.map(function (local, index) {
        active = !index ? "active" : "";
        return React.createElement("li", {
          id: local.shortName + "-tab",
          onClick: function onClick() {
            return !_this3.props.processingAction ? _this3.props.switchToWebsite(local.shortName, index) : null;
          },
          key: local.name,
          className: "tab website-list-tabs"
        }, React.createElement("a", {
          href: "#" + local.shortName,
          id: local.shortName + "-tab-link",
          className: "tab-links " + active
        }, React.createElement("img", {
          "data-src": defaults.imageDirectory + local.shortName + '.png',
          className: "responsive-img tab-icons lazyload"
        })));
      });
      var loadMoreButton;
      var tabContainers = locale.map(function (local, pos) {
        loadMoreButton = local.loadMore && !_this3.props.processingAction && local.ads.length ? React.createElement("div", {
          className: "load-more-action-button-wrapper"
        }, React.createElement("span", {
          className: "waves-effect waves-light btn-small load-more-action",
          onClick: function onClick() {
            _this3.props.switchToWebsite(local.shortName, pos, true);
          },
          id: local.shortName + "-load-more-action"
        }, React.createElement("i", {
          className: "material-icons left"
        }, "refresh"), React.createElement("span", null, "More"))) : null;
        loadMoreButton = loadMoreButton === null && !_this3.props.loadMore && !_this3.props.processingAction && local.ads.length ? React.createElement("h5", {
          className: "center-align load-more-error-messages"
        }, defaults.noMoreResultsFoundError + " on " + local.name) : loadMoreButton;
        var showLocation;
        var showImages;
        var showPrice;
        var bg;
        var currency;
        var preloader;
        var averagePrice;
        var sponsoredAdLength = 0;
        var isValidSponsoredAd;
        var seenBestOffer = false;
        var bestOfferClass,
            bestOfferTextClass = "";
        var priceToNumber = 0;
        var template = local.ads.length ? local.ads.map(function (ad, index) {
          priceToNumber = parseInt(ad.price.toString().replace(/,/g, ''));

          if (priceToNumber >= local.bestOfferInt && !seenBestOffer) {
            seenBestOffer = true;
            bestOfferClass = React.createElement("div", {
              className: "best-offer"
            });
            bestOfferTextClass = React.createElement("i", {
              className: "best-offer-text material-icons"
            }, "star");
          } else {
            bestOfferClass = "", bestOfferTextClass = "";
          }

          var savedImage;
          var imageSaved = false;
          savedImage = _this3.props.gallery.find(function (imageObject, index) {
            return ad.image === imageObject.src;
          });
          imageSaved = savedImage !== undefined;
          bg = "".concat(ad.image);
          showImages = _this3.props.settings.showImages && ad.image != null ? React.createElement("span", {
            className: "modal-link",
            "data-caption": ad.title,
            href: ad.image
          }, React.createElement("div", {
            className: "image-container",
            onClick: imageSaved ? null : function () {
              _this3.saveImage(ad.title, ad.link, ad.image);
            },
            "data-image": ad.image
          }, bestOfferClass, React.createElement("div", {
            className: "blurred-bg lazyload",
            "data-bgset": bg
          }), React.createElement("div", {
            className: "lazyload overlay",
            "data-bgset": bg,
            title: ad.title,
            onClick: function onClick() {
              return imageSaved ? null : null;
            }
          }))) : null;
          isValidSponsoredAd = ad.is_sponsored_ad && _this3.props.sponsoredAdsClicked.indexOf(ad.ad_id) < 0;
          currency = _this3.props.settings.localSearch ? React.createElement("span", null, "\u20A6") : React.createElement("span", null, "$");
          showPrice = ad.price !== 0 ? React.createElement("h6", {
            className: "green-text search-result-price"
          }, currency, ad.price, bestOfferTextClass) : React.createElement("h5", {
            className: "green-text search-result-price"
          }, defaults.priceNotSpecifiedText);
          showPrice = ad.is_sponsored_ad ? React.createElement("h6", {
            className: "green-text search-result-price"
          }, defaults.sponsoredAdText) : showPrice;
          showLocation = ad.location.length ? React.createElement("span", {
            className: "search-result-locations blue-grey-text"
          }, React.createElement("i", {
            className: "tiny material-icons search-location-icons"
          }, "location_on"), ad.location) : null;
          return React.createElement("div", {
            className: "search-result",
            key: Math.random()
          }, showPrice, React.createElement("h3", {
            className: "search-result-title-header"
          }, React.createElement("a", {
            target: "_blank",
            "data-ad-id": isValidSponsoredAd ? ad.ad_id : null,
            onClick: isValidSponsoredAd ? _this3.handleSponsoredAdClicked : null,
            className: "search-result-title-link",
            href: ad.link
          }, ad.title)), React.createElement("a", {
            className: "search-result-link-address",
            href: "#"
          }, ad.linkText), React.createElement("span", {
            className: "search-result-link-description"
          }, ad.description), showImages, React.createElement("a", {
            download: ad.title,
            target: "_blank",
            href: ad.image,
            className: "image-download-link search-result-images blue-text"
          }, React.createElement("i", {
            className: "tiny material-icons search-image-icons"
          }, "image"), " ", imageSaved ? "Image Saved" : "Save Image"), showLocation);
        }) : null;
        var boldedQuery = React.createElement("strong", null, _this3.props.query);
        template = template === null && local.page && !_this3.props.processingAction ? React.createElement("h5", {
          className: "center-align load-more-error-messages"
        }, defaults.noResultsFoundError + " for \"", boldedQuery, "\" on ".concat(local.name)) : template;
        preloader = template === null && _this3.props.processingAction ? React.createElement("div", {
          className: "container " + defaults.searchResultPreloaders,
          id: local.shortName + "-" + defaults.searchResultPreloader
        }, React.createElement("div", {
          className: "circular-container"
        }, React.createElement("div", {
          className: "circle circular-loader1"
        }, React.createElement("div", {
          className: "circle circular-loader2"
        })))) : null;
        template = template === null && _this3.props.processingAction ? React.createElement("h5", {
          className: "center-align load-more-error-messages"
        }, defaults.pleaseWaitText) : template;
        averagePrice = local.average !== 0 ? React.createElement("span", {
          className: "average-price right"
        }, React.createElement("span", {
          className: "market-price"
        }, "Mkt Price:"), " \u20A6", local.average, " - \u20A6", local.max, " ") : null;
        return React.createElement("div", {
          id: local.shortName,
          className: "col s12 gallery",
          key: local.name
        }, React.createElement("p", {
          className: "flow-text",
          style: {
            color: local.textColor
          }
        }, local.name, " ", averagePrice), preloader, React.createElement("div", {
          id: local.shortName + searchResults
        }, template, loadMoreButton));
      });
      return React.createElement("div", {
        id: "local-search-tab-container",
        className: "search-tabs"
      }, React.createElement("ul", {
        id: "tabs",
        className: "tabs locale-tabs tabs-fixed-width tab-demo z-depth-1"
      }, tabList), tabContainers);
    }
  }]);

  return LocalSearchTab;
}(React.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    switchWebsite: function switchWebsite(state) {
      return dispatch({
        type: 'SWITCH_WEBSITE',
        state: state
      });
    }
  };
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  return _objectSpread({}, state, ownProps);
};

LocalSearchTab = connect(mapStateToProps, mapDispatchToProps)(LocalSearchTab);