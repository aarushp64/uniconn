/**
 * Detailed analysis of monthly sheet structure.
 * Run: node scripts/analyzeMonthly.cjs
 */
const XLSX = require('xlsx');

const wb = XLSX.readFile('MIT ADTU Annual Calendar 2026-27.xlsx', {
  cellDates: true,
  cellNF: true,
  raw: true,
});

// Analyze a few representative monthly sheets
const sheetsToAnalyze = ['July  26', 'October 26', 'January 27'];

for (const sheetName of sheetsToAnalyze) {
  const sheet = wb.Sheets[sheetName];
  if (!sheet) { console.log(`Sheet "${sheetName}" not found!`); continue; }
  
  const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1');
  
  console.log(`\n${'='.repeat(100)}`);
  console.log(`SHEET: "${sheetName}" | Range: ${sheet['!ref']} | Rows: ${range.e.r+1}, Cols: ${range.e.c+1}`);
  
  // Merges
  const merges = sheet['!merges'] || [];
  console.log(`\nMerged cells (${merges.length}):`);
  merges.forEach(m => {
    const sc = XLSX.utils.encode_cell(m.s);
    const ec = XLSX.utils.encode_cell(m.e);
    const cell = sheet[sc];
    const val = cell ? String(cell.w ?? cell.v ?? '').substring(0, 80) : '';
    console.log(`  ${sc}:${ec}  rows ${m.s.r}-${m.e.r} cols ${m.s.c}-${m.e.c}  => "${val}"`);
  });
  
  // Full cell dump with types
  console.log(`\nFull cell dump:`);
  for (let r = range.s.r; r <= range.e.r; r++) {
    const cells = [];
    for (let c = range.s.c; c <= range.e.c; c++) {
      const addr = XLSX.utils.encode_cell({ r, c });
      const cell = sheet[addr];
      if (cell) {
        const display = String(cell.w ?? cell.v ?? '').substring(0, 50);
        cells.push(`${addr}[t=${cell.t}]="${display}"`);
      }
    }
    if (cells.length > 0) {
      console.log(`  R${r}: ${cells.join(' | ')}`);
    }
  }
  
  // JSON form for pattern detection
  console.log(`\nJSON form (header: 1):`);
  const json = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '', raw: false });
  json.forEach((row, i) => {
    const filtered = row.filter(v => v !== '' && v !== null && v !== undefined);
    if (filtered.length > 0) {
      console.log(`  [${i}]: ${JSON.stringify(row)}`);
    }
  });
}
