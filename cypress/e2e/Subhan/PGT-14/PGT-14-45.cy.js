
describe('Pengaturan- Tagihan - Jenis Tagihan - Edit Tagihan', () => {
  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-14.45	Ubah Status dari "Tidak Aktif" ke "Aktif" → klik Simpan	Toast success, badge Status berubah jadi "Aktif"', () => {
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
    cy.contains('tr', 'Tidak Aktif').find('[data-slot="dialog-trigger"]').eq(0).click()
    cy.get('[role="dialog"]').within(() => {
      cy.contains('[role="combobox"]', 'Aktif').click()

    })
    cy.get('[role="listbox"]')
      .should('be.visible')
      .contains('[role="option"]', 'Aktif')
      .click()

    cy.get('[role="dialog"]')
      .contains('button', 'Simpan')
      .click()
  })

})