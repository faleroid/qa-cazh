import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-14.22: Ubah salah satu field, klik Simpan', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.22: Ubah salah satu field, klik Simpan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();

    // 1. Pastikan data prestasi ada di tabel
    StudentDetailPage.ensurePrestasiDataExists();
    cy.wait(1000);

    // 2. Klik tombol Edit pada baris pertama
    cy.get('tbody tr', { timeout: 15000 }).first().then(($row) => {
      const editBtn = $row.find('button[data-slot="dialog-trigger"], button[aria-haspopup="dialog"], button:has(svg.lucide-square-pen), button:contains("Edit")');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).scrollIntoView({ offset: { top: -100, left: 0 } }).click();
      } else {
        cy.wrap($row.find('button').first()).scrollIntoView().click();
      }
    });

    cy.wait(1000);
    cy.get('[role="dialog"]', { timeout: 15000 }).should('be.visible');

    // 3. Ubah salah satu field (misal: Deskripsi)
    const updatedDesc = 'Meraih juara lomba pentas seni tingkat kota (Diubah)';
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="description"], textarea[name="description"]')
        .first()
        .clear({ force: true })
        .type(updatedDesc, { force: true });
      cy.wait(300);

      // 4. Klik tombol Simpan
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    // 5. Verifikasi modal tertutup dan data ter-update di tabel
    cy.wait(2000);
    cy.get('[role="dialog"]', { timeout: 15000 }).should('not.exist');
    cy.get('body').should('contain.text', 'Diubah');
  });
});
