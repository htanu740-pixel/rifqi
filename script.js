// Daftar siswa
const siswa = [
 "Ahmad Fadhil ibnu taufiqi", "Adib husen Al-fahrezi", "Ahmad vauzan", "Ahmad fauzi", "Muhammad arif rizqullah",
  "Januarta dwi prayoga astu", "Satria prabowo", "Muhammad rifqi pratama nugroho", "Muhammad hasidi", "UMar nur sa'bani",
  "MUhammad ilzam munir", "Muhammad reza", "Muhammad wahyu ridho", "Muhammad ridho ilahi", "Muhammad fahril maula",
  "Setia agung wibrata", "Muhammad ramadhani pedrosa", "Regina purti", "Putri nur syafira", "Dwi shinta mukarromah",
  "Maula dwi wahyuni", "Inke fatmasari", "Alfia", "shifa nuril", "Aira putri tungga dewi",

];

const absensiBody = document.getElementById("absensiBody");
const absensiTable = document.getElementById("absensiTable");
const simpanBtn = document.getElementById("simpanBtn");
const rekapContainer = document.getElementById("rekapContainer");
const loadTableBtn = document.getElementById("loadTable");
const tanggalInput = document.getElementById("tanggal");
const tampilRekapBtn = document.getElementById("tampilRekap");

// Muat tabel siswa untuk tanggal tertentu
loadTableBtn.addEventListener("click", () => {
  const tanggal = tanggalInput.value;
  if (!tanggal) {
    alert("Pilih tanggal terlebih dahulu!");
    return;
  }

  absensiBody.innerHTML = "";
  siswa.forEach((nama, i) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${nama}</td>
      <td>
        <select id="status-${i}">
          <option value="Hadir">Hadir</option>
          <option value="Izin">Izin</option>
          <option value="Sakit">Sakit</option>
          <option value="Alpha">Alpha</option>
        </select>
      </td>
    `;
    absensiBody.appendChild(tr);
  });

  absensiTable.classList.remove("hidden");
  simpanBtn.classList.remove("hidden");
});

// Simpan absensi ke localStorage
simpanBtn.addEventListener("click", () => {
  const tanggal = tanggalInput.value;
  if (!tanggal) {
    alert("Isi tanggal terlebih dahulu!");
    return;
  }

  const dataAbsensi = siswa.map((nama, i) => ({
    nama,
    status: document.getElementById(`status-${i}`).value
  }));

  let semuaData = JSON.parse(localStorage.getItem("absensi")) || {};
  semuaData[tanggal] = dataAbsensi;
  localStorage.setItem("absensi", JSON.stringify(semuaData));

  alert("Data absensi berhasil disimpan!");
});

// Tampilkan rekap per bulan
tampilRekapBtn.addEventListener("click", () => {
  const bulan = document.getElementById("bulan").value;
  if (!bulan) {
    alert("Pilih bulan terlebih dahulu!");
    return;
  }

  const semuaData = JSON.parse(localStorage.getItem("absensi")) || {};
  const dataBulan = Object.entries(semuaData)
    .filter(([tanggal]) => tanggal.startsWith(bulan))
    .map(([tanggal, data]) => ({ tanggal, data }));

  if (dataBulan.length === 0) {
    rekapContainer.innerHTML = "<p>Tidak ada data untuk bulan ini.</p>";
    return;
  }

  let total = { Hadir: 0, Izin: 0, Sakit: 0, Alpha: 0 };

  dataBulan.forEach(({ data }) => {
    data.forEach(s => total[s.status]++);
  });

  const totalHari = dataBulan.length;
  const rekapHTML = `
    <h3>Rekap Bulan ${bulan}</h3>
    <p>Jumlah Hari Dicatat: ${totalHari}</p>
    <table>
      <tr><th>Keterangan</th><th>Jumlah</th></tr>
      <tr><td>Hadir</td><td>${total.Hadir}</td></tr>
      <tr><td>Izin</td><td>${total.Izin}</td></tr>
      <tr><td>Sakit</td><td>${total.Sakit}</td></tr>
      <tr><td>Alpha</td><td>${total.Alpha}</td></tr>
    </table>
  `;

  rekapContainer.innerHTML = rekapHTML;
});
