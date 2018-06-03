let p0
let p1
let p2
let p3
let p4

function setup() {

    createCanvas(500, 500)

    p0 = createVector()
    p1 = createVector(0, 0)
    p2 = createVector(400, 400)
    p3 = createVector(20, 40)
    p4 = createVector(200, 500)

    stroke(0)
    if (areSegmentsIntersected(p1, p2, p3, p4)) console.log("Segments are colliding")

}

function draw() {

    background(200)

    //First segment
    line(p1.x, p1.y, p2.x, p2.y)

    //Second segment
    line(p3.x, p3.y, p4.x, p4.y)

    //Mouse ray tracing
    line(mouseX, mouseY, width, mouseY)

    push()
    strokeWeight(5)

    let numIntersections = 0
    
    if (areSegmentsIntersected(createVector(mouseX, mouseY), createVector(width, mouseY), p1, p2)) {
        numIntersections++
        point(p0.x, p0.y)
    }

    if (areSegmentsIntersected(createVector(mouseX, mouseY), createVector(width, mouseY), p3, p4)) {
        numIntersections++
        point(p0.x, p0.y)
    }

    // if (numIntersections % 2 != 0) console.log("Mouse is Inside polygon")
    // else console.log("Mouse is outside polygon")

    pop()

}

//Solution sugested in StackOverflow
//https://stackoverflow.com/questions/16314069/calculation-of-intersections-between-line-segments

function areSegmentsIntersected(point1, point2, point3, point4) {

    let a1 = (point2.y-point1.y)/(point2.x-point1.x)
    let b1 = point1.y - a1*point1.x
    let a2 = (point4.y-point3.y)/(point4.x-point3.x)
    let b2 = point3.y - a2*point3.x

    //Consider parallel overlapping as not an intersection
    //If it has to be check if intercept (b) are equal and
    //if they are, check if 1D segments (x1, x2) and (x3, x4) 
    //overlap. If they overlap the segments intersect
    if (a1 == a2) return false 

    //Solve for  -> (y = a1*x + b1) and (y = a2*x + b2)
    p0.x = -(b1-b2)/(a1-a2)
    p0.y = p0.x*a1 + b1

    //Check if x0 is in bot segments
    if (Math.min(point1.x, point2.x) < p0.x && p0.x < Math.max(point1.x, point2.x) && 
        Math.min(point3.x, point4.x) < p0.x && p0.x < Math.max(point3.x, point4.x)) return true
    else return false

}

function mouseClicked() {



}