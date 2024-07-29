var canvas = new fabric.Canvas('c', { isDrawingMode: false, preserveObjectStacking: true });
canvas.selection = false;
canvas.backgroundColor = 'rgba(27, 31, 36, 0.1)';
  
var textX = canvas.width / 2;
var textY = 200;
// var filters = ['grayscale', 'invert', 'remove-white', 'sepia', 'sepia2', 'brightness', 'contrast', 'saturate', 'noise', 'gradient-transparency', 'pixelate', 'blur', 'sharpen', 'emboss', 'tint', 'multiply', 'blend'];
var filters = [];

var origW;
var origH;
var wH;
var hW;

var text = new fabric.Text('', { 
fontFamily: "Times New Roman",
fill: '#fff',
textAlign: 'center',
originX: 'center',
left: textX, 
top: textY
});

canvas.add(text);

fabric.Image.fromURL('fabric.png', function(img) {
  
img.selectable = false;
img.evented = false;
  
canvas.add(img);
 
},{ crossorigin: 'Anonymous' });

function updateCanvasText(txt){
// console.log('text');
text.set({ text: txt });
canvas.bringToFront(text);
canvas.renderAll();
}

function uploadImage(e){
  
var reader = new FileReader();
reader.onload = function (event) {

var imgObj = new Image();
imgObj.src = event.target.result;
imgObj.onload = function () {
var image = new fabric.Image(imgObj);
      
image.filters.push(new fabric.Image.filters.Brightness({ brightness: 0 }));
image.applyFilters(canvas.renderAll.bind(canvas));
      
console.log("canvas = ",canvas);
canvas.add(image);
canvas.sendToBack(image);
canvas.setActiveObject(image);

canvas.item(0).hasControls = canvas.item(0).hasBorders = false;

origW = image.width;
origH = image.height;
wH = origW/origH;
hW = origH/origW;
      
image.width = canvas.width;
image.height = canvas.width *hW ;
      
image.originX = "center";
image.originY = "center";
image.left = canvas.width / 2;
image.top = canvas.height / 2;
// console.log("image b = ",image);
// console.log("image width = ",image.width);
// console.log("image height = ",image.height);

}

}
reader.readAsDataURL(e.target.files[0]);
}


function scaleImage(perc) {
var obj = canvas.getActiveObject();

var newW = canvas.width * perc;
  
obj.width = newW;
obj.height = newW *hW;
  
canvas.renderAll();
  
}

function applyFilterValue(index, prop, value) {
var obj = canvas.getActiveObject();
  
if (obj.filters[index]) {
obj.filters[index][prop] = value;
obj.applyFilters(canvas.renderAll.bind(canvas));
}
}

$('#imgLoader').on('change', function(e){
  
uploadImage(e);
});

$('#textInput').on('keyup', function(e){
    
updateCanvasText($(this).val());
});

// $("#save-btn").on('click', function(){ 
// window.open(canvas.toDataURL());
// });

$("#save-btn").click(function(){
$("#c").get(0).toBlob(function(blob){
saveAs(blob, "image.png");
});
});		

function selectFile() {
document.getElementById("imgLoader").click();
}

let clickButton = document.getElementById("save-btn");
let fileInput = document.getElementById("imgLoader");
fileInput.addEventListener("change", function () { 
// check if the file is selected or not
if (fileInput.files.length == 0) {
clickButton.disabled = true;
clickButton.opacity = 0.3;
} else {
clickButton.disabled = false;
clickButton.style.opacity = 1;
}
});

canvas.on({
'object:moving': function(e) {
e.target.opacity = 0.5;
},
'object:modified': function(e) {
e.target.opacity = 1;
}
});
  
$('#brightness-value').on('change', function(e){
// console.log("index, prop, value = ", 5, 'brightness', parseInt(this.value, 10))
applyFilterValue(0, 'brightness', parseInt(this.value, 10));
});

$('#scale-value').on('change', function(){
  
// console.log("scale val = ", parseInt(this.value)/100);
var perc = parseInt(this.value)/100;
scaleImage(perc);
});

var max = 200,
min = 50,
step = 0.1,
output = $('#output').text(min);
$("#scale-value")
.attr({'max': max, 'min':min, 'step': step,'value': String(min)})
.on('input change', function() {    
output.text(this.value);
});

var max = 255,
min = -255,
step = 0.1,
result = $('#result').text(min);
$("#brightness-value")
.attr({'max': max, 'min':min, 'step': step,'value': String(min)})
.on('input change', function() {    
result.text(this.value);
});
