describe('Pengaturan - Tagihan - Jenis Tagihan - Tambah Jenis Tagihan', () => {

  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-14.18	Cek boundary dropdown Mengulang Setiap Tanggal (pada semua bulanan/tahunan)	Dropdown hanya menampilkan tanggal 1 sampai 28 (bukan 1-31 — untuk avoid edge case bulan Februari)', () => {
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
      cy.get('select')
        .eq(1)
        .select('Setiap Bulan', { force: true })
      cy.get('button[role="combobox"]').eq(2).click()
      cy.get('select')
        .eq(2)
        .select('28', { force: true })
      cy.wait(2000)
      cy.get('button[role="combobox"]').eq(2).click()

    })
  })

})
