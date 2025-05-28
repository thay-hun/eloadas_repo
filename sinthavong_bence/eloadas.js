const eloadasArray = [];
const eloadasTable = document.getElementById('eloadasTable');

document.getElementById('eloadasForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const myFormData = new FormData(e.target);
    const eloadasData = Object.fromEntries(myFormData);

    // Szám típusokra konvertálás (különben stringként megy el)
    eloadasData.elodadas_id = parseInt(eloadasData.elodadas_id);
   

    // Küldés a szervernek
    fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(eloadasData)
    })
    .then(res => res.text())
    .then(msg => {
        alert(msg); // Pl. "Sikeres mentés."
        // Hozzáadás a táblázathoz
        eloadasArray.push(eloadasData);
        eloadasTable.innerHTML = eloadasArray.map((eloadas, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${eloadas.elodadas_id}</td>
                <td>${eloadas.cim}</td>
                <td>${eloadas.eloado}</td>
                <td>${eloadas.datum} </td>
                <td>${eloadas.helyszin} </td>
                <td>${eloadas.tema}</td>
            </tr>
        `).join('');
        e.target.reset(); // Űrlap törlése
    })
    .catch(err => {
        console.error('Hiba történt:', err);
        alert('Hiba történt a mentés során.');
    });
});