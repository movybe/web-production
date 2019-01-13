const {connect} = ReactRedux;
const mapStateToProps = (state , ownProps) => {
    return {...state , ...ownProps};
};


class  MerchantHeader extends React.Component {


    mobileNavs = () => {

        return (

            <ul className="sidenav" id="mobile-nav">


                {this.navContents()}

            </ul>
        )


    };


    handleNavClick = e => {


         this.headerNav.removeClass('active');
        if($(e.target).parent("li")) {

            $(e.target).parent("li").addClass("active");
        }
    };


    componentDidMount () {
        //Initialize the sidenavs

        $('.sidenav').sidenav();

        //Initialize the Modals

        $('.modal').modal();

        this.headerNav = $('li.header-nav');

    };



    navContents = () => {

        return (
            <div>
                <li className="active header-nav"><a href="#" onClick={this.handleNavClick}><i className="material-icons small left">home</i>Home</a></li>
                <li className="header-nav"><a onClick={this.handleNavClick} href="#"><i className='material-icons small left'>question_answer</i>Faq's
                    <span className="new badge blue notification-badge" data-badge-caption="Must read"></span></a></li>
                <li className="header-nav"><a onClick={this.handleNavClick} href="#"><i className="material-icons small left">assignment</i>Terms of service <span
                    className="new badge play-badge" data-badge-caption = "updated"></span></a></li>
                <li ><a onClick={this.handleNavClick} href= {defaults.whatsappContactLink}><i className = "material-icons small left">message</i>{defaults.whatsappContact}</a> </li>
            </div>
        )
    };



    webNavs = () => {

        return (

            <div className="site-header">

                <nav>
                    <div className="nav-wrapper">
                        <a href="#" data-target="mobile-nav" className="sidenav-trigger"><i
                            className="material-icons">menu</i></a>
                        <a href="#" className="brand-logo  right watch-demo-video">Watch Demo Video</a>
                        <ul className="left hide-on-med-and-down">
                            {this.navContents()}
                        </ul>
                    </div>
                </nav>

            </div>
        );
    };
    render () {

        return (


            <div className="header">
                {this.webNavs()}
                {this.mobileNavs()}
            </div>
        )
    }
}

MerchantHeader = connect(mapStateToProps)(MerchantHeader);