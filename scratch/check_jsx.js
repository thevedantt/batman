const fs = require('fs');
const content = fs.readFileSync('app/page.tsx', 'utf8');

let tags = [];
let regex = /<(\/?[a-zA-Z0-9.-]+)/g;
let match;
while ((match = regex.exec(content)) !== null) {
    let tag = match[1];
    if (tag.startsWith('/')) {
        let last = tags.pop();
        if (last !== tag.substring(1)) {
            console.log(`Mismatch: opened ${last}, closed ${tag.substring(1)}`);
        }
    } else {
        // Check for self-closing
        let closingIndex = content.indexOf('>', match.index);
        if (content[closingIndex - 1] !== '/') {
            tags.push(tag);
        }
    }
}
console.log('Unclosed tags:', tags);
