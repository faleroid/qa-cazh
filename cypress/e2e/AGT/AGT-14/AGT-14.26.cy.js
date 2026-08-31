import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-14.26: Pada baris data, klik Aksi → Hapus', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.26: Pada baris data, klik Aksi → Hapus', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();

    // 1. Pastikan data prestasi ada di tabel
    StudentDetailPage.ensurePrestasiDataExists();
    cy.wait(1000);

    // 2. Klik tombol Hapus (Ikon Trash) pada baris pertama tabel secara presisi
    cy.get('tbody tr', { timeout: 15000 })
      .first()
      .find('svg.lucide-trash, svg.lucide-trash-2, svg[class*="trash"]')
      .closest('button')
      .scrollIntoView({ offset: { top: -100, left: 0 } })
      .click({ force: true });

    cy.wait(800);

    // 3. Verifikasi popup confirmation delete muncul
    cy.get('[role="alertdialog"], [role="dialog"], [data-slot="alert-dialog-content"], [data-slot="dialog-content"]', { timeout: 15000 })
      .should('be.visible')
      .and(($dialog) => {
        const text = $dialog.text();
        const hasDeleteText = /hapus|delete|yakin|konfirmasi/i.test(text);
        expect(hasDeleteText, 'Popup konfirmasi hapus harus muncul').to.be.true;
      });
  });
});
