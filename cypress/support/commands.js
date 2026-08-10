Cypress.Commands.add('login', (
  email = Cypress.env('AUTH_EMAIL'),
  password = Cypress.env('PASSWORD_EMAIL')
) => {
  cy.session([email, password], () => {
    cy.visit('/auth/login');
    cy.contains("label", "Email").click().type(email);
    cy.get("input[type='password']").click().type(password);
    cy.contains("button", "Masuk").click();

    cy.url().should("include", "/dashboard");
  });
});

/**
 * Global Helper Commands for Academic Settings CRUD Schemas
 */

// Schema 1: Select Instansi safely from form/dialog dropdown
Cypress.Commands.add('selectInstansi', (instansiName = 'Sekolah Digital Indonesia') => {
  cy.get('form, [role="dialog"]').contains('button', /Pilih Instansi|Instansi/i).click({ force: true });
  cy.wait(500);
  cy.get('[role="option"]').contains(instansiName).click({ force: true });
  cy.wait(500);
});

// Schema 2: Fill text input safely by label regex or fallback
Cypress.Commands.add('fillFormInput', (labelPattern, textValue) => {
  cy.get('body').then(($body) => {
    const labelEl = $body.find('form label, [role="dialog"] label').filter((i, el) => {
      if (labelPattern instanceof RegExp) {
        return labelPattern.test(Cypress.$(el).text());
      }
      return Cypress.$(el).text().includes(labelPattern);
    });
    if (labelEl.length > 0) {
      cy.wrap(labelEl).first().parent().find('input').clear().type(textValue);
    } else {
      cy.get('form, [role="dialog"]').find('input[type="text"], input:not([type="hidden"])').first().clear().type(textValue);
    }
  });
  cy.wait(500);
});

// Schema 3: Generic Academic Record Creation (Create dummy data schema)
Cypress.Commands.add('createAcademicRecord', (addBtnRegex, nameValue, instansiName = 'Sekolah Digital Indonesia') => {
  cy.contains('button', addBtnRegex).click({ force: true });
  cy.wait(500);
  cy.selectInstansi(instansiName);
  cy.fillFormInput(/Class|Kelas|Level|Tingkat|Major|Jurusan|Kamar|Room|Nama/i, nameValue);
  cy.contains('button', /Save|Simpan/i).click({ force: true });
  cy.wait(2500);
});

// Schema 4: Open Edit Modal on a specific table row
Cypress.Commands.add('openRowEditModal', (recordName) => {
  cy.get('table tbody tr')
    .contains(recordName)
    .closest('tr')
    .find('.lucide-square-pen, .lucide-pencil, [data-icon="pencil"]')
    .first()
    .closest('button')
    .click({ force: true });
  cy.get('form, [role="dialog"]').should('be.visible');
  cy.wait(500);
});

// Schema 5: Open Delete Confirmation Dialog on a specific table row
Cypress.Commands.add('openRowDeleteDialog', (recordName) => {
  cy.get('table tbody tr')
    .contains(recordName)
    .closest('tr')
    .find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]')
    .first()
    .closest('button')
    .click({ force: true });
  cy.wait(500);
  cy.get('[role="dialog"], .modal').should('be.visible');
});

// Schema 6: Delete & Cleanup a specific table row record
Cypress.Commands.add('deleteAndCleanupRecord', (recordName) => {
  cy.get('body').then(($body) => {
    if ($body.text().includes(recordName)) {
      const targetRow = $body.find('table tbody tr').filter((i, el) => Cypress.$(el).text().includes(recordName));
      if (targetRow.length > 0) {
        cy.wrap(targetRow).first().find('.lucide-trash, .lucide-trash-2, [data-icon="trash"]').first().closest('button').click({ force: true });
        cy.wait(800);
        cy.get('body').then(($innerBody) => {
          const deleteConfirmBtn = $innerBody.find('button:contains("Hapus"), button:contains("Delete"), button:contains("Ya")');
          if (deleteConfirmBtn.length > 0) {
            cy.wrap(deleteConfirmBtn).first().click({ force: true });
            cy.wait(1500);
          }
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

Cypress.Commands.add('openAddModal', (addBtnRegex) => {
  cy.contains('button', addBtnRegex).click({ force: true });
  cy.wait(500);
  cy.get('form, [role="dialog"]').should('be.visible');
});
// Schema 9: Click Modal Save Button
Cypress.Commands.add('clickModalSaveButton', () => {
  cy.get('form, [role="dialog"]').contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
  cy.wait(500);
});
// Schema 10: Click Modal Cancel Button
Cypress.Commands.add('clickModalCancelButton', () => {
  cy.get('form, [role="dialog"]').contains('button', /Cancel|Batal/i).click({ force: true });
  cy.wait(500);
});
// Schema 11: Assert Form Error Message and Modal Remains Visible
Cypress.Commands.add('assertFormErrorVisible', (errorRegex) => {
  cy.contains(errorRegex).should('be.visible');
  cy.get('form, [role="dialog"]').should('be.visible');
});
// Schema 12: Assert Table Columns Exist
Cypress.Commands.add('assertTableColumnsExist', (columnArray) => {
  columnArray.forEach((col) => {
    cy.contains('th', col).should('be.visible');
  });
});

// Schema 13: Filter List by Instansi
Cypress.Commands.add('filterByInstansi', (instansiName = 'Sekolah Digital Indonesia') => {
  cy.get('body').then(($body) => {
    const filterBtn = $body.find('button:contains("Pilih Instansi"), button:contains("Semua Instansi"), button:contains("Filter Instansi")');
    if (filterBtn.length > 0) {
      cy.wrap(filterBtn).first().click({ force: true });
    } else {
      cy.get('button[role="combobox"]').first().click({ force: true });
    }
  });
  cy.wait(500);
  cy.get('[role="option"]').contains(instansiName).click({ force: true });
  cy.wait(1500);
});

// Schema 14: Filter List by Status
Cypress.Commands.add('filterByStatus', (statusRegex) => {
  cy.get('body').then(($body) => {
    const statusBtn = $body.find('button:contains("Status"), button:contains("Semua Status"), button:contains("Aktif"), button:contains("Active"), button:contains("Tidak Aktif"), button:contains("Inactive")');
    if (statusBtn.length > 0) {
      cy.wrap(statusBtn).first().click({ force: true });
    } else {
      cy.get('button[role="combobox"]').eq(1).click({ force: true });
    }
  });
  cy.wait(500);
  cy.get('[role="option"]').contains(statusRegex).click({ force: true });
  cy.wait(1500);
});

// Schema 15: Confirm Delete Action in Modal
Cypress.Commands.add('confirmDeleteAction', () => {
  cy.get('[role="dialog"], .modal').contains('button', /Hapus|Delete|Ya/i).click({ force: true });
  cy.wait(1500);
});

// Schema 8: Open Add Modal
Cypress.Commands.add('openAddModal', (addBtnRegex) => {
  cy.contains('button', addBtnRegex).click({ force: true });
  cy.wait(500);
  cy.get('form, [role="dialog"]').should('be.visible');
});

// Schema 9: Click Modal Save Button
Cypress.Commands.add('clickModalSaveButton', () => {
  cy.get('form, [role="dialog"]').contains('button', /Save|Simpan|Update|Perbarui/i).click({ force: true });
  cy.wait(500);
});

// Schema 10: Click Modal Cancel Button
Cypress.Commands.add('clickModalCancelButton', () => {
  cy.get('form, [role="dialog"]').contains('button', /Cancel|Batal/i).click({ force: true });
  cy.wait(500);
});

// Schema 11: Assert Form Error Message and Modal Remains Visible
Cypress.Commands.add('assertFormErrorVisible', (errorRegex) => {
  cy.contains(errorRegex).should('be.visible');
  cy.get('form, [role="dialog"]').should('be.visible');
});

// Schema 12: Assert Table Columns Exist
Cypress.Commands.add('assertTableColumnsExist', (columnArray) => {
  columnArray.forEach((col) => {
    cy.contains('th', col).should('be.visible');
  });
});


Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes("Failed to execute 'removeChild' on 'Node'")) {
    return false;
  }

  return true;
});

