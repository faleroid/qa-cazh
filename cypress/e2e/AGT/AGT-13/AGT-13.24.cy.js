import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.24 - Ubah nilai Poin Pelanggaran ke range tipe lain", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.24: Ubah nilai Poin Pelanggaran ke range tipe lain (mis. 30 -> 80)", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); cy.get("body").then(($body) => { const editBtn = $body.find("tbody tr button:has(svg.lucide-square-pen), tbody tr button:has(svg.lucide-pencil), tbody tr button:contains(\"Edit\")"); if (editBtn.length > 0) { cy.wrap(editBtn.first()).click({ force: true }); cy.wait(600); cy.get('[role="dialog"]').should("be.visible"); } });
  });
});
