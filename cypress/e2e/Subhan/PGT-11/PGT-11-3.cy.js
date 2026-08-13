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

    cy.get('[name="app_name"]').click();
    cy.get('[name="app_name"]').clear();
    cy.get('[name="app_name"]').type('SMA');
    cy.get('[name="bill_name"]').click();
    cy.get('[name="bill_name"]').clear()
    cy.get('[name="bill_name"]').type('Tagihan F');
    cy.get('[name="student_name"]').click();
    cy.get('[name="student_name"]').clear();
    cy.get('[name="student_name"]').type('siswa siswi');
    cy.contains('Simpan').click();
    cy.contains('Partner').click();
    cy.wait(1500);
  })

})