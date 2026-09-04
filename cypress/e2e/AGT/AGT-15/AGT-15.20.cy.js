import SpmbLandingPage from '../../../pages/SpmbLandingPage';
describe('AGT-15.20: Informasi', () => { it('menampilkan informasi pendaftaran', () => { SpmbLandingPage.visitInstance(); SpmbLandingPage.assertInformation(); }); });
