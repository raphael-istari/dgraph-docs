const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

function fixBrokenLinks(filePath) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let newContent = fileContent;

    // Fix common broken links
    newContent = newContent.replace(/\/docs\/graphql(?!\/)/g, '/docs/graphql/_index');
    newContent = newContent.replace(/\/docs\/dql(?!\/)/g, '/docs/dql/_index');
    newContent = newContent.replace(/\/docs\/clients(?!\/)/g, '/docs/dql/clients/_index');
    newContent = newContent.replace(/\/docs\/multitenancy(?!\/)/g, '/docs/enterprise-features/multitenancy');
    newContent = newContent.replace(/\/docs\/bulk-loader(?!\/)/g, '/docs/howto/importdata/bulk-loader');
    newContent = newContent.replace(/\/docs\/live-loader(?!\/)/g, '/docs/howto/importdata/live-loader');
    newContent = newContent.replace(/\/docs\/tutorial-1\/index(?!\/)/g, '/docs/learn/data-engineer/get-started-with-dgraph/tutorial-1/index');

    // Fix specific broken links
    newContent = newContent.replace(/\/docs\/dgraph-administration\.md#export-database/g, '/docs/deploy/admin/dgraph-administration#export-database');
    newContent = newContent.replace(/\/docs\/dgraph-administration\.md#shutting-down-database/g, '/docs/deploy/admin/dgraph-administration#shutting-down-database');
    newContent = newContent.replace(/\/docs\/dql-schema\.md#indexes-in-background/g, '/docs/dql/dql-schema#indexes-in-background');
    newContent = newContent.replace(/\/docs\/dql-schema\.md#reverse-edges/g, '/docs/dql/dql-schema#reverse-edges');
    newContent = newContent.replace(/\/docs\/dql-schema\.md#indexing/g, '/docs/dql/dql-schema#indexing');
    newContent = newContent.replace(/\/docs\/dql-schema\.md#count-index/g, '/docs/dql/dql-schema#count-index');
    newContent = newContent.replace(/\/docs\/dql-schema\.md#predicates-i18n/g, '/docs/dql/dql-schema#predicates-i18n');
    newContent = newContent.replace(/\/docs\/dql-mutation\.md#conditional-upsert/g, '/docs/dql/mutations/uid-upsert#conditional-upsert');
    newContent = newContent.replace(/\/docs\/functions\.md#allofterms/g, '/docs/query-language/functions#allofterms');
    newContent = newContent.replace(/\/docs\/functions\.md#anyofterms/g, '/docs/query-language/functions#anyofterms');
    newContent = newContent.replace(/\/docs\/functions\.md#regular-expressions/g, '/docs/query-language/functions#regular-expressions');
    newContent = newContent.replace(/\/docs\/functions\.md#fuzzy-matching/g, '/docs/query-language/functions#fuzzy-matching');
    newContent = newContent.replace(/\/docs\/functions\.md#full-text-search/g, '/docs/query-language/functions#full-text-search');
    newContent = newContent.replace(/\/docs\/functions\.md#equal-to/g, '/docs/query-language/functions#equal-to');
    newContent = newContent.replace(/\/docs\/functions\.md#less-than-less-than-or-equal-to-greater-than-and-greater-than-or-equal-to/g, '/docs/query-language/functions#less-than-less-than-or-equal-to-greater-than-and-greater-than-or-equal-to');
    newContent = newContent.replace(/\/docs\/functions\.md#between/g, '/docs/query-language/functions#between');
    newContent = newContent.replace(/\/docs\/functions\.md#has/g, '/docs/query-language/functions#has');
    newContent = newContent.replace(/\/docs\/functions\.md#uid/g, '/docs/query-language/functions#uid');
    newContent = newContent.replace(/\/docs\/functions\.md#uid_in/g, '/docs/query-language/functions#uid_in');
    newContent = newContent.replace(/\/docs\/functions\.md#near/g, '/docs/query-language/functions#near');
    newContent = newContent.replace(/\/docs\/functions\.md#within/g, '/docs/query-language/functions#within');
    newContent = newContent.replace(/\/docs\/functions\.md#contains/g, '/docs/query-language/functions#contains');
    newContent = newContent.replace(/\/docs\/functions\.md#intersects/g, '/docs/query-language/functions#intersects');
    newContent = newContent.replace(/\/docs\/go\.md#read-only-transactions/g, '/docs/dql/clients/go#read-only-transactions');
    newContent = newContent.replace(/\/docs\/cli-command-reference\.md#dgraph-live/g, '/docs/deploy/cli-command-reference#dgraph-live');
    newContent = newContent.replace(/\/docs\/multitenancy\.md#guardians-of-the-galaxy/g, '/docs/enterprise-features/multitenancy#guardians-of-the-galaxy');
    newContent = newContent.replace(/\/docs\/access-control-lists\.md#create-a-regular-user/g, '/docs/enterprise-features/access-control-lists#create-a-regular-user');
    newContent = newContent.replace(/\/docs\/raw-http\.md#alter-the-database/g, '/docs/dql/clients/raw-http#alter-the-database');
    newContent = newContent.replace(/\/docs\/graphql\/admin\.md#using-updategqlschema-to-add-or-modify-a-schema/g, '/docs/graphql/admin/index#using-updategqlschema-to-add-or-modify-a-schema');
    newContent = newContent.replace(/\/docs\/graphql\/security\/_index\.md#jwt-claims/g, '/docs/graphql/security/_index#jwt-claims');
    newContent = newContent.replace(/\/docs\/multiple-query-blocks\.md#var-blocks/g, '/docs/query-language/multiple-query-blocks#var-blocks');

    // Fix relative links that should be absolute
    newContent = newContent.replace(/\]\(\/admin\//g, '](/docs/cloud/admin/');
    newContent = newContent.replace(/\]\(\/advanced-queries\//g, '](/docs/cloud/advanced-queries/');
    newContent = newContent.replace(/\]\(\/design-concepts\/raft\//g, '](/docs/design-concepts/raft/');
    newContent = newContent.replace(/\]\(\/query-language/g, '](/docs/query-language');
    newContent = newContent.replace(/\]\(\/faq/g, '](/docs/faq');
    newContent = newContent.replace(/\]\(\/troubleshooting/g, '](/docs/deploy/troubleshooting');
    newContent = newContent.replace(/\]\(\/tls-configuration/g, '](/docs/deploy/security/tls-configuration');
    newContent = newContent.replace(/\]\(\/tracing/g, '](/docs/deploy/admin/tracing');
    newContent = newContent.replace(/\]\(\/docs\/\/deploy\/cluster-setup/g, '](/docs/deploy/cluster-setup');

    if (newContent !== fileContent) {
        fs.writeFileSync(filePath, newContent);
        console.log(`Fixed broken links in: ${filePath}`);
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
            fixBrokenLinks(filePath);
        }
    });
}

processDirectory(docsDir);
console.log('Broken links fixes complete!');
