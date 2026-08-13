import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.27 - Informasi Row Data Lembaga', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.27: Cek informasi setiap row di list Data Lembaga', () => {
    DashboardPage.verifyInstitutionDataRowInfo();
  });
});
