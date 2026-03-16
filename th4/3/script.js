const steps = document.querySelectorAll(".step")
const progressBar = document.getElementById("progressBar")

let currentStep = 0

const nameInput = document.getElementById("name")
const dob = document.getElementById("dob")
const email = document.getElementById("email")
const pw = document.getElementById("password")
const confirmPw = document.getElementById("confirmPassword")

function showStep(index) {

    steps.forEach(step => step.classList.remove("active"))
    steps[index].classList.add("active")

    progressBar.style.width = ((index + 1) / steps.length) * 100 + "%"

}

function showError(id, msg) {
    document.getElementById(id).innerText = msg
}

function clearError(id) {
    document.getElementById(id).innerText = ""
}

function validateName() {

    let value = nameInput.value.trim()

    if (value.length < 3) {
        showError("nameError", "Tên ít nhất 3 ký tự")
        return false
    }

    clearError("nameError")
    return true
}

function validateDob() {

    if (!dob.value) {
        showError("dobError", "Chọn ngày sinh")
        return false
    }

    clearError("dobError")
    return true
}

function validateGender() {

    let gender = document.querySelector("input[name='gender']:checked")

    if (!gender) {
        showError("genderError", "Chọn giới tính")
        return false
    }

    clearError("genderError")
    return true
}

function validateEmail() {

    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!regex.test(email.value)) {
        showError("emailError", "Email không hợp lệ")
        return false
    }

    clearError("emailError")
    return true
}

function validatePassword() {

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

    if (!regex.test(pw.value)) {
        showError("passwordError", "Password ≥8 ký tự gồm hoa thường số")
        return false
    }

    clearError("passwordError")
    return true
}

function validateConfirm() {

    if (confirmPw.value !== pw.value) {
        showError("confirmPasswordError", "Mật khẩu không khớp")
        return false
    }

    clearError("confirmPasswordError")
    return true
}

document.getElementById("next1").onclick = () => {

    let valid = validateName() & validateDob() & validateGender()

    if (valid) {
        currentStep = 1
        showStep(currentStep)
    }

}

document.getElementById("next2").onclick = () => {

    let valid = validateEmail() & validatePassword() & validateConfirm()

    if (valid) {

        let gender = document.querySelector("input[name='gender']:checked").value

        document.getElementById("summary").innerHTML = `
Họ tên: ${nameInput.value} <br>
Ngày sinh: ${dob.value} <br>
Giới tính: ${gender} <br>
Email: ${email.value}
`

        currentStep = 2
        showStep(currentStep)

    }

}

document.getElementById("back1").onclick = () => {

    currentStep = 0
    showStep(currentStep)

}

document.getElementById("back2").onclick = () => {

    currentStep = 1
    showStep(currentStep)

}

document.getElementById("form").addEventListener("submit", (e) => {

    e.preventDefault()

    document.getElementById("success").innerText = "Đăng ký thành công 🎉"
    document.getElementById("form").style.display = "none"

})

showStep(currentStep)