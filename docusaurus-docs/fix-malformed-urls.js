const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

function fixMalformedUrls(filePath) {
    let fileContent = fs.readFileSync(filePath, 'utf8');

    // Fix malformed URLs with multiple _index segments
    fileContent = fileContent.replace(/\/docs\/dql\/_index\/_index\/_index\/_index\/_index\/_index\/_index-schema\.md/g, '/docs/dql/dql-schema.md');
    fileContent = fileContent.replace(/\/docs\/dql\/_index\/_index\/_index\/_index\/_index\/_index\/_index-mutation\.md/g, '/docs/dql/mutations/_index.md');
    fileContent = fileContent.replace(/\/docs\/graphql\/_index\/_index\/_index\/_index\/schema\/_index\/_index/g, '/docs/graphql/schema/_index');
    fileContent = fileContent.replace(/\/docs\/graphql\/_index\/_index\/_index\/_index\/_index\/lambda\/lambda-overview/g, '/docs/graphql/lambda/lambda-overview');
    fileContent = fileContent.replace(/\/docs\/graphql\/_index\/_index\/_index\/_index\/_index\/_index\/schema/g, '/docs/graphql/schema/_index');
    fileContent = fileContent.replace(/\/docs\/graphql\/_index\/_index\/_index\/_index\/_index\/_index\/_index-clients/g, '/docs/graphql/graphql-clients/_index');
    fileContent = fileContent.replace(/\/docs\/graphql\/_index\/_index\/_index\/_index\/schema\/_index\/_index\/_index/g, '/docs/graphql/schema/_index');
    fileContent = fileContent.replace(/\/docs\/graphql\/_index\/_index\/_index\/_index\/schema\/_index\/_index\/_index-modes/g, '/docs/cloud/admin/schema-modes');
    fileContent = fileContent.replace(/\/docs\/dql\/_index\/_index\/_index\/_index\/_index\/_index\/clients\/_index/g, '/docs/dql/clients/_index');
    fileContent = fileContent.replace(/\/docs\/learn\/data-engineer\/_index\/_index/g, '/docs/learn/data-engineer/_index');
    fileContent = fileContent.replace(/\/docs\/query-language\/_index\/_index/g, '/docs/query-language/_index');
    fileContent = fileContent.replace(/\/docs\/howto\/_index\/_index/g, '/docs/howto/_index');
    fileContent = fileContent.replace(/\/docs\/deploy\/installation\/_index\/_index/g, '/docs/deploy/installation/_index');

    // Fix any remaining patterns with multiple _index segments
    fileContent = fileContent.replace(/\/docs\/([^\/]+)\/_index\/_index/g, '/docs/$1/_index');
    fileContent = fileContent.replace(/\/docs\/([^\/]+)\/([^\/]+)\/_index\/_index/g, '/docs/$1/$2/_index');
    fileContent = fileContent.replace(/\/docs\/([^\/]+)\/([^\/]+)\/([^\/]+)\/_index\/_index/g, '/docs/$1/$2/$3/_index');

    // Fix specific broken patterns
    fileContent = fileContent.replace(/\/docs\/dql\/_index\/_index\/_index\/_ind/g, '/docs/dql/dql-schema.md');

    fs.writeFileSync(filePath, fileContent);
    console.log(`Fixed malformed URLs in: ${filePath}`);
}

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (stat.isFile() && (file.endsWith('.md') || file.endsWith('.mdx'))) {
            fixMalformedUrls(filePath);
        }
    });
}

processDirectory(docsDir);
console.log('Malformed URLs fixes complete!');
