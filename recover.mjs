import fs from 'fs';
const lines = fs.readFileSync('C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\cab4fba9-7ffc-446d-ace5-2a6bc639791b\\.system_generated\\logs\\transcript_full.jsonl', 'utf8').split('\n');

let viewFileContent = "";
for (let line of lines) {
  if (!line) continue;
  try {
    const obj = JSON.parse(line);
    if (obj.content && obj.content.includes('Navbar.tsx') && obj.content.includes('Total Lines')) {
        viewFileContent = obj.content;
    }
  } catch(e) {}
}

let codeLines = [];
for (let line of viewFileContent.split('\n')) {
    if (line.match(/^\d+:/)) {
        codeLines.push(line.replace(/^\d+:\s?/, ''));
    }
}
let code = codeLines.join('\n');
fs.writeFileSync('src/components/Navbar.tsx', code);
console.log('Recovered view_file state.');
