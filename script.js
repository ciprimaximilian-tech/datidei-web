// Passwort
const PASSWORD = "13";

// Elemente
const loginBox = document.getElementById("login");
const app = document.getElementById("app");
const error = document.getElementById("error");

const fileInput = document.getElementById("fileInput");
const uploadButton = document.getElementById("uploadButton");
const fileList = document.getElementById("fileList");
const dropArea = document.getElementById("drop-area");

let selectedFile = null;

// Login
function login() {

    const password = document.getElementById("password").value;

    if (password === PASSWORD) {

        loginBox.style.display = "none";
        app.style.display = "block";

        loadFiles();

    } else {

        error.innerText = "Falsches Passwort!";

    }

}

// Datei auswählen
fileInput.addEventListener("change", function () {

    selectedFile = this.files[0];

});

// Drag & Drop
dropArea.addEventListener("dragover", function (e) {

    e.preventDefault();

    dropArea.classList.add("dragover");

});

dropArea.addEventListener("dragleave", function () {

    dropArea.classList.remove("dragover");

});

dropArea.addEventListener("drop", function (e) {

    e.preventDefault();

    dropArea.classList.remove("dragover");

    selectedFile = e.dataTransfer.files[0];

});

// Hochladen
uploadButton.addEventListener("click", async function () {

    if (!selectedFile) {

        alert("Bitte zuerst eine Datei auswählen.");

        return;

    }

    const formData = new FormData();

    formData.append("file", selectedFile);

    try {

        const response = await fetch("/upload", {

            method: "POST",

            body: formData

        });

        if (response.ok) {

            alert("Datei erfolgreich hochgeladen!");

            selectedFile = null;

            fileInput.value = "";

            loadFiles();

        } else {

            alert("Upload fehlgeschlagen.");

        }

    } catch (err) {

        console.error(err);

        alert("Serverfehler.");

    }

});

// Dateien laden
async function loadFiles() {

    try {

        const response = await fetch("/files");

        const files = await response.json();

        fileList.innerHTML = "";

        files.forEach(file => {

            const li = document.createElement("li");

            const link = document.createElement("a");

            link.href = "/uploads/" + file;

            link.target = "_blank";

            link.innerText = file;

            li.appendChild(link);

            fileList.appendChild(li);

        });

    } catch (err) {

        console.error(err);

    }

}