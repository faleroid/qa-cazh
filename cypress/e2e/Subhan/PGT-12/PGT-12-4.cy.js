describe('Pengaturan - Kepegawaian - Jenis Guru - Tambah Jenis Guru', () => {

  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-12.4	Tambah beberapa jenis guru berbeda di 1 Instansi yang sama (misal Guru Kelas, Guru Mapel, Guru BK)	Semua jenis guru berhasil ditambahkan, tampil sebagai row terpisah di list', () => {
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

    cy.contains('[role="option"]', 'Yayasan New School')
      .click();

    cy.get('input[name="name"]').type('Guru Kelas')

    cy.get('button[type="submit"]').click();

    cy.contains('button', 'Tambah Jenis Guru').click();

    cy.get('[role="dialog"]')
      .should('be.visible')

    cy.contains('button[role="combobox"]', 'Pilih Instansi')
      .click()

    cy.contains('[role="option"]', 'Yayasan New School')
      .click();

    cy.get('input[name="name"]').type('Guru Mapel')

    cy.get('button[type="submit"]').click();

    cy.contains('button', 'Tambah Jenis Guru').click();

    cy.get('[role="dialog"]')
      .should('be.visible')

    cy.contains('button[role="combobox"]', 'Pilih Instansi')
      .click()

    cy.contains('[role="option"]', 'Yayasan New School')
      .click();

    cy.get('input[name="name"]').type('Guru BK')

    cy.get('button[type="submit"]').click();
    cy.wait(1500);
  })

})