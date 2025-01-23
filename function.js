//general function
var parameter;
var currentvalues;

function checkState(type) {
    let typeElement = document.getElementsByClassName(type);
    let valueElement = document.getElementsByClassName("value"+type);

    for (let i = 0; i < typeElement.length; i++) {
        //let valueElement = typeElement.querySelector('.value');

        if(currentvalues[type] > parameter[type].Good.min && currentvalues[type] < parameter[type].Good.max) {
            typeElement[i].style.backgroundColor = "#E1FDDE";
        } else {
            if(currentvalues[type] > parameter[type].Neutral.min && currentvalues[type] < parameter[type].Neutral.max) {
                typeElement[i].style.backgroundColor = "#FCFEDE";
            } else {
                typeElement[i].style.backgroundColor = "#F7E6E6";
                typeElement[i].style.boxShadow = "0px 0vw 1vw 1vw #FF0000";
            }
        }
        valueElement[i].innerText = currentvalues[type];
    }
}

function setStatistics() {
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
    checkState("Moisture");
    checkState("Temperature");
    checkState("Nutrients");
    checkState("pH");
    checkState("Electricity");
    checkState("Humidity");

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