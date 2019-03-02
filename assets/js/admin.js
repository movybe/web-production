class Admin extends React.Component
{
    texts ={payments : 'payments' , ads : 'ads' , stats : 'stats'};
    state = {
        content : this.texts.payments ,
        payment_details : [
            {account_name : "Kosi Eric" , account_number : 2093954338 , bank_name : "Access Bank" , amount : 34000}
        ]
        ,
        current_payment_index : -1,
        site_statistics : {}
    };


    componentWillMount = () => {

            $.getScript('/assets/js/clipboard.js');
    };


    refreshProfile = () => {
        let data = {email : this.props.email , action : 'FETCH_MERCHANT_DETAILS'};
        data = JSON.stringify(data);
        $.post(defaults.actions , {data} , response1 => {
            response1 = JSON.parse(response1);
            console.log(this.state);
            this.props.resetState({...this.props , user : response1.user , ads : response1.ads});
            this.setState({...this.state , site_statistics : response1.user.site_statistics});
        });
    };


    getNextAd = () => {
        let data = {action : 'FETCH_NEXT_PAYMENT_DETAILS' , email : this.props.email , index : this.state.current_payment_index};

        data = JSON.stringify(data);

        $.post(defaults.actions , {data} , response => {

                response = JSON.parse(response);


            let payment_details = response.payment_details.amount ? [response.payment_details] : [];

            this.setState({...this.state , payment_details , current_payment_index : parseInt(response.payment_details.id)});


        });
    };


    confirmPayment = (paid = true) => {


        let getNext = true;
        //if the user was actually paid
        if(paid) {
            getNext = false;
            let data = {
                action: 'CONFIRM_PAYMENT',
                email: this.props.email,
                reference_code: this.state.payment_details[0].reference_code,
                amount : this.state.payment_details[0].amount
            };
            data = JSON.stringify(data);

            $.post(defaults.actions, {data}, response => {

                response = JSON.parse(response);
                defaults.showToast(response.error);

                this.getNextAd();
            });

        }
        this.confirmPaymentModalPopup.modal('close');
        if(getNext)this.getNextAd();

    };

    componentDidMount = () => {


        this.sidenav = $('.sidenav');
        this.sidenav.sidenav({preventScrolling:true});
        $('.collapsible').collapsible();

        //Fetch the next payment details

        this.getNextAd();

        try {
            this.refreshProfile();
            this.confirmPaymentModalPopup = $('.modal#confirm-payment-modal');
            this.confirmPaymentModalPopup.modal({dismissible: false});
        }
        catch (e) {
        }

    };

    confirmPaymentModal = () => {
        return (
            <div id="confirm-payment-modal" className="modal">
                <div className="modal-content">
                    <h4>Confirm payment to user</h4>
                    <p>Have you made payment to this account?</p>
                </div>
                <div className="modal-footer">
                    <a href="#" className="modal-action modal-close waves-effect waves-green btn green payment-yes-click" onClick={this.confirmPayment}>YES</a>
                    <a href="#" className="modal-action modal-close waves-effect waves-red btn red" onClick={() => this.confirmPayment(false)}>NO</a>
                </div>
            </div>
        )
    };


    siteStatistics = () => {
        let value = 0;
        let field = null;
        const tableBody = Object.keys(this.state.site_statistics).map(key  => {

            field = key.replace(/_/g, ' ');
            value = this.state.site_statistics[key];
            value = !isNaN(value) ? this.convertDecimalToLocaleString(value) : value;
            return (
                <tr key = {Math.random()}>
                    <td>
                        <strong className='strong site-statistics-field-name'>{field}</strong>
                    </td>
                    <td>
                        {value}
                    </td>
                </tr>
            )
        });
        return (
        <table className="striped centered highlight">
        <thead>
        <tr>
            <th>Field</th>
            <th>Value</th>
        </tr>
        </thead>
            <tbody>
            {tableBody}
            </tbody>
        </table>
        )
    };

    paymentDetailsTable = () => {

        let display = this.state.payment_details.length ?
            <div>
                {this.confirmPaymentModal()}
            <table className="striped centered responsive-table highlight">
                <thead>
                <tr>
                    <th>Acc name</th>
                    <th>Acc No.</th>
                    <th>Bank</th>
                    <th>Amount</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td>{this.state.payment_details[0].account_name.truncate(defaults.accountNameLengthToShow)}</td>
                    <td>{this.state.payment_details[0].account_number} <a href='#' className='no-underline' onClick={() => clipboard.writeText(this.state.payment_details[0].account_number)}>copy</a> </td>
                    <td>{this.state.payment_details[0].bank_name}</td>
                    <td>&#8358;{this.convertDecimalToLocaleString(this.state.payment_details[0].amount)}</td>
                </tr>
                </tbody>
            </table>
                <a href='#confirm-payment-modal' className="waves-effect waves-light next-payment-button btn right modal-trigger">Next</a>
            </div>
            : <h5>No payment Request yet.</h5>;

        return (



            <div>
                {display}
                </div>
           )
    };
    componentDidUpdate = () => {
        this.sidenav = $('.sidenav');

        this.sidenav.sidenav({preventScrolling:true});
    };


    changeAdminContent = (e) => {
        const content = $(e.target).attr('data-content');
        this.setState({...this.state , content});

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
                                        <a href="#" className="admin-action-links" data-content = {this.texts.payments} onClick={this.changeAdminContent}><i className="fa fa-share"></i>Withdrawal Requests
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
                                    <li><a href="#" className="admin-action-links" data-content = {this.texts.ads} onClick={this.changeAdminContent}>
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
                                        <a href="#" className="admin-action-links" data-content = {this.texts.stats} onClick={this.changeAdminContent}><i className="material-icons">terrain</i>View stats</a>
                                        <i className='material-icons admin-refresh-icon' title='refresh' onClick={this.refreshProfile}>refresh</i>
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
                                        <a href="#" className="admin-action-links" onClick={this.props.logout}><i className="material-icons">power_settings_new</i>Sign out</a>
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

        let content = null;
        switch (this.state.content) {
            case this.texts.payments:
               content = this.paymentDetailsTable();
               break;
            case this.texts.stats:
                content = this.siteStatistics();
                break;
        }

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
                            <h5 className = 'cairo-font'>
                                &#8358;{this.convertDecimalToLocaleString(this.props.user.site_statistics.account_balance)}

                            </h5>
                        </div>

                                           </div>
                </div>

                <div className="col s12 m6">
                    <h5 className="status-headers admin-status-headers">Profit</h5>
                    <div className="card">
                        <div className="card-content">
                            <h5 className = 'cairo-font'>
                                &#8358;{this.convertDecimalToLocaleString(this.props.user.site_statistics.profit)}

                            </h5>
                        </div>

                    </div>
                </div>

            </div>

                <div className="row">
                    <div className="col s12">
                        <div className="card">
                            <div className="card-content admin-actions-content-container">
                    {content}
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

