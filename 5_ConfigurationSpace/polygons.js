function Polygon() {

    this.corners = []
    this.segments = []

    this.finished = false
    this.movable = false;

    this.rCol = random(50, 165)
    this.gCol = random(50, 165)
    this.bCol = random(50, 165)

    this.addCorner = function(p) {

        // p.parent = this
        this.corners.push(p)
        return this

    }

    this.addCorners = function(p) {

        this.corners.push.apply(this.corners, p)
        return this

    }

    this.setNewCorners = function(ps) {

        this.corners = ps.slice()
        return this

    } 

    //Calculates all segments of polygon
    this.calculateSegments = function() {

        // if (!this.finished) return

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

        return this
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

        if (XRayIntersections.length % 2 == 0) return false
        else return true

    }
    
    // The solution involves determining if three points are listed in a counterclockwise order. 
    // So say you have three points A, B and C. If the slope of the line AB is less than the slope 
    // of the line AC then the three points are listed in a counterclockwise order. Credits to:
    // https://bryceboe.com/2006/10/23/line-segment-intersection-algorithm/

    this.isSegmentIntersecting2 = function(segmentIn) {

        for (let segment of this.segments) {

            if (ccw(segment.p1, segmentIn.p1, segmentIn.p2) != ccw(segment.p2, segmentIn.p1, segmentIn.p2) && 
                ccw(segment.p1, segment.p2,   segmentIn.p1) != ccw(segment.p1, segment.p2,   segmentIn.p2)) {
                return true
            }

        }

        return false
    }

    //This solution does not need this polygon to have segments calculated. This allows a better performance
    //since the slope and intercept do not have to be calculated. Another funcion could be implemented where
    //it does not need an segment input rather two points, but for this particular case it's fine. A similar
    //method used in the calculateSegments() is used to know which point is from which segment of the polygon.
    
    this.isSegmentIntersecting = function(segmentIn) {

        for (let i = 0; i < this.corners.length - 1; i++) {

            if (i == this.corners.length - 1) { //Segment between last and first corner

                if (ccw(this.corners[i], segmentIn.p1,    segmentIn.p2) != ccw(this.corners[0], segmentIn.p1,    segmentIn.p2) && 
                    ccw(this.corners[i], this.corners[0], segmentIn.p1) != ccw(this.corners[i], this.corners[0], segmentIn.p2)) {
                    return true
                }
            }

            else { //Segment between other corners

                if (ccw(this.corners[i], segmentIn.p1,    segmentIn.p2) != ccw(this.corners[i+1], segmentIn.p1,    segmentIn.p2) && 
                    ccw(this.corners[i], this.corners[i+1], segmentIn.p1) != ccw(this.corners[i], this.corners[i+1], segmentIn.p2)) {
                    return true
                }

            }

        }
        return false

    }

    function ccw(A, B, C) {
        return ((C.y-A.y)*(B.x-A.x) > (B.y-A.y)*(C.x-A.x)) ? true : false
    }

    this.render = function() {

        if (this.finished) {

            //DRAW POLYGON
            beginShape()

            if (!this.intersected) fill(this.rCol, this.gCol, this.bCol)
            else fill(255, 0, 0)

            for (let vector of this.corners) {
                vertex(vector.x, vector.y)
            }

            endShape(CLOSE)

            //CHECK FOR INTERSECTIONS
            // console.log(this.isPointInPolygon(createVector(mouseX, mouseY)))

            //MOVE POLYGON
            if (this.movable) {

                let XSpeed = mouseX - pmouseX
                let YSpeed = mouseY - pmouseY

                for(let corner of this.corners) {
                    // console.log(corner.x)
                    corner.x += XSpeed
                    corner.y += YSpeed
                }    
                
            }

        }

        //If its not closed link the current corners with lines
        else {

            strokeWeight(2)

            let cornersNum = this.corners.length

            if (cornersNum > 0) {

                //Draw the last line linking the last point with the mouse
                line(mouseX - centerX, mouseY - centerY, this.corners[cornersNum-1].x, this.corners[cornersNum-1].y)

                //Draw a line between a corner and the previous one
                for (let i = 1; i < cornersNum; i++) { 
                    line (this.corners[i].x, this.corners[i].y, this.corners[i-1].x, this.corners[i-1].y) 
                }
            }

        

        }

    }

    this.setColors = function(r, g, b) {

        this.rCol = r
        this.gCol = g
        this.bCol = b

        return this

    }

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
