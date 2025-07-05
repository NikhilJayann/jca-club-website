// Section toggle logic
function showSection(id) {
    document.querySelectorAll('.section').forEach(section => {
      section.classList.remove('active');
    });
    document.getElementById(id).classList.add('active');
  }
  
  // Default to home section
  window.onload = function () {
    showSection('home');
    displayPlayers(); // if playerList exists
  };
  
  // Join form handling
if (document.getElementById("joinForm")) {
  document.getElementById("joinForm").addEventListener("submit", function (e) {
    e.preventDefault();
    
    const name = document.getElementById("playerName").value.trim();
    const age = document.getElementById("playerAge").value.trim();
    const role = document.getElementById("playerRole").value.trim();
    
    if (!name || !age || !role) {
      
      return;
    }
    
    const player = { name, age, role };
    const players = JSON.parse(localStorage.getItem("jcaPlayers")) || [];
    players.push(player);
    localStorage.setItem("jcaPlayers", JSON.stringify(players));
    
    // ✅ Show success only after saving
    alert("Player registered!");
    
    document.getElementById("joinForm").reset();
    displayPlayers();
  });
}    
  // Display players
  function displayPlayers() {
    const container = document.getElementById("playerList");
    if (!container) return;
  
    const players = JSON.parse(localStorage.getItem("jcaPlayers")) || [];
    container.innerHTML = "";
  
    players.forEach((player, index) => {
      const div = document.createElement("div");
      div.className = "player-card";
      div.innerHTML = `
        <div>
          <strong>${player.name}</strong><br>
          Age: ${player.age} | Blood group: ${player.role}
        </div>
        <button onclick="deletePlayer(${index})" class="delete-btn">Delete</button>
      `;
      container.appendChild(div);
    });
  }
  function deletePlayer(index) {
    if (confirm("Are you sure you want to delete this player?")) {
      const players = JSON.parse(localStorage.getItem("jcaPlayers")) || [];
      players.splice(index, 1); // Remove 1 item at the given index
      localStorage.setItem("jcaPlayers", JSON.stringify(players));
      displayPlayers(); // Refresh UI
    }
  }

  function toggleMenu() {
    const menu = document.getElementById("navMenu");
    menu.classList.toggle("active");
  }

  // Optional: hide menu after clicking any link
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      document.getElementById("navMenu").classList.remove("active");
    });
  });

    