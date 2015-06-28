var fs = require("fs"),
    minify = require("minify");

var files = [
    "src/Base.js",
    "src/Box2.js",
    "src/Box3.js",
    "src/Color.js",
    "src/Euler.js",
    "src/Frustum.js",
    "src/Line3.js",
    "src/Math.js",
    "src/Matrix3.js",
    "src/Matrix4.js",
    "src/Plane.js",
    "src/Quaternion.js",
    "src/Ray.js",
    "src/Sphere.js",
    "src/Spline.js",
    "src/Triangle.js",
    "src/Vector2.js",
    "src/Vector3.js",
    "src/Vector4.js"
];

var dest = "dist/Math3.js";
var minDest = "dist/Math3.min.js";

// concatenate files
fs.truncateSync(dest);
fs.appendFileSync(dest, "(function() {\n");
for(var i = 0;i < files.length;i++) {
    console.log("CONCATENATING FILE " + files[i]);
    var data = fs.readFileSync(files[i]);
    fs.appendFileSync(dest, data);
}
fs.appendFileSync(dest, "})();\n");

// minify files
console.log("MINIFYING FILE");
fs.truncateSync(minDest);
minify(dest, function(error, data) {
    if(error) {
        console.log("Minification Error: " + error);
    } else {
        fs.appendFileSync(minDest, data);
    }
});
