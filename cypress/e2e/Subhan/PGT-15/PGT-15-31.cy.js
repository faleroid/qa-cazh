describe('Pengaturan - Tagihan - Pengingat Tagihan  ', () => {
  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-15.31	Klik Aksi → "Edit" di row pengingat tagihan	Form Edit terbuka dengan data ter-prefill: Instansi, Jenis Tagihan, Judul Pengingat, Pesan, Target, Tanggal, Jam, Toggle WA', () => {
    cy.visit('https://v3.cazh.id/auth/login')

    cy.get('[name="email"]').click();
    cy.get('[name="email"]').type('androidtesting117@gmail.com');
    cy.get('form.my-10 > div:nth-child(2)').click();
    cy.get('[name="password"]').click();
    cy.get('[name="password"]').type('f7ki6b2u');
    cy.get('svg.lucide-eye').click();
    cy.contains('button', 'Masuk').click();
    cy.wait(2000)
    cy.contains('PENGATURAN').click();
    cy.contains('Tagihan').click();

    cy.intercept(
      'GET',
      '**api/proxy-banking/bill-reminders?page=1&limit=999'
    ).as('Bill')

    // Trigger request
    cy.get('a[href="/setting/invoice/invoice-reminder"]').click()
    // Tunggu request selesai
    cy.wait('@Bill')
      .its('response.statusCode')
      .should('eq', 200)
    cy.get('[role="combobox"]').eq(2).click()
    cy.get('[role="listbox"]')
      .contains('100')
      .click()
    cy.get('[class="lucide lucide-square-pen"]').eq(0).click()
    cy.wait(1000)
  })

})
