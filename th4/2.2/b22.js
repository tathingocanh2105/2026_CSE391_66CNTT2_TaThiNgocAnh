const form = document.getElementById("orderForm")

const product = document.getElementById("product")
const quantity = document.getElementById("quantity")
const date = document.getElementById("deliveryDate")
const address = document.getElementById("address")
const note = document.getElementById("note")

const total = document.getElementById("total")
const noteCount = document.getElementById("noteCount")

const prices = {
    ao: 150000,
    quan: 200000,
    giay: 300000
}

function showError(id, msg) {
    document.getElementById(id).innerText = msg
}

function clearError(id) {
    document.getElementById(id).innerText = ""
}

function validateProduct() {

    if (product.value === "") {
        showError("productError", "Vui lòng chọn sản phẩm")
        return false
    }

    clearError("productError")
    return true
}

function validateQuantity() {

    let value = Number(quantity.value)

    if (!Number.isInteger(value) || value < 1 || value > 99) {
        showError("quantityError", "Số lượng từ 1-99")
        return false
    }

    clearError("quantityError")
    return true
}

function validateDate() {

    let today = new Date()
    let selected = new Date(date.value)

    let maxDate = new Date()
    maxDate.setDate(today.getDate() + 30)

    today.setHours(0, 0, 0, 0)

    if (!date.value) {
        showError("dateError", "Chọn ngày giao")
        return false
    }

    if (selected < today) {
        showError("dateError", "Không chọn ngày quá khứ")
        return false
    }

    if (selected > maxDate) {
        showError("dateError", "Không quá 30 ngày")
        return false
    }

    clearError("dateError")
    return true
}

function validateAddress() {

    let value = address.value.trim()

    if (value.length < 10) {
        showError("addressError", "Địa chỉ ít nhất 10 ký tự")
        return false
    }

    clearError("addressError")
    return true
}

function validateNote() {

    if (note.value.length > 200) {
        showError("noteError", "Không quá 200 ký tự")
        return false
    }

    clearError("noteError")
    return true
}

function validatePayment() {

    let pay = document.querySelector("input[name='payment']:checked")

    if (!pay) {
        showError("paymentError", "Chọn phương thức thanh toán")
        return false
    }

    clearError("paymentError")
    return true
}

function updateTotal() {

    let price = prices[product.value] || 0
    let qty = Number(quantity.value) || 0

    let sum = price * qty

    total.innerText = sum.toLocaleString("vi-VN")
}

product.addEventListener("change", updateTotal)
quantity.addEventListener("input", updateTotal)

note.addEventListener("input", () => {

    let length = note.value.length

    noteCount.innerText = length + "/200"

    if (length > 200) {
        noteCount.style.color = "red"
    } else {
        noteCount.style.color = "black"
    }

})

form.addEventListener("submit", (e) => {

    e.preventDefault()

    let valid = validateProduct()
        & validateQuantity()
        & validateDate()
        & validateAddress()
        & validateNote()
        & validatePayment()

    if (valid) {
        showConfirm()
    }

})

function showConfirm() {

    let box = document.getElementById("confirmBox")

    let price = prices[product.value]
    let qty = quantity.value

    box.innerHTML = `
<h3>Xác nhận đơn hàng</h3>
Sản phẩm: ${product.options[product.selectedIndex].text}<br>
Số lượng: ${qty}<br>
Tổng tiền: ${(price * qty).toLocaleString("vi-VN")} đ<br>
Ngày giao: ${date.value}<br><br>

<button onclick="confirmOrder()">Xác nhận</button>
<button onclick="cancelOrder()">Hủy</button>
`

    box.style.display = "block"
}

function confirmOrder() {

    document.getElementById("success").innerText = "Đặt hàng thành công 🎉"
    document.getElementById("confirmBox").style.display = "none"
    form.style.display = "none"

}

function cancelOrder() {

    document.getElementById("confirmBox").style.display = "none"

}