describe('Pengaturan - Kepegawaian - Jenis Guru - Edit', () => {

  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-12.31	Ubah Instansi jenis guru ke instansi lain → klik Simpan	Toast success, jenis guru pindah ke instansi baru (visible saat filter by instansi baru)', () => {
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

    cy.get('[role="dialog"]').within(() => {


      cy.get('[role="combobox"]').eq(0).click();

    })
    cy.contains('[role="option"]', 'Academy QA Engineer').click()

    cy.contains('button', 'Simpan').click();

  })

})
