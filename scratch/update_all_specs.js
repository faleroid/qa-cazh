const fs = require('fs');
const path = require('path');

const dir = '/mnt/c/Users/dimas/qa-cazh/cypress/e2e/PGT-16';
const files = fs.readdirSync(dir);

files.forEach((file) => {
  if (file.endsWith('.cy.js')) {
    const fullPath = path.join(dir, file);
    let code = fs.readFileSync(fullPath, 'utf8');

    code = code.replace(/cy\.contains\('button', \/simpan\|save\/i[^)]*\)/g, 'cy.contains(/simpan|perbarui|save|update|submit/i, { timeout: 10000 })');
    code = code.replace(/cy\.contains\("button", \/simpan\|save\/i[^)]*\)/g, 'cy.contains(/simpan|perbarui|save|update|submit/i, { timeout: 10000 })');
    code = code.replace(/\/simpan\|save\/i/g, '/simpan|perbarui|save|update|submit/i');

    fs.writeFileSync(fullPath, code, 'utf8');
  }
});

console.log('Updated all individual files in ' + dir);
