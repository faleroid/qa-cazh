import SpmbLandingPage from '../../../pages/SpmbLandingPage';
describe('AGT-15.10: Alur Pendaftaran', () => { it('menampilkan tahapan dan deskripsi', () => { SpmbLandingPage.visitInstance(); SpmbLandingPage.assertAdmissionProcess(); }); });
