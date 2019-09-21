"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CampaignSettings = function CampaignSettings() {
  var _this = this;

  _classCallCheck(this, CampaignSettings);

  _defineProperty(this, "initState", {
    accountType: null,
    email: null,
    ads: [],
    showRefererEmailField: false,
    showPayButton: false,
    alreadyExistingAccount: false,
    emailVerified: false,
    showAccountTypeSelection: false,
    stateReset: true,
    user: {},
    adRates: {
      cpc: 1,
      cpv: 2,
      cpa: 3
    },
    defaultUsername: "5t6h8j",
    units: 10,
    reloadPage: false
  });

  _defineProperty(this, "rootReducer", function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.initState;
    var action = arguments.length > 1 ? arguments[1] : undefined;
    var storageObject;

    switch (action.type) {
      case 'RESET_STATE':
        localStorage.setItem(defaults.savedCampaignState, JSON.stringify(_objectSpread({}, action.state)));
        return _objectSpread({}, action.state);

      case 'RESTORE_STATE':
        storageObject = JSON.parse(localStorage.getItem(defaults.savedCampaignState));

        var newState = _objectSpread({}, _this.initState);

        for (var key in storageObject) {
          if (key in _this.initState) newState[key] = storageObject[key];
        }

        localStorage.setItem(defaults.savedCampaignState, JSON.stringify(newState));
        return _objectSpread({}, newState);

      case 'MODIFY_STATE':
        localStorage.setItem(defaults.savedCampaignState, JSON.stringify(_objectSpread({}, action.state)));
        return _objectSpread({}, action.state);

      case 'FACTORY_RESET':
        localStorage.setItem(defaults.savedCampaignState, JSON.stringify({}));
        return _objectSpread({}, _this.initState);
    }

    return state;
  });

  _defineProperty(this, "mapStateToProps", function (state, ownProps) {
    return _objectSpread({}, state, {}, ownProps);
  });

  _defineProperty(this, "mapDispatchToProps", function (dispatch) {
    return {
      resetState: function resetState(state) {
        var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
        dispatch({
          state: state,
          type: 'RESET_STATE'
        });
        callback();
        return true;
      },
      restoreState: function restoreState() {
        dispatch({
          type: 'RESTORE_STATE'
        });
        return true;
      },
      modifyState: function modifyState(state) {
        dispatch({
          type: 'MODIFY_STATE',
          state: state
        });
        return true;
      },
      factoryReset: function factoryReset() {
        var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        dispatch({
          type: 'FACTORY_RESET'
        });
        if (callback) callback();
        return true;
      }
    };
  });

  var _ReactRedux = ReactRedux,
      Provider = _ReactRedux.Provider,
      connect = _ReactRedux.connect;
  var _Redux = Redux,
      createStore = _Redux.createStore;
  var store = createStore(this.rootReducer);
  Campaign = connect(this.mapStateToProps, this.mapDispatchToProps)(Campaign);
  ReactDOM.render(React.createElement(Provider, {
    store: store
  }, React.createElement(Campaign, null)), document.getElementById("app"));
};

var campaignSettings = new CampaignSettings();