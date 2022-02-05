/**
 * 3D Data Store for a model.
 * Missing properties/arrays (commented out)
 * are mixed in from data module.
 *  
 * @namespace cog1.data
 * @module cube
 */
 define(["exports", "data"], function(exports, data) {
	"use strict";

	/**
	 * Create an instance of the model defined in this module.
	 * 
	 * @parameter object with fields:
	 * @parameter scale is the edge length of the cube.
	 * @returns instance of this model.
	 */
	exports.create = function(parameter) {
		
		if(parameter) {
			var scale = parameter.scale;
			var textureURL = parameter.textureURL;
			// Each face shows a different area of the given texture (e.g, a dice).
			var sixFacesTexture = parameter.sixFacesTexture;
		}
		// Set default values if parameter is undefined.
		if(scale == undefined){
			scale = 200;
		}
		if(textureURL == undefined){
			textureURL = "";
		}
		if(sixFacesTexture == undefined){
			sixFacesTexture = false;
		}

		// Instance of the model to be returned.
		var instance = {};

		// Vertex indices:							
		//   7----6
		//	/|   /|
		// 4----5 |
		// | 3--|-2
		// |/   |/
		// 0----1
		instance.vertices = [
			// deck (z=0)
			[0,20, 0],
			[-3,18, 0],
			[3,18, 0],
			[-5,10,0],	
			[5,10, 0],
			[ -5,-10, 0],
			[ 5,-10,0],
			[-2,-20,0],
            [2,-20,0],
            //kiel (z=-3)
            [0,13,-3],
            [-2,10,-3],
            [2,10,-3],
            [-2,-17,-3],
            [2,-17,-3],
            //Hausboden (z=0)
            [-2,5,0],
            [2,5,0],
            [-2,-5,0],
            [2,-5,0],
            //Hausdach (z=2)
            [-2,5,2],
            [2,5,2],
            [-2,-5,2],
            [2,-5,2],
            //Smokestack base (z=2)
            [0,2,2],
            [-1,1,2],
            [1,1,2],
            [-1,-1,2],
            [1,-1,2],
            [0,-2,2],
            //smokestack top (z=4)
            [0,2,4],
            [-1,1,4],
            [1,1,4],
            [-1,-1,4],
            [1,-1,4],
            [0,-2,4],

		];
		// Use default colors, implicitly.
		// instance.colors = data.colors;

		// Corners of the faces have to fit the texture coordinates.			
		// Faces: bottom/down, top/up, front, right, back, left. 
		instance.polygonVertices = [
            //Rumpf
			[0,1,9],
			[0,2,9],
			[1,3,10,9],
			[2,4,11,9],
            [9,10,11],
            [10,12,13,11],
            [3,5,12,10],
            [4,6,13,11],
            [12,13,8,7],
            [5,12,7],
            [6,13,8],
            //Deck
            [0,1,2],
            [1,3,4,2],
            [3,4,6,5],
            [5,6,8,7],
            //Haus
            [14,15,17,16], //Boden
            [18,19,21,20], //Dach
            [14,18,19,15], //Vorne
            [14,18,20,16], //links
            [15,19,21,17], //rechts
            [16,20,21,17], //hinten
            //smokestack
            [22,28,29,23],
            [22,28,30,24],
            [23,29,31,25],
            [24,30,32,26],
            [25,31,33,27],
            [26,32,33,27],

            

		];	

		instance.polygonColors = [0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5,0,1,2,3,4,5];
		
		//instance.vertexNormals = [];
		//instance.polygonNormals = [];

		if( ! sixFacesTexture){
	        // Use default texture coordinates.
			// instance.textureCoord = [];	
			// For order of corners of faces, see polygonVertices.
			instance.polygonTextureCoord = [
				[1,2,3,0],
				[1,2,3,0],
				[1,0,3,2],
				[3,0,1,2],
				[3,0,1,2],
				[3,0,1,2]
			];
		} else {
			// BEGIN exercise Cube-Dice-Texture
			
			// Order 0 to 16 form bottom-left to top-right
			// line by line, indices in spatial order:
			instance.textureCoord = [];
			// ...

			// Use textureCoord in order given for textureCoord.
			// The order of corners of faces must fit the one given in polygonVertices.
			// Match orientation of face given for polygonVertices.
			// D=bottom/down, U=top/up, F=front, R=right, B=back, L=left
			// The mapping is explained on the texture image.
			// instance.polygonTextureCoord = [ ....];

			// END exercise Cube-Dice-Texture			
		}
		
		instance.textureURL = textureURL;

		data.applyScale.call(instance, scale);

		return instance;		
	};
});