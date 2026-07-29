import XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';

// Node.js file system usage is automatic in CJS but might require standard imports in ESM.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_PATH = path.resolve(__dirname, '..', 'MIT ADTU Annual Calendar 2026-27.xlsx');
const OUTPUT_PATH = path.resolve(__dirname, '..', 'src', 'mock', 'events.json');

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  category: string;
  organizer: string;
  location: string;
  color: string;
  featured: boolean;
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  workshop: ['workshop', 'bootcamp', 'hands-on', 'session', 'training', 'webinar', 'lecture'],
  research: ['research', 'symposium', 'paper', 'thesis', 'seminar', 'journal'],
  club: ['club', 'fest', 'cultural', 'event', 'committee', 'council', 'play', 'drama', 'competition', 'music', 'dance'],
  placement: ['placement', 'recruitment', 'drive', 'internship', 'campus hiring', 'career', 'interview'],
  exam: ['exam', 'examination', 'test', 'quiz', 'assessment', 'mid-sem', 'end-sem'],
  holiday: ['holiday', 'vacation', 'break', 'closed', 'festival', 'celebration', 'jayanti', 'diwas', 'poojan', 'ekadashi'],
  sports: ['sports', 'match', 'tournament', 'athletics', 'football', 'cricket', 'basketball', 'trek', 'trail', 'triathlon'],
};

function inferCategory(text: string): string {
  const lower = text.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return category;
    }
  }
  return 'academic';
}

function extractOrganizer(text: string): string {
  const match = text.match(/\(([^)]+)\)$/);
  if (match) return match[1].trim();
  return 'University';
}

const MONTH_NAMES = ['january','february','march','april','may','june','july','august','september','october','november','december'];

function parseMonthYear(sheetName: string): { month: number, year: number } | null {
  const lower = sheetName.toLowerCase().trim();
  const match = lower.match(/([a-z]+)\s*(\d{2,4})/);
  if (!match) return null;
  const mStr = match[1];
  let yStr = match[2];
  if (yStr.length === 2) yStr = '20' + yStr;
  
  const month = MONTH_NAMES.findIndex(m => m.startsWith(mStr));
  if (month === -1) return null;
  return { month, year: parseInt(yStr, 10) };
}

function cleanTitle(text: string): string {
  let title = text.replace(/\([^)]+\)$/, '').trim(); // Remove trailing parenthesis content (organizer)
  title = title.replace(/[\r\n]+/g, ' '); // remove newlines
  if (title.length > 60) return title.substring(0, 57) + '...';
  if (!title) return text.substring(0, 50).replace(/[\r\n]+/g, ' ');
  return title;
}

const events: CalendarEvent[] = [];

function main() {
  const workbook = XLSX.readFile(FILE_PATH, {
    cellStyles: true,
    cellDates: true,
    raw: true,
  });

  let eventIdCounter = 1;

  for (const sheetName of workbook.SheetNames) {
    const monthYear = parseMonthYear(sheetName);
    if (!monthYear) continue;
    
    console.log(`Processing sheet: ${sheetName}`);
    
    const sheet = workbook.Sheets[sheetName];
    const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1');
    const merges = sheet['!merges'] || [];

    function getMergeRange(r: number, c: number) {
      for (const m of merges) {
        if (r >= m.s.r && r <= m.e.r && c >= m.s.c && c <= m.e.c) {
          return m;
        }
      }
      return null;
    }

    let activeDates: Record<number, string> = {};
    let hasSeen1 = false;

    // Scan rows
    for (let r = range.s.r; r <= range.e.r; r++) {
      let numbersFound = 0;
      let nonNumbersFound = 0;

      // Detect date row
      for (let c = range.s.c; c <= Math.min(range.e.c, 6); c++) {
        const cell = sheet[XLSX.utils.encode_cell({ r, c })];
        if (cell && cell.v !== undefined && cell.v !== '') {
          const val = String(cell.v).trim();
          if (/^\d{1,2}$/.test(val)) {
            numbersFound++;
          } else {
            nonNumbersFound++;
          }
        }
      }

      if (numbersFound >= 3 && nonNumbersFound === 0) {
        // This is a date row!
        for (let c = range.s.c; c <= Math.min(range.e.c, 6); c++) {
          const cell = sheet[XLSX.utils.encode_cell({ r, c })];
          if (cell && cell.v !== undefined && cell.v !== '') {
            const d = parseInt(String(cell.v).trim(), 10);
            if (!isNaN(d)) {
              let m = monthYear.month;
              let y = monthYear.year;

              if (d >= 20 && !hasSeen1) {
                m = monthYear.month - 1;
                if (m < 0) { m = 11; y--; }
              } else if (d < 15 && hasSeen1) {
                m = monthYear.month + 1;
                if (m > 11) { m = 0; y++; }
              } else {
                if (d === 1) hasSeen1 = true;
              }

              activeDates[c] = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            }
          }
        }
        continue;
      }

      // Event row processing
      if (Object.keys(activeDates).length > 0) {
        for (let c = range.s.c; c <= Math.min(range.e.c, 6); c++) {
          const cell = sheet[XLSX.utils.encode_cell({ r, c })];
          if (cell && cell.v !== undefined && cell.v !== '') {
            const m = getMergeRange(r, c);
            if (m && (m.s.r !== r || m.s.c !== c)) {
              continue; // Only process the top-left cell of a merge
            }

            const text = String(cell.w || cell.v).trim();
            if (text.length < 3) continue;

            // Exclude legend text exactly
            const ignoreList = [
              'Holiday', 'MIT ADT Holiday', 'Flagship Events', 'University Flagship Events',
              'Days', 'Days of Significance', 'Socio-economical', 'Outreach', 'Trek N Trail',
              'Alumni Meet', 'Alumni & Convocation', 'Cultural', 'Cultural & Performing Arts',
              'Workshops, Conferences & Sessions', 'Workshop', 'Festival', 'Festivals',
              'Sports', 'Technical/Innovation/Hackethon/Other', 'General / Academic'
            ].map(v => v.toLowerCase().trim());
            
            if (ignoreList.includes(text.toLowerCase().trim())) {
              continue;
            }

            const category = inferCategory(text);
            let color = 'sky';
            if (category === 'holiday') color = 'slate';
            else if (category === 'exam') color = 'rose';
            else if (category === 'placement') color = 'amber';
            else if (category === 'club') color = 'violet';
            else if (category === 'research') color = 'emerald';
            else if (category === 'sports') color = 'orange';
            else if (category === 'academic') color = 'blue';

            const datesToApply = [];
            if (m) {
              // Iterate over columns in the merge, up to 6
              for (let mc = m.s.c; mc <= Math.min(m.e.c, 6); mc++) {
                if (activeDates[mc]) datesToApply.push(activeDates[mc]);
              }
            } else {
              if (activeDates[c]) datesToApply.push(activeDates[c]);
            }

            const dedupDates = [...new Set(datesToApply)];

            dedupDates.forEach((date) => {
              events.push({
                id: `evt-import-${eventIdCounter++}`,
                title: cleanTitle(text),
                description: text.replace(/[\r\n]+/g, ' '),
                date: date,
                startTime: '09:00', // Default time
                endTime: '17:00',
                category: category,
                organizer: extractOrganizer(text),
                location: 'Campus',
                color: color,
                featured: category === 'club' || category === 'placement' || text.toLowerCase().includes('flagship'),
              });
            });
          }
        }
      }
    }
  }

  // Save to JSON
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(events, null, 2));
  console.log(`\n✅ Successfully extracted ${events.length} events and saved to ${OUTPUT_PATH}`);
}

main();
