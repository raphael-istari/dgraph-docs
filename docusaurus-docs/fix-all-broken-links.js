const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

function fixAllBrokenLinks(filePath) {
    let fileContent = fs.readFileSync(filePath, 'utf8');

    // Fix common broken links
    const linkMappings = {
        // Main section links
        '/docs/graphql': '/docs/graphql/_index',
        '/docs/dql': '/docs/dql/_index',
        
        // Admin links
        '/docs/admin/_index': '/docs/deploy/admin/dgraph-administration',
        '/docs/admin/authentication': '/docs/deploy/admin/dgraph-administration',
        '/docs/admin/schema': '/docs/graphql/schema/_index',
        '/docs/admin/import-export': '/docs/howto/exportdata/about-export',
        '/docs/admin/drop-data': '/docs/howto/drop-data',
        '/docs/admin/schema-modes': '/docs/graphql/schema/_index',
        
        // Cloud API links
        '/docs/cloud-api/overview': '/docs/cloud/cloud-api/_index',
        '/docs/cloud-api/schema': '/docs/cloud/cloud-api/schema',
        '/docs/cloud-api/authentication': '/docs/cloud/cloud-api/authentication',
        '/docs/cloud-api/backend': '/docs/cloud/cloud-api/backend',
        '/docs/cloud-api/backup': '/docs/cloud/cloud-api/backup',
        '/docs/cloud-api/lambda': '/docs/cloud/cloud-api/lambda',
        
        // GraphQL specific links
        '/docs/graphql/schema': '/docs/graphql/schema/_index',
        '/docs/graphql/_index-clients': '/docs/graphql/graphql-clients/_index',
        
        // DQL specific links
        '/docs/dql/_index-schema': '/docs/dql/dql-schema',
        '/docs/dql/_index-schema.md#indexes-in-background': '/docs/dql/dql-schema#indexes-in-background',
        '/docs/dql/_index-schema.md#reverse-edges': '/docs/dql/dql-schema#reverse-edges',
        '/docs/dql/_index-schema.md#indexing': '/docs/dql/dql-schema#indexing',
        '/docs/dql/_index-schema.md#count-index': '/docs/dql/dql-schema#count-index',
        '/docs/dql/_index-schema.md#predicates-i18n': '/docs/dql/dql-schema#predicates-i18n',
        '/docs/dql/_index-mutation': '/docs/dql/mutations/_index',
        '/docs/dql/_index-mutation.md#conditional-upsert': '/docs/dql/mutations/_index#conditional-upsert',
        '/docs/dql/clients/_index': '/docs/dql/clients/_index',
        
        // Deploy links
        '/docs/troubleshooting': '/docs/deploy/troubleshooting',
        '/docs/tls-configuration': '/docs/deploy/security/tls-configuration',
        '/docs/tracing': '/docs/deploy/admin/tracing',
        '/docs/single-host-setup': '/docs/deploy/installation/_index',
        '/docs/#shut-down-database': '/docs/deploy/admin/dgraph-administration#shut-down-database',
        '/docs/#ha-cluster-setup-using-kubernetes': '/docs/deploy/installation/kubernetes/ha-cluster',
        '/docs//deploy/dgraph-zero': '/docs/deploy/dgraph-zero',
        
        // Other links
        '/docs/authentication': '/docs/deploy/admin/dgraph-administration',
        '/docs/schema': '/docs/graphql/schema/_index',
        '/docs/import-export': '/docs/howto/exportdata/about-export',
        '/docs/drop-data': '/docs/howto/drop-data',
        '/docs/lambda': '/docs/graphql/lambda/lambda-overview',
        '/docs/backend': '/docs/cloud/cloud-api/backend',
        '/docs/backup': '/docs/cloud/cloud-api/backup',
        '/docs/query-language': '/docs/query-language/_index',
        '/docs/faq': '/docs/howto/_index',
        '/docs/installation/production-checklist': '/docs/deploy/installation/_index',
        '/advanced-queries#connecting-from-dgraph-clients': '/docs/cloud/advanced-queries#connecting-from-dgraph-clients',
        '/docs/learn/data-engineer/get-started-with-dgraph/tutorial-1/index': '/docs/learn/data-engineer/_index'
    };

    // Apply all link mappings
    Object.entries(linkMappings).forEach(([oldLink, newLink]) => {
        const regex = new RegExp(oldLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        fileContent = fileContent.replace(regex, newLink);
    });

    fs.writeFileSync(filePath, fileContent);
    console.log(`Fixed broken links in: ${filePath}`);
}

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (stat.isFile() && (file.endsWith('.md') || file.endsWith('.mdx'))) {
            fixAllBrokenLinks(filePath);
        }
    });
}

processDirectory(docsDir);
console.log('All broken links fixes complete!');
