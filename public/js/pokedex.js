function loadCards(pagination, cards){
    element = '';
    count = 0;
    while(count < cards.length){
        element += `<div class="row">`;
        for(var j = 0; j < pagination; j++){
            card = cards[count];
            if(!card) break;
            element += `
            <div class="col-3">
                <!-- Pokémon Image Section -->
                <div class="pokemon-card">
                    <div class="container pokemon-image-container mt-4">
                        <img src="${card.image}" alt="${card.name} image" class="pokemon-image"> <!--Add from API-->
                    </div>

                    <!-- Pokémon Name -->
                    <div class="pokemon-name">
                        ${card.name}
                    </div>
                </div>
            </div>
            `;
            count++;
        }
        element += `</div>`;
    }
    document.getElementById("pokemon-info").innerHTML = element;
}