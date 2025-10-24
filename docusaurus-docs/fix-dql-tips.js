const fs = require('fs');
const path = require('path');

const filePath = '/Users/raph/gitrepo/dgraph-docs/docusaurus-docs/docs/dql/tips/index.md';

function fixDqlTipsFile() {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let newContent = fileContent;

    // Fix the malformed code block around line 44
    // The issue is that there's a malformed query block
    newContent = newContent.replace(/  }\n  query\(func: eq\(val\(p\), "1961-01-01T00:00:00Z"\)\) \n      festival\.focus \{ name@en \}\n      festival\.individual_festivals \{ total : count\(uid\) \}\n  \}\n\}/g, 
        '  }\n  query(func: eq(val(p), "1961-01-01T00:00:00Z")) {\n      festival.focus { name@en }\n      festival.individual_festivals { total : count(uid) }\n  }\n}');

    // Also fix any other malformed patterns
    newContent = newContent.replace(/\{[^}]*\*/g, ''); // Remove malformed expressions with *
    newContent = newContent.replace(/\*[^*]*\*/g, (match) => {
        // If it's a valid markdown bold, keep it, otherwise remove it
        if (match.length > 2 && match.startsWith('*') && match.endsWith('*')) {
            return match;
        }
        return '';
    });

    // Fix any remaining problematic patterns
    newContent = newContent.replace(/{{.*?}}/g, ''); // Remove any remaining Hugo syntax
    newContent = newContent.replace(/\[([^\]]*)\]\(\)/g, '$1'); // Convert [text]() to text

    fs.writeFileSync(filePath, newContent);
    console.log(`Fixed DQL tips file: ${filePath}`);
}

fixDqlTipsFile();
console.log('DQL tips file fix complete!');
