const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

function fixSpecificIssues(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let newContent = fileContent;

    // Fix the specific issue in dql/tips/index.md - malformed code block
    if (filePath.includes('dql/tips/index.md')) {
        // Fix the malformed code block around line 26
        newContent = newContent.replace(/    expand\(_all_\) \{ u as uid \}\n  \}/g, '```\n  expand(_all_) { u as uid }\n}\n```');
    }

    // Fix the specific issue in howto/concurrent-modification-java-multithreaded.md
    if (filePath.includes('howto/concurrent-modification-java-multithreaded.md')) {
        // Fix the malformed log section around line 27
        newContent = newContent.replace(/<-timestamp-> <-log->/g, '**Timestamp** | **Log**');
        newContent = newContent.replace(/```sh\n1599628015260 Thread #2 increasing clickCount for uid 0xe, Name: Alice/g, '```\n1599628015260 Thread #2 increasing clickCount for uid 0xe, Name: Alice');
    }

    // Fix any remaining HTML entities that might cause issues
    newContent = newContent.replace(/&lt;([^&]*)&gt;/g, '<$1>'); // Convert &lt;tag&gt; back to <tag>
    newContent = newContent.replace(/&lt;br&gt;/g, '<br />'); // Fix br tags

    // Fix any remaining problematic patterns
    newContent = newContent.replace(/{{.*?}}/g, ''); // Remove any remaining Hugo syntax
    newContent = newContent.replace(/\[([^\]]*)\]\(\)/g, '$1'); // Convert [text]() to text

    if (newContent !== fileContent) {
        fs.writeFileSync(filePath, newContent);
        console.log(`Fixed specific issues in: ${filePath}`);
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
            fixSpecificIssues(filePath);
        }
    });
}

processDirectory(docsDir);
console.log('Specific issues fixes complete!');
