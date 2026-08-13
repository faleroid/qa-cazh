describe('PGT-13.32	Ubah Instansi jenis staff ke instansi lain → klik Simpan	Toast success, jenis staff pindah ke instansi baru (visible saat filter by instansi baru)', () => {
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
    cy.contains('Kepegawaian').click();

    cy.intercept(
      'GET',
      '**/api/proxy/setting/staffing/staff_type?page=1&limit=10'
    ).as('loadStaff')

    cy.contains('Jenis Staff').click();

    cy.wait('@loadStaff')
    cy.get('.animate-pulse').should('not.exist')

    cy.get('button[data-slot="dialog-trigger"]').eq(1).click();
    cy.get('[role="dialog"]').should('be.visible')
    cy.get('[role="dialog"]').within(() => {


      cy.get('[role="combobox"]').eq(0).click()
      cy.get('select')
        .eq(0)
        .select('Sekolah Digital Indonesia', { force: true })


    })

    cy.contains('button', 'Simpan').click();

    cy.contains('[role="combobox"]', 'Instansi').click()
    cy.intercept(
      'GET',
      '**api/proxy/setting/staffing/staff_type?page=1&limit=10&office=6a4ca54faab9f40019199d3e'
    ).as('loadStaffType')

    cy.get('[data-state="open"]')
      .contains('Sekolah Digital Indonesia')
      .click()

    cy.wait('@loadStaffType')

  })

})