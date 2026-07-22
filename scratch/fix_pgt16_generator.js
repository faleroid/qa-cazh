const fs = require('fs');
let content = fs.readFileSync('scratch/generate_pgt16_specs.js', 'utf8');

for (let i = 4; i <= 22; i++) {
  // Replace the first LegalityPage method call with selectInstansi followed by that call
  let searchStr = `  ${i}: "  it('PGT-16.${i}: `;
  let lines = content.split('\n');
  for (let j = 0; j < lines.length; j++) {
    if (lines[j].startsWith(searchStr)) {
      lines[j] = lines[j].replace(/(\\n\s+LegalityPage\.)/, "\\n    LegalityPage.selectInstansi(0);$1");
      break;
    }
  }
  content = lines.join('\n');
}

fs.writeFileSync('scratch/generate_pgt16_specs.js', content);
