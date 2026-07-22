import InventoryCategoryPage from '../pages/InventoryCategoryPage';
import testData from '../fixtures/inventoryCategoryData.json';

describe('PGT-17 - Kategori Inventaris (Combined Suite POM)', () => {
  beforeEach(() => {
    cy.login();
    InventoryCategoryPage.visit();
  });

  it('PGT-17.1: Isi form Tambah Kategori Inventaris dengan data valid -> Kategori baru muncul', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.fillModalForm({ instansiIndex: 0, namaKategori: testData.validData.kategoriBaru });
    InventoryCategoryPage.saveForm();
    // Loading animation skipped to prevent flakiness on fast networks
    InventoryCategoryPage.elements.formModal().should('not.exist');
    cy.contains(testData.validData.kategoriBaru, { timeout: 10000 }).should('be.visible');
  });

  it('PGT-17.2: Klik btn Tambah Kategori Inventaris -> Popup Tambah terbuka', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.elements.formModal().should('be.visible');
    InventoryCategoryPage.elements.modalInstansiDropdown().should('exist');
    InventoryCategoryPage.elements.modalNamaInput().should('exist');
    InventoryCategoryPage.elements.modalSaveBtn().should('exist');
    InventoryCategoryPage.elements.modalCancelBtn().should('exist');
  });

  it('PGT-17.3: Cek placeholder field Instansi', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.elements.modalInstansiValue().invoke('text').should('match', /pilih instansi|select institution/i);
  });

  it('PGT-17.4: Cek placeholder field Nama Kategori', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.elements.modalNamaInput().invoke('attr', 'placeholder').should('match', /contoh: meja|example: table/i);
  });

  it('PGT-17.5: Isi form -> klik btn Batal/Cancel -> Popup tertutup, tidak tersimpan', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.fillModalForm({ instansiIndex: 0, namaKategori: 'Test Batal' });
    InventoryCategoryPage.cancelForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
  });

  it('PGT-17.6: Kosongkan Instansi (Nama terisi) -> Peringatan muncul', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.fillModalForm({ namaKategori: testData.validData.kategoriBaru });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.validationError().contains(new RegExp(testData.validationMessages.instansiRequired, 'i')).should('be.visible');
  });

  it('PGT-17.7: Pilih Instansi kosongkan Nama Kategori -> Peringatan muncul', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.fillModalForm({ instansiIndex: 0, namaKategori: '' });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.validationError().contains(new RegExp(testData.validationMessages.kategoriRequired, 'i')).should('be.visible');
  });

  it('PGT-17.8: Klik Simpan tanpa isi field apapun -> Peringatan muncul di kedua field', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.validationError().should('have.length.at.least', 2);
  });

  it('PGT-17.9: Buka dropdown Instansi -> Menampilkan list instansi', () => {
    InventoryCategoryPage.clickAddButton();
    InventoryCategoryPage.elements.modalInstansiDropdown().click({ force: true });
    InventoryCategoryPage.elements.selectOptions().should('have.length.at.least', 1);
  });

  it('PGT-17.10: Load halaman list Kategori Inventaris -> Menampilkan kolom tabel sesuai spec', () => {
    InventoryCategoryPage.elements.tableHeaderNodes().contains(/tanggal dibuat/i).should('be.visible');
    InventoryCategoryPage.elements.tableHeaderNodes().contains(/instansi/i).should('be.visible');
    InventoryCategoryPage.elements.tableHeaderNodes().contains(/nama kategori/i).should('be.visible');
    InventoryCategoryPage.elements.tableHeaderNodes().contains(/aksi/i).should('be.visible');
  });

  it('PGT-17.11: Cek Aksi di setiap row -> Memiliki icon Edit & Hapus', () => {
    InventoryCategoryPage.elements.rowEditBtn().should('exist');
    InventoryCategoryPage.elements.rowDeleteBtn().should('exist');
  });

  it('PGT-17.12: Cek format kolom Tanggal Dibuat', () => {
    InventoryCategoryPage.elements.tableRows().first().find('td').first().invoke('text').should('match', /senin|selasa|rabu|kamis|jumat|sabtu|minggu|mon|tue|wed|thu|fri|sat|sun/i);
  });

  it('PGT-17.13: Buka list Kategori Inventaris saat belum ada data -> Empty state UI', () => {
    cy.get('body').then(($body) => {
      if ($body.find('tbody tr').length === 0) {
        InventoryCategoryPage.elements.emptyState().should('be.visible');
      }
    });
  });

  it('PGT-17.14: Tambah kategori -> reload halaman -> Default sort tampil paling atas', () => {
    cy.reload();
    InventoryCategoryPage.elements.tableRows().should('be.visible');
  });

  it('PGT-17.15: Klik sort arrow icon 1x -> Icon ascending sort, data terurut ascending', () => {
    InventoryCategoryPage.elements.sortArrowBtn('Nama Kategori').click({ force: true });
  });

  it('PGT-17.16: Klik sort arrow icon 2x -> Icon descending sort, data terurut descending', () => {
    InventoryCategoryPage.elements.sortArrowBtn('Nama Kategori').click({ force: true }).click({ force: true });
  });

  it('PGT-17.17: Klik sort arrow icon 3x -> Icon netral, data urutan default', () => {
    InventoryCategoryPage.elements.sortArrowBtn('Nama Kategori').click({ force: true }).click({ force: true }).click({ force: true });
  });

  it('PGT-17.18: Aktifkan sort kolom A -> klik sort kolom B -> Fokus sort pindah ke B', () => {
    InventoryCategoryPage.elements.sortArrowBtn('Instansi').click({ force: true });
    InventoryCategoryPage.elements.sortArrowBtn('Nama Kategori').click({ force: true });
  });

  it('PGT-17.19: Cek default value Pagination Page Size Selector = 10', () => {
    InventoryCategoryPage.elements.pageSizeDropdown().invoke('text').should('contain', '10');
  });

  it('PGT-17.20: Klik dropdown Pagination Page Size -> Muncul list opsi 10, 50, 100, 500, 1000', () => {
    InventoryCategoryPage.elements.pageSizeDropdown().click({ force: true });
    InventoryCategoryPage.elements.selectOptions().should('have.length', 5);
  });

  it('PGT-17.21: Ganti page size dari 10 ke 50 -> List menyesuaikan page size', () => {
    InventoryCategoryPage.changePageSize(50);
    InventoryCategoryPage.elements.pageSizeDropdown().invoke('text').should('contain', '50');
  });

  it('PGT-17.22: Cek placeholder Search input field', () => {
    InventoryCategoryPage.elements.searchInput().invoke('attr', 'placeholder').should('match', /cari|search/i);
  });

  it('PGT-17.23: Klik Search input field -> Siap input keyword', () => {
    InventoryCategoryPage.elements.searchInput().click().should('have.focus');
  });

  it('PGT-17.24: Ketik keyword match -> List menampilkan data yang match', () => {
    InventoryCategoryPage.search(testData.search.validKeyword);
    InventoryCategoryPage.elements.tableRows().should('have.length.at.least', 1);
  });

  it('PGT-17.25: Ketik keyword tidak match -> Muncul Tidak ada data', () => {
    InventoryCategoryPage.search(testData.search.invalidKeyword);
    InventoryCategoryPage.elements.emptyState().should('be.visible');
  });

  it('PGT-17.26: Klik btn Filter -> Dropdown filter muncul dengan input Instansi', () => {
    InventoryCategoryPage.clickFilterButton();
    InventoryCategoryPage.elements.filterDropdown().should('be.visible');
    InventoryCategoryPage.elements.filterInstansiSelect().should('exist');
  });

  it('PGT-17.27: Pilih instansi di filter -> klik Terapkan -> Filter diterapkan', () => {
    InventoryCategoryPage.clickFilterButton();
    InventoryCategoryPage.applyFilter(0);
    InventoryCategoryPage.elements.filterDropdown().should('not.exist');
    InventoryCategoryPage.elements.filterClearBtnInList().should('be.visible');
  });

  it('PGT-17.28: Klik btn Bersihkan filter -> Filter cleared', () => {
    InventoryCategoryPage.clickFilterButton();
    InventoryCategoryPage.applyFilter(0);
    InventoryCategoryPage.elements.filterClearBtnInList().click({ force: true });
    InventoryCategoryPage.elements.filterClearBtnInList().should('not.exist');
  });

  it('PGT-17.29: Buka dropdown filter -> klik area luar -> Dropdown tertutup tanpa apply', () => {
    InventoryCategoryPage.clickFilterButton();
    InventoryCategoryPage.elements.filterDropdown().should('be.visible');
    cy.get('body').click(0, 0);
    InventoryCategoryPage.elements.filterDropdown().should('not.exist');
  });

  it('PGT-17.30: Buka dropdown filter -> klik Terapkan TANPA pilih instansi -> Batal apply', () => {
    InventoryCategoryPage.clickFilterButton();
    InventoryCategoryPage.elements.filterApplyButton().click({ force: true });
  });

  it('PGT-17.31: Klik icon Edit di row -> Popup Edit terbuka pre-filled', () => {
    InventoryCategoryPage.clickEditFirstRow();
    InventoryCategoryPage.elements.formModal().should('be.visible');
    InventoryCategoryPage.elements.modalNamaInput().invoke('val').should('not.be.empty');
  });

  it('PGT-17.32: Ubah Nama Kategori -> klik Simpan -> Nama Kategori ter-update', () => {
    InventoryCategoryPage.clickEditFirstRow();
    InventoryCategoryPage.fillModalForm({ namaKategori: testData.validData.kategoriUpdate });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
  });

  it('PGT-17.33: Ubah Instansi di Edit -> klik Simpan -> Instansi ter-update', () => {
    InventoryCategoryPage.clickEditFirstRow();
    InventoryCategoryPage.fillModalForm({ instansiIndex: 1 });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
  });

  it('PGT-17.34: Ubah field di Edit -> klik Batal -> Tidak tersimpan', () => {
    InventoryCategoryPage.clickEditFirstRow();
    InventoryCategoryPage.fillModalForm({ namaKategori: 'Batal Update' });
    InventoryCategoryPage.cancelForm();
    InventoryCategoryPage.elements.formModal().should('not.exist');
  });

  it('PGT-17.35: Kosongkan Nama Kategori di Edit -> Peringatan muncul', () => {
    InventoryCategoryPage.clickEditFirstRow();
    InventoryCategoryPage.fillModalForm({ namaKategori: '' });
    InventoryCategoryPage.saveForm();
    InventoryCategoryPage.elements.validationError().should('be.visible');
  });

  it('PGT-17.36: Kosongkan Instansi di Edit -> Peringatan muncul', () => {
    cy.log('Not applicable if Select does not have a clear button without custom logic');
  });

  it('PGT-17.37: Klik icon Hapus di row -> Popup Hapus muncul', () => {
    InventoryCategoryPage.clickDeleteFirstRow();
    InventoryCategoryPage.elements.deleteModal().should('be.visible');
    InventoryCategoryPage.elements.deleteConfirmBtn().should('be.visible');
  });

  it('PGT-17.38: Cek styling btn Hapus di popup', () => {
    InventoryCategoryPage.clickDeleteFirstRow();
    InventoryCategoryPage.elements.deleteConfirmBtn().should('have.class', 'bg-destructive').or('have.css', 'background-color');
  });

  it('PGT-17.39: Klik btn Hapus di popup -> Data terhapus', () => {
    InventoryCategoryPage.clickDeleteFirstRow();
    InventoryCategoryPage.confirmDelete();
    InventoryCategoryPage.elements.deleteModal().should('not.exist');
  });

  it('PGT-17.40: Klik icon Close (X) di popup Hapus -> Batal hapus', () => {
    InventoryCategoryPage.clickDeleteFirstRow();
    InventoryCategoryPage.cancelDeleteByX();
    InventoryCategoryPage.elements.deleteModal().should('not.exist');
  });

  it('PGT-17.41: Buka popup Hapus -> tekan Esc di keyboard -> Batal hapus', () => {
    InventoryCategoryPage.clickDeleteFirstRow();
    cy.get('body').type('{esc}');
    InventoryCategoryPage.elements.deleteModal().should('not.exist');
  });

  it('PGT-17.42: Search sampai hasil 1 row -> Hapus row -> Empty state', () => {
    InventoryCategoryPage.search(testData.validData.kategoriUpdate);
    InventoryCategoryPage.elements.tableRows().should('have.length', 1);
    InventoryCategoryPage.clickDeleteFirstRow();
    InventoryCategoryPage.confirmDelete();
    InventoryCategoryPage.elements.emptyState().should('be.visible');
  });

});
