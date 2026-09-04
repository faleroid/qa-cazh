import SpmbLandingPage from '../../../pages/SpmbLandingPage';
describe('AGT-15.17: Jadwal belum tersedia', () => { it('menampilkan empty state jadwal', () => { SpmbLandingPage.visitInstance(); SpmbLandingPage.assertNoScheduleEmptyState(); }); });
