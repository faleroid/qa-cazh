import SpmbLandingPage from '../../../pages/SpmbLandingPage';
describe('AGT-15.14: Harga semua jurusan', () => { it('menampilkan harga dan harga coret', () => { SpmbLandingPage.visitInstance(); SpmbLandingPage.assertSinglePrice(); }); });
