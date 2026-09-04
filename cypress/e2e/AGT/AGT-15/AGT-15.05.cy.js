import SpmbLandingPage from '../../../pages/SpmbLandingPage';
describe('AGT-15.5: Beranda SPMB', () => { it('menampilkan konten utama', () => { SpmbLandingPage.visitInstance(); SpmbLandingPage.assertHomeSection(); }); });
