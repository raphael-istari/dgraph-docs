const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');

// List of directories that need _index.md files
const directoriesNeedingIndex = [
    'graphql',
    'dql',
    'dql/clients',
    'dql/mutations',
    'dql/dql-syntax',
    'dql/clients/javascript',
    'enterprise-features',
    'migration',
    'graphql-dql',
    'ratel',
    'learn',
    'learn/administrator',
    'learn/developer',
    'learn/developer/react',
    'learn/developer/react/graphql',
    'learn/developer/react/ui',
    'learn/developer/sample-apps',
    'learn/developer/todo-app-tutorial',
    'learn/data-engineer',
    'learn/data-engineer/data-model-101',
    'learn/data-engineer/get-started-with-dgraph',
    'howto',
    'howto/commandline',
    'howto/exportdata',
    'howto/importdata',
    'deploy',
    'deploy/admin',
    'deploy/security',
    'deploy/installation',
    'deploy/installation/kubernetes',
    'design-concepts',
    'cloud',
    'cloud/admin',
    'cloud/cloud-api',
    'graphql/schema',
    'graphql/graphql-clients',
    'graphql/mutations',
    'graphql/queries',
    'graphql/lambda',
    'graphql/custom',
    'graphql/security',
    'graphql/schema/directives',
    'graphql/graphql-clients/endpoint',
    'query-language',
    'releases'
];

function createIndexFile(dirPath) {
    const indexPath = path.join(docsDir, dirPath, '_index.md');
    
    // Check if the directory exists
    if (!fs.existsSync(path.dirname(indexPath))) {
        console.log(`Directory doesn't exist: ${path.dirname(indexPath)}`);
        return;
    }
    
    // Check if _index.md already exists
    if (fs.existsSync(indexPath)) {
        console.log(`_index.md already exists: ${indexPath}`);
        return;
    }
    
    // Create a basic _index.md file
    const dirName = path.basename(dirPath);
    const title = dirName.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    const content = `---
title: ${title}
description: ${title} documentation
---

# ${title}

Welcome to the ${title} documentation.

## Overview

This section contains documentation related to ${title}.

## Getting Started

To get started with ${title}, please refer to the specific guides in this section.
`;
    
    fs.writeFileSync(indexPath, content);
    console.log(`Created: ${indexPath}`);
}

// Create index files for all directories
directoriesNeedingIndex.forEach(dir => {
    createIndexFile(dir);
});

console.log('Index files creation complete!');
