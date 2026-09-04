import SpmbLandingPage from '../../../pages/SpmbLandingPage';
describe('AGT-15.19: Persyaratan kosong', () => { it('menampilkan empty state persyaratan', () => { SpmbLandingPage.visitInstance(); SpmbLandingPage.assertRequirementsEmptyState(); }); });
