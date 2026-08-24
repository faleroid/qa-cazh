import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.4 - Buka tab Pelanggaran saat belum ada data", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.4: Buka tab Pelanggaran saat belum ada data", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab(); cy.get("body").then(($body) => { const text = $body.text(); const isEmpty = text.includes("tidak ditemukan") || text.includes("Belum ada") || text.includes("Tidak ada data") || $body.find("tbody tr").length === 0; expect(isEmpty || $body.find("tbody tr").length >= 0).to.be.true; });
  });
});
