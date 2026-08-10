describe('Pengaturan - Tagihan - Pengingat Tagihan  ', () => {
  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-15.38	Ubah Instansi di form Edit	Field Jenis Tagihan ter-reset otomatis, dropdown update sesuai instansi baru', () => {
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
    cy.wait(2000)
    cy.get('[role="combobox"]').eq(0).click()
    cy.get('[role="listbox"]')
      .contains('Academy QA Engineer')
      .click()
    cy.get('[role="combobox"]').eq(1).click()
    cy.get('[role="listbox"]')
      .contains('Test20')
      .click()
    cy.get('[name="title"]').clear()
    cy.wait(1000)
    cy.get('[name="title"]').type('ganti', { delay: 100 })
    cy.get('[name="message"]').clear()
    cy.wait(1000)
    cy.get('[name="message"]').type('ganti sukses', { delay: 100 })
    cy.get('[role="combobox"]').eq(2).click()
    cy.get('[role="listbox"]')
      .contains('Hanya Belum Lunas')
      .click()
    cy.get('[role="combobox"]').eq(3).click()
    cy.get('[role="listbox"]')
      .contains('Sekaligus Lunas')
      .click()

    cy.get('[name="start_date"]').click()
    cy.get('td[data-day="2026-08-25"] button').click({ force: true })
    cy.get('body').type('{esc}')
    cy.get('div[data-slot="datefield"]').click()
    cy.get('div[data-slot="datefield"]').type('1111')
    cy.get('button[role="switch"]').then(($switch) => {
      if ($switch.attr('data-state') === 'checked') {
        cy.wrap($switch).click()
      } else {
        cy.log('Switch sudah tidak aktif')
      }
    })
    cy.contains('button', 'Simpan').click()
    cy.wait(1000)
  })

})
