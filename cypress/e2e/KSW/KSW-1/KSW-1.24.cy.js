import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.24 - Klik tombol Batal pada form Tambah Progres Kegiatan', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.24: Klik tombol Batal pada form Tambah Progres Kegiatan', () => {
    cy.contains("button", "Tambah Progres Kegiatan").click({ force: true }); cy.contains('[role="dialog"] button', "Batal").click({ force: true });
  });
});
