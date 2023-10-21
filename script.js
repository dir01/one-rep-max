let state = {
    oneRepMaxWeight: 100,
    weightUnit: 'kg',
    rows: [
        {reps: 10, weight: 0},
        {reps: 20, weight: 0},
        {reps: 30, weight: 0}
    ]
};

window.onload = function () {
    loadState();
    updateRows();
    renderUI();
}

function updateRows() {
    state.rows = state.rows.map(row => {
        const weight = calculateNRepMax(state.oneRepMaxWeight, row.reps);
        return {...row, weight};
    });
}

function renderUI() {
    const body = document.getElementsByTagName('body')[0];
    body.innerHTML = `
    <header>
        <input id="weight" type="number" value="${state.oneRepMaxWeight}" onchange="onOneRepMaxChange(event);">
        <select id="weight-unit" onchange="onWeightUnitChange(event)">
            <option value="kg" ${state.weightUnit === 'kg' ? 'selected' : ''}>kg</option>
            <option value="lb" ${state.weightUnit === 'lb' ? 'selected' : ''}>lb</option>
        </select> 1<abbr title="Rep Max">RM</abbr>
        <a href='#' onclick="onCalc1RM(); return false;">🧮</a>
    </header>
    <div id="rows">
        ${state.rows.map((row, i) => `
        <div class="row">
            <input class="reps" value="${row.reps}" onchange="onRepCountChange(event)" data-index="${i}" type="number"><abbr title="Rep Max">RM</abbr>
            is ${row.weight} ${state.weightUnit}
            ${state.rows.length > 1 ? '<button class="remove-row">-</button>' : ''}
        </div>`).join('')}
    </div>
    <button id="add-row" onclick="addRow()">Add Row</button>`
}

function onCalc1RM() {
    const weight = parseFloat(prompt('Enter weight'));
    const reps = parseInt(prompt('Enter reps'));
    state.oneRepMaxWeight = calculateOneRepMax(weight, reps);
    updateRows();
    renderUI();
    saveState();
}

function onRepCountChange(event) {
    const index = event.target.attributes['data-index'].value;
    const row = state.rows[index];
    row.reps = parseInt(event.target.value);
    sortRows();
    updateRows();
    renderUI();
    saveState();
}

function onOneRepMaxChange(event) {
    state.oneRepMaxWeight = event.target.value;
    state.rows = state.rows.map(row => {
        const weight = calculateNRepMax(state.oneRepMaxWeight, row.reps);
        return {...row, weight};
    });
    updateRows();
    renderUI();
    saveState();
}


function onWeightUnitChange(event) {
    state.weightUnit = event.target.value;
    renderUI();
    saveState();
}


function addRow() {
    const reps = 10;
    state.rows.push({reps});
    sortRows();
    updateRows();
    renderUI();
    saveState();
}

function sortRows() {
    state.rows.sort((a, b) => a.reps - b.reps);
}

function calculateOneRepMax(weight, reps) {
    const value = weight * (1 + 0.0333 * reps);
    return Math.round(value * 100) / 100;
}

function calculateNRepMax(oneRepMax, n) {
    const value = oneRepMax / (1 + 0.0333 * n);
    return Math.round(value * 100) / 100;
}


function loadState() {
    const savedState = JSON.parse(localStorage.getItem('state'));
    if (savedState) {
        state = savedState;
    }
}

function saveState() {
    localStorage.setItem('state', JSON.stringify(state));
}