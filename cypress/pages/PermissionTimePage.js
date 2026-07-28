class PermissionTimePage {
  elements = {
    // Sidebar Navigation Elements (PGT-16 Style)
    sidebarMenuPengaturan: () => cy.contains('[data-slot="accordion-menu-title"], button', /pengaturan/i, { timeout: 10000 }),
    sidebarMenuKesiswaan: () => cy.contains('button, [role="button"], a, span, [data-slot="accordion-menu-item"]', /kesiswaan/i, { timeout: 10000 }),
    sidebarMenuWaktuPerizinan: () => cy.contains('button, [data-slot="accordion-menu-item"], a, span', /^perizinan$|waktu perizinan/i, { timeout: 15000 }),

    // Dialog Container & Title (Radix / shadcn UI)
    dialogContainer: () => cy.get('[role="dialog"], [data-slot="dialog-content"]', { timeout: 15000 }),
    dialogTitle: () => cy.contains('[data-slot="dialog-title"], h2', /pengaturan perizinan/i, { timeout: 15000 }),

    // Dropdown Instansi
    instansiDropdown: () => this.elements.dialogContainer().find('button[role="combobox"], [data-slot="select-trigger"]').first(),
    instansiValue: () => this.elements.instansiDropdown().find('span, [data-slot="select-value"]'),
    selectOptions: () => cy.get('[role="option"], [data-slot="select-item"], [data-radix-collection-item], div[class*="select-item"]', { timeout: 15000 }),

    // Toggle Switch 'Batas Waktu Maksimal Pengajuan Perizinan'
    toggleSwitch: () => cy.get('button[role="switch"], button[data-slot="form-control"][role="switch"], [role="dialog"] button[role="switch"]', { timeout: 15000 }).first(),
    toggleLabel: () => cy.contains('label, span, div, p', /batas waktu maksimal pengajuan/i, { timeout: 10000 }),

    // Input Field Jam (hh:mm)
    timeInput: () => cy.get('[role="dialog"], [data-slot="dialog-content"]').find('[data-slot="datefield"]', { timeout: 10000 }),
    timeInputContainer: () => cy.contains('[data-slot="form-item"], label, div', /batas waktu maksimal pengajuan \(jam\)|batas waktu maksimal/i),

    // Helper Text & Information Box
    helperText: () => cy.contains('p.text-muted-foreground, p', /Contoh: Jika diatur pada pukul 07\.00/i, { timeout: 10000 }),
    infoBox: () => cy.get('[data-slot="info-note"], div:contains("Informasi")'),

    // Tombol Simpan & Close
    saveBtn: () => cy.get('[role="dialog"] button[type="submit"], [data-slot="dialog-footer"] button, button:contains("Simpan")', { timeout: 15000 }).first(),
    closeBtn: () => cy.get('[role="dialog"] button[data-slot="dialog-close"]', { timeout: 15000 }),

    // Validation & Toast Notifications
    validationError: () => cy.get('[data-slot="form-message"], [data-slot="error"], p.text-destructive, p.text-red-500, [role="alert"], [data-sonner-toast]', { timeout: 15000 }),
    toastMessage: () => cy.get('.toast, [role="status"], [class*="toast"], [data-slot="toast"], [data-sonner-toast]', { timeout: 15000 })
  };

  // ---------------------------------------------------------------------------
  // ACTIONS & BUSINESS LOGIC
  // ---------------------------------------------------------------------------
  visitWithoutSelect() {
    cy.visit('/setting/student-affairs/violation-type', { failOnStatusCode: false, timeout: 30000 });
    cy.get('body', { timeout: 15000 }).should('be.visible');
    cy.wait(1500);

    cy.get('body').type('{esc}{esc}', { force: true });
    cy.wait(500);

    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"]:contains("Pengaturan Perizinan")').length === 0) {
        this.elements.sidebarMenuWaktuPerizinan().click({ force: true });
        cy.wait(1500);
      }
    });

    cy.get('body').then(($body) => {
      if ($body.text().includes('Peran Belum Ditetapkan') || $body.text().includes('Hubungi admin')) {
        cy.log('Terdeteksi halaman Peran Belum Ditetapkan. Memulihkan sesi login...');
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.login();
        cy.visit('/setting/student-affairs/violation-type', { failOnStatusCode: false, timeout: 30000 });
        cy.get('body', { timeout: 15000 }).should('be.visible');
        this.elements.sidebarMenuWaktuPerizinan().click({ force: true });
        cy.wait(1500);
      }
    });

    this.elements.dialogContainer().should('be.visible');
  }

  visit(instansiText = 'Sekolah Digital Indonesia') {
    this.visitWithoutSelect();
    this.selectInstansi(instansiText);
  }

  selectInstansi(instansiText = 'Sekolah Digital Indonesia') {
    cy.get('body').then(($body) => {
      if ($body.find('[role="dialog"]:contains("Pengaturan Perizinan")').length === 0) {
        this.elements.sidebarMenuWaktuPerizinan().click({ force: true });
        cy.wait(1500);
      }
    });

    this.elements.dialogContainer().then(($dialog) => {
      const currentVal = $dialog.find('[data-slot="select-value"]').text().trim();
      if (currentVal && currentVal.toLowerCase().includes(instansiText.toLowerCase())) {
        cy.log(`Instansi ${instansiText} sudah terpilih.`);
        return;
      }

      const trigger = $dialog.find('button[role="combobox"], [data-slot="select-trigger"]').first();
      cy.wrap(trigger).scrollIntoView();
      cy.wait(300);
      cy.wrap(trigger).click({ force: true });
      cy.wait(800);

      cy.get('body').then(($body) => {
        if ($body.find('[role="option"], [data-slot="select-item"], [data-radix-collection-item]').length === 0) {
          cy.log('Portal instansi belum muncul, klik ulang trigger...');
          cy.wrap(trigger).click({ force: true });
          cy.wait(800);
        }
      });

      this.elements.selectOptions()
        .contains(new RegExp(instansiText, 'i'))
        .click({ force: true });
      cy.wait(1500);
    });
  }

  toggleOn() {
    this.elements.instansiValue().then(($val) => {
      if ($val.text().includes('Pilih Instansi')) {
        this.selectInstansi('Sekolah Digital Indonesia');
      }
    });
    this.elements.toggleSwitch().then(($switch) => {
      const isChecked = $switch.attr('aria-checked') === 'true' || $switch.is(':checked') || $switch.attr('data-state') === 'checked';
      if (!isChecked) {
        cy.wrap($switch).click({ force: true });
        cy.wait(800);
      }
    });
  }

  toggleOff() {
    this.elements.instansiValue().then(($val) => {
      if ($val.text().includes('Pilih Instansi')) {
        this.selectInstansi('Sekolah Digital Indonesia');
      }
    });
    this.elements.toggleSwitch().then(($switch) => {
      const isChecked = $switch.attr('aria-checked') === 'true' || $switch.is(':checked') || $switch.attr('data-state') === 'checked';
      if (isChecked) {
        cy.wrap($switch).click({ force: true });
        cy.wait(800);
      }
    });
  }

  fillTime(timeString) {
    if (timeString === undefined) return;
    cy.get('body').then(($body) => {
      const hourSpan = $body.find('[data-slot="datefield"] [data-type="hour"], [role="spinbutton"][aria-label="hour"]');
      if (hourSpan.length > 0) {
        if (timeString === '') {
          cy.wrap(hourSpan.first()).focus().clear({ force: true });
        } else {
          const parts = timeString.split(':');
          const hh = parts[0] || '09';
          const mm = parts[1] || '00';
          cy.wrap(hourSpan.first()).focus().type(hh, { force: true });
          const minSpan = $body.find('[data-slot="datefield"] [data-type="minute"], [role="spinbutton"][aria-label="minute"]');
          if (minSpan.length > 0) {
            cy.wrap(minSpan.first()).focus().type(mm, { force: true });
          }
        }
      } else {
        const input = $body.find('input[name="max_time"], input[name="time"], input[type="time"], input[data-slot="input"]');
        if (input.length > 0) {
          cy.wrap(input.first()).clear({ force: true });
          if (timeString !== '') {
            cy.wrap(input.first()).type(timeString, { force: true });
          }
        }
      }
    });
    cy.wait(300);
  }

  save() {
    cy.wait(1000);
    this.elements.saveBtn().scrollIntoView().click({ force: true });
    cy.wait(2500);
  }
}

export default new PermissionTimePage();
