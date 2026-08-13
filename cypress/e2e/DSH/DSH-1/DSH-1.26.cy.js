import DashboardPage from '../../../pages/DashboardPage';

describe('DSH-1.26 - Title & Deskripsi Data Lembaga', () => {
  beforeEach(() => {
    cy.login();
    DashboardPage.visitDashboard();
  });

  it('DSH-1.26: Cek title & deskripsi section Data Lembaga', () => {
    DashboardPage.verifyInstitutionDataTitleAndDesc();
  });
});
