describe('Anggota - Siswa - Tambah Siswa', () => {
  afterEach(() => {
    cy.wait(1500)
  })
  it('AGT-1.84	Klik btn "Import Siswa" di halaman list	Form Import terbuka dengan 9 field: Instansi, Tahun Ajaran, Semester, Tingkat, Kelas, Jurusan, Program, Sistem Pendidikan, Jenis Import + Data Excel + Download Template', () => {
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

    cy.wait(1000)
  })

})

