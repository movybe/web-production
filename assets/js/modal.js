class Modal {


    constructor()
    {
        this.modal = $('#myModal');
        this.slides = $('.mySlides');
        this.dots = $('.demo');
        this.captionText = $('#caption');
        this.slideIndex = 1;
    }

    openModal (){
        this.modal.show();
        return this;
    };

    closeModal () {
        this.modal.hide();
        return this;
    };

    showSlides (n) {
        let i;
        if (n > this.slides.length) {this.slideIndex = 1}
        if (n < 1) {this.slideIndex = this.slides.length}
        for (i = 0; i < this.slides.length; i++) {
            this.slides[i].hide();
        }
        for (i = 0; i < this.dots.length; i++) {
            this.dots[i].removeClass('active');
        }
        this.slides[this.slideIndex-1].show();
        this.dots[this.slideIndex-1].addClass("active");
        this.captionText.html(this.dots[this.slideIndex-1].attr('alt'));

    };


    plusSlides (n) {
        this.showSlides(this.slideIndex += n);
    };

    currentSlide(n)  {
        this.showSlides(this.slideIndex = n);
        return this;
    };

}