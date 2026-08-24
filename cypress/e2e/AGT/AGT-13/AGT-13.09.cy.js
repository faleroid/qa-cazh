import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.9 - Cari dengan keyword tidak ditemukan", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.9: Cari dengan keyword tidak ditemukan", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    StudentDetailPage.searchKeyword(testData.search.invalidKeyword);
    cy.wait(800);

    // Verifikasi pesan empty state "Data Pelanggaran tidak ditemukan"
    cy.get("body", { timeout: 15000 }).then(($body) => {
      const text = $body.text();
      const hasEmptyState = text.includes("Data Pelanggaran tidak ditemukan") || text.includes("tidak ditemukan") || text.includes("Tambah Pelanggaran");
      expect(hasEmptyState, "Pencarian keyword invalid harus menampilkan empty state").to.be.true;
    });

    cy.contains(/Data Pelanggaran tidak ditemukan|tidak ditemukan/i).should("be.visible");
  });
});

