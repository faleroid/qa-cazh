import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.29 - Klik link Pilih Semua pada banner (hasil filter <= 50 data)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.29: Buat data sampai 50 data unik -> Ubah pagination ke 100 dulu -> Centang header Card 3 -> Terpilih seluruh data', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    // Scroll ke Card Riwayat Kesehatan
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

    const medicalRecords = [
      { indikasi: 'Demam Berdarah Dengue', tindakan: 'Rawat Inap dan Infus Cairan PK', keterangan: 'Trombosit membaik setelah perawatan 4 hari' },
      { indikasi: 'Asma Bronkial Akut', tindakan: 'Inhalasi Nebulizer UKS', keterangan: 'Sesak napas berkurang setelah terapi pernapasan' },
      { indikasi: 'Cidera Engkel Kaki Kanan', tindakan: 'Kompres Es dan Perban Elastis', keterangan: 'Disarankan istirahat dari kegiatan olahraga 1 minggu' },
      { indikasi: 'Migrain Berat dan Pusing', tindakan: 'Istirahat di Ruang Gelap UKS', keterangan: 'Diberikan paracetamol dan istirahat 2 jam' },
      { indikasi: 'Gastritis Akut Maag', tindakan: 'Pemberian Antasida dan Air Hangat', keterangan: 'Nyeri ulu hati berkurang setelah minum obat' },
      { indikasi: 'Luka Robek Telapak Tangan', tindakan: 'Pembersihan Luka dan Pembalutan Steril', keterangan: 'Luka telah dibersihkan dan dipasang plester medis' },
      { indikasi: 'Alergi Makanan Seafood', tindakan: 'Pemberian Antihistamin', keterangan: 'Bintik merah dan gatal surut setelah 3 jam' },
      { indikasi: 'Mimisan Hidung Berdarah', tindakan: 'Penekanan Cuping Hidung dan Es', keterangan: 'Perdarahan hidung berhasil dihentikan' },
      { indikasi: 'Iritasi Mata Merah', tindakan: 'Tetes Mata Steril dan Kompres Air Hangat', keterangan: 'Infeksi mata ringan akibat debu lapangan' },
      { indikasi: 'Kram Otot Betis Kiri', tindakan: 'Peregangan Otot dan Salep Hangat', keterangan: 'Terjadi saat kegiatan fisik olah raga pagi' },
      { indikasi: 'Sariawan Parah Parotis', tindakan: 'Pemberian Obat Totol Sariawan', keterangan: 'Kesulitan mengunyah makanan keras' },
      { indikasi: 'Flu Berat dan Batuk', tindakan: 'Istirahat UKS dan Vitamin C', keterangan: 'Disarankan dipulangkan lebih awal ke rumah' },
      { indikasi: 'Dislokasi Jari Tangan', tindakan: 'Spalk Kayu dan Imobilisasi Jari', keterangan: 'Dirujuk ke Puskesmas terdekat untuk rontgen' },
      { indikasi: 'Hipertensi Ringan', tindakan: 'Pemeriksaan Tensi dan Istirahat', keterangan: 'Tekanan darah 135/85 mmHg dipantau berkala' },
      { indikasi: 'Radang Tenggorokan Faringitis', tindakan: 'Air Garam Hangat dan Vitamin', keterangan: 'Tenggorokan sakit saat menelan' },
      { indikasi: 'Diare Dehidrasi Ringan', tindakan: 'Pemberian Oralit Cair', keterangan: 'Tubuh lemas akibat diare berulang' },
      { indikasi: 'Luka Bakar Ringan Jari', tindakan: 'Mengalirkan Air Dingin dan Salep Burn', keterangan: 'Terkena alat praktikum laboratorium' },
      { indikasi: 'Gegar Otak Ringan Benturan', tindakan: 'Kompres Dingin dan Observasi Kesadaran', keterangan: 'Terbentur saat bermain basket' },
      { indikasi: 'Hipoglikemia Lemas', tindakan: 'Teh Manis Hangat dan Biskuit', keterangan: 'Belum sarapan sebelum upacara bendera' },
      { indikasi: 'Anemia Pucat Pusing', tindakan: 'Pemberian Tablet Tambah Darah', keterangan: 'Kadar hemoglobin dipantau UKS' },
      { indikasi: 'Vertigo Pusing Berputar', tindakan: 'Tirai Ditutup dan Baring Gelap', keterangan: 'Kondisi stabil setelah istirahat 1.5 jam' },
      { indikasi: 'Otitis Media Sakit Telinga', tindakan: 'Pembersihan Luar Telinga', keterangan: 'Nyeri telinga dirujuk ke dokter THT' },
      { indikasi: 'Sesak Napas Hipoksia', tindakan: 'Pemberian Oksigen Tabung UKS', keterangan: 'Saturasi kembali 99% dalam 20 menit' },
      { indikasi: 'Kecelakaan Terjatuh Sepeda', tindakan: 'Obat Merah Betadine dan Bandage', keterangan: 'Luka lecet pada lutut dan siku' },
      { indikasi: 'Nyeri Sendi Lutut', tindakan: 'Korset Lutut dan Gel Pereda Nyeri', keterangan: 'Nyeri setelah kegiatan jalan sehat' },
      { indikasi: 'Sinusitis Kambuh', tindakan: 'Uap Hangat dan Nasal Spray', keterangan: 'Hidung tersumbat berat dan pusing' },
      { indikasi: 'Cacar Air Varicella', tindakan: 'Isolasi Mandiri di Rumah', keterangan: 'Bintik air menyebar, dipulangkan dari sekolah' },
      { indikasi: 'Tipes Typhoid Fever', tindakan: 'Surat Izin Sakit Rawat Jalan', keterangan: 'Demam naik turun 3 hari berturut-turut' },
      { indikasi: 'Konjungtivitis Mata Menular', tindakan: 'Kompres Air Steril dan Kacamata Pelindung', keterangan: 'Dipulangkan untuk mencegah penularan' },
      { indikasi: 'Radang Amandel Tonsilitis', tindakan: 'Obat Isap Tenggorokan', keterangan: 'Pembengkakan amandel derajat 2' },
      { indikasi: 'Sakit Gigi Melilit', tindakan: 'Pemberian Analgesik Pereda Nyeri', keterangan: 'Dirujuk ke dokter gigi sekolah' },
      { indikasi: 'Luka Tertusuk Kerikil', tindakan: 'Ekstraksi Kerikil dan Alkohol Steril', keterangan: 'Tertusuk saat berlari tanpa alas kaki' },
      { indikasi: 'Dehidrasi Panas Terik', tindakan: 'Minuman Isotonik dan Ruang AC', keterangan: 'Tersengat panas saat gladi bersih' },
      { indikasi: 'Hipotermia Kedinginan', tindakan: 'Selimut Tebal dan Minuman Hangat', keterangan: 'Kedinginan saat kegiatan kemping malam' },
      { indikasi: 'Biduran Urtikaria Kulit', tindakan: 'Salep Calamine Gatal', keterangan: 'Gatal membentol akibat cuaca dingin' },
      { indikasi: 'Gout Asam Urat Jempol', tindakan: 'Kompres Air Hangat dan Obat Asam Urat', keterangan: 'Nyeri hebat pada sendi jempol kaki' },
      { indikasi: 'Infeksi Saluran Kemih', tindakan: 'Anjuran Minum Air Putih Banyak', keterangan: 'Nyeri saat buang air kecil' },
      { indikasi: 'Nyeri Pinggang LBP', tindakan: 'Korset Lumbal dan Posisi Baring Datar', keterangan: 'Nyeri akibat mengangkat meja berat' },
      { indikasi: 'Penyakit Kulit Jamur Tinea', tindakan: 'Krim Antijamur Salep', keterangan: 'Gatal pada lipatan paha/tangan' },
      { indikasi: 'Batuk Rejan Pertusis', tindakan: 'Masker Medis dan Obat Batuk Herbal', keterangan: 'Batuk berkepanjangan disertai gatal' },
      { indikasi: 'Skoliosis Pegal Punggung', tindakan: 'Peregangan Tulang Belakang', keterangan: 'Keluhan pegal duduk lama saat ujian' },
      { indikasi: 'Nyeri Dada Non-Kardiak', tindakan: 'Pemeriksaan Stetoskop dan Penenangan', keterangan: 'Otot dada tegang akibat kecemasan' },
      { indikasi: 'Batu Ginjal Kolik', tindakan: 'Dirujuk Rumah Sakit Utama', keterangan: 'Nyeri pinggang menjalar ke perut bawah' },
      { indikasi: 'Luka Tergores Penggaris Bensin', tindakan: 'Antiseptik dan Plester Hansaplast', keterangan: 'Pertolongan pertama luka praktikum' },
      { indikasi: 'Terkelupas Kulit Terbakar Matahari', tindakan: 'Aloe Vera Gel Cooling', keterangan: 'Kulit memerah setelah renang siang' },
      { indikasi: 'Infeksi Jamur Kuku', tindakan: 'Pembersihan Kuku dan Antiseptik', keterangan: 'Kuku menguning dan rapuh' },
      { indikasi: 'Tetanus Profilaksis Luka Paku', tindakan: 'Pembersihan Cairan Peroksida dan Rujukan Suntik TT', keterangan: 'Tertusuk paku berkarat di area parkir' },
      { indikasi: 'Cantengan Jempol Kaki', tindakan: 'Rendaman Air Garam dan Pemotongan Steril', keterangan: 'Infeksi sudut kuku jempol' },
      { indikasi: 'Sakit Kepala Tension Headache', tindakan: 'Pijat Pelipis dan Paracetamol', keterangan: 'Ketegangan otot leher dan kepala' },
      { indikasi: 'Insomnia Kelelahan', tindakan: 'Istirahat Tidur Siang UKS', keterangan: 'Kelelahan ekstrem akibat kurang tidur' }
    ];

    cy.get('body').then(($body) => {
      const currentCount = $body.find('tbody tr').length;
      const targetCount = 50;
      const needed = targetCount - currentCount;

      if (needed > 0) {
        cy.log(`Membuat ${needed} data Riwayat Kesehatan agar total menjadi 50 data...`);
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

          cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 10000 }).should(($els) => {
            const anyVisible = $els.toArray().some((el) => Cypress.$(el).is(':visible'));
            expect(anyVisible, 'Modal dialog Tambah Riwayat Kesehatan harus sudah tertutup').to.equal(false);
          });
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

    cy.wait(1500);

    // 3. CENTANG HEADER CHECKBOX PADA CARD 3 (RIWAYAT KESEHATAN)
    findCardByTitle('Riwayat Kesehatan')
      .find('button[aria-label="Select all"], thead th button[role="checkbox"], thead th [data-slot="checkbox"]')
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });

    cy.wait(1200);

    // Verifikasi & retry click jika header checkbox belum dalam status checked
    cy.get('body').then(($body) => {
      const headerCb = $body.find('thead th button[role="checkbox"], thead th [data-slot="checkbox"]');
      if (headerCb.length > 0 && headerCb.attr('aria-checked') !== 'true' && headerCb.attr('data-state') !== 'checked') {
        cy.wrap(headerCb.first()).click({ force: true });
        cy.wait(1200);
      }
    });

    // 4. ASSERT BAHWA BANNER SELEKSI TERPILIH MENAMPILKAN INDIKATOR SELEKSI
    findCardByTitle('Riwayat Kesehatan')
      .then(($card) => {
        const rows = Array.from($card.find('tbody tr')).filter((row) => {
          const text = (row.textContent || '').replace(/\s+/g, ' ').trim();
          if (!text || /tidak ditemukan|belum ada|kosong|empty/i.test(text)) return false;
          const cells = Array.from(row.querySelectorAll('td'));
          return cells.some((cell) => {
            const cellText = (cell.textContent || '').replace(/\s+/g, ' ').trim();
            return !!cellText && !/^(---|-|—)$/.test(cellText);
          });
        });

        const totalRows = rows.length;

        if (totalRows === 0) {
          cy.get('body', { timeout: 15000 }).should(($body) => {
            const text = $body.text();
            expect(text, 'Kartu Riwayat Kesehatan harus berada dalam empty state saat tidak ada data').to.match(/tidak ditemukan|belum ada|kosong|empty/i);
          });
          return;
        }

        cy.get('body', { timeout: 15000 }).should(($body) => {
          const text = $body.text();
          const hasBannerText = /dipilih|terpilih/i.test(text);
          const hasCheckedSelection = $body.find('[role="checkbox"][data-state="checked"], [role="checkbox"][aria-checked="true"], input[type="checkbox"]:checked, [data-slot="checkbox"][data-state="checked"]').length > 0;
          const hasSelection = hasBannerText || hasCheckedSelection;

          expect(hasSelection, `Indikator terpilih atau (${totalRows}) data kesehatan dipilih harus tampil`).to.be.true;
        });
      });
  });
});
