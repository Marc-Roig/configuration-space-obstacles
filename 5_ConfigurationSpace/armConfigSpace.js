Arm.prototype.csGrid
Arm.prototype.angleResolut

Arm.prototype.numOfSquares
Arm.prototype.spaceBetweenSquares

Arm.prototype.setCsGrid = function(angleResolution) {

	angleResolution *= PI/180
	this.angleResolut = angleResolution

	let rows = Math.ceil(2 * PI / angleResolution)
	let columns = rows
	this.csGrid = Array(rows).fill().map(() => Array(columns).fill(0))

	//For rendering
	this.numOfSquares = this.csGrid.length
	this.spaceBetweenSquares = (width/2) / this.csGrid.length
	console.log(this.spaceBetweenSquares)

} 

Arm.prototype.calculateCS = function(obstacles) {

	let startTheta1 = this.theta1
	let startTheta2 = this.theta2

	// let stepChange = 20 * PI / 180

	// this.setAngles(16*stepChange, 0)
 //    console.log(this.isCollisioning(obstacles))

	for (let i = 0; i < this.csGrid.length ; i++) {

		for (let j = 0; j < this.csGrid[0].length ; j++) {

			this.setAngles(i*this.angleResolut - PI, j*this.angleResolut - PI)
			if(this.isCollisioning(obstacles)) this.csGrid[i][j] = 1
			else this.csGrid[i][j] = 0

		}
		// this.setAngles(i*this.angleResolut, this.theta2)
		// if(this.isCollisioning(obstacles)) this.csGrid[i] = 1
		// else this.csGrid[i] = 0		

	}

	console.table(this.csGrid)

	// this.setAngles(this.theta1, this.theta2)

}

Arm.prototype.renderCS = function() {

	// if(this.csGrid.length == 0) return
	push()
	noStroke()
	strokeWeight(1)
	translate(width/2, 0)

	fill(200, 0, 0)
	//Map all positions of csgrid into the right screen
	for (let i = 0; i < this.numOfSquares; i++) {

		for (let j = 0; j < this.numOfSquares; j++) {
			if (this.csGrid[i][j] == 1) {
				rect(i*this.spaceBetweenSquares, j*this.spaceBetweenSquares, this.spaceBetweenSquares, this.spaceBetweenSquares)
			}

		}

	}
	
	pop()

}