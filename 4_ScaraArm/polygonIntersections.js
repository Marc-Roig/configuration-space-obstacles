// All segments of polygon are checked with all vercites of given
// polygons to see if they intersect. Naive implementation, sweep
// algorithm could be implemented, but it wouldnt have sense in
// this situation. Not every segment of all polygons is checked with
// all the others, only the ones of the polygon object with the
// polygons given. Sweep algorithm is O((n+k)log(n)) where k is 
// the number of intersections

Polygon.prototype.arePolygonsIntersecting = function(polys) {

    let numOfIntersections = 0

    for (let poly of polys) {

        poly.intersected = false;

        for (let segment1 of poly.segments) {

            if (this.isSegmentIntersecting(segment1)) {

                poly.intersected = true
                numOfIntersections++
                break

            }
        }
    }

    return numOfIntersections

}

Polygon.prototype.isIntersectedByPolygons = function(polys) {

    for (let poly of polys) {
        for (let segment1 of poly.segments) {
            if (this.isSegmentIntersecting(segment1)) return true
        }
    }

    return false

}

Polygon.prototype.isIntersectedByPolygons = function(polys, update_polygon_status) {

    for (let poly of polys) {
        for (let segment1 of poly.segments) {

            if (this.isSegmentIntersecting(segment1)) {
                
                if(update_polygon_status) this.intersected = true
                return true

            }
        }
    }

    if(update_polygon_status) this.intersected = false
    return false

}

Polygon.prototype.intersected = false