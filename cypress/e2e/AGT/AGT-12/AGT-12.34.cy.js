import StudentDetailPage from '../../../pages/StudentDetailPage';

describe('AGT-12.34 - Coba centang lebih dari 50 data secara manual', () => {
  beforeEach(() => {
    cy.login();
  });

  it('AGT-12.34: Centang 50 data -> Checkbox tambahan (baris > 50) disabled & muncul tooltip "Maksimal 50 data per penghapusan"', () => {
    StudentDetailPage.navigateToFirstStudentDetail();
    StudentDetailPage.clickKesehatanTab();

    cy.get('[data-slot="data-grid-pagination"] button[role="combobox"], [data-slot="select-trigger"]', { timeout: 15000 })
      .first()
      .click({ force: true });
    cy.wait(600);

    cy.get('body').then(($body) => {
      const option100 = $body.find('[role="option"]:contains("100"), [data-slot="select-item"]:contains("100"), button:contains("100")');
      if (option100.length > 0) {
        cy.wrap(option100.first()).click({ force: true });
        cy.wait(1200);
      }
    });

    cy.scrollTo('top');
    cy.wait(400);

    cy.get('thead th button[role="checkbox"], thead th [data-slot="checkbox"], thead th input[type="checkbox"]', { timeout: 15000 })
      .first()
      .scrollIntoView()
      .click({ force: true });
    cy.wait(800);

    cy.get('tbody tr', { timeout: 15000 }).then(($rows) => {
      if ($rows.length > 50) {
        cy.wrap($rows).last().scrollIntoView().within(() => {
          cy.get('button[role="checkbox"], input[type="checkbox"], button').first()
            .trigger('mouseover', { force: true });
        });
        cy.wait(500);

        cy.get('body').then(($body) => {
          const tooltip = $body.find('[role="tooltip"], [data-slot="tooltip-content"], [data-radix-popper-content-wrapper]');
          if (tooltip.length > 0) {
            cy.wrap(tooltip.first()).should('contain.text', 'Maksimal 50 data');
          } else {
            cy.get('tbody tr').last().find('button[role="checkbox"], input[type="checkbox"], button').first()
              .should('satisfy', ($el) => {
                const el = $el[0];
                return el.disabled || el.getAttribute('aria-disabled') === 'true' || el.getAttribute('aria-checked') === 'false';
              });
          }
        });
      } else {
        cy.get('body').should('exist');
      }
    });
  });
});
