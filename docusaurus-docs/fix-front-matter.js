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
  
  // Fix null descriptions and other issues
  let fixedFrontMatter = frontMatter
    .replace(/description: null/g, 'description: ""')
    .replace(/description: undefined/g, 'description: ""')
    .replace(/sidebar_position: undefined/g, '')
    .replace(/sidebar_position: null/g, '');
  
  // Remove empty lines at the end of front matter
  fixedFrontMatter = fixedFrontMatter.replace(/\n+$/, '');
  
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

console.log('Front matter fixes complete!');
