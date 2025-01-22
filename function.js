//general function

let Moisture = document.getElementsByClassName("Moisture");
let Temperature = document.getElementsByClassName("Temperature");
let Nutrients = document.getElementsByClassName("Nutrients");
let pH = document.getElementsByClassName("pH");
let Electricity = document.getElementsByClassName("Electricity");
let Humidity = document.getElementsByClassName("Humidity");

var parameter;
var currentvalues;

function setStatistics() {
    //Moisture

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "parameter.json", false);
    rawFile.onreadystatechange = function() {
        if((rawFile.readyState === 4) && (rawFile.status === 200 || rawFile.status === 0)) {
            parameter = JSON.parse(rawFile.responseText);
        }else {
            alert("Can't load parameter.json");
        }
    }
    rawFile.send(null);

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "Statistics/1737575710.json", false);
    rawFile.onreadystatechange = function() {
        if((rawFile.readyState === 4) && (rawFile.status === 200 || rawFile.status === 0)) {
            currentvalues = JSON.parse(rawFile.responseText);
        }else {
            alert("Can't load parameter.json");
        }
    }
    rawFile.send(null);

    for (let i = 0; i < Moisture.length; i++) {
        if(currentvalues.Moisture > parameter.Moisture.Good.min && currentvalues.Moisture < parameter.Moisture.Good.max) {
            Moisture[i].style.backgroundColor = "#E1FDDE";
        } else {
            if(currentvalues.Moisture > parameter.Moisture.Neutral.min && currentvalues.Moisture < parameter.Moisture.Neutral.max) {
                Moisture[i].style.backgroundColor = "#FCFEDE";
            } else {
                Moisture[i].style.backgroundColor = "#F7E6E6";
                Moisture[i].style.boxShadow = "0px 0vw 1vw 1vw #FF0000";
            }
        }
    }
    for (let i = 0; i < Temperature.length; i++) {
        if(currentvalues.Temperature > parameter.Temperature.Good.min && currentvalues.Temperature < parameter.Temperature.Good.max) {
            Temperature[i].style.backgroundColor = "#E1FDDE";
        } else {
            if(currentvalues.Temperature > parameter.Temperature.Neutral.min && currentvalues.Temperature < parameter.Temperature.Neutral.max) {
                Temperature[i].style.backgroundColor = "#FCFEDE";
            } else {
                Temperature[i].style.backgroundColor = "#F7E6E6";
                Temperature[i].style.boxShadow = "0px 0vw 1vw 1vw #FF0000";
            }
        }
    }
    for (let i = 0; i < Nutrients.length; i++) {
        if(currentvalues.Nutrients > parameter.Nutrients.Good.min && currentvalues.Nutrients < parameter.Nutrients.Good.max) {
            Nutrients[i].style.backgroundColor = "#E1FDDE";
        } else {
            if(currentvalues.Nutrients > parameter.Nutrients.Neutral.min && currentvalues.Nutrients < parameter.Nutrients.Neutral.max) {
                Nutrients[i].style.backgroundColor = "#FCFEDE";
            } else {
                Nutrients[i].style.backgroundColor = "#F7E6E6";
                Nutrients[i].style.boxShadow = "0px 0vw 1vw 1vw #FF0000";
            }
        }
    }
    for (let i = 0; i < pH.length; i++) {
        if(currentvalues.pH > parameter.pH.Good.min && currentvalues.pH < parameter.pH.Good.max) {
            pH[i].style.backgroundColor = "#E1FDDE";
        } else {
            if(currentvalues.pH > parameter.pH.Neutral.min && currentvalues.pH < parameter.pH.Neutral.max) {
                pH[i].style.backgroundColor = "#FCFEDE";
            } else {
                pH[i].style.backgroundColor = "#F7E6E6";
                pH[i].style.boxShadow = "0px 0vw 1vw 1vw #FF0000";
            }
        }
    }
    for (let i = 0; i < Electricity.length; i++) {
        if(currentvalues.Electricity > parameter.Electricity.Good.min && currentvalues.Electricity < parameter.Electricity.Good.max) {
            Electricity[i].style.backgroundColor = "#E1FDDE";
        } else {
            if(currentvalues.Electricity > parameter.Electricity.Neutral.min && currentvalues.Electricity < parameter.Electricity.Neutral.max) {
                Electricity[i].style.backgroundColor = "#FCFEDE";
            } else {
                Electricity[i].style.backgroundColor = "#F7E6E6";
                Electricity[i].style.boxShadow = "0px 0vw 1vw 1vw #FF0000";
            }
        }
    }
    for (let i = 0; i < Humidity.length; i++) {
        if(currentvalues.Humidity > parameter.Humidity.Good.min && currentvalues.Humidity < parameter.Humidity.Good.max) {
            Humidity[i].style.backgroundColor = "#E1FDDE";
        } else {
            if(currentvalues.Humidity > parameter.Humidity.Neutral.min && currentvalues.Humidity < parameter.Humidity.Neutral.max) {
                Humidity[i].style.backgroundColor = "#FCFEDE";
            } else {
                Humidity[i].style.backgroundColor = "#F7E6E6";
                Humidity[i].style.boxShadow = "0px 0vw 1vw 1vw #FF0000";
            }
        }
    }
}

window.onload = setStatistics;

//desktop function

//mobile function
const camera = document.getElementById("camera");
const graphs = document.getElementById("graphs");
const graphsButton = document.getElementById("graphsButton");
const cameraButton = document.getElementById("cameraButton");

function slideGraphsIn() {
    let graphsPos = -100;
    let cameraPos = 0;
    graphs.style.display = "flex";
    camera.style.display = "flex";
    document.body.style.overflow = "hidden";
    
    function animate() {
        graphsPos += 10;
        cameraPos += 10;
        graphs.style.transform = `translateX(${graphsPos}vw)`;
        camera.style.transform = `translateX(${cameraPos}vw)`;
        if (cameraPos < 100) {
            requestAnimationFrame(animate);
        } else {
            camera.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
    animate();
}

function slideCameraIn() {
    let graphsPos = 0;
    let cameraPos = 100;
    graphs.style.display = "flex";
    camera.style.display = "flex";
    document.body.style.overflow = "hidden";
    
    function animate() {
        graphsPos -= 10;
        cameraPos -= 10;
        graphs.style.transform = `translateX(${graphsPos}vw)`;
        camera.style.transform = `translateX(${cameraPos}vw)`;
        if (graphsPos > -100) {
            requestAnimationFrame(animate);
        } else {
            graphs.style.display = "none";
            document.body.style.overflow = "auto";
        }
    }
    animate();
}

function switchToCamera() {
    if(graphsButton.classList.contains("selectednavigationbutton")) {
        slideCameraIn();
    }
    graphsButton.className = "navigationbutton";
    cameraButton.className = "selectednavigationbutton";
}
function switchToGraphs() {
    if(cameraButton.classList.contains("selectednavigationbutton")) {
        slideGraphsIn();
    }
    graphsButton.className = "selectednavigationbutton";
    cameraButton.className = "navigationbutton";
}