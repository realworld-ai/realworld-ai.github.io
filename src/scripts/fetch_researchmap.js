import fs from 'fs/promises';
import path from 'path';

// Helper to get researchmap IDs from members.json
async function getResearchMapIDs() {
  const membersPath = path.join(process.cwd(), 'src/data/members.json');
  try {
    const raw = await fs.readFile(membersPath, 'utf8');
    const members = JSON.parse(raw);
    const ids = [];
    for (const m of members) {
      if (m.links && m.links.researchmap) {
        // Extract ID from URL: https://researchmap.jp/takumae80 -> takumae80
        const id = m.links.researchmap.split('/').pop();
        if (id) ids.push(id);
      }
    }
    return [...new Set(ids)]; // Unique IDs
  } catch (e) {
    console.error('Error reading members.json:', e);
    return ['takumae80']; // Fallback
  }
}

const API_BASE = (id) => `https://api.researchmap.jp/${id}`;

async function fetchItemsForUser(id, type) {
  console.log(`Fetching ${type} for ${id}...`);
  const endpoint = `${API_BASE(id)}/${type}?format=json&limit=500`;
  
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      if (response.status === 404) return []; // User might not have this section
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error(`Error fetching ${type} for ${id}:`, error);
    return [];
  }
}

async function fetchAllItems(ids, type) {
    let allItems = [];
    for (const id of ids) {
        const items = await fetchItemsForUser(id, type);
        allItems = allItems.concat(items);
    }
    return allItems;
}

// --- Formatters ---

function formatAuthors(authors, ownerRoles) {
  const list = (authors?.en || authors?.ja || []).map(a => a.name);
  // Simple check for now, can be improved to detect owner in list if needed
  return list.join(', ');
}

// --- Processors ---

function processPublications(items) {
  const processed = items.map(item => {
    // Prefer English, then Japanese
    const title = item.paper_title?.en || item.paper_title?.ja || '';
    const journal = item.publication_name?.en || item.publication_name?.ja || '';
    
    // Date
    const dateStr = item.publication_date || ''; 
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
    // Find URL
    let url = '';
    const seeAlso = item.see_also || [];
    const doiLink = seeAlso.find(l => l.label === 'doi');
    const webLink = seeAlso.find(l => l.label === 'url');
    
    if (doiLink) url = doiLink['@id'];
    else if (doi) url = `https://doi.org/${doi}`;
    else if (webLink) url = webLink['@id'];

    // Category
    const langs = item.languages || [];
    let category = 'International';
    if (langs.includes('jpn')) category = 'Domestic';
    
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
    
    const major_achievement = item.major_achievement || false;

    return {
      id: item['rm:id'],
      type: item.published_paper_type, 
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
      url,
      publication_date: dateStr,
      major_achievement
    };
  });

  // Deduplicate
  const unique = new Map();
  for (const p of processed) {
      // Key: DOI if exists, otherwise Title (lowercase)
      const key = p.doi ? `doi:${p.doi}` : `title:${p.title.toLowerCase().trim()}`;
      // Logic: If already exists, maybe we keep the one with more info? For now, first one wins.
      // Or if we merge from multiple users, and one user has filled more details... 
      // For simplicity, overwrite if we encounter again (often duplicates are same object).
      if (!unique.has(key)) {
          unique.set(key, p);
      }
  }

  return Array.from(unique.values()).sort((a, b) => {
      // Sort by date desc
      if (b.publication_date !== a.publication_date) {
        return b.publication_date.localeCompare(a.publication_date);
      }
      return 0;
  });
}

function processAwards(items) {
    const processed = items.map(item => {
        const title = item.award_title?.en || item.award_title?.ja || '';
        const name = item.award_name?.en || item.award_name?.ja || '';
        const association = item.association?.en || item.association?.ja || '';
        const date = item.award_date || '';
        const major_achievement = item.major_achievement || false;
        
        // winners is usually just a list of names under `award_type` or `winners`? 
        // Researchmap API for awards returns `winners` as Object { list: [...] } or null
        // Re-checking typical structure for 'winners'.
        // Assuming item.winners is an object with { en: [...], ja: [...] } or array of names.
        // Actually, API doc says simple string or structure. Let's try to extract string.
        let winners = '';
        if (item.winners) {
             // Sometimes it's a string, sometimes object.
            if (typeof item.winners === 'string') winners = item.winners;
            else if (item.winners.en) winners = item.winners.en;
            else if (item.winners.ja) winners = item.winners.ja;
        }

        return {
            id: item['rm:id'],
            award_name: name,
            award_title: title,
            winners,
            association,
            award_date: date,
            major_achievement
        };
    });

    // Deduplicate: award_name + award_title
    const unique = new Map();
    for (const p of processed) {
        const key = `${p.award_name.toLowerCase()}|${p.award_title.toLowerCase()}`;
        if (!unique.has(key)) unique.set(key, p);
    }
    
    return Array.from(unique.values()).sort((a, b) => b.award_date.localeCompare(a.award_date));
}

function processMediaCoverage(items) {
    const processed = items.map(item => {
        const title = item.media_coverage_title?.en || item.media_coverage_title?.ja || '';
        const event = item.media_coverage_description?.en || item.media_coverage_description?.ja || ''; // Mapping 'event' to description if needed, or check fields
        // Wait, typical key is `media_coverage_description` or specific field? 
        // Let's assume description maps to event/outlet context.
        const date = item.publication_date || '';
        const type = item.media_coverage_type || '';
        const major_achievement = item.major_achievement || false;

        return {
            id: item['rm:id'],
            media_coverage_title: title,
            event,
            publication_date: date,
            media_coverage_type: type,
            major_achievement
        };
    });

    // Deduplicate: event + media_coverage_title
    const unique = new Map();
    for (const p of processed) {
        const key = `${p.event.toLowerCase()}|${p.media_coverage_title.toLowerCase()}`;
        if (!unique.has(key)) unique.set(key, p);
    }

    return Array.from(unique.values()).sort((a, b) => b.publication_date.localeCompare(a.publication_date));
}

function processPresentations(items) {
    const processed = items.map(item => {
        const title = item.presentation_title?.en || item.presentation_title?.ja || '';
        const event = item.event?.en || item.event?.ja || '';
        const date = item.publication_date || '';
        const type = item.presentation_type || '';
        const major_achievement = item.major_achievement || false;
        
        // presenters
        let presenters = '';
         if (item.presenters) {
            if (item.presenters.en) presenters = item.presenters.en.map(p => p.name).join(', ');
            else if (item.presenters.ja) presenters = item.presenters.ja.map(p => p.name).join(', ');
        }

        return {
            id: item['rm:id'],
            presentation_title: title,
            presenters,
            event,
            publication_date: date,
            presentation_type: type,
            major_achievement
        };
    });

     // Deduplicate: event + presentation_title
    const unique = new Map();
    for (const p of processed) {
        const key = `${p.event.toLowerCase()}|${p.presentation_title.toLowerCase()}`;
        if (!unique.has(key)) unique.set(key, p);
    }

    return Array.from(unique.values()).sort((a, b) => b.publication_date.localeCompare(a.publication_date));
}


async function main() {
  const ids = await getResearchMapIDs();
  console.log(`Found IDs: ${ids.join(', ')}`);

  // 1. Published Papers
  const papers = await fetchAllItems(ids, 'published_papers');
  const processedPapers = processPublications(papers);
  const pubPath = path.join(process.cwd(), 'src/data/publications.json');
  await fs.writeFile(pubPath, JSON.stringify(processedPapers, null, 2));
  console.log(`Saved ${processedPapers.length} publications to ${pubPath}`);

  // 2. Awards
  const awards = await fetchAllItems(ids, 'awards');
  const processedAwards = processAwards(awards);
  const awardPath = path.join(process.cwd(), 'src/data/awards.json');
  await fs.writeFile(awardPath, JSON.stringify(processedAwards, null, 2));
  console.log(`Saved ${processedAwards.length} awards to ${awardPath}`);

  // 3. Media Coverage
  const media = await fetchAllItems(ids, 'media_coverage');
  const processedMedia = processMediaCoverage(media);
  const mediaPath = path.join(process.cwd(), 'src/data/media_coverage.json');
  await fs.writeFile(mediaPath, JSON.stringify(processedMedia, null, 2));
  console.log(`Saved ${processedMedia.length} media items to ${mediaPath}`);

  // 4. Presentations
  const presentations = await fetchAllItems(ids, 'presentations');
  const processedPresentations = processPresentations(presentations);
  const presPath = path.join(process.cwd(), 'src/data/presentations.json');
  await fs.writeFile(presPath, JSON.stringify(processedPresentations, null, 2));
  console.log(`Saved ${processedPresentations.length} presentations to ${presPath}`);
}

main();
