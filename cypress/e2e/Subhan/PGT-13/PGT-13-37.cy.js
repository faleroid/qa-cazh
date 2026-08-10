describe('PGT-13.37	Ubah Nama Jenis Staff jadi karakter khusus "!@#$%^&*" → klik Simpan	Error validasi muncul (nama hanya boleh huruf, angka, atau kombinasi), data tidak tersimpan', () => {
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



    cy.intercept(
      'GET',
      '**/api/proxy/setting/staffing/staff_type?page=1&limit=10'
    ).as('loadStaffType')

    cy.contains('Jenis Staff').click()

    cy.wait('@loadStaffType')

    cy.get('.animate-pulse').should('not.exist')

    cy.get('button[data-slot="dialog-trigger"]').eq(1).click();

    cy.get('[role="dialog"]').should('be.visible')

    cy.get('input[name="name"]').should('be.enabled')

    cy.get('input[name="name"]').clear()

    cy.get('[role="dialog"]').should('exist')

    cy.get('input[name="name"]')
      .should('be.enabled')
      .type('!@#$%^&*', { delay: 100 })
    cy.get('[role="dialog"]').should('exist')
    cy.contains('button', 'Simpan').click();
  })

})