class CampaignSettings{


    initState = {
        accountType : null ,
        email : null ,
        ads : [],
        showRefererEmailField : false,
        showPayButton : false ,
        alreadyExistingAccount : false,
        emailVerified : false,
        showAccountTypeSelection : false ,
        stateReset : true ,
        user : {} ,
        adRates : {cpc : 1 , cpv : 2 , cpa : 3},
        defaultUsername : "5t6h8j",
        units : 10,
        reloadPage : false
    };


    rootReducer = (state = this.initState , action ) => {
        let storageObject;
        switch (action.type) {
            case 'RESET_STATE' :
                localStorage.setItem(defaults.savedCampaignState , JSON.stringify({...action.state}));
                return {...action.state};
            case 'RESTORE_STATE' :
                storageObject = JSON.parse(localStorage.getItem(defaults.savedCampaignState));
                let newState = {...this.initState};

                for(let key in storageObject){
                    if(key in this.initState)
                      newState[key] = storageObject[key];
                }
                localStorage.setItem(defaults.savedCampaignState , JSON.stringify(newState));
                return {...newState};

            case 'MODIFY_STATE' :
                localStorage.setItem(defaults.savedCampaignState , JSON.stringify({...action.state}));
                return {...action.state};
            case 'FACTORY_RESET' :
                localStorage.setItem(defaults.savedCampaignState , JSON.stringify({}));
                return {...this.initState};
        }

        return state;


    };

    mapStateToProps = (state , ownProps) =>
    {
        return {...state , ...ownProps};
    };

    mapDispatchToProps = dispatch =>
    {

        return {
            resetState : (state , callback = () => {}) => {
                dispatch({state , type : 'RESET_STATE'});

                callback();
                return true
            } ,
            restoreState : () => {
                dispatch({type : 'RESTORE_STATE'});
                return true;
            } ,
            modifyState : state => {
                dispatch({type : 'MODIFY_STATE' , state});
                return true;
            },
            factoryReset : (callback = null) => {
                dispatch({type:'FACTORY_RESET'});
                if(callback) callback();
                return true;
            }



        }
    };

    constructor()
    {

        const {Provider , connect} = ReactRedux;
        let {createStore} = Redux;
        const store = createStore(this.rootReducer);

        Campaign = connect(this.mapStateToProps , this.mapDispatchToProps)(Campaign);

        ReactDOM.render(<Provider store = {store}><Campaign /></Provider> , document.getElementById("app"))





    }
}

const campaignSettings = new CampaignSettings();

