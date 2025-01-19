// Get the table body element to add new rows
const studentsTableBody = document.querySelector("#studentsTable tbody");

// Check if there are any existing records in localStorage and load them
window.onload = function() {
    const storedRecords = JSON.parse(localStorage.getItem("students")) || [];
    storedRecords.forEach(record => {
        addRowToTable(record);
    });
};

// Function to add a new row to the table
function addRowToTable(student) {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
            <button class="editBtn">Edit</button>
            <button class="deleteBtn">Delete</button>
        </td>
    `;
    studentsTableBody.appendChild(row);
}

// Handle the click event on the "Add" button
document.getElementById("addStudent").addEventListener("click", function(event) {
    // Get the values from the input fields
    const name = document.getElementById("name").value;
    const id = document.getElementById("id").value;
    const email = document.getElementById("email").value;
    const contact = document.getElementById("contact").value;

    // Validate input (check for empty values)
    if (!name || !id || !email || !contact) {
        alert("Please fill in all fields.");
        return;
    }

    // Check if the ID already exists in the stored records (to prevent duplicates)
    const storedRecords = JSON.parse(localStorage.getItem("students")) || [];
    const isDuplicate = storedRecords.some(record => record.id === id);

    if (isDuplicate) {
        alert("This student ID is already added.");
        return;
    }

    // Create a new student object
    const student = {
        name: name,
        id: id,
        email: email,
        contact: contact
    };

    // Add the new row to the table
    addRowToTable(student);

    // Store the new student in localStorage
    storedRecords.push(student);
    localStorage.setItem("students", JSON.stringify(storedRecords));

    // Clear the form inputs
    document.getElementById("studentForm").reset();
});

// Handle edit and delete actions
studentsTableBody.addEventListener("click", function(event) {
    const target = event.target;
    
    // Edit button
    if (target.classList.contains("editBtn")) {
        const row = target.closest("tr");
        const cells = row.querySelectorAll("td");
        document.getElementById("name").value = cells[0].innerText;
        document.getElementById("id").value = cells[1].innerText;
        document.getElementById("email").value = cells[2].innerText;
        document.getElementById("contact").value = cells[3].innerText;

        // Remove the row after editing to prevent duplicate entries
        row.remove();
        
        // Update the localStorage after editing
        const storedRecords = JSON.parse(localStorage.getItem("students")) || [];
        const updatedRecords = storedRecords.filter(record => record.id !== cells[1].innerText);
        localStorage.setItem("students", JSON.stringify(updatedRecords));
    }

    // Delete button
    if (target.classList.contains("deleteBtn")) {
        const row = target.closest("tr");
        const studentId = row.querySelector("td:nth-child(2)").innerText;

        // Remove the row from the table
        row.remove();

        // Remove the student from localStorage
        const storedRecords = JSON.parse(localStorage.getItem("students")) || [];
        const updatedRecords = storedRecords.filter(record => record.id !== studentId);
        localStorage.setItem("students", JSON.stringify(updatedRecords));
    }
});
