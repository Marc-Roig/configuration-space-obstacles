Polygon.prototype.translate = function(tx, ty) {

    const transfMatrix = [[1, 0, tx],
                         [0, 1, ty],
                         [0, 0, 0 ]]
    
    for (const corner of this.corners) {

        let result = math.multiply(transfMatrix, [corner.x, corner.y, 1]) //Multiply transformation matrix by homogeneous vector
        corner.x = result[0]
        corner.y = result[1]

    }

    return this

}

Polygon.prototype.rotate = function(angle) { //angle in radians

    let transfMatrix = [[Math.cos(angle), -Math.sin(angle), 0 ],
                       [Math.sin(angle),  Math.cos(angle), 0 ],
                       [       0       ,        0        , 1 ]]
    
    for (const corner of this.corners) {

        let result = math.multiply(transfMatrix, [corner.x, corner.y, 1]) //Multiply transformation matrix by homogeneous vector
        corner.x = result[0]
        corner.y = result[1]

    }

    return this

}

Polygon.prototype.scale = function(sx, sy) {

    const transfMatrix = [[sx, 0 , 0],
                         [0 , sy, 0],
                         [0 , 0 , 0]]
    
    for (const corner of this.corners) {

        let result = math.multiply(transfMatrix, [corner.x, corner.y, 1]) //Multiply transformation matrix by homogeneous vector
        corner.x = result[0]
        corner.y = result[1]

    }

    return this

}

Polygon.prototype.applyTransformationMatrix = function(transfMatrix) {

    for (const corner of this.corners) {

        let result = math.multiply(transfMatrix, [corner.x, corner.y, 1]) //Multiply transformation matrix by homogeneous vector
        corner.x = result[0]
        corner.y = result[1]

    }

    return this

}

Polygon.prototype.applyTransformationMatrix = function(transfMatrix, updateSegments) {

    for (const corner of this.corners) {

        let result = math.multiply(transfMatrix, [corner.x, corner.y, 1]) //Multiply transformation matrix by homogeneous vector
        corner.x = result[0]
        corner.y = result[1]

    }

    if(updateSegments) this.calculateSegments()
    return this

}

