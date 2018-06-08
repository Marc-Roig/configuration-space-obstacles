
let polygons = []
let scara
let cursor

let centerX
let centerY

function setup() {

    //Canvas
    createCenteredCanvas(1200, 600)

    frameRate(20)
    stroke(200)
    strokeWeight(2)

    centerX = width/4
    centerY = height/2

    //Polygons
    polygons.push(new Polygon())
    scara = new Arm()
    scara.setCsGrid(5) //5 degrees resolution

    cursor = new mappedCursor([-PI, PI], [-PI, PI], [width/2, width], [0, height])
    cursor.setPos(1,1)
          .followMouse = false

}

function draw() {

    background('#0e0e0e')
    drawFrame()

    //RIGHT SCREEN
    scara.renderCS()
    cursor.render()

    if (mouseInRightScreen()) {

        cursor.mouseFollow()
              .updatePos()
        scara.setAngles(cursor.pos.x, cursor.pos.y)


    }

    //LEFT SCREEN
    translate(centerX, centerY)

    // RENDER ALL POLYGONS
    for (let polygon of polygons) {
        polygon.render()
    }

    if (mouseInLeftScreen()) {
        // newAngles = scara.calculateInverse(mouseX - centerX, mouseY - centerY)
        // console.log(newAngles)
        // scara.setAngles(newAngles.angle1, newAngles.angle2)
        // cursor.setPos(newAngles.angle1, newAngles.angle2)
    }
    
    scara.detectCollisions(polygons)
    scara.render()

    
    // COLLISION DETECTION
    // arm1.arePolygonsIntersecting(polygons) //To update which polygon is intersected

    // arm1.isIntersectedByPolygons(polygons, true)

}
function mouseInLeftScreen() {

    if (mouseX > 0 && mouseX < width/2 &&
        mouseY > 0 && mouseY < height) return true
    return false

}
function mouseInRightScreen() {

    if (mouseX > width/2 && mouseX < width &&
        mouseY > 0 && mouseY < height) return true
    return false

}
function mousePressed() {


    // polygons[polygons.length-1].corners.push()
    let moveObjects = false

    //If user is not drawing any polygon, clicking on an existing polygon
    //will make it move
    if (polygons[polygons.length-1].corners.length == 0 && mouseInLeftScreen()) {

        for (let polygon of polygons) {
            if (polygon.isPointInPolygon(createVector(mouseX - centerX, mouseY - centerY)) && polygon.finished) {
            
                polygon.movable = true
                moveObjects = true

            }
        }
    }

    //If an polygon is moving don't add any corner
    if (!moveObjects && mouseInLeftScreen()) polygons[polygons.length-1].addCorner(createVector(mouseX - centerX, mouseY - centerY))

}

function mouseReleased() {

    let anyPolygonMoved = false

    for (let polygon of polygons) {

        if (!polygon.finished) continue
        if (polygon.movable) anyPolygonMoved = true
        polygon.movable = false
        polygon.calculateSegments() //Segments used to optimize calculations have to be refreshed

    }

    if (anyPolygonMoved) scara.calculateCS(polygons)
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


    //OBSTACLES

    polygons[polygons.length-1].corners.pop() //Because of the double click two corners are added, one is poped 

    if(polygons[polygons.length-1].corners.length < 3) return //Polygon needs at least 3 points

    polygons[polygons.length-1].finished = true
    polygons[polygons.length-1].calculateSegments() //Are vertices are precalculate to optimize calculations

    polygons.push(new Polygon()) //Once the polygon is finished prepare to draw another one

    //CS CALCULATIONS
    scara.calculateCS(polygons)
    // scara.setAngles(0, 0)
    // console.log(scara.isCollisioning(polygons))

}

function createCenteredCanvas(x, y) {

  createCanvas(x, y).position(
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
    line(width/2, 0, width/2, height)
    line(width-1, height-1, width-1, 0)
    line(width-1, height-1, 0, height-1)
    pop()

}