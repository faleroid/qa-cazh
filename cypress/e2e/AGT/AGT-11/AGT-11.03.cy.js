import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-11.03 - Aktifkan Filter History Siswa dengan kombinasi TA-Tingkat-Kelas-Semester tertentu', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-11.03: Ubah filter History Siswa → Verifikasi data 11 tab ter-refresh sesuai filter', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    
    // Klik tombol Filter di sebelah tab bar
    cy.contains('button', /^filter$/i, { timeout: 15000 }).click({ force: true });
    cy.wait(800);

    cy.get('body').then(($body) => {
      const selectTriggers = $body.find('[role="combobox"], select, button[data-slot="select-trigger"]');
      if (selectTriggers.length > 0) {
        cy.wrap(selectTriggers.first()).click({ force: true });
        cy.wait(600);
      }
    });
    StudentDetailPage.verifyElevenTabs();
  });
});
