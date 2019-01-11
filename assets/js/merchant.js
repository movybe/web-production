class Merchant extends React.Component
{

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col s7 push-s5"><span className="flow-text">This div is 7-columns wide on pushed to the right by 5-columns.</span>
                    </div>
                    <div className="col s5 pull-s7"><span className="flow-text">5-columns wide pulled to the left by 7-columns.</span>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = (state , ownProps) => {
    return {
        ...state , ...ownProps
    }
};


const  mapDispatchToProps = dispatch =>
{

    return {
        resetState : (state , callback) => {
            dispatch({state , type : 'RESET_STATE'});
            callback();
        } ,
        restoreState : () => {
            dispatch({type : 'RESTORE_STATE'});
        } ,
        modifyState : state => {
            dispatch({type : 'MODIFY_STATE' , state});
        }

    }
};


const {connect} = ReactRedux;
Merchant = connect(mapStateToProps , mapDispatchToProps)(Merchant);

