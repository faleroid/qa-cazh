import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.03 - Buka halaman List Progres Kegiatan saat belum ada data', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.03: Buka halaman List Progres Kegiatan saat belum ada data', () => {
    ProgressActivityPage.deleteAllDataIfExists(); ProgressActivityPage.verifyEmptyState();
  });
});
