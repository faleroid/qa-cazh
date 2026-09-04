import SpmbLandingPage from '../../../pages/SpmbLandingPage';
describe('AGT-15.9: Kuota penuh', () => { it('menutup atau menonaktifkan pendaftaran', () => { SpmbLandingPage.visitInstance(); SpmbLandingPage.assertFullQuotaState(); }); });
