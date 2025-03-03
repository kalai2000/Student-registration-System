
const studentname = document.querySelector(".student-Name");
const studentid = document.querySelector(".Student-ID");
const emailid = document.querySelector(".Email-ID");
const cno = document.querySelector(".Contact-NO");
const form = document.querySelector(".form");
const tableBody = document.querySelector(".table-body");

document.addEventListener("DOMContentLoaded", loadRecords);

form.addEventListener("submit", function (event) {
    event.preventDefault();
    addItem();
});

function addItem() {
    if (!studentname.value || !studentid.value || !emailid.value || !cno.value) {
        alert("Please fill all the fields.");
        return;
    }
     

    const studentData = {
        name: studentname.value,
        id: studentid.value,
        email: emailid.value,
        contact: cno.value
    };

    saveToLocalStorage(studentData);
    displayRecord(studentData);

    studentname.value = "";
    studentid.value = "";
    emailid.value = "";
    cno.value = "";
}

function displayRecord(studentData) {
    const tr = document.createElement("tr");
    const tableElement1 = document.createElement("td");
    const tableElement2 = document.createElement("td");
    const tableElement3 = document.createElement("td");
    const tableElement4 = document.createElement("td");
    const tableElement5 = document.createElement("td");

    tableElement1.textContent = studentData.name;
    tableElement2.textContent = studentData.id;
    tableElement3.textContent = studentData.email;
    tableElement4.textContent = studentData.contact;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.backgroundColor = "red";
    deleteBtn.style.color = "white";
    deleteBtn.style.border = "none";
    deleteBtn.style.padding = "5px 10px";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.marginRight = "5px";

    deleteBtn.addEventListener("click", function () {
        tr.remove();
        removeFromLocalStorage(studentData.id);
    });

    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset";
    resetBtn.style.backgroundColor = "blue";
    resetBtn.style.color = "white";
    resetBtn.style.border = "none";
    resetBtn.style.padding = "5px 10px";
    resetBtn.style.cursor = "pointer";

    resetBtn.addEventListener("click", function () {
        studentname.value = studentData.name;
        studentid.value = studentData.id;
        emailid.value = studentData.email;
        cno.value = studentData.contact;

        tr.remove();
        removeFromLocalStorage(studentData.id);
    });

    tableElement5.appendChild(deleteBtn);
    tableElement5.appendChild(resetBtn);
    tr.append(tableElement1, tableElement2, tableElement3, tableElement4, tableElement5);
    tableBody.appendChild(tr);
}

function saveToLocalStorage(studentData) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.push(studentData);
    localStorage.setItem("students", JSON.stringify(students));
}

function loadRecords() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students.forEach(displayRecord);
}

function removeFromLocalStorage(studentId) {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    students = students.filter(student => student.id !== studentId);
    localStorage.setItem("students", JSON.stringify(students));
}
