import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-11.18 - Ubah Nama Kegiatan atau Deskripsi, klik Simpan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.18: Form Edit → Ubah Nama Kegiatan & Deskripsi → Klik Simpan → Data ter-update & pesan success muncul', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('tbody tr').first().find('svg.lucide-square-pen').closest('button').click({ force: true });
    cy.wait(1000);

    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="name"], input[type="text"]').first().clear().type(testData.editActivity.name);
      cy.contains('button', /simpan|submit/i).click({ force: true });
    });

    // 1. Verifikasi pesan success Sonner Toast (Berhasil memperbarui Kegiatan)
    cy.get('[data-sonner-toast][data-type="success"]', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Berhasil memperbarui Kegiatan');

    // 2. Verifikasi data ter-update di baris tabel
    cy.get('tbody tr', { timeout: 15000 }).should('contain.text', testData.editActivity.name);
  });
});
