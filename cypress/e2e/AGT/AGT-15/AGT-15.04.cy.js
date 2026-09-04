import SpmbLandingPage from '../../../pages/SpmbLandingPage';
describe('AGT-15.4: URL langsung SPMB Instansi', () => { it('dapat diakses langsung', () => { SpmbLandingPage.visitInstance(); SpmbLandingPage.assertInstanceUrl(); }); });
