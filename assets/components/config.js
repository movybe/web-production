"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Config = //Sets the value of the localSearch equal to true if there is no cookie key "localSearch"
//initialLocalSearchCookieValue = Cookies.get(defaults.localSearchCookieKey) != undefined ? Cookies.get(defaults.localSearchCookieKey) != "false" : true;
//initialShowImagesCookieValue = Cookies.get(defaults.showImagesCookieKey) != undefined ? Cookies.get(defaults.showImagesCookieKey) != "false" : true;
function Config() {
  var _this = this;

  _classCallCheck(this, Config);

  _defineProperty(this, "localSearchCookieKey", "localSearch");

  _defineProperty(this, "initState", {
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
      shortName: "olx",
      name: "olx",
      textColor: 'purple',
      ads: [],
      page: 0,
      error: "",
      loadMore: false,
      average: 0,
      max: 0,
      lastSortedPage: 0,
      shownSponsoredAds: false
    }, {
      shortName: "jiji",
      name: "jiji",
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
      shortName: "jumia",
      name: "jumia",
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
      shortName: "konga",
      name: "konga",
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
      shortName: "deals",
      name: "jumia deals",
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
    /*dd-mm-yyyy*/
    "22-04-2019",
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