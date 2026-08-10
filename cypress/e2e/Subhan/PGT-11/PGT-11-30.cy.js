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

    cy.contains('Halaman Utama').click();
    cy.get('[role="checkbox"]')
      .click();
    cy.get('[role="checkbox"]').then(($switch) => {
      // Mengambil nilai atribut aria-checked
      const isChecked = $switch.attr('aria-checked') === 'false';

      // Jika belum di-check (true), maka lakukan klik
      if (!isChecked) {
        cy.wrap($switch).click();
      }
    });
    cy.wait(1500);
  })

})