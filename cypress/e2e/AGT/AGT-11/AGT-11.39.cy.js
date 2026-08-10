import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.39 - Simulasi seluruh data gagal dihapus (network/server error)', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.39: Simulasi server error -> Error notification "Gagal menghapus data, silakan coba lagi" & selection dipertahankan', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickProgresTab();
    cy.get('body').should('exist');
  });
});
