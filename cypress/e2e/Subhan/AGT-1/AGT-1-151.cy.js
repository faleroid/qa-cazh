describe('Anggota - Siswa ', () => {
  afterEach(() => {
    cy.wait(1500)
  })
  it('AGT-1.151	Buka form Ubah Status, pilih Status = Aktif, klik Simpan	Siswa terpilih berubah status jadi Aktif, toast success', () => {
    cy.visit('https://v3.cazh.id/auth/login')

    cy.get('[name="email"]').click();
    cy.get('[name="email"]').type('androidtesting117@gmail.com');
    cy.get('form.my-10 > div:nth-child(2)').click();
    cy.get('[name="password"]').click();
    cy.get('[name="password"]').type('f7ki6b2u');
    cy.get('svg.lucide-eye').click();
    cy.contains('button', 'Masuk').click();

    cy.wait(3000)


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

    cy.get('[role="checkbox"]').eq('4').click()
    // cy.get('[role="checkbox"]').eq('5').click()
    // cy.get('[role="checkbox"]').eq('6').click()
    // cy.get('[role="checkbox"]').eq('7').click()
    // cy.get('[role="checkbox"]').eq('8').click()
    // cy.get('[role="checkbox"]').eq('9').click()
    // cy.get('[role="checkbox"]').eq('10').click()
    cy.wait(1000)
    cy.contains('button', 'Pindah Data Siswa').click()
    cy.wait(1000)
    cy.get('[role="dialog"]').within(() => {
      cy.get('[role="checkbox"]').eq('6').click()
      cy.contains('button', 'Lanjut').click()
      cy.get('[role="combobox"]').eq('0').click()
    })
    cy.get('[role="listbox"]')
      .contains('Aktif')
      .click()


    cy.wait(1000)
    cy.contains('button', 'Simpan').click()

    cy.wait(1000)
  })

})

