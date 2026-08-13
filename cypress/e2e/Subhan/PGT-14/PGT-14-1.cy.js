describe('Pengaturan - Tagihan - Jenis Tagihan - Tambah Jenis Tagihan', () => {

  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-14.1	Isi form Tambah Jenis Tagihan dengan Pengulangan "Sekaligus Lunas" + Periode valid → klik Simpan	Toast success muncul, sistem kembali ke halaman list, jenis tagihan baru muncul di paling atas dengan status default Aktif', () => {
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
  })

})
