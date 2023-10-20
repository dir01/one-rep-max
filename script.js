window.onload = function() {
    const weightInput = document.getElementById('weight');
    const rows = document.getElementById('rows');
    const addRowButton = document.getElementById('add-row');

    weightInput.oninput = calculateWeights;
    addRowButton.onclick = addRow;

    loadState();

    function calculateWeights() {
        const weight = weightInput.value;
        const rows = document.getElementsByClassName('row');
        for (let i = 0; i < rows.length; i++) {
            const repsInput = rows[i].getElementsByClassName('reps')[0];
            const calculatedWeightInput = rows[i].getElementsByClassName('calculated-weight')[0];
            const reps = repsInput.value;
            const calculatedWeight = calculateOneRepMax(weight, reps);
            calculatedWeightInput.value = calculatedWeight;
        }
        saveState();
    }

    function calculateOneRepMax(weight, reps) {
        return weight * (1 + reps / 30);
    }

    function addRow() {
        const row = document.createElement('div');
        row.className = 'row';
        row.innerHTML = '<input class="calculated-weight" type="number" disabled>kg <input class="reps" type="number" value="10">RM';
        rows.appendChild(row);
        row.getElementsByClassName('reps')[0].oninput = calculateWeights;
        calculateWeights();
    }

    function saveState() {
        const state = {
            weight: weightInput.value,
            rows: Array.from(document.getElementsByClassName('reps')).map(input => input.value)
        };
        localStorage.setItem('state', JSON.stringify(state));
    }

    function loadState() {
        const state = JSON.parse(localStorage.getItem('state'));
        if (state) {
            weightInput.value = state.weight;
            for (let i = 0; i < state.rows.length - 1; i++) {
                addRow();
            }
            const repsInputs = document.getElementsByClassName('reps');
            for (let i = 0; i < state.rows.length; i++) {
                repsInputs[i].value = state.rows[i];
            }
            calculateWeights();
        }
    }
}
