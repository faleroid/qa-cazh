import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.33 - Lakukan pencarian, klik Excel", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.33: Lakukan pencarian, klik Excel", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); StudentDetailPage.searchKeyword("Keterlambatan"); cy.wait(600); cy.contains("button, a", /excel|export/i, { timeout: 10000 }).should("exist");
  });
});
