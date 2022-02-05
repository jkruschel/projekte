/**
 * Creates a unit sphere by subdividing a unit octahedron.
 * Starts with a unit octahedron and subdivides the faces,
 * projecting the resulting points onto the surface of a unit sphere.
 *
 * For the algorithm see:
 * https://sites.google.com/site/dlampetest/python/triangulating-a-sphere-recursively
 * http://sol.gfxile.net/sphere/index.html
 * http://nipy.sourceforge.net/dipy/reference/dipy.core.triangle_subdivide.html
 * http://skyview.gsfc.nasa.gov/blog/index.php/2008/12/31/skyview-to-include-healpix-and-wmap/
 *
 *        1
 *       /\
 *      /  \
 *    b/____\ c
 *    /\    /\
 *   /  \  /  \
 *  /____\/____\
 * 0      a     2
 *
 * Parameter:
 * 	recursionDepth
 * 	color or -1 = many colors
 *
 * For texture see:
 * http://earthobservatory.nasa.gov/Features/BlueMarble/
 *
 * @namespace cog1.data
 * @module sphere
 */

define(["exports", "data", "glMatrix"], function(exports, data) {
	"use strict";

	/**
	 * Procedural calculation.
	 *
	 * @parameter object with fields:
	 * @parameter scale
	 * @parameter recursionDepth
	 * @parameter color [-1 for many colors]
	 */
	exports.create = function(parameter) {
				
		if(parameter) {
			var scale = parameter.scale;
			var recursionDepth = parameter.recursionDepth;
			var color = parameter.color;
			var textureURL = parameter.textureURL;
		}
		// Set default values if parameter is undefined.
		if(scale == undefined) {
			scale = 250;
		}
		if(recursionDepth == undefined) {
			recursionDepth = 3;
		}
		if(color == undefined) {
			color = 9;
		}
		if(textureURL == undefined) {
			textureURL = "";
		}

		// Instance of the model to be returned.
		var instance = {};

		// BEGIN exercise Sphere

		// Starting with octahedron vertices
		instance.vertices = [
			[0.0, 1.0, 0.0], //Oben
			[1.0, 0.0, 0.0], //Rechts
			[-1.0, 0.0, 0.0], //links
			[0.0, 0.0, -1.0], //Vorne
			[0.0, 0.0, 1.0], //Hinten
			[0.0, -1.0, 0.0] //unten
		]

		// octahedron triangles
		instance.polygonVertices = [
			[0, 1, 3], //Oben
			[0, 3, 2],
			[0, 4, 1],
			[0, 2, 4],
			[5, 3, 1], //unten
			[5, 2, 3],
			[5, 1, 4],
			[5, 4, 2]

		];	


		// END exercise Sphere
		
		devide_all.call(instance, 2, 0);

		generateTextureCoordinates.call(instance);

		data.applyScale.call(instance, scale);
		data.setColorForAllPolygons.call(instance, color);

		instance.textureURL = textureURL;

		return instance;
	}
	/**
	 * Called with this pointer set to instance.
	 * Generate texture coordinates one per each corner of a polygon,
	 * thus a vertex can have more than one uv, depending on the polygon it is part of.
	 * The coordinates u.v represent the angles theta and phi
	 * of point vector to x and y axis.
	 * See:
	 * http://tpreclik.dyndns.org/codeblog/?p=9
	 *
	 * Assume that vertices are not yet scaled, thus have length 1.
	 *
	 */
	function generateTextureCoordinates() {

		// BEGIN exercise Sphere-Earth-Texture

		// As there is not exactly one texture coordinate per vertex,
		// we have to install a different mapping as used for polygonVertices to vertices.
		// For texture coordinate system use openGL standard, where origin is bottom-left.
		this.textureCoord = [];
		this.polygonTextureCoord = [];


			// Loop over vertices/edges in polygon.

				// Shorthands for the current vertex.


				// Calculate longitude (east-west position) phi (u-coordinate).
				// arctangent (of here z/x), representing the angle theta between the positive X axis, and the point.
				// Scale phi to uv range [0,1].


				// Calculate latitude (north-south position) theta (v-coordinate) from y component of vertex.
				// Scale theta to uv range [0,1].


				// Store new uv coordinate in new uv-vector.
				//console.log("phi:" + (~~(phi * 100)) + "  theta:" + (~~(theta * 100)) + " x:" + (~~(x * 100)) + " z:" + (~~(z * 100)));
				

		// Problem with phi/u: phi=360 and phi=0 are the same point in 3D and also on a tiled texture.
		// But for faces it is a difference if uv-range is 350�-360� [.9-1]or 350�-0� [.9-0].
		// Thus, insert a check/hack (assuming faces cover only a small part of the texture):

			// Check if u-range should be low or high (left or right in texture),
			// by summing up u values (ignoring u=0 values).

			// Check and correct u values if 0;
		
		// END exercise Sphere-Earth
	}

	// BEGIN exercise Sphere

	/**
	 * Recursively divide all triangles.
	 */
	function devide_all(recursionDepth, nbRecusions) {
		// nbRecusions is not set from initial call.
		if(nbRecusions == undefined) {
			nbRecusions = 0;
		}
		// Stop criterion.
		if(nbRecusions == recursionDepth) return;

		console.log("nbRecusions: "+nbRecusions);
		console.log("recursionDepth: "+recursionDepth);

		var test = this.polygonVertices.length;

		// Assemble divided polygons in an new array.
			for(var i = 0; i < test; i++){

				//Punkte des alten Dreieicks
				var p1 = this.vertices[this.polygonVertices[i][0]]; //oben/unten
				var p2 = this.vertices[this.polygonVertices[i][1]]; //rechts/links
				var p3 = this.vertices[this.polygonVertices[i][2]]; //Vorne/hinten


				var v1 = this.vertices[p1];
				var v2 = this.vertices[p2];
				var v3 = this.vertices[p3];

				// Calculate new vertex in the middle of edge.
				var a = vectorMultiply(vectorAdd(p1, p2), 0.5);
				var b = vectorMultiply(vectorAdd(p1, p3), 0.5);
				var c = vectorMultiply(vectorAdd(p2, p3), 0.5);

				//Punkte auf die Kugel verschieben
				
				a = spherify(a);
				b = spherify(b);
				c = spherify(c);


					// Remember index of new vertex.
					var index1 = this.vertices.length;
					this.vertices.push(a);
					var index2 = this.vertices.length;
					this.vertices.push(b);
					var index3 = this.vertices.length;
					this.vertices.push(c);

			// Assemble new polygons. Miite und unten rechts
			this.polygonVertices.push([this.polygonVertices[i][0], index1, index2]);
			this.polygonVertices.push([index1, this.polygonVertices[i][1], index3]);
			this.polygonVertices.push([index2, index3, this.polygonVertices[i][2]]);
			this.polygonVertices.push([index1, index3, index2]);
			}

			nbRecusions += 1;
			//alte Polygone entfernen
			this.polygonVertices.splice(0, (nbRecusions * nbRecusions)*8);
			// Assure mathematical positive order to keep normals pointing outwards.
			// Triangle in the center.

			// Triangle in the corners.

				//console.log("Assemble new polygons "+v+" : "+p[v]+" , "+ newIndex[nextButOne]+" , "+ newIndex[v]);

		// Swap result.

		// Recursion.
		devide_all.call(this, recursionDepth, nbRecusions);

	}
	
	// END exercise Sphere

	const vectorAdd = (in1, in2) => {
		//console.log(in1);
		var output = [];
		for(var i = 0; i<=2; i++){
			output.push(in1[i] + in2[i]);
			//console.log(in1[i] + " + " + in2[i]);
		}
		return output;
	}

	const vectorMultiply = (in1, a) => {
		var output = [];
		for(var i = 0; i<=2; i++){
			output.push(in1[i] * a);
		}
		return output;
	}	

	const spherify = (in1) => {
		var output = [];
		output.push(Math.sqrt(in1[0] * in1[0] + in1[1] * in1[1] + in1[2] * in1[2]));
		return [in1[0] / output, in1[1] / output, in1[2] / output];
	}

});
