class Footer extends  React.Component
{
    render ()
    {
        return (

            <footer className="page-footer">

                <div className="footer-copyright">
                    <div className="container">
                        © Copyright {new Date().getFullYear()} Product of {defaults.siteName}
                        <a className="grey-text text-lighten-4 right no-underline" href="#">{this.props.accountType} account</a>
                    </div>
                </div>
            </footer>

        )
    }
}