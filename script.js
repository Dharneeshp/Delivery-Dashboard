const form = document.querySelector("#exceptionForm");
const tableBody = document.querySelector("#tableBody");
const filterType = document.querySelector("#filterType");
const filterStatus = document.querySelector("#filterStatus");
const openCount = document.querySelector("#openCount");
const resolvedCount = document.querySelector("#resolvedCount");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const deliveryId = document.querySelector("#deliveryId").value;
    const customerName = document.querySelector("#customerName").value;
    const issueType = document.querySelector("#issueType").value;
    const notes = document.querySelector("#notes").value;

    const priorityRadio = document.querySelector("input[name='priority']:checked");
    const priority = priorityRadio ? priorityRadio.value : "";

    if (!deliveryId || !customerName || !issueType || !priority) {
        alert("Please fill all required fields.");
        return;
    }

    const row = document.createElement("tr");

    if (priority === "High") {
        row.classList.add("high-priority");
    }

    row.innerHTML = `
        <td>${deliveryId}</td>
        <td>${customerName}</td>
        <td>${issueType}</td>
        <td>${priority}</td>
        <td class="status">Open</td>
        <td>
            <button class="resolve-btn">Resolve</button>
            <button class="delete-btn">Delete</button>
        </td>
    `;

    tableBody.appendChild(row);

    updateCounts();
    form.reset();
});

tableBody.addEventListener("click", function(e) {

    if (e.target.classList.contains("resolve-btn")) {

        const row = e.target.parentElement.parentElement;
        const statusCell = row.querySelector(".status");

        statusCell.textContent = "Resolved";
        row.classList.add("resolved-row");
        e.target.disabled = true;

        updateCounts();
    }

    if (e.target.classList.contains("delete-btn")) {

        const confirmDelete = confirm("Are you sure you want to delete?");
        if (confirmDelete) {
            const row = e.target.parentElement.parentElement;
            row.remove();
            updateCounts();
        }
    }
});

filterType.addEventListener("change", applyFilters);
filterStatus.addEventListener("change", applyFilters);

function applyFilters() {
    const rows = tableBody.querySelectorAll("tr");

    rows.forEach(function(row) {

        const issueType = row.children[2].textContent;
        const status = row.children[4].textContent;

        let show = true;

        if (filterType.value !== "All" && filterType.value !== issueType) {
            show = false;
        }

        if (filterStatus.value !== "All" && filterStatus.value !== status) {
            show = false;
        }

        row.style.display = show ? "" : "none";
    });
}

function updateCounts() {
    const rows = tableBody.querySelectorAll("tr");

    let open = 0;
    let resolved = 0;

    rows.forEach(function(row) {
        const status = row.children[4].textContent;

        if (status === "Open") open++;
        if (status === "Resolved") resolved++;
    });

    openCount.textContent = open;
    resolvedCount.textContent = resolved;
}
