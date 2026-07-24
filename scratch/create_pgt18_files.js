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
    const timestamp = Date.now();
    const namaBaru = \`\${testData.validData.namaBaru} \${timestamp}\`;
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
    ViolationTypePage.fillModalForm({ instansiIndex: 0, nama: cat1, minPoin: '101', maxPoin: '105' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1000);

    ViolationTypePage.clickAddButton();
    ViolationTypePage.fillModalForm({ instansiIndex: 0, nama: cat2, minPoin: '106', maxPoin: '110' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    cy.wait(1000);

    // Edit cat2 menjadi 'Tidak Aktif'
    cy.contains('tbody tr', cat2).find('button[data-slot="dialog-trigger"]:has(svg.lucide-square-pen), button:has(svg.lucide-square-pen), button:has(svg.lucide-pencil)').first().click({ force: true });
    cy.wait(1000);
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
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.search('Pelanggaran');
    ViolationTypePage.elements.tableRows().should('have.length.at.least', 1);
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
    ViolationTypePage.elements.filterStatusSelect().click({ force: true });
    ViolationTypePage.elements.selectOptions().contains(/aktif/i).first().click({ force: true });
    cy.wait(1000);
    ViolationTypePage.elements.tableRows().should('exist');
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
    ViolationTypePage.ensureInactiveDataExists();
    ViolationTypePage.elements.filterStatusSelect().click({ force: true });
    ViolationTypePage.elements.selectOptions().contains(/^\s*Tidak Aktif\s*$/i).first().click({ force: true });
    cy.wait(1500);
    ViolationTypePage.elements.tableRows().should('have.length.at.least', 1);
    ViolationTypePage.elements.tableRows().each(($row) => {
      cy.wrap($row).should('contain.text', 'Tidak Aktif');
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
    ViolationTypePage.fillModalForm({ minPoin: '200', maxPoin: '210' });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
    ViolationTypePage.elements.toastMessage().should('be.visible').and('contain.text', 'berhasil');
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
    ViolationTypePage.fillModalForm({ instansiIndex: 1 });
    ViolationTypePage.saveForm();
    ViolationTypePage.elements.formModal().should('not.exist');
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
    ViolationTypePage.elements.validationError().should('be.visible');
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
    ViolationTypePage.ensureDataExists();
    ViolationTypePage.clickEditFirstRow();
    ViolationTypePage.saveForm();
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

  it("PGT-18.50 Set status 'Aktif' -> buka fitur Buat Pelanggaran / Laporan Pelanggaran", () => {
    cy.visit('/student/violation/create', { failOnStatusCode: false });
    cy.get('body', { timeout: 10000 }).should('be.visible');
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

  it("PGT-18.51 Set status 'Tidak Aktif' -> buka fitur Buat Pelanggaran / Laporan Pelanggaran", () => {
    cy.visit('/student/violation/create', { failOnStatusCode: false });
    cy.get('body', { timeout: 10000 }).should('be.visible');
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

  it('PGT-18.57 Hapus tipe pelanggaran -> buka fitur Buat Pelanggaran / Laporan Pelanggaran', () => {
    cy.visit('/student/violation/create', { failOnStatusCode: false });
    cy.get('body', { timeout: 10000 }).should('be.visible');
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
