import LegalityPage from '../../../pages/LegalityPage';
import testData from '../../../fixtures/legalityData.json';

describe('PGT-16.1 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.1: Buka submenu Legalitas Bukti Bayar -> Modal Legalitas terbuka', () => {
    LegalityPage.elements.dialogContainer().should('be.visible');
    LegalityPage.elements.dialogTitle().should('be.visible');
    LegalityPage.elements.instansiDropdown().should('exist');
  });
});
