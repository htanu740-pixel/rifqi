// Daftar 25 siswa kelas X TKJ
const siswa = [
  "Ahmad Fadhil ibnu taufiqi", "Adib husen Al-fahrezi", "Ahmad vauzan", "Ahmad fauzi", "Muhammad arif rizqullah",
  "Januarta dwi prayoga astu", "Satria prabowo", "Muhammad rifqi pratama nugroho", "Muhammad hasidi", "UMar nur sa'bani",
  "MUhammad ilzam munir", "Muhammad reza", "Muhammad wahyu ridho", "Muhammad ridho ilahi", "Muhammad fahril maula",
  "Setia agung wibrata", "Muhammad ramadhani pedrosa", "Regina purti", "Putri nur syafira", "Dwi shinta mukarromah",
  "Maula dwi wahyuni", "Inke fatmasari", "Alfia", "shifa nuril", "Aira putri tungga dewi",
];

// Elemen HTML
const absensiBody = document.getElementById("absensiBody");
const tanggalEl = document.getElementById("tanggal");
const rekapBtn = document.getElementById("rekapBtn");
const rekapContainer = document.getElementById("rekapContainer");

// Tampilkan tanggal hari ini
tanggalEl.textContent = new Date().toLocaleDateString("id-ID");

// Isi tabel siswa
siswa.forEach((nama, index) => {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td>${index + 1}</td>
    <td>${nama}</td>
    <td>
      <select id="status-${index}">
        <option value="Hadir">Hadir</option>
        <option value="Izin">Izin</option>
        <option value="Sakit">Sakit</option>
        <option value="Alpha">Alpha</option>
      </select>
    </td>
  `;
  absensiBody.appendChild(tr);
});

// Fungsi untuk rekap absensi
rekapBtn.addEventListener("click", () => {
  let hadir = 0, izin = 0, sakit = 0, alpha = 0;

  siswa.forEach((_, i) => {
    const status = document.getElementById(`status-${i}`).value;
    if (status === "Hadir") hadir++;
    else if (status === "Izin") izin++;
    else if (status === "Sakit") sakit++;
    else alpha++;
  });

  const rekapHTML = `
    <h3>Rekap Absensi Tanggal ${new Date().toLocaleDateString("id-ID")}</h3>
    <table>
      <tr><th>Keterangan</th><th>Jumlah</th></tr>
      <tr><td>Hadir</td><td>${hadir}</td></tr>
      <tr><td>Izin</td><td>${izin}</td></tr>
      <tr><td>Sakit</td><td>${sakit}</td></tr>
      <tr><td>Alpha</td><td>${alpha}</td></tr>
    </table>
  `;

  rekapContainer.innerHTML = rekapHTML;
});
