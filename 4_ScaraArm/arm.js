function Arm() {

    this.l1 = 130
    this.l2 = 100
    this.theta1 = 20
    this.theta2 = 45

    this.armWidth = 20

    this.arm1 = new Polygon()
    this.arm1.addCorner(createVector(-this.armWidth/2, 0))
             .addCorner(createVector(-this.armWidth/2, this.l1))
             .addCorner(createVector( this.armWidth/2, this.l1))
             .addCorner(createVector( this.armWidth/2, 0))
             .calculateSegments()
             .setColors(160,90,80)
             .finished = true


    this.arm2 = new Polygon()
    this.arm2.addCorner(createVector(-this.armWidth/2, 0))
             .addCorner(createVector(-this.armWidth/2, this.l2))
             .addCorner(createVector( this.armWidth/2, this.l2))
             .addCorner(createVector( this.armWidth/2, 0))
             .calculateSegments()
             .setColors(160,90,80)
             .finished = true

    this.render = function() {

        push()

        translate(width/2, height/2)

        rotate(-PI/2) //Offset to set 0 degrees pointing right
        rotate(radians(this.theta1)) //Positive angles move counterclockwise

        this.arm1.render()

        translate(0, this.l1)

        rotate(radians(this.theta2))

        this.arm2.render()

        pop()

    }

    this.calculateInverse = function(x, y) {

        const theta = Math.atan2(y, x)

        if (Math.sqrt(y**2+x**2) < this.l1 + this.l2) {

            const cosQ3 = (x**2 + y**2 - this.l1**2 - this.l2**2)/(2 * this.l1 * this.l2)
            const sinQ3 = Math.sqrt(1 - (cosQ3**2))
            const q3 = Math.atan2(sinQ3, cosQ3)
            const alpha = Math.atan2((this.l2 * sinQ3), (this.l1 + this.l2 *cosQ3))
            const q2 = theta - alpha

            this.theta1 = degrees(q2)
            this.theta2 = degrees(q3)

        }

        else {

            this.theta1 = degrees(theta)
            this.theta2 = 0

        }


    }


}