function Polygon() {

    this.corners = []
    this.segments = []

    this.finished = false
    this.movable = false;

    this.rCol = random(0, 255)
    this.gCol = random(0, 255)
    this.bCol = random(0, 255)

    this.addCorner = function(p) {

        this.corners.push(p)

    }

    //Calculates all segments of polygon
    this.calculateSegments = function() {

        this.segments = []

        for (let i = 0; i < this.corners.length; i++) {

            let lastCorner
            let firstCorner

            if (i == this.corners.length - 1) { //Segment between last and first corner

                lastCorner = this.corners[i] 
                firstCorner = this.corners[0]

            } else { //Segment between other corners

                lastCorner = this.corners[i] 
                firstCorner = this.corners[i+1]

            }

            let a = null
            let b = null

            if (abs((lastCorner.x) - (firstCorner.x)) > 3) { //If its smaller the slope tends to infinite

                a = (lastCorner.y - firstCorner.y) / (lastCorner.x - firstCorner.x)
                b = firstCorner.y - a * firstCorner.x

            }

            //If slope is high a and b are left to null, segmentIntersections or any method which uses
            //the segment parameters will need to have this into account

            this.segments.push(new Segment(a, b, lastCorner, firstCorner))


        }

    }

    //Returns all the intersections between the input segment and the polygon
    this.segmentIntersections = function(segmentIn) {

        let intersections = []

        for (const segment of this.segments) {

            if (segment.a == null) { //segment is vertical

                if (Math.min(segmentIn.p1.x, segmentIn.p2.x) <= segment.p1.x && segment.p1.x <= Math.max(segmentIn.p1.x, segmentIn.p2.x) &&
                    Math.min(segment.p1.y, segment.p2.y) <= segmentIn.p1.y && segmentIn.p1.y <= Math.max(segment.p1.y, segment.p2.y)) {
                    intersections.push(createVector(segment.p1.x, segment.p1.x*segmentIn.a + segmentIn.b))
                }
                continue
            }

            if (segmentIn.a == null) { //segment is vertical

                if (Math.min(segment.p1.x, segment.p2.x) <= segmentIn.p1.x && segmentIn.p1.x <= Math.max(segment.p1.x, segment.p2.x)) {
                    intersections.push(createVector(segment.p1.x, segment.p1.x*segment.a + segment.b))
                }
                continue
            }

            if (segment.a == segmentIn.a) continue

            //Solve for  -> (y = a1*x + b1) and (y = a2*x + b2)
            let x = -(segmentIn.b-segment.b)/(segmentIn.a-segment.a)
            // let y = p0.x*a1 + b1

            //Check if x0 is in bot segments
            if (Math.min(segmentIn.p1.x, segmentIn.p2.x) <= x && x <= Math.max(segmentIn.p1.x, segmentIn.p2.x) && 
                Math.min(segment.p1.x, segment.p2.x) <= x && x < Math.max(segment.p1.x, segment.p2.x)) {

                intersections.push(createVector(x, x*segment.a + segment.b))

            }

        }

        return intersections
    }

    //Returns true if given point is in polygon, false if not
    // There may be an special case when ray tracing (the method used here)
    // the point may be outside and the math says otherwise 
    // Possible solution to that sugested in alienryderflex:
    // http://alienryderflex.com/polygon/ 

    this.isPointInPolygon = function(p) {

        let mouseRaySegmentX = new Segment(0, p.y, p, createVector(width, p.y))

        //In one special case this calculation may be wrong, check http://alienryderflex.com/polygon/
        let XRayIntersections = this.segmentIntersections(mouseRaySegmentX) 

        if (!(XRayIntersections instanceof Array)) return false //In some cases segmentIntersections return null

        push()
        for (let intersection of XRayIntersections) {
            stroke(255)
            strokeWeight(15)
            point(intersection.x, intersection.y)
            stroke(0)
            strokeWeight(10)
            point(intersection.x, intersection.y)
        }
        pop()

        if (XRayIntersections.length % 2 == 0) return false
        else return true

    }

    this.isSegmentIntersecting = function(segmentIn) {

    }

}

Polygon.arePolygonsIntersecting = function(poly1, poly2) {



}

function Segment(a, b, p1, p2) {

    this.a = a
    this.b = b
    this.p1 = p1
    this.p2 = p2

    this.render = function() {

        line(p1.x, p1.y, p2.x, p2.y)

    }

}

function drawPoligons() {


    push()

    for (let polygon of polygons) {

        //If polygon has been closed and finished draw a p5 Shape
        if (polygon.finished) {

            //DRAW POLYGON
            beginShape()

            fill(polygon.rCol, polygon.gCol, polygon.bCol)

            for (let vector of polygon.corners) {
                vertex(vector.x, vector.y)
            }

            endShape(CLOSE)

            //CHECK FOR INTERSECTIONS
            console.log(polygon.isPointInPolygon(createVector(mouseX, mouseY)))

            //MOVE POLYGON
            if (polygon.movable) {

                let XSpeed = mouseX - pmouseX
                let YSpeed = mouseY - pmouseY

                for(let corner of polygon.corners) {
                    // console.log(corner.x)
                    corner.x += XSpeed
                    corner.y += YSpeed
                }    
                
            }

        }

        //If its not closed link the current corners with lines
        else {

            strokeWeight(2)

            let cornersNum = polygon.corners.length

            if (cornersNum > 0) {

                //Draw the last line linking the last point with the mouse
                line(mouseX, mouseY, polygon.corners[cornersNum-1].x, polygon.corners[cornersNum-1].y)

                //Draw a line between a corner and the previous one
                for (let i = 1; i < cornersNum; i++) { 
                    line (polygon.corners[i].x, polygon.corners[i].y, polygon.corners[i-1].x, polygon.corners[i-1].y) 
                }
            }

        }

        
    }

    pop()

}