const form = document.getElementById('subscription-form');
const tableBody = document.querySelector('#subscription-table tbody');

let subscriptions = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const price = document.getElementById('price').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;

    const subscription = { name, phone, price, startDate, endDate };
    subscriptions.push(subscription);

    displaySubscriptions();
    form.reset();
});

function displaySubscriptions() {
    tableBody.innerHTML = '';
    subscriptions.forEach((sub, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${sub.name}</td>
            <td>${sub.phone}</td>
            <td>${sub.price}</td>
            <td>${sub.startDate}</td>
            <td>${sub.endDate}</td>
            <td>
                <button class="edit" onclick="editSubscription(${index})">تعديل</button>
                <button class="delete" onclick="deleteSubscription(${index})">حذف</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function deleteSubscription(index) {
    subscriptions.splice(index, 1);
    displaySubscriptions();
}

function editSubscription(index) {
    const sub = subscriptions[index];
    document.getElementById('name').value = sub.name;
    document.getElementById('phone').value = sub.phone;
    document.getElementById('price').value = sub.price;
    document.getElementById('start-date').value = sub.startDate;
    document.getElementById('end-date').value = sub.endDate;

    deleteSubscription(index);
}
