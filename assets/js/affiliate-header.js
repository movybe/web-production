const {connect} = ReactRedux;
const mapStateToProps = (state , ownProps) => {
    return {...state , ...ownProps};
};


class  AffiliateHeader extends React.Component {

    faqs = [
        {

            question : `What is ${defaults.siteName}` ,
            answer : `${defaults.siteName} is Nigeria's first price/product Search engine, 
             we in-corporate Best Advertisement  programme into our product.`
        } ,
        {

            question : `What is ${defaults.siteName} Affiliate programme` ,
            answer : `${defaults.siteName} affiliate allows members to earn income from home, 
            at the comfort of their bed room, by  simply referring their friends/family to ${defaults.siteName}.`
        } ,

        {

            question: `How can i refer friends/family to ${defaults.siteName}`,
            answer: `It's very simple, just share your username with your friends when they signup. they simply input your username as their referer, it's as simple as that.`
        }


        ,
        {
            question : `Why is my account deactivated` ,
            answer : <span>
                When your account is deactivated,it simply means you have earned more than <span className="strong">&#8358;{defaults.thresholdAmount}</span> in the last 30 days.
                therefore you're required to re-activate your account with a new referer username this time, different from your old referer.
            </span>
        }
        ,
        {

            question : `How long does my account activation last` ,
            answer : <span>Your account will only be de-activated if You've earned more than <span className="strong">&#8358;{defaults.thresholdAmount}</span> in the last 30 days. <q className="light strong">else your account remains active</q></span>
        }
        ,

        {
            question : `What other way can i earn with ${defaults.siteName}`,
            answer : <span>
                You can also earn when you invite your friends to {defaults.siteName} by sharing your invitation link: <a className="red-text strong" href="#">{defaults.siteAddressHttps + "/r/" + this.props.user.username}</a> with your friends.<br />
                you get paid <span className="strong">&#8358;{defaults.amountPaidForUniqueVisitor}</span> for each unique visitor that visits that url.
            </span>

        }];
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


        this.headerNav = $('li.header-nav');
        this.withdrawalForm = $('#withdrawal-form');
        this.withdrawalFieldSet = $('#withdrawal-fieldset');
        this.withdrawalAmount = $('#withdrawal-amount');
        this.withdrawalResponseMessage = $('#withdrawal-response-message');
        this.defaultAction();


    };


    defaultAction = () => {
        this.faqModalPopUp = $('.modal#faq-modal');
        this.tosModalPopUp = $('.modal#tos-modal');
        this.demoModalPopUp = $('.modal#demo-modal');

        this.withdrawalModalPopup = $('.modal#withdrawal-modal');
        this.faqModalPopUp.modal({dismissible: false});
        this.tosModalPopUp.modal({dismissible: false});
        this.demoModalPopUp.modal({dismissible: false});
        this.withdrawalModalPopup.modal({dismissible:false});


    };
    refreshProfile = () => {
        let data = {email : this.props.email , action : 'FETCH_AFFILIATE_DETAILS'};
        data = JSON.stringify(data);
        $.post(defaults.actions , {data} , response1 => {
            response1 = JSON.parse(response1);
            this.props.resetState({...this.props , user : response1.user});
        });
    };

    logout = () => {


        if(this.props.factoryReset())
        {
            window.location.reload();
        }
    };

    handleWithdrawalForm = e => {
        e.preventDefault();

        this.withdrawalForm.validate();

        if(this.withdrawalForm.valid())
        {
            const amount = parseInt(this.withdrawalAmount.val()) - defaults.withdrawalCharge;
            const email = this.props.email;
            const action = 'AFFILIATE_WITHDRAWAL';
            const withdrawalCharge = defaults.withdrawalCharge;

            let data = {amount , email , action , withdrawal_charge : withdrawalCharge};
            data = JSON.stringify(data);

            this.withdrawalFieldSet.prop(...defaults.disabledTrue);

            $.post(defaults.actions , {data} , response => {


                response = JSON.parse(response);
                this.withdrawalResponseMessage.text(response.error);
                this.withdrawalResponseMessage.show();
                defaults.showToast(response.error);
                this.withdrawalFieldSet.prop(...defaults.disabledFalse);

                if(response.success){
                    this.withdrawalResponseMessage.removeClass('red-text');
                    this.withdrawalResponseMessage.addClass('green-text');
                    this.withdrawalAmount.val(null);
                    this.refreshProfile();
                }
                else {
                    this.withdrawalResponseMessage.removeClass('green-text');
                    this.withdrawalResponseMessage.addClass('red-text');
                }


                setTimeout(() => {

                    this.withdrawalResponseMessage.text(null);
                    this.withdrawalResponseMessage.hide();
                } , 5000);




            });

        }
    };


    componentDidUpdate =() => {
        //Initialize the Modals
        this.defaultAction();
    };

    navContents = () => {

        return (
            <div>
                <li className="active header-nav"><a href="#" onClick={this.handleNavClick}><i className="material-icons small left">home</i>Home</a></li>
                <li className="header-nav"><a href="#faq-modal" className="modal-trigger" onClick={this.handleNavClick}><i className='material-icons small left'>question_answer</i>Faq's
                    <span className="new badge blue notification-badge" data-badge-caption="Must read"></span></a></li>
                <li className="header-nav"><a className="modal-trigger" onClick={this.handleNavClick} href="#tos-modal"><i className="material-icons small left">assignment</i>Terms<span className="new badge play-badge" data-badge-caption = "updated"></span></a></li>
                <li ><a onClick={this.handleNavClick} href= {defaults.whatsappContactLink}><i className = "material-icons small left">message</i>{defaults.whatsappContact}</a> </li>
                <li className="header-nav"><a className="modal-trigger" href="#withdrawal-modal"><i className="material-icons small left">payment</i>Withdraw</a></li>
                <li ><a onClick= {this.logout} href= "#"><i className = "material-icons small left">power_settings_new</i>Logout</a> </li>

            </div>
        )
    };


    withdrawalModal = ()  => {

        return (

            <div id="withdrawal-modal" className="modal modal-fixed-footer">
                <div className="modal-content">
                   <fieldset id="withdrawal-fieldset">
                       <form id = "withdrawal-form" method="POST" action="#" onSubmit={this.handleWithdrawalForm}>
                           <div className="row">
                               <div className="input-field col s12">
                                   <h5>Your bank details</h5>
                               <span id="account-name" className="bank-account-details">{this.props.user.account_name.truncate(defaults.accountNameLengthToShow)}</span>
                               <span id="account-number" className="bank-account-details">{this.props.user.account_number.toString().truncate(defaults.accountNumberDigitLengthToShow)}</span>
                               <span id="bank-name" className="bank-account-details">{this.props.user.bank_name}</span>
                                   <span className="right">Account Bal: <span className="strong">&#8358; {this.props.user.account_balance.toLocaleString()}</span> </span>
                               </div>
                           </div>
                           <div className="row">
                               <div className="input-field col s12">
                                   <input id="withdrawal-amount"  pattern="(\d)$" required="required" name = "withdrawal-amount" type="number" min = {defaults.minimumWithdrawalAmount} className="validate" />
                                   <label htmlFor="withdrawal-amount" className="active">Amount</label>
                                   <span className="helper-text" id = "withdrawal-response-message"></span>

                                   <button type="submit" id="withdrawal-submit-button" className="waves-effect waves-light btn-small">Proceed</button>
                                   <span className="helper-text right" id ="withdrawal-charge-message">QuickTeller will charge <span className="strong">&#8358;{defaults.withdrawalCharge}</span> for this transfer.</span>
                               </div>
                           </div>
                          </form>
                   </fieldset>
                </div>
                <div className="modal-footer">
                    <a href="#" onClick={() => {this.withdrawalModalPopup.modal('close')}} className="modal-close waves-effect waves-green btn-flat no-underline strong light">CLOSE</a>
                </div>
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
                        <a href="#demo-modal" className="brand-logo  right watch-demo-video modal-trigger">Demo Video</a>
                        <ul className="left hide-on-med-and-down">
                            {this.navContents()}
                        </ul>
                    </div>
                </nav>

            </div>
        );
    };
    faqModal = () => {

        let faqsQuestionsAndAnswers = this.faqs.map(faq => {
            return <div key={Math.random()}>

                <h6 className="faq-question">
                    {faq.question}?
                </h6>
                <p className="faq-answer">{faq.answer}</p>
            </div>

        });
        return (
            <div id="faq-modal" className="modal modal-fixed-footer">
                <div className="modal-content">
                    <h5>
                        Our Frequently asked Questions
                    </h5>
                    {faqsQuestionsAndAnswers}

                </div>
                <div className="modal-footer">
                    <a href="#" onClick={() => {this.faqModalPopUp.modal('close')}} className="modal-close waves-effect waves-green btn-flat no-underline strong light">OK, I've read it</a>
                </div>
            </div>
        );
    };

    demoModal = () =>
    {

        return (
            <div id="demo-modal" className="modal modal-fixed-footer">
                <div className="modal-content">
                    <h5>
                        Watch our Demo Video
                    </h5>
                    <div className="video-container">
                        {/*
                            <iframe width="1102" height="620"
                                    src={defaults.affiliateYoutubeVideo} frameBorder="0"
                                    allowFullScreen></iframe>
                                    */}
                    </div>
                </div>
                <div className="modal-footer">
                    <a href="#" onClick={() => {this.demoModalPopUp.modal('close')}} className="modal-close waves-effect waves-green btn-flat no-underline strong light">Close</a>
                </div>
            </div>
        );

    };

    tosModal = () =>
    {


        return(

            <div id="tos-modal" className="modal modal-fixed-footer">
                <div className="modal-content">
                    <h5>
                        Our Terms Of Service("Terms")
                    </h5>



                    <h6 className="faq-question"> Last updated: 27-12-2018</h6><br /><br />
                    <p>
                        Please read these Terms and Conditions ("Terms", "Terms and Conditions") carefully before using the website {defaults.siteAddressHttp} and mobile application (the "Service") operated by {defaults.siteAddress} ("us", "we", or "our").<br /><br />

                        Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Service.<br /><br />

                        By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.<br /><br />
                    </p>

                    <h6 className="faq-question">Payments</h6>
                    <p>

                        All payments made on this website ({defaults.siteAddressHttp}) are non-refundable, we are not held responsible for any damage as a result of payment on this website.

                    </p>

                    <h6 className="faq-question">Subscription (Affiliate)</h6>
                    <p>
                        Some parts of the Service are billed on a subscription basis i.e Affiliate  ("Subscription(s)"). You will be billed in advance on a recurring<br /><br />

                        While we make every effort to ensure that we accurately represent all the products and services reviewed on {defaults.siteAddress} affiliate Income Program and their potential for income, it should be noted that earnings and income statements made by {defaults.siteAddress} and its advertisers / sponsors are estimates only of what we think you can possibly earn. There is no guarantee that you will make these levels of income and you accept the risk that the earnings and income statements differ by individual.<br /><br />

                        As with any business, your results may vary, and will be based on your individual capacity, business experience, expertise, and level of desire. There are no guarantees concerning the level of success you may experience. The testimonials and examples used are exceptional results, which do not apply to the average purchaser, and are not intended to represent or guarantee that anyone will achieve the same or similar results. Each individual’s success depends on his or her background, dedication, desire and motivation.<br /><br />

                        There is no assurance that examples of past earnings can be duplicated in the future. We cannot guarantee your future results and/or success. There are some unknown risks in business and on the internet that we cannot foresee which could reduce results you experience. We are not responsible for your actions.<br /><br />

                        The use of our information, products and services should be based on your own due diligence and you agree that {defaults.siteAddress} and the advertisers / sponsors of this website are not liable for any success or failure of your business that is directly or indirectly related to the purchase and use of our information, products and services reviewed or advertised on this website.<br /><br />

                        All Affiliate accounts older than 6 Months , with a net profit of more than <strong>&#8358;{defaults.minimumAffliateProfit}</strong> are subject to been deactivated.


                    </p>
                    <h6 className="faq-question">Terms of Participation (Affiliate)</h6>
                    <p>
                        Members must be 18 years of age or older to participate. Members must provide {defaults.siteAddress} affiliate Income Program with accurate, complete and updated registration information, including an accurate account name , bank name , account number  and email address. To the full extent allowed by applicable law, {defaults.siteAddress} affiliate Income Program at its sole discretion and for any or no reason may refuse to accept applications for membership.
                    </p>
                    <h6 className="faq-question">Refund Policy(Affiliate)</h6>
                    <p className="strong light">As we are offering non-tangible virtual digital goods ({defaults.siteAddress} affiliate Pack) which is form of registration fee , we do not generally issue refunds after the purchase of {defaults.siteAddress} affiliate Pack has been made. Please note that by purchasing the {defaults.siteAddress} affiliate Pack, you agree to the terms of the Refund Policy.</p>
                    <p>
                        Member’s discontinued participation in the {defaults.siteAddress} Income Program or failure to notify {defaults.siteAddress} Income Program of any address (mailing or email) changes may result in the termination of Member’s membership and forfeiture of Member’s unredeemed Earnings.<br /><br />

                        If member objects to any of the Terms and Conditions of this Agreement, or any subsequent modifications to this agreement, or becomes dissatisfied with the Program, Member’s only recourse is to immediately discontinue participation in {defaults.siteAddress} Income Program and properly terminate his or her membership.
                    </p>

                    <h5>Disclaimers</h5>

                    MEMBER EXPRESSLY AGREES THAT USE OF THE SERVICE IS AT MEMBER’S SOLE RISK. THE SERVICE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. TO THE MAXIMUM EXTENT ALLOWED BY APPLICABLE LAW, {defaults.siteAddress} affiliate program EXPRESSLY DISCLAIMS ALL WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED BY LAW, CUSTOM OR OTHERWISE, INCLUDING WITHOUT LIMITATION ANY WARRANTY OF MERCHANTABILITY, SATISFACTORY QUALITY, FITNESS FOR A PARTICULAR PURPOSE OR NON-INFRINGEMENT. {defaults.siteAddress} affiliate program MAKES NO WARRANTY REGARDING ANY GOODS OR SERVICES PURCHASED OR OBTAINED THROUGH THE PROGRAM OR ANY TRANSACTIONS ENTERED INTO THROUGH THE PROGRAM.<br /><br />

                    TO THE MAXIMUM EXTENT ALLOWED BY APPLICABLE LAW, NEITHER {defaults.siteAddress} affiliate program NOR ANY OF ITS MEMBERS, SUBSIDIARIES, PUBLISHERS, SERVICE PROVIDERS, LICENSORS, OFFICERS, DIRECTORS OR EMPLOYEES SHALL BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF OR RELATING TO THIS AGREEMENT, RESULTING FROM THE USE OR THE INABILITY TO USE THE SERVICE OR FOR THE COST OF PROCUREMENT OF SUBSTITUTE GOODS AND SERVICES OR RESULTING FROM ANY GOODS OR SERVICES PURCHASED OR OBTAINED OR MESSAGES RECEIVED OR TRANSACTIONS ENTERED INTO THROUGH THE PROGRAM OR RESULTING FROM UNAUTHORIZED ACCESS TO OR ALTERATION OF USER’S TRANSMISSIONS OR DATA, INCLUDING BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS, USE, DATA OR OTHER INTANGIBLE, EVEN IF SUCH PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.<br /><br />

                    To prevent unauthorized access, maintain data accuracy, and ensure the correct use of information, {defaults.siteAddress} affiliate program uses appropriate industry standard procedures to safeguard the confidentiality of Member’s personal information, such as SSL, firewall, encryption, token authentication, application proxies, monitoring technology, and adaptive analysis of the Website’s traffic to track abuse of the {defaults.siteAddress} Income Website and its data. However, no data transmitted over the Internet can be 100% secure. As a result, while {defaults.siteAddress} affiliate program strives to protect its Members personal information, {defaults.siteAddress} affiliate program cannot guarantee the security of any information that Members transmit to or from the participating advertisers/merchants and Member does so at his/her own risk.<br /><br />

                    This Agreement constitutes the entire Agreement between Member and {defaults.siteAddress} affiliate program in connection with general membership in the {defaults.siteAddress} affiliate program and supersedes all prior agreements between the parties regarding the subject matter contained herein. If any provision of this AGREEMENT is found invalid or unenforceable, that provision will be enforced to the maximum extent permissible, and the other provisions of this AGREEMENT will remain in force. No failure of either party to exercise or enforce any of its rights under this AGREEMENT will act as a waiver of such rights. <br /><br />
                </div>
                <div className="modal-footer">
                    <a href="#" onClick={() => {this.tosModalPopUp.modal('close')}} className="modal-close waves-effect waves-green btn-flat no-underline strong light">OK, I've accepted</a>
                </div>
            </div>

        )

    };


    render () {


        return (
            <div className="header">
                {this.faqModal()}
                {this.tosModal()}
                {this.demoModal()}
                {this.webNavs()}
                {this.mobileNavs()}
                {this.withdrawalModal()}
            </div>
        );
    }
}

AffiliateHeader = connect(mapStateToProps)(AffiliateHeader);