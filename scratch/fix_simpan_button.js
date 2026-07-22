const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  '/mnt/c/Users/dimas/qa-cazh/cypress/e2e/PGT-16_legalitas_bukti_bayar.cy.js'
];

const dir = '/mnt/c/Users/dimas/qa-cazh/cypress/e2e/PGT-16';
if (fs.existsSync(dir)) {
  const pgt16Files = fs.readdirSync(dir).map(f => path.join(dir, f));
  filesToUpdate.push(...pgt16Files);
}

filesToUpdate.forEach((filePath) => {
  if (fs.existsSync(filePath) && filePath.endsWith('.cy.js')) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace all complex regex button assertions with clean cy.contains('Simpan')
    content = content.replace(/cy\.contains\(\/simpan\|perbarui\|save\|update\|submit\/i[^)]*\)/g, "cy.contains('Simpan', { timeout: 10000 })");
    content = content.replace(/cy\.contains\('button', \/simpan\|save\/i[^)]*\)/g, "cy.contains('Simpan', { timeout: 10000 })");
    content = content.replace(/cy\.contains\("button", \/simpan\|save\/i[^)]*\)/g, "cy.contains('Simpan', { timeout: 10000 })");
    content = content.replace(/\/simpan\|perbarui\|save\|update\|submit\/i/g, "'Simpan'");

    fs.writeFileSync(filePath, content, 'utf8');
  }
});

console.log('Successfully updated all PGT-16 specs to use cy.contains("Simpan")');
