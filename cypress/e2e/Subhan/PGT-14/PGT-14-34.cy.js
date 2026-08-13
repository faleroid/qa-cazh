describe('PGT-14.34	Aktifkan Filter Instansi + Status secara bersamaan (kombinasi)	List filter sesuai kombinasi kedua filter', () => {
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

    cy.contains('button', 'Instansi').click()
    cy.get('[role="listbox"]')
      .contains('Sekolah Digital Indonesia')
      .click()

    cy.contains('button', 'Status').click()
    cy.get('[role="listbox"]')
      .contains('Aktif')
      .click()

  })

})
