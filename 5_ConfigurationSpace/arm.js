function Arm() {

    this.l1 = 130
    this.l2 = 100
    this.theta1 = 20
    this.theta2 = 0

    this.armWidth = 20

    this.arm1 = new Polygon()
    this.arm1.addCorner(createVector(-this.armWidth/2, 0))
             .addCorner(createVector(-this.armWidth/2, this.l1))
             .addCorner(createVector( this.armWidth/2, this.l1))
             .addCorner(createVector( this.armWidth/2, 0))
             .rotate((this.theta1))
             .setColors(160,90,80)
             .finished = true


    this.arm2 = new Polygon()
    this.arm2.addCorner(createVector(-this.armWidth/2, 0))
             .addCorner(createVector(-this.armWidth/2, this.l2))
             .addCorner(createVector( this.armWidth/2, this.l2))
             .addCorner(createVector( this.armWidth/2, 0))
             .rotate((this.theta2))
             .translate(0, this.l1)
             .rotate((this.theta1))
             .setColors(160,90,80)
             .finished = true

    this.detectCollisions = function(polys) {

        if (this.arm1.isIntersectedByPolygons(polys) || this.arm2.isIntersectedByPolygons(polys)) {
            this.arm1.intersected = true
            this.arm2.intersected = true
        }
        else {
            this.arm1.intersected = false
            this.arm2.intersected = false
        }

    }

    this.setAngles = function(newTheta1, newTheta2) {

        const theta2Dif = newTheta2 - this.theta2

        const cosT1  = Math.cos(this.theta1)
        const sinT1  = Math.sin(this.theta1)
        const cosT2D = Math.cos(theta2Dif)
        const sinT2D = Math.sin(theta2Dif)
        const cosNT1 = Math.cos(newTheta1)
        const sinNT1 = Math.sin(newTheta1)

        console.time("a")
        let a = cosNT1*cosT2D
        let b = sinNT1*sinT2D
        let c = cosNT1*sinT2D
        let d = sinNT1*cosT2D

        this.arm1.rotate(newTheta1 - this.theta1)

        this.arm2.applyTransformationMatrix([[cosT1*(a-b)+sinT1*(d+c), sinT1*(a-b)-cosT1*(c+d), (c+d-sinNT1)*this.l1],
                                             [cosT1*(d+c)+sinT1*(b-a), sinT1*(d+c)+cosT1*(a-b), (b-a+cosNT1)*this.l1],
                                             [           0           ,            0           ,       1      ]])


        // this.arm2.applyTransformationMatrix([[ cosT1, sinT1 , 0],
        //                                      [-sinT1, cosT1 ,-this.l1],
        //                                      [  0   ,   0   , 1]])

        // this.arm2.applyTransformationMatrix([[cosNT1*cosT2D-sinNT1*sinT2D, -cosNT1*sinT2D-sinNT1*cosT2D, -sinNT1*this.l1],
        //                                      [sinNT1*cosT2D+cosNT1*sinT2D, -sinNT1*sinT2D+cosNT1*cosT2D, cosNT1*this.l1],
        //                                      [             0             ,              0              ,        1       ]])
  
        console.timeEnd("a")

        this.theta1 = newTheta1
        this.theta2 = newTheta2

    }

    this.render = function() {

        //DRAW ARMS
        push()

        rotate(-PI/2) //Offset to set 0 degrees pointing right
        // rotate((this.theta1)) //Positive angles move counterclockwise
        // this.arm1.rotate(this.theta1)
        this.arm1.render()

        // translate(0, this.l1)
        // rotate((this.theta2))

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

            if (isNaN(q2) || isNaN(q3)) { //Invalid position, dont move arms
                return {
                    angle1: this.theta1,
                    angle2: this.theta2
                }
            }

            return {
                angle1: q2,
                angle2: q3
            }

        }

        else { //Point outside arms range, leave arms at max extension

            return {
                angle1: theta,
                angle2: 0
            }

        }


    }


}