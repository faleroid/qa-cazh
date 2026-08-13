describe('Anggota - Siswa - Edit Profil Siswa', () => {
  afterEach(() => {
    cy.wait(1500)
  })
  it('AGT-1.34	Isi NIK yang sudah ada di siswa lain (duplikat) → klik Simpan	Sistem tolak dengan error NIK sudah digunakan (bersifat unik)', () => {
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

    cy.get('[role="combobox"]').eq(0).click()
    cy.get('[role="listbox"]')
      .contains('Academy QA Engineer')
      .click()
    cy.get('[name="name"]').type('tes nisn', { delay: 100 })
    cy.get('[name="phone"]').type('0891293129', { delay: 100 })
    cy.get('[name="member_number"]').type('09876543210987654', { delay: 100 })
    cy.get('[name="nisn"]').type('123123123123123123', { delay: 100 })
    cy.get('[role="combobox"]').eq(2).click()
    cy.get('[role="listbox"]')
      .contains('2049/2050')
      .click()

    cy.get('[role="combobox"]').eq(3).click()
    cy.get('[role="listbox"]')
      .contains('3')
      .click()

    cy.get('[role="combobox"]').eq(4).click()
    cy.get('[role="listbox"]')
      .contains('9D')
      .click()
    cy.get('[name="card_no"]').type('1002992414737527', { delay: 100 })
    cy.contains('button', 'Cek Kartu').click()
    cy.wait(3000)
    cy.contains('button', 'Simpan').click()
    cy.wait(3000)


  })

})

