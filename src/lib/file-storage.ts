import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface CSVRow {
  [key: string]: string | number | boolean | null;
}

// Read CSV file
export function readCSV(filename: string): CSVRow[] {
  const filePath = path.join(DATA_DIR, filename);
  
  if (!fs.existsSync(filePath)) {
    return [];
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  
  if (lines.length === 0) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  const rows: CSVRow[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row: CSVRow = {};
    
    headers.forEach((header, index) => {
      row[header] = values[index] || '';
    });
    
    rows.push(row);
  }
  
  return rows;
}

// Write CSV file
export function writeCSV(filename: string, data: CSVRow[]): void {
  const filePath = path.join(DATA_DIR, filename);
  
  if (data.length === 0) {
    fs.writeFileSync(filePath, '', 'utf-8');
    return;
  }
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => escapeCSVValue(String(row[header] || ''))).join(',')
    )
  ].join('\n');
  
  fs.writeFileSync(filePath, csvContent, 'utf-8');
}

// Append to CSV file
export function appendCSV(filename: string, row: CSVRow): void {
  const data = readCSV(filename);
  data.push(row);
  writeCSV(filename, data);
}

// Update CSV row
export function updateCSV(filename: string, predicate: (row: CSVRow) => boolean, updates: Partial<CSVRow>): void {
  const data = readCSV(filename);
  const updatedData = data.map(row => 
    predicate(row) ? { ...row, ...updates } : row
  );
  writeCSV(filename, updatedData);
}

// Delete CSV row
export function deleteCSV(filename: string, predicate: (row: CSVRow) => boolean): void {
  const data = readCSV(filename);
  const filteredData = data.filter(row => !predicate(row));
  writeCSV(filename, filteredData);
}

// Read text file
export function readTextFile(filename: string): string {
  const filePath = path.join(DATA_DIR, filename);
  
  if (!fs.existsSync(filePath)) {
    return '';
  }
  
  return fs.readFileSync(filePath, 'utf-8');
}

// Write text file
export function writeTextFile(filename: string, content: string): void {
  const filePath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filePath, content, 'utf-8');
}

// Helper function to parse CSV line (handles quoted values)
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

// Helper function to escape CSV values
function escapeCSVValue(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
