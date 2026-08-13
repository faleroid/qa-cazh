describe('PGT-13.6	Isi Nama Jenis Staff tapi tidak pilih Instansi → klik Simpan	Error "Instansi wajib diisi" muncul, tombol Simpan tidak bekerja, form tetap terbuka', () => {

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
    cy.contains('button', 'Tambah Jenis Staff').click();

    cy.get('[role="dialog"]').should('be.visible');

    cy.get('input[name="name"]')
      .focus()
      .type('Staff IT', { delay: 100 })
    cy.contains('button', 'Simpan').click({ delay: 500 });
  })

})
