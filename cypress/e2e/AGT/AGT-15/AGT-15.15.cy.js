import SpmbLandingPage from '../../../pages/SpmbLandingPage';
describe('AGT-15.15: Harga per jurusan', () => { it('menampilkan jurusan dan harga', () => { SpmbLandingPage.visitInstance(); SpmbLandingPage.assertPricePerMajor(); }); });
