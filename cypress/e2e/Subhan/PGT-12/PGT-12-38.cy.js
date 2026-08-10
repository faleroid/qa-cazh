describe('Pengaturan - Kepegawaian - Jenis Guru - Edit', () => {

  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-12.38	Ubah Nama Jenis Guru dengan spasi di awal & akhir → klik Simpan	Data disimpan tanpa spasi tepi (auto-trim), nama tersimpan clean', () => {
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

    cy.get('[role="dialog"]').should('be.visible')

    cy.get('input[name="name"]').should('be.visible')
      .focus()
      .type('            Guru ', { delay: 100 })

    cy.contains('button', 'Simpan').click();

  })

})
