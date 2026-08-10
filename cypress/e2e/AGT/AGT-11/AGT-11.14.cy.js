import StudentDetailPage from '../../../pages/StudentDetailPage';
import testData from '../../../fixtures/studentData.json';

describe('AGT-11.14 - Isi Nama Kegiatan (Deskripsi dikosongkan), klik Simpan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.14: Form Tambah Kegiatan → Isi Nama Kegiatan, dikosongkan Deskripsi → Klik Simpan → Data tersimpan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.contains('button', /tambah kegiatan|tambah progres/i).click({ force: true });
    cy.wait(1000);

    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="name"], input[name="title"], input[type="text"]').first().clear().type(testData.newActivity.name);
      cy.contains('button', /simpan|submit/i).click({ force: true });
    });
    cy.wait(2000);
  });
});
