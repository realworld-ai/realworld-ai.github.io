import fs from 'fs';
import path from 'path';

export interface Publication {
  id: string;
  type: string;
  category: 'International' | 'Domestic';
  subCategory: 'Journal' | 'Conference' | 'Other';
  title: string;
  authors: string;
  journal: string;
  volume: string;
  issue: string;
  pages: string;
  dateDisplay: string;
  year: number;
  doi?: string;
  url?: string;
}

export async function getPublications(): Promise<Publication[]> {
  const jsonPath = path.join(process.cwd(), 'src/data/publications.json');
  
  if (fs.existsSync(jsonPath)) {
    const data = fs.readFileSync(jsonPath, 'utf-8');
    return JSON.parse(data);
  }
  
  // Fallback to empty or old implementation if needed, but for now we assume JSON exists
  return [];
}

