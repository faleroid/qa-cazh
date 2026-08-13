describe('Pengaturan - Aplikasi ', () => {

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
    cy.contains('Aplikasi').click();
    cy.contains('[role="tab"]', 'Program Penerimaan')
      .click();

    cy.get('[role="combobox"]')
      .click();
    cy.get('[role="option"]')
      .contains('SPMB')
      .click();
    cy.contains('button', 'Simpan').click();
    cy.contains('ANGGOTA').click();


    cy.wait(1500);
  })

})