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
        stateReset : true

    };


    rootReducer = (state = this.initState , action ) => {
        switch (action.type) {
            case 'RESET_STATE' :
                localStorage.setItem(defaults.savedCampaignState , JSON.stringify({...action.state}));
                console.log("Wants to reset state");
                return {...action.state};
             case 'RESTORE_STATE' :
                return {...this.initState};
            case 'MODIFY_STATE' :
                return {...action.state};

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
            resetState : (state , callback) => {
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

