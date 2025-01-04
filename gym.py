from flask import Flask, render_template, request, redirect, url_for
from datetime import datetime

app = Flask(__name__)

# إعداد البيانات
subscribers = []


# إضافة مشترك جديد
def add_subscriber(name, surname, phone, start_date, end_date, alert_days):
    end_date_obj = datetime.strptime(end_date, "%Y-%m-%d")
    days_remaining = (end_date_obj - datetime.now()).days

    # تحديد الحالة
    if days_remaining <= 0:
        status = "منتهي"
    elif days_remaining <= alert_days:
        status = "قريب من الانتهاء"
    else:
        status = "نشط"

    # إضافة المشترك إلى القائمة
    subscribers.append({
        "name": name,
        "surname": surname,
        "phone": phone,
        "start_date": start_date,
        "end_date": end_date,
        "status": status
    })


# الصفحة الرئيسية - عرض المشتركين
@app.route("/")
def index():
    return render_template("index.html", subscribers=subscribers)


# إضافة مشترك جديد
@app.route("/add", methods=["GET", "POST"])
def add():
    if request.method == "POST":
        name = request.form["name"]
        surname = request.form["surname"]
        phone = request.form["phone"]
        start_date = request.form["start_date"]
        end_date = request.form["end_date"]
        alert_days = int(request.form["alert_days"])

        add_subscriber(name, surname, phone, start_date, end_date, alert_days)
        return redirect(url_for("index"))
    return render_template("add.html")


if __name__ == "__main__":
    app.run(debug=True)
