document.getElementById('imeiForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const imei = document.getElementById('imei').value;

  // Validate IMEI format
  if (imei.length !== 15 || !/^\d{15}$/.test(imei)) {
    alert('Please enter a valid 15-digit IMEI number.');
    return;
  }

  try {
    // Call the IMEI API with JSON format
    const response = await fetch(`https://alpha.imeicheck.com/api/modelBrandName?imei=${imei}&format=json`);
    const data = await response.json();  // Parse the JSON response

    // Check if the response contains data
    if (data && data.model && data.brand) {
      document.getElementById('result').innerHTML = `
        <h2>IMEI Information</h2>
        <p><strong>Model:</strong> ${data.model}</p>
        <p><strong>Brand:</strong> ${data.brand}</p>
      `;
    } else {
      document.getElementById('result').innerHTML = `<p>No data found for this IMEI.</p>`;
    }

    document.getElementById('result').style.display = 'block';
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('result').innerHTML = `<p>There was an error checking the IMEI.</p>`;
    document.getElementById('result').style.display = 'block';
  }
});
