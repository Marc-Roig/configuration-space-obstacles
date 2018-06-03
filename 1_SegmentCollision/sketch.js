let x1 = 0
let y1 = 0
let x2 = 400
let y2 = 400

let x3 = 100
let y3 = 20
let x4 = 200
let y4 = 500

let x0 = 0
let y0 = 0

function setup() {

	createCanvas(500, 500)
	background(200)
	stroke(0)
	if (areSegmentsIntersected()) console.log("Segments are colliding")

}

function draw() {

	//First segment
	line(x1, y1 , x2, y2)

	//Second segment
	line(x3, y3, x4, y4)

	push()
	strokeWeight(10)
	point(x0,y0)
	pop()

}

//Solution sugested in StackOverflow
//https://stackoverflow.com/questions/16314069/calculation-of-intersections-between-line-segments

function areSegmentsIntersected() {

	let a1 = (y2-y1)/(x2-x1)
	let b1 = y1 - a1*x1
	let a2 = (y4-y3)/(x4-x3)
	let b2 = y3 - a2*x3

	//Consider parallel overlapping as not an intersection
	//If it has to be check if intercept (b) are equal and
	//if they are, check if 1D segments (x1, x2) and (x3, x4) 
	//overlap. If they overlap the segments intersect
	if (a1 == a2) return false 

	//Solve for  -> (y = a1*x + b1) and (y = a2*x + b2)
	x0 = -(b1-b2)/(a1-a2)
	y0 = x0*a1 + b1

	//Check if x0 is in bot segments
	if (Math.min(x1, x2) < x0 < Math.max(x1,x2) && 
		Math.min(x3, x4) < x0 < Math.max(x3,x4)) return true
	else return false



}