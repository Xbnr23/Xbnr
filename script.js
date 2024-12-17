// عناصر الـ DOM
const form = document.getElementById("subscriber-form");
const subscribersList = document.getElementById("subscribers-list");

// تحميل المشتركين من Local Storage
let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];

// إضافة مشترك جديد
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const phone = document.getElementById("phone").value;
    const expiryDate = document.getElementById("expiryDate").value;

    const subscriber = { firstName, lastName, phone, expiryDate };
    subscribers.push(subscriber);
    localStorage.setItem("subscribers", JSON.stringify(subscribers));

    form.reset();
    displaySubscribers();
});

// عرض قائمة المشتركين
function displaySubscribers() {
    subscribersList.innerHTML = "";

    subscribers.forEach((subscriber, index) => {
        const div = document.createElement("div");
        div.classList.add("subscriber");

        // التحقق من صلاحية الاشتراك
        const expiry = new Date(subscriber.expiryDate);
        const today = new Date();
        if (expiry < today) {
            div.classList.add("expired");
        } else if ((expiry - today) / (1000 * 60 * 60 * 24) <= 7) {
            div.classList.add("warning");
        }

        div.innerHTML = `
            <div>
                <strong>${subscriber.firstName} ${subscriber.lastName}</strong><br>
                هاتف: ${subscriber.phone}<br>
                انتهاء الاشتراك: ${subscriber.expiryDate}
            </div>
            <button onclick="deleteSubscriber(${index})">حذف</button>
        `;

        subscribersList.appendChild(div);
    });
}

// حذف مشترك
function deleteSubscriber(index) {
    subscribers.splice(index, 1);
    localStorage.setItem("subscribers", JSON.stringify(subscribers));
    displaySubscribers();
}

// عرض القائمة عند تحميل الصفحة
displaySubscribers();
