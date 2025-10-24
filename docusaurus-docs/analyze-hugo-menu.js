const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const contentDir = path.join(__dirname, '..', 'content');

function analyzeMenuStructure() {
  const menuItems = [];
  
  console.log('Content directory:', contentDir);
  console.log('Directory exists:', fs.existsSync(contentDir));
  
  function processDirectory(dir) {
    console.log('Processing directory:', dir);
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processDirectory(filePath);
      } else if (file.endsWith('.md')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(content, { language: 'toml' });
        
        if (file.includes('graphql') && file.includes('_index')) {
          console.log('File:', filePath);
          console.log('Data keys:', Object.keys(data));
          console.log('Menu data:', data['menu.main']);
        }
        
        if (data['menu.main']) {
          const menuData = data['menu.main'];
          const relativePath = path.relative(contentDir, filePath).replace(/\.md$/, '');
          
          console.log('Found menu item:', relativePath, menuData);
          
          menuItems.push({
            path: relativePath,
            identifier: menuData.identifier,
            parent: menuData.parent,
            weight: menuData.weight || 999,
            name: menuData.name || data.title,
            title: data.title
          });
        }
      }
    });
  }
  
  processDirectory(contentDir);
  
  // Sort by weight
  menuItems.sort((a, b) => a.weight - b.weight);
  
  // Build hierarchy
  const rootItems = menuItems.filter(item => !item.parent);
  const childItems = menuItems.filter(item => item.parent);
  
  function buildHierarchy(items, parentId = null) {
    const children = items.filter(item => item.parent === parentId);
    return children.map(child => {
      const subChildren = buildHierarchy(items, child.identifier);
      return {
        ...child,
        children: subChildren.length > 0 ? subChildren : undefined
      };
    });
  }
  
  const hierarchy = buildHierarchy(menuItems);
  
  console.log('Hugo Menu Structure:');
  console.log(JSON.stringify(hierarchy, null, 2));
  
  return hierarchy;
}

analyzeMenuStructure();
