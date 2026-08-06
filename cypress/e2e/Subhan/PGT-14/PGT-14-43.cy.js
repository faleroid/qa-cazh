describe('Pengaturan- Tagihan - Jenis Tagihan - Edit Tagihan', () => {
  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-14.43	Ubah Periode Tagihan (perpanjang Tanggal Selesai) → klik Simpan	Toast success, periode ter-update di list', () => {
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
    cy.get('[data-slot="dialog-trigger"]').eq(1).click()
    cy.get('[role="dialog"]').within(() => {


      cy.get('button[data-slot="popover-trigger"]').eq(1).click()
      cy.get('select[aria-label="Choose the Month"]')
        .select('7')
      cy.get('select[aria-label="Choose the Year"]')
        .select('2030')
      cy.get('td[data-day="2030-08-28"] button').click({ force: true })

      cy.contains('button', 'Simpan').click()

    })

  })

})