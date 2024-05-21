document.getElementById('reservation-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the user input values
    const name = document.getElementById('name').value;
    const time = document.getElementById('time').value;

    // Display a confirmation message
    alert(`Reservation submitted:\nName: ${name}\nTime: ${time}`);

    // You can add further processing logic, like sending the data to a server or updating the UI
});
