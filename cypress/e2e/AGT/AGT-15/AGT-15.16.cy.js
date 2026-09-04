import SpmbLandingPage from '../../../pages/SpmbLandingPage';
describe('AGT-15.16: Harga tanpa diskon', () => { it('tidak menampilkan harga coret menyesatkan', () => { SpmbLandingPage.visitInstance(); SpmbLandingPage.assertNoDiscountRendering(); }); });
