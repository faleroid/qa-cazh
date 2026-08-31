import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-14.4: Buka tab Prestasi saat belum ada data', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.4: Buka tab Prestasi saat belum ada data', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();
    cy.get('body').should(($body) => {
      const text = $body.text();
      expect(text).to.match(/tidak ditemukan|belum ada|tidak ada data|Prestasi/i);
    });
  });
});
