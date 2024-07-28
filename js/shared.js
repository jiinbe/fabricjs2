document.getElementById("shared").addEventListener("click", () => {
alert("share image");
const dataUrl = c.toDataURL(); 
fetch(dataUrl)
.then(res => res.blob())
.then(blob => {
//console.log(blob)
const filesArray = [new File([blob], 'image.png', { type: blob.type, lastModified: new Date().getTime() })];
console.log(filesArray);
const shareData = {
title: "FREE AND SIMPLE PFP GENERATOR",
text: "FREE AND SIMPLE PFP GENERATOR",
url: "https://jiinbe.github.io/fabricjs2/",
files: filesArray
};
console.log(shareData);
if (navigator.share) {
navigator.share(
shareData
)
.then(() => alert("thanks for share")) 
.catch(error => alert("error", error)); 
} else {
alert('navigator.share not available'); 
}
})
});
