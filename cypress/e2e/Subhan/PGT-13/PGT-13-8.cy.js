describe('PGT-13.8	Klik Simpan tanpa isi field apapun	Error muncul di kedua field required (Instansi + Nama Jenis Staff), tombol Simpan tidak bekerja', () => {

  afterEach(() => {
    cy.wait(1500)
  })
  it('passes', () => {
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
    cy.contains('Jenis Staff').click();
    cy.get('.animate-pulse').should('not.exist')
    cy.wait(3000);
    cy.contains('button', 'Tambah Jenis Staff').click({ delay: 500 });
    cy.contains('button', 'Simpan').click();

  })

})
