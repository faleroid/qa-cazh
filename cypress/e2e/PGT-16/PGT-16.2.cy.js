import LegalityPage from '../../pages/LegalityPage';
import testData from '../../fixtures/legalityData.json';

describe('PGT-16.2 - Legalitas Bukti Bayar', () => {
  beforeEach(() => {
    cy.login();
    LegalityPage.openModal();
  });

  it('PGT-16.2: Buka dropdown Instansi -> Placeholder "Pilih instansi terlebih dahulu" & List instansi muncul', () => {
    LegalityPage.elements.instansiDropdownValue().should('contain.text', 'Pilih instansi terlebih dahulu');
    LegalityPage.elements.instansiDropdown().click({ force: true });
    LegalityPage.elements.selectOptions().should('have.length.at.least', 1);
  });
});
