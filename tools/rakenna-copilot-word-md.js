/*
 * RAI Muutosvahti – Copilot Studio -tietopohja Word-muodossa (koko tietopohja + roolikohtaiset)
 * Ajo projektin juuresta (aja ensin tools/rakenna-copilot-md.js):
 *   node tools/rakenna-copilot-word-md.js
 * Lähde: data/copilot-tietopohja.md
 * Tulos: data/copilot-tietopohja.docx                 (kaikki roolit)
 *        data/copilot-tietopohja-<rooli>.docx          (yksi rooli: yleiset tiedot, roolin
 *                                                      yhteenveto ja jokaisen asiakkaan roolinäkymä)
 *
 * Ei vaadi Wordia eikä lisäkirjastoja: Open XML ja ZIP kirjoitetaan suoraan.
 * Markdownin otsikot muuttuvat Wordin otsikkotyyleiksi (Otsikko 1–4), joita Copilot Studion
 * haku käyttää tekstin jakamiseen.
 */
"use strict";
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const juuri = path.join(__dirname, "..");
const lahde = path.join(juuri, "data", "copilot-tietopohja.md");
const md = fs.readFileSync(lahde, "utf8").replace(/\r\n/g, "\n");

/* ---------- Markdown → otsikkopuu ---------- */
function puu(teksti) {
  const root = { taso: 0, otsikko: null, rivit: [], lapset: [] };
  const pino = [root];
  for (const rivi of teksti.split("\n")) {
    const m = rivi.match(/^(#{1,4}) (.+)$/);
    if (m) {
      const n = { taso: m[1].length, otsikko: m[2], rivit: [], lapset: [] };
      while (pino[pino.length - 1].taso >= n.taso) pino.pop();
      pino[pino.length - 1].lapset.push(n);
      pino.push(n);
    } else pino[pino.length - 1].rivit.push(rivi);
  }
  return root;
}
const litistä = (n) => [...(n.otsikko ? [`${"#".repeat(n.taso)} ${n.otsikko}`] : []), ...n.rivit, ...n.lapset.flatMap(litistä)];

/* ---------- roolit tietopohjasta ---------- */
const kaikki = puu(md);
const etsi = (n, f) => (f(n) ? n : n.lapset.reduce((x, c) => x || etsi(c, f), null));
const roolitOsio = etsi(kaikki, (n) => n.otsikko === "Roolit ja käyttöoikeudet");
const ROOLIT = roolitOsio.lapset.map((n) => {
  const nimi = n.otsikko.replace(/^Rooli: /, "");
  const gen = (n.rivit.find((r) => /^- \S+ painotetut RAI-osa-alueet/.test(r)) || "").match(/^- (\S+)/)[1].toLowerCase();
  const eiNae = n.rivit.find((r) => / ei näe: /.test(r)) || "";
  return { nimi, gen, tiedosto: nimi.toLowerCase().replace(/ä/g, "a").replace(/ö/g, "o").replace(/[^a-z]/g, ""), lomakkeet: !/Rakenteiset kyselyt/.test(eiNae) };
});

/* ---------- roolikohtainen suodatus ---------- */
function roolinMd(r) {
  const kopio = JSON.parse(JSON.stringify(kaikki));
  const iso = r.gen.charAt(0).toUpperCase() + r.gen.slice(1);
  const pidä = (n) => {
    const o = n.otsikko || "";
    if (/^Rooli: /.test(o)) return o === `Rooli: ${r.nimi}`;
    if (/tarkistamisjärjestys/.test(o) && n.taso === 3) return o.startsWith(iso + " ");
    const nk = o.match(/^Asiakas \S+ – (\S+) näkymä/);
    if (nk && n.taso === 3) return nk[1] === r.gen;
    if (o === "Rakenteiset kyselyt") return r.lomakkeet;
    return true;
  };
  const suodata = (n) => { n.lapset = n.lapset.filter(pidä); n.lapset.forEach(suodata); };
  suodata(kopio);
  // otsikko ja rajaushuomautus
  const otsikko = kopio.lapset[0];
  otsikko.otsikko = `RAI Muutosvahti – RAI-007-tietopohja: ${r.nimi}`;
  otsikko.rivit.unshift("", `**Tämä tiedosto sisältää vain ${r.gen} tiedot:** roolin käyttöoikeudet, roolin tarkistamisjärjestyksen ja jokaisen asiakkaan ${r.gen} näkymän (RAI-seuranta-arvio). Muiden roolien näkymät ovat omissa tiedostoissaan.`);
  // asiakasyhteenvedon taulukosta vain roolin sarake
  const yv = kopio.lapset.find((n) => n.otsikko === "Asiakasyhteenveto");
  const solut = (rivi) => rivi.slice(1, -1).split("|").map((s) => s.trim());
  const otsakkeet = solut(yv.rivit.find((x) => x.startsWith("|")));
  const sarake = otsakkeet.indexOf(r.nimi);
  yv.rivit = yv.rivit.map((x) => {
    if (!x.startsWith("|")) return x;
    const s = solut(x);
    return `| ${[...s.slice(0, 4), s[sarake]].join(" | ")} |`;
  });
  return litistä(kopio).join("\n");
}

/* ---------- Open XML ---------- */
const xe = (s) => String(s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const SIVU = { w: 11906, h: 16838, reuna: 1134 };
const LEVEYS = SIVU.w - 2 * SIVU.reuna;

function ajot(teksti, perus = {}) {
  const out = [];
  for (const osa of teksti.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*\*)/)) {
    if (!osa) continue;
    let t = osa, b = perus.b, i = perus.i;
    if (/^\*\*.+\*\*$/.test(t)) { t = t.slice(2, -2); b = true; }
    else if (/^\*.+\*$/.test(t)) { t = t.slice(1, -1); i = true; }
    const rpr = `${b ? "<w:b/>" : ""}${i ? "<w:i/>" : ""}${perus.sz ? `<w:sz w:val="${perus.sz}"/><w:szCs w:val="${perus.sz}"/>` : ""}`;
    out.push(`<w:r>${rpr ? `<w:rPr>${rpr}</w:rPr>` : ""}<w:t xml:space="preserve">${xe(t)}</w:t></w:r>`);
  }
  return out.join("");
}
const kappale = (teksti, ppr = "", perus) => `<w:p>${ppr ? `<w:pPr>${ppr}</w:pPr>` : ""}${ajot(teksti, perus)}</w:p>`;

function taulukko(rivit) {
  const solut = (r) => r.slice(1, -1).split("|").map((s) => s.trim());
  const data = rivit.filter((r) => !/^\|[\s|:-]+\|$/.test(r)).map(solut);
  const n = data[0].length;
  const suhteet = n === 5 ? [11, 27, 12, 22, 28] : n === 8 ? [10, 18, 9, 14, 12, 12, 12, 13] : Array(n).fill(1);
  const summa = suhteet.reduce((a, b) => a + b, 0);
  const lev = suhteet.map((x) => Math.floor((LEVEYS * x) / summa));
  lev[n - 1] += LEVEYS - lev.reduce((a, b) => a + b, 0);
  const reuna = `<w:tblBorders>${["top", "left", "bottom", "right", "insideH", "insideV"].map((k) => `<w:${k} w:val="single" w:sz="4" w:space="0" w:color="A6A6A6"/>`).join("")}</w:tblBorders>`;
  const rivi = (s, otsake) => `<w:tr>${otsake ? "<w:trPr><w:tblHeader/></w:trPr>" : ""}${s.map((t, i) => `<w:tc><w:tcPr><w:tcW w:w="${lev[i]}" w:type="dxa"/>${otsake ? '<w:shd w:val="clear" w:color="auto" w:fill="DCE9F2"/>' : ""}</w:tcPr>${kappale(t, '<w:spacing w:before="20" w:after="20"/>', { sz: 17, b: otsake })}</w:tc>`).join("")}</w:tr>`;
  return `<w:tbl><w:tblPr><w:tblW w:w="${LEVEYS}" w:type="dxa"/>${reuna}<w:tblLayout w:type="fixed"/><w:tblCellMar><w:left w:w="70" w:type="dxa"/><w:right w:w="70" w:type="dxa"/></w:tblCellMar></w:tblPr><w:tblGrid>${lev.map((w) => `<w:gridCol w:w="${w}"/>`).join("")}</w:tblGrid>${data.map((s, i) => rivi(s, i === 0)).join("")}</w:tbl>${kappale("")}`;
}

function runko(teksti) {
  const rivit = teksti.split("\n");
  const out = [];
  let numId = 2; // 1 = luettelomerkit, 2.. = numeroidut luettelot (jokainen alkaa ykkösestä)
  let numeroitu = false;
  for (let i = 0; i < rivit.length; i++) {
    const r = rivit[i];
    if (!/^\d+\. /.test(r)) numeroitu = false;
    if (!r.trim()) continue;
    const h = r.match(/^(#{1,4}) (.+)$/);
    if (h) {
      const taso = h[1].length;
      const uusiSivu = taso === 2 && /^Asiakas \d+$/.test(h[2]) || (taso === 1 && out.length > 0);
      out.push(kappale(h[2], `<w:pStyle w:val="Heading${taso}"/>${uusiSivu ? "<w:pageBreakBefore/>" : ""}`));
      continue;
    }
    if (r.startsWith("|")) {
      const t = [];
      while (i < rivit.length && rivit[i].startsWith("|")) t.push(rivit[i++]);
      i--;
      out.push(taulukko(t));
      continue;
    }
    let m;
    if ((m = r.match(/^( *)- (.*)$/))) {
      const lvl = m[1].length >= 2 ? 1 : 0;
      out.push(kappale(m[2], `<w:pStyle w:val="ListParagraph"/><w:numPr><w:ilvl w:val="${lvl}"/><w:numId w:val="1"/></w:numPr><w:spacing w:after="40"/>`));
      continue;
    }
    if ((m = r.match(/^\d+\. (.*)$/))) {
      if (!numeroitu) { numId++; numeroitu = true; }
      out.push(kappale(m[1], `<w:pStyle w:val="ListParagraph"/><w:numPr><w:ilvl w:val="0"/><w:numId w:val="${numId}"/></w:numPr><w:spacing w:after="40"/>`));
      continue;
    }
    out.push(kappale(r));
  }
  return { xml: out.join(""), numerot: numId };
}

function docx(teksti, otsikko) {
  const { xml, numerot } = runko(teksti);
  const W = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';
  const R = 'xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"';
  const footer = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:ftr ${W}><w:p><w:pPr><w:jc w:val="center"/></w:pPr><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:t xml:space="preserve">${xe(otsikko)} · synteettinen demoaineisto · sivu </w:t></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="begin"/></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:instrText xml:space="preserve"> PAGE </w:instrText></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="separate"/></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:t>1</w:t></w:r><w:r><w:rPr><w:sz w:val="16"/></w:rPr><w:fldChar w:fldCharType="end"/></w:r></w:p></w:ftr>`;
  const document = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document ${W} ${R}><w:body>${xml}<w:sectPr><w:footerReference w:type="default" r:id="rId4"/><w:pgSz w:w="${SIVU.w}" w:h="${SIVU.h}"/><w:pgMar w:top="${SIVU.reuna}" w:right="${SIVU.reuna}" w:bottom="${SIVU.reuna}" w:left="${SIVU.reuna}" w:header="567" w:footer="567" w:gutter="0"/></w:sectPr></w:body></w:document>`;
  const otsikkoTyyli = (n, koko, vari, ennen) => `<w:style w:type="paragraph" w:styleId="Heading${n}"><w:name w:val="heading ${n}"/><w:basedOn w:val="Normal"/><w:next w:val="Normal"/><w:uiPriority w:val="9"/><w:qFormat/><w:pPr><w:keepNext/><w:keepLines/><w:spacing w:before="${ennen}" w:after="80"/><w:outlineLvl w:val="${n - 1}"/></w:pPr><w:rPr><w:rFonts w:asciiTheme="majorHAnsi" w:hAnsiTheme="majorHAnsi"/><w:b/><w:color w:val="${vari}"/><w:sz w:val="${koko}"/><w:szCs w:val="${koko}"/></w:rPr></w:style>`;
  const styles = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles ${W}><w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:eastAsia="Calibri" w:cs="Calibri"/><w:sz w:val="20"/><w:szCs w:val="20"/><w:lang w:val="fi-FI"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="100" w:line="264" w:lineRule="auto"/></w:pPr></w:pPrDefault></w:docDefaults><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:qFormat/></w:style>${otsikkoTyyli(1, 34, "1F4E79", 240)}${otsikkoTyyli(2, 28, "1F4E79", 240)}${otsikkoTyyli(3, 24, "2E74B5", 200)}${otsikkoTyyli(4, 21, "404040", 140)}<w:style w:type="paragraph" w:styleId="ListParagraph"><w:name w:val="List Paragraph"/><w:basedOn w:val="Normal"/><w:uiPriority w:val="34"/><w:qFormat/><w:pPr><w:ind w:left="720"/><w:contextualSpacing/></w:pPr></w:style><w:style w:type="table" w:default="1" w:styleId="TableNormal"><w:name w:val="Normal Table"/><w:tblPr><w:tblInd w:w="0" w:type="dxa"/><w:tblCellMar><w:top w:w="0" w:type="dxa"/><w:left w:w="108" w:type="dxa"/><w:bottom w:w="0" w:type="dxa"/><w:right w:w="108" w:type="dxa"/></w:tblCellMar></w:tblPr></w:style></w:styles>`;
  const taso = (i, fmt, teksti, ind) => `<w:lvl w:ilvl="${i}"><w:start w:val="1"/><w:numFmt w:val="${fmt}"/><w:lvlText w:val="${teksti}"/><w:lvlJc w:val="left"/><w:pPr><w:ind w:left="${ind}" w:hanging="360"/></w:pPr>${fmt === "bullet" ? '<w:rPr><w:rFonts w:ascii="Symbol" w:hAnsi="Symbol" w:hint="default"/></w:rPr>' : ""}</w:lvl>`;
  const nums = [];
  for (let n = 3; n <= numerot; n++) nums.push(`<w:num w:numId="${n}"><w:abstractNumId w:val="1"/><w:lvlOverride w:ilvl="0"><w:startOverride w:val="1"/></w:lvlOverride></w:num>`);
  const numbering = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:numbering ${W}><w:abstractNum w:abstractNumId="0"><w:multiLevelType w:val="hybridMultilevel"/>${taso(0, "bullet", "", 720)}${taso(1, "bullet", "", 1080).replace("Symbol\" w:hAnsi=\"Symbol", "Courier New\" w:hAnsi=\"Courier New").replace("", "o")}</w:abstractNum><w:abstractNum w:abstractNumId="1"><w:multiLevelType w:val="hybridMultilevel"/>${taso(0, "decimal", "%1.", 720)}</w:abstractNum><w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num>${nums.join("")}</w:numbering>`;
  const nyt = new Date().toISOString().replace(/\.\d+Z$/, "Z");
  return zip({
    "[Content_Types].xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/><Override PartName="/word/footer1.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/></Types>`,
    "_rels/.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/></Relationships>`,
    "docProps/core.xml": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${xe(otsikko)}</dc:title><dc:language>fi-FI</dc:language><dcterms:created xsi:type="dcterms:W3CDTF">${nyt}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">${nyt}</dcterms:modified></cp:coreProperties>`,
    "word/_rels/document.xml.rels": `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/><Relationship Id="rId4" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/footer" Target="footer1.xml"/></Relationships>`,
    "word/document.xml": document,
    "word/styles.xml": styles,
    "word/numbering.xml": numbering,
    "word/footer1.xml": footer
  });
}

/* ---------- ZIP (deflate) ---------- */
function zip(tiedostot) {
  const paikalliset = [], keskus = [];
  let siirto = 0;
  for (const [nimi, sisalto] of Object.entries(tiedostot)) {
    const data = Buffer.from(sisalto, "utf8");
    const pakattu = zlib.deflateRawSync(data);
    const crc = zlib.crc32(data);
    const n = Buffer.from(nimi, "utf8");
    const lh = Buffer.alloc(30);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0x0800, 6); lh.writeUInt16LE(8, 8);
    lh.writeUInt16LE(0, 10); lh.writeUInt16LE(0x21, 12); lh.writeUInt32LE(crc, 14);
    lh.writeUInt32LE(pakattu.length, 18); lh.writeUInt32LE(data.length, 22); lh.writeUInt16LE(n.length, 26); lh.writeUInt16LE(0, 28);
    const ch = Buffer.alloc(46);
    ch.writeUInt32LE(0x02014b50, 0); ch.writeUInt16LE(20, 4); ch.writeUInt16LE(20, 6); ch.writeUInt16LE(0x0800, 8); ch.writeUInt16LE(8, 10);
    ch.writeUInt16LE(0, 12); ch.writeUInt16LE(0x21, 14); ch.writeUInt32LE(crc, 16); ch.writeUInt32LE(pakattu.length, 20);
    ch.writeUInt32LE(data.length, 24); ch.writeUInt16LE(n.length, 28); ch.writeUInt32LE(siirto, 42);
    paikalliset.push(lh, n, pakattu);
    keskus.push(ch, n);
    siirto += lh.length + n.length + pakattu.length;
  }
  const kd = Buffer.concat(keskus);
  const loppu = Buffer.alloc(22);
  const lkm = Object.keys(tiedostot).length;
  loppu.writeUInt32LE(0x06054b50, 0); loppu.writeUInt16LE(lkm, 8); loppu.writeUInt16LE(lkm, 10);
  loppu.writeUInt32LE(kd.length, 12); loppu.writeUInt32LE(siirto, 16);
  return Buffer.concat([...paikalliset, kd, loppu]);
}

/* ---------- kirjoitus ---------- */
const kirjoita = (tiedosto, teksti, otsikko) => {
  const p = path.join(juuri, "data", tiedosto);
  fs.writeFileSync(p, docx(teksti, otsikko));
  console.log(`  data/${tiedosto} (${(fs.statSync(p).size / 1024).toFixed(0)} kt)`);
};
console.log("Kirjoitettu:");
kirjoita("copilot-tietopohja.docx", md, "RAI-007-tietopohja – kaikki roolit");
for (const r of ROOLIT) kirjoita(`copilot-tietopohja-${r.tiedosto}.docx`, roolinMd(r), `RAI-007-tietopohja – ${r.nimi}`);

/* ---------- asiakaskohtaiset tiedostot ----------
 * Copilot Studion haku löytää asiakkaan luotettavammin pienestä tiedostosta, jonka nimessä ja
 * otsikossa on asiakkaan numero, kuin koko tietopohjan sisältävästä suuresta tiedostosta.
 * Tulos: data/copilot-asiakkaat/00-yleiset-tiedot.docx (kaikki paitsi asiakkaat)
 *        data/copilot-asiakkaat/asiakas-<nro>.docx    (yksi asiakas, kaikki roolinäkymät)
 */
const KANSIO = "copilot-asiakkaat";
fs.rmSync(path.join(juuri, "data", KANSIO), { recursive: true, force: true });
fs.mkdirSync(path.join(juuri, "data", KANSIO));
const asiakkaatOsio = kaikki.lapset.find((n) => n.taso === 1 && n.otsikko === "Asiakkaat");
const yleiset = { ...kaikki, lapset: kaikki.lapset.filter((n) => n !== asiakkaatOsio) };
kirjoita(`${KANSIO}/00-yleiset-tiedot.docx`, litistä(yleiset).join("\n"), "RAI-007-tietopohja – yleiset tiedot ja asiakasyhteenveto");
const synteettinen = "Kaikki tiedot ovat synteettisiä (LUVN / Veil.AI hackathon -aineisto). Henkilö ei ole oikea. Viitepäivä (\"tänään\") 13.10.2026. Tiedosto sisältää asiakkaan perustiedot ja jokaisen roolin näkymän; käytä vain käyttäjän roolin näkymää.";
for (const a of asiakkaatOsio.lapset) {
  const nro = a.otsikko.replace(/^Asiakas /, "");
  const teksti = [`# RAI-007-tietopohja – ${a.otsikko}`, "", synteettinen, "", ...litistä(a)].join("\n");
  kirjoita(`${KANSIO}/asiakas-${nro}.docx`, teksti, `RAI-007-tietopohja – ${a.otsikko}`);
}
