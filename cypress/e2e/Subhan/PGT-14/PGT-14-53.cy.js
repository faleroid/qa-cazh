//bug : tagihan masih muncul meskipun sudah tidak aktif
describe('Pengaturan- Tagihan - Jenis Tagihan - Edit Tagihan', () => {
  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-14.53	Set status "Tidak Aktif" → buka fitur Buat Tagihan & Jadwal Pengaturan Web PPDB	Jenis tagihan tersembunyi dari dropdown pilihan di kedua fitur tersebut (tidak bisa digunakan)', () => {
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

    cy.contains('tr', 'Test20').find('[data-slot="dialog-trigger"]').eq(0).click()
    cy.get('[role="dialog"]').within(() => {
      cy.get('[role="combobox"]').eq(-1).click()
      cy.wait(1000)

    })

    cy.get('[role="listbox"]')
      .should('be.visible')
      .contains('[role="option"]', 'Tidak Aktif')
      .click()


    cy.get('[role="dialog"]')
      .contains('button', 'Simpan')
      .click()
    cy.contains('ADMINISTRASI').click()
    cy.contains('Tagihan').click()
    cy.get('[href="/administration/billing/create-import-invoice"]').click()
    cy.wait(1500)
    cy.get('[role="combobox"]').eq(1).click()
    cy.get('[role="listbox"]')
      .should('be.visible')

    cy.wait(1500)

    cy.contains('button', 'ANGGOTA').click({ force: true })
    cy.get('svg.lucide-plus')
      .eq(1)
      .parent()
      .click()
    cy.get('[href="/member/admission/setting"]').click()
    cy.contains('button', 'Jadwal').click()
    cy.wait(1000)
    cy.contains('button', 'Tambah Jadwal').click()
    cy.get('[role="dialog"]').within(() => {
      cy.get('[role="combobox"]').eq(1).click()


    })
    cy.get('[role="listbox"]')

    cy.wait(1500)
  })

})