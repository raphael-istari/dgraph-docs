const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

function fixRemainingIssues(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let newContent = fileContent;

    // Fix HTML entities that were incorrectly converted
    newContent = newContent.replace(/&lt;relref "([^"]*)"&gt;/g, (match, p1) => {
        let link = p1.replace(/\.md$/, ''); // Remove .md extension
        link = link.replace(/^_index$/, 'index'); // Handle _index.md files
        return `/docs/${link}`;
    });

    // Fix any remaining Hugo shortcodes with more specific patterns
    newContent = newContent.replace(/{{< relref "([^"]*)" >}}/g, (match, p1) => {
        let link = p1.replace(/\.md$/, ''); // Remove .md extension
        link = link.replace(/^_index$/, 'index'); // Handle _index.md files
        return `/docs/${link}`;
    });

    // Fix any remaining Hugo syntax
    newContent = newContent.replace(/{{< ([^>]*) >}}/g, ''); // Remove any remaining Hugo shortcodes
    newContent = newContent.replace(/{{% ([^%]*) %}}/g, ''); // Remove Hugo shortcodes with % syntax

    // Fix malformed HTML tags that look like JSX - be more aggressive
    newContent = newContent.replace(/<([A-Z][a-zA-Z0-9]*[^>]*)>/g, '&lt;$1&gt;'); // Convert <NodeUID> to &lt;NodeUID&gt;
    newContent = newContent.replace(/<\/([A-Z][a-zA-Z0-9]*)>/g, '&lt;/$1&gt;'); // Convert </NodeUID> to &lt;/NodeUID&gt;
    
    // Also fix lowercase tags that might be problematic
    newContent = newContent.replace(/<([a-z][a-zA-Z0-9]*[^>]*)>/g, '&lt;$1&gt;'); // Convert <node2> to &lt;node2&gt;
    newContent = newContent.replace(/<\/([a-z][a-zA-Z0-9]*)>/g, '&lt;/$1&gt;'); // Convert </node2> to &lt;/node2&gt;

    // Fix unclosed expressions by removing stray { characters
    newContent = newContent.replace(/\{[^}]*$/gm, ''); // Remove unclosed expressions at end of lines

    // Fix empty links
    newContent = newContent.replace(/\[([^\]]*)\]\(\)/g, '$1'); // Convert [text]() to text

    // Fix any remaining problematic patterns
    newContent = newContent.replace(/{{.*?}}/g, ''); // Remove any remaining Hugo syntax
    newContent = newContent.replace(/\[([^\]]*)\]\([^)]*\)/g, (match, text, url) => {
        if (typeof url === 'string' && (url.includes('{{') || url.includes('}}'))) {
            return text; // Remove links with Hugo syntax
        }
        return match;
    });

    if (newContent !== fileContent) {
        fs.writeFileSync(filePath, newContent);
        console.log(`Fixed remaining issues in: ${filePath}`);
    }
}

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (stat.isFile() && (file.endsWith('.md') || file.endsWith('.mdx'))) {
            fixRemainingIssues(filePath);
        }
    });
}

processDirectory(docsDir);
console.log('Remaining issues fixes complete!');