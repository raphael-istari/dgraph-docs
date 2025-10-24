const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

function fixRemainingBrokenLinks(filePath) {
    let fileContent = fs.readFileSync(filePath, 'utf8');

    // Fix specific broken patterns that are still showing up
    fileContent = fileContent.replace(/\/docs\/dql\/mutations\.md#conditional-upsert/g, '/docs/dql/mutations#conditional-upsert');
    fileContent = fileContent.replace(/\/docs\/dql\/docs\/dql\/clients/g, '/docs/dql/clients');
    fileContent = fileContent.replace(/\/docs\/graphql\/schema-modes/g, '/docs/cloud/admin/schema-modes');
    fileContent = fileContent.replace(/\/docs\/learn\/data-engineer\/_index/g, '/docs/learn/data-engineer');

    // Fix any remaining malformed URLs
    fileContent = fileContent.replace(/\/docs\/([^\/]+)\/_index\/_index/g, '/docs/$1');
    fileContent = fileContent.replace(/\/docs\/([^\/]+)\/([^\/]+)\/_index\/_index/g, '/docs/$1/$2');
    fileContent = fileContent.replace(/\/docs\/([^\/]+)\/([^\/]+)\/([^\/]+)\/_index\/_index/g, '/docs/$1/$2/$3');

    fs.writeFileSync(filePath, fileContent);
    console.log(`Fixed remaining broken links in: ${filePath}`);
}

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (stat.isFile() && (file.endsWith('.md') || file.endsWith('.mdx'))) {
            fixRemainingBrokenLinks(filePath);
        }
    });
}

processDirectory(docsDir);
console.log('Remaining broken links fixes complete!');