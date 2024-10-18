function loadTypes(types) {
    element = '';
    types.forEach(type => {
        element += `
        <span class="type-badge type-badge-${type}">${type}</span>
        `;
    });
    return element;
}

function loadPokemon(image, name, types, experience, weight, height, moves, abilities){
    document.getElementById("pokemon-info").innerHTML = `
    <!-- Pokémon Image Section -->
    <div class="container pokemon-image-container mt-4">
      <img src="${image}" alt="${name} image" class="pokemon-image"> <!--Add from API-->
    </div>

    <!-- Pokémon Name -->
    <div class="pokemon-name">
      ${name}
    </div>

    <!-- Pokémon Types -->
    <div class="type-badges"> <!--These should be added using the information of each pokemon using the API-->
      ${loadTypes(types)}
    </div>

    <div class="details">
        ${weight}
        ${height}
      <!-- This is where you can add further details later -->
    </div>

    <!-- Progress bars-->
    <h3><center> Base Stats </center></h3>

    <div class="container mt-5">
      <!-- Red Progress Bar -->
      <div class="progress-item">
        <div class="progress-label">HP</div>
        <div class="progress mb-3">
        <div class="progress-bar bg-danger" role="progressbar" style="width: ${experience[0]}%" aria-valuenow="${experience[0]}" aria-valuemin="0" aria-valuemax="100">${experience[0]}%</div>
      </div>

      <!-- Yellow Progress Bar -->
      <div class="progress-item">
        <div class="progress-label">ATK</div>
        <div class="progress mb-3">
        <div class="progress-bar bg-warning" role="progressbar" style="width: ${experience[1]}%" aria-valuenow="${experience[1]}" aria-valuemin="0" aria-valuemax="100">${experience[1]}%</div>
      </div>
    
      <!-- Blue Progress Bar -->
      <div class="progress-item">
        <div class="progress-label">DEF</div>
        <div class="progress mb-3">
        <div class="progress-bar bg-info" role="progressbar" style="width: ${experience[2]}%" aria-valuenow="${experience[2]}" aria-valuemin="0" aria-valuemax="100">${experience[2]}%</div>
      </div>
    

      <!--Purple progress bar-->
      <div class="progress-item">
        <div class="progress-label">SPD</div>
        <div class="progress mb-3">
        <div class="progress-bar bg-purple" role="progressbar" style="width: ${experience[3]}%" aria-valuenow="${experience[3]}" aria-valuemin="0" aria-valuemax="100">${experience[3]}%</div>
      </div>
    
      <!--Green progress bar-->
      <div class="progress-item">
        <div class="progress-label">EXP</div>
        <div class="progress mb-3">
        <div class="progress-bar bg-success" role="progressbar" style="width: ${experience[4]}%" aria-valuenow="${experience[4]}" aria-valuemin="0" aria-valuemax="100">${experience[4]}%</div>
      </div>
    </div>
    `;
}