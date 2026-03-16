const form = document.getElementById("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const pw = document.getElementById("password");
const confirmPw = document.getElementById("confirmPassword");

function showError(id, message) {
    document.getElementById(id + "Error").innerText = message;
}

function clearError(id) {
    document.getElementById(id + "Error").innerText = "";
}

function validateName() {
    let value = name.value.trim();
    let regex = /^[A-Za-zÀ-ỹ\s]{3,}$/;

    if (value === "") {
        showError("name", "Không được để trống");
        return false;
    }

    if (!regex.test(value)) {
        showError("name", "ít nhất 3 ký tự, chỉ chữ và khoảng trắng");
        return false;
    }

    clearError("name");
    return true;
}

function validateEmail() {
    let value = email.value.trim();
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === "") {
        showError("email", "Email không được để trống");
        return false;
    }

    if (!regex.test(value)) {
        showError("email", "Email không đúng định dạng");
        return false;
    }

    clearError("email");
    return true;
}

function validatePhone() {
    let value = phone.value.trim();
    let regex = /^0\d{9}$/;

    if (value === "") {
        showError("phone", "Không được để trống");
        return false
    }

    if (!regex.test(value)) {
        showError("phone", "SĐT phải 10 số và bắt đầu bằng 0");
        return false
    }

    clearError("phone");
    return true;
}

function validatePw() {
    let value = pw.value;
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (value === "") {
        showError("password", "Password không được để trống");
        return false;
    }

    if (!regex.test(value)) {
        showError("password", "Ít nhất 8 ký tự gồm hoa, thường, số");
        return false;
    }

    clearError("password");
    return true;
}

function validateConfirmPw() {

    if (confirmPw.value === "") {
        showError("confirmPassword", "Vui lòng nhập lại mật khẩu");
        return false;
    }
    if (confirmPw.value !== pw.value) {
        showError("confirmPassword", "Mật khẩu không khớp");
        return false;
    }

    clearError("confirmPassword");
    return true;
}

function validateGender() {
    let gender = document.querySelector("input[name ='gender']:checked");

    if (!gender) {
        showError("gender", "Vui lòng chọn giới tính");
        return false;
    }

    clearError("gender");
    return true;
}


function validateTerms() {
    let terms = document.getElementById("terms");
    if (!terms.checked) {
        showError("terms", "Bạn phải đồng ý điều khoản");
        return false;
    }

    clearError("terms");
    return true;
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let valid = validateConfirmPw() & validateEmail() & validateGender() & validateName()
        & validatePhone() & validatePw() & validateTerms();

    if (valid) {
        form.style.display = "none";

        document.getElementById("successMessage").innerText = "Đăng ký thành công. Chào " + name.value;
    }
})

name.addEventListener("blur", validateName);
email.addEventListener("blur", validateEmail);
phone.addEventListener("blur", validatePhone);
pw.addEventListener("blur", validatePw);
confirmPw.addEventListener("blur", validateConfirmPw);

name.addEventListener("input", () => clearError("name"));
email.addEventListener("input", () => clearError("email"));
phone.addEventListener("input", () => clearError("phone"));
pw.addEventListener("input", () => clearError("password"));
confirmPw.addEventListener("input", () => clearError("confirmPassword"));

