let sinhVien = JSON.parse(localStorage.getItem("sinhVien")) || []
let filteredStudents = [...sinhVien]
let sortDirection = 1

const name = document.getElementById('name')
const mark = document.getElementById("mark")
const addBtn = document.getElementById("add")
const tablebd = document.getElementById("tablebd")
const thongke = document.getElementById("thongke")

const search = document.getElementById("search")
const filterRank = document.getElementById("filterRank")
const sortMark = document.getElementById("sortMark")

const getRank = (mark) => {
    if (mark >= 8.5) return "Giỏi"
    if (mark >= 7.0) return "Khá"
    if (mark >= 5) return "Trung bình"
    return "Yếu"
}
const renderTable = () => {
    tablebd.innerHTML = ""
    if (filteredStudents.length === 0) {
        tablebd.innerHTML = `
        <tr>
            <td colspan="5">Không có kết quả</td>
        </tr>
    `
        return
    }
    let tong = 0
    filteredStudents.forEach((sv, index) => {
        tong += sv.mark
        const rank = getRank(sv.mark)
        const tr = document.createElement("tr")
        if (sv.mark < 5) {
            tr.classList.add("low-mark")
        }

        tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${sv.name}</td>
        <td>${sv.mark}</td>
        <td>${rank}</td>
        <td> 
            <button data-index="${index}">
            Xóa
            </button>
        </td>
        `
        tablebd.appendChild(tr)
    })
    const tb = filteredStudents.length ? (tong / filteredStudents.length).toFixed(2) : 0
    thongke.innerHTML = ` 
    Tổng sinh viên: ${filteredStudents.length}
    <br>
    Điểm trung bình: ${tb}
    `
}

const addSV = () => {
    const n = name.value.trim()
    const m = Number(mark.value)
    if (n === "") {
        alert("Họ tên không được để trống")
        return
    }
    if (isNaN(m) || m < 0 || m > 10) {
        alert("0<= điểm<=10")
        return
    }
    sinhVien.push({
        name: n,
        mark: m
    })
    localStorage.setItem("sinhVien", JSON.stringify(sinhVien))
    applyFilters()
    name.value = ""
    mark.value = ""
    name.focus()
}

const applyFilters = () => {
    const keyword = search.value.toLowerCase()
    const rankFilter = filterRank.value

    filteredStudents = sinhVien.filter(sv => {
        const matchName = sv.name.toLowerCase().includes(keyword)
        const rank = getRank(sv.mark)
        const matchRank = rankFilter === "all" || rank.trim() === rankFilter
        return matchName && matchRank
    })

    filteredStudents.sort((a, b) => {
        return sortDirection * (a.mark - b.mark)
    })

    renderTable()
}

tablebd.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        const index = e.target.dataset.index
        const sv = filteredStudents[index]
        const realIndex = sinhVien.indexOf(sv)
        sinhVien.splice(realIndex, 1)
        localStorage.setItem("sinhVien", JSON.stringify(sinhVien))
        applyFilters()
    }
})
addBtn.addEventListener("click", addSV)
mark.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault()
        addSV()
    }
})

search.addEventListener("input", applyFilters)
filterRank.addEventListener("change", applyFilters)

sortMark.addEventListener("click", () => {
    sortDirection *= -1
    sortMark.innerHTML = "Điểm " + (sortDirection === 1 ? "▲" : "▼")

    applyFilters()
})

applyFilters()