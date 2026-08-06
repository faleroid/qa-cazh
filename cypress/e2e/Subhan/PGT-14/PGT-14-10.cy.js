describe('PGT-14.10	Kosongkan Pengulangan Tagihan → klik Simpan	Error "Pengulangan Tagihan wajib diisi" muncul, tombol Simpan tidak bekerja', () => {
  afterEach(() => {
    cy.wait(1500)
  })
  it('passes', () => {
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

      // Combobox pertama (Instansi)
      cy.get('button[role="combobox"]').eq(0).click()
      cy.get('select')
        .eq(0)
        .select('Academy QA Engineer', { force: true })

      cy.get('[name="name"]').type('Pinjaman', { delay: 100 })

      cy.contains('button', 'Simpan').click()

    })
  })

})
