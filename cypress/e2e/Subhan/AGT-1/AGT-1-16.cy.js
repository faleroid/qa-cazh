describe('Anggota - Siswa ', () => {
  afterEach(() => {
    cy.wait(1500)
  })
  it('AGT-1.16	Aktifkan filter → klik Export Excel	Sistem hanya export data yang sesuai filter yang aktif (bukan semua data)', () => {
    cy.visit('https://v3.cazh.id/auth/login')

    cy.get('[name="email"]').click();
    cy.get('[name="email"]').type('androidtesting117@gmail.com');
    cy.get('form.my-10 > div:nth-child(2)').click();
    cy.get('[name="password"]').click();
    cy.get('[name="password"]').type('f7ki6b2u');
    cy.get('svg.lucide-eye').click();
    cy.contains('button', 'Masuk').click();
    cy.contains('ANGGOTA').click();

    cy.intercept(
      'GET',
      '**api/proxy/students?page=1&limit=10'
    ).as('loadStudents')

    // Trigger request
    cy.get('[href="/member/student"]').click();
    // Tunggu request selesai
    cy.wait('@loadStudents')
      .its('response.statusCode')
      .should('eq', 200)
    cy.get('[data-slot="dropdown-menu-trigger"]').eq(1).click()
    cy.wait(1000)


    cy.get('[data-slot="dropdown-menu-content"]').within(() => {
      cy.get('[role="combobox"]').eq(0).click({ force: true })
      cy.wait(1000)


    })
    cy.get('[role="listbox"]')
      .contains('Sekolah Digital Indonesia')
      .click({ force: true })
    cy.wait(1000)

    cy.contains('button', 'Excel').click()
    cy.wait(1000)

  })

})
