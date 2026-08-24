import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.25 - Ubah field, klik Simpan", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.25: Ubah field, klik Simpan", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    // 1. Pastikan data pelanggaran ada di tabel
    StudentDetailPage.ensurePelanggaranDataExists();
    cy.wait(1000);

    // 2. Klik tombol Edit secara presisi
    cy.get("tbody tr", { timeout: 15000 }).first().then(($row) => {
      const editBtn = $row.find('button[data-slot="dialog-trigger"], button[aria-haspopup="dialog"], button:has(svg.lucide-square-pen)');
      if (editBtn.length > 0) {
        cy.wrap(editBtn.first()).scrollIntoView({ offset: { top: -100, left: 0 } }).click();
      } else {
        cy.wrap($row.find('button').first()).scrollIntoView().click();
      }
    });

    cy.wait(1000);
    cy.get('[role="dialog"]', { timeout: 15000 }).should("be.visible");

    // 3. Ubah salah satu field (misal: Deskripsi)
    const updatedDesc = "Tidak memakai atribut lengkap saat upacara (Diubah)";
    cy.get('[role="dialog"]').within(() => {
      cy.get('input[name="description"], textarea[name="description"]')
        .first()
        .clear({ force: true })
        .type(updatedDesc, { force: true });
      cy.wait(300);

      // 4. Klik tombol Simpan
      cy.contains('button[type="submit"], button', /simpan/i).click({ force: true });
    });

    // 5. Verifikasi modal tertutup dan data ter-update
    cy.wait(2000);
    cy.get('[role="dialog"]', { timeout: 15000 }).should("not.exist");
    cy.get("body").should("contain.text", "Diubah");
  });
});

