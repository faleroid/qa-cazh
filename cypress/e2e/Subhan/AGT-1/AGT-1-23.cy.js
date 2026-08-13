describe('Anggota - Siswa - Edit Profil Siswa', () => {
  afterEach(() => {
    cy.wait(1500)
  })
  it('AGT-1.23	Cek 11 tabs di halaman detail	Tab tersedia: Data Diri, Data Orang Tua, Kartu, Tagihan, Dokumen, Rapor, Kesehatan, Pelanggaran, Prestasi, Perizinan, Progres', () => {
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
    cy.contains('tr', 'Test20')
      .find('[data-slot="button"]')
      .click()
    cy.wait(3000)
    // Data Siswa
    cy.get('[role="tablist"] [role="tab"]').eq(0).click()
    cy.wait(3000)

    // Data Orang Tua
    cy.get('[role="tablist"] [role="tab"]').eq(1).click()
    cy.wait(3000)
    // Kartu
    cy.get('[role="tablist"] [role="tab"]').eq(2).click()
    cy.wait(3000)
    // Tagihan
    cy.get('[role="tablist"] [role="tab"]').eq(3).click()
    cy.wait(3000)
    cy.get('[role="tablist"] [role="tab"]').eq(4).click()
    cy.wait(3000)
    cy.get('[role="tablist"] [role="tab"]').eq(5).click()
    cy.wait(3000)
    cy.get('[role="tablist"] [role="tab"]').eq(6).click()
    cy.wait(3000)
    cy.get('[role="tablist"] [role="tab"]').eq(7).click()
    cy.wait(3000)
    cy.get('[role="tablist"] [role="tab"]').eq(8).click()
    cy.wait(3000)
    cy.get('[role="tablist"] [role="tab"]').eq(9).click()
    cy.wait(3000)
    cy.contains('button', 'Lainnya').click()
    cy.wait(3000)
    cy.get('[role="menuitem"]')
      .contains('Progres')
      .click()
    cy.wait(3000)
    cy.contains('button', 'Lainnya').click()
    cy.wait(3000)
    cy.get('[role="menuitem"]')
      .contains('Tahfidz')
      .click()
    cy.wait(3000)
    cy.contains('button', 'Lainnya').click()
    cy.wait(3000)
    cy.get('[role="menuitem"]')
      .contains('Perundungan')
      .click()
    cy.wait(3000)
    cy.contains('button', 'Lainnya').click()
    cy.wait(3000)
    cy.get('[role="menuitem"]')
      .contains('Kunjungan')
      .click()
    cy.wait(3000)
    cy.contains('button', 'Lainnya').click()
    cy.wait(3000)
    cy.get('[role="menuitem"]')
      .contains('Tugas')
      .click()
    cy.wait(3000)

    cy.wait(1000)
  })

})

