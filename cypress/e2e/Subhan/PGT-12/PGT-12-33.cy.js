describe('Pengaturan - Kepegawaian - Jenis Guru - Edit', () => {

  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-12.33	Kosongkan Nama Jenis Guru → klik Simpan	Error "Nama Jenis Guru wajib diisi" muncul, tombol Simpan tidak bekerja, form tetap terbuka', () => {
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
    cy.get('.animate-pulse').should('not.exist')
    cy.wait(1500);
    cy.get('button[data-slot="dialog-trigger"]').eq(1).click();

    cy.get('[role="dialog"]').should('be.visible')

    cy.get('input[name="name"]').clear()


    cy.contains('button', 'Simpan').click();

  })

})
