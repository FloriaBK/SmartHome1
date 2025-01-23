//general function
var parameter;
var currentvalues;
const folderPath = './Statistics';

window.onload = setStatistics;
window.onload = getBiggestStatistic;

function checkState(type) {
    let typeElement = document.getElementsByClassName(type);
    let value = "";

    for (let i = 0; i < typeElement.length; i++) {
        switch (type) {
            case "Moisture":
                value = currentvalues[type].toString() + "<span style='font-size: 4vw;'> g/m³</span>";
                break;
            case "Temperature":
                value = currentvalues[type].toString() + "<span style='font-size: 4vw;'> C°</span>";
                break;
            case "Nutrients":
                value = currentvalues[type].toString() + "<span style='font-size: 4vw;'></span>";
                break;
            case "pH":
                value = currentvalues[type].toString();
                break;
            case "Electricity":
                value = currentvalues[type].toString() + "<span style='font-size: 4vw;'> kWh</span>";
                break;
            case "Humidity":
                value = (currentvalues[type] * 100.0).toString() + "<span style='font-size: 4vw;'> %</span>";
                break;
            default:
                break;
        }

        if (currentvalues[type] > parameter[type].Good.min && currentvalues[type] < parameter[type].Good.max) {
            typeElement[i].style.backgroundColor = "#E1FDDE";
            typeElement[i].getElementsByClassName("state")[0].innerHTML = "Good";
            typeElement[i].getElementsByClassName("value")[0].innerHTML = value;
            typeElement[i].getElementsByClassName("value")[0].style.color = "#78D652";
        } else {
            if (currentvalues[type] > parameter[type].Neutral.min && currentvalues[type] < parameter[type].Neutral.max) {
                typeElement[i].style.backgroundColor = "#FCFEDE";
                typeElement[i].getElementsByClassName("state")[0].innerHTML = "Neutral";
                typeElement[i].getElementsByClassName("value")[0].innerHTML = value;
                typeElement[i].getElementsByClassName("value")[0].style.color = "#FFE627";
            } else {
                typeElement[i].style.backgroundColor = "#F7E6E6";
                typeElement[i].style.boxShadow = "0px 0vw 1vw 1vw #FF0000";
                typeElement[i].getElementsByClassName("state")[0].innerHTML = "Bad";
                typeElement[i].getElementsByClassName("value")[0].innerHTML = value;
                typeElement[i].getElementsByClassName("value")[0].style.color = "#D65252";
            }
        }
    }
}

function getBiggestStatistic() {
    var fs = require('fs');
    fileList = fs.readdirSync("Statistics/");
    alert("test");
}

function setStatistics() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "parameter.json", false);
    rawFile.onreadystatechange = function () {
        if ((rawFile.readyState === 4) && (rawFile.status === 200 || rawFile.status === 0)) {
            parameter = JSON.parse(rawFile.responseText);
        } else {
            console.error("Can't load parameter.json");
        }
    }
    rawFile.send(null);

    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", "Statistics/Statistics_2.json", false);
    rawFile.onreadystatechange = function () {
        if ((rawFile.readyState === 4) && (rawFile.status === 200 || rawFile.status === 0)) {
            currentvalues = JSON.parse(rawFile.responseText);
        } else {
            console.error("Can't load parameter.json");
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
    if (graphsButton.classList.contains("selectednavigationbutton")) {
        slideCameraIn();
    }
    graphsButton.className = "navigationbutton";
    cameraButton.className = "selectednavigationbutton";
}
function switchToGraphs() {
    if (cameraButton.classList.contains("selectednavigationbutton")) {
        slideGraphsIn();
    }
    graphsButton.className = "selectednavigationbutton";
    cameraButton.className = "navigationbutton";
}