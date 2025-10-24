const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

function fixFinalRemainingIssues(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let newContent = fileContent;

    // Fix all remaining unclosed HTML tags by converting them to HTML entities
    const htmlTags = [
        'NodeUID', 'node2', 'node1', 'objectUID', 'object', 'Type', 'RelationshipName',
        'predicateRelation', 'relationshipName', 'predicate', 'path-to-keyfile',
        'clickCount', 'name', 'timestamp', 'log', 'br', 'div', 'span', 'p',
        'subjectUID', 'subject', 'predicate', 'object', 'subject', 'predicate'
    ];

    htmlTags.forEach(tag => {
        const regex = new RegExp(`<${tag}>`, 'g');
        newContent = newContent.replace(regex, `&lt;${tag}&gt;`);
    });

    // Fix br tags - make them self-closing
    newContent = newContent.replace(/<br>/g, '<br />');
    newContent = newContent.replace(/<br\s*>/g, '<br />');
    
    // Fix any remaining problematic patterns
    newContent = newContent.replace(/{{.*?}}/g, ''); // Remove any remaining Hugo syntax
    newContent = newContent.replace(/\[([^\]]*)\]\(\)/g, '$1'); // Convert [text]() to text

    // Fix specific issues in problematic files
    if (filePath.includes('deploy/decrypt.md')) {
        // Fix the specific issue around line 41 - look for malformed markdown
        newContent = newContent.replace(/\*\*\*([^*]+)\*\*\*/g, '***$1***'); // Ensure proper markdown formatting
        // Fix any malformed expressions
        newContent = newContent.replace(/\{[^}]*\*/g, ''); // Remove malformed expressions with *
        // Fix any remaining problematic patterns
        newContent = newContent.replace(/\*[^*]*\*/g, (match) => {
            // If it's a valid markdown bold, keep it, otherwise remove it
            if (match.length > 2 && match.startsWith('*') && match.endsWith('*')) {
                return match;
            }
            return '';
        });
    }

    if (filePath.includes('dql/tips/index.md')) {
        // Fix malformed code blocks and expressions
        newContent = newContent.replace(/```\n  expand\(_all_\) \{ u as uid \}\n\}\n```/g, '```\nexpand(_all_) { u as uid }\n}\n```');
        // Fix any malformed expressions
        newContent = newContent.replace(/\{[^}]*\*/g, ''); // Remove malformed expressions with *
        // Fix any remaining problematic patterns
        newContent = newContent.replace(/\*[^*]*\*/g, (match) => {
            // If it's a valid markdown bold, keep it, otherwise remove it
            if (match.length > 2 && match.startsWith('*') && match.endsWith('*')) {
                return match;
            }
            return '';
        });
    }

    if (newContent !== fileContent) {
        fs.writeFileSync(filePath, newContent);
        console.log(`Fixed final remaining issues in: ${filePath}`);
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
            fixFinalRemainingIssues(filePath);
        }
    });
}

processDirectory(docsDir);
console.log('Final remaining issues fixes complete!');
