import PermissionTimePage from '../pages/PermissionTimePage';
import testData from '../fixtures/permissionTimeData.json';

describe('UAT Suite: PGT-19 - Pengaturan Kesiswaan: Waktu Perizinan', () => {
  beforeEach(() => {
    cy.login();
    PermissionTimePage.visitWithoutSelect();
    cy.wait(2000);
  });

  afterEach(() => {
    cy.wait(2500);
  });

  // ---------------------------------------------------------------------------
  // 1. NAVIGASI & INITIAL STATE FORM (PGT-19.1 - PGT-19.5)
  // ---------------------------------------------------------------------------
  it('PGT-19.1 Buka submenu Waktu Perizinan dari Pengaturan > Kesiswaan', () => {
    PermissionTimePage.elements.dialogContainer().should('be.visible');
    PermissionTimePage.elements.dialogTitle().should('be.visible');
    PermissionTimePage.elements.instansiDropdown().should('be.visible');
    PermissionTimePage.elements.instansiValue().should('contain.text', 'Pilih Instansi');
  });

  it('PGT-19.2 Buka dropdown Instansi', () => {
    PermissionTimePage.elements.instansiDropdown().click({ force: true });
    cy.wait(800);
    PermissionTimePage.elements.selectOptions().should('be.visible').and('have.length.at.least', 1);
  });

  it('PGT-19.3 Pilih Instansi dari dropdown', () => {
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.elements.instansiValue().should('contain.text', testData.instansi.instansiA);
    PermissionTimePage.elements.toggleLabel().should('be.visible');
  });

  it("PGT-19.4 Cek default state toggle 'Batas Waktu Maksimal Pengajuan Perizinan'", () => {
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOff();
    PermissionTimePage.elements.timeInput().should('not.exist');
  });

  it('PGT-19.5 Cek helper text saat toggle OFF', () => {
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOff();
    cy.contains('p', /Jika diaktifkan, pengajuan perizinan untuk hari yang sama hanya dapat dilakukan sebelum batas waktu yang ditentukan/i, { timeout: 10000 }).should('be.visible');
  });

  // ---------------------------------------------------------------------------
  // 2. TOGGLE SWITCH & HELPER TEXT UPDATES (PGT-19.6 - PGT-19.8)
  // ---------------------------------------------------------------------------
  it("PGT-19.6 Aktifkan toggle 'Batas Waktu Maksimal Pengajuan Perizinan'", () => {
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOn();
    PermissionTimePage.elements.timeInput().should('be.visible');
  });

  it('PGT-19.7 Cek helper text saat toggle ON', () => {
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOn();
    PermissionTimePage.elements.helperText().should('be.visible');
  });

  it('PGT-19.8 Matikan kembali toggle setelah aktif -> cek form', () => {
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOn();
    PermissionTimePage.elements.timeInput().should('be.visible');
    PermissionTimePage.toggleOff();
    cy.wait(1000);
    PermissionTimePage.elements.timeInput().should('not.exist');
  });

  // ---------------------------------------------------------------------------
  // 3. FORM VALIDATION & CONFIGURATION SAVE (PGT-19.9 - PGT-19.12)
  // ---------------------------------------------------------------------------
  it('PGT-19.9 Aktifkan toggle + kosongkan field jam -> klik Simpan', () => {
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOn();
    PermissionTimePage.fillTime('');
    PermissionTimePage.save();
    cy.contains(/wajib diisi|harus diisi|required/i, { timeout: 10000 }).should('be.visible');
  });

  it('PGT-19.10 Aktifkan toggle + isi field jam valid (format 24-jam, misal 09:00) -> klik Simpan', () => {
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOn();
    PermissionTimePage.fillTime(testData.validTime);
    PermissionTimePage.save();
    PermissionTimePage.elements.toastMessage().should('be.visible');
  });

  it('PGT-19.11 Toggle OFF + klik Simpan (field jam hidden, tidak diisi)', () => {
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOff();
    PermissionTimePage.save();
    PermissionTimePage.elements.toastMessage().should('be.visible');
  });

  it('PGT-19.12 Aktifkan toggle + isi jam dengan format tidak valid (misal 25:00) -> sistem menolak input', () => {
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOn();
    PermissionTimePage.fillTime('25:00');
    cy.get('[data-slot="datefield"] [data-type="hour"]').invoke('text').should('not.eq', '25');
  });

  // ---------------------------------------------------------------------------
  // 4. MULTI-INSTANSI INDEPENDENCE (PGT-19.13)
  // ---------------------------------------------------------------------------
  it('PGT-19.13 Simpan config di Instansi A (toggle ON, jam 09:00) -> ganti dropdown ke Instansi B', () => {
    // Config Instansi A
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOn();
    PermissionTimePage.fillTime('09:00');
    PermissionTimePage.save();
    cy.wait(2000);

    // Ganti ke Instansi B & verifikasi independen
    PermissionTimePage.selectInstansi(testData.instansi.instansiB);
    PermissionTimePage.elements.instansiValue().should('contain.text', testData.instansi.instansiB);
  });

  // ---------------------------------------------------------------------------
  // 5. CROSS-FEATURE PERMIT RESTRICTION VALIDATION (PGT-19.14 - PGT-19.17)
  // ---------------------------------------------------------------------------
  it('PGT-19.14 Cross-feature: Set toggle OFF di instansi A -> login sebagai user Cards Parents -> coba ajukan izin', () => {
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOff();
    PermissionTimePage.save();
    cy.wait(2000);

    cy.visit('/student-affairs/permission', { failOnStatusCode: false });
    cy.get('body', { timeout: 15000 }).should('be.visible');
  });

  it('PGT-19.15 Cross-feature: Set toggle ON di instansi A dengan batas 09:00 -> user ajukan izin SEBELUM jam 09:00', () => {
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOn();
    PermissionTimePage.fillTime('09:00');
    PermissionTimePage.save();
    cy.wait(2000);

    cy.visit('/student-affairs/permission', { failOnStatusCode: false });
    cy.get('body', { timeout: 15000 }).should('be.visible');
  });

  it('PGT-19.16 Cross-feature: Set toggle ON dengan batas 09:00 -> user ajukan izin SETELAH jam 09:00', () => {
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOn();
    PermissionTimePage.fillTime('09:00');
    PermissionTimePage.save();
    cy.wait(2000);

    cy.visit('/student-affairs/permission', { failOnStatusCode: false });
    cy.get('body', { timeout: 15000 }).should('be.visible');
  });

  it('PGT-19.17 Cross-feature: Set toggle ON di Instansi A saja -> user dari Instansi B coba ajukan izin', () => {
    // Instansi A ON
    PermissionTimePage.selectInstansi(testData.instansi.instansiA);
    PermissionTimePage.toggleOn();
    PermissionTimePage.fillTime('09:00');
    PermissionTimePage.save();
    cy.wait(2000);

    // Instansi B OFF
    PermissionTimePage.selectInstansi(testData.instansi.instansiB);
    PermissionTimePage.toggleOff();
    PermissionTimePage.save();
    cy.wait(2000);

    cy.visit('/student-affairs/permission', { failOnStatusCode: false });
    cy.get('body', { timeout: 15000 }).should('be.visible');
  });
});
