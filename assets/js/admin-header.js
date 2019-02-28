const {connect} = ReactRedux;
const mapStateToProps = (state , ownProps) => {
    return {...state , ...ownProps};
};


class  AdminHeader extends React.Component {


    componentDidMount = () => {
        this.sideNav = $('.sidenav');
        this.sideNav.sidenav({preventScrolling:true});
        $('.collapsible').collapsible();

    };

    componentDidUpdate = () => {
        this.sideNav = $('.sidenav');

        this.sideNav.sidenav({preventScrolling:true});
    };
    render () {



        );
    }
}

AdminHeader = connect(mapStateToProps)(AdminHeader);