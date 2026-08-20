import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.28 - Klik tombol Batal pada form Edit Pelanggaran", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.28: Klik tombol Batal pada form Edit Pelanggaran", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); cy.get("body").then(($body) => { const editBtn = $body.find("tbody tr button:has(svg.lucide-square-pen), tbody tr button:has(svg.lucide-pencil), tbody tr button:contains(\"Edit\")"); if (editBtn.length > 0) { cy.wrap(editBtn.first()).click({ force: true }); cy.wait(600); cy.get('[role="dialog"]').within(() => { cy.contains("button", /batal/i).click({ force: true }); }); cy.wait(600); cy.get('[role="dialog"]').should("not.exist"); } });
  });
});
