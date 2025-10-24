const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

function fixFinalIssues(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let newContent = fileContent;

    // Fix unclosed HTML tags by converting them to HTML entities or closing them
    newContent = newContent.replace(/<NodeUID>/g, '&lt;NodeUID&gt;');
    newContent = newContent.replace(/<node2>/g, '&lt;node2&gt;');
    newContent = newContent.replace(/<objectUID>/g, '&lt;objectUID&gt;');
    newContent = newContent.replace(/<object>/g, '&lt;object&gt;');
    newContent = newContent.replace(/<Type>/g, '&lt;Type&gt;');
    
    // Fix br tags - make them self-closing
    newContent = newContent.replace(/<br>/g, '<br />');
    newContent = newContent.replace(/<br\s*>/g, '<br />');
    
    // Fix any remaining problematic patterns
    newContent = newContent.replace(/{{.*?}}/g, ''); // Remove any remaining Hugo syntax
    newContent = newContent.replace(/\[([^\]]*)\]\(\)/g, '$1'); // Convert [text]() to text

    // Fix specific issues in problematic files
    if (filePath.includes('deploy/decrypt.md')) {
        // Fix the specific issue around line 41
        newContent = newContent.replace(/\*\*\*([^*]+)\*\*\*/g, '***$1***'); // Ensure proper markdown formatting
    }

    if (filePath.includes('dql/tips/index.md')) {
        // Fix malformed code blocks
        newContent = newContent.replace(/```\n  expand\(_all_\) \{ u as uid \}\n\}\n```/g, '```\nexpand(_all_) { u as uid }\n}\n```');
    }

    if (filePath.includes('graphql/graphql-clients/endpoint/graphql-request.md')) {
        // Fix mismatched div/br tags
        newContent = newContent.replace(/<br>\s*<\/div>/g, '<br /></div>');
    }

    if (newContent !== fileContent) {
        fs.writeFileSync(filePath, newContent);
        console.log(`Fixed final issues in: ${filePath}`);
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
            fixFinalIssues(filePath);
        }
    });
}

processDirectory(docsDir);
console.log('Final issues fixes complete!');
