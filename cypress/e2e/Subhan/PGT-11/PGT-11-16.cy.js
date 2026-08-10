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

    cy.contains('Partner').click();

    // 1. Definisikan path file logo Anda (simpan file di folder cypress/fixtures/)
    const logoPath = 'cypress/fixtures/test1.png';

    // 2. Cari elemen input file dan unggah filenya
    // Gunakan { force: true } jika input file aslinya disembunyikan secara CSS oleh sistem drag-and-drop
    cy.get('input[type="file"]').selectFile(logoPath, { force: true });
    cy.get('[name="partner_name"]').click();
    cy.get('[name="partner_name"]').clear();

    cy.get('[name="partner_email"]').click();
    cy.get('[name="partner_email"]').clear()

    cy.get('[name="partner_phone"]').click();
    cy.get('[name="partner_phone"]').clear();

    cy.get('[name="partner_address"]').click();
    cy.get('[name="partner_address"]').clear();

    cy.get('[name="partner_pic"]').click();
    cy.get('[name="partner_pic"]').clear();

    cy.get('[name="partner_pic_phone"]').click();
    cy.get('[name="partner_pic_phone"]').clear();




    cy.contains('Simpan').click();
    cy.wait(1500);
  })

})