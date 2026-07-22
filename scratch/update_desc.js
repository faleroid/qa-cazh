const fs = require('fs');

const descriptions = {
  1: "PGT-17.1 Isi form Tambah Kategori Inventaris dengan data valid (pilih Instansi + isi Nama Kategori) -> klik Simpan",
  2: "PGT-17.2 Klik btn 'Tambah Kategori Inventaris' di halaman list",
  3: "PGT-17.3 Cek placeholder field Instansi",
  4: "PGT-17.4 Cek placeholder field Nama Kategori",
  5: "PGT-17.5 Isi form -> klik btn Batal/Cancel",
  6: "PGT-17.6 Kosongkan Instansi (Nama Kategori terisi) -> klik Simpan",
  7: "PGT-17.7 Pilih Instansi tapi kosongkan Nama Kategori -> klik Simpan",
  8: "PGT-17.8 Klik Simpan tanpa isi field apapun",
  9: "PGT-17.9 Buka dropdown Instansi",
  10: "PGT-17.10 Load halaman list Kategori Inventaris",
  11: "PGT-17.11 Cek Aksi di setiap row",
  12: "PGT-17.12 Cek format kolom Tanggal Dibuat",
  13: "PGT-17.13 Buka halaman list Kategori Inventaris saat belum ada data",
  14: "PGT-17.14 Tambah beberapa kategori -> reload halaman",
  15: "PGT-17.15 Klik sort arrow icon di header kolom (misal Nama Kategori) 1x",
  16: "PGT-17.16 Klik sort arrow icon di kolom yang sudah ascending -> 2x lagi (total 2 klik)",
  17: "PGT-17.17 Klik sort arrow icon 3x di 1 kolom",
  18: "PGT-17.18 Aktifkan sort di kolom A (ascending/descending) -> klik sort arrow di kolom B",
  19: "PGT-17.19 Cek default value Pagination Page Size Selector",
  20: "PGT-17.20 Klik dropdown Pagination Page Size Selector",
  21: "PGT-17.21 Ganti page size dari 10 ke 50/100/500/1000 (test salah satu, misal 50)",
  22: "PGT-17.22 Cek placeholder + icon di Search input field",
  23: "PGT-17.23 Klik Search input field",
  24: "PGT-17.24 Ketik keyword yang match dengan Nama Kategori existing",
  25: "PGT-17.25 Ketik keyword yang tidak match ('xyz123abc')",
  26: "PGT-17.26 Klik btn 'Filter' di halaman list",
  27: "PGT-17.27 Buka dropdown Instansi di filter -> pilih 1 instansi -> klik btn 'Terapkan'",
  28: "PGT-17.28 Klik btn 'Bersihkan' di samping filter aktif",
  29: "PGT-17.29 Buka dropdown filter -> klik area page di luar dropdown",
  30: "PGT-17.30 Buka dropdown filter -> klik btn 'Terapkan' TANPA pilih instansi",
  31: "PGT-17.31 Klik icon Edit di row kategori inventaris",
  32: "PGT-17.32 Ubah Nama Kategori -> klik Simpan",
  33: "PGT-17.33 Ubah Instansi di popup Edit (pilih instansi lain) -> klik Simpan",
  34: "PGT-17.34 Ubah field di popup Edit -> klik btn Batal",
  35: "PGT-17.35 Kosongkan Nama Kategori di Edit -> klik Simpan",
  36: "PGT-17.36 Kosongkan Instansi di Edit (uncheck dropdown selection) -> klik Simpan",
  37: "PGT-17.37 Klik icon Hapus di row kategori inventaris",
  38: "PGT-17.38 Cek styling btn Hapus di popup",
  39: "PGT-17.39 Klik btn 'Hapus' di popup",
  40: "PGT-17.40 Klik icon Close (X) di pojok kanan atas popup Hapus",
  41: "PGT-17.41 Buka popup Hapus -> tekan Esc di keyboard",
  42: "PGT-17.42 Search sampai hasil tinggal 1 row -> hapus row tersebut"
};

let content = fs.readFileSync('scratch/generate_pgt17_specs.js', 'utf8');

for (let i = 1; i <= 42; i++) {
  const regex = new RegExp(`it\\('PGT-17\\.${i}: .*?', \\(\\) => \\{`, 'g');
  const newText = `it('${descriptions[i]}', () => {`;
  content = content.replace(regex, newText);
}

fs.writeFileSync('scratch/generate_pgt17_specs.js', content);
console.log("Replaced successfully");
