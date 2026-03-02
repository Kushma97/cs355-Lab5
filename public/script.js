async function insertDoc() {
    const text = document.getElementById("insert").value;
    const results = document.getElementById("results");
    try {
        const json = JSON.parse(text);

        const response = await fetch("/insert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(json)
        });

        const data = await response.json();
        results.textContent = JSON.stringify(data, null, 2);

    } catch (err) {
        results.textContent = "Error: " + err.message;
    }
}

async function searchDoc() {
    const text = document.getElementById("search").value;
    const results = document.getElementById("results");

    try {
        const json = JSON.parse(text);

        const response = await fetch("/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(json)
        });

        const data = await response.json();
        results.textContent = JSON.stringify(data, null, 2);

    } catch (err) {
        results.textContent = "Error: " + err.message;
    }
}