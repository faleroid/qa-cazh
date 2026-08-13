describe('PGT-13.20	Aktifkan Filter Status = "Aktif"	List filter, hanya menampilkan jenis staff dengan status Aktif', () => {

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
      '**api/proxy/setting/staffing/staff_type?page=1&limit=10&status=ACTIVE'
    ).as('loadStaffType')

    cy.get('[data-state="open"]')
      .contains('Aktif')
      .click()

    cy.wait('@loadStaffType')


  })

})