import Cite from 'citation-js';
import fs from 'fs';
import path from 'path';

export interface Publication {
  id: string;
  type: string;
  title: string;
  author: { given: string; family: string }[];
  containerTitle?: string; // Journal or Conference name
  issued: { 'date-parts': number[][] };
  doi?: string;
  url?: string;
}

export async function getPublications(): Promise<Publication[]> {
  const bibPath = path.join(process.cwd(), 'src/data/publications.bib');
  
  if (!fs.existsSync(bibPath)) {
    return [];
  }

  const bibContent = fs.readFileSync(bibPath, 'utf8');
  
  // Configure citation-js to parse bibtex
  const citations = new Cite(bibContent);
  const data = citations.format('data', { format: 'object', template: 'apa' });

  return data.map((entry: any) => ({
    id: entry.id,
    type: entry.type,
    title: entry.title,
    author: entry.author,
    containerTitle: entry['container-title'],
    issued: entry.issued,
    doi: entry.DOI,
    url: entry.URL
  }));
}
