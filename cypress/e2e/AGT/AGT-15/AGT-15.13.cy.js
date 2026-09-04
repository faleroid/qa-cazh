import SpmbLandingPage from '../../../pages/SpmbLandingPage';
describe('AGT-15.13: Range tanggal', () => { it('menampilkan tanggal mulai dan selesai', () => { SpmbLandingPage.visitInstance(); SpmbLandingPage.assertDateRange(); }); });
