/**
 * Analyze the MIT ADTU Annual Calendar 2026-27.xlsx file structure.
 * Run: node scripts/analyzeExcel.cjs
 */
const XLSX = require('xlsx');
const path = require('path');

const FILE_PATH = path.resolve(__dirname, '..', 'MIT ADTU Annual Calendar 2026-27.xlsx');

console.log('=== ANALYZING:', FILE_PATH, '===\n');

const workbook = XLSX.readFile(FILE_PATH, {
  cellStyles: true,
  cellDates: true,
  cellNF: true,
  raw: false,
});

console.log('Sheet Names:', workbook.SheetNames);
console.log('Total Sheets:', workbook.SheetNames.length);

for (const sheetName of workbook.SheetNames) {
  const sheet = workbook.Sheets[sheetName];
  const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1');
  
  console.log(`\n${'='.repeat(80)}`);
  console.log(`SHEET: "${sheetName}"`);
  console.log(`Range: ${sheet['!ref']}`);
  console.log(`Rows: ${range.e.r - range.s.r + 1}, Cols: ${range.e.c - range.s.c + 1}`);
  
  // Merged cells
  const merges = sheet['!merges'] || [];
  console.log(`Merged Cells: ${merges.length}`);
  if (merges.length > 0) {
    console.log('  Sample merges (first 30):');
    merges.slice(0, 30).forEach(m => {
      const startCell = XLSX.utils.encode_cell(m.s);
      const endCell = XLSX.utils.encode_cell(m.e);
      const cellVal = sheet[startCell]?.v;
      console.log(`    ${startCell}:${endCell} => "${cellVal ?? ''}"`);
    });
  }
  
  // Scan all cells
  const cellTypes = {};
  let totalCells = 0;
  
  for (let r = range.s.r; r <= range.e.r; r++) {
    for (let c = range.s.c; c <= range.e.c; c++) {
      const addr = XLSX.utils.encode_cell({ r, c });
      const cell = sheet[addr];
      if (!cell) continue;
      totalCells++;
      const t = cell.t || 'unknown';
      cellTypes[t] = (cellTypes[t] || 0) + 1;
    }
  }
  
  console.log(`\nCell Types: ${JSON.stringify(cellTypes)}`);
  console.log(`Total filled cells: ${totalCells}`);
  
  // Dump ALL rows for full analysis
  console.log(`\n--- ALL rows content ---`);
  for (let r = range.s.r; r <= range.e.r; r++) {
    const rowData = [];
    for (let c = range.s.c; c <= range.e.c; c++) {
      const addr = XLSX.utils.encode_cell({ r, c });
      const cell = sheet[addr];
      if (cell) {
        const val = String(cell.w ?? cell.v ?? '').substring(0, 60);
        rowData.push(`${XLSX.utils.encode_col(c)}${r}:${val}`);
      }
    }
    if (rowData.length > 0) {
      console.log(`  Row ${r}: ${rowData.join(' | ')}`);
    }
  }

  // Month detection
  const monthNames = ['january','february','march','april','may','june','july','august','september','october','november','december'];
  const monthCells = [];
  for (let r = range.s.r; r <= range.e.r; r++) {
    for (let c = range.s.c; c <= range.e.c; c++) {
      const addr = XLSX.utils.encode_cell({ r, c });
      const cell = sheet[addr];
      if (cell && cell.v) {
        const val = String(cell.v).toLowerCase();
        for (const month of monthNames) {
          if (val.includes(month)) {
            monthCells.push(`${addr}="${cell.w ?? cell.v}" (row ${r})`);
            break;
          }
        }
      }
    }
  }
  
  if (monthCells.length > 0) {
    console.log(`\nMonth-related cells found: ${monthCells.length}`);
    monthCells.forEach(m => console.log(`  ${m}`));
  }
}

// Full JSON dump
console.log('\n\n=== FULL JSON DUMP (all sheets) ===\n');
for (const sheetName of workbook.SheetNames) {
  const sheet = workbook.Sheets[sheetName];
  const json = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '', raw: false });
  console.log(`\n--- Sheet: "${sheetName}" (${json.length} rows) ---`);
  json.forEach((row, i) => {
    const filtered = row.filter(v => v !== '' && v !== null && v !== undefined);
    if (filtered.length > 0) {
      console.log(`  [${i}]: ${JSON.stringify(row)}`);
    }
  });
}
