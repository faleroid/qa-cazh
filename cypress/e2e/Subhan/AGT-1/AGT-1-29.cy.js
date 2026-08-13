describe('Anggota - Siswa - Edit Profil Siswa', () => {
  afterEach(() => {
    cy.wait(1500)
  })
  it('AGT-1.29	Upload Foto Siswa tipe file tidak diizinkan (bukan jpg/jpeg/png)	Sistem tolak dengan error tipe file', () => {
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
    cy.wait(1000)
    cy.get('[role="combobox"]').eq(0).click()
    cy.get('[role="listbox"]')
      .contains('100')
      .click()
    cy.wait(3000)
    cy.get('[href="/member/student/add"]').click();
    cy.wait(3000)
    const logoPath = 'cypress/fixtures/test4.gif';


    cy.get('input[type="file"]').selectFile(logoPath, { force: true });
    cy.wait(1000)
  })

})

