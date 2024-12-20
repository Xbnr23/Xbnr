function displaySubscribers() {
    subscribersList.innerHTML = "";

    subscribers.forEach((subscriber, index) => {
        const div = document.createElement("div");
        div.classList.add("subscriber");

        // التحقق من صلاحية الاشتراك
        const expiry = new Date(subscriber.expiryDate);
        const today = new Date();
        let statusMessage = "";

        if (expiry < today) {
            div.classList.add("expired");
            statusMessage = "منتهي الصلاحية";
        } else if ((expiry - today) / (1000 * 60 * 60 * 24) <= 7) {
            div.classList.add("warning");
            statusMessage = "قريب من الانتهاء";
        } else {
            statusMessage = "صالح";
        }

        // تنسيق عرض بيانات المشترك
        div.innerHTML = `
            <div>
                <strong>${subscriber.firstName} ${subscriber.lastName}</strong><br>
                هاتف: ${subscriber.phone}<br>
                <span>تاريخ الانتهاء: ${subscriber.expiryDate} (${statusMessage})</span>
            </div>
            <button onclick="deleteSubscriber(${index})">حذف</button>
        `;

        subscribersList.appendChild(div);
    });
    
}localStorage.setItem("key", "value");
let value = localStorage.getItem("key");
console.log(value); // ستظهر القيمة المحفوظة
localStorage.removeItem("key");

