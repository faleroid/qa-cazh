describe('Pengaturan - Kepegawaian - Jenis Guru - Tambah Jenis Guru', () => {

  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-12.5	Buka dropdown Instansi di form Tambah	Dropdown hanya menampilkan instansi sesuai partner (bukan semua instansi di sistem)', () => {
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
    cy.contains('Jenis Guru').click();

    cy.contains('button', 'Tambah Jenis Guru').click();

    cy.get('[role="dialog"]')
      .should('be.visible')

    cy.contains('button[role="combobox"]', 'Pilih Instansi')
      .click()


    cy.wait(1500);
  })

})