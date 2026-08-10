describe('Pengaturan - Kepegawaian - Jenis Guru - Delete', () => {

  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-12.43	Search sampai hasil tinggal 1 row → hapus row tersebut	Setelah hapus, sistem menampilkan halaman kosong (empty state UI)', () => {
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


    cy.wait(3000);
    cy.get('.animate-pulse').should('not.exist')
    cy.intercept(
      'GET',
      '**/api/proxy/setting/staffing/teacher_type*'
    ).as('loadInactive')
    cy.wait(3000)
    // Klik filter Tidak Aktif
    cy.contains('button[role="combobox"]', 'Status').click()
    cy.contains('[role="option"]', 'Tidak Aktif').click()

    cy.wait('@loadInactive')
      .its('response.statusCode')
      .should('eq', 200)



    cy.wait(3000)


    cy.get('button[data-slot="dialog-trigger"]').eq(2).click({ delay: 500 });
    cy.contains('button', 'Hapus').click();
  })

})
