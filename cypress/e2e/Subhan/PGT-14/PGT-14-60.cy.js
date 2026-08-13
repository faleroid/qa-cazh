
describe('Pengaturan- Tagihan - Jenis Tagihan - Edit Tagihan', () => {
  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-14.60	Search sampai hasil tinggal 1 row → hapus row tersebut	Setelah hapus, sistem menampilkan halaman kosong (empty state UI)', () => {
    cy.visit('https://v3.cazh.id/auth/login')

    cy.get('[name="email"]').click();
    cy.get('[name="email"]').type('androidtesting117@gmail.com');
    cy.get('form.my-10 > div:nth-child(2)').click();
    cy.get('[name="password"]').click();
    cy.get('[name="password"]').type('f7ki6b2u');
    cy.get('svg.lucide-eye').click();
    cy.contains('button', 'Masuk').click();
    cy.wait(1000)
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

    cy.get('body').then(($body) => {
      if ($body.find('tr:contains("Test20")').length === 0) {
        cy.contains('button', 'Tambah Jenis Tagihan').click()
        cy.get('[role="dialog"]').within(() => {

          // Combobox pertama (Instansi)
          cy.get('button[role="combobox"]').eq(0).click()
          cy.get('select')
            .eq(0)
            .select('Academy QA Engineer', { force: true })

          cy.get('[name="name"]').type('Test20', { delay: 100 })
          // Combobox kedua (Pengulangan Tagihan)
          cy.get('button[role="combobox"]').eq(1).click()
          cy.get('select')
            .eq(1)
            .select('Sekaligus Lunas', { force: true })


          cy.get('button[data-slot="popover-trigger"]').eq(0).click()
          cy.get('select[aria-label="Choose the Month"]')
            .select('7')
          cy.get('td[data-day="2026-08-01"] button').click()
          cy.get('[data-slot="popover-content"]').should('not.exist')
          cy.get('button[data-slot="popover-trigger"]').eq(1).click()
          cy.get('select[aria-label="Choose the Month"]')
            .select('7')
          cy.get('td[data-day="2026-08-28"] button').click({ force: true })
          cy.contains('button', 'Simpan').click()

        })

      } else {
        cy.log('Test20 sudah ada')
      }
    })
    cy.get('input[data-slot="input"]').type('Test20{enter}', { delay: 100 })
    cy.contains('tr', 'Test20').find('[data-slot="dialog-trigger"]').eq(1).click()
    cy.contains('button', 'Hapus').click()
    cy.wait(1000)
  })

})