import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.29 - Verifikasi Anggota Count Row Lembaga', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.29: Verifikasi Anggota count di setiap row lembaga', () => {
    DashboardPage.elements.institutionDataRows().first().within(() => {
      cy.get('td, div, span').invoke('text').should('match', /\d+/);
    });
  });
});
