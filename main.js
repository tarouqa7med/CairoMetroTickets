// ================== LINES ARRAYS ==================
const arr1 = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34,
];

const arr2 = [
    35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52,
];

const arr3 = [
    53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71,
    72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83,
];

const arr4 = [
    // إذا فيه أي محطات إضافية تربط بين الخطوط، ضيفها هنا
];

const allArrays = [arr1, arr2, arr3, arr4];

// ================== UTILITY FUNCTIONS ==================
function findArrayContaining(num) {
    for (let i = 0; i < allArrays.length; i++) {
        if (allArrays[i].includes(num)) return i;
    }
    return -1;
}

function findDuplicateInOtherArrays(num, currentArrIndex) {
    for (let i = 0; i < allArrays.length; i++) {
        if (i !== currentArrIndex && allArrays[i].includes(num)) return i;
    }
    return -1;
}

// ================== CALCULATE STEPS ==================
function calculateSteps(start, end) {
    let steps = 0;
    let path = [];
    let current = start;

    while (current !== end) {
        path.push(current);

        let currentArrIndex = findArrayContaining(current);
        if (currentArrIndex === -1) break;
        let arr = allArrays[currentArrIndex];

        let direction = end > current ? 1 : -1;
        let next = current + direction;

        if (arr.includes(next)) {
            current = next;
            steps++;
            continue;
        }

        let otherArrIndex = findDuplicateInOtherArrays(next, currentArrIndex);
        if (otherArrIndex !== -1) {
            current = next;
            steps++;
            continue;
        }

        let foundInOther = allArrays.find((a) => a.includes(next));
        if (foundInOther) {
            current = next;
            steps++;
            continue;
        }

        break; // الرقم التالي غير موجود
    }

    path.push(end);
    return { steps, path };
}

// ================== SELECT ELEMENTS ==================
const selects = document.querySelectorAll("select");
const fromSelect = selects[0];
const toSelect = selects[1];
const stepsInput = document.getElementById("currentTicket");

// ================== STATIONS ==================
const stations = [
    "المرج الجديدة",
    "المرج",
    "عزبة النخل",
    "عين شمس",
    "المطرية",
    "حلمية الزيتون",
    "حدائق الزيتون",
    "سراي القبة",
    "حمامات القبة",
    "كوبري القبة",
    "منشية الصدر",
    "الدمرداش",
    "غمرة",
    "الشهداء",
    "أحمد عرابي",
    "جمال عبد الناصر",
    "السادات",
    "سعد زغلول",
    "السيدة زينب",
    "الملك الصالح",
    "مار جرجس",
    "الزهراء",
    "دار السلام",
    "حدائق المعادي",
    "المعادي",
    "ثكنات المعادي",
    "طرة البلد",
    "كوتسيكا",
    "طرة الأسمنت",
    "المعصرة",
    "حدائق حلوان",
    "وادي حوف",
    "جامعة حلوان",
    "عين حلوان",
    "حلوان",
    "شبرا الخيمة",
    "كلية الزراعة",
    "المظلات",
    "الخلفاوي",
    "سانت تريزا",
    "روض الفرج",
    "مسرة",
    "العتبة",
    "محمد نجيب",
    "الأوبرا",
    "الدقي",
    "البحوث",
    "جامعة القاهرة",
    "فيصل",
    "الجيزة",
    "أم المصريين",
    "ساقية مكي",
    "المنيب",
    "عدلي منصور",
    "الهايكستب",
    "عمر بن الخطاب",
    "قباء",
    "هشام بركات",
    "النزهة",
    "نادي الشمس",
    "ألف مسكن",
    "هليوبوليس",
    "هارون",
    "الأهرام",
    "كلية البنات",
    "الاستاد",
    "أرض المعارض",
    "العباسية",
    "عبده باشا",
    "الجيش",
    "باب الشعرية",
    "ماسبيرو",
    "صفاء حجازي",
    "الكيت كات",
    "السودان",
    "أمبابة",
    "البوهي",
    "القومية العربية",
    "الطريق الدائري",
    "محور روض الفرج",
    "التوفيقية",
    "وادي النيل",
    "جامعة الدول العربية",
    "بولاق الدكرور",
];

// ================== BUILD OPTIONS ==================
stations.forEach((station, index) => {
    const opt1 = document.createElement("option");
    opt1.value = index;
    opt1.textContent = station;

    const opt2 = opt1.cloneNode(true);

    fromSelect.appendChild(opt1);
    toSelect.appendChild(opt2);
});

// ================== TICKET CALCULATION ==================
function calculateTicket() {
    if (!fromSelect.value || !toSelect.value) {
        stepsInput.value = "";
        return;
    }

    if (fromSelect.value === toSelect.value) {
        alert("مينفعش تختار نفس محطة البداية والنهاية");
        toSelect.value = "";
        stepsInput.value = "";
        return;
    }

    const fromValue = Number(fromSelect.value);
    const toValue = Number(toSelect.value);

    const result = calculateSteps(fromValue, toValue);

    stepsInput.value = `مشي ${result.steps} محطة (Path: ${result.path.join(" → ")})`;
}

fromSelect.addEventListener("change", calculateTicket);
toSelect.addEventListener("change", calculateTicket);

const visaInput = document.getElementById("visaCardNumber");

visaInput.addEventListener("input", (e) => {
    let cursorPosition = visaInput.selectionStart;

    // إزالة أي شيء غير رقم
    let digits = visaInput.value.replace(/\D/g, "").slice(0, 16);

    // إضافة dash بعد الرقم 4، 8، 12
    let formatted = "";
    for (let i = 0; i < digits.length; i++) {
        formatted += digits[i];
        if (i === 3 || i === 7 || i === 11) formatted += "-";
    }

    visaInput.value = formatted;

    // ضبط مكان المؤشر بشكل صحيح بعد الـ dash
    const dashPositions = [4, 9, 14]; // المواقع اللي فيها dash بعد التهيئة
    let extra = dashPositions.filter((pos) => cursorPosition > pos).length;
    cursorPosition += extra;

    // لا يسمح بتجاوز نهاية النص
    if (cursorPosition > formatted.length) cursorPosition = formatted.length;

    visaInput.setSelectionRange(cursorPosition, cursorPosition);
});

