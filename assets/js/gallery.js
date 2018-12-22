class Gallery extends React.Component{


    defaultAction = () => {
        $('.gallery-2 span.gallery-images-link').lightbox();

    };
    componentDidUpdate() {

        this.defaultAction();

    }
    componentDidMount() {
        this.defaultAction();
    }

    render() {

        const {gallery} =  this.props;

        const images = gallery.map((image , index) => {


           return index < gallery.length -1 ? <span key = {Math.random()} className="gallery-images-link" href={image.src} data-caption = {image.alt}></span> : null;
        });

        return (
            <div className="gallery-2">
                {images}
            </div>

        )

    }
}

let mapPropsToState =  state => {
    return state;
};

let {connect} = ReactRedux;

Gallery = connect(mapPropsToState)(Gallery);
