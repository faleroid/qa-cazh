import SpmbLandingPage from '../../../pages/SpmbLandingPage';
describe('AGT-15.7: Kuota tersedia', () => { it('menampilkan kuota dan tombol aktif', () => { SpmbLandingPage.visitInstance(); SpmbLandingPage.assertAvailableQuota(); }); });
