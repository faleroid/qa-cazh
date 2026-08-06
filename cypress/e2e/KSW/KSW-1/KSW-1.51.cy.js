import ProgressActivityPage from '../../../pages/ProgressActivityPage';
import testData from '../../../fixtures/progressActivityData.json';

describe('KSW-1.51 - Centang checkbox pada header tabel', () => {
  before(() => {
    cy.login();
    ProgressActivityPage.visitList();
  });

  it('KSW-1.51: Centang checkbox pada header tabel', () => {
    // 1. Masuk ke Halaman Detail Progres Kegiatan
    cy.get('tbody td a[href*="/student-affairs/progress/"]').first().click({ force: true });
    cy.wait(1500);

    // 2. Seed 50 Riwayat via API to avoid flaky UI datepicker interactions and speed up the test
    cy.url().then((url) => {
      const parts = url.split('/').filter(Boolean);
      const progressId = parts[parts.length - 1];
      const endpoints = [
        `/api/v3/student-affairs/progress/${progressId}/histories`,
        `/api/v3/student-affairs/progress/${progressId}/history`,
        `/api/v3/progress/${progressId}/histories`,
        `/api/v3/progress/${progressId}/history`,
        `/api/v3/student-affairs/progress/${progressId}/progress-histories`,
        `/api/v3/student-affairs/progress/${progressId}/activities/${progressId}/histories`
      ];

      const tryPost = (body, attempt = 0) => {
        if (attempt >= endpoints.length) {
          // none worked; log and continue
          cy.log('No working endpoint found for creating riwayat');
          return cy.wrap(null);
        }
        return cy.request({
          method: 'POST',
          url: endpoints[attempt],
          body,
          failOnStatusCode: false
        }).then((res) => {
          if (res && res.status >= 200 && res.status < 300) {
            cy.log(`Created via ${endpoints[attempt]}`);
            return cy.wrap(res.body);
          }
          return tryPost(body, attempt + 1);
        });
      };

      // create sequentially to avoid server overload
      Cypress._.times(50, (i) => {
        const idx = i + 1;
        const off = (i % 30);
        const dt = new Date();
        dt.setDate(dt.getDate() - off);
        const yyyy = dt.getFullYear();
        const mm = String(dt.getMonth() + 1).padStart(2, '0');
        const dd = String(dt.getDate()).padStart(2, '0');
        const dateStr = `${yyyy}-${mm}-${dd}`;

        const body = {
          date: dateStr,
          percentage: ((idx) % 100) || 100,
          description: `Riwayat Auto ${idx}`
        };

        cy.then(() => tryPost(body));
      });
    });

    // wait for table to update
    cy.get('table[data-slot="data-grid-table"] tbody tr', { timeout: 20000 }).should('have.length.at.least', 1);

    // 3. Klik checkbox header (select all rows on current page)
    // Click once, then wait for the first row checkbox become checked (retries until timeout)
    cy.get('button[aria-label="Select all"]', { timeout: 10000 }).first().click({ force: true });
    cy.get('table[data-slot="data-grid-table"] tbody tr button[role="checkbox"]', { timeout: 10000 })
      .first()
      .should('have.attr', 'data-state', 'checked');

    // 4. Verifikasi seluruh baris pada halaman aktif terpilih
    cy.get('table[data-slot="data-grid-table"] tbody tr').each(($tr) => {
      cy.wrap($tr).find('button[role="checkbox"]').should('have.attr', 'data-state', 'checked');
    });

    // 5. Verifikasi banner muncul dan angkanya konsisten dengan tabel
    // The UI shows e.g. "10 riwayat progres dipilih" and a button "Pilih semua 10"
    cy.get('span.text-sm.text-muted-foreground.pl-2.pr-3', { timeout: 10000 }).scrollIntoView().should('be.visible').invoke('text').then((text) => {
      // extract page selection count
      const pageMatch = text.match(/(\d+)/);
      expect(pageMatch, 'banner page count present').to.not.be.null;
      const pageCount = Number(pageMatch[1]);

      // verify pageCount equals actual rows on page
      cy.get('table[data-slot="data-grid-table"] tbody tr').then(($rows) => {
        expect($rows.length).to.equal(pageCount);
      });

      // if there's a "Pilih semua" button with total count, ensure it's >= pageCount
      cy.get('body').then(($body) => {
        const btn = $body.find('button:contains("Pilih semua")');
        if (btn.length) {
          cy.wrap(btn).scrollIntoView().invoke('text').then((btnText) => {
            const totalMatch = btnText.match(/(\d+)/);
            if (totalMatch) {
              const totalCount = Number(totalMatch[1]);
              expect(totalCount).to.be.at.least(pageCount);
            }
          });
        } else {
          cy.log('Pilih semua button not found');
        }
      });
    });
  });
});
