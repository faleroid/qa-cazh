import spmbData from '../fixtures/spmbData.json';

class SpmbLandingPage {
  visitAdminWebSetting() {
    cy.login();
    cy.visit('https://v3.cazh.id/member/admission/setting', {
      failOnStatusCode: false,
      timeout: 30000
    });
    cy.location('pathname', { timeout: 20000 }).should('eq', '/member/admission/setting');
    cy.contains('body', 'Pengaturan Web', { timeout: 20000 }).should('be.visible');
  }

  getPublicHomeTitle() {
    this.visitInstance();
    return cy.get('h1', { timeout: 20000 })
      .filter(':visible')
      .first()
      .then(($heading) => {
        const title = Array.from($heading.find('span')).map((span) => (span.textContent || '').trim()).join(' ').replace(/\s+/g, ' ').trim() ||
          String($heading.text() || '').replace(/\s+/g, ' ').trim();
        expect(title, 'Judul pada hero landingpage SPMB harus terisi').to.not.equal('');
        return title;
      });
  }

  getConfiguredHomeTitle() {
    this.visitAdminWebSetting();
    cy.get('button[aria-haspopup="dialog"]', { timeout: 20000 })
      .filter((i, element) => /instansi/i.test(element.innerText || ''))
      .first()
      .should('be.visible')
      .click({ force: true });
    cy.contains('[role="option"]', /yayasan new school/i, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });
    cy.wait(1000);

    return cy.get('input[name="web_title"]', { timeout: 20000 })
      .should('be.visible')
      .invoke('val')
      .then((value) => {
        const title = String(value || '').trim();
        expect(title, 'Konfigurasi Judul Web Yayasan New School harus terisi').to.not.equal('');
        return title;
      });
  }

  visitPartner() {
    cy.visit(spmbData.partnerUrl, { failOnStatusCode: false, timeout: 30000 });
    cy.wait(2000);
    cy.get('body', { timeout: 20000 }).should('be.visible');
  }

  visitInstance() {
    cy.visit(`${new URL(spmbData.partnerUrl).origin}${spmbData.instancePath}`, {
      failOnStatusCode: false,
      timeout: 30000
    });
    cy.wait(2000);
    cy.get('body', { timeout: 20000 }).should('be.visible');
  }

  bodyText() {
    return cy.get('body', { timeout: 20000 }).invoke('text').then((text) => text.replace(/\s+/g, ' ').trim());
  }

  visibleText(pattern, message) {
    cy.get('body', { timeout: 20000 }).should(($body) => {
      expect($body.text(), message).to.match(pattern);
    });
  }

  clickApply() {
    cy.get('body', { timeout: 20000 }).then(($body) => {
      const apply = Array.from($body.find('a, button, [role="button"]')).find((el) => /daftar sekarang|apply now/i.test(el.innerText || ''));
      if (apply) {
        cy.wrap(apply).scrollIntoView({ offset: { top: -120, left: 0 } }).should('be.visible').click({ force: true });
      } else {
        expect($body.text(), 'Halaman SPMB harus sudah menampilkan daftar Instansi atau tombol pendaftaran').to.match(/daftar instansi|lihat pendaftaran|daftar sekarang|apply now/i);
      }
    });
    cy.wait(1500);
  }

  clickInstitutionApply() {
    cy.get('a[href*="/spmb/"]', { timeout: 20000 }).then(($links) => {
      const validLink = Array.from($links).find((el) => {
        const href = el.getAttribute('href') || '';
        const label = el.innerText || '';
        return !/\/spmb\/null(?:[/?#]|$)/i.test(href) &&
          /daftar sekarang|apply now|lihat pendaftaran/i.test(label);
      });

      expect(validLink, 'Harus memilih Instansi dengan URL SPMB valid, bukan Academy Cazh/Academy QA Engineer yang mengarah ke 404').to.exist;
      cy.wrap(validLink)
        .scrollIntoView({ offset: { top: -120, left: 0 } })
        .should('be.visible')
        .click({ force: true });
    });
    cy.wait(1500);
  }

  assertPartnerSections() {
    this.visibleText(/penerimaan siswa baru|pilih instansi|daftar instansi/i, 'Landingpage SPMB harus menampilkan halaman pemilihan Instansi');
    cy.get('main, header, img, [role="link"], a[href*="/spmb/"]', { timeout: 20000 }).should('have.length.at.least', 1);
  }

  assertInstitutionList() {
    this.visibleText(/instansi|sekolah|institution/i, 'Daftar Instansi SPMB harus tampil');
    cy.get('a, button, [role="button"]', { timeout: 20000 })
      .filter((i, el) => /daftar sekarang|apply now|lihat pendaftaran/i.test(el.innerText || ''))
      .should('have.length.at.least', 1);
  }

  assertInstanceUrl() {
    cy.url().should('match', /\/spmb\/(?!null(?:[/?#]|$))[^/?#]+/i);
  }

  assertHomeSection() {
    this.visibleText(/judul|daftar sekarang|apply now|alur pendaftaran|admission process/i, 'Section Beranda SPMB harus menampilkan konten utama');
    cy.contains('a, button, [role="button"]', /daftar sekarang|apply now/i, { timeout: 20000 }).should('exist');
  }

  assertConfiguredTitle() {
    cy.title().should('not.be.empty');
    cy.get('h1, h2, [data-testid*="title"], [class*="title"]', { timeout: 20000 }).filter(':visible').should('have.length.at.least', 1);
  }

  assertLandingTitleMatches(configuredTitle) {
    expect(configuredTitle, 'Judul Web dari konfigurasi admin harus tersedia').to.be.a('string').and.not.empty;
    cy.get('h1, h2, [data-testid*="title"], [class*="title"]', { timeout: 20000 })
      .filter(':visible')
      .should('have.length.at.least', 1)
      .then(($titles) => {
        const matches = Array.from($titles).some((element) => {
          const text = (element.innerText || '').replace(/\s+/g, ' ').trim();
          return text === configuredTitle || text.includes(configuredTitle) || configuredTitle.includes(text);
        });
        expect(matches, `Judul Web publik harus sesuai konfigurasi admin: "${configuredTitle}"`).to.be.true;
      });
  }

  assertConfiguredTitleMatchesPublic(publicTitle) {
    this.getConfiguredHomeTitle().then((configuredTitle) => {
      const normalizeTitle = (value) => String(value || '').replace(/\s+/g, ' ').trim().toLowerCase();
      expect(normalizeTitle(configuredTitle), 'Judul Web admin harus sama dengan judul landingpage publik').to.equal(normalizeTitle(publicTitle));
    });
  }

  assertAvailableQuota() {
    const cardSelector = `a[href="${spmbData.registrationPath}"]`;

    cy.get(cardSelector, { timeout: 20000 })
      .should('be.visible')
      .closest('div.rounded-2xl')
      .should('be.visible')
      .within(() => {
        cy.contains(/yayasan new school/i).should('be.visible');
        cy.contains(/pendaftaran[\s\S]*siswa[\s\S]*baru/i).should('be.visible');
        cy.contains(/batch i/i).should('be.visible');
        cy.contains(/1 jul 2026.*30 sep 2026/i).should('be.visible');
        cy.contains(/^kuota$/i).should('be.visible');
        cy.contains(new RegExp(`^${spmbData.availableQuota}$`)).should('be.visible');
        cy.get(cardSelector)
          .should('be.visible')
          .and('not.have.attr', 'aria-disabled', 'true');
      });
  }

  assertRegistrationForm() {
    cy.get('form, input, textarea, select', { timeout: 20000 }).filter(':visible').should('have.length.at.least', 1);
  }

  assertFullQuotaState() {
    cy.get('body', { timeout: 20000 }).should(($body) => {
      const apply = Array.from($body.find('a, button, [role="button"]')).filter((el) => /daftar sekarang|apply now/i.test(el.innerText || ''));
      const fullMessage = /kuota penuh|pendaftaran ditutup|quota full|registration closed/i.test($body.text());
      const disabled = apply.some((el) => el.disabled || el.getAttribute('aria-disabled') === 'true');
      expect(fullMessage || disabled, 'Kuota penuh harus menutup atau menonaktifkan pendaftaran').to.be.true;
    });
  }

  assertAdmissionProcess() {
    cy.get('a[href="#alur"]', { timeout: 20000 })
      .filter((i, element) => /alur pendaftaran|admission process/i.test(element.innerText || ''))
      .first()
      .should('be.visible')
      .click({ force: true });
    cy.wait(700);
    cy.location('hash', { timeout: 10000 }).should('eq', '#alur');
    cy.get('section#alur', { timeout: 20000 })
      .should('be.visible')
      .within(() => {
        cy.contains('h2', /alur.*pendaftaran/i).should('be.visible');
        cy.contains('h3', 'Pendaftaran').should('be.visible');
        cy.contains('h3', 'Pembayaran').should('be.visible');
        cy.contains('h3', 'Proses Seleksi').should('be.visible');
        cy.contains('h3', 'Pengumuman').should('be.visible');
        cy.contains('h3', 'Daftar Ulang').should('be.visible');
        cy.get('p').filter(':visible').should('have.length.at.least', 6);
      });
  }

  assertScheduleAndFees() {
    cy.get('a[href="#jadwal"]', { timeout: 20000 })
      .filter((i, element) => /jadwal\s*&\s*biaya|schedule\s*&\s*fees/i.test(element.innerText || ''))
      .first()
      .should('be.visible')
      .click({ force: true });
    cy.wait(700);
    cy.location('hash', { timeout: 10000 }).should('eq', '#jadwal');
    cy.get('section#jadwal', { timeout: 20000 })
      .should('be.visible')
      .within(() => {
        cy.contains('h2', /jadwal.*biaya/i).should('be.visible');
        cy.contains('h3', /pendaftaran\s*siswa\s*baru/i).should('be.visible');
        cy.contains('h4', /batch\s*i/i).should('be.visible');
        cy.contains(/1 mei 2026.*30 sep 2026/i).should('be.visible');
        cy.contains(/^kuota$/i).should('be.visible');
        cy.contains('a[href="/spmb/yayasan-new-school/registration"]', /daftar sekarang/i)
          .should('be.visible')
          .and('not.have.attr', 'aria-disabled', 'true');
      });
  }

  assertScheduleName() {
    this.getAdminSchedule().then((schedule) => {
      this.visitInstance();
      this.openScheduleSection();
      cy.get('section#jadwal').contains('h4', schedule.name).should('be.visible');
    });
  }

  assertDateRange() {
    this.getAdminSchedule().then((schedule) => {
      this.visitInstance();
      this.openScheduleSection();
      cy.get('section#jadwal').should(($section) => {
        const text = ($section.text() || '').replace(/\s+/g, ' ');
        expect(text, 'Range tanggal publik harus tampil').to.include(schedule.startDay.replace(/^0/, ''));
        expect(text, 'Tanggal selesai publik harus tampil').to.include(schedule.endDay.replace(/^0/, ''));
      });
    });
  }

  assertSinglePrice() {
    this.getAdminSchedule().then((schedule) => {
      expect(schedule.singlePrice, 'Admin harus mengaktifkan Harga Untuk Semua Jurusan').to.be.true;
      this.visitInstance();
      this.openScheduleSection();
      cy.get('section#jadwal .rounded-2xl').filter(':has(a[href*="/registration"])').first().within(() => {
        cy.contains(/semua jurusan/i).should('be.visible');
        cy.get('p').filter((i, element) => /rp\s*[\d.,]+/i.test(element.innerText || '')).should('have.length.at.least', 2);
        cy.get('s, del, [class*="line-through"]').should('have.length.at.least', 1);
      });
    });
  }

  assertPricePerMajor() {
    this.setScheduleSinglePrice(false);
    this.getAdminSchedule().then((schedule) => {
      expect(schedule.singlePrice, 'Admin harus menonaktifkan Harga Untuk Semua Jurusan').to.be.false;
      this.visitInstance();
      this.openScheduleSection();
      cy.get('section#jadwal .rounded-2xl').filter(':has(a[href*="/registration"])').first().within(() => {
        cy.get('p, span').filter((i, element) => /jurusan|program studi|major/i.test(element.innerText || ''))
          .should('have.length.at.least', 1);
        cy.get('p').filter((i, element) => /rp\s*[\d.,]+/i.test(element.innerText || '')).should('have.length.at.least', 2);
        cy.get('s, del, [class*="line-through"]').should('have.length.at.least', 1);
      });
    });
  }

  setScheduleSinglePrice(enabled) {
    this.visitAdminWebSetting();
    cy.get('button[aria-haspopup="dialog"]').filter((i, element) => /instansi/i.test(element.innerText || ''))
      .first().click({ force: true });
    cy.contains('[role="option"]', /yayasan new school/i, { timeout: 10000 }).click({ force: true });
    cy.contains('[role="tab"]', /^jadwal$/i, { timeout: 10000 }).click({ force: true });
    cy.get('[role="tabpanel"]', { timeout: 20000 }).filter(':visible').should('contain.text', 'Batch I');
    cy.get('tbody tr, [role="row"]', { timeout: 20000 }).filter(':visible').then(($rows) => {
      const row = Array.from($rows).find((element) => /batch\s+i\b/i.test(element.innerText || ''));
      expect(row, 'Jadwal Batch I harus tersedia sebelum diedit').to.exist;
      cy.wrap(row).find('button').first().click({ force: true });
    });
    cy.get('[role="dialog"]', { timeout: 15000 }).should('be.visible').within(() => {
      cy.contains(/harga untuk semua jurusan|satu harga/i).should('be.visible');
      cy.get('button[role="switch"], [role="switch"], input[type="checkbox"]').first().then(($toggle) => {
        const current = $toggle.attr('aria-checked') === 'true' || $toggle.prop('checked') === true;
        if (current !== enabled) {
          cy.wrap($toggle).click({ force: true });
        }
      });
      cy.contains('button', /simpan|save/i).click({ force: true });
    });
    cy.get('[role="dialog"]', { timeout: 15000 }).should('not.exist');
  }

  assertNoDiscountRendering() {
    this.visitInstance();
    this.openScheduleSection();
    cy.get('section#jadwal .rounded-2xl').filter(':has(a[href*="/registration"])').first().within(() => {
      cy.get('p').filter((i, element) => /rp\s*[\d.,]+/i.test(element.innerText || '')).should('have.length.at.least', 1);
      cy.get('s, del, [class*="line-through"]').each(($price) => {
        const text = ($price.text() || '').replace(/\s+/g, ' ').trim();
        expect(text, 'Harga coret tidak boleh kosong').to.not.equal('');
      });
    });
  }

  assertNoScheduleEmptyState() {
    this.getAdminSchedule().then((schedule) => {
      this.visitInstance();
      this.openScheduleSection();
      if (schedule.active) {
        cy.get('section#jadwal a[href*="/registration"]').should('have.length.at.least', 1);
      } else {
        cy.get('section#jadwal').should('contain.text', 'Belum ada jadwal pendaftaran');
      }
    });
  }

  assertRequirements() {
    this.assertPublicSection('persyaratan|requirements', 'Deskripsi persyaratan harus tampil');
  }

  assertRequirementsEmptyState() {
    cy.get('section, [data-slot="card"]', { timeout: 20000 })
      .filter((i, element) => /persyaratan|requirements/i.test(element.innerText || ''))
      .filter(':visible')
      .first()
      .should('be.visible')
      .then(($section) => {
        const text = ($section.text() || '').replace(/\s+/g, ' ').trim();
        const empty = /belum ada persyaratan|persyaratan belum tersedia|no requirements/i.test(text);
        if (empty) {
          expect(empty, 'Empty state persyaratan harus eksplisit').to.be.true;
        } else {
          expect($section.find('p:visible').length, 'Persyaratan terisi harus memiliki deskripsi').to.be.greaterThan(0);
        }
      });
  }

  assertInformation() {
    this.assertPublicSection('informasi|information', 'Section Informasi harus tersedia untuk diverifikasi');
  }

  openScheduleSection() {
    cy.get('a[href="#jadwal"]', { timeout: 20000 })
      .filter((i, element) => /jadwal\s*&\s*biaya|schedule\s*&\s*fees/i.test(element.innerText || ''))
      .first().click({ force: true });
    cy.location('hash', { timeout: 10000 }).should('eq', '#jadwal');
    cy.get('section#jadwal', { timeout: 20000 }).should('be.visible');
  }

  assertPublicSection(pattern, message) {
    cy.get('section, [data-slot="card"]', { timeout: 20000 })
      .filter((i, element) => new RegExp(pattern, 'i').test(element.innerText || ''))
      .filter(':visible')
      .should('have.length.at.least', 1)
      .first()
      .scrollIntoView({ offset: { top: -120, left: 0 } })
      .should('be.visible')
      .within(() => cy.get('p').filter(':visible').should('have.length.at.least', 1))
      .then(() => {
        cy.log(message);
      });
  }

  getAdminSchedule() {
    this.visitAdminWebSetting();
    cy.get('button[aria-haspopup="dialog"]').filter((i, element) => /instansi/i.test(element.innerText || ''))
      .first().click({ force: true });
    cy.contains('[role="option"]', /yayasan new school/i, { timeout: 10000 }).click({ force: true });
    cy.get('button[aria-haspopup="dialog"]', { timeout: 15000 })
      .filter((i, element) => /yayasan new school/i.test(element.innerText || ''))
      .should('have.length.at.least', 1);
    cy.contains('[role="tab"]', /^jadwal$/i, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });
    cy.get('[role="tabpanel"][aria-label="Jadwal"], [role="tabpanel"]', { timeout: 20000 })
      .filter(':visible')
      .should('contain.text', 'Daftar Jadwal SPMB')
      .and('contain.text', 'Batch I');
    return cy.get('tbody tr, [role="row"]', { timeout: 20000 }).filter(':visible').then(($rows) => {
      const row = Array.from($rows).find((element) => /batch\s+i\b/i.test(element.innerText || ''));
      expect(row, 'Jadwal Batch I harus tersedia di admin').to.exist;
      const text = (row.innerText || '').replace(/\s+/g, ' ');
      const range = text.match(/(\d{1,2}\s+\w+\s+\d{4}).*?(\d{1,2}\s+\w+\s+\d{4})/i);
      expect(range, 'Range tanggal jadwal admin harus terbaca').to.exist;
      const priceColumn = text.split(/\d{1,2}\s+\w+\s+\d{4}/i)[0];
      return {
        name: (text.match(/Batch\s+[IVX]+/i) || [])[0],
        startDay: range[1],
        endDay: range[2],
        active: /aktif/i.test(text),
        singlePrice: /\bYA\b/i.test(priceColumn)
      };
    });
  }
}

export default new SpmbLandingPage();
