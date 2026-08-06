describe('PGT-13.23	Aktifkan filter → tidak ada hasil yang match	Sistem menampilkan halaman kosong (empty state UI)', () => {
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
    ).as('loadStaffType')

    cy.contains('Jenis Staff').click();

    cy.wait('@loadStaffType')
    cy.get('.animate-pulse').should('not.exist')
    cy.contains('[role="combobox"]', 'Status').click();


    cy.intercept(
      'GET',
      '**api/proxy/setting/staffing/staff_type?page=1&limit=10&status=INACTIVE'
    ).as('loadStaffType')

    cy.get('[data-state="open"]')
      .contains('Tidak Aktif')
      .click()

    cy.wait('@loadStaffType')


  })

})