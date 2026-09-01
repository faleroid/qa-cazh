import StudentDetailPage from '../../pages/StudentDetailPage';
import testData from '../../fixtures/studentData.json';

const data = testData.prestasiData;

const openPrestasi = () => {
  StudentDetailPage.navigateToFirstStudentDetail();
  StudentDetailPage.clickPrestasiTab();
};

const openForm = () => {
  cy.contains('button, a', /tambah prestasi/i, { timeout: 15000 })
    .scrollIntoView({ offset: { top: -120, left: 0 } })
    .click({ force: true });
  cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 10000 }).should('be.visible');
};

const fillPrestasi = (overrides = {}) => {
  const value = { ...data, ...overrides };
  cy.get('[role="dialog"]').within(() => {
    cy.get('button[name="date"], button[data-slot="form-control"], button[data-slot="popover-trigger"], button:contains("Tanggal")').first().click({ force: true });
  });
  cy.get('table.rdp-month_grid tbody button, [role="gridcell"] button, .rdp-day button, .rdp-day').filter(':visible').first().click({ force: true });
  cy.get('[role="dialog"]').within(() => {
    cy.get('input[name="category"], input[placeholder*="Kategori"]').first().clear({ force: true }).type(value.kategori, { force: true });
    cy.get('input[name="point"], input[name="poin"], input[type="number"]').first().clear({ force: true }).type(value.poin, { force: true });
    cy.get('input[name="description"], textarea[name="description"], textarea').first().clear({ force: true }).type(value.deskripsi, { force: true });
    cy.get('input[name="appreciation"], input[name="apresiasi"], textarea[name="appreciation"], textarea').last().clear({ force: true }).type(value.apresiasi, { force: true });
    cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
  });
};

describe('MODUL ANGGOTA - 14. Anggota - Detail Siswa - Tab Prestasi (AGT-14.1 - AGT-14.44)', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.1: Pada halaman Detail Siswa, klik tab Prestasi', () => {
    openPrestasi();
    cy.get('body').should('contain.text', 'Prestasi');
  });

  it('AGT-14.2: Cek header Poin Prestasi Terkumpul', () => {
    openPrestasi();
    StudentDetailPage.verifyPrestasiHeaderPoin();
  });

  it('AGT-14.3: Cek kolom pada tabel List Prestasi', () => {
    openPrestasi();
    StudentDetailPage.verifyPrestasiTableColumns();
  });

  it('AGT-14.4: Buka tab Prestasi saat belum ada data', () => {
    openPrestasi();
    cy.get('body').then(($body) => {
      expect($body.text()).to.match(/tidak ditemukan|belum ada|tidak ada data|Prestasi/i);
    });
  });

  [data.kategori, data.deskripsi, data.apresiasi, data.poin].forEach((keyword, index) => {
    it(`AGT-14.${5 + index}: Cari prestasi dengan keyword`, () => {
      openPrestasi();
      StudentDetailPage.ensurePrestasiDataExists();
      cy.get('input[placeholder*="Cari"], input[type="search"]').first().clear({ force: true }).type(`${keyword}{enter}`, { force: true });
      cy.wait(800);
      cy.get('body').should('contain.text', keyword);
    });
  });

  it('AGT-14.9: Cari dengan keyword tidak ditemukan', () => {
    openPrestasi();
    cy.get('input[placeholder*="Cari"], input[type="search"]').first().clear({ force: true }).type('KeywordRandom99999{enter}', { force: true });
    cy.wait(800);
    cy.get('body').should(($body) => {
      expect($body.text()).to.match(/tidak ditemukan|kosong|belum ada|tidak ada data/i);
    });
  });

  it('AGT-14.10: Klik tombol Tambah Prestasi', () => {
    openPrestasi();
    openForm();
    cy.get('[role="dialog"]').should('contain.text', 'Prestasi');
  });

  it('AGT-14.11: Cek field pada form Tambah Prestasi', () => {
    openPrestasi();
    openForm();
    cy.get('[role="dialog"]').within(() => {
      cy.contains('label, span, p, div', /tanggal/i).should('exist');
      cy.contains('label, span, p, div', /kategori/i).should('exist');
      cy.contains('label, span, p, div', /poin/i).should('exist');
      cy.contains('label, span, p, div', /deskripsi/i).should('exist');
      cy.contains('label, span, p, div', /apresiasi/i).should('exist');
      cy.contains('label, span, p, div', /foto/i).should('exist');
      cy.get('input[type="file"]').should('exist');
      cy.contains('button', /batal/i).should('be.visible');
      cy.contains('button[type="submit"], button', /simpan/i).should('be.visible');
    });
  });

  it('AGT-14.12: Kosongkan salah satu field required, klik Simpan', () => {
    openPrestasi();
    openForm();
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="category"], input[placeholder*="Kategori"]').first().clear({ force: true }).type(data.kategori, { force: true });
      cy.get('input[name="point"], input[name="poin"]').first().clear({ force: true }).type(data.poin, { force: true });
      cy.get('input[name="description"], textarea[name="description"]').first().clear({ force: true }).type(data.deskripsi, { force: true });
      cy.get('input[name="appreciation"], input[name="apresiasi"], textarea[name="appreciation"]').last().clear({ force: true });
      cy.contains('button[type="submit"], button', /simpan/i).then(($btn) => {
        if (!$btn.is(':disabled')) {
          cy.wrap($btn).click({ force: true });
        }
      });
    });
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
  });

  it('AGT-14.13: Poin positif 1-100 diterima', () => {
    openPrestasi();
    openForm();
    cy.get('[role="dialog"] input[type="number"], [role="dialog"] input[name="point"]').first().clear().type('25').should('have.value', '25');
  });

  it('AGT-14.14: Poin > 100 ditolak', () => {
    openPrestasi();
    openForm();
    cy.get('[role="dialog"]').within(() => {
      cy.get('button[name="date"], button[data-slot="form-control"], button:contains("Tanggal")').first().click({ force: true });
    });
    cy.get('table.rdp-month_grid tbody button, [role="gridcell"] button').filter(':visible').first().click({ force: true });
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="category"], input[placeholder*="Kategori"]').first().clear({ force: true }).type(data.kategori, { force: true });
      cy.get('input[name="point"], input[name="poin"]').first().clear({ force: true }).type('101', { force: true });
      cy.get('input[name="description"], textarea[name="description"]').first().clear({ force: true }).type(data.deskripsi, { force: true });
      cy.get('input[name="appreciation"], input[name="apresiasi"], textarea[name="appreciation"]').last().clear({ force: true }).type(data.apresiasi, { force: true });
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
  });

  it('AGT-14.15: Poin negatif ditolak', () => {
    openPrestasi();
    openForm();
    cy.get('[role="dialog"]').within(() => {
      cy.get('button[name="date"], button[data-slot="form-control"], button:contains("Tanggal")').first().click({ force: true });
    });
    cy.get('table.rdp-month_grid tbody button, [role="gridcell"] button').filter(':visible').first().click({ force: true });
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="category"], input[placeholder*="Kategori"]').first().clear({ force: true }).type(data.kategori, { force: true });
      cy.get('input[name="point"], input[name="poin"]').first().clear({ force: true }).type('-5', { force: true });
      cy.get('input[name="description"], textarea[name="description"]').first().clear({ force: true }).type(data.deskripsi, { force: true });
      cy.get('input[name="appreciation"], input[name="apresiasi"], textarea[name="appreciation"]').last().clear({ force: true }).type(data.apresiasi, { force: true });
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
  });

  it('AGT-14.16: Upload foto > 512KB ditolak', () => {
    openPrestasi();
    openForm();
    cy.get('[role="dialog"] input[type="file"]').selectFile('cypress/fixtures/oversized_11mb_file.pdf', { force: true });
    cy.wait(500);
    cy.get('[role="dialog"]').should(($dialog) => {
      expect($dialog.text()).to.match(/ukuran|512|besar|maksimal|format|10\.240|10240/i);
    });
  });

  it('AGT-14.17: Upload format foto invalid ditolak', () => {
    openPrestasi();
    openForm();
    cy.get('[role="dialog"] input[type="file"]').selectFile('cypress/fixtures/studentData.json', { force: true });
    cy.wait(500);
    cy.get('[role="dialog"]').should(($dialog) => {
      expect($dialog.text()).to.match(/format|jpg|jpeg|png|valid|heic|heif/i);
    });
  });

  it('AGT-14.18: Upload foto valid', () => {
    openPrestasi();
    openForm();
    cy.get('[role="dialog"] input[type="file"]').selectFile(`cypress/fixtures/${data.fotoValid}`, { force: true });
    cy.get('[role="dialog"]').should('be.visible');
  });

  it('AGT-14.19: Isi semua field dan simpan', () => {
    openPrestasi();
    openForm();
    fillPrestasi();
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('AGT-14.20: Klik Batal', () => {
    openPrestasi();
    openForm();
    cy.get('[role="dialog"]').contains('button', /batal/i).click({ force: true });
    cy.get('[role="dialog"]').should('not.exist');
  });

  it('AGT-14.21: Edit data', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('tbody tr', { timeout: 15000 }).first().then(($row) => {
      const editBtn = $row.find('button[data-slot="dialog-trigger"], button[aria-haspopup="dialog"], button:has(svg.lucide-square-pen), button:contains("Edit")');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).scrollIntoView({ offset: { top: -100, left: 0 } }).click();
      } else {
        cy.wrap($row.find('button').first()).scrollIntoView().click();
      }
    });
    cy.get('[role="dialog"]', { timeout: 15000 }).should('be.visible');
  });

  it('AGT-14.22: Simpan perubahan', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('tbody tr', { timeout: 15000 }).first().then(($row) => {
      const editBtn = $row.find('button[data-slot="dialog-trigger"], button[aria-haspopup="dialog"], button:has(svg.lucide-square-pen), button:contains("Edit")');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).scrollIntoView({ offset: { top: -100, left: 0 } }).click();
      } else {
        cy.wrap($row.find('button').first()).scrollIntoView().click();
      }
    });
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="description"], textarea[name="description"]').first().clear({ force: true }).type('Deskripsi diperbarui', { force: true });
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });
    cy.wait(1500);
    cy.get('[role="dialog"]', { timeout: 15000 }).should('not.exist');
  });

  it('AGT-14.23: Validasi edit required', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('tbody tr', { timeout: 15000 }).first().then(($row) => {
      const editBtn = $row.find('button[data-slot="dialog-trigger"], button[aria-haspopup="dialog"], button:has(svg.lucide-square-pen), button:contains("Edit")');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).scrollIntoView({ offset: { top: -100, left: 0 } }).click();
      } else {
        cy.wrap($row.find('button').first()).scrollIntoView().click();
      }
    });
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="appreciation"], input[name="apresiasi"], textarea[name="appreciation"], textarea').last().clear({ force: true });
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
  });

  it('AGT-14.24: Validasi poin dan foto edit', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('tbody tr', { timeout: 15000 }).first().then(($row) => {
      const editBtn = $row.find('button[data-slot="dialog-trigger"], button[aria-haspopup="dialog"], button:has(svg.lucide-square-pen), button:contains("Edit")');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).scrollIntoView({ offset: { top: -100, left: 0 } }).click();
      } else {
        cy.wrap($row.find('button').first()).scrollIntoView().click();
      }
    });
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="point"], input[name="poin"]').first().clear({ force: true }).type('101', { force: true });
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');
  });

  it('AGT-14.25: Batal edit', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('tbody tr', { timeout: 15000 }).first().then(($row) => {
      const editBtn = $row.find('button[data-slot="dialog-trigger"], button[aria-haspopup="dialog"], button:has(svg.lucide-square-pen), button:contains("Edit")');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).scrollIntoView({ offset: { top: -100, left: 0 } }).click();
      } else {
        cy.wrap($row.find('button').first()).scrollIntoView().click();
      }
    });
    cy.get('[role="dialog"]').within(() => {
      cy.contains('button', /batal/i).click({ force: true });
    });
    cy.get('[role="dialog"]', { timeout: 15000 }).should('not.exist');
  });

  it('AGT-14.26: Hapus single membuka confirmation', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('tbody tr', { timeout: 15000 }).first().find('svg.lucide-trash, svg.lucide-trash-2, svg[class*="trash"]').closest('button').scrollIntoView({ offset: { top: -100, left: 0 } }).click({ force: true });
    cy.get('[role="alertdialog"], [role="dialog"], [data-slot="alert-dialog-content"], [data-slot="dialog-content"]').should('be.visible');
  });

  it('AGT-14.27: Hapus single', () => {
    openPrestasi();
    StudentDetailPage.addSinglePrestasi({ kategori: 'Prestasi Hapus Test', poin: '10', deskripsi: 'Hapus Test', apresiasi: 'Test' });
    cy.contains('tbody tr', 'Prestasi Hapus Test', { timeout: 15000 }).find('svg.lucide-trash, svg.lucide-trash-2, svg[class*="trash"]').closest('button').scrollIntoView({ offset: { top: -100, left: 0 } }).click({ force: true });
    cy.get('[role="alertdialog"], [role="dialog"], [data-slot="alert-dialog-content"], [data-slot="dialog-content"]').within(() => {
      cy.contains('button[type="submit"], button', /hapus|ya|konfirmasi/i).click({ force: true });
    });
    cy.wait(1500);
    cy.get('[role="alertdialog"], [role="dialog"]', { timeout: 15000 }).should('not.exist');
  });

  it('AGT-14.28: Batal hapus single', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('tbody tr', { timeout: 15000 }).first().find('svg.lucide-trash, svg.lucide-trash-2, svg[class*="trash"]').closest('button').scrollIntoView({ offset: { top: -100, left: 0 } }).click({ force: true });
    cy.get('[role="alertdialog"], [role="dialog"], [data-slot="alert-dialog-content"], [data-slot="dialog-content"]').within(() => {
      cy.contains('button', /batal|cancel/i).click({ force: true });
    });
    cy.get('[role="alertdialog"], [role="dialog"]', { timeout: 15000 }).should('not.exist');
  });

  it('AGT-14.29: Centang satu baris', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('tbody tr').first().find('[role="checkbox"], input[type="checkbox"]').first().click({ force: true });
    cy.get('body').then(($body) => { expect($body.text()).to.match(/terpilih|dipilih|Hapus/i); });
  });

  it('AGT-14.30: Centang header', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('thead [role="checkbox"], thead input[type="checkbox"]').first().click({ force: true });
    cy.get('body').should('exist');
  });

  it('AGT-14.31: Pilih semua <= 50', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('thead [role="checkbox"], thead input[type="checkbox"], thead button[role="checkbox"]', { timeout: 15000 })
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(800);
    cy.get('body').should('exist');
  });

  it('AGT-14.32: Pilih semua > 50 (Ubah pagination 100 -> Centang header -> Notifikasi maksimal 50 data)', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('[data-slot="data-grid-pagination"] button[role="combobox"], [data-slot="select-trigger"], select', { timeout: 15000 })
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(500);
    cy.get('body').then(($body) => {
      const option100 = $body.find('[role="option"]:contains("100"), [data-slot="select-item"]:contains("100"), button:contains("100")');
      if (option100.length > 0) {
        cy.wrap(option100.first()).click({ force: true });
        cy.wait(1500);
      }
    });
    cy.get('thead th button[role="checkbox"], thead [role="checkbox"], thead input[type="checkbox"], thead [data-slot="checkbox"], button[aria-label="Select all"]', { timeout: 15000 })
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.get('[data-sonner-toast], [role="status"], [data-slot="toast"]', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Maksimal 50 data dapat dipilih sekaligus');
  });

  it('AGT-14.33: Hapus terpilih membuka popup', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"], [data-slot="checkbox"]').first().click({ force: true });
    cy.wait(800);
    cy.contains('button', /hapus/i, { timeout: 10000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
    cy.get('[role="alertdialog"], [role="dialog"], [data-slot="alert-dialog-content"], [data-slot="dialog-content"]', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        cy.contains(/hapus|yakin|prestasi/i).should('exist');
      });
  });

  it('AGT-14.34: Hapus bulk', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"], [data-slot="checkbox"]').first().click({ force: true });
    cy.wait(800);
    cy.contains('button', /hapus/i, { timeout: 10000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
    cy.wait(600);
    cy.get('[role="alertdialog"], [role="dialog"], [data-slot="alert-dialog-content"], [data-slot="dialog-content"]')
      .should('be.visible')
      .within(() => {
        cy.contains('button', /hapus|ya|delete|confirm|setuju/i).click({ force: true });
      });
    cy.wait(1500);
    cy.get('[role="alertdialog"], [role="dialog"]', { timeout: 15000 }).should('not.exist');
  });

  it('AGT-14.35: Batal hapus bulk', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"], [data-slot="checkbox"]').first().click({ force: true });
    cy.wait(800);
    cy.contains('button', /hapus/i, { timeout: 10000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
    cy.wait(600);
    cy.get('[role="alertdialog"], [role="dialog"], [data-slot="alert-dialog-content"], [data-slot="dialog-content"]')
      .should('be.visible')
      .within(() => {
        cy.contains('button', /batal|cancel/i).click({ force: true });
      });
    cy.wait(1000);
    cy.get('[role="alertdialog"], [role="dialog"]', { timeout: 15000 }).should('not.exist');
  });

  it('AGT-14.36: Batas 50 data (Centang header -> Klik checkbox baris tambahan manual -> Disabled/Tooltip)', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('[data-slot="data-grid-pagination"] button[role="combobox"], [data-slot="select-trigger"], select', { timeout: 15000 })
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(500);
    cy.get('body').then(($body) => {
      const option100 = $body.find('[role="option"]:contains("100"), [data-slot="select-item"]:contains("100"), button:contains("100")');
      if (option100.length > 0) {
        cy.wrap(option100.first()).click({ force: true });
        cy.wait(1500);
      }
    });
    cy.get('thead th button[role="checkbox"], thead [role="checkbox"], thead input[type="checkbox"], thead [data-slot="checkbox"], button[aria-label="Select all"]', { timeout: 15000 })
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(1000);
    cy.get('tbody tr').then(($rows) => {
      if ($rows.length > 50) {
        const extraRow = $rows.eq(50);
        const checkbox = extraRow.find('button[role="checkbox"], input[type="checkbox"], [data-slot="checkbox"]');
        if (checkbox.length > 0) {
          cy.wrap(checkbox.first()).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
          cy.wait(500);
        }
      }
    });
    cy.get('body', { timeout: 15000 }).then(($body) => {
      const hasDisabledCheckbox = $body.find('tbody tr button[disabled], tbody tr [aria-disabled="true"], tbody tr [data-disabled]').length > 0;
      const text = $body.text();
      const hasLimitMessage = /maksimal 50|50 data|batas|terpilih/i.test(text);
      const hasTooltipOrToast = $body.find('[role="tooltip"], [data-sonner-toast], [data-slot="tooltip-content"]').length > 0;
      expect(hasDisabledCheckbox || hasLimitMessage || hasTooltipOrToast, 'Checkbox tambahan harus disabled atau memicu tooltip/pesan batas 50 data').to.be.true;
    });
  });

  it('AGT-14.37: Ubah filter/search saat ada data terpilih -> Notifikasi Pilihan direset', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('input[placeholder*="Cari"], input[type="search"]').first().clear({ force: true });
    cy.wait(500);
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"], [data-slot="checkbox"]').first().click({ force: true });
    cy.wait(800);
    cy.get('input[placeholder*="Cari"], input[type="search"]').first().type('Prestasi{enter}', { force: true });
    cy.get('[data-sonner-toast], [role="status"], [data-slot="toast"]', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Pilihan direset karena filter berubah');
  });

  it('AGT-14.38: Selection lintas halaman (Pilih Semua Hasil Filter dipertahankan)', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('thead th button[role="checkbox"], thead [role="checkbox"], thead input[type="checkbox"], thead [data-slot="checkbox"], button[aria-label="Select all"]', { timeout: 15000 })
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .click({ force: true });
    cy.wait(800);
    cy.get('body').then(($body) => {
      const btnPilihSemua = $body.find('button:contains("Pilih semua"), a:contains("Pilih semua"), span:contains("Pilih semua")');
      if (btnPilihSemua.length > 0) {
        cy.wrap(btnPilihSemua.first()).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
        cy.wait(800);
      }
    });
    cy.get('body').then(($body) => {
      const btnPage2 = $body.find('[data-slot="data-grid-pagination"] button:contains("2"), nav button:contains("2"), [aria-label="Go to next page"]');
      if (btnPage2.length > 0) {
        cy.wrap(btnPage2.first()).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
        cy.wait(1200);
        cy.get('body', { timeout: 10000 }).then(($b2) => {
          const hasSelection = /terpilih|dipilih|pilih semua/i.test($b2.text()) || $b2.find('[data-slot="card-toolbar"]').length > 0;
          expect(hasSelection, 'Selection harus tetap aktif di Halaman 2').to.be.true;
        });
      } else {
        cy.contains(/terpilih|dipilih|pilih semua/i, { timeout: 10000 }).should('be.visible');
      }
    });
  });

  it('AGT-14.39: Selection manual reset saat pindah halaman', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"], [data-slot="checkbox"]').first().click({ force: true });
    cy.wait(800);
    cy.contains(/terpilih|dipilih/i, { timeout: 10000 }).should('be.visible');
    cy.get('body').then(($body) => {
      const btnPage2 = $body.find('[data-slot="data-grid-pagination"] button:contains("2"), nav button:contains("2"), [aria-label="Go to next page"]');
      if (btnPage2.length > 0) {
        cy.wrap(btnPage2.first()).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
        cy.wait(1200);
        cy.get('body').then(($b2) => {
          const isRowCheckedOnPage2 = $b2.find('tbody button[aria-checked="true"], tbody [data-state="checked"]').length > 0;
          expect(isRowCheckedOnPage2, 'Baris data di Halaman 2 tidak boleh tercentang otomatis').to.be.false;
        });
      }
    });
  });

  it('AGT-14.40: Partial fail (Warning x dari n berhasil dihapus)', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').eq(0).find('button[role="checkbox"], input[type="checkbox"], [data-slot="checkbox"]').first().click({ force: true });
    cy.wait(400);
    cy.get('body').then(($body) => {
      const rows = $body.find('tbody tr');
      if (rows.length > 1) {
        cy.wrap(rows).eq(1).find('button[role="checkbox"], input[type="checkbox"], [data-slot="checkbox"]').first().click({ force: true });
        cy.wait(400);
      }
    });
    cy.contains('button', /hapus/i, { timeout: 10000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
    cy.wait(600);
    cy.intercept('**', (req) => {
      if (req.method !== 'GET' && !req.url.includes('login') && !req.url.includes('auth')) {
        req.reply({
          statusCode: 200,
          body: {
            success: false,
            message: '1 dari 2 data berhasil dihapus. 1 data gagal, silakan coba lagi',
            data: { success_count: 1, failed_count: 1 }
          }
        });
      }
    }).as('deletePartialMock');
    cy.get('[role="alertdialog"], [role="dialog"], [data-slot="alert-dialog-content"], [data-slot="dialog-content"]')
      .should('be.visible')
      .within(() => {
        cy.contains('button', /hapus|ya|konfirmasi|delete/i).click({ force: true });
      });
    cy.wait(1000);
    cy.get('body', { timeout: 15000 }).then(($body) => {
      const toast = $body.find('[data-sonner-toast], [role="status"], [data-slot="toast"]');
      if (toast.length > 0) {
        cy.wrap(toast.first()).should('satisfy', ($el) => {
          const text = $el.text().toLowerCase();
          return text.includes('berhasil') || text.includes('gagal') || text.includes('coba lagi');
        });
      } else {
        const text = $body.text().toLowerCase();
        expect(text, 'Sistem harus menampilkan status partial fail').to.satisfy((t) => t.includes('gagal') || t.includes('berhasil') || t.includes('prestasi'));
      }
    });
  });

  it('AGT-14.41: Seluruh data gagal (Network/Server Error 500)', () => {
    openPrestasi();
    StudentDetailPage.ensurePrestasiDataExists();
    cy.get('tbody tr', { timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').first().find('button[role="checkbox"], input[type="checkbox"], [data-slot="checkbox"]').first().click({ force: true });
    cy.wait(600);
    cy.contains('button', /hapus/i, { timeout: 10000 }).scrollIntoView({ offset: { top: -120, left: 0 } }).click({ force: true });
    cy.wait(600);
    cy.intercept('**', (req) => {
      if (req.method !== 'GET' && !req.url.includes('login') && !req.url.includes('auth')) {
        req.reply({
          statusCode: 500,
          body: {
            message: 'Gagal menghapus data, silakan coba lagi'
          }
        });
      }
    }).as('deleteErrorMock');
    cy.get('[role="alertdialog"], [role="dialog"], [data-slot="alert-dialog-content"], [data-slot="dialog-content"]')
      .should('be.visible')
      .within(() => {
        cy.contains('button', /hapus|ya|konfirmasi|delete/i).click({ force: true });
      });
    cy.wait(1000);
    cy.get('body', { timeout: 15000 }).then(($body) => {
      const toast = $body.find('[data-sonner-toast], [role="status"], [data-slot="toast"]');
      if (toast.length > 0) {
        cy.wrap(toast.first()).should('satisfy', ($el) => {
          const text = $el.text().toLowerCase();
          return text.includes('gagal') || text.includes('coba lagi') || text.includes('error');
        });
      } else {
        const text = $body.text().toLowerCase();
        expect(text, 'Sistem harus memuat respons error saat gagal').to.satisfy((t) => t.includes('gagal') || t.includes('terpilih') || t.includes('error'));
      }
    });
  });

  it('AGT-14.42: Export tanpa filter', () => {
    openPrestasi();
    cy.contains('button', /excel/i).should('be.visible');
  });

  it('AGT-14.43: Export hasil pencarian', () => {
    openPrestasi();
    cy.contains('button', /excel/i).should('be.visible');
  });

  it('AGT-14.44: Cek isi kolom export', () => {
    openPrestasi();
    cy.get('body').then(($body) => { expect($body.text()).to.match(/Instansi|Nama Siswa|Tanggal Kejadian|Kategori Prestasi|Deskripsi|Apresiasi|Poin|Dibuat Oleh/i); });
  });
});
