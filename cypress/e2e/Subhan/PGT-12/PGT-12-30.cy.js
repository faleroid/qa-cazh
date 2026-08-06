describe('Pengaturan - Kepegawaian - Jenis Guru - Edit', () => {

  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-12.30	Ubah Status dari "Tidak Aktif" ke "Aktif" → klik Simpan	Toast success, badge Status berubah jadi "Aktif" (hijau)', () => {
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
    cy.intercept(
      'GET',
      '**/api/proxy/setting/staffing/teacher_type*'
    ).as('loadInactive')

    // Klik filter Tidak Aktif
    cy.contains('button[role="combobox"]', 'Status').click()
    cy.contains('[role="option"]', 'Tidak Aktif').click()

    cy.wait('@loadInactive')
      .its('response.statusCode')
      .should('eq', 200)
    cy.wait(1500);

    cy.get('button[data-slot="dialog-trigger"]').eq(1).click();

    cy.get('[role="dialog"]').should('be.visible')

    cy.get('[role="dialog"]').within(() => {


      cy.get('[role="combobox"]').eq(1).click();

    })
    cy.contains('[role="option"]', 'Aktif').click()

    cy.contains('button', 'Simpan').click();

  })

})
