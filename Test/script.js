// Sample free tables data for different timeslots
let freeTables = {
  "08:00": [1, 2, 3],
  "12:00": [2, 3, 4],
  "18:00": [1, 4, 5]
};

// Function to update the dropdown options based on selected time
function updateTableOptions() {
  const time = document.getElementById("time").value;
  const tableSelect = document.getElementById("table");
  tableSelect.innerHTML = "";
  const tables = freeTables[time] || [];
  tables.forEach(table => {
    const option = document.createElement("option");
    option.value = table;
    option.text = `Table ${table}`;
    tableSelect.appendChild(option);
  });
}

// Event listener for time input change
document.getElementById("time").addEventListener("change", updateTableOptions);

// Event listener for form submission
document.getElementById("reservationForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const clientId = document.getElementById("clientId").value;
  const name = document.getElementById("name").value;
  const time = document.getElementById("time").value;
  const table = document.getElementById("table").value;

  // Simulate booking (just console log for now)
  console.log(`Booking for: Client ID: ${clientId}, Name: ${name}, Time: ${time}, Table: ${table}`);

  // Save booked table in local storage
  let bookedTables = JSON.parse(localStorage.getItem("bookedTables")) || {};
  if (!bookedTables[time]) {
    bookedTables[time] = [];
  }
  bookedTables[time].push({ clientId, name, table });
  localStorage.setItem("bookedTables", JSON.stringify(bookedTables));

  // Simulate updating free tables data (remove booked table)
  const index = freeTables[time].indexOf(parseInt(table));
  if (index !== -1) {
    freeTables[time].splice(index, 1);
  }

  // Update dropdown options
  updateTableOptions();

  // Reset form fields
  document.getElementById("reservationForm").reset();

  // Update booked tables list
  updateBookedTables();
});

// Function to update the booked tables list
function updateBookedTables() {
  const bookedTables = JSON.parse(localStorage.getItem("bookedTables")) || {};
  const bookedList = document.getElementById("bookedList");
  bookedList.innerHTML = "";
  Object.keys(bookedTables).forEach(time => {
    bookedTables[time].forEach(booking => {
      const row = document.createElement("tr");
      const cancelCell = document.createElement("td");
      const cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.classList.add("text-red-600", "font-semibold", "cursor-pointer");
      cancelBtn.addEventListener("click", function() {
        cancelBooking(time, booking);
      });
      cancelCell.appendChild(cancelBtn);

      row.innerHTML = `
        <td class="px-4 py-2">${time}</td>
        <td class="px-4 py-2">${booking.clientId}</td>
        <td class="px-4 py-2">${booking.name}</td>
        <td class="px-4 py-2">${booking.table}</td>
      `;
      row.appendChild(cancelCell);
      bookedList.appendChild(row);
    });
  });
}

// Function to cancel a booked reservation
function cancelBooking(time, booking) {
  // Remove booking from local storage
  let bookedTables = JSON.parse(localStorage.getItem("bookedTables")) || {};
  bookedTables[time] = bookedTables[time].filter(b => !(b.clientId === booking.clientId && b.name === booking.name && b.table === booking.table));
  localStorage.setItem("bookedTables", JSON.stringify(bookedTables));

  // Add back the table to free tables data
  if (!freeTables[time]) {
    freeTables[time] = [];
  }
  freeTables[time].push(booking.table);

  // Update booked tables list
  updateBookedTables();

  // Update dropdown options
  updateTableOptions();
}

// Initial update of booked tables list
updateBookedTables();
