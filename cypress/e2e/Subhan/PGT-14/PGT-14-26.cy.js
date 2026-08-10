describe('Pengaturan - Tagihan - Jenis Tagihan - Tambah Jenis Tagihan', () => {
  afterEach(() => {
    cy.wait(1500)
  })
  it('PGT-14.26	Load halaman list Jenis Tagihan	List tampil dengan kolom: Instansi, Nama Jenis Tagihan, Pengulangan Tagihan, Periode Tagihan, Status, Aksi', () => {
    cy.visit('https://v3.cazh.id/auth/login')

    cy.get('[name="email"]').click();
    cy.get('[name="email"]').type('androidtesting117@gmail.com');
    cy.get('form.my-10 > div:nth-child(2)').click();
    cy.get('[name="password"]').click();
    cy.get('[name="password"]').type('f7ki6b2u');
    cy.get('svg.lucide-eye').click();
    cy.contains('button', 'Masuk').click();
    cy.contains('PENGATURAN').click();
    cy.contains('Tagihan').click();
    cy.get('a[href="/setting/invoice/invoice-type"]').click()


  })

})
