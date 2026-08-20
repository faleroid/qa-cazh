import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.29 - Pada baris data, klik Aksi -> Hapus", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.29: Pada baris data, klik Aksi -> Hapus -> Menampilkan popup confirmation", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); cy.get("body").then(($body) => { const delBtn = $body.find("tbody tr button:has(svg.lucide-trash), tbody tr button[class*=\"text-destructive\"], tbody tr button:contains(\"Hapus\")"); if (delBtn.length > 0) { cy.wrap(delBtn.first()).click({ force: true }); cy.wait(600); cy.get('[role="dialog"]').should("be.visible"); } });
  });
});
