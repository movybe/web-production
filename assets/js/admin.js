class Admin extends React.Component
{
    state = {show : 'payment'};

    refreshProfile () {
        let data = {email : this.props.email , action : 'FETCH_MERCHANT_DETAILS'};
        data = JSON.stringify(data);
        $.post(defaults.actions , {data} , response1 => {
            response1 = JSON.parse(response1);
            this.props.resetState({...this.props , user : response1.user , ads : response1.ads});
        });
    }

    componentDidMount = () => {
        this.sidenav = $('.sidenav');
        this.sidenav.sidenav({preventScrolling:true});
        $('.collapsible').collapsible();
        this.refreshProfile();

    };

    componentDidUpdate = () => {
        this.sideNav = $('.sidenav');

        this.sideNav.sidenav({preventScrolling:true});
    };


    header = () => {
        return (

            <header className = 'admin-account-header'>
                <nav className='admin-navbar'>
                    <div className="nav-wrapper">
                        <a href="#" data-target="slide-out" className="sidenav-trigger"><i
                            className="material-icons">menu</i></a>
                        <a href="#" className="brand-logo admin-brand-logo"><img src = {defaults.imageDirectory + 'm-shadow.png'} className='admin-nav-brand-logo'/>
                            <span className="brand-name">{defaults.siteName}</span> </a>
                    </div>
                </nav>


            </header>
        );
    };


    sideNav = () => {
        return (
            <ul id="slide-out" className="admin-sidenav sidenav sidenav-fixed">
                <li>
                    <div className="user-view">
                        <div className="background">
                            <img src={defaults.imageDirectory+'admin-image-background.jpg'} />
                        </div>
                        <a href="#"><img className="circle" src={defaults.imageDirectory+'favicon.png'} /></a>
                        <a href="#"><span className="white-text name admin-name">{defaults.siteName + ' Admin'}</span></a>
                        <a href="#"><span className="white-text email">{this.props.user.email}</span></a>
                    </div>
                </li>
                <li className="no-padding">
                    <ul className="collapsible collapsible-accordion">
                        <li>
                            <a className="collapsible-header">Payments<i
                                className="material-icons">payment</i></a>
                            <div className="collapsible-body">
                                <ul>
                                    <li>
                                        <a href="#" className="admin-action-links"><i className="fa fa-share"></i>Withdrawal Requests
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </li>

                <li className="no-padding">
                    <ul className="collapsible collapsible-accordion">
                        <li>
                            <a className="collapsible-header"><i className="fa fa-bullhorn bullhorn-icon ad-management-icon"></i>Ad Management</a>
                            <div className="collapsible-body">
                                <ul>
                                    <li><a href="#" className="admin-action-links">
                                        <i className="material-icons">rate_review</i> Review Ads</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </li>


                <li>
                    <div className="divider"></div>
                </li>


                <li className="no-padding">
                    <ul className="collapsible collapsible-accordion">
                        <li>
                            <a className="collapsible-header" href="#"><i className="material-icons">insert_chart</i>Statistics</a>
                            <div className="collapsible-body">
                                <ul>
                                    <li>
                                        <a href="#" className="admin-action-links"><i className="material-icons">terrain</i>View stats</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </li>


                <li className="no-padding">
                    <ul className="collapsible collapsible-accordion">
                        <li>
                            <a className="collapsible-header" href="#"><i className="material-icons">person_pin</i>Account</a>
                            <div className="collapsible-body">
                                <ul>
                                    <li>
                                        <a href="#" className="admin-action-links"><i className="material-icons">power_settings_new</i>Sign out</a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </li>

            </ul>
        )
    };

    convertDecimalToLocaleString = decimal => {

        let number = parseInt(decimal);
        let dotPosition = decimal.toString().indexOf('.');
        if(dotPosition > 0)
        {
            number = number.toLocaleString() + '.' + decimal.toString().substring(dotPosition + 1);
            return number;
        }

        return number.toLocaleString();
    };
    render() {


        return (
        <main className="admin-dashboard">
            {this.header()}
                       <aside>
                {this.sideNav()}
            </aside>

            <div className="container admin-container">
            <div className="row">

                <div className="col s12 m6">
                    <h5 className="status-headers admin-status-headers">Account Balance</h5>
                    <div className="card">
                        <div className="card-content">
                            <h5>
                                &#8358;{this.convertDecimalToLocaleString(this.props.user.site_statistics.account_balance)}

                            </h5>
                        </div>

                                           </div>
                </div>

                <div className="col s12 m6">
                    <h5 className="status-headers admin-status-headers">Profit</h5>
                    <div className="card">
                        <div className="card-content">
                            <h5>
                                &#8358;{this.convertDecimalToLocaleString(this.props.user.site_statistics.profit)}

                            </h5>
                        </div>

                    </div>
                </div>

            </div>

            </div>

        </main>

        );
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
        resetState : (state , callback  = () => {}) => {
            dispatch({state , type : 'RESET_STATE'});
            callback();
        } ,
        restoreState : () => {
            dispatch({type : 'RESTORE_STATE'});
        } ,
        modifyState : state => {
            dispatch({type : 'MODIFY_STATE' , state});
        },
        factoryReset : (callback = () => {}) => {
            dispatch({type:'FACTORY_RESET'});
            return true;
        }

    }
};


const {connect} = ReactRedux;
Admin = connect(mapStateToProps , mapDispatchToProps)(Admin);

