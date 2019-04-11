class Footer extends  React.Component
{

    componentDidMount = () => {

        $('.fixed-action-btn').floatingActionButton({direction: 'left'});
    };
    render ()
    {
        return (

            <footer className="page-footer">

                <div className="fixed-action-btn">
                    <a className="btn-floating btn-large waves-green">
                        <i className="large material-icons">mode_edit</i>
                    </a>
                    <ul>
                         <li><a className="btn-floating blue" onClick={ () => {this.props.refreshProfile(); defaults.showToast("profile updated")}}><i className="material-icons">refresh</i></a></li>
                    </ul>
                </div>

                <div className="footer-copyright">
                    <div className="container">
                        © Copyright {new Date().getFullYear()}, Product of {defaults.parentCompany}
                        <a className="grey-text text-lighten-4 right no-underline" href="#">{this.props.accountType} account</a>
                    </div>
                </div>
            </footer>

        )
    }
}