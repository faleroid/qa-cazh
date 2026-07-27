const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../cypress/e2e/PGT-18');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const specs = [
  {
    id: 'PGT-18.1',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.1 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.1 Isi form Tambah Tipe Pelanggaran dengan semua field valid (Instansi + Nama + Min Poin + Max Poin) -> klik Simpan', () => {
    ViolationTypePage.deleteAllDataIfExists();
    const namaBaru = testData.validData.namaBaru;
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: namaBaru,
      minPoin: testData.validData.minPoin,
      maxPoin: testData.validData.maxPoin
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible').and('contain.text', 'berhasil');
    cy.contains(namaBaru, { timeout: 10000 }).should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.2',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.2 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it("PGT-18.2 Klik btn 'Tambah' di halaman list Tipe Pelanggaran", () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.elements.formModal().should('be.visible');
    ViolationTypePage.elements.modalInstansiDropdown().should('exist');
    ViolationTypePage.elements.modalNamaInput().should('have.value', '');
    ViolationTypePage.elements.modalMinPoinInput().should('have.value', '');
    ViolationTypePage.elements.modalMaxPoinInput().should('have.value', '');
    ViolationTypePage.elements.modalSaveBtn().should('exist');
  });
});
`
  },
  {
    id: 'PGT-18.3',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.3 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.3 Isi form -> klik btn Batal', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: 'Pelanggaran Batal',
      minPoin: '1',
      maxPoin: '5'
    });
    ViolationTypePage.cancelForm();
    ViolationTypePage.elements.formModal().should('not.exist');
  });
});
`
  },
  {
    id: 'PGT-18.4',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.4 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.4 Klik Simpan tanpa isi field apapun', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('have.length.at.least', 1);
    ViolationTypePage.elements.formModal().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.5',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.5 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.5 Kosongkan Instansi (field lain terisi) -> klik Simpan', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      nama: testData.validData.namaBaru,
      minPoin: '1',
      maxPoin: '5'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().contains(new RegExp(testData.validationMessages.instansiRequired, 'i')).should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.6',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.6 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.6 Kosongkan Nama Tipe Pelanggaran -> klik Simpan', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: '',
      minPoin: '1',
      maxPoin: '5'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().contains(new RegExp(testData.validationMessages.namaRequired, 'i')).should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.7',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.7 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.7 Kosongkan Minimal Poin (Max terisi) -> klik Simpan', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '',
      maxPoin: '10'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.8',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.8 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.8 Kosongkan Maksimal Poin (Min terisi) -> klik Simpan', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '1',
      maxPoin: ''
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.9',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.9 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.9 Kosongkan kedua Range Poin (Min + Max) -> klik Simpan', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '',
      maxPoin: ''
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.10',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.10 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.10 Buka dropdown Instansi', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.elements.modalInstansiDropdown().click({ force: true });
    ViolationTypePage.elements.selectOptions().should('have.length.at.least', 1);
  });
});
`
  },
  {
    id: 'PGT-18.11',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.11 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.11 Input Minimal Poin dengan angka negatif (misal -5)', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '-5',
      maxPoin: '10'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.12',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.12 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.12 Input Maksimal Poin dengan angka negatif (misal -10)', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '1',
      maxPoin: '-10'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.13',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.13 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.13 Input Min Poin > Max Poin (misal Min=15, Max=10) -> klik Simpan', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '15',
      maxPoin: '10'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().contains(new RegExp(testData.validationMessages.minGreaterMax, 'i')).should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.14',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.14 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.14 Input Min Poin = Max Poin (misal keduanya 10) -> klik Simpan', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '10',
      maxPoin: '10'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.15',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.15 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.15 Input Max Poin = 1000 (> 999) -> klik Simpan', () => {
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: testData.validData.namaBaru,
      minPoin: '1',
      maxPoin: '1000'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().contains(new RegExp(testData.validationMessages.maxExceeds999, 'i')).should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.16',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.16 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.16 Input Range Poin yang OVERLAP dengan tipe pelanggaran existing -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: 'Pelanggaran Overlap Test',
      minPoin: '1',
      maxPoin: '10'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.17',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.17 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.17 Input Nama Tipe Pelanggaran yang sudah ada (duplikat) -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.elements.tableRows().first().find('td').eq(1).invoke('text').then((existingName) => {
      ViolationTypePage.clickAddButton();
      ViolationTypePage.fillModalForm({
        instansiIndex: 0,
        nama: existingName.trim(),
        minPoin: '80',
        maxPoin: '90'
      });
      ViolationTypePage.saveForm();
      ViolationTypePage.elements.validationError().should('be.visible');
      ViolationTypePage.elements.modalSaveBtn().should('not.be.disabled');
    });
  });
});
`
  },
  {
    id: 'PGT-18.18',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.18 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.18 Input Nama Tipe Pelanggaran > 100 karakter -> klik Simpan', () => {
    const longName = 'A'.repeat(105);
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: longName,
      minPoin: '91',
      maxPoin: '95'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.verifyValidationError(testData.validationMessages.namaMaxLength);
    ViolationTypePage.elements.formModal().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.19',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.19 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.19 Load halaman list Tipe Pelanggaran', () => {
    ViolationTypePage.elements.tableHeaderNodes().contains(/instansi/i).should('be.visible');
    ViolationTypePage.elements.tableHeaderNodes().contains(/tipe pelanggaran|nama/i).should('be.visible');
    ViolationTypePage.elements.tableHeaderNodes().contains(/range/i).should('be.visible');
    ViolationTypePage.elements.tableHeaderNodes().contains(/status/i).should('be.visible');
    ViolationTypePage.elements.addButton().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.20',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.20 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.20 Cek Aksi di setiap row', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.elements.rowEditBtn().should('exist');
    ViolationTypePage.elements.rowDeleteBtn().should('exist');
  });
});
`
  },
  {
    id: 'PGT-18.21',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.21 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.21 Buka halaman list Tipe Pelanggaran saat belum ada data', () => {
    // 1. Tunggu tabel selesai muat data awal dari API backend
    cy.get('tbody', { timeout: 15000 }).should('be.visible');
    cy.wait(2000);

    // 2. Fungsi Hapus Bertahap Seluruh Data Eksis
    const deleteRowIfDataExists = () => {
      cy.get('tbody').then(($tbody) => {
        const trashBtns = $tbody.find('tr button:has(svg.lucide-trash)');
        if (trashBtns.length > 0) {
          // Klik tombol trash baris pertama
          cy.wrap(trashBtns.first()).click({ force: true });
          cy.wait(800);

          // Klik konfirmasi Hapus
          ViolationTypePage.confirmDelete();
          cy.wait(2500);

          // Cek kembali baris berikutnya secara rekursif
          deleteRowIfDataExists();
        } else {
          // 3. Ketika seluruh data terhapus, verifikasi state kosong
          ViolationTypePage.elements.emptyState().should('be.visible');
        }
      });
    };

    deleteRowIfDataExists();
  });
});
`
  },
  {
    id: 'PGT-18.22',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.22 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.22 Tambah 2 tipe pelanggaran berturut-turut -> reload halaman', () => {
    const timestamp = Date.now();
    const cat1 = \`Pelanggaran Auto 1 \${timestamp}\`;
    const cat2 = \`Pelanggaran Auto 2 \${timestamp}\`;

    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({ instansiIndex: 0, nama: cat1, minPoin: '1', maxPoin: '10' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1000);

    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({ instansiIndex: 0, nama: cat2, minPoin: '11', maxPoin: '20' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1000);

    // Edit cat2 menjadi 'Tidak Aktif'
    cy.contains('tbody tr', cat2, { timeout: 15000 }).should('be.visible');
    cy.contains('tbody tr', cat2).find('button[data-slot="dialog-trigger"]:has(svg.lucide-square-pen), button:has(svg.lucide-square-pen), button:has(svg.lucide-pencil)').first().click({ force: true });
    cy.wait(1000);
    ViolationTypePage.elements.formModal().should('be.visible');
    ViolationTypePage.fillModalForm({ statusText: 'Tidak Aktif' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1500);

    cy.reload();
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.contains(cat2, { timeout: 10000 }).should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.23',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.23 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.23 Cek default value pagination page size', () => {
    ViolationTypePage.elements.pageSizeDropdown().invoke('text').should('contain', '10');
  });
});
`
  },
  {
    id: 'PGT-18.24',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.24 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.24 Klik dropdown pagination page size', () => {
    ViolationTypePage.elements.pageSizeDropdown().click({ force: true });
    ViolationTypePage.elements.selectOptions().should('have.length.at.least', 3);
  });
});
`
  },
  {
    id: 'PGT-18.25',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.25 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.25 Ganti page size ke 50/100/500/1000', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.changePageSize(50);
    ViolationTypePage.elements.pageSizeDropdown().invoke('text').should('contain', '50');
  });
});
`
  },
  {
    id: 'PGT-18.26',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.26 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.26 Ketik Nama Tipe Pelanggaran di search box', () => {
    cy.get('tbody', { timeout: 15000 }).should('be.visible');
    cy.wait(2500);
    ViolationTypePage.search('Ponsel');
    ViolationTypePage.elements.tableRows({ timeout: 15000 }).should('have.length.at.least', 1);
    ViolationTypePage.elements.tableRows().first().should('contain.text', 'Ponsel');
  });
});
`
  },
  {
    id: 'PGT-18.27',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.27 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it("PGT-18.27 Ketik keyword yang tidak match ('xyz123abc')", () => {
    ViolationTypePage.search(testData.search.invalidKeyword);
    ViolationTypePage.elements.emptyState().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.28',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.28 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.28 Setelah search, clear search box', () => {
    ViolationTypePage.search(testData.search.invalidKeyword);
    ViolationTypePage.search('');
    ViolationTypePage.elements.tableRows().should('exist');
  });
});
`
  },
  {
    id: 'PGT-18.29',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.29 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.29 Aktifkan Filter Instansi (pilih 1 instansi)', () => {
    ViolationTypePage.elements.filterInstansiSelect().click({ force: true });
    ViolationTypePage.elements.selectOptions().last().click({ force: true });
    cy.wait(1000);
    ViolationTypePage.elements.tableRows().should('exist');
  });
});
`
  },
  {
    id: 'PGT-18.30',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.30 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it("PGT-18.30 Aktifkan Filter Status = 'Aktif'", () => {
    cy.get('tbody', { timeout: 15000 }).should('be.visible');
    cy.wait(3000);
    ViolationTypePage.ensureDataExists();
    cy.wait(2000);
    ViolationTypePage.elements.filterStatusSelect().click({ force: true });
    cy.wait(800);
    ViolationTypePage.elements.selectOptions().contains(/^\s*Aktif\s*$/i).first().click({ force: true });
    cy.wait(4000);
    cy.get('tbody', { timeout: 15000 }).should('be.visible');
    ViolationTypePage.elements.tableRows({ timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').then(($rows) => {
      $rows.each((_, row) => {
        expect(Cypress.$(row).text()).to.include('Aktif');
      });
    });
  });
});
`
  },
  {
    id: 'PGT-18.31',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.31 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it("PGT-18.31 Aktifkan Filter Status = 'Tidak Aktif'", () => {
    cy.get('tbody', { timeout: 15000 }).should('be.visible');
    cy.wait(3000);
    ViolationTypePage.ensureInactiveDataExists();
    cy.wait(2000);
    ViolationTypePage.elements.filterStatusSelect().click({ force: true });
    cy.wait(800);
    ViolationTypePage.elements.selectOptions().contains(/^\s*Tidak Aktif\s*$/i).first().click({ force: true });
    cy.wait(4000);
    cy.get('tbody', { timeout: 15000 }).should('be.visible');
    ViolationTypePage.elements.tableRows({ timeout: 15000 }).should('have.length.at.least', 1);
    cy.get('tbody tr').then(($rows) => {
      $rows.each((_, row) => {
        expect(Cypress.$(row).text()).to.include('Tidak Aktif');
      });
    });
  });
});
`
  },
  {
    id: 'PGT-18.32',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.32 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.32 Aktifkan Filter Instansi + Status secara bersamaan (kombinasi)', () => {
    ViolationTypePage.elements.filterInstansiSelect().click({ force: true });
    ViolationTypePage.elements.selectOptions().last().click({ force: true });
    cy.wait(500);
    ViolationTypePage.elements.filterStatusSelect().click({ force: true });
    ViolationTypePage.elements.selectOptions().contains(/aktif/i).first().click({ force: true });
    cy.wait(1000);
  });
});
`
  },
  {
    id: 'PGT-18.33',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.33 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.33 Aktifkan filter + search sekaligus -> tidak ada hasil match', () => {
    ViolationTypePage.elements.filterStatusSelect().click({ force: true });
    ViolationTypePage.elements.selectOptions().contains(/aktif/i).first().click({ force: true });
    ViolationTypePage.search(testData.search.invalidKeyword);
    ViolationTypePage.elements.emptyState().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.34',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.34 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.34 Aktifkan filter + search sekaligus -> ada hasil match', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.elements.filterStatusSelect().click({ force: true });
    ViolationTypePage.elements.selectOptions().contains(/aktif/i).first().click({ force: true });
    ViolationTypePage.search('Pelanggaran');
    ViolationTypePage.elements.tableRows().should('have.length.at.least', 1);
  });
});
`
  },
  {
    id: 'PGT-18.35',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.35 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.35 Klik tombol Edit di row tipe pelanggaran', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.elements.formModal().should('be.visible');
    ViolationTypePage.elements.modalNamaInput().invoke('val').should('not.be.empty');
  });
});
`
  },
  {
    id: 'PGT-18.36',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.36 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.36 Ubah Nama Tipe Pelanggaran ke nama BARU -> klik Simpan', () => {
    const timestamp = Date.now();
    const newName = \`Pelanggaran Edit \${timestamp}\`;
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ nama: newName });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible').and('contain.text', 'berhasil');
  });
});
`
  },
  {
    id: 'PGT-18.37',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.37 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.37 Ubah Range Poin (Min-Max) valid & tidak overlap -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ minPoin: '15', maxPoin: '20' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.38',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.38 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it("PGT-18.38 Ubah Status dari 'Aktif' ke 'Tidak Aktif' -> klik Simpan", () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ statusIndex: 1 });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
  });
});
`
  },
  {
    id: 'PGT-18.39',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.39 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it("PGT-18.39 Ubah Status dari 'Tidak Aktif' ke 'Aktif' -> klik Simpan", () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ statusIndex: 0 });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
  });
});
`
  },
  {
    id: 'PGT-18.40',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.40 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.40 Ubah Instansi tipe pelanggaran -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.elements.modalInstansiValue().invoke('text').then((currentInstansiText) => {
      ViolationTypePage.elements.modalInstansiDropdown().click({ force: true });
      cy.wait(1000);
      ViolationTypePage.elements.selectOptions().then(($options) => {
        let differentIndex = 0;
        $options.each((idx, opt) => {
          const optText = Cypress.$(opt).text().trim();
          if (optText && !optText.toLowerCase().includes(currentInstansiText.trim().toLowerCase())) {
            differentIndex = idx;
            return false;
          }
        });
        cy.wrap($options.eq(differentIndex)).click({ force: true });
        cy.wait(1000);
      });
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.41',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.41 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.41 Ubah field di form Edit -> klik Batal', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ nama: 'Nama Edit Batal' });
    ViolationTypePage.cancelForm();
    ViolationTypePage.elements.formModal().should('not.exist');
  });
});
`
  },
  {
    id: 'PGT-18.42',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.42 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.42 Kosongkan Nama Tipe Pelanggaran di Edit -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ nama: '' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().first().scrollIntoView().should('exist');
    ViolationTypePage.cancelForm();
  });
  });
});
`
  },
  {
    id: 'PGT-18.43',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.43 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.43 Kosongkan Status di Edit -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.44',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.44 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.44 Kosongkan Min atau Max Poin di Edit -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ minPoin: '' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.45',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.45 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.45 Ubah Nama Tipe Pelanggaran jadi nama yang SUDAH ADA (duplikat) -> klik Simpan', () => {
    const timestamp = Date.now().toString().slice(-4);
    const dummyName = `Dummy Edit Duplikat ${timestamp}`;
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({
      instansiIndex: 0,
      nama: dummyName,
      minPoin: '25',
      maxPoin: '30'
    });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1500);

    cy.contains('tbody tr', dummyName)
      .find('button[data-slot="dialog-trigger"]:has(svg.lucide-square-pen), button:has(svg.lucide-square-pen), button:has(svg.lucide-pencil)')
      .first()
      .click({ force: true });
    cy.wait(1000);
    ViolationTypePage.elements.formModal().should('be.visible');

    ViolationTypePage.fillModalForm({ nama: 'Penggunaan Ponsel Saat KBM' });
    ViolationTypePage.saveForm();

    ViolationTypePage.verifyValidationError('sudah');
    ViolationTypePage.elements.formModal().should('be.visible');
    ViolationTypePage.elements.modalSaveBtn().should('be.enabled');
    ViolationTypePage.cancelForm();
  });
});
`
  },
  {
    id: 'PGT-18.46',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.46 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.46 Ubah Range Poin jadi OVERLAP dengan tipe pelanggaran existing lain -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ minPoin: '1', maxPoin: '10' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.47',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.47 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.47 Ubah Min Poin > Max Poin di Edit -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ minPoin: '50', maxPoin: '20' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.48',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.48 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.48 Ubah Max Poin > 999 di Edit -> klik Simpan', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ maxPoin: '1000' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.validationError().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.49',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.49 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.49 Ubah Nama Tipe Pelanggaran jadi > 100 karakter -> klik Simpan', () => {
    const longName = 'B'.repeat(105);
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.fillModalForm({ nama: longName });
    ViolationTypePage.saveForm();
    ViolationTypePage.verifyValidationError(testData.validationMessages.namaMaxLength);
    ViolationTypePage.elements.formModal().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.50',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.50 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
  });

  it("PGT-18.50 Set status 'Aktif' -> buka fitur Pelanggaran di /student-affairs/violation", () => {
    ViolationTypePage.visit();
    ViolationTypePage.ensureInactiveDataExists();

    cy.contains('tbody tr', /tidak aktif/i).first().then(($row) => {
      const instansiName = $row.find('td').eq(0).text().trim();
      const typeName = $row.find('td').eq(1).text().trim() || $row.find('td').first().text().trim();
      const cleanName = typeName.split('\\n')[0].trim();
      const cleanInstansi = instansiName.split('\\n')[0].trim();
      
      cy.wrap(cleanName).as('targetTypeName');
      cy.wrap(cleanInstansi).as('targetInstansiName');

      const editBtn = $row.find('button[data-slot="dialog-trigger"]:has(svg.lucide-square-pen), button:has(svg.lucide-square-pen), button:has(svg.lucide-pencil)');
      cy.wrap(editBtn.first()).scrollIntoView();
      cy.wait(800);
      cy.wrap(editBtn.first()).click({ force: true });
    });
    cy.wait(1200);
    ViolationTypePage.elements.formModal({ timeout: 15000 }).should('be.visible');

    ViolationTypePage.fillModalForm({ statusText: 'Aktif' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1500);

    cy.get('@targetInstansiName').then((targetInstansiName) => {
      cy.get('@targetTypeName').then((targetTypeName) => {
        const instansiKeyword = targetInstansiName.slice(0, 10);
        const typeKeyword = targetTypeName.slice(0, 15);

        cy.visit('/student-affairs/violation', { failOnStatusCode: false });
        cy.get('body', { timeout: 15000 }).should('be.visible');

        cy.contains('button', /tambah pelanggaran/i, { timeout: 10000 }).click({ force: true });
        cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');

        cy.get('[role="dialog"]').then(($dialog) => {
          const instansiTrigger = $dialog.find('[data-slot="form-item"]:contains("Instansi") [role="combobox"], [data-slot="form-item"]:contains("Instansi") [data-slot="select-trigger"], button:contains("Pilih Instansi")');
          if (instansiTrigger.length > 0) {
            cy.wrap(instansiTrigger.first()).click({ force: true });
            cy.wait(800);
            cy.get('[role="option"], [data-slot="select-item"]').contains(new RegExp(instansiKeyword, 'i')).first().click({ force: true });
            cy.wait(1200);
          }
        });

        cy.contains('[data-slot="form-item"]', /tipe pelanggaran/i)
          .find('[role="combobox"], [data-slot="select-trigger"]')
          .click({ force: true });
        cy.wait(1000);

        cy.get('body').then(($body) => {
          if ($body.find('[role="option"], [data-slot="select-item"]').length > 0) {
            cy.get('[role="option"], [data-slot="select-item"]').contains(new RegExp(typeKeyword, 'i')).should('be.visible').click({ force: true });
          } else {
            cy.get('select option').contains(new RegExp(typeKeyword, 'i')).should('exist');
          }
        });
      });
    });
  });
});
`
  },
  {
    id: 'PGT-18.51',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.51 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
  });

  it("PGT-18.51 Set status 'Tidak Aktif' -> buka fitur Pelanggaran di /student-affairs/violation", () => {
    ViolationTypePage.visit();
    ViolationTypePage.ensureDataExists();

    cy.contains('tbody tr', /aktif/i).first().then(($row) => {
      const instansiName = $row.find('td').eq(0).text().trim();
      const typeName = $row.find('td').eq(1).text().trim() || $row.find('td').first().text().trim();
      const cleanName = typeName.split('\\n')[0].trim();
      const cleanInstansi = instansiName.split('\\n')[0].trim();
      
      cy.wrap(cleanName).as('targetTypeName');
      cy.wrap(cleanInstansi).as('targetInstansiName');

      const editBtn = $row.find('button[data-slot="dialog-trigger"]:has(svg.lucide-square-pen), button:has(svg.lucide-square-pen), button:has(svg.lucide-pencil)');
      cy.wrap(editBtn.first()).scrollIntoView();
      cy.wait(800);
      cy.wrap(editBtn.first()).click({ force: true });
    });
    cy.wait(1200);
    ViolationTypePage.elements.formModal({ timeout: 15000 }).should('be.visible');

    ViolationTypePage.fillModalForm({ statusText: 'Tidak Aktif' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1500);

    cy.get('@targetInstansiName').then((targetInstansiName) => {
      cy.get('@targetTypeName').then((targetTypeName) => {
        const instansiKeyword = targetInstansiName.slice(0, 10);
        const typeKeyword = targetTypeName.slice(0, 15);

        cy.visit('/student-affairs/violation', { failOnStatusCode: false });
        cy.get('body', { timeout: 15000 }).should('be.visible');

        cy.contains('button', /tambah pelanggaran/i, { timeout: 10000 }).click({ force: true });
        cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');

        cy.get('[role="dialog"]').then(($dialog) => {
          const instansiTrigger = $dialog.find('[data-slot="form-item"]:contains("Instansi") [role="combobox"], [data-slot="form-item"]:contains("Instansi") [data-slot="select-trigger"], button:contains("Pilih Instansi")');
          if (instansiTrigger.length > 0) {
            cy.wrap(instansiTrigger.first()).click({ force: true });
            cy.wait(800);
            cy.get('[role="option"], [data-slot="select-item"]').contains(new RegExp(instansiKeyword, 'i')).first().click({ force: true });
            cy.wait(1200);
          }
        });

        cy.contains('[data-slot="form-item"]', /tipe pelanggaran/i)
          .find('[role="combobox"], [data-slot="select-trigger"]')
          .click({ force: true });
        cy.wait(1000);

        cy.get('body').then(($body) => {
          if ($body.find('[role="option"], [data-slot="select-item"]').length > 0) {
            cy.get('[role="option"], [data-slot="select-item"]').should('not.contain.text', typeKeyword);
          } else {
            cy.get('select option').should('not.contain.text', typeKeyword);
          }
        });
      });
    });
  });
});
`
  },
  {
    id: 'PGT-18.52',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.52 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it("PGT-18.52 Klik Aksi -> 'Hapus' di row tipe pelanggaran", () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickDeleteFirstRow();
    ViolationTypePage.elements.deleteModal().should('be.visible');
    ViolationTypePage.elements.deleteConfirmBtn().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.53',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.53 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it("PGT-18.53 Klik btn 'Hapus' di popup konfirmasi", () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickDeleteFirstRow();
    ViolationTypePage.confirmDelete();
    ViolationTypePage.elements.deleteModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.54',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.54 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it("PGT-18.54 Buka popup Hapus -> klik btn 'Batal'", () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickDeleteFirstRow();
    ViolationTypePage.cancelDelete();
    ViolationTypePage.elements.deleteModal().should('not.exist');
  });
});
`
  },
  {
    id: 'PGT-18.55',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.55 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.55 Buka popup Hapus -> tekan Esc di keyboard', () => {
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickDeleteFirstRow();
    cy.get('body').type('{esc}');
    ViolationTypePage.elements.deleteModal().should('not.exist');
  });
});
`
  },
  {
    id: 'PGT-18.56',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.56 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
    ViolationTypePage.visit();
  });

  it('PGT-18.56 Search sampai hasil tinggal 1 row -> hapus row tersebut', () => {
    const timestamp = Date.now();
    const uniqueCat = \`Khusus Hapus \${timestamp}\`;
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({ instansiIndex: 0, nama: uniqueCat, minPoin: '301', maxPoin: '305' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1000);

    ViolationTypePage.search(uniqueCat);
    ViolationTypePage.elements.tableRows().should('have.length', 1);
    ViolationTypePage.clickDeleteFirstRow();
    ViolationTypePage.confirmDelete();
    ViolationTypePage.elements.emptyState().should('be.visible');
  });
});
`
  },
  {
    id: 'PGT-18.57',
    code: `import ViolationTypePage from '../../pages/ViolationTypePage';
import testData from '../../fixtures/violationTypeData.json';

describe('PGT-18.57 - Tipe Pelanggaran', () => {
  beforeEach(() => {
    cy.login();
  });

  it('PGT-18.57 Tambah Pelanggaran -> Cek Tipe Pelanggaran di tabel -> Hapus Tipe di setting -> Cek kembali di Pelanggaran', () => {
    const timestamp = Date.now();
    const targetTypeName = `Pelanggaran Auto ${timestamp}`;

    ViolationTypePage.visit();
    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({ instansiText: 'Academy QA Engineer', nama: targetTypeName, minPoin: '100', maxPoin: '110' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1500);

    cy.visit('/student-affairs/violation', { failOnStatusCode: false });
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.wait(2500);

    cy.contains('button', /tambah pelanggaran/i, { timeout: 10000 }).click({ force: true });
    cy.get('[role="dialog"]', { timeout: 10000 }).should('be.visible');

    cy.get('[role="dialog"]').then(($dialog) => {
      const instansiTrigger = $dialog.find('[data-slot="form-item"]:contains("Instansi") [role="combobox"], [data-slot="form-item"]:contains("Instansi") [data-slot="select-trigger"], button:contains("Pilih Instansi")');
      if (instansiTrigger.length > 0) {
        cy.wrap(instansiTrigger.first()).click({ force: true });
        cy.wait(800);
        cy.get('[role="option"], [data-slot="select-item"]').contains(/Academy QA Engineer/i).click({ force: true });
        cy.wait(1200);
      }
    });

    cy.get('[role="dialog"]').then(($dialog) => {
      const anggotaInput = $dialog.find('input[placeholder*="Cari Nomor Kartu"], input[placeholder*="Nama"]');
      if (anggotaInput.length > 0) {
        cy.wrap(anggotaInput.first()).clear({ force: true }).type('rocky', { force: true });
        cy.wait(1500);
        cy.contains('button', /Rocky Gibraltar|rocky/i, { timeout: 10000 })
          .scrollIntoView()
          .click({ force: true });
        cy.wait(800);
      }
    });

    cy.get('[role="dialog"]').then(($dialog) => {
      const dateBtn = $dialog.find('button[name="date"], button:contains("DD/MM/YYYY")');
      if (dateBtn.length > 0) {
        cy.wrap(dateBtn.first()).click({ force: true });
        cy.wait(800);
        cy.get('body').then(($body) => {
          const todayCell = $body.find('[role="gridcell"]:not([aria-disabled="true"]), [data-slot="calendar-day"]:not([disabled])');
          if (todayCell.length > 0) {
            cy.wrap(todayCell.first()).click({ force: true });
          }
        });
        cy.wait(800);
      }
    });

    cy.contains('[data-slot="form-item"]', /tipe pelanggaran/i)
      .find('[role="combobox"], [data-slot="select-trigger"]')
      .click({ force: true });
    cy.wait(1000);
    cy.get('[role="option"], [data-slot="select-item"]').contains(targetTypeName).click({ force: true });
    cy.wait(800);

    cy.get('[role="dialog"]').then(($dialog) => {
      const catInput = $dialog.find('input[name="category"], input[placeholder*="Pelanggaran tata tertib"]');
      if (catInput.length > 0) {
        cy.wrap(catInput.first()).clear({ force: true }).type('Pelanggaran Tata Tertib', { force: true });
        cy.wait(500);
      }
    });

    cy.get('[role="dialog"]').then(($dialog) => {
      const pointInput = $dialog.find('input[name="point"], input[placeholder*="100 - 110"], input[type="number"]');
      if (pointInput.length > 0) {
        cy.wrap(pointInput.first()).clear({ force: true }).type('5', { force: true });
        cy.wait(500);
      }
    });

    cy.get('[role="dialog"]').then(($dialog) => {
      const penaltyInput = $dialog.find('input[name="penalty"], input[placeholder*="Peringatan tertulis"]');
      if (penaltyInput.length > 0) {
        cy.wrap(penaltyInput.first()).clear({ force: true }).type('Peringatan Tertulis', { force: true });
        cy.wait(500);
      }
    });

    cy.wait(2000);
    cy.get('[role="dialog"]').find('button[type="submit"], button:contains("Simpan")').first().click({ force: true });
    cy.wait(3500);

    cy.get('body').then(($body) => {
      if ($body.find('table').length > 0) {
        cy.get('table').should('contain.text', targetTypeName);
        cy.get('td span[data-slot="badge"], td').contains(targetTypeName).should('be.visible');
      }
    });

    ViolationTypePage.visit();
    ViolationTypePage.search(targetTypeName);
    ViolationTypePage.clickDeleteFirstRow();
    ViolationTypePage.confirmDelete();
    cy.wait(2000);

    cy.visit('/student-affairs/violation', { failOnStatusCode: false });
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.wait(2500);
    cy.get('body').then(($body) => {
      if ($body.find('table').length > 0) {
        cy.get('table').should('not.contain.text', targetTypeName);
        cy.get('table tbody td span').contains('-').should('be.visible');
      }
    });
  });
});
`
  }
];

specs.forEach(spec => {
  const filePath = path.join(dir, `${spec.id}.cy.js`);
  fs.writeFileSync(filePath, spec.code);
  console.log(`Created ${filePath}`);
});

console.log('Successfully generated all 57 PGT-18 spec files.');
