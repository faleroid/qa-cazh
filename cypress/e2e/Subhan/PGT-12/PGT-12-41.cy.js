describe('Pengaturan - Kepegawaian - Jenis Guru - Delete', () => {

  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-12.41	Buka popup Hapus → klik btn "Batal"	Popup tertutup, jenis guru TIDAK terhapus, data tetap ada di list', () => {
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
    cy.get('button[data-slot="dialog-trigger"]').eq(2).click({ delay: 500 });
    cy.contains('button', 'Batal').click();
  })

})
