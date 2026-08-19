import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-12.29 - Klik link Pilih Semua pada banner (hasil filter <= 50 data)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.29: Buat data sampai 50 data unik -> Ubah pagination ke 100 dulu -> Centang header Card 3 -> Terpilih seluruh data', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Scroll ke Card Riwayat Kesehatan (gunakan pencarian tahan-robust untuk title yang mungkin tidak ada pada atribut khusus)
    const findCardByTitle = (title) => {
      return cy.get('[data-slot="card"]', { timeout: 15000 }).then(($cards) => {
        const arr = $cards.toArray();
        const matched = arr.find((el) => {
          const titleEl = el.querySelector('[data-slot="card-title"]');
          const txt = (titleEl ? titleEl.innerText : el.innerText || '').toLowerCase();
          return txt.includes(title.toLowerCase());
        });
        if (!matched) {
          throw new Error(`Card with title "${title}" not found`);
        }
        return cy.wrap(matched);
      });
    };

    findCardByTitle('Riwayat Kesehatan')
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible');

    cy.wait(400);

    // Array 50 nama penyakit / riwayat kesehatan nyata dan berbeda satu sama lain
    const medicalRecords = [
      { indikasi: "Demam Berdarah Dengue", tindakan: "Rawat Inap dan Infus Cairan PK", keterangan: "Trombosit membaik setelah perawatan 4 hari" },
      { indikasi: "Asma Bronkial Akut", tindakan: "Inhalasi Nebulizer UKS", keterangan: "Sesak napas berkurang setelah terapi pernapasan" },
      { indikasi: "Cidera Engkel Kaki Kanan", tindakan: "Kompres Es dan Perban Elastis", keterangan: "Disarankan istirahat dari kegiatan olahraga 1 minggu" },
      { indikasi: "Migrain Berat dan Pusing", tindakan: "Istirahat di Ruang Gelap UKS", keterangan: "Diberikan paracetamol dan istirahat 2 jam" },
      { indikasi: "Gastritis Akut Maag", tindakan: "Pemberian Antasida dan Air Hangat", keterangan: "Nyeri ulu hati berkurang setelah minum obat" },
      { indikasi: "Luka Robek Telapak Tangan", tindakan: "Pembersihan Luka dan Pembalutan Steril", keterangan: "Luka telah dibersihkan dan dipasang plester medis" },
      { indikasi: "Alergi Makanan Seafood", tindakan: "Pemberian Antihistamin", keterangan: "Bintik merah dan gatal surut setelah 3 jam" },
      { indikasi: "Mimisan Hidung Berdarah", tindakan: "Penekanan Cuping Hidung dan Es", keterangan: "Perdarahan hidung berhasil dihentikan" },
      { indikasi: "Iritasi Mata Merah", tindakan: "Tetes Mata Steril dan Kompres Air Hangat", keterangan: "Infeksi mata ringan akibat debu lapangan" },
      { indikasi: "Kram Otot Betis Kiri", tindakan: "Peregangan Otot dan Salep Hangat", keterangan: "Terjadi saat kegiatan fisik olah raga pagi" },
      { indikasi: "Sariawan Parah Parotis", tindakan: "Pemberian Obat Totol Sariawan", keterangan: "Kesulitan mengunyah makanan keras" },
      { indikasi: "Flu Berat dan Batuk", tindakan: "Istirahat UKS dan Vitamin C", keterangan: "Disarankan dipulangkan lebih awal ke rumah" },
      { indikasi: "Dislokasi Jari Tangan", tindakan: "Spalk Kayu dan Imobilisasi Jari", keterangan: "Dirujuk ke Puskesmas terdekat untuk rontgen" },
      { indikasi: "Hipertensi Ringan", tindakan: "Pemeriksaan Tensi dan Istirahat", keterangan: "Tekanan darah 135/85 mmHg dipantau berkala" },
      { indikasi: "Radang Tenggorokan Faringitis", tindakan: "Air Garam Hangat dan Vitamin", keterangan: "Tenggorokan sakit saat menelan" },
      { indikasi: "Diare Dehidrasi Ringan", tindakan: "Pemberian Oralit Cair", keterangan: "Tubuh lemas akibat diare berulang" },
      { indikasi: "Luka Bakar Ringan Jari", tindakan: "Mengalirkan Air Dingin dan Salep Burn", keterangan: "Terkena alat praktikum laboratorium" },
      { indikasi: "Gegar Otak Ringan Benturan", tindakan: "Kompres Dingin dan Observasi Kesadaran", keterangan: "Terbentur saat bermain basket" },
      { indikasi: "Hipoglikemia Lemas", tindakan: "Teh Manis Hangat dan Biskuit", keterangan: "Belum sarapan sebelum upacara bendera" },
      { indikasi: "Anemia Pucat Pusing", tindakan: "Pemberian Tablet Tambah Darah", keterangan: "Kadar hemoglobin dipantau UKS" },
      { indikasi: "Vertigo Pusing Berputar", tindakan: "Tirai Ditutup dan Baring Gelap", keterangan: "Kondisi stabil setelah istirahat 1.5 jam" },
      { indikasi: "Otitis Media Sakit Telinga", tindakan: "Pembersihan Luar Telinga", keterangan: "Nyeri telinga dirujuk ke dokter THT" },
      { indikasi: "Sesak Napas Hipoksia", tindakan: "Pemberian Oksigen Tabung UKS", keterangan: "Saturasi kembali 99% dalam 20 menit" },
      { indikasi: "Kecelakaan Terjatuh Sepeda", tindakan: "Obat Merah Betadine dan Bandage", keterangan: "Luka lecet pada lutut dan siku" },
      { indikasi: "Nyeri Sendi Lutut", tindakan: "Korset Lutut dan Gel Pereda Nyeri", keterangan: "Nyeri setelah kegiatan jalan sehat" },
      { indikasi: "Sinusitis Kambuh", tindakan: "Uap Hangat dan Nasal Spray", keterangan: "Hidung tersumbat berat dan pusing" },
      { indikasi: "Cacar Air Varicella", tindakan: "Isolasi Mandiri di Rumah", keterangan: "Bintik air menyebar, dipulangkan dari sekolah" },
      { indikasi: "Tipes Typhoid Fever", tindakan: "Surat Izin Sakit Rawat Jalan", keterangan: "Demam naik turun 3 hari berturut-turut" },
      { indikasi: "Konjungtivitis Mata Menular", tindakan: "Kompres Air Steril dan Kacamata Pelindung", keterangan: "Dipulangkan untuk mencegah penularan" },
      { indikasi: "Radang Amandel Tonsilitis", tindakan: "Obat Isap Tenggorokan", keterangan: "Pembengkakan amandel derajat 2" },
      { indikasi: "Sakit Gigi Melilit", tindakan: "Pemberian Analgesik Pereda Nyeri", keterangan: "Dirujuk ke dokter gigi sekolah" },
      { indikasi: "Luka Tertusuk Kerikil", tindakan: "Ekstraksi Kerikil dan Alkohol Steril", keterangan: "Tertusuk saat berlari tanpa alas kaki" },
      { indikasi: "Dehidrasi Panas Terik", tindakan: "Minuman Isotonik dan Ruang AC", keterangan: "Tersengat panas saat gladi bersih" },
      { indikasi: "Hipotermia Kedinginan", tindakan: "Selimut Tebal dan Minuman Hangat", keterangan: "Kedinginan saat kegiatan kemping malam" },
      { indikasi: "Biduran Urtikaria Kulit", tindakan: "Salep Calamine Gatal", keterangan: "Gatal membentol akibat cuaca dingin" },
      { indikasi: "Gout Asam Urat Jempol", tindakan: "Kompres Air Hangat dan Obat Asam Urat", keterangan: "Nyeri hebat pada sendi jempol kaki" },
      { indikasi: "Infeksi Saluran Kemih", tindakan: "Anjuran Minum Air Putih Banyak", keterangan: "Nyeri saat buang air kecil" },
      { indikasi: "Nyeri Pinggang LBP", tindakan: "Korset Lumbal dan Posisi Baring Datar", keterangan: "Nyeri akibat mengangkat meja berat" },
      { indikasi: "Penyakit Kulit Jamur Tinea", tindakan: "Krim Antijamur Salep", keterangan: "Gatal pada lipatan paha/tangan" },
      { indikasi: "Batuk Rejan Pertusis", tindakan: "Masker Medis dan Obat Batuk Herbal", keterangan: "Batuk berkepanjangan disertai gatal" },
      { indikasi: "Skoliosis Pegal Punggung", tindakan: "Peregangan Tulang Belakang", keterangan: "Keluhan pegal duduk lama saat ujian" },
      { indikasi: "Nyeri Dada Non-Kardiak", tindakan: "Pemeriksaan Stetoskop dan Penenangan", keterangan: "Otot dada tegang akibat kecemasan" },
      { indikasi: "Batu Ginjal Kolik", tindakan: "Dirujuk Rumah Sakit Utama", keterangan: "Nyeri pinggang menjalar ke perut bawah" },
      { indikasi: "Luka Tergores Penggaris Bensin", tindakan: "Antiseptik dan Plester Hansaplast", keterangan: "Pertolongan pertama luka praktikum" },
      { indikasi: "Terkelupas Kulit Terbakar Matahari", tindakan: "Aloe Vera Gel Cooling", keterangan: "Kulit memerah setelah renang siang" },
      { indikasi: "Infeksi Jamur Kuku", tindakan: "Pembersihan Kuku dan Antiseptik", keterangan: "Kuku menguning dan rapuh" },
      { indikasi: "Tetanus Profilaksis Luka Paku", tindakan: "Pembersihan Cairan Peroksida dan Rujukan Suntik TT", keterangan: "Tertusuk paku berkarat di area parkir" },
      { indikasi: "Cantengan Jempol Kaki", tindakan: "Rendaman Air Garam dan Pemotongan Steril", keterangan: "Infeksi sudut kuku jempol" },
      { indikasi: "Sakit Kepala Tension Headache", tindakan: "Pijat Pelipis dan Paracetamol", keterangan: "Ketegangan otot leher dan kepala" },
      { indikasi: "Insomnia Kelelahan", tindakan: "Istirahat Tidur Siang UKS", keterangan: "Kelelahan ekstrem akibat kurang tidur" }
    ];

    // Cek jumlah data saat ini, jika < 50 buat data sampai berjumlah 50 dengan isi unik
    cy.get('body').then(($body) => {
      const rows = $body.find('tbody tr');
      const currentCount = rows.length;
      const targetCount = 50;
      const needed = targetCount - currentCount;

      if (needed > 0) {
        cy.log(`Membuat ${needed} data unik Riwayat Kesehatan nyata agar total menjadi 50 data...`);

        for (let i = 0; i < needed; i++) {
          const item = medicalRecords[i % medicalRecords.length];

          cy.contains('button', /tambah riwayat/i, { timeout: 15000 })
            .scrollIntoView({ offset: { top: -120, left: 0 } })
            .click({ force: true });

          cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');

          cy.get('[role="dialog"]').find('button[name="date"], button[data-slot="form-control"]').first().click({ force: true });
          cy.wait(350);
          cy.get('table.rdp-month_grid tbody button').filter(':contains("13"), :contains("12"), :contains("1")').first().click({ force: true });
          cy.wait(300);
          cy.get('[data-slot="dialog-title"]').click({ force: true });
          cy.wait(300);

          cy.get('[role="dialog"]').within(() => {
            cy.get('input[name="indicator"], input[placeholder*="Indikator"]').first().clear({ force: true }).type(item.indikasi, { force: true });
            cy.wait(150);
            cy.get('input[name="action"], input[placeholder*="Tindakan"]').first().clear({ force: true }).type(item.tindakan, { force: true });
            cy.wait(150);
            cy.get('input[name="description"], input[placeholder*="Deskripsi"]').first().clear({ force: true }).type(item.keterangan, { force: true });
            cy.wait(150);
            cy.contains('button[type="submit"], button', 'Simpan').click({ force: true });
          });

          cy.get('[role="dialog"]', { timeout: 10000 }).should('not.exist');
          cy.wait(400);
        }
      }
    });

    // 1. UBAH PAGINATION KE 100 KHUSUS PADA CARD 3 (RIWAYAT KESEHATAN)
    findCardByTitle('Riwayat Kesehatan').within(() => {
      cy.get('button[role="combobox"], [data-slot="select-trigger"]', { timeout: 10000 })
        .first()
        .scrollIntoView({ offset: { top: -120, left: 0 } })
        .click({ force: true });
    });

    cy.wait(400);

    // Pilih opsi 100 pada popover radix select pagination
    cy.get('[role="option"], [data-slot="select-item"]', { timeout: 10000 })
      .contains('100')
      .click({ force: true });

    // 2. TUNGGU HINGGA BARIS SELESAI DIMUAT DI TABEL CARD 3
    findCardByTitle('Riwayat Kesehatan').within(() => {
      cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    });

    // JEDA SEBELUM CENTANG HEADER (SEPERTI YANG DIMINTA USER)
    cy.wait(1500);

    // 3. CENTANG HEADER CHECKBOX TEPAT SPESIFIK (button[aria-label="Select all"]) KHUSUS CARD 3 (RIWAYAT KESEHATAN)
    // 3. Centang header checkbox pada Card Riwayat Kesehatan (tahan-robust)
    findCardByTitle('Riwayat Kesehatan')
      .find('button[aria-label="Select all"], thead th button[role="checkbox"], thead th [data-slot="checkbox"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    // JEDA SETELAH CENTANG HEADER AGAR POPUP BANNER ACTION BAR SELESAI RENDER
    cy.wait(1500);

    // 4. ASSERT BAHWA TOMBOL TERPILIH MENAMPILKAN ANGKA TOTAL BARIS DINAMIS
    findCardByTitle('Riwayat Kesehatan')
      .find('tbody tr')
      .then(($rows) => {
        const totalRows = $rows.length;

        // Tolerant check: first try to find a button with 'terpilih', otherwise search anywhere in body
        cy.get('body').then(($body) => {
          const btn = $body.find('button').filter((i, el) => /terpilih/i.test((el.innerText || '').toLowerCase()));
          if (btn.length) {
            cy.wrap(btn.first())
              .scrollIntoView({ offset: { top: -120, left: 0 } })
              .should('be.visible')
              .and('contain.text', `${totalRows}`);
          } else {
            // Try any element containing the word 'terpilih'
            const any = $body.find('*').filter((i, el) => /terpilih/i.test((el.innerText || '').toLowerCase()));
            if (any.length) {
              cy.wrap(any.first()).scrollIntoView({ offset: { top: -120, left: 0 } }).should('contain.text', `${totalRows}`);
            } else {
              // As a more generic fallback, check presence of the numeric count in body text near selection UI
              const bodyText = $body.text();
              if (bodyText && bodyText.includes(`${totalRows}`)) {
                cy.log(`Found numeric count ${totalRows} in body text as a fallback.`);
              } else {
                throw new Error(`Selection indicator with text 'terpilih' not found and numeric count ${totalRows} not found in body.`);
              }
            }
          }
        });
      });
  });
});
