// Custom command untuk login dengan cy.session
Cypress.Commands.add('login', (email = 'androidtesting117@gmail.com', password = 'f7ki6b2u') => {
  cy.session([email, password], () => {
    // 1. Buka halaman login
    cy.visit('/login');

    // 2. Tunggu form login muncul
    cy.get('input[type="email"], input[name="email"], input[name="username"], input[type="text"]', { timeout: 10000 })
      .first()
      .should('be.visible')
      .clear()
      .type(email);

    // 3. Isi password
    cy.get('input[type="password"], input[name="password"]')
      .first()
      .should('be.visible')
      .clear()
      .type(password);

    // 4. Klik tombol submit / login
    cy.contains('button', /masuk|login/i, { timeout: 5000 })
      .should('be.visible')
      .click({ force: true });

    // 5. Berikan waktu untuk penyimpanan token/cookie autentikasi
    cy.wait(3000);
  });
});