#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function fixFrontMatter(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if not a markdown file or doesn't have front matter
  if (!filePath.endsWith('.md') || !content.startsWith('---')) {
    return;
  }
  
  // Extract front matter
  const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!frontMatterMatch) {
    return;
  }
  
  const [, frontMatter, body] = frontMatterMatch;
  
  // Fix titles with special characters
  let fixedFrontMatter = frontMatter.replace(/^title: (.+)$/gm, (match, title) => {
    // If title contains special characters, quote it
    if (title.includes('@') || title.includes(':') || title.includes('"') || title.includes("'")) {
      return `title: "${title}"`;
    }
    return match;
  });
  
  const newContent = `---\n${fixedFrontMatter}\n---\n\n${body}`;
  
  fs.writeFileSync(filePath, newContent);
  console.log(`Fixed: ${filePath}`);
}

function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (item.endsWith('.md')) {
      fixFrontMatter(fullPath);
    }
  }
}

// Process the docs directory
const docsDir = path.join(__dirname, 'docs');
processDirectory(docsDir);

console.log('Title fixes complete!');
