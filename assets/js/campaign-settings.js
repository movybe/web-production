"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        units: 10,
        reloadPage: false
    });

    _defineProperty(this, "rootReducer", function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.initState;
        var action = arguments.length > 1 ? arguments[1] : undefined;
        var storageObject;

        switch (action.type) {
            case 'RESET_STATE':
                localStorage.setItem(defaults.savedCampaignState, JSON.stringify({ ...action.state
                }));
                return { ...action.state
                };

            case 'RESTORE_STATE':
                storageObject = JSON.parse(localStorage.getItem(defaults.savedCampaignState));
                var newState = { ..._this.initState
                };

                for (var key in storageObject) {
                    if (key in _this.initState) newState[key] = storageObject[key];
                }

                localStorage.setItem(defaults.savedCampaignState, JSON.stringify(newState));
                return { ...newState
                };

            case 'MODIFY_STATE':
                localStorage.setItem(defaults.savedCampaignState, JSON.stringify({ ...action.state
                }));
                return { ...action.state
                };

            case 'FACTORY_RESET':
                localStorage.setItem(defaults.savedCampaignState, JSON.stringify({}));
                return { ..._this.initState
                };
        }

        return state;
    });

    _defineProperty(this, "mapStateToProps", function (state, ownProps) {
        return { ...state,
            ...ownProps
        };
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