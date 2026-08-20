import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.22 - Klik tombol Batal pada form Tambah Pelanggaran", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.22: Klik tombol Batal pada form Tambah Pelanggaran -> Menutup form", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); cy.contains("button, a", /tambah pelanggaran/i, { timeout: 15000 }).click({ force: true }); cy.wait(600); cy.get('[role="dialog"]').within(() => { cy.contains("button", /batal/i).click({ force: true }); }); cy.wait(600); cy.get('[role="dialog"]').should("not.exist");
  });
});
