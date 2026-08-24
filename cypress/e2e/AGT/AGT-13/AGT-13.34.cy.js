import StudentDetailPage from "../../../pages/StudentDetailPage";
import testData from "../../../fixtures/studentData.json";

describe("AGT-13.34 - Cek isi kolom file hasil Export Pelanggaran", () => {
            expect(col.check, `Kolom [${col.name}] harus ada pada file Excel hasil export`).to.be.true;
          });
        });
      } else {
        cy.get("body").should("exist");
      }
    });
  });
});


