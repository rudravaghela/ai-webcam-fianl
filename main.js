objects = [];
valueinput = "" ;
status = "";
function setup(){
canvas = createCanvas(480,380);
canvas.center()
video = createCapture(VIDEO);
video.hide();
}

function draw(){
image(video,0,0,480,380);
if (status != ""){
    objectDetector.detect(video,gotResult);
 for(i=0;i<objects.length ;i++){
     fill("#ff0000");
     percent = floor(objects[i].confidence*100);
     text(objects[i].label+" "+percent+"%",objects[i].x + 15 , objects[i].y +15);
noFill();
stroke("#ff0000");
rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
if (objects[i].label == valueinput){
    objectDetector.detect(gotResult);
    document.getElementById("objects_status").innerHTML = valueinput +" is detected";
}
else{
    document.getElementById("objects_status").innerHTML = valueinput +" is not found";
}
 }
}
}


function find(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("objects_status").innerHTML = "Status : Detecting Objects";
    valueinput = document.getElementById("input").value ;

}

function modelLoaded(){
    console.log("modelLoaded!");
    status = true;
  
}

function gotResult(error,results)
{
if (error){
    console.error(error);
    
}
console.log(results);
objects = results;

}
