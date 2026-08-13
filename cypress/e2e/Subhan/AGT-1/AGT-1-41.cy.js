describe('Anggota - Siswa ', () => {
  afterEach(() => {
    cy.wait(1500)
  })
  it('AGT-1.41	Klik Simpan tanpa isi field apapun di tab Data Orang Tua	Data berhasil disimpan (semua field opsional, tidak ada required, tidak menampilkan pesan error)', () => {
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
      .contains('100')
      .click()
    cy.wait(3000)
    cy.contains('tr', 'Test20')
      .find('[data-slot="button"]')
      .click()
    cy.wait(3000)

    cy.get('[role="tablist"] [role="tab"]').eq(1).click()


    cy.wait(1000)
    cy.contains('button', 'Simpan').click()

    cy.wait(1000)
  })

})

