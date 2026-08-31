import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-14.27: Pada popup delete, klik tombol Hapus', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.27: Pada popup delete, klik tombol Hapus', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();

    // 1. Tambahkan 1 data prestasi spesifik untuk dihapus
    const uniqueItem = {
      kategori: 'Prestasi Uji Hapus',
      poin: '20',
      deskripsi: 'Deskripsi uji coba penghapusan prestasi',
      apresiasi: 'Sertifikat Partisipasi',
    };
    StudentDetailPage.addSinglePrestasi(uniqueItem);
    cy.wait(1500);

    // 2. Klik tombol Hapus pada baris data spesifik
    cy.contains('tbody tr', uniqueItem.kategori, { timeout: 15000 })
      .find('svg.lucide-trash, svg.lucide-trash-2, svg[class*="trash"]')
      .closest('button')
      .scrollIntoView({ offset: { top: -100, left: 0 } })
      .click({ force: true });

    cy.wait(800);

    // 3. Pada modal popup delete, klik tombol Hapus / Ya / Konfirmasi
    cy.get('[role="alertdialog"], [role="dialog"], [data-slot="alert-dialog-content"], [data-slot="dialog-content"]').within(() => {
      cy.contains('button[type="submit"], button', /hapus|ya|konfirmasi|delete/i).click({ force: true });
    });

    // 4. Verifikasi popup tertutup dan data terhapus dari tabel
    cy.wait(2000);
    cy.get('[role="alertdialog"], [role="dialog"]', { timeout: 15000 }).should('not.exist');
    cy.get('body').should('not.contain.text', uniqueItem.deskripsi);
  });
});
