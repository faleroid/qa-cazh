import SpmbLandingPage from '../../../pages/SpmbLandingPage';
describe('AGT-15.1: Landingpage partner', () => { it('menampilkan semua section sesuai konfigurasi', () => { SpmbLandingPage.visitPartner(); SpmbLandingPage.assertPartnerSections(); }); });
