describe('Pengaturan - Kepegawaian - Jenis Guru', () => {

  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-12.27	Klik icon Ubah (Edit) di row jenis guru	Form Edit terbuka dengan data ter-prefill: Instansi, Nama Jenis Guru, Status (Aktif/Tidak Aktif)', () => {
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
    cy.wait(1500)
    cy.get('button[data-slot="dialog-trigger"]').eq(1).click();


    cy.wait(1500);
  })

})
