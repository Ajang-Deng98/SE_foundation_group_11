document.querySelector("#menu").addEventListener("click", function () {
  document.querySelector("#nav-links").style.display =
    document.querySelector("#nav-links").style.display == "none"
      ? "block"
      : "none";
});

document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const state = document.getElementById('stateInput').value;
  const city = document.getElementById('cityInput').value;

  try {
    // Fetch real-time clinic data from the new endpoint
    const response = await fetch(`http://localhost:5000/clinics/real-time?state=${state}&city=${city}`);
    if (response.ok) {
      const clinics = await response.json();
      displayClinicsOnMap(clinics);
    } else {
      alert('Failed to fetch clinics');
    }
  } catch (err) {
    console.error(err);
    alert('An error occurred while fetching clinics');
  }
});

function displayClinicsOnMap(clinics) {
  const mapSection = document.getElementById('mapSection');
  mapSection.classList.remove('hidden');

  const map = L.map('map').setView([4.85, 31.6], 6); // Default view centered on South Sudan

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  clinics.forEach(clinic => {
    L.marker([clinic.geometry.location.lat, clinic.geometry.location.lng])
      .addTo(map)
      .bindPopup(`<b>${clinic.name}</b><br>${clinic.formatted_address}`);
  });
}
