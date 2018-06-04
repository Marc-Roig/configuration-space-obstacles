
let polygons = []

function setup() {

    createCenteredCanvas()

    frameRate(20)

    polygons.push(new Polygon())

    stroke(200)
    strokeWeight(2)
    // if (areSegmentsIntersected(p1, p2, p3, p4)) console.log("Segments are colliding")

}

function draw() {

    background('#0e0e0e')

    drawPoligons()

    //Mouse ray tracing visualitzation
    line(mouseX, mouseY, width, mouseY)

    drawFrame()
}

function mousePressed() {

    // polygons[polygons.length-1].corners.push()
    let moveObjects = false

    //If user is not drawing any polygon, clicking on an existing polygon
    //will make it move
    if (polygons[polygons.length-1].corners.length == 0) {

        for (let polygon of polygons) {
            if (polygon.isPointInPolygon(createVector(mouseX, mouseY)) && polygon.finished) {
            
                polygon.movable = true
                moveObjects = true

            }
        }
    }

    //If an polygon is moving don't add any corner
    if (!moveObjects) polygons[polygons.length-1].addCorner(createVector(mouseX, mouseY))

}

function mouseReleased() {

    for (let polygon of polygons) {

        polygon.movable = false
        polygon.calculateSegments() //Segments used to optimize calculations have to be refreshed

    }
}

function keyTyped() {

    if (key == 'c') {

        // if(!polygons[polygons.length-1].finished) {
            polygons.pop()
            polygons.push(new Polygon())
        // }

    }

}

function doubleClicked() {

    polygons[polygons.length-1].finished = true
    polygons[polygons.length-1].corners.pop()
    polygons[polygons.length-1].calculateSegments() //Are vertices are precalculate to optimize calculations

    polygons.push(new Polygon()) //Once the polygon is finished prepare to draw another one

}

function createCenteredCanvas() {

  createCanvas(600, 600).position(
    (windowWidth - width) / 2,
    (windowHeight - height) / 2
  )

}

function drawFrame() {

    // Frame
    push()
    stroke(100)
    strokeWeight(3)
    line(0, 0, width, 0)
    line(0, 0, 0, height)
    line(width-1, height-1, width-1, 0)
    line(width-1, height-1, 0, height-1)
    pop()

}