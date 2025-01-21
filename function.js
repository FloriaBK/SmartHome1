//general function

//desktop function

//mobile function
const statisticsButton = document.getElementById("statisticsButton");
const cameraButton = document.getElementById("cameraButton");

function switchToCamera() {
    statisticsButton.className = "navigationbutton";
    cameraButton.className = "selectednavigationbutton";
}
function switchToStatistics() {
    statisticsButton.className = "selectednavigationbutton";
    cameraButton.className = "navigationbutton";
}