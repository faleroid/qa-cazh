import InventoryCategoryPage from '../pages/InventoryCategoryPage';
import testData from '../fixtures/inventoryCategoryData.json';

describe('PGT-17 - Kategori Inventaris (Combined Suite POM)', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.1 Isi form Tambah Kategori Inventaris dengan data valid (pilih Instansi + isi Nama Kategori) -> klik Simpan', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.fillModalForm({ instansiIndex: 0, namaKategori: testData.validData.kategoriBaru });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
    InventoryCategoryPage.elements.toastMessage().should('be.visible').and('contain.text', 'berhasil');
    cy.contains(testData.validData.kategoriBaru, { timeout: 10000 }).should('be.visible');
  });

  it('PGT-17.2 Klik btn 'Tambah Kategori Inventaris' di halaman list', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.elements.formModal().should('be.visible');
    InventoryCategoryPage.elements.modalInstansiDropdown().should('exist');
    InventoryCategoryPage.elements.modalNamaInput().should('exist');
    InventoryCategoryPage.elements.modalSaveBtn().should('exist');
    InventoryCategoryPage.elements.modalCancelBtn().should('exist');
  });

  it('PGT-17.3 Cek placeholder field Instansi', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.elements.modalInstansiValue().invoke('text').should('match', /pilih instansi|select institution/i);
  });

  it('PGT-17.4 Cek placeholder field Nama Kategori', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.elements.modalNamaInput().invoke('attr', 'placeholder').should('match', /contoh:|example:/i);
  });

  it('PGT-17.5 Isi form -> klik btn Batal/Cancel', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.fillModalForm({ instansiIndex: 0, namaKategori: 'Test Batal' });
    InventoryCategoryPage.cancelForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
  });

  it('PGT-17.6 Kosongkan Instansi (Nama Kategori terisi) -> klik Simpan', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.fillModalForm({ namaKategori: testData.validData.kategoriBaru });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.validationError().contains(new RegExp(testData.validationMessages.instansiRequired, 'i')).should('be.visible');
  });

  it('PGT-17.7 Pilih Instansi tapi kosongkan Nama Kategori -> klik Simpan', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.fillModalForm({ instansiIndex: 0, namaKategori: '' });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.validationError().contains(new RegExp(testData.validationMessages.kategoriRequired, 'i')).should('be.visible');
  });

  it('PGT-17.8 Klik Simpan tanpa isi field apapun', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.validationError().should('have.length.at.least', 1);
  });

  it('PGT-17.9 Buka dropdown Instansi', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.elements.modalInstansiDropdown().click({ force: true });
    InventoryCategoryPage.elements.selectOptions().should('have.length.at.least', 1);
  });

  it('PGT-17.10 Load halaman list Kategori Inventaris', () => {
    InventoryCategoryPage.elements.tableHeaderNodes().contains(/dibuat pada/i).should('be.visible');
    InventoryCategoryPage.elements.tableHeaderNodes().contains(/instansi/i).should('be.visible');
    InventoryCategoryPage.elements.tableHeaderNodes().contains(/nama kategori/i).should('be.visible');
  });

  it('PGT-17.11 Cek Aksi di setiap row', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.elements.rowEditBtn().should('exist');
    InventoryCategoryPage.elements.rowDeleteBtn().should('exist');
  });

  it('PGT-17.12 Cek format kolom Tanggal Dibuat', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.elements.tableRows().first().find('td').invoke('text').should('match', /[a-zA-Z]+, \d{1,2} [a-zA-Z]{3} \d{4} \d{2}:\d{2}/);
  });

  it('PGT-17.13 Buka halaman list Kategori Inventaris saat belum ada data', () => {
    InventoryCategoryPage.search('TIDAK_AKAN_ADA_DATA_12345');
    InventoryCategoryPage.elements.emptyState().should('be.visible');
  });

  it('PGT-17.14 Tambah beberapa kategori -> reload halaman', () => {
    InventoryCategoryPage.ensureDataExists();
    cy.reload();
    InventoryCategoryPage.elements.tableRows().should('be.visible');
  });

  it('PGT-17.15 Klik sort arrow icon di header kolom (misal Nama Kategori) 1x', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.elements.sortArrowBtn('Nama Kategori').click({ force: true });
  });

  it('PGT-17.16 Klik sort arrow icon di kolom yang sudah ascending -> 2x lagi (total 2 klik)', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.elements.sortArrowBtn('Nama Kategori').click({ force: true }).click({ force: true });
  });

  it('PGT-17.17 Klik sort arrow icon 3x di 1 kolom', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.elements.sortArrowBtn('Nama Kategori').click({ force: true }).click({ force: true }).click({ force: true });
  });

  it('PGT-17.18 Aktifkan sort di kolom A (ascending/descending) -> klik sort arrow di kolom B', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.elements.sortArrowBtn('Instansi').click({ force: true });
    InventoryCategoryPage.elements.sortArrowBtn('Nama Kategori').click({ force: true });
  });

  it('PGT-17.19 Cek default value Pagination Page Size Selector', () => {
    InventoryCategoryPage.elements.pageSizeDropdown().invoke('text').should('contain', '10');
  });

  it('PGT-17.20 Klik dropdown Pagination Page Size Selector', () => {
    InventoryCategoryPage.elements.pageSizeDropdown().click({ force: true });
    InventoryCategoryPage.elements.selectOptions().should('have.length', 5);
  });

  it('PGT-17.21 Ganti page size dari 10 ke 50/100/500/1000 (test salah satu, misal 50)', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.changePageSize(50);
    InventoryCategoryPage.elements.pageSizeDropdown().invoke('text').should('contain', '50');
  });

  it('PGT-17.22 Cek placeholder + icon di Search input field', () => {
    InventoryCategoryPage.elements.searchInput().invoke('attr', 'placeholder').should('match', /cari|search/i);
  });

  it('PGT-17.23 Klik Search input field', () => {
    InventoryCategoryPage.elements.searchInput().click().should('have.focus');
  });

  it('PGT-17.24 Ketik keyword yang match dengan Nama Kategori existing', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.search('Dummy');
    InventoryCategoryPage.elements.tableRows().should('have.length.at.least', 1);
  });

  it('PGT-17.25 Ketik keyword yang tidak match ('xyz123abc')', () => {
    InventoryCategoryPage.search(testData.search.invalidKeyword);
    InventoryCategoryPage.elements.emptyState().should('be.visible');
  });

  it('PGT-17.26 Klik btn 'Filter' di halaman list', () => {
    InventoryCategoryPage.elements.filterInstansiSelect().should('be.visible');
  });

  it('PGT-17.27 Buka dropdown Instansi di filter -> pilih 1 instansi -> klik btn 'Terapkan'', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.elements.filterInstansiSelect().click({ force: true });
    InventoryCategoryPage.elements.selectOptions().last().click({ force: true });
    cy.wait(1000); 
    InventoryCategoryPage.elements.tableRows().should('exist');
  });

  it('PGT-17.28 Klik btn 'Bersihkan' di samping filter aktif', () => {
    InventoryCategoryPage.elements.filterInstansiSelect().click({ force: true });
    InventoryCategoryPage.elements.selectOptions().last().click({ force: true });
    cy.wait(1000);
    InventoryCategoryPage.elements.filterClearBtnInList().should('be.visible').click({ force: true });
    InventoryCategoryPage.elements.filterClearBtnInList().should('not.exist');
  });

  it('PGT-17.29 Buka dropdown filter -> klik area page di luar dropdown', () => {
    InventoryCategoryPage.elements.filterInstansiSelect().click({ force: true });
    cy.get('[role="listbox"], [data-slot="select-content"]').should('be.visible');
    cy.get('body').type('{esc}');
    cy.get('[role="listbox"], [data-slot="select-content"]').should('not.exist');
  });

  it('PGT-17.30 Buka dropdown filter -> klik btn 'Terapkan' TANPA pilih instansi', () => {
    cy.log('Terapkan button is not used in this direct-select implementation.');
  });

  it('PGT-17.31 Klik icon Edit di row kategori inventaris', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.clickEditFirstRow();
    InventoryCategoryPage.elements.formModal().should('be.visible');
    InventoryCategoryPage.elements.modalNamaInput().invoke('val').should('not.be.empty');
  });

  it('PGT-17.32 Ubah Nama Kategori -> klik Simpan', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.clickEditFirstRow();
    InventoryCategoryPage.fillModalForm({ namaKategori: testData.validData.kategoriUpdate });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
    InventoryCategoryPage.elements.toastMessage().should('be.visible').and('contain.text', 'berhasil');
  });

  it('PGT-17.33 Ubah Instansi di popup Edit (pilih instansi lain) -> klik Simpan', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.clickEditFirstRow();
    InventoryCategoryPage.fillModalForm({ instansiIndex: 1 });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
  });

  it('PGT-17.34 Ubah field di popup Edit -> klik btn Batal', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.clickEditFirstRow();
    InventoryCategoryPage.fillModalForm({ namaKategori: 'Batal Update' });
    InventoryCategoryPage.cancelForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
  });

  it('PGT-17.35 Kosongkan Nama Kategori di Edit -> klik Simpan', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.clickEditFirstRow();
    InventoryCategoryPage.fillModalForm({ namaKategori: '' });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.validationError().should('be.visible');
  });

  it('PGT-17.36 Kosongkan Instansi di Edit (uncheck dropdown selection) -> klik Simpan', () => {
    cy.log('Not applicable if Select does not have a clear button without custom logic');
  });

  it('PGT-17.37 Klik icon Hapus di row kategori inventaris', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.clickDeleteFirstRow();
    InventoryCategoryPage.elements.deleteModal().should('be.visible');
    InventoryCategoryPage.elements.deleteConfirmBtn().should('be.visible');
  });

  it('PGT-17.38 Cek styling btn Hapus di popup', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.clickDeleteFirstRow();
    InventoryCategoryPage.elements.deleteConfirmBtn().should('have.class', 'bg-destructive');
  });

  it('PGT-17.39 Klik btn 'Hapus' di popup', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.clickDeleteFirstRow();
    InventoryCategoryPage.confirmDelete();
    InventoryCategoryPage.elements.deleteModal().should('not.exist');
    InventoryCategoryPage.elements.toastMessage().should('be.visible').and('contain.text', 'berhasil dihapus');
  });

  it('PGT-17.40 Klik icon Close (X) di pojok kanan atas popup Hapus', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.clickDeleteFirstRow();
    InventoryCategoryPage.cancelDeleteByX();
    InventoryCategoryPage.elements.deleteModal().should('not.exist');
  });

  it('PGT-17.41 Buka popup Hapus -> tekan Esc di keyboard', () => {
    InventoryCategoryPage.ensureDataExists();
    InventoryCategoryPage.clickDeleteFirstRow();
    cy.get('body').type('{esc}');
    InventoryCategoryPage.elements.deleteModal().should('not.exist');
  });

  it('PGT-17.42 Search sampai hasil tinggal 1 row -> hapus row tersebut', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.fillModalForm({ instansiIndex: 0, namaKategori: 'Data Khusus Hapus 42' });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
    cy.wait(1000);
    InventoryCategoryPage.search('Data Khusus Hapus 42');
    InventoryCategoryPage.elements.tableRows().should('have.length', 1);
    InventoryCategoryPage.clickDeleteFirstRow();
    InventoryCategoryPage.confirmDelete();
    InventoryCategoryPage.elements.emptyState().should('be.visible');
  });

});
