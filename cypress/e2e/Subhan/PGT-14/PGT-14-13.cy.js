describe('Pengaturan - Tagihan - Jenis Tagihan - Tambah Jenis Tagihan', () => {

  afterEach(() => {
    cy.wait(1500)
  })
  it(' PGT-14.13	Buka dropdown Pengulangan Tagihan	Dropdown menampilkan 8 opsi: Sekaligus Lunas, Setiap Minggu, Setiap Bulan, Setiap 2/3/4/6 Bulan, Setiap Tahun', () => {
    cy.visit('https://v3.cazh.id/auth/login')

    cy.get('[name="email"]').click();
    cy.get('[name="email"]').type('androidtesting117@gmail.com');
    cy.get('form.my-10 > div:nth-child(2)').click();
    cy.get('[name="password"]').click();
    cy.get('[name="password"]').type('f7ki6b2u');
    cy.get('svg.lucide-eye').click();
    cy.contains('button', 'Masuk').click();
    cy.contains('PENGATURAN').click();
    cy.contains('Tagihan').click();
    cy.get('a[href="/setting/invoice/invoice-type"]').click()

    cy.contains('button', 'Tambah Jenis Tagihan').click()
    cy.get('[role="dialog"]').within(() => {


      cy.get('button[role="combobox"]').eq(1).click()


    })
  })

})
