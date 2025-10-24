const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

function fixAllUltimateBrokenLinks(filePath) {
    let fileContent = fs.readFileSync(filePath, 'utf8');

    // Fix common broken links
    const linkMappings = {
        // Main section links
        '/docs/graphql': '/docs/graphql/_index',
        '/docs/dql': '/docs/dql/_index',
        
        // DQL specific links with sextuple _index
        '/docs/dql/_index/_index/_index/_index/_index/_index-schema': '/docs/dql/dql-schema',
        '/docs/dql/_index/_index/_index/_index/_index/_index-schema.md#indexes-in-background': '/docs/dql/dql-schema#indexes-in-background',
        '/docs/dql/_index/_index/_index/_index/_index/_index-schema.md#reverse-edges': '/docs/dql/dql-schema#reverse-edges',
        '/docs/dql/_index/_index/_index/_index/_index/_index-schema.md#indexing': '/docs/dql/dql-schema#indexing',
        '/docs/dql/_index/_index/_index/_index/_index/_index-schema.md#count-index': '/docs/dql/dql-schema#count-index',
        '/docs/dql/_index/_index/_index/_index/_index/_index-schema.md#predicates-i18n': '/docs/dql/dql-schema#predicates-i18n',
        '/docs/dql/_index/_index/_index/_index/_index/_index-mutation': '/docs/dql/mutations/_index',
        '/docs/dql/_index/_index/_index/_index/_index/_index-mutation.md#conditional-upsert': '/docs/dql/mutations/_index#conditional-upsert',
        '/docs/dql/_index/_index/_index/_index/_index/clients/_index': '/docs/dql/clients/_index',
        
        // GraphQL specific links with sextuple _index
        '/docs/graphql/_index/_index/_index/schema/_index/_index': '/docs/graphql/schema/_index',
        '/docs/graphql/_index/_index/_index/schema/_index/_index/_index': '/docs/graphql/schema/_index',
        '/docs/graphql/_index/_index/_index/schema/_index/_index/_index-modes': '/docs/graphql/schema/_index',
        '/docs/graphql/_index/_index/_index/_index/_index/schema': '/docs/graphql/schema/_index',
        '/docs/graphql/_index/_index/_index/_index/_index/_index-clients': '/docs/graphql/graphql-clients/_index',
        '/docs/graphql/_index/_index/_index/_index/lambda/lambda-overview': '/docs/graphql/lambda/lambda-overview',
        
        // Other broken links
        '/docs/query-language/_index': '/docs/query-language/_index',
        '/docs/howto/_index': '/docs/howto/_index',
        '/docs/learn/data-engineer/_index': '/docs/learn/data-engineer/_index'
    };

    // Apply all link mappings
    Object.entries(linkMappings).forEach(([oldLink, newLink]) => {
        const regex = new RegExp(oldLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        fileContent = fileContent.replace(regex, newLink);
    });

    fs.writeFileSync(filePath, fileContent);
    console.log(`Fixed ultimate broken links in: ${filePath}`);
}

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (stat.isFile() && (file.endsWith('.md') || file.endsWith('.mdx'))) {
            fixAllUltimateBrokenLinks(filePath);
        }
    });
}

processDirectory(docsDir);
console.log('All ultimate broken links fixes complete!');