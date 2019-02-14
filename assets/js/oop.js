function Circle (radius) {

    this.radius = radius;
    this.draw = function (){
        console.log('Drawn');
    }
}


const circle = new Circle(2);