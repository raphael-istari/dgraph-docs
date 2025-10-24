const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

function fixAllBrokenLinksFinal(filePath) {
    let fileContent = fs.readFileSync(filePath, 'utf8');

    // Remove all _index references - Docusaurus handles directory routing automatically
    fileContent = fileContent.replace(/\/docs\/graphql\/_index/g, '/docs/graphql');
    fileContent = fileContent.replace(/\/docs\/dql\/_index/g, '/docs/dql');
    fileContent = fileContent.replace(/\/docs\/dql\/clients\/_index/g, '/docs/dql/clients');
    fileContent = fileContent.replace(/\/docs\/learn\/data-engineer\/_index/g, '/docs/learn/data-engineer');
    fileContent = fileContent.replace(/\/docs\/query-language\/_index/g, '/docs/query-language');
    fileContent = fileContent.replace(/\/docs\/howto\/_index/g, '/docs/howto');
    fileContent = fileContent.replace(/\/docs\/deploy\/installation\/_index/g, '/docs/deploy/installation');
    fileContent = fileContent.replace(/\/docs\/cloud\/cloud-api\/_index/g, '/docs/cloud/cloud-api');
    fileContent = fileContent.replace(/\/docs\/cloud\/admin\/_index/g, '/docs/cloud/admin');
    fileContent = fileContent.replace(/\/docs\/graphql\/schema\/_index/g, '/docs/graphql/schema');
    fileContent = fileContent.replace(/\/docs\/graphql\/graphql-clients\/_index/g, '/docs/graphql/graphql-clients');
    fileContent = fileContent.replace(/\/docs\/graphql\/mutations\/_index/g, '/docs/graphql/mutations');
    fileContent = fileContent.replace(/\/docs\/graphql\/queries\/_index/g, '/docs/graphql/queries');
    fileContent = fileContent.replace(/\/docs\/graphql\/lambda\/_index/g, '/docs/graphql/lambda');
    fileContent = fileContent.replace(/\/docs\/graphql\/custom\/_index/g, '/docs/graphql/custom');
    fileContent = fileContent.replace(/\/docs\/graphql\/security\/_index/g, '/docs/graphql/security');
    fileContent = fileContent.replace(/\/docs\/graphql\/schema\/directives\/_index/g, '/docs/graphql/schema/directives');
    fileContent = fileContent.replace(/\/docs\/graphql\/graphql-clients\/endpoint\/_index/g, '/docs/graphql/graphql-clients/endpoint');
    fileContent = fileContent.replace(/\/docs\/graphql\/graphql-clients\/endpoint\/_index/g, '/docs/graphql/graphql-clients/endpoint');
    fileContent = fileContent.replace(/\/docs\/dql\/mutations\/_index/g, '/docs/dql/mutations');
    fileContent = fileContent.replace(/\/docs\/dql\/dql-syntax\/_index/g, '/docs/dql/dql-syntax');
    fileContent = fileContent.replace(/\/docs\/dql\/clients\/javascript\/_index/g, '/docs/dql/clients/javascript');
    fileContent = fileContent.replace(/\/docs\/enterprise-features\/_index/g, '/docs/enterprise-features');
    fileContent = fileContent.replace(/\/docs\/migration\/_index/g, '/docs/migration');
    fileContent = fileContent.replace(/\/docs\/graphql-dql\/_index/g, '/docs/graphql-dql');
    fileContent = fileContent.replace(/\/docs\/ratel\/_index/g, '/docs/ratel');
    fileContent = fileContent.replace(/\/docs\/learn\/_index/g, '/docs/learn');
    fileContent = fileContent.replace(/\/docs\/learn\/administrator\/_index/g, '/docs/learn/administrator');
    fileContent = fileContent.replace(/\/docs\/learn\/developer\/_index/g, '/docs/learn/developer');
    fileContent = fileContent.replace(/\/docs\/learn\/developer\/react\/_index/g, '/docs/learn/developer/react');
    fileContent = fileContent.replace(/\/docs\/learn\/developer\/react\/graphql\/_index/g, '/docs/learn/developer/react/graphql');
    fileContent = fileContent.replace(/\/docs\/learn\/developer\/react\/ui\/_index/g, '/docs/learn/developer/react/ui');
    fileContent = fileContent.replace(/\/docs\/learn\/developer\/sample-apps\/_index/g, '/docs/learn/developer/sample-apps');
    fileContent = fileContent.replace(/\/docs\/learn\/developer\/todo-app-tutorial\/_index/g, '/docs/learn/developer/todo-app-tutorial');
    fileContent = fileContent.replace(/\/docs\/learn\/data-engineer\/data-model-101\/_index/g, '/docs/learn/data-engineer/data-model-101');
    fileContent = fileContent.replace(/\/docs\/learn\/data-engineer\/get-started-with-dgraph\/_index/g, '/docs/learn/data-engineer/get-started-with-dgraph');
    fileContent = fileContent.replace(/\/docs\/howto\/commandline\/_index/g, '/docs/howto/commandline');
    fileContent = fileContent.replace(/\/docs\/howto\/exportdata\/_index/g, '/docs/howto/exportdata');
    fileContent = fileContent.replace(/\/docs\/howto\/importdata\/_index/g, '/docs/howto/importdata');
    fileContent = fileContent.replace(/\/docs\/deploy\/_index/g, '/docs/deploy');
    fileContent = fileContent.replace(/\/docs\/deploy\/admin\/_index/g, '/docs/deploy/admin');
    fileContent = fileContent.replace(/\/docs\/deploy\/security\/_index/g, '/docs/deploy/security');
    fileContent = fileContent.replace(/\/docs\/deploy\/installation\/kubernetes\/_index/g, '/docs/deploy/installation/kubernetes');
    fileContent = fileContent.replace(/\/docs\/design-concepts\/_index/g, '/docs/design-concepts');
    fileContent = fileContent.replace(/\/docs\/cloud\/_index/g, '/docs/cloud');
    fileContent = fileContent.replace(/\/docs\/releases\/index/g, '/docs/releases');

    // Fix specific broken patterns
    fileContent = fileContent.replace(/\/docs\/dql\/dql-schema\.mdex-schema/g, '/docs/dql/dql-schema');
    fileContent = fileContent.replace(/\/docs\/graphql\/schema\/_index-modes/g, '/docs/cloud/admin/schema-modes');
    fileContent = fileContent.replace(/\/docs\/about_import/g, '/docs/howto/importdata/about_import');
    fileContent = fileContent.replace(/\/clients/g, '/docs/dql/clients');

    // Fix specific anchor links that might be broken
    fileContent = fileContent.replace(/\/docs\/dql\/mutations\/_index\.md#conditional-upsert/g, '/docs/dql/mutations#conditional-upsert');
    fileContent = fileContent.replace(/\/docs\/dql\/dql-schema\.md#indexes-in-background/g, '/docs/dql/dql-schema#indexes-in-background');
    fileContent = fileContent.replace(/\/docs\/dql\/dql-schema\.md#reverse-edges/g, '/docs/dql/dql-schema#reverse-edges');
    fileContent = fileContent.replace(/\/docs\/dql\/dql-schema\.md#indexing/g, '/docs/dql/dql-schema#indexing');
    fileContent = fileContent.replace(/\/docs\/dql\/dql-schema\.md#count-index/g, '/docs/dql/dql-schema#count-index');
    fileContent = fileContent.replace(/\/docs\/dql\/dql-schema\.md#predicates-i18n/g, '/docs/dql/dql-schema#predicates-i18n');

    // Fix any remaining malformed URLs with multiple _index segments
    fileContent = fileContent.replace(/\/docs\/([^\/]+)\/_index\/_index/g, '/docs/$1');
    fileContent = fileContent.replace(/\/docs\/([^\/]+)\/([^\/]+)\/_index\/_index/g, '/docs/$1/$2');
    fileContent = fileContent.replace(/\/docs\/([^\/]+)\/([^\/]+)\/([^\/]+)\/_index\/_index/g, '/docs/$1/$2/$3');

    fs.writeFileSync(filePath, fileContent);
    console.log(`Fixed all broken links in: ${filePath}`);
}

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    files.forEach(file => {
        const filePath = path.join(directory, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (stat.isFile() && (file.endsWith('.md') || file.endsWith('.mdx'))) {
            fixAllBrokenLinksFinal(filePath);
        }
    });
}

processDirectory(docsDir);
console.log('All broken links fixes complete!');
