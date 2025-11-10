// === Data siswa ===
const namaSiswa = [
 "Ahmad Fadhil ibnu taufiqi", "Adib husen Al-fahrezi", "Ahmad vauzan", "Ahmad fauzi", "Muhammad arif rizqullah",
  "Januarta dwi prayoga astu", "Satria prabowo", "Muhammad rifqi pratama nugroho", "Muhammad hasidi", "UMar nur sa'bani",
  "MUhammad ilzam munir", "Muhammad reza", "Muhammad wahyu ridho", "Muhammad ridho ilahi", "Muhammad fahril maula",
  "Setia agung wibrata", "Muhammad ramadhani pedrosa", "Regina purti", "Putri nur syafira", "Dwi shinta mukarromah",
  "Maula dwi wahyuni", "Inke fatmasari", "Alfia", "shifa nuril", "Aira putri tungga dewi",
];

// === Elemen HTML ===
const namaSelect = document.getElementById("nama");
const tanggalInput = document.getElementById("tanggal");
const statusInput = document.getElementById("status");
const tambahBtn = document.getElementById("tambahBtn");
const tabelBody = document.getElementById("tabelBody");
const tampilRekap = document.getElementById("tampilRekap");
const rekapContainer = document.getElementById("rekapContainer");

// === Isi dropdown nama ===
namaSiswa.forEach(n => {
  const opt = document.createElement("option");
  opt.value = n;
  opt.textContent = n;
  namaSelect.appendChild(opt);
});

// === Data localStorage ===
let dataAbsensi = JSON.parse(localStorage.getItem("dataAbsensi")) || [];

tampilkanTabel();

// === Tambah Data ===
tambahBtn.addEventListener("click", () => {
  const tanggal = tanggalInput.value;
  const nama = namaSelect.value;
  const status = statusInput.value;

  if (!tanggal || !nama) {
    alert("⚠️ Mohon isi semua kolom!");
    return;
  }

  dataAbsensi.push({ tanggal, nama, status });
  localStorage.setItem("dataAbsensi", JSON.stringify(dataAbsensi));
  tampilkanTabel();
  tanggalInput.value = "";
});

// === Hapus Data ===
function hapusData(index) {
  if (confirm("Yakin ingin menghapus data ini?")) {
    dataAbsensi.splice(index, 1);
    localStorage.setItem("dataAbsensi", JSON.stringify(dataAbsensi));
    tampilkanTabel();
  }
}

// === Tampilkan Daftar ===
function tampilkanTabel() {
  tabelBody.innerHTML = "";

  if (dataAbsensi.length === 0) {
    tabelBody.innerHTML = `<tr><td colspan="5">Belum ada data absensi.</td></tr>`;
    return;
  }

  dataAbsensi.forEach((d, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${d.tanggal}</td>
      <td>${d.nama}</td>
      <td>${d.status}</td>
      <td><button onclick="hapusData(${i})">🗑️</button></td>
    `;
    tabelBody.appendChild(tr);
  });
}

// === Rekap Bulanan ===
tampilRekap.addEventListener("click", () => {
  const bulan = document.getElementById("bulan").value;
  if (!bulan) {
    alert("Pilih bulan terlebih dahulu!");
    return;
  }

  const dataBulan = dataAbsensi.filter(d => d.tanggal.startsWith(bulan));
  if (dataBulan.length === 0) {
    rekapContainer.innerHTML = "<p>Tidak ada absensi pada bulan ini.</p>";
    return;
  }

  const hasil = {};
  namaSiswa.forEach(n => hasil[n] = { Hadir: 0, Izin: 0, Sakit: 0, Alpa: 0 });

  dataBulan.forEach(d => hasil[d.nama][d.status]++);

  let html = `
    <h3>📊 Rekap Bulan ${bulan}</h3>
    <table>
      <tr>
        <th>No</th><th>Nama</th><th>Hadir</th><th>Izin</th><th>Sakit</th><th>Alpa</th>
      </tr>
  `;
  namaSiswa.forEach((n, i) => {
    const r = hasil[n];
    html += `
      <tr>
        <td>${i + 1}</td>
        <td>${n}</td>
        <td>${r.Hadir}</td>
        <td>${r.Izin}</td>
        <td>${r.Sakit}</td>
        <td>${r.Alpa}</td>
      </tr>`;
  });
  html += "</table>";
  rekapContainer.innerHTML = html;
});
