firebase.initializeApp({
    apiKey: "AIzaSyB9B9A_32CIgpSWOnlS1BMOn9Aj1DwQLLc",
    authDomain: "myfirst-716d7.firebaseapp.com",
    projectId: "myfirst-716d7",
});

const db = firebase.firestore();

// Add event listener programmatically
document.getElementById("add-task-btn").addEventListener("click", addTask);
console.log(document.getElementById("add-task-btn"));

//add tasks
function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
        db.collection("tasks").add({
            task: task,
            timestamp: firebase.firestore. FieldValue.serverTimestamp(),
        });
        taskInput.value = "";
    }
}

//render tasks
function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item"
    taskItem.innerHTML = `
    <span>${doc.data().task}</span>
    <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);

}

//listener for tasks realtime
db.collection("tasks")
.orderBy("timestamp", "desc")
.onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type === "added"){
            renderTasks(change.doc);
        }
    });
});

function deleteTask(id){
    db.collection("tasks").doc(id).delete();
}