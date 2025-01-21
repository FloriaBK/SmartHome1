//general function

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