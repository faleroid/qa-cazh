describe('Anggota - Siswa ', () => {
  afterEach(() => {
    cy.wait(1500)
  })
  it('AGT-1.6	Ketik Kelas / Tahun Ajaran / Semester / Instansi / Tag di search box	List menampilkan siswa sesuai keyword (search support 7 kriteria: Nama, Nomor Kartu, Kelas, Tahun Ajaran, Semester, Instansi, Tag)', () => {
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
    cy.get('[role="combobox"]').eq(0).click()


    cy.get('[role="listbox"]')
      .contains('100')
      .click()


    cy.wait(2000)
    cy.get('[data-slot="input"]').type('Sekolah')
    cy.wait(1000)
  })

})
