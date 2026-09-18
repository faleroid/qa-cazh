// Custom command untuk login dengan cy.session
Cypress.Commands.add('login', (email = 'androidtesting117@gmail.com', password = 'f7ki6b2u') => {
  cy.session(
    [email, password],
    () => {
      // 1. Buka halaman login
      cy.visit('https://v3.cazh.id/auth/login');

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
    },
    {
      validate() {
        cy.visit('https://v3.cazh.id/dashboard', { failOnStatusCode: false });
        cy.get('body', { timeout: 15000 }).should('not.contain.text', 'Peran Belum Ditetapkan');
      }
    }
  );
});

// Schema 2: Fill form input by label regex
Cypress.Commands.add('fillFormInput', (labelRegex, value) => {
  cy.get('form, [role="dialog"]').then(($form) => {
    const labels = $form.find('label');
    let matched = false;
    labels.each((i, label) => {
      if (labelRegex.test(Cypress.$(label).text())) {
        const input = Cypress.$(label).parent().find('input');
        if (input.length > 0) {
          cy.wrap(input).first().clear().type(value);
          matched = true;
          return false; // break
        }
      }
    });
    if (!matched) {
      cy.get('form, [role="dialog"]').find('input[type="text"], input:not([type="hidden"])').first().clear().type(value);
    }
  });
  cy.wait(500);
});

// Schema 3: Select instansi from dropdown
Cypress.Commands.add('selectInstansi', (instansiName) => {
  cy.get('form, [role="dialog"]').then(($form) => {
    const instBtn = $form.find('button:contains("Pilih Instansi"), button:contains("Instansi"), button:contains("Institution")');
    if (instBtn.length > 0) {
      cy.wrap(instBtn).first().click({ force: true });
    } else {
      cy.get('form, [role="dialog"]').contains('button', /Instansi|Institution|Pilih Instansi/i).click({ force: true });
    }
  });
  cy.wait(1500);
  cy.get('[role="option"]').contains(instansiName).click({ force: true });
  cy.wait(1000);
});

// Schema 4: Create academic record (open add modal, select instansi, fill name, save)
Cypress.Commands.add('createAcademicRecord', (addBtnRegex, recordName) => {
  cy.contains('button', addBtnRegex).click({ force: true });
  cy.wait(1000);

  cy.selectInstansi('Sekolah Digital Indonesia');

  cy.fillFormInput(/Kamar|Room|Nama|Kelas|Class|Tingkat|Level|Jurusan|Major/i, recordName);

  cy.contains('button', /Save|Simpan/i).click({ force: true });
  cy.wait(2500);
});

// Schema 5: Open row edit modal (click pencil icon on matching row)
Cypress.Commands.add('openRowEditModal', (recordName) => {
  cy.get('table tbody tr').contains(recordName).closest('tr')
    .find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"], button[aria-label*="edit"], button[aria-label*="Edit"]')
    .first().closest('button').click({ force: true });
  cy.wait(1500);
});

// Schema 5b: Open row delete dialog (click trash icon on matching row)
Cypress.Commands.add('openRowDeleteDialog', (recordName) => {
  cy.get('table tbody tr').contains(recordName).closest('tr')
    .find('.lucide-trash, .lucide-trash-2, [data-icon="trash"], button[aria-label*="delete"], button[aria-label*="Delete"], button[aria-label*="hapus"], button[aria-label*="Hapus"]')
    .first().closest('button').click({ force: true });
  cy.wait(1000);
});

// Schema 6: Delete & Cleanup a specific table row record
Cypress.Commands.add('deleteAndCleanupRecord', (recordName) => {
  cy.get('body').then(($body) => {
    if ($body.text().includes(recordName)) {
      const targetRow = $body.find(`table tbody tr:contains("${recordName}")`);
      if (targetRow.length > 0) {
        cy.wrap(targetRow).first()
          .find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]')
          .first().closest('button').click({ force: true });
        cy.wait(1000);

        cy.get('body').then(($innerBody) => {
          const dialogBtn = $innerBody.find('[role="dialog"] button, .modal button');
          const confirmBtn = dialogBtn.filter((i, el) => /Hapus|Delete|Ya/i.test(Cypress.$(el).text()));
          if (confirmBtn.length > 0) {
            cy.wrap(confirmBtn).first().click({ force: true });
          } else {
            cy.contains('button', /Hapus|Delete|Ya/i).click({ force: true });
          }
          cy.wait(2500);
        });
      }
    }
  });
});

// Schema 7: Perform Search Filter on list table
Cypress.Commands.add('searchRecord', (keyword) => {
  cy.get('input[placeholder*="Cari"], input[placeholder*="Search"]').clear({ force: true }).type(keyword, { force: true });
  cy.wait(1000);
});

// Schema 8: Filter by Instansi dropdown
Cypress.Commands.add('filterByInstansi', (instansiName) => {
  cy.get('body').then(($body) => {
    const filterBtn = $body.find('button:contains("Instansi"), button:contains("Institution"), button:contains("Pilih Instansi"), button:contains("Semua Instansi")');
    if (filterBtn.length > 0) {
      cy.wrap(filterBtn).first().click({ force: true });
      cy.wait(500);
      cy.get('[role="option"], [role="menuitem"], [role="listbox"] li').contains(instansiName).click({ force: true });
      cy.wait(1500);
    }
  });
});

// Schema 9: Filter by Status dropdown
Cypress.Commands.add('filterByStatus', (statusRegex) => {
  cy.get('body').then(($body) => {
    const statusBtn = $body.find('button:contains("Status"), button:contains("Semua Status"), button:contains("All Status")');
    if (statusBtn.length > 0) {
      cy.wrap(statusBtn).first().click({ force: true });
      cy.wait(500);
      cy.get('[role="option"], [role="menuitem"], [role="listbox"] li').contains(statusRegex).click({ force: true });
      cy.wait(1500);
    }
  });
});

// Schema 10: Open Add Modal
Cypress.Commands.add('openAddModal', (addBtnRegex) => {
  cy.contains('button', addBtnRegex).click({ force: true });
  cy.wait(1000);
  cy.get('form, [role="dialog"]').should('be.visible');
});

// Schema 11: Click Modal Save Button
Cypress.Commands.add('clickModalSaveButton', () => {
  cy.contains('button', /Save|Simpan|Submit/i).click({ force: true });
  cy.wait(1500);
});

// Schema 11b: Click Modal Cancel Button
Cypress.Commands.add('clickModalCancelButton', () => {
  cy.contains('button', /Cancel|Batal/i).click({ force: true });
  cy.wait(500);
});

// Schema 12: Assert form error visible
Cypress.Commands.add('assertFormErrorVisible', (errorRegex) => {
  cy.contains(errorRegex).should('be.visible');
  cy.get('form, [role="dialog"]').should('be.visible');
});

// Schema 12b: Assert table columns exist
Cypress.Commands.add('assertTableColumnsExist', (columnRegexArray) => {
  columnRegexArray.forEach((colRegex) => {
    cy.contains('th', colRegex).should('exist');
  });
});

// Schema 13: Confirm delete action in dialog
Cypress.Commands.add('confirmDeleteAction', () => {
  cy.get('[role="dialog"], .modal').then(($dialog) => {
    const confirmBtn = $dialog.find('button').filter((i, el) => /Hapus|Delete|Ya/i.test(Cypress.$(el).text()));
    if (confirmBtn.length > 0) {
      cy.wrap(confirmBtn).first().click({ force: true });
    } else {
      cy.contains('button', /Hapus|Delete|Ya/i).click({ force: true });
    }
  });
  cy.wait(2000);
});
