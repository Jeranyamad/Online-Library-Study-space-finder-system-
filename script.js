function myFunction() {
    document.getElementById('reservation-form').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission

      // Get the user input values
      const name = document.getElementById('name').value;
      const time = document.getElementById('time').value;
      const studentId = document.getElementById('student-id').value;

      // Check if the time slot is taken
      if (isTimeSlotTaken(time)) {
        alert('Time slot is already booked. Please choose a different time slot.');
        return; // Stop further processing
      }

      // Validate the student ID
      if (!validateStudentId(studentId)) {
        alert('Wrong student ID. Please enter a valid student ID (format: w123456).');
        return; // Stop further processing
      }

      // Display a confirmation message
      alert(`Reservation submitted:\nName: ${name}\nTime: ${time}\nStudent ID: ${studentId}`);

      // You can add further processing logic, like sending the data to a server or updating the UI
    });
  }

  // Function to check if a time slot is taken (dummy implementation)
  function isTimeSlotTaken(time) {
    // You can replace this with your own logic to check if the time slot is already booked
    // For this example, let's assume the time slot is taken if the time is '9:00 AM'
    return time === '9:00 AM';
  }

  // Function to validate the student ID
  function validateStudentId(studentId) {
    // You can replace this with your own logic to validate the student ID
    // For this example, let's assume the student ID should start with 'w' followed by 6 digits
    return /^w\d{6}$/.test(studentId);
  }

  // Call the function to enable the form submission logic
  myFunction();
