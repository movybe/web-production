class LightBox extends React.Component{



    render() {

        const {gallery} =  this.props;

        const slides = gallery.map((image, index) => {
        return(
            <div className="mySlides" key = {Math.random()}>
                <div className="numbertext">`${index + 1} / ${gallery.length}`</div>
                <img className="slide-images" src={image.src} />
            </div>
        );



    });
/*
        const captions = gallery.map(image => {

            return (
                <div className="caption-container">
                    <p id="caption">{image.caption}</p>
                </div>

            )
    });
  */
        const columns = gallery.map((image , index) =>{

            return (
                <div className="column" key = {Math.random()}>
                    <img className="demo cursor" src={image.src}  onClick={() => this.currentSlide(index)}
                         alt={image.alt} />
                </div>
            )

        });

        return (
            <div id="myModal" className="modal">
                <span className="close cursor" onClick={() => this.closeModal()}>&times;</span>
                <div className="modal-content">


                    {slides}
                    <a className="prev" onClick={() => this.plusSlides(-1)}>&#10094;</a>
                    <a className="next" onClick= {() => this.plusSlides(1)}>&#10095;</a>

                    <div className="caption-container">
                        <p id="caption"></p>
                    </div>

                    {columns}
                </div>
            </div>


        )

    }
}

let mapPropsToState =  state => {
    return state;
};

let {connect} = ReactRedux;

LightBox = connect(mapPropsToState)(LightBox);
