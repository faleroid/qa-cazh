import SpmbLandingPage from '../../../pages/SpmbLandingPage';
describe('AGT-15.12: Nama Jadwal', () => { it('menampilkan nama jadwal', () => { SpmbLandingPage.visitInstance(); SpmbLandingPage.assertScheduleName(); }); });
