import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.09 - Cari dengan keyword tidak ditemukan", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.09: Cari dengan keyword tidak ditemukan -> Sistem menampilkan list kosong (no result)", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); StudentDetailPage.searchKeyword(testData.search.invalidKeyword); cy.wait(800); cy.get("body").then(($body) => { const text = $body.text(); const isEmpty = text.includes("tidak ditemukan") || text.includes("Tidak ada") || $body.find("tbody tr").length === 0; expect(isEmpty).to.be.true; });
  });
});
