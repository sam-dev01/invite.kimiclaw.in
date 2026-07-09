const fs = require('fs');
const path = require('path');

const DEMOS_DIR = path.join(__dirname, '..', 'demos');

// Define templates to process
const templatePrefix = 'shaadipath-template';
const targetTemplates = ['01', '03', '04', '05', '06', '07', '08', '09', '10'].map(n => `${templatePrefix}${n}`);

// Source files from template 02
const sourceHtmlFile = path.join(DEMOS_DIR, 'shaadipath-template02', 'source', 'index.html');
const sourceCssFile = path.join(DEMOS_DIR, 'shaadipath-template02', 'source', 'assets', 'style-e0e9358dfc.css');

// Extract HTML block
const sourceHtml = fs.readFileSync(sourceHtmlFile, 'utf8');
const htmlStart = sourceHtml.indexOf('<section id="rsvp"');
const htmlEnd = sourceHtml.indexOf('</section>', htmlStart) + '</section>'.length;
if (htmlStart === -1 || htmlEnd === -1) {
    console.error("Could not find RSVP HTML block in template02");
    process.exit(1);
}
let extractedHtml = sourceHtml.substring(htmlStart, htmlEnd);

// Replace SVG flower colors in HTML so they adapt to CSS variables
extractedHtml = extractedHtml.replace(/fill="#A01830"/gi, 'fill="var(--rose)"');
extractedHtml = extractedHtml.replace(/fill="#C8860A"/gi, 'fill="var(--gold)"');
extractedHtml = extractedHtml.replace(/stroke="#C8860A"/gi, 'stroke="var(--gold)"');

// Extract CSS block
const sourceCss = fs.readFileSync(sourceCssFile, 'utf8');
const sRsvpIndex = sourceCss.indexOf('.s-rsvp{');
const rsvpStart = sourceCss.lastIndexOf('/*', sRsvpIndex);
const sFooterIndex = sourceCss.indexOf('.footer{', rsvpStart);
const rsvpEnd = sourceCss.lastIndexOf('/*', sFooterIndex);

let extractedCss = sourceCss.substring(rsvpStart, rsvpEnd);

// Parameterize the extracted CSS to use CSS variables
extractedCss = extractedCss.replace(/#C8860A/gi, 'var(--gold)');
extractedCss = extractedCss.replace(/#A01830/gi, 'var(--rose)');
extractedCss = extractedCss.replace(/#FAF4E4/gi, 'var(--cream)');

// Function to convert rgba(R, G, B, 0.X) to color-mix(...)
function replaceRgba(cssText, r, g, b, varName) {
    const regex = new RegExp(`rgba\\(\\s*${r}\\s*,\\s*${g}\\s*,\\s*${b}\\s*,\\s*\\.?([0-9]+)\\s*\\)`, 'g');
    return cssText.replace(regex, (match, p1) => {
        let pct = parseInt(p1);
        if(p1.length === 1 && pct < 10) pct = pct * 10;
        return `color-mix(in srgb, ${varName} ${pct}%, transparent)`;
    });
}

// Convert specific RGBAs used in template02 RSVP
extractedCss = replaceRgba(extractedCss, 200, 134, 10, 'var(--gold)'); // Gold
extractedCss = replaceRgba(extractedCss, 160, 24, 48, 'var(--rose)'); // Rose
extractedCss = replaceRgba(extractedCss, 13, 27, 62, 'var(--deep)'); // Deep

console.log("Extracted HTML length:", extractedHtml.length);
console.log("Extracted CSS length:", extractedCss.length);

let successCount = 0;

for (const tpl of targetTemplates) {
    const tplSourceDir = path.join(DEMOS_DIR, tpl, 'source');
    if (!fs.existsSync(tplSourceDir)) {
        console.warn(`Template ${tpl} source dir not found.`);
        continue;
    }

    const htmlFile = path.join(tplSourceDir, 'index.html');
    let htmlContent = fs.readFileSync(htmlFile, 'utf8');

    // Replace HTML
    const startTag = '<section id="rsvp"';
    const sStart = htmlContent.indexOf(startTag);
    if (sStart !== -1) {
        const sEnd = htmlContent.indexOf('</section>', sStart) + '</section>'.length;
        htmlContent = htmlContent.substring(0, sStart) + extractedHtml + htmlContent.substring(sEnd);
        fs.writeFileSync(htmlFile, htmlContent, 'utf8');
    } else {
        console.warn(`${tpl}: <section id="rsvp"> not found in HTML, injecting before footer or at the end`);
        const footerStart = htmlContent.indexOf('<footer');
        if (footerStart !== -1) {
            htmlContent = htmlContent.substring(0, footerStart) + extractedHtml + '\n\n' + htmlContent.substring(footerStart);
            fs.writeFileSync(htmlFile, htmlContent, 'utf8');
        } else {
            htmlContent = htmlContent + '\n\n' + extractedHtml;
            fs.writeFileSync(htmlFile, htmlContent, 'utf8');
        }
    }

    // Replace CSS
    const assetsDir = path.join(tplSourceDir, 'assets');
    const files = fs.readdirSync(assetsDir);
    const cssFile = files.find(f => f.startsWith('style-') && f.endsWith('.css'));
    if (cssFile) {
        const cssPath = path.join(assetsDir, cssFile);
        let cssContent = fs.readFileSync(cssPath, 'utf8');
        
        let localCssStart = -1;
        let localCssEnd = -1;

        const localSrsvpIndex = cssContent.indexOf('.s-rsvp{');
        if (localSrsvpIndex !== -1) {
            localCssStart = cssContent.lastIndexOf('/*', localSrsvpIndex);
            const localFooterIndex = cssContent.indexOf('.footer{', localCssStart);
            if (localFooterIndex !== -1) {
                localCssEnd = cssContent.lastIndexOf('/*', localFooterIndex);
            }
        } 
        
        // If we couldn't find a clean start/end
        if (localCssStart === -1 || localCssEnd === -1) {
            const footerIndex = cssContent.indexOf('.footer{');
            if (footerIndex !== -1) {
                const insertPos = cssContent.lastIndexOf('/*', footerIndex);
                cssContent = cssContent.substring(0, insertPos) + '\n\n' + extractedCss + '\n\n' + cssContent.substring(insertPos);
                fs.writeFileSync(cssPath, cssContent, 'utf8');
                successCount++;
                console.log(`${tpl}: Patched CSS (inserted before footer).`);
            } else {
                // Just append to the end of the file!
                cssContent = cssContent + '\n\n' + extractedCss + '\n\n';
                fs.writeFileSync(cssPath, cssContent, 'utf8');
                successCount++;
                console.log(`${tpl}: Patched CSS (appended to end).`);
            }
        } else {
            // Replace the block
            cssContent = cssContent.substring(0, localCssStart) + extractedCss + cssContent.substring(localCssEnd);
            fs.writeFileSync(cssPath, cssContent, 'utf8');
            successCount++;
            console.log(`${tpl}: Patched HTML and CSS.`);
        }
    } else {
        console.warn(`${tpl}: style file not found`);
    }
}

console.log(`Successfully patched ${successCount} templates.`);
