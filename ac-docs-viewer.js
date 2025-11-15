// AC Language Documentation Viewer
let acDocs = null;

// JSON dosyasını yükle
async function loadACDocumentation() {
    try {
        const response = await fetch('ac-language-docs.json');
        acDocs = await response.json();
        renderDocumentation();
    } catch (error) {
        console.error('Dokümantasyon yüklenemedi:', error);
        document.getElementById('docsContent').innerHTML = `
            <div class="docs-error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Dokümantasyon yüklenemedi. Lütfen sayfayı yenileyin.</p>
            </div>
        `;
    }
}

// Dokümantasyonu render et
function renderDocumentation() {
    const content = document.getElementById('docsContent');
    if (!acDocs) return;
    
    content.innerHTML = `
        <div id="docs-overview" class="docs-section">
            ${renderOverview()}
        </div>
        <div id="docs-keywords" class="docs-section">
            ${renderKeywords()}
        </div>
        <div id="docs-operators" class="docs-section">
            ${renderOperators()}
        </div>
        <div id="docs-syntax" class="docs-section">
            ${renderSyntax()}
        </div>
        <div id="docs-datatypes" class="docs-section">
            ${renderDataTypes()}
        </div>
        <div id="docs-examples" class="docs-section">
            ${renderExamples()}
        </div>
        <div id="docs-compilation" class="docs-section">
            ${renderCompilation()}
        </div>
    `;
    
    // Menü linklerini aktifleştir
    setupDocsNavigation();
}

// Genel Bakış
function renderOverview() {
    const lang = acDocs.language;
    return `
        <h3>Genel Bakış</h3>
        <div class="docs-item">
            <h5>Dil Bilgileri</h5>
            <p><strong>İsim:</strong> ${lang.name}</p>
            <p><strong>Tam İsim:</strong> ${lang.fullName}</p>
            <p><strong>Versiyon:</strong> ${lang.version}</p>
            <p><strong>Geliştirici:</strong> ${lang.developer}</p>
            <p><strong>Açıklama:</strong> ${lang.description}</p>
        </div>
        <div class="docs-item">
            <h5>Platformlar</h5>
            <ul>
                ${lang.platforms.map(p => `<li>${p}</li>`).join('')}
            </ul>
        </div>
        <div class="docs-item">
            <h5>Derleyiciler</h5>
            <ul>
                ${lang.compilers.map(c => `<li>${c}</li>`).join('')}
            </ul>
        </div>
    `;
}

// Anahtar Kelimeler
function renderKeywords() {
    const keywords = acDocs.keywords;
    let html = '<h3>Anahtar Kelimeler</h3>';
    
    // Veri Tipleri
    html += '<h4>Veri Tipleri</h4>';
    keywords.dataTypes.forEach(kw => {
        html += `
            <div class="docs-item">
                <h5><code>${kw.keyword}</code> - ${kw.english}</h5>
                <p>${kw.description}</p>
                <div class="docs-example">
                    <pre>${kw.example}</pre>
                </div>
            </div>
        `;
    });
    
    // Kontrol Akışı
    html += '<h4>Kontrol Akışı</h4>';
    keywords.controlFlow.forEach(kw => {
        html += `
            <div class="docs-item">
                <h5><code>${kw.keyword}</code> - ${kw.english}</h5>
                <p>${kw.description}</p>
                <div class="docs-example">
                    <pre>${kw.example}</pre>
                </div>
            </div>
        `;
    });
    
    // Fonksiyonlar
    html += '<h4>Fonksiyonlar</h4>';
    keywords.functions.forEach(kw => {
        html += `
            <div class="docs-item">
                <h5><code>${kw.keyword}</code> - ${kw.english}</h5>
                <p>${kw.description}</p>
                <p><strong>Syntax:</strong> <code>${kw.syntax}</code></p>
                <div class="docs-example">
                    <pre>${kw.example}</pre>
                </div>
            </div>
        `;
    });
    
    // Çıktı
    html += '<h4>Çıktı</h4>';
    keywords.output.forEach(kw => {
        html += `
            <div class="docs-item">
                <h5><code>${kw.keyword}</code> - ${kw.english}</h5>
                <p>${kw.description}</p>
                <p><strong>Syntax:</strong> <code>${kw.syntax}</code></p>
                ${kw.variations ? `<ul>${kw.variations.map(v => `<li><code>${v}</code></li>`).join('')}</ul>` : ''}
            </div>
        `;
    });
    
    // OOP
    html += '<h4>Nesne Yönelimli Programlama</h4>';
    keywords.oop.forEach(kw => {
        html += `
            <div class="docs-item">
                <h5><code>${kw.keyword}</code> - ${kw.english}</h5>
                <p>${kw.description}</p>
                ${kw.syntax ? `<p><strong>Syntax:</strong> <code>${kw.syntax}</code></p>` : ''}
                <div class="docs-example">
                    <pre>${kw.example}</pre>
                </div>
            </div>
        `;
    });
    
    return html;
}

// Operatörler
function renderOperators() {
    const ops = acDocs.operators;
    let html = '<h3>Operatörler</h3>';
    
    // Aritmetik
    html += '<h4>Aritmetik Operatörler</h4>';
    html += '<table class="docs-table"><thead><tr><th>Operatör</th><th>İsim</th><th>Örnek</th></tr></thead><tbody>';
    ops.arithmetic.forEach(op => {
        html += `<tr><td><code>${op.operator}</code></td><td>${op.name}</td><td><code>${op.example}</code></td></tr>`;
    });
    html += '</tbody></table>';
    
    // Karşılaştırma
    html += '<h4>Karşılaştırma Operatörleri</h4>';
    html += '<table class="docs-table"><thead><tr><th>Operatör</th><th>İsim</th><th>Örnek</th></tr></thead><tbody>';
    ops.comparison.forEach(op => {
        html += `<tr><td><code>${op.operator}</code></td><td>${op.name}</td><td><code>${op.example}</code></td></tr>`;
    });
    html += '</tbody></table>';
    
    // Mantıksal
    html += '<h4>Mantıksal Operatörler</h4>';
    html += '<table class="docs-table"><thead><tr><th>Operatör</th><th>İsim</th><th>Örnek</th></tr></thead><tbody>';
    ops.logical.forEach(op => {
        html += `<tr><td><code>${op.operator}</code></td><td>${op.name}</td><td><code>${op.example}</code></td></tr>`;
    });
    html += '</tbody></table>';
    
    return html;
}

// Syntax Kuralları
function renderSyntax() {
    const syntax = acDocs.syntax;
    let html = '<h3>Syntax Kuralları</h3>';
    
    Object.keys(syntax).forEach(key => {
        const rule = syntax[key];
        html += `
            <div class="docs-item">
                <h5>${key.charAt(0).toUpperCase() + key.slice(1)}</h5>
                <p>${rule.description || ''}</p>
                ${rule.syntax ? `<p><strong>Syntax:</strong> <code>${rule.syntax}</code></p>` : ''}
                ${rule.examples ? `
                    <h6>Örnekler:</h6>
                    ${rule.examples.map(ex => `<div class="docs-example"><pre>${ex}</pre></div>`).join('')}
                ` : ''}
                ${rule.example ? `<div class="docs-example"><pre>${rule.example}</pre></div>` : ''}
                ${rule.rules ? `
                    <h6>Kurallar:</h6>
                    <ul>
                        ${rule.rules.map(r => `<li>${r}</li>`).join('')}
                    </ul>
                ` : ''}
            </div>
        `;
    });
    
    return html;
}

// Veri Tipleri
function renderDataTypes() {
    const types = acDocs.dataTypes;
    let html = '<h3>Veri Tipleri</h3>';
    
    html += '<h4>İlkel Tipler</h4>';
    types.primitive.forEach(type => {
        html += `
            <div class="docs-item">
                <h5><code>${type.type}</code> - ${type.english}</h5>
                <p>${type.description || ''}</p>
                <p><strong>Varsayılan Değer:</strong> <code>${type.defaultValue}</code></p>
                <div class="docs-example">
                    <pre>${type.example}</pre>
                </div>
            </div>
        `;
    });
    
    html += '<h4>Karmaşık Tipler</h4>';
    types.complex.forEach(type => {
        html += `
            <div class="docs-item">
                <h5><code>${type.type}</code> - ${type.english}</h5>
                <p><strong>Syntax:</strong> <code>${type.syntax}</code></p>
                <div class="docs-example">
                    <pre>${type.example}</pre>
                </div>
            </div>
        `;
    });
    
    return html;
}

// Örnekler
function renderExamples() {
    const examples = acDocs.examples;
    let html = '<h3>Örnek Programlar</h3>';
    
    Object.keys(examples).forEach(key => {
        const ex = examples[key];
        html += `
            <div class="docs-item">
                <h5>${ex.title}</h5>
                <div class="docs-example">
                    <pre>${ex.code}</pre>
                </div>
                ${ex.output ? `<p><strong>Çıktı:</strong></p><div class="docs-example"><pre>${ex.output}</pre></div>` : ''}
            </div>
        `;
    });
    
    return html;
}

// Derleme
function renderCompilation() {
    const comp = acDocs.compilation;
    let html = '<h3>Derleme</h3>';
    
    html += '<h4>Hedef Diller</h4>';
    comp.targetLanguages.forEach(lang => {
        html += `
            <div class="docs-item">
                <h5>${lang.language}</h5>
                <p>${lang.description}</p>
                <p><strong>Örnek:</strong> ${lang.example}</p>
            </div>
        `;
    });
    
    html += '<h4>Derleme Süreci</h4><ol>';
    comp.process.forEach(step => {
        html += `<li>${step}</li>`;
    });
    html += '</ol>';
    
    return html;
}

// Dokümantasyon navigasyonu
function setupDocsNavigation() {
    const links = document.querySelectorAll('.docs-link');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Aktif linki güncelle
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // İlgili bölüme kaydır
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Sayfa yüklendiğinde başlat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadACDocumentation);
} else {
    loadACDocumentation();
}

