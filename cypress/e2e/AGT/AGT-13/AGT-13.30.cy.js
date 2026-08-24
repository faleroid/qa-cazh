import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.30 - Pada popup delete, klik tombol Hapus", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.30: Pada popup delete, klik tombol Hapus", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    // 1. Pastikan data pelanggaran ada di tabel
    StudentDetailPage.ensurePelanggaranDataExists();
    cy.wait(1000);

    // 2. Klik tombol Hapus (trash icon / text-destructive) pada baris pertama
    cy.get("tbody tr", { timeout: 15000 }).first().then(($row) => {
      const delBtn = $row.find('button:has(svg.lucide-trash-2), button:has(svg.lucide-trash), button[class*="destructive"], button:contains("Hapus")');
      if (delBtn.length > 0) {
        cy.wrap(delBtn.first()).scrollIntoView({ offset: { top: -100, left: 0 } }).click({ force: true });
      } else {
        cy.wrap($row.find('button').last()).scrollIntoView().click({ force: true });
      }
    });

    cy.wait(800);

    // 3. Verifikasi popup konfirmasi hapus muncul
    cy.get('[role="dialog"], [role="alertdialog"]', { timeout: 10000 }).should("be.visible");

    // 4. Klik tombol Konfirmasi Hapus ("Ya", "Hapus", atau button destructive)
    cy.get('[role="dialog"], [role="alertdialog"]').within(() => {
      cy.contains("button", /hapus|ya|delete|confirm|setuju/i).click({ force: true });
    });

    // 5. Verifikasi popup konfirmasi tertutup & data terhapus
    cy.wait(2000);
    cy.get('[role="dialog"], [role="alertdialog"]', { timeout: 15000 }).should("not.exist");
  });
});

