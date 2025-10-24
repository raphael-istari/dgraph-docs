#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function convertHugoToDocusaurus(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already converted
  if (content.startsWith('---')) {
    return;
  }
  
  // Extract Hugo front matter
  const hugoMatch = content.match(/^\+\+\+\s*\n([\s\S]*?)\n\+\+\+\s*\n([\s\S]*)$/);
  if (!hugoMatch) {
    return;
  }
  
  const [, frontMatter, body] = hugoMatch;
  
  // Parse Hugo front matter
  const lines = frontMatter.split('\n');
  const metadata = {};
  let currentKey = null;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    // Handle menu sections
    if (trimmed.startsWith('[menu.')) {
      continue; // Skip menu sections for now
    }
    
    // Handle key-value pairs
    const keyValueMatch = trimmed.match(/^(\w+)\s*=\s*(.+)$/);
    if (keyValueMatch) {
      const [, key, value] = keyValueMatch;
      // Remove quotes if present
      metadata[key] = value.replace(/^["']|["']$/g, '');
      currentKey = key;
    }
  }
  
  // Convert to Docusaurus front matter
  const docusaurusFrontMatter = {
    title: metadata.title || 'Untitled',
    description: metadata.description || '',
    sidebar_position: metadata.weight ? parseInt(metadata.weight) : undefined
  };
  
  // Remove undefined values
  Object.keys(docusaurusFrontMatter).forEach(key => {
    if (docusaurusFrontMatter[key] === undefined) {
      delete docusaurusFrontMatter[key];
    }
  });
  
  // Convert to YAML
  const yamlLines = [];
  for (const [key, value] of Object.entries(docusaurusFrontMatter)) {
    yamlLines.push(`${key}: ${value}`);
  }
  
  const newContent = `---\n${yamlLines.join('\n')}\n---\n\n${body}`;
  
  fs.writeFileSync(filePath, newContent);
  console.log(`Converted: ${filePath}`);
}

function processDirectory(dirPath) {
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (item.endsWith('.md')) {
      convertHugoToDocusaurus(fullPath);
    }
  }
}

// Process the docs directory
const docsDir = path.join(__dirname, 'docs');
processDirectory(docsDir);

console.log('Conversion complete!');
