import SpmbLandingPage from '../../../pages/SpmbLandingPage';
describe('AGT-15.2: Daftar Instansi SPMB', () => { it('menampilkan daftar Instansi', () => { SpmbLandingPage.visitPartner(); SpmbLandingPage.clickApply(); SpmbLandingPage.assertInstitutionList(); }); });
