import SpmbLandingPage from '../../../pages/SpmbLandingPage';
describe('AGT-15.8: Formulir SPMB', () => { it('tampil saat kuota tersedia', () => { SpmbLandingPage.visitInstance(); SpmbLandingPage.clickApply(); SpmbLandingPage.assertRegistrationForm(); }); });
