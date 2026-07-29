/**
 * Analyze the MIT ADTU Annual Calendar 2026-27.xlsx file structure.
 * Dumps sheet names, dimensions, merged cells, cell types, colors, and sample content.
 * 
 * Run: npx tsx scripts/analyzeExcel.ts
 */
import XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

// Enable Node.js file system for xlsx in ESM
XLSX.set_fs(fs);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.resolve(__dirname, '..', 'MIT ADTU Annual Calendar 2026-27.xlsx');

console.log('=== ANALYZING:', FILE_PATH, '===\n');

const workbook = XLSX.readFile(FILE_PATH, {
  cellStyles: true,
  cellDates: true,
  cellNF: true,
  raw: false,
  type: 'file',
});

console.log('Sheet Names:', workbook.SheetNames);
console.log('Total Sheets:', workbook.SheetNames.length);
console.log('');

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
    console.log('  Sample merges (first 20):');
    merges.slice(0, 20).forEach((m: XLSX.Range) => {
      const startCell = XLSX.utils.encode_cell(m.s);
      const endCell = XLSX.utils.encode_cell(m.e);
      const cellVal = sheet[startCell]?.v;
      console.log(`    ${startCell}:${endCell} => "${cellVal ?? ''}"`);
    });
  }
  
  // Scan all cells to understand structure
  const cellTypes: Record<string, number> = {};
  const dateCells: string[] = [];
  const coloredCells: string[] = [];
  const allCellAddrs: string[] = [];
  
  for (let r = range.s.r; r <= range.e.r; r++) {
    for (let c = range.s.c; c <= range.e.c; c++) {
      const addr = XLSX.utils.encode_cell({ r, c });
      const cell = sheet[addr];
      if (!cell) continue;
      
      allCellAddrs.push(addr);
      const t = cell.t || 'unknown';
      cellTypes[t] = (cellTypes[t] || 0) + 1;
      
      // Detect date-like values
      if (cell.t === 'd' || (cell.t === 'n' && cell.z && (cell.z.includes('d') || cell.z.includes('m') || cell.z.includes('y')))) {
        dateCells.push(`${addr}=${cell.v} (fmt: ${cell.z})`);
      }
      
      // Check for style/color info
      if (cell.s) {
        coloredCells.push(addr);
      }
    }
  }
  
  console.log(`\nCell Types: ${JSON.stringify(cellTypes)}`);
  console.log(`Total filled cells: ${allCellAddrs.length}`);
  console.log(`Date-formatted cells: ${dateCells.length}`);
  if (dateCells.length > 0) {
    console.log('  Sample date cells (first 10):');
    dateCells.slice(0, 10).forEach(d => console.log(`    ${d}`));
  }
  console.log(`Cells with styles: ${coloredCells.length}`);
  
  // Dump first 30 rows content
  console.log(`\n--- First 30 rows content ---`);
  for (let r = range.s.r; r <= Math.min(range.e.r, range.s.r + 29); r++) {
    const rowData: string[] = [];
    for (let c = range.s.c; c <= range.e.c; c++) {
      const addr = XLSX.utils.encode_cell({ r, c });
      const cell = sheet[addr];
      if (cell) {
        const val = String(cell.v ?? cell.w ?? '').substring(0, 40);
        rowData.push(`${XLSX.utils.encode_col(c)}:${val}`);
      }
    }
    if (rowData.length > 0) {
      console.log(`  Row ${r}: ${rowData.join(' | ')}`);
    }
  }
  
  // Dump last 10 rows to see footer/end
  console.log(`\n--- Last 10 rows content ---`);
  for (let r = Math.max(range.s.r, range.e.r - 9); r <= range.e.r; r++) {
    const rowData: string[] = [];
    for (let c = range.s.c; c <= range.e.c; c++) {
      const addr = XLSX.utils.encode_cell({ r, c });
      const cell = sheet[addr];
      if (cell) {
        const val = String(cell.v ?? cell.w ?? '').substring(0, 40);
        rowData.push(`${XLSX.utils.encode_col(c)}:${val}`);
      }
    }
    if (rowData.length > 0) {
      console.log(`  Row ${r}: ${rowData.join(' | ')}`);
    }
  }

  // Try to detect month-like patterns by scanning for month names
  const monthNames = ['january','february','march','april','may','june','july','august','september','october','november','december'];
  const monthCells: string[] = [];
  for (let r = range.s.r; r <= range.e.r; r++) {
    for (let c = range.s.c; c <= range.e.c; c++) {
      const addr = XLSX.utils.encode_cell({ r, c });
      const cell = sheet[addr];
      if (cell && cell.v) {
        const val = String(cell.v).toLowerCase();
        for (const month of monthNames) {
          if (val.includes(month)) {
            monthCells.push(`${addr}="${cell.v}" (row ${r})`);
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
  
  // Look for day-of-week patterns
  const dayNames = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday','mon','tue','wed','thu','fri','sat','sun'];
  const dayCells: string[] = [];
  for (let r = range.s.r; r <= range.e.r; r++) {
    for (let c = range.s.c; c <= range.e.c; c++) {
      const addr = XLSX.utils.encode_cell({ r, c });
      const cell = sheet[addr];
      if (cell && cell.v) {
        const val = String(cell.v).toLowerCase().trim();
        if (dayNames.includes(val)) {
          dayCells.push(`${addr}="${cell.v}" (row ${r})`);
        }
      }
    }
  }
  
  if (dayCells.length > 0) {
    console.log(`\nDay-of-week cells (first 20): ${dayCells.length} total`);
    dayCells.slice(0, 20).forEach(d => console.log(`  ${d}`));
  }
}

// Also dump full content of all sheets as JSON arrays for deeper analysis
console.log('\n\n=== FULL JSON DUMP (all sheets) ===\n');
for (const sheetName of workbook.SheetNames) {
  const sheet = workbook.Sheets[sheetName];
  const json = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '', raw: false });
  console.log(`\n--- Sheet: "${sheetName}" as JSON (first 50 rows) ---`);
  (json as any[][]).slice(0, 50).forEach((row: any[], i: number) => {
    // Filter out empty-only rows
    const filtered = row.filter((v: any) => v !== '' && v !== null && v !== undefined);
    if (filtered.length > 0) {
      console.log(`  [${i}]: ${JSON.stringify(row)}`);
    }
  });
}
