const {connect} = ReactRedux;
const mapStateToProps = (state , ownProps) => {
    return {...state , ...ownProps};
};


class  MerchantHeader extends React.Component {

    faqs = [
        {

            question : `What is ${defaults.siteName}` ,
            answer : `${defaults.siteName} is Nigeria's first price/product Search engine, 
             that in-corporates Best Advertisement programme into it's core product.`
        } ,
        {

            question : `What is ${defaults.siteName} Merchant account` ,
            answer : `${defaults.siteName} Merchant account is an account created solely for advertisers/businesses/individuals 
             who wants to ensure  their products/services reaches Millions of Nigerians without leaving a hole in their pocket.`
        } ,

        {

            question: `Does ${defaults.siteName} Ad rates consider SME's , individuals and small businesses`,
            answer: `Yes, and Yes again, our ad rates are very affordable, we have also taken into consideration, 
            Students and small income earners to leverage the opportunity of this great platform to advertise at the cheapest rate.`
        }


        ,
        {

            question : `What does it mean to Activate your account` ,
            answer : <span>
                New Merchant accounts on {defaults.siteName} by default are deactivated ,
                new Merchants are required to activate their account with a one-time payment of &#8358; {defaults.merchantActivationFee} ,
                doing this means You've read and agreed to our Terms/Conditions of service.
            </span>

        } ,

        {

            question : `How long does my activation last` ,
            answer : `The activation fee is a one-time payment, in other words,  it's just once, and you're forever activated.`
        }
        ,
        {

            question : `How much does ${defaults.siteName} charge Merchants for Ads` ,
            answer : `Our Ad rates depends on the type of Ad you want to display , the different types of Ads and their rate are further discussed below.`

        },

        {
            question : `What is PPV (pay per view)`,
            answer : `Our Pay per view Ad option describes how much an Advertiser pays each time his/her Ad is shown to a user.`
        }
        ,
        {
            question : `What is PPC (pay per click)` ,
            answer : 'Our Pay per click option describes how much an Advertiser pays each time his/her Ad is clicked.'
        }
        ,
        {
            question : `What is ${defaults.siteName} Publisher/Affiliate Program`,
            answer : `This is the easiest way Advertisers/Merchants and Big Companies can spread viral Ads 
            without spending Millions of Naira on Tv Commercials.  the Ads are simply given to our users,
            who had signed up for our affiliate account , to post on their various social media accounts, creating an avenue for
             easy dissemination of information in the most fashionable way.`


        }

        ,
        {
            question : `What is PPA (Pay per Affiliate)` ,
            answer : `Pay per Affiliate a.k.a (PPA) is the amount ${defaults.siteName} charges when one of our Affiliate account users
            
            posts a unique Ad on his/her social media platform,  this charge is dependent on various factors and Algorithms which have devised,
            in order to ensure that Advertisers get value for their Money.             `
        },
        {
            question : `Why is there no password authentification`,
            answer :  <span>
                If you've paid attention to this website You'd notice that we do not require passwords for authentification.<br />
                The reason for this decision is because of the fact that, users gaining access to your account, have nothing to gain,
                since all the actions require payments.<br />
                all that is required to login to your account is simply your account email address which in turn, leads to a more convinient login process.
                            </span>
        }

    ];
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
        this.defaultAction();


    };


    defaultAction = () => {
        this.faqModalPopUp = $('.modal#faq-modal');
        this.faqModalPopUp.modal({dismissible: false});

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
                <li className="header-nav"><a onClick={this.handleNavClick} href="#tos-modal"><i className="material-icons small left">assignment</i>Terms of service <span className="new badge play-badge" data-badge-caption = "updated"></span></a></li>
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
                <a href="#" onClick={() => {this.faqModalPopUp.modal('close')}} className="modal-close waves-effect waves-green btn-flat no-underline">OK, I've read it</a>
            </div>
        </div>
     );
    };

    render () {


        return (
            <div className="header">
                {this.faqModal()}
                {this.webNavs()}
                {this.mobileNavs()}
            </div>
        );
    }
}

MerchantHeader = connect(mapStateToProps)(MerchantHeader);