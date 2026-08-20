import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.31 - Pada popup delete, klik tombol Batal", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.31: Pada popup delete, klik tombol Batal", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); cy.get("body").then(($body) => { const delBtn = $body.find("tbody tr button:has(svg.lucide-trash), tbody tr button[class*=\"text-destructive\"], tbody tr button:contains(\"Hapus\")"); if (delBtn.length > 0) { cy.wrap(delBtn.first()).click({ force: true }); cy.wait(600); cy.get('[role="dialog"]').within(() => { cy.contains("button", /batal|cancel/i).click({ force: true }); }); cy.wait(600); cy.get('[role="dialog"]').should("not.exist"); } });
  });
});
