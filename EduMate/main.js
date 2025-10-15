// ==================== GLOBAL ARRAYS ====================
let students = JSON.parse(localStorage.getItem("students")) || [];
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let tracker = JSON.parse(localStorage.getItem("tracker")) || [];
let resume = JSON.parse(localStorage.getItem("resume")) || [];

// ==================== STUDENT MANAGEMENT ====================
if (document.getElementById("studentTable")) {

    function renderStudents() {
        const tbody = document.getElementById("studentTable");
        tbody.innerHTML = "";
        students.forEach((s, i) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${s.name}</td>
                <td>${s.roll}</td>
                <td>${s.marks}</td>
                <td>${s.attendance}</td>
                <td>
                    <button onclick="editStudent(${i})">✏️ Edit</button>
                    <button onclick="deleteStudent(${i})">🗑️ Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
        localStorage.setItem("students", JSON.stringify(students));
    }

    window.addStudent = function() {
        const name = document.getElementById("sname").value.trim();
        const roll = document.getElementById("sroll").value.trim();
        const marks = document.getElementById("smarks").value.trim();
        const attendance = document.getElementById("sattendance").value.trim();

        if (!name || !roll || !marks || !attendance) {
            alert("Please fill all fields!");
            return;
        }

        students.push({ name, roll, marks, attendance });
        localStorage.setItem("students", JSON.stringify(students));
        renderStudents();
        document.getElementById("sname").value = "";
        document.getElementById("sroll").value = "";
        document.getElementById("smarks").value = "";
        document.getElementById("sattendance").value = "";
    };

    window.deleteStudent = function(i) {
        students.splice(i, 1);
        localStorage.setItem("students", JSON.stringify(students));
        renderStudents();
    };

    window.editStudent = function(i) {
        const s = students[i];
        document.getElementById("sname").value = s.name;
        document.getElementById("sroll").value = s.roll;
        document.getElementById("smarks").value = s.marks;
        document.getElementById("sattendance").value = s.attendance;
        students.splice(i, 1);
        localStorage.setItem("students", JSON.stringify(students));
        renderStudents();
    };

    renderStudents();
}

// ==================== TO-DO LIST ====================
if (document.title.includes("To-Do")) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    function showTasks() {
      const list = document.getElementById("taskList");
      list.innerHTML = "";
      tasks.forEach((t, i) => {
        list.innerHTML += `
          <li>${t}
            <button onclick="editTask(${i})">Edit</button>
            <button onclick="deleteTask(${i})">Delete</button>
          </li>`;
      });
    }
  
    function addTask() {
      const task = document.getElementById("taskInput").value;
      if (task) {
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        document.getElementById("taskInput").value = "";
        showTasks();
      }
    }
  
    function editTask(i) {
      const newTask = prompt("Edit Task:", tasks[i]);
      if (newTask) {
        tasks[i] = newTask;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        showTasks();
      }
    }
  
    function deleteTask(i) {
      tasks.splice(i, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      showTasks();
    }
  
    showTasks();
  }

// ==================== STUDY TRACKER ====================
if (document.getElementById("subjectList")) {
    const tracker = JSON.parse(localStorage.getItem("tracker")) || [];

    function renderSubjects() {
        const list = document.getElementById("subjectList");
        list.innerHTML = "";
        tracker.forEach((t, i) => {
            const div = document.createElement("div");
            div.className = "subject";
            div.innerHTML = `
                <strong>${t.subject}</strong> - ${t.hours} hrs
                <button onclick="deleteSubject(${i})">🗑️</button>
            `;
            list.appendChild(div);
        });
        updateSummary();
        localStorage.setItem("tracker", JSON.stringify(tracker));
    }

    function updateSummary() {
        const summaryDiv = document.getElementById("summary");
        const totalHours = tracker.reduce((acc, t) => acc + parseFloat(t.hours), 0);
        summaryDiv.innerText = `Total hours studied: ${totalHours} hrs`;
    }

    window.addSubject = function() {
        const subject = document.getElementById("subject").value.trim();
        const hours = document.getElementById("hours").value.trim();

        if (!subject || !hours) {
            alert("Please enter both subject and hours!");
            return;
        }

        tracker.push({ subject, hours });
        localStorage.setItem("tracker", JSON.stringify(tracker));
        renderSubjects();
        document.getElementById("subject").value = "";
        document.getElementById("hours").value = "";
    };

    window.deleteSubject = function(i) {
        tracker.splice(i, 1);
        localStorage.setItem("tracker", JSON.stringify(tracker));
        renderSubjects();
    };

    renderSubjects();
}


// ==================== AI RESUME BUILDER ====================
if (document.getElementById("resumeOutput")) {

    window.generateResume = function() {
        const name = document.getElementById("rname").value.trim();
        const email = document.getElementById("remail").value.trim();
        const education = document.getElementById("reducation").value.trim();
        const skills = document.getElementById("rskills").value.trim();
        const exp = document.getElementById("rexp").value.trim();

        if (!name || !email) {
            alert("Please fill your name and email!");
            return;
        }

        const aiTip = "💡 Tip: Use strong action verbs and highlight your top skills effectively.";

        const output = `
${name.toUpperCase()}
${email}

EDUCATION:
${education}

SKILLS:
${skills}

EXPERIENCE / PROJECTS:
${exp}

${aiTip}
        `;

        document.getElementById("resumeOutput").innerText = output;
    };

    window.downloadPDF = function() {
        const { jsPDF } = window.jspdf;
        const content = document.getElementById("resumeOutput").innerText;
        if (!content.trim()) {
            alert("Please generate your resume first!");
            return;
        }
        const doc = new jsPDF({ unit: "pt", format: "a4" });
        const lines = doc.splitTextToSize(content, 500);
        doc.text(lines, 40, 40);
        doc.save("My_Resume.pdf");
    };
}
