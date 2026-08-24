import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.23 - Pada baris data, klik Aksi → Edit", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.23: Pada baris data, klik Aksi → Edit", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    // 1. Pastikan data pelanggaran ada di tabel
    StudentDetailPage.ensurePelanggaranDataExists();
    cy.wait(1000);

    // 2. Klik tombol Edit secara presisi (single click tanpa force berlebih)
    cy.get("tbody tr", { timeout: 15000 }).first().then(($row) => {
      const editBtn = $row.find('button[data-slot="dialog-trigger"], button[aria-haspopup="dialog"], button:has(svg.lucide-square-pen)');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).scrollIntoView({ offset: { top: -100, left: 0 } }).click();
      } else {
        cy.wrap($row.find('button').first()).scrollIntoView().click();
      }
    });

    cy.wait(1000);

    // 3. Verifikasi modal form Edit muncul
    cy.get('[role="dialog"]', { timeout: 15000 }).should("be.visible");
  });
});


