document.getElementById('deliveryForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const orderType = document.getElementById('orderType').value;
    const address = document.getElementById('address').value;
    const phone = document.getElementById('phone').value;

    // إنشاء عنصر الطلبية
    const ordersList = document.getElementById('orders');
    const orderItem = document.createElement('li');
    orderItem.className = 'list-group-item';

    orderItem.innerHTML = `
        <div>
            <p><strong>العميل:</strong> ${name}</p>
            <p><strong>نوع الطلبية:</strong> ${orderType}</p>
            <p><strong>العنوان:</strong> ${address}</p>
            <p><strong>الهاتف:</strong> ${phone}</p>
        </div>
        <div class="order-actions">
            <button class="btn btn-warning btn-sm edit">تعديل</button>
            <button class="btn btn-danger btn-sm delete">حذف</button>
        </div>
    `;

    ordersList.appendChild(orderItem);

    // إعادة تعيين النموذج
    document.getElementById('deliveryForm').reset();

    // إضافة أحداث للأزرار
    const deleteButton = orderItem.querySelector('.delete');
    const editButton = orderItem.querySelector('.edit');

    // حذف الطلبية
    deleteButton.addEventListener('click', () => {
        ordersList.removeChild(orderItem);
    });

    // تعديل الطلبية
    editButton.addEventListener('click', () => {
        document.getElementById('name').value = name;
        document.getElementById('orderType').value = orderType;
        document.getElementById('address').value = address;
        document.getElementById('phone').value = phone;

        // حذف الطلبية الحالية من القائمة
        ordersList.removeChild(orderItem);
    });
});
