"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

$(function () {
  $('.gallery span.modal-link').lightbox();
  $('.gallery-2 span.gallery-images-link').lightbox(); // If you want seperate galleries on the same page
  // just specify different class names.
  //$('.gallery-2 a').lightbox();
});

var Config = //Sets the value of the localSearch equal to true if there is no cookie key "localSearch"
//initialLocalSearchCookieValue = Cookies.get(defaults.localSearchCookieKey) != undefined ? Cookies.get(defaults.localSearchCookieKey) != "false" : true;
//initialShowImagesCookieValue = Cookies.get(defaults.showImagesCookieKey) != undefined ? Cookies.get(defaults.showImagesCookieKey) != "false" : true;
function Config() {
  var _this = this;

  _classCallCheck(this, Config);

  _defineProperty(this, "localSearchCookieKey", "localSearch");

  _defineProperty(this, "initState", {
    queryParameterString: 'q',
    defaultBackup: "konga",
    noDefaultResultsFound: false,
    currentWebsite: null,
    gallery: [],
    settings: {
      localSearch: true,
      showImages: false
    },
    query: null,
    q: null,
    formSubmitted: false,
    processingAction: false,
    locale: [{
      shortName: defaults.websites.jiji,
      name: defaults.websites.jiji,
      textColor: 'green',
      ads: [],
      page: 0,
      error: "",
      loadMore: false,
      average: 0,
      max: 0,
      lastSortedPage: 0,
      shownSponsoredAds: false
    }, {
      shortName: defaults.websites.olist,
      name: defaults.websites.olist,
      textColor: 'blue',
      ads: [],
      page: 0,
      error: "",
      loadMore: false,
      average: 0,
      max: 0,
      lastSortedPage: 0,
      shownSponsoredAds: false
    }, {
      shortName: defaults.websites.konga,
      name: defaults.websites.konga,
      textColor: 'orange',
      ads: [],
      page: 0,
      error: "",
      loadMore: false,
      average: 0,
      max: 0,
      lastSortedPage: 0,
      shownSponsoredAds: false
    }, {
      shortName: defaults.websites.jumia,
      name: defaults.websites.jumia,
      textColor: 'black',
      ads: [],
      page: 0,
      error: "",
      loadMore: false,
      average: 0,
      max: 0,
      lastSortedPage: 0,
      shownSponsoredAds: false
    }, {
      shortName: defaults.websites.deals,
      name: defaults.websites.jumiaDeals,
      textColor: 'indigo',
      ads: [],
      page: 0,
      error: "",
      loadMore: false,
      average: 0,
      max: 0,
      lastSortedPage: 0,
      shownSponsoredAds: false
    }],
    international: [{
      shortName: "amazon",
      name: "amazon",
      textColor: '#146eb4',
      titles: [],
      descriptions: [],
      prices: [],
      images: [],
      links: [],
      linkTexts: [],
      locations: [],
      page: 0,
      error: "",
      loadMore: false
    }, {
      shortName: "alibaba",
      name: "alibaba",
      textColor: '#ff6a00',
      titles: [],
      descriptions: [],
      prices: [],
      images: [],
      links: [],
      linkTexts: [],
      locations: [],
      page: 0,
      error: "",
      loadMore: false
    }, {
      shortName: "walmart",
      name: "walmart",
      textColor: '#79b9e7',
      titles: [],
      descriptions: [],
      prices: [],
      images: [],
      links: [],
      linkTexts: [],
      locations: [],
      page: 0,
      error: "",
      loadMore: false
    }, {
      shortName: "ebay",
      name: "ebay",
      textColor: '#86b817',
      titles: [],
      descriptions: [],
      prices: [],
      images: [],
      links: [],
      linkTexts: [],
      locations: [],
      page: 0,
      error: "",
      loadMore: false
    }, {
      shortName: "bestbuy",
      name: "Best buy",
      textColor: '#f6eb16',
      titles: [],
      descriptions: [],
      prices: [],
      images: [],
      links: [],
      linkTexts: [],
      locations: [],
      page: 0,
      error: "",
      loadMore: false
    }],
    sponsoredAdsClicked: [],
    lastUpdated:
    /*dd-mm-yyyy HH:MM*/
    "15-09-2019 19:51",
    updateOnlyAds: true,
    sponsoredAds: []
  });

  _defineProperty(this, "rootReducer", function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.initState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var storageObject;

    switch (action.type) {
      case 'NEW_DEFAULT_SEARCH_RESULT':
      case 'SWITCH_WEBSITE':
        localStorage.setItem(defaults.savedState, JSON.stringify(_objectSpread({}, action.state)));
        return _objectSpread({}, action.state);

      case 'FORM_SUBMITTED':
        return _objectSpread({}, state, {
          formSubmitted: action.formSubmitted
        });

      case 'RESTORE_STATE':
        storageObject = JSON.parse(localStorage.getItem(defaults.savedState));

        var newState = _objectSpread({}, _this.initState);

        if (!action.restoreAll) {
          for (var key in storageObject) {
            if (key in _this.initState) newState[key] = storageObject[key];
          }
        }

        if (_this.initState.updateOnlyAds) newState = _objectSpread({}, newState, {
          locale: _this.initState.locale
        });
        localStorage.clear();
        localStorage.setItem(defaults.savedState, JSON.stringify(_objectSpread({}, newState)));
        return _objectSpread({}, newState);
    }

    return state;
  });

  _defineProperty(this, "mapDispatchToState", function (dispatch) {
    return {
      newDefaultSearchResult: function newDefaultSearchResult(state) {
        return dispatch({
          type: 'NEW_DEFAULT_SEARCH_RESULT',
          state: state
        });
      },
      restoreState: function restoreState() {
        var restoreAll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        return dispatch({
          type: 'RESTORE_STATE',
          restoreAll: restoreAll
        });
      },
      switchWebsite: function switchWebsite(state) {
        return dispatch({
          type: 'SWITCH_WEBSITE',
          state: state
        });
      }
    };
  });

  _defineProperty(this, "mapStateToProps", function (state, ownProps) {
    return state;
  });

  var _ReactRedux = ReactRedux,
      Provider = _ReactRedux.Provider,
      connect = _ReactRedux.connect;
  var _Redux = Redux,
      createStore = _Redux.createStore;
  var store = createStore(this.rootReducer);
  var App = connect(this.mapStateToProps, this.mapDispatchToState)(Application);
  ReactDOM.render(React.createElement(Provider, {
    store: store
  }, React.createElement(App, null)), document.getElementById('form-container'));
};

var config = new Config();