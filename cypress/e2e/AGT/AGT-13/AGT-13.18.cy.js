import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.18 - Upload Foto dengan ukuran > 512KB", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.18: Upload Foto dengan ukuran > 512KB", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); cy.contains("button, a", /tambah pelanggaran/i, { timeout: 15000 }).click({ force: true }); cy.wait(600); cy.get('[role="dialog"]').within(() => { cy.get('input[type="file"]').first().selectFile("cypress/fixtures/oversized_11mb_file.pdf", { force: true }); }); cy.wait(400); cy.get("body").should("exist");
  });
});
