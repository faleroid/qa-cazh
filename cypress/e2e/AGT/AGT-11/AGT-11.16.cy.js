import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.16 - Klik tombol Batal pada form Tambah Kegiatan', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.16: Buka form Tambah Kegiatan → Klik Batal → Form menutup tanpa menyimpan data', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.contains('button', /tambah kegiatan|tambah progres/i).click({ force: true });
    cy.wait(1000);

    cy.contains('[role="dialog"] button', 'Batal').click({ force: true });
    cy.wait(800);
    cy.get('[role="dialog"]').should('not.exist');
  });
});
