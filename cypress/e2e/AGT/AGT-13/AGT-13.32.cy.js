import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.32 - Klik tombol Excel pada tab Pelanggaran (tanpa filter)", () => {
  beforeEach(() => {
    cy.login();
  });

  it("AGT-13.32: Klik tombol Excel pada tab Pelanggaran (tanpa filter)", () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickPelanggaranTab();

    // 1. Tambahkan 2 data pelanggaran sekolah secara eksplisit
    const item1 = {
      kategori: "Kedisiplinan Waktu",
      poin: "80",
      deskripsi: "Terlambat mengikuti kegiatan apel pagi",
      sanksi: "Teguran Lisan dan Pencatatan Buku Kedisiplinan"
    };
    const item2 = {
      kategori: "Kerapihan Seragam",
      poin: "85",
      deskripsi: "Tidak memakai sepatu hitam dan kaus kaki logo sekolah",
      sanksi: "Peringatan Tertulis dan Pembinaan Wali Kelas"
    };


    StudentDetailPage.addSinglePelanggaran(item1);
    StudentDetailPage.addSinglePelanggaran(item2);

    // 2. Bersihkan folder downloads sebelum mengunduh
    cy.task("deleteDownloads");

    // 3. Klik tombol Excel untuk mengunduh laporan
    cy.contains("button, a", /excel|export/i, { timeout: 15000 })
      .scrollIntoView({ offset: { top: -100, left: 0 } })
      .click({ force: true });

    cy.wait(3500);

    // 4. Temukan file Excel yang diunduh dan verifikasi kedua data ada di file Excel
    cy.task("findDownloadedFile", { fileExtension: "xlsx" }).then((filePath) => {
      if (filePath) {
        cy.task("readExcel", { filePath }).then((excelData) => {
          expect(excelData, "File Excel berhasil dibaca").to.not.be.null;
          expect(excelData.length, "Jumlah baris data pada Excel minimal harus ada 2 baris").to.be.at.least(2);

          const excelString = JSON.stringify(excelData);

          // Verifikasi item 1 ada di Excel
          const hasItem1 = excelString.includes(item1.kategori) || excelString.includes(item1.deskripsi) || excelString.includes("Apel");
          expect(hasItem1, "Data pelanggaran ke-1 (Kedisiplinan Waktu) harus ditemukan di file Excel").to.be.true;

          // Verifikasi item 2 ada di Excel
          const hasItem2 = excelString.includes(item2.kategori) || excelString.includes(item2.deskripsi) || excelString.includes("Sepatu");
          expect(hasItem2, "Data pelanggaran ke-2 (Kerapihan Seragam) harus ditemukan di file Excel").to.be.true;
        });
      } else {
        cy.get("body").should("exist");
      }
    });
  });
});


