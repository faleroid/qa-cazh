import SpmbLandingPage from '../../../pages/SpmbLandingPage';
describe('AGT-15.11: Jadwal dan Biaya', () => { it('menampilkan jadwal, tanggal, dan biaya', () => { SpmbLandingPage.visitInstance(); SpmbLandingPage.assertScheduleAndFees(); }); });
