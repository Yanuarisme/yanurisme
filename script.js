let studentCount = 0;

// Fungsi untuk menambahkan mahasiswa ke tabel absensi
function addStudent() {
    const nameInput = document.getElementById('studentName');
    const studentName = nameInput.value.trim();
    
    if (studentName === "") {
        alert("Nama mahasiswa tidak boleh kosong!");
        return;
    }

    studentCount++;

    const tableBody = document.querySelector("#attendanceTable tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${studentCount}</td>
        <td>${studentName}</td>
        <td><input type="radio" name="status${studentCount}" value="H"></td>
        <td><input type="radio" name="status${studentCount}" value="A"></td>
        <td><input type="radio" name="status${studentCount}" value="S"></td>
        <td><input type="radio" name="status${studentCount}" value="I"></td>
    `;
    tableBody.appendChild(row);
    nameInput.value = "";  // Kosongkan input setelah menambah
}

// Fungsi untuk generate PDF
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Rekap Absensi Santri", 14, 22);

    let xPos = 14;
    let yPos = 30;

    const table = document.getElementById("attendanceTable");
    const rows = table.getElementsByTagName("tr");

    // Looping setiap baris tabel
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        const cols = row.getElementsByTagName("td");
        const text = [];

        // Looping setiap kolom dalam baris
        for (let j = 0; j < cols.length; j++) {
            if (j === 0 || j === 1) {
                // Ambil nomor dan nama mahasiswa
                text.push(cols[j].innerText);
            } else {
                const input = cols[j].querySelector('input:checked');
                if (input) {
                    text.push(input.value);
                } else {
                    text.push(''); // Tambahkan kosong jika tidak ada status yang dipilih
                }
            }
        }

        // Gabungkan teks dan tambahkan ke PDF
        if (text.length > 0) {
            doc.text(text.join('  |  '), xPos, yPos);
            yPos += 10;
        }
    }

    doc.save("absensi_mahasiswa.pdf");
}

// Tambahkan event listener ke tombol "Tambah Mahasiswa"
document.getElementById("addStudentBtn").addEventListener("click", addStudent);

// Tambahkan event listener ke tombol "Cetak PDF"
document.getElementById("generatePdfBtn").addEventListener("click", generatePDF);
