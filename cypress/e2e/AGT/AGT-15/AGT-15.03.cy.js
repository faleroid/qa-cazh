import SpmbLandingPage from '../../../pages/SpmbLandingPage';
describe('AGT-15.3: Landingpage SPMB Instansi', () => { it('terbuka dari Instansi valid, bukan Academy Cazh atau Academy QA Engineer', () => { SpmbLandingPage.visitPartner(); SpmbLandingPage.clickApply(); SpmbLandingPage.clickInstitutionApply(); SpmbLandingPage.assertInstanceUrl(); }); });
