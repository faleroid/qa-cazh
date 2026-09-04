import SpmbLandingPage from '../../../pages/SpmbLandingPage';
describe('AGT-15.6: Judul Web Beranda', () => {
  it('sesuai konfigurasi Pengaturan Web PPDB → Beranda', () => {
    cy.login();
    SpmbLandingPage.getPublicHomeTitle().then((publicTitle) => {
      SpmbLandingPage.assertConfiguredTitleMatchesPublic(publicTitle);
    });
  });
});
