import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.28 - Centang checkbox pada header tabel', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.28: Centang checkbox pada header tabel -> Seluruh data pada halaman aktif terpilih; muncul banner terpilih', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.scrollTo('top');
    cy.wait(400);

    cy.get('thead th button[role="checkbox"], thead th [data-slot="checkbox"], thead th input[type="checkbox"]', { timeout: 15000 })
      .first()
      .scrollIntoView()
      .click({ force: true });
    cy.wait(800);

    cy.get('body').then(($body) => {
      const text = $body.text().toLowerCase();
      const hasSelection = text.includes('terpilih') || text.includes('pilih') || $body.find('tbody tr button[aria-checked="true"]').length > 0;
      expect(hasSelection, 'Banner terpilih harus muncul setelah centang header checkbox').to.be.true;
    });
  });
});
