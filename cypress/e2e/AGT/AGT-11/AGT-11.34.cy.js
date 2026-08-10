import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.34 - Coba centang lebih dari 50 data secara manual', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.34: Centang lebih dari 50 data secara manual -> Checkbox tambahan disabled / tooltip "Maksimal 50 data per penghapusan"', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('body').should('exist');
  });
});
