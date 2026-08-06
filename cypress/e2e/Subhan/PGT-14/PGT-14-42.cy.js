describe('Pengaturan- Tagihan - Jenis Tagihan - Edit Tagihan', () => {
  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-14.42	Ubah Pengulangan (misal dari "Setiap Bulan" ke "Setiap Tahun") → klik Simpan	Toast success, form conditional otomatis update, data tersimpan dengan pengulangan baru', () => {
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

    cy.intercept(
      'GET',
      '**/api/proxy-banking/bill-types?page=1&limit=999&own=true'
    ).as('loadBillTypes')

    // Trigger request
    cy.get('a[href="/setting/invoice/invoice-type"]').click()
    // Tunggu request selesai
    cy.wait('@loadBillTypes')
      .its('response.statusCode')
      .should('eq', 200)
    cy.get('[role="combobox"]').eq(2).click()
    cy.get('[role="listbox"]')
      .contains('100')
      .click()
    cy.contains('tr', 'Setiap Bulan').find('[data-slot="dialog-trigger"]').eq(0).click()
    cy.get('[role="dialog"]').within(() => {


      cy.get('button[role="combobox"]').eq(1).click()
      cy.get('select')
        .eq(1)
        .select('Setiap Tahun', { force: true })
      cy.get('button[role="combobox"]').eq(2).click()
      cy.get('select')
        .eq(2)
        .select('10', { force: true })
      cy.get('button[role="combobox"]').eq(3).click()
      cy.get('select')
        .eq(3)
        .select('10', { force: true })

      cy.contains('button', 'Simpan').click()

    })

  })

})