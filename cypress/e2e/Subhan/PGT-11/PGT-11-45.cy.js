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
    cy.contains('SPMB').click();

    // Pasang intercept sebelum klik apa pun
    cy.intercept('GET', '**/api/proxy/admission/profile*').as('loadProfile')
    cy.intercept('GET', '**/api/proxy/admission/registration-flows*').as('loadBeranda')
    cy.intercept('GET', '**/api/proxy/admission/schedules*').as('loadJadwal')

    // Buka Pengaturan Web
    cy.contains('Pengaturan Web').click()

    // Tunggu Profil selesai dimuat
    cy.wait('@loadProfile')

    // Klik Beranda
    cy.contains('Beranda').click()

    // Tunggu Beranda selesai dimuat
    cy.wait('@loadBeranda')

    // Klik Jadwal
    cy.contains('Jadwal').click()

    // Tunggu Jadwal selesai dimuat
    cy.wait('@loadJadwal')

    cy.wait(1500);
  })

})