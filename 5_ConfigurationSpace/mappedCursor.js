function mappedCursor(xrange, yrange, xScreenRange, yScreenRange) {

	this.xRange = xrange 
	this.yRange = yrange 

	this.xMappedRange = xScreenRange
	this.yMappedRange = yScreenRange

	this.mappedPos = createVector(0, 0)
	this.pos = createVector(0, 0)

	this.followMouse = false

	this.setPos = function(a, b) {

		//If one of the imputs is not in the xRange, yRange interval make it flip through the other side
		//This will not work if for example with angles the value is two or more times greater than the interval
		if (a < this.xRange[0]) a = a - this.xRange[0] + this.xRange[1]
		if (a > this.xRange[0]) a = a - this.xRange[1] + this.xRange[0
		if (b < this.yRange[0]) b = b - this.yRange[0] + this.yRange[1]
		if (b > this.yRange[0]) b = b - this.yRange[1] + this.yRange[0]

		//Save the inputs in case they are needed
		this.pos.x = a
		this.pos.y = b

		//map values
		this.mappedPos.x = ((a-this.xRange[0])*(this.xMappedRange[1]-this.xMappedRange[0])/(this.xRange[1]-this.xRange[0]))+(this.xMappedRange[0])
		this.mappedPos.y = ((b-this.yRange[0])*(this.yMappedRange[1]-this.yMappedRange[0])/(this.yRange[1]-this.yRange[0]))+this.yMappedRange[0]

		return this

	}

	this.setXY = function(x, y){

		this.mappedPos.x = x
		this.mappedPos.y = y

		return this
	}

	//Update real position from mapped values
	this.updatePos = function() {

		this.pos.x = ((this.mappedPos.x-this.xMappedRange[0])*(this.xRange[1]-this.xRange[0])/(this.xMappedRange[1]-this.xMappedRange[0]))+this.xRange[0]
		this.pos.y = ((this.mappedPos.y-this.yMappedRange[0])*(this.yRange[1]-this.yRange[0])/(this.yMappedRange[1]-this.yMappedRange[0]))+this.yRange[0]

		return this

	}

	this.render = function() {

		// if (this.setXY(mouseX, mouseY)
		if (this.followMouse) this.mouseFollow()

		line(this.mappedPos.x, this.mappedPos.y - 10, this.mappedPos.x, this.mappedPos.y + 10)
		line(this.mappedPos.x - 10, this.mappedPos.y, this.mappedPos.x + 10, this.mappedPos.y)

		return this

	}

	this.mouseFollow = function() {

		if (mouseX > this.xMappedRange[0] && mouseX < this.xMappedRange[1] &&
			mouseY > this.yMappedRange[0] && mouseY < this.yMappedRange[1]) {

			this.mappedPos.x = mouseX
			this.mappedPos.y = mouseY

		}

		return this
	}
}