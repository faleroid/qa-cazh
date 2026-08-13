import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.28 - Klik Icon Detail Row Lembaga', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.28: Klik Icon Detail di row lembaga', () => {
    DashboardPage.clickInstitutionDetailIcon(0);
  });
});
