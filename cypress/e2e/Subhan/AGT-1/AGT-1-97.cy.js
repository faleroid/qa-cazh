describe('Anggota - Siswa - Import Siswa', () => {
  afterEach(() => {
    cy.wait(1500)
  })
  it('AGT-1.97	Setelah import berhasil → buka halaman Log Import	Data import muncul di halaman Log Import Siswa', () => {
    cy.visit('https://v3.cazh.id/auth/login')

    cy.get('[name="email"]').click();
    cy.get('[name="email"]').type('androidtesting117@gmail.com');
    cy.get('form.my-10 > div:nth-child(2)').click();
    cy.get('[name="password"]').click();
    cy.get('[name="password"]').type('f7ki6b2u');
    cy.get('svg.lucide-eye').click();
    cy.contains('button', 'Masuk').click();
    cy.wait(2500)
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
      .contains('50')
      .click()
    cy.wait(3000)
    cy.contains('button', 'Import Siswa').click()
    cy.wait(3000)


    cy.get('[role="combobox"]').eq(0).click()
    cy.get('[role="listbox"]')
      .contains('Academy QA Engineer')
      .click()
    cy.get('[role="combobox"]').eq(1).click()
    cy.get('[role="listbox"]')
      .contains('2049/2050')
      .click()
    cy.get('[role="combobox"]').eq(2).click()
    cy.get('[role="listbox"]')
      .contains('3')
      .click()
    cy.get('[role="combobox"]').eq(3).click()
    cy.get('[role="listbox"]')
      .contains('9D')
      .click()
    //   cy.get('[role="combobox"]').eq(4).click()
    // cy.get('[role="listbox"]')
    //   .contains('NOLEP')
    //   .click()
    cy.get('[role="combobox"]').eq(5).click()
    cy.get('[role="listbox"]')
      .contains('Anggota')
      .click()
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/template.xls', {
        force: true
      })
    cy.contains('button', 'Simpan').click()

    cy.wait(2500)
    cy.contains('button', 'Riwayat Import').click()
    cy.wait(2500)
    cy.contains('button', 'Detail').eq(0).click()
    cy.wait(1000)
  })

})

