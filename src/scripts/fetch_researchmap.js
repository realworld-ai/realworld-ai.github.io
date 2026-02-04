import fs from 'fs/promises';
import path from 'path';

const RESEARCHMAP_ID = 'takumae80';
const API_BASE = `https://api.researchmap.jp/${RESEARCHMAP_ID}`;

async function fetchPublications() {
  console.log('Fetching publications from Researchmap...');
  const endpoint = `${API_BASE}/published_papers?format=json&limit=500`;
  
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

function formatAuthors(authors, ownerRoles) {
  // authors is like { en: [{name: '...'}, ...], ja: [...] }
  // We prefer 'en', fallback to 'ja'
  const list = (authors?.en || authors?.ja || []).map(a => a.name);
  
  // Check if owner (Takuya Maekawa) is corresponding
  const isOwnerCorresponding = ownerRoles && ownerRoles.includes('corresponding');
  
  return list.map(name => {
     // If this name looks like the owner and owner is corresponding, add *
     // Adjust matching logic as needed.
     if (isOwnerCorresponding && (name.includes('Maekawa') || name.includes('前川'))) {
         return name + '*';
     }
     return name;
  }).join(', ');
}

function processPublications(items) {
  return items.map(item => {
    // Prefer English, then Japanese
    const title = item.paper_title?.en || item.paper_title?.ja || '';
    const journal = item.publication_name?.en || item.publication_name?.ja || '';
    
    // Date
    const dateStr = item.publication_date || ''; // "YYYY-MM-DD" or "YYYY-MM" or "YYYY"
    const year = dateStr.split('-')[0];
    
    const monthMap = {
      '01': 'Jan.', '02': 'Feb.', '03': 'Mar.', '04': 'Apr.', '05': 'May', '06': 'Jun.',
      '07': 'Jul.', '08': 'Aug.', '09': 'Sep.', '10': 'Oct.', '11': 'Nov.', '12': 'Dec.'
    };
    const monthPart = dateStr.split('-')[1];
    const monthName = monthPart ? monthMap[monthPart] : '';
    const dateDisplay = monthName ? `(${monthName} ${year})` : `(${year})`;

    // Volume/Issue/Page
    const vol = item.volume || '';
    const num = item.number ? `(${item.number})` : '';
    
    let pages = '';
    if (item.starting_page && item.ending_page) {
      pages = `${item.starting_page}-${item.ending_page}`;
    } else if (item.starting_page) {
        pages = item.starting_page;
    } else if (item.page) {
        pages = item.page;
    }

    const authors = formatAuthors(item.authors, item.published_paper_owner_roles);

    // Identifiers
    const doi = item.identifiers?.doi?.[0] || '';
    // Find URL: prefer DOI link, then explicit URL
    let url = '';
    const seeAlso = item.see_also || [];
    const doiLink = seeAlso.find(l => l.label === 'doi');
    const webLink = seeAlso.find(l => l.label === 'url');
    
    if (doiLink) url = doiLink['@id'];
    else if (doi) url = `https://doi.org/${doi}`;
    else if (webLink) url = webLink['@id'];

    // Classification logic
    const langs = item.languages || [];
    const isJapanese = langs.includes('jpn');
    
    // Default to International unless explicitly Japanese
    let category = 'International';
    if (isJapanese) {
        category = 'Domestic';
    }
    
    // Explicit types override language
    if (item.published_paper_type === 'international_conference_proceedings') {
        category = 'International';
    }

    let subCategory = 'Other';
    if (item.published_paper_type === 'scientific_journal') {
        subCategory = 'Journal';
    } else if (item.published_paper_type === 'international_conference_proceedings' || 
               item.published_paper_type === 'symposium') {
        subCategory = 'Conference';
    }

    // Construct the full citation string as requested by user
    // Format: Authors: Title, Journal, Vol(Issue), Page (Date).
    // Note: User example uses commas.
    // "Ryoma Otsuka*, ..., Takuya Maekawa*: Real-Time ..., Ecology and Evolution, 15(8), e71832 (Aug. 2025)."
    
    // We'll store fields so the UI can construct it, or construct a default one.
    
    return {
      id: item['rm:id'],
      type: item.published_paper_type, // 'scientific_journal', 'international_conference_proceedings'
      category,
      subCategory,
      title,
      authors,
      journal,
      volume: vol,
      issue: num,
      pages,
      dateDisplay,
      year: parseInt(year) || 0,
      doi,
      url
    };
  }).sort((a, b) => b.year - a.year); // Sort by year descending (simple)
  // For more precise sorting we could use the raw date string
}

async function main() {
  const items = await fetchPublications();
  const processed = processPublications(items);
  
  const outputPath = path.join(process.cwd(), 'src/data/publications.json');
  await fs.writeFile(outputPath, JSON.stringify(processed, null, 2));
  console.log(`Saved ${processed.length} publications to ${outputPath}`);
}

main();
