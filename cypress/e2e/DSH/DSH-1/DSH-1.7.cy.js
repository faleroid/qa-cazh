import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.7 - Deskripsi Section Diagram Tunggakan', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.7: Cek deskripsi section Diagram Jumlah Tunggakan', () => {
    DashboardPage.verifyOverdueSectionDescriptionDynamic();
  });
});
