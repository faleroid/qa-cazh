describe('Pengaturan - Kepegawaian - Jenis Guru - Search', () => {

  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-12.25	Ketik keyword yang tidak match ("xyz123abc")	Sistem menampilkan halaman kosong (empty state UI)', () => {
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


    cy.intercept(
      'GET',
      '**/api/proxy/setting/staffing/teacher_type*'
    ).as('loadInactive')

    // Klik filter Tidak Aktif
    cy.get('input[data-slot="input"]')
      .type('xyz123abc{enter}')

    cy.wait('@loadInactive')
      .its('response.statusCode')
      .should('eq', 200);
    cy.wait(1500);
  })

})
