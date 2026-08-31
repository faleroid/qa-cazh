import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-14.9: Cari dengan keyword tidak ditemukan', () => {
  beforeEach(() => {
    cy.login();
    cy.wait(1000);
  });

  it('AGT-14.9: Cari dengan keyword tidak ditemukan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPrestasiTab();
    cy.get('input[placeholder*="Cari"], input[type="search"]').first().clear({ force: true }).type('KeywordRandom99999{enter}', { force: true });
    cy.wait(800);
    cy.get('body').should(($body) => {
      expect($body.text()).to.match(/tidak ditemukan|kosong|belum ada|tidak ada data/i);
    });
  });
});
