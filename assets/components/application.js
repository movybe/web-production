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

var Application =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Application, _React$Component);

  function Application() {
    var _this;

    _classCallCheck(this, Application);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Application).call(this));

    _defineProperty(_assertThisInitialized(_this), "lastSearchQuery", null);

    _defineProperty(_assertThisInitialized(_this), "formSubmitted", false);

    _defineProperty(_assertThisInitialized(_this), "cookiesQueryKey", "queries");

    _defineProperty(_assertThisInitialized(_this), "enabledFormFieldSet", ["disabled", false]);

    _defineProperty(_assertThisInitialized(_this), "disabledFormFieldSet", ["disabled", true]);

    _defineProperty(_assertThisInitialized(_this), "lastSearchedQueryKey", "lastSearchedQuery");

    _defineProperty(_assertThisInitialized(_this), "enterValidKeywordsWarning", "Please enter valid keyword(s)");

    _defineProperty(_assertThisInitialized(_this), "networkError", "failed to receive response, check your network connection");

    _defineProperty(_assertThisInitialized(_this), "updateSearchResultAction", 'UPDATE_SEARCH_RESULT');

    _defineProperty(_assertThisInitialized(_this), "getRandomUserAgent", function () {
      var desktop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var DesktopUserAgentStrings = ["Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36", "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:70.0) Gecko/20100101 Firefox/70.0", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3763.0 Safari/537.36 Edg/75.0.131.0", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 UBrowser/7.0.185.1002 Safari/537.36"];
      var mobileUserAgentStrings = ["Mozilla/5.0 (Linux; <Android Version>; <Build Tag etc.>) AppleWebKit/<WebKit Rev> (KHTML, like Gecko) Chrome/<Chrome Rev> Mobile Safari/<WebKit Rev>", "Mozilla/5.0 (Android; Mobile; rv:40.0) Gecko/40.0 Firefox/40.0"];
      var platformArray = desktop ? DesktopUserAgentStrings : mobileUserAgentStrings;
      return platformArray[Math.floor(Math.random() * platformArray.length)];
    });

    _defineProperty(_assertThisInitialized(_this), "getRandomCrawler", function () {
      var crawlers = ["https://nypd1.000webhostapp.com/crawler.php", "https://nypd2.000webhostapp.com/crawler.php", "https://nypd4.000webhostapp.com/crawler.php", "https://nypd5.000webhostapp.com/crawler.php", "https://nypd6.000webhostapp.com/crawler.php", defaults.crawler];
      return crawlers[Math.floor(Math.random() * crawlers.length)];
    });

    _defineProperty(_assertThisInitialized(_this), "getRequestObject", function (url) {
      var desktop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return {
        url: url,
        mode: 'native',
        send_cookies: true,
        send_session: true,
        user_agent_string: _this.getRandomUserAgent(desktop)
      };
    });

    _defineProperty(_assertThisInitialized(_this), "switchToWebsite", function (website) {
      var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var loadMore = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var backup = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var isfirstSearch = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var queryObject = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      var callback = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;

      // here i want to find the E-commerce website object from the props using the "website" parameter
      var selectedEcommerce = _this.props.locale.find(function (local, pos) {
        index = pos; // if the current E-commerce shortName is equal to the "website" parameter sent to the function

        return local.shortName === website;
      });
      /*
      The function below warns the user of two possible error outcomes:
      1. a network Error, meaning that there was no response at all from the server
      2. a result Error , ,meaning that the search query did not return any result
      */


      var showError = function showError() {
        var networkError = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        selectedEcommerce.error = defaults.noDataError;
        selectedEcommerce.page = selectedEcommerce.page + 1;
        selectedEcommerce.loadMore = false;
        _this.props.locale[index] = selectedEcommerce;

        if (_this.props.switchWebsite(_objectSpread({}, _this.props, {
          processingAction: false,
          locale: _this.props.locale,
          currentWebsite: website
        }))) {
          return networkError ? M.toast({
            html: defaults.networkError
          }) : M.toast({
            html: _this.enterValidKeywordsWarning
          });
        }
      };

      var getTitles = function getTitles(ads) {
        var titles = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        ads.forEach(function (ad) {
          titles.push(ad.title);
        });
      };
      /*
      query : "samsung galaxy s7 edge"
      q : "samsung+galaxy+s7+edge" //default query type for most modern E-commerce websites
       */


      var _ref = isfirstSearch ? queryObject : _this.props,
          query = _ref.query,
          q = _ref.q; //increments the pageNumber so that it can pass it to the search url
      // e.g if the previous page for olx = 1
      // the new page number becomes 2
      // the new value (which is 2) is then parsed to the search url of the website


      var pageNumber = selectedEcommerce.page + 1;
      /*
      Check if this tab had already been clicked , meaning content has either loaded or is still loading
      to prevent this function from being recursive
      */

      if (!isfirstSearch && !loadMore && selectedEcommerce.page > 0 && !backup) {
        /*
        Since the user had clicked on this current tab
        if the "currentWebsite" property of the store is not equal to
        the "website" paramater, set the "currentWebsite" key of the state
        to the parameter "website";
        */
        if (_this.props.currentWebsite !== website) {
          _this.props.switchWebsite(_objectSpread({}, _this.props, {
            currentWebsite: website
          }));
        } //Then,  return to prevent a recursion of this function


        return;
      }
      /*
      Sets the "currentWebsite" key of the props to the "website" parameter an sets processingAction = true in the props
      just in case this action fails it should return {just in case (~_~) }
      */


      if (!isfirstSearch && !_this.props.switchWebsite(_objectSpread({}, _this.props, {
        processingAction: true,
        currentWebsite: website
      }))) return;
      /*
      Resets all the arrays of the selected E-commerce website
      so that new titles , descriptions , prices , images will be replaced with new ones
      */

      if (!isfirstSearch && !backup && !_this.props.noDefaultResultsFound) {
        if (!loadMore) {
          Object.keys(selectedEcommerce).map(function (key) {
            return Array.isArray(selectedEcommerce[key]) ? selectedEcommerce[key] = [] : null;
          });
        } else {
          Object.keys(selectedEcommerce).map(function (key) {
            return Array.isArray(selectedEcommerce[key]) ? selectedEcommerce[key] = _toConsumableArray(selectedEcommerce[key]) : null;
          });
        }
      }

      var savedState = {};

      var defaultAction = function defaultAction() {
        if (!isfirstSearch) {
          var _this$searchFormField;

          (_this$searchFormField = _this.searchFormFieldSet).prop.apply(_this$searchFormField, _toConsumableArray(defaults.disabledFalse));

          if (_this.props.switchWebsite(_objectSpread({}, savedState, {
            processingAction: false
          }))) return;
        }
      };

      var resp,
          ads = [];
      var titles = [];

      switch (website) {
        case 'olist':
          var url = "https://olist.ng/search?keyword=".concat(q, "&state_id=&page=").concat(pageNumber);

          _this.tryGetCachedResult(_this.getRandomCrawler(), _this.getRequestObject(url), url, function (response) {
            resp = response;

            if (response.is_html) {
              var html;

              try {
                html = $(response.html).find('.b-list-advert__item');
              } catch (e) {
                showError();
              }

              if (!html.length) return showError(); //Clearing some memory

              response = null;
              {
                var ad;
                var counter = 0;
                var prop,
                    addNewAd = true;
                html.each(function (index) {
                  ad = {
                    title: null,
                    description: null,
                    price: null,
                    image: null,
                    link: null,
                    linkText: null,
                    location: null
                  };
                  ad.title = $.trim(($(this).find("*[class*='title']:first") || $(this).find('.b-advert-title-inner:first')).text()).truncate(defaults.maxTitleLength);
                  ad.description = $.trim(($(this).find("*[class*='description']:first") || $(this).find('.b-list-advert__item-description-text:first')).text()).truncate(defaults.maxDescriptionLength);
                  ad.price = $.trim(($(this).find('.qa-advert-price.b-list-advert__item-price:first') || $(this).find("span:contains(₦):first , p:contains(₦):first , small:contains(₦):first , div:contains(₦):first")).text()).replace(/^\D+/g, '').toLocaleString();
                  ad.link = ($(this).find("a[href*='item']:first") || $(this).find('.js-advert-link:first')).attr('href');
                  ad.link = ad.link.charAt(0) === '/' ? "https://olist.ng" + ad.link : ad.link;
                  ad.image = ($(this).find("img[src*='thumbnail']:first") || $(this).find('.b-list-advert__item-image:first').find('img:first')).attr('src');
                  ad.location = $.trim(($(this).find("*[class*='region']:first") || $(this).find("*[class*='location']:first") || $(this).find('.b-list-advert__item-region:first')).text()).truncate(defaults.maxLocationLength);
                  ad.linkText = ad.link.truncate(defaults.maxLinkLength);

                  for (prop in ad) {
                    if (prop === "showAdImage") continue;else if (ad[prop] === null || typeof ad[prop] === 'undefined') {
                      addNewAd = false;
                      break;
                    }
                  }

                  if (addNewAd) {
                    if (!isfirstSearch) selectedEcommerce.ads.push(ad);
                    ads.push(ad);
                  }
                });
              }
            } else {
              response.ads.forEach(function (ad) {
                ads.push(ad);
                selectedEcommerce.ads.push(ad);
                titles.push(ad.title);
              });
            }

            if (resp.update) {
              var data = {
                url: url,
                ads: selectedEcommerce.ads,
                email: 'username@domain.com',
                action: _this.updateSearchResultAction
              };
              data = JSON.stringify(data);
              $.post(defaults.actions, {
                data: data
              }, function (response) {});
            }

            selectedEcommerce.page += 1;
            _this.props.locale[index] = selectedEcommerce;
            var previousLocale = _this.props.locale;
            savedState = _objectSpread({}, _this.props, {
              locale: previousLocale,
              currentWebsite: website
            });
            defaultAction();
            return callback ? callback(_objectSpread({}, resp, {
              titles: titles,
              all_ads: ads
            })) : null;
          });

          break;

        case 'jiji':
          url = "https://jiji.ng/search?query=".concat(q, "&page=").concat(pageNumber);

          _this.tryGetCachedResult(_this.getRandomCrawler(), _this.getRequestObject(url), url, function (response) {
            resp = response;

            if (response.is_html) {
              var html;

              try {
                html = $(response.html).find('.b-list-advert__template');
              } catch (e) {
                showError();
              }

              if (!html.length) return showError(); //Clearing some memory

              response = null;
              {
                var ad;
                var counter = 0;
                var prop,
                    addNewAd = true;
                html.each(function (index) {
                  ad = {
                    title: null,
                    description: null,
                    price: null,
                    image: null,
                    link: null,
                    linkText: null,
                    location: null
                  };
                  ad.title = $.trim($(this).find('.qa-advert-title.js-advert-link').text()).truncate(defaults.maxTitleLength);
                  ad.description = $.trim($(this).find('.b-list-advert__item-description-text').text()).truncate(defaults.maxDescriptionLength);
                  ad.price = $.trim($(this).find('.b-list-advert__item-price').text().replace(/^\D+/g, '')).toLocaleString();
                  ad.link = $(this).find('.js-advert-link').attr('href');
                  ad.image = $(this).find('.b-list-slider__sub-img').eq(0).attr('data-img') || $(this).find('img').attr('data-src') || $(this).find('img').attr('src');
                  ad.location = $(this).find('.b-list-advert__item-region').text();
                  ad.linkText = ad.link.truncate(defaults.maxLinkLength);

                  for (prop in ad) {
                    if (prop === "showAdImage") continue;else if (ad[prop] === null || typeof ad[prop] === 'undefined') {
                      addNewAd = false;
                      break;
                    }
                  }

                  if (addNewAd) {
                    if (!isfirstSearch) selectedEcommerce.ads.push(ad);
                    ads.push(ad);
                  }
                });
              }
            } else {
              response.ads.forEach(function (ad) {
                ads.push(ad);
                selectedEcommerce.ads.push(ad);
                titles.push(ad.title);
              });
            }

            if (resp.update) {
              var data = {
                url: url,
                ads: selectedEcommerce.ads,
                email: 'username@domain.com',
                action: _this.updateSearchResultAction
              };
              data = JSON.stringify(data);
              $.post(defaults.actions, {
                data: data
              }, function (response) {});
            }

            selectedEcommerce.page += 1;
            _this.props.locale[index] = selectedEcommerce;
            var previousLocale = _this.props.locale;
            savedState = _objectSpread({}, _this.props, {
              locale: previousLocale,
              currentWebsite: website
            });
            defaultAction();
            return callback ? callback(_objectSpread({}, resp, {
              titles: titles,
              all_ads: ads
            })) : null;
          });

          break;

        case 'jumia':
          url = "https://www.jumia.com.ng/catalog/?q=".concat(q, "&page=").concat(pageNumber);

          _this.tryGetCachedResult(_this.getRandomCrawler(), _this.getRequestObject(url), url, function (response) {
            resp = response;
            var html;

            if (response.is_html) {
              try {
                html = $(response.html).find('.sku.-gallery');
              } catch (e) {
                return showError();
              }

              if (!html.length) return showError();
              response = null;
              {
                var title;
                var description;
                var image;
                var price;
                var ad; //let location;

                var link,
                    prop,
                    addNewAd = true;
                html.each(function (index) {
                  ad = {
                    title: null,
                    description: null,
                    price: null,
                    image: null,
                    link: null,
                    linkText: null,
                    location: null
                  };
                  title = $.trim($(this).find('.name').text()).truncate(defaults.maxTitleLength);
                  description = $.trim($(this).find('.name').text()).truncate(defaults.maxDescriptionLength);
                  image = $.trim($(this).find('.lazy.image').attr('data-src'));
                  price = $.trim($(this).find('.price').first().text().replace(/^\D+/g, '')).toLocaleString();
                  link = $(this).find('.link').attr('href'); //location = $(this).find('.b-list-advert__item-region').text();

                  if (title !== "") {
                    ad.title = title;
                    ad.description = description;
                    ad.image = image;
                    ad.price = price;
                    ad.link = link;
                    ad.location = "";
                    ad.linkText = link.truncate(defaults.maxLinkLength);

                    for (prop in ad) {
                      if (prop === "showAdImage") continue;else if (ad[prop] === null || typeof ad[prop] === 'undefined') {
                        addNewAd = false;
                        break;
                      }
                    }

                    if (addNewAd) selectedEcommerce.ads.push(ad);
                  }
                });
              }
            } else {
              response.ads.forEach(function (ad) {
                selectedEcommerce.ads.push(ad);
              });
            }

            if (resp.update) {
              var data = {
                url: url,
                ads: selectedEcommerce.ads,
                email: 'username@domain.com',
                action: _this.updateSearchResultAction
              };
              data = JSON.stringify(data);
              $.post(defaults.actions, {
                data: data
              }, function (response) {});
            }

            titles = selectedEcommerce.ads.length ? getTitles(selectedEcommerce.ads) : titles;
            selectedEcommerce.page += 1;
            _this.props.locale[index] = selectedEcommerce;
            var previousLocale = _this.props.locale;
            savedState = _objectSpread({}, _this.props, {
              locale: previousLocale,
              currentWebsite: website
            });
            defaultAction();
          });

          break;

        case 'konga':
          url = "https://b9zcrrrvom-3.algolianet.com/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.30.0%3Breact-instantsearch%205.3.2%3BJS%20Helper%202.26.1&x-algolia-application-id=B9ZCRRRVOM&x-algolia-api-key=cb605b0936b05ce1a62d96f53daa24f7";
          var req = {
            "requests": [{
              "indexName": "catalog_store_konga",
              "params": "query=".concat(query.replace(" ", "%20"), "&maxValuesPerFacet=50&page=").concat(pageNumber, "&highlightPreTag=%3Cais-highlight-0000000000%3E&highlightPostTag=%3C%2Fais-highlight-0000000000%3E&facets=%5B%22special_price%22%2C%22attributes.brand%22%2C%22attributes.screen_size%22%2C%22attributes.ram_gb%22%2C%22attributes.sim%22%2C%22attributes.sim_slots%22%2C%22attributes.capacity%22%2C%22attributes.battery%22%2C%22attributes.connectivity%22%2C%22attributes.hard_drive%22%2C%22attributes.internal%22%2C%22attributes.tv_screen_size%22%2C%22attributes.operating_system%22%2C%22attributes.kids_shoes%22%2C%22attributes.heel_type%22%2C%22attributes.heel_height%22%2C%22attributes.leg_width%22%2C%22attributes.fastening%22%2C%22attributes.shirt_size%22%2C%22attributes.shoe_size%22%2C%22attributes.lingerie_size%22%2C%22attributes.pants_size%22%2C%22attributes.size%22%2C%22attributes.color%22%2C%22attributes.mainmaterial%22%2C%22konga_fulfilment_type%22%2C%22is_pay_on_delivery%22%2C%22is_free_shipping%22%2C%22pickup%22%2C%22categories.lvl0%22%5D&tagFilters=&ruleContexts=%5B%22%22%5D")
            }]
          };
          ;

          _this.tryGetCachedResult(_this.getRandomCrawler(), _this.getRequestObject(url), url, function (response) {
            resp = response;

            if (response.is_html) {
              if (!response.html.results) return showError();
              if (!response.html.results.length) return showError(false);
              var resultObject = response.html.results[0].hits;
              var titlesArray = [];
              resultObject.forEach(function (obj) {
                return titlesArray.push(obj.name);
              }); //Check if Konga is used as a backup search result website and filter the titles if so

              var filterAction = backup ? _this.filterTitles(titlesArray) : null;
              var ad;
              var specialPrice,
                  prop,
                  addNewAd = true;
              resultObject.forEach(function (obj) {
                ad = {
                  title: null,
                  description: null,
                  price: null,
                  image: null,
                  link: null,
                  linkText: null,
                  location: null
                };
                ad.title = obj.name.truncate(defaults.maxTitleLength);
                ad.description = obj.description.truncate(defaults.maxDescriptionLength);
                ad.image = "https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product" + obj.image_thumbnail_path;
                specialPrice = obj.special_price || obj.price;
                ad.price = specialPrice.toLocaleString();
                ad.location = "";
                ad.link = 'https://konga.com/product/' + obj.url_key;
                ad.linkText = ('https://konga.com/product/' + obj.url_key).truncate(defaults.maxLinkLength);

                for (prop in ad) {
                  if (prop === "showAdImage") continue;else if (ad[prop] === null || typeof ad[prop] === 'undefined') {
                    addNewAd = false;
                    break;
                  }
                }

                if (addNewAd) selectedEcommerce.ads.push(ad);
              });
            } else {
              response.ads.forEach(function (ad) {
                selectedEcommerce.ads.push(ad);
              });
            }

            titles = selectedEcommerce.ads.length ? getTitles(selectedEcommerce.ads) : titles;
            selectedEcommerce.page += 1;

            if (resp.update) {
              var data = {
                url: req,
                ads: selectedEcommerce.ads,
                email: 'username@domain.com',
                action: _this.updateSearchResultAction
              };
              data = JSON.stringify(data);
              $.post(defaults.actions, {
                data: data
              }, function (response) {});
            }

            _this.props.locale[index] = selectedEcommerce;
            var previousLocale = _this.props.locale;
            savedState = _objectSpread({}, _this.props, {
              locale: previousLocale,
              currentWebsite: website
            });
            defaultAction();
          }, "konga", req);

          break;

        case 'deals':
          url = "https://deals.jumia.com.ng/catalog?search-keyword=".concat(q, "&page=").concat(pageNumber);

          _this.tryGetCachedResult(_this.getRandomCrawler(), _this.getRequestObject(url), url, function (response) {
            resp = response;
            var html;

            if (response.is_html) {
              try {
                html = $(response.html).find('.post') ? $(response.html).find('.post') : html;
              } catch (e) {
                return showError();
              }

              if (!html.length) return showError(); //Clearing some memory

              response = null;
              {
                var counter = 0;
                var ad,
                    prop,
                    addNewAd = true;
                html.each(function (index) {
                  ad = {
                    title: null,
                    description: null,
                    price: null,
                    image: null,
                    link: null,
                    linkText: null,
                    location: null
                  };
                  ad.title = $.trim($(this).find('.post-link').text()).truncate(defaults.maxTitleLength);
                  ad.description = $.trim($(this).find('.post-link').text()).truncate(defaults.maxDescriptionLength);
                  ad.image = $.trim($(this).find('.product-images').attr('data-src'));
                  ad.price = $.trim($(this).find('.price').text().replace(/^\D+/g, '')).toLocaleString();
                  ad.link = "https://deals.jumia.com.ng" + $(this).find('.post-link').attr('href');
                  ad.location = $(this).find('.address').text();
                  ad.linkText = ad.link.truncate(defaults.maxLinkLength);

                  for (prop in ad) {
                    if (prop === "showAdImage") continue;else if (ad[prop] === null || typeof ad[prop] === 'undefined') {
                      addNewAd = false;
                      break;
                    }
                  }

                  if (addNewAd) {
                    if (!isfirstSearch) selectedEcommerce.ads.push(ad);
                    ads.push(ad);
                  }
                });
              }
            } else {
              response.ads.forEach(function (ad) {
                ads.push(ad);
                selectedEcommerce.ads.push(ad);
                titles.push(ad.title);
              });
            }

            if (resp.update) {
              var data = {
                url: url,
                ads: selectedEcommerce.ads,
                email: 'username@domain.com',
                action: _this.updateSearchResultAction
              };
              data = JSON.stringify(data);
              $.post(defaults.actions, {
                data: data
              }, function (response) {});
            }

            selectedEcommerce.page = selectedEcommerce.page + 1;
            _this.props.locale[index] = selectedEcommerce;
            var previousLocale = _this.props.locale;
            savedState = _objectSpread({}, _this.props, {
              locale: previousLocale,
              currentWebsite: website
            });
            defaultAction();
            return callback ? callback(_objectSpread({}, resp, {
              titles: titles,
              all_ads: ads
            })) : null;
          });

          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "fetchSponsoredAds", function (callback) {
      var data = {
        action: 'FETCH_SPONSORED_ADS',
        email: 'test@mail.com'
      };
      data = JSON.stringify(data);
      $.post(defaults.actions, {
        data: data
      }, function (response) {
        response = JSON.parse(response);
        if (!response.sponsored_ads.length) return [];
        response.sponsored_ads.forEach(function (sponsored_ad) {
          sponsored_ad.is_sponsored_ad = true;
          sponsored_ad.image = defaults.bannerImageLocation + sponsored_ad.banner;
          sponsored_ad.linkText = sponsored_ad.link.truncate(defaults.maxLinkLength);
          sponsored_ad.price = 0;
        });
        response = response.sponsored_ads;
        callback(response);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "tryGetCachedResult", function (url, dataObject, searchUrl, callback) {
      var siteName = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "other";
      var req = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      var isKongaRequest = siteName.toLowerCase().indexOf('konga') >= 0;
      var data = JSON.stringify({
        url: isKongaRequest ? req : searchUrl,
        action: 'FETCH_CACHED_AD',
        email: 'username@domain.com'
      });
      $.post(defaults.actions, {
        data: data
      }, function (cacheResponse) {
        //return;
        cacheResponse = JSON.parse(cacheResponse);
        cacheResponse['is_html'] = true;

        if (cacheResponse.update && !isKongaRequest) {
          $.post(url, dataObject, function (response) {
            cacheResponse['html'] = response;
            return callback(cacheResponse);
          });
        } else if (cacheResponse.update && isKongaRequest) {
          $.post(searchUrl, JSON.stringify(req), function (response) {
            cacheResponse['html'] = response;
            return callback(cacheResponse);
          });
        } else {
          cacheResponse['is_html'] = false;
          return callback(cacheResponse);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getRandomDefaultWebsite", function () {
      //First check classified ad websites before E-commerce websites
      var classifiedAdsWebsites = ["olist", "deals", "jiji"];
      var ecommerceWebsites = ["jumia", "konga"];
      var randomClassifiedAdWebsite = classifiedAdsWebsites[Math.floor(Math.random() * classifiedAdsWebsites.length)];
      var randomEcommerceWebsite = ecommerceWebsites[Math.floor(Math.random() * ecommerceWebsites.length)];
      return [randomClassifiedAdWebsite, randomEcommerceWebsite];
    });

    _defineProperty(_assertThisInitialized(_this), "handleSearchFormSubmit", function (e) {
      var _this$searchFormField2;

      e.preventDefault(); //e.stopImmediatePropagation();

      _this.formSubmitted = false;
      _this.searchQuery = _this.searchQueryField.val().toLowerCase().replace(/ +(?= )/g, '');
      if (!_this.searchQuery.length) return; //Filters the search query
      //this.replaceSearchText();
      //Spilts the words of the query into an array

      var searchQueryToArray = _this.searchQuery.split(" "); //filters the words(i.e removes common words from the query and removes words that has more than one occurrence)


      searchQueryToArray = searchQueryToArray.filter(function (word, pos, self) {
        return self.indexOf(word) === pos && defaults.commonWords.indexOf(word) < 0;
      }); //Joins the new search query with " " to form a sentence

      _this.searchQuery = searchQueryToArray.join(" "); //hide the site footer and the switch container

      _this.searchResults.html(null);

      _this.siteFooter.hide(); //blurs the search field


      $(':focus').blur(); //default search website depending on the users's settings

      var q = _this.searchQuery.split(" ").join("+");

      var queryObject = {
        query: _this.searchQuery,
        q: q
      };

      _this.props.locale.forEach(function (obj) {
        Object.keys(obj).map(function (key) {
          if (Array.isArray(obj[key])) {
            obj[key] = [];
          }

          switch (key) {
            case "average":
            case "lastSortedPage":
              obj[key] = 0;
              break;

            case "shownSponsoredAds":
              obj[key] = false;
              break;
          }
        });
      }); //set the loadMore key of this website object to false


      _this.props.locale[0].loadMore = true;

      while (_this.props.sponsoredAdsClicked.length) {
        _this.props.sponsoredAdsClicked.pop();
      }

      (_this$searchFormField2 = _this.searchFormFieldSet).prop.apply(_this$searchFormField2, _toConsumableArray(defaults.disabledTrue));

      var defaultRandomEcommerceWebsites = _this.getRandomDefaultWebsite();

      var defaultRandomClassifiedAdWebsite = defaultRandomEcommerceWebsites[0];
      var defaultRandomEcommerceWebsite = defaultRandomEcommerceWebsites[1];
      console.log(defaultRandomClassifiedAdWebsite, defaultRandomEcommerceWebsite);

      _this.switchToWebsite(defaultRandomClassifiedAdWebsite, 0, false, false, true, queryObject, function (response) {
        var _this$searchFormField3;

        console.log(response);
        var selectedIndex = 0;

        var selectedEcommerce = _this.props.locale.find(function (local, pos) {
          selectedIndex = pos; // if the current E-commerce shortName is equal to the "website" parameter sent to the function

          return local.shortName === defaultRandomClassifiedAdWebsite;
        }); //Check if there is no title returned, meaning empty result


        if (!response.all_ads.length) {
          //M.toast({html: this.enterValidKeywordsWarning});
          _this.searchTabs.show();

          $('#tabs.tabs').tabs('select', defaultRandomEcommerceWebsite);

          _this.searchQueryField.blur();

          _this.formSubmitted = true; //Make another request to Backup

          _this.props.locale.forEach(function (obj) {
            return obj.page = 0;
          }); //also set the loadMore key of this website object to false


          _this.props.locale[selectedIndex].loadMore = false;

          if (_this.props.switchWebsite(_objectSpread({}, _this.props, {
            q: q,
            query: _this.searchQuery,
            noDefaultResultsFound: true
          }))) {
            _this.switchToWebsite(defaultRandomEcommerceWebsite, null, null, true);

            return;
          }
        }

        response.all_ads.forEach(function (ad) {
          selectedEcommerce.ads.push(ad);
        });
        var returnNow = false;

        _this.fetchSponsoredAds(function (response) {
          if (response.length) {
            if (!_this.props.switchWebsite(_objectSpread({}, _this.props, {
              currentWebsite: defaultRandomClassifiedAdWebsite,
              noDefaultResultsFound: false,
              processingAction: false,
              sponsoredAds: response
            }))) {
              returnNow = true;
            }
          }

          returnNow = true;
        });

        if (returnNow) return;

        if (response.is_html) {
          _this.filterTitles(response.titles, function () {});
        }

        var previousLocale = _this.props.locale; //reset the pages to 0;

        _this.props.locale.forEach(function (local) {
          local.page = 0;
          local.error = null;
          local.loadMore = true;
        });

        selectedEcommerce.page += 1;

        var savedState = _objectSpread({}, _this.props, {
          q: q,
          query: _this.searchQuery,
          locale: previousLocale,
          currentWebsite: defaultRandomClassifiedAdWebsite,
          processingAction: false
        });

        if (_this.props.newDefaultSearchResult(_objectSpread({}, savedState))) {
          //Switch the tab to the default behaviour;
          _this.formSubmitted = true;

          _this.searchQueryField.blur();

          _this.searchTabs.show();

          $('#tabs.tabs').tabs('select', defaultRandomClassifiedAdWebsite);
        }

        (_this$searchFormField3 = _this.searchFormFieldSet).prop.apply(_this$searchFormField3, _toConsumableArray(defaults.disabledFalse));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSearchTypeSwitch", function (e) {
      //Sets the value of localSearch
      var checked = e.target.checked;

      _this.props.newDefaultSearchResult(_objectSpread({}, _this.props, {
        settings: _objectSpread({}, _this.props.settings, {
          localSearch: checked
        })
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "replaceSearchText", function () {
      var query = _this.searchQueryField.val().toLowerCase();

      var searchQuery = query;
      {
        var _searchQuery = query.replace(/[\W_ ]+/g, " "); //Replace the value of the input field with the new value
        //Trim the value of the search input field after filtering


        _this.searchQueryField.val(_searchQuery);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSearchTextChange", function (e) {
      // filter the value of the search input field
      _this.searchQuery = e.target.value; //this.replaceSearchText();

      var data = {
        query: _this.searchQuery
      };
      $.post(defaults.suggestions, {
        data: JSON.stringify(data)
      }, function (response) {
        var resp = JSON.parse(response);
        var query = null;
        resp.suggestions.forEach(function (obj) {
          query = obj.query;
          if (!(query in _this.autoCompleteData)) _this.autoCompleteData[query] = null;
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "defaultAction", function () {
      $('.tabs').tabs();
      $('.gallery-2 span.gallery-images-link').lightbox();

      _this.searchTypeSwitchButton.prop('checked', _this.props.settings.localSearch);

      _this.toggleImagesSwitch.prop('checked', _this.props.settings.showImages);
    });

    _defineProperty(_assertThisInitialized(_this), "filterTitles", function (titlesArr, callback) {
      //an array containing all the titles of the first search
      var validTitles = [];
      var titles = titlesArr.forEach(function (title) {
        var currentTitle = title.toLowerCase().replace(/ +(?= )/g, '');
        var currentTitleToArray = currentTitle.split(" ");
        currentTitleToArray.forEach(function (word) {
          if (validTitles.indexOf(word) < 0) {
            validTitles.push(word);
          }
        });
      }); //Filter the user search query

      var searchQueryToArray = _this.searchQuery.split(" "); //Remove words that are not found in the list of titles from the array

      /*
      searchQueryToArray = searchQueryToArray.filter((word, index) => {
          return validTitles.indexOf(word) >= 0 && searchQueryToArray[index] !== searchQueryToArray[index + 1];
      });
      */


      _this.searchQuery = searchQueryToArray.join(" ");

      if (!_this.searchQuery.length) {
        M.toast({
          html: _this.enterValidKeywordsWarning
        });
        _this.formSubmitted = false;
        return;
      }

      _this.searchQueryField.val(_this.searchQuery); //data to be sent to the server


      var data = {
        query: _this.searchQuery
      };
      data = JSON.stringify(data);
      $.post(defaults.queryProcessor, {
        data: data
      }, function (t) {
        _this.localSearchTabContainer.show();

        _this.lastSearchQuery = _this.searchQuery;

        _this.switchContainer.hide();

        return callback();
        /*
        this.props.locale.forEach(obj => {
            Object.keys(obj).map(key => {
                if (Array.isArray(obj[key])) {
                    obj[key] = [];
                }
            })
        });
        */
      });
    });

    _defineProperty(_assertThisInitialized(_this), "loadSuggestions", function () {
      $('input.autocomplete').autocomplete({
        limit: defaults.searchSuggestionsLimit,
        data: _this.autoCompleteData,
        // The max amount of results that can be shown at once. Default: Infinity.
        onAutocomplete: function onAutocomplete(val) {// Callback function when value is autcompleted.
        },
        minLength: 1 // The minimum length of the input for the autocomplete to start. Default: 1.

      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggleShowSearchImages", function (e) {
      var checked = e.target.checked;

      var savedState = _objectSpread({}, _this.props, {
        settings: _objectSpread({}, _this.props.settings, {
          showImages: checked
        })
      });

      _this.props.switchWebsite(savedState);
    });

    return _this;
  }

  _createClass(Application, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return this.props !== nextProps;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.defaultAction();

      if (this.props.currentWebsite) {
        this.searchTabs.show();
        $('.tabs').tabs('select', this.props.currentWebsite);
        $('.tabs').tabs('updateTabIndicator');
        this.formSubmitted = true;
        $('input.autocomplete').autocomplete({
          limit: defaults.searchSuggestionsLimit,
          data: this.autoCompleteData,
          // The max amount of results that can be shown at once. Default: Infinity.
          onAutocomplete: function onAutocomplete(val) {// Callback function when value is autcompleted.
          },
          minLength: 1 // The minimum length of the input for the autocomplete to start. Default: 1.

        });
      }

      this.loadSuggestions();
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.localSearchTabContainer = $('#local-search-tab-container');
      this.searchTabs = $('.search-tabs');
      this.toggleImagesSwitch = $('#toggle-search-images');
      this.searchQueryField = $('.search-query-field');
      this.moreDropDownContents = $('.more-dropdown-contents');
      this.moreDropDownContents.show();
      this.switchContainer = $('#switch-container');
      this.searchResults = $(".search-results");
      this.searchFormFieldSet = $('#search-form-fieldset');
      this.siteFooter = $('#site-footer');
      this.lastSearchQuery = this.searchQueryField.val().toLowerCase();
      this.searchTypeSwitchButton = $("#search-type-switch-button");
      this.searchQueryField.focus();
      this.defaultAction();
      $('.dropdown-trigger').dropdown({
        alignment: 'right',
        coverTrigger: false,
        closeOnClick: false,
        container: document.getElementById(this.searchFormFieldSet.attr('id'))
      }); //I want to get the auto-complete data from the cookies

      this.autoCompleteData = {}; //Gets all the word typed by the user from cookie and displays in during search

      if (Cookies.get(this.cookiesQueryKey)) {
        var storageObj = JSON.parse(Cookies.get(this.cookiesQueryKey));
        storageObj.map(function (data) {
          _this2.autoCompleteData[data] = null;
        });
      }

      if (localStorage.getItem(defaults.savedState)) {
        var _storageObj = JSON.parse(localStorage.getItem(defaults.savedState));
        /* checks if a new property (key) is added to the default state as a result of updates */


        {
          //We want to count the length of savedState keys and the default state keys
          var storageObjectKeysCount = 0,
              propsKeysCount = 0;
          Object.keys(_storageObj).forEach(function (key) {
            return typeof _storageObj[key] !== 'function' ? storageObjectKeysCount += 1 : null;
          });
          Object.keys(this.props).forEach(function (key) {
            return typeof _this2.props[key] !== 'function' ? propsKeysCount += 1 : null;
          });
          /*
          if there is a difference in the length of the savedState object keys
          and the length of the default state stored in the redux store,
          meaning there was a change in the source code this will trigger the automatic update of the savedState
          */
          //console.log(storageObjectKeysCount , propsKeysCount);

          if (storageObjectKeysCount !== propsKeysCount || this.props.lastUpdated !== _storageObj.lastUpdated) return this.props.restoreState(true);
        }

        if (this.props.switchWebsite(_storageObj)) {
          //hello
          this.formSubmitted = true;
          this.toggleImagesSwitch.prop('checked', _storageObj.settings.showImages); //searchTypeSwitchButton.prop('checked' , storageObj.settings.localSearch);

          if (this.props.currentWebsite != null) {
            $('.tabs').tabs('select', this.props.currentWebsite);
            this.formSubmitted = true;
            this.searchTabs.show();
          }
        }
      }

      this.loadSuggestions();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      /*
       I want to be able to store the user's default search type(whether local or Int'l)  in the browser
      * cookie
      */

      /*
      * the function below sets the initial search type according to the cookie value of 'localSearch' key
      * if the key 'localSearch' doesn't exists  int the browser cookie, then we set the value of localSearch to true
      */
      var gallery = this.props.gallery;
      var images = gallery.map(function (image) {
        return React.createElement("span", {
          key: Math.random(),
          className: "gallery-images-link",
          href: image.src,
          "data-caption": image.alt
        });
      });
      var downloadApkLink = navigator.userAgent === defaults.siteWebPackageName ? null : React.createElement("li", null, React.createElement("a", {
        href: defaults.apkDownloadLink,
        id: "download-apk-link"
      }, React.createElement("span", {
        className: "small material-icons app-download-icon"
      }, "vertical_align_bottom"), " Download APK"));
      var downloadApkDivider = downloadApkLink === null ? null : React.createElement("li", {
        className: "divider",
        tabIndex: "-1"
      });
      var linkToSavedGallery = gallery.length ? React.createElement("li", null, React.createElement("span", {
        className: "gallery-2"
      }, React.createElement("span", {
        className: "gallery-images-link your-gallery",
        href: gallery[gallery.length - 1].src,
        "data-caption": "<a href = '".concat(gallery[gallery.length - 1].link, "'>").concat(gallery[gallery.length - 1].alt, "</a>")
      }, React.createElement("i", {
        className: "tiny material-icons search-image-icons"
      }, "image"), " Your gallery")), React.createElement(Gallery, null)) : null;
      return React.createElement("div", null, React.createElement("fieldset", {
        id: "search-form-fieldset"
      }, React.createElement("form", {
        autoComplete: "off",
        id: "search-form",
        onSubmit: this.handleSearchFormSubmit,
        method: "get",
        action: "#"
      }, React.createElement("div", {
        className: "input-group"
      }, React.createElement("div", {
        className: "input-field col s12"
      }, React.createElement("i", {
        className: "material-icons prefix"
      }), React.createElement("input", {
        onBlur: function onBlur() {
          // if(!this.searchQueryField.val().length) return;
          if (_this3.props.locale[0].ads.length || _this3.props.locale[3].ads.length) {
            _this3.searchTabs.show();
          }
        },
        onFocus: function onFocus() {
          _this3.searchTabs.hide();
        },
        type: "text",
        defaultValue: this.props.query ? this.props.query : "",
        onChange: this.handleSearchTextChange,
        id: "autocomplete-input",
        className: "autocomplete search-query-field"
      }), React.createElement("label", {
        htmlFor: "autocomplete-input"
      }, this.props.query ? "" : "What do you want to buy?"))), React.createElement("button", {
        type: "submit",
        className: "input-group-addon btn waves-effect waves-light left",
        id: "search-button"
      }, "Search"), React.createElement("a", {
        className: "dropdown-trigger more-dropdown-contents btn-floating btn-large blue",
        href: "#",
        "data-target": "settings-dropdown",
        id: "settings-drop-down-link"
      }, "More", React.createElement("span", {
        className: "material-icons small",
        id: "settings-more-icon"
      }, "arrow_drop_down")), React.createElement("ul", {
        id: "settings-dropdown",
        className: "dropdown-content more-dropdown-contents"
      }, downloadApkLink, downloadApkDivider, React.createElement("li", {
        id: "local-search-setting"
      }, React.createElement("div", {
        className: "switch"
      }, React.createElement("label", null, React.createElement("span", {
        id: "local-search-text",
        className: "settings-text"
      }, "Local Search"), React.createElement("input", {
        defaultChecked: function defaultChecked() {
          return true;
        },
        disabled: true,
        onChange: this.handleSearchTypeSwitch,
        type: "checkbox",
        id: "search-type-switch-button"
      }), React.createElement("span", {
        className: "lever"
      })))), React.createElement("li", {
        className: "divider",
        tabIndex: "-1"
      }), React.createElement("li", {
        id: "local-search-setting"
      }, React.createElement("div", {
        className: "switch"
      }, React.createElement("label", null, React.createElement("span", {
        id: "show-images-text",
        className: "settings-text"
      }, "Show images"), React.createElement("input", {
        defaultChecked: function defaultChecked() {
          return _this3.props.settings.showImages;
        },
        onChange: this.toggleShowSearchImages,
        type: "checkbox",
        id: "toggle-search-images"
      }), React.createElement("span", {
        className: "lever toggle-search-images"
      })))), React.createElement("li", {
        className: "divider",
        tabIndex: "-1"
      }), linkToSavedGallery))), React.createElement(LocalSearchTab, {
        switchToWebsite: this.switchToWebsite
      }));
    }
  }]);

  return Application;
}(React.Component);