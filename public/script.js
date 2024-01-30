// public/script.js

function showConfirmation() {
    // Display the confirmation message
    const confirmationMessage = document.getElementById('confirmation-message');
    confirmationMessage.style.display = 'block';
  
    // Hide the message after 3 seconds (3000 milliseconds)
    setTimeout(() => {
      confirmationMessage.style.display = 'none';
    }, 30000);
  
    // Allow the form submission to continue
    return true;
  }

  function clearHistory() {
    if (confirm('Are you sure you want to clear the expense history?')) {
      // Send a POST request to the server-side route to clear the history
      fetch('/clearHistory', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            console.log('Expense history cleared.');
            window.location.reload();
          } else {
            console.error('Error clearing expense history:', data.error);
            alert('An error occurred while clearing the expense history.');
          }
        })
        .catch(error => {
          console.error('Error clearing expense history:', error);
          alert('An error occurred while clearing the expense history.');
        });
    }
  } 