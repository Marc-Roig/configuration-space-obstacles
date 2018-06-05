
let polygons = []
let scara

function setup() {

    createCenteredCanvas()

    frameRate(20)

    polygons.push(new Polygon())

    scara = new Arm()

    stroke(200)
    strokeWeight(2)

}

function draw() {

    background('#0e0e0e')

    // RENDER ALL POLYGONS
    for (let polygon of polygons) {
        polygon.render()
    }    

    scara.calculateInverse(mouseX - width/2, mouseY - height/2)
    scara.render()

    // console.log(mouseX - width/2, mouseY - height/2)

    // COLLISION DETECTION
    // arm1.arePolygonsIntersecting(polygons) //To update which polygon is intersected

    // arm1.isIntersectedByPolygons(polygons, true)

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

        if (!polygon.finished) continue
        polygon.movable = false
        polygon.calculateSegments() //Segments used to optimize calculations have to be refreshed

    }
}

function keyTyped() {

    if (key == 'c') { //Delete polygon that user is still drawing

        polygons.pop()
        polygons.push(new Polygon())

    }

    if (key == 'z') { //Delete polygon that user is still drawing

        polygons[polygons.length-1].corners.pop()

    }

    if (key == 'e') { //Delete finished polygon, pop first empty or not finished polygon and the previous one

        polygons.pop()
        polygons.pop()
        polygons.push(new Polygon())

    }

}

function doubleClicked() {

    polygons[polygons.length-1].corners.pop() //Because of the double click two corners are added, one is poped 

    if(polygons[polygons.length-1].corners.length < 3) return //Polygon needs at least 3 points

    polygons[polygons.length-1].finished = true
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

    push()
    stroke(100)
    strokeWeight(3)
    line(0, 0, width, 0)
    line(0, 0, 0, height)
    line(width-1, height-1, width-1, 0)
    line(width-1, height-1, 0, height-1)
    pop()

}