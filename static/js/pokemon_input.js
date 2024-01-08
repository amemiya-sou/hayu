const container = document.getElementById('pokemon-input-content');
for (let i = 1; i <= 6; i++) {
    const label = document.createElement('label');
    label.setAttribute('for', `pokemon${i}`);
    label.textContent = `ポケモン${(i === 1) ? '１' : (i === 2) ? '２' : (i === 3) ? '３' : (i === 4) ? '４' : (i === 5) ? '５' : (i === 6) ? '６' : ''}`;

    const div = document.createElement('div');
    div.classList.add('input-group');

    const pokemonInput = document.createElement('input');
    pokemonInput.setAttribute('type', 'search');
    pokemonInput.setAttribute('id', `pokemon${i}`);
    pokemonInput.classList.add('poke_input', 'pokemon_input');
    pokemonInput.setAttribute('name', `pokemon${i}`);
    pokemonInput.setAttribute('autocomplete', 'off');
    pokemonInput.setAttribute('placeholder', 'ポケモン名');

    const itemInput = document.createElement('input');
    itemInput.setAttribute('type', 'search');
    itemInput.setAttribute('id', `item${i}`);
    itemInput.classList.add('tool_input', 'item_input');
    itemInput.setAttribute('name', `item${i}`);
    itemInput.setAttribute('autocomplete', 'off');
    itemInput.setAttribute('placeholder', 'もちもの');

    const teraInput = document.createElement('input');
    teraInput.setAttribute('type', 'search');
    teraInput.setAttribute('id', `tera${i}`);
    teraInput.classList.add('teras_input', 'tera_input');
    teraInput.setAttribute('name', `tera${i}`);
    teraInput.setAttribute('autocomplete', 'off');
    teraInput.setAttribute('placeholder', 'テラスタル');

    div.appendChild(pokemonInput);
    div.appendChild(itemInput);
    div.appendChild(teraInput);

    container.appendChild(label);
    container.appendChild(div);
}