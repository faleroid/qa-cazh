describe('Pengaturan - Aplikasi ', () => {
    it('passes', () => {
        cy.visit('https://v3.cazh.id')
            -
            cy.get('a[href="/auth/login"]').click();

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
        cy.contains('button', 'Tambah').click();

        cy.wait(1500);
        cy.wait(1500);
    })

})