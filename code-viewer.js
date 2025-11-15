// Code Viewer JavaScript
let currentFile = null;
let currentCode = '';

// Dosya ağacını oluştur
function buildFileTree(structure, container, parentPath = '') {
    for (const [name, item] of Object.entries(structure)) {
        if (item.type === 'folder') {
            const folderElement = createFolderElement(name, item, parentPath);
            container.appendChild(folderElement);
            
            if (item.children) {
                const childrenContainer = document.createElement('div');
                childrenContainer.className = 'file-children';
                folderElement.appendChild(childrenContainer);
                buildFileTree(item.children, childrenContainer, parentPath + '/' + name);
            }
        } else if (item.type === 'file') {
            const fileElement = createFileElement(name, item, parentPath);
            container.appendChild(fileElement);
        }
    }
}

// Klasör elementi oluştur
function createFolderElement(name, item, parentPath) {
    const folder = document.createElement('div');
    folder.className = 'file-item folder';
    folder.dataset.path = parentPath + '/' + name;
    folder.dataset.type = 'folder';
    
    const folderName = document.createElement('span');
    folderName.textContent = name;
    folder.appendChild(folderName);
    
    folder.addEventListener('click', (e) => {
        e.stopPropagation();
        folder.classList.toggle('expanded');
        const children = folder.querySelector('.file-children');
        if (children) {
            children.classList.toggle('expanded');
        }
    });
    
    return folder;
}

// Dosya elementi oluştur
function createFileElement(name, item, parentPath) {
    const file = document.createElement('div');
    file.className = 'file-item file';
    file.dataset.path = item.path || (parentPath + '/' + name);
    file.dataset.language = item.language || 'text';
    file.dataset.code = item.code || '';
    file.dataset.description = item.description || '';
    
    const fileName = document.createElement('span');
    fileName.textContent = name;
    file.appendChild(fileName);
    
    file.addEventListener('click', () => {
        selectFile(file, item);
    });
    
    return file;
}

// Dosya seç
function selectFile(fileElement, fileData) {
    // Önceki seçimi kaldır
    document.querySelectorAll('.file-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Yeni seçimi işaretle
    fileElement.classList.add('active');
    
    currentFile = {
        name: fileElement.textContent.trim(),
        path: fileElement.dataset.path,
        language: fileElement.dataset.language,
        code: fileElement.dataset.code || fileData.code || '',
        description: fileElement.dataset.description || fileData.description || ''
    };
    
    // Dosya bilgisini güncelle
    updateFileInfo();
    
    // Kodu görüntüle
    displayCode();
}

// Dosya bilgisini güncelle
function updateFileInfo() {
    const fileInfo = document.getElementById('fileInfo');
    if (currentFile) {
        fileInfo.innerHTML = `
            <i class="fas fa-file-code"></i>
            <span>${currentFile.path}</span>
        `;
    } else {
        fileInfo.innerHTML = `
            <i class="fas fa-file-code"></i>
            <span>Bir dosya seçin</span>
        `;
    }
}

// Kodu görüntüle
function displayCode() {
    const codeViewer = document.getElementById('codeViewer');
    
    if (!currentFile || !currentFile.code) {
        codeViewer.innerHTML = `
            <div class="code-placeholder">
                <i class="fas fa-code"></i>
                <p>Bu dosya için kod içeriği bulunamadı</p>
            </div>
        `;
        return;
    }
    
    currentCode = currentFile.code;
    
    // Kod içeriğini oluştur
    const codeContent = document.createElement('div');
    codeContent.className = 'code-content';
    
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    
    // Dil sınıfını belirle
    const languageClass = getLanguageClass(currentFile.language);
    code.className = `language-${languageClass}`;
    code.textContent = currentCode;
    
    pre.appendChild(code);
    codeContent.appendChild(pre);
    
    codeViewer.innerHTML = '';
    codeViewer.appendChild(codeContent);
    
    // Prism.js ile syntax highlighting
    if (window.Prism) {
        Prism.highlightElement(code);
    }
}

// Dil sınıfını belirle
function getLanguageClass(language) {
    const languageMap = {
        'java': 'java',
        'python': 'python',
        'javascript': 'javascript',
        'typescript': 'typescript',
        'html': 'markup',
        'css': 'css',
        'xml': 'markup',
        'json': 'json',
        'bash': 'bash',
        'shell': 'bash',
        'text': 'text'
    };
    
    return languageMap[language.toLowerCase()] || 'text';
}

// Tümünü aç
document.getElementById('expandAll')?.addEventListener('click', () => {
    document.querySelectorAll('.file-children').forEach(children => {
        children.classList.add('expanded');
    });
    document.querySelectorAll('.file-item.folder').forEach(folder => {
        folder.classList.add('expanded');
    });
});

// Tümünü kapat
document.getElementById('collapseAll')?.addEventListener('click', () => {
    document.querySelectorAll('.file-children').forEach(children => {
        children.classList.remove('expanded');
    });
    document.querySelectorAll('.file-item.folder').forEach(folder => {
        folder.classList.remove('expanded');
    });
});

// Kodu kopyala
document.getElementById('btnCopy')?.addEventListener('click', () => {
    if (currentCode) {
        navigator.clipboard.writeText(currentCode).then(() => {
            const btn = document.getElementById('btnCopy');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = '#4caf50';
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
            }, 2000);
        }).catch(err => {
            console.error('Kopyalama hatası:', err);
            alert('Kod kopyalanamadı');
        });
    }
});

// Kodu indir
document.getElementById('btnDownload')?.addEventListener('click', () => {
    if (currentFile && currentCode) {
        const blob = new Blob([currentCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = currentFile.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
});

// Tam ekran
document.getElementById('btnFullscreen')?.addEventListener('click', () => {
    const container = document.querySelector('.codebrowser-container');
    const sidebar = document.querySelector('.codebrowser-sidebar');
    const btn = document.getElementById('btnFullscreen');
    
    if (container.classList.contains('fullscreen')) {
        container.classList.remove('fullscreen');
        sidebar.classList.remove('fullscreen');
        btn.innerHTML = '<i class="fas fa-expand"></i>';
        btn.title = 'Tam Ekran';
    } else {
        container.classList.add('fullscreen');
        sidebar.classList.add('fullscreen');
        btn.innerHTML = '<i class="fas fa-compress"></i>';
        btn.title = 'Tam Ekrandan Çık';
    }
});

// Proje yapısını yükle ve görüntüle
function initializeCodeViewer() {
    const fileTree = document.getElementById('fileTree');
    if (fileTree && typeof projectStructure !== 'undefined') {
        // Her projeyi ayrı bir bölüm olarak göster
        for (const [projectName, project] of Object.entries(projectStructure)) {
            const projectHeader = document.createElement('div');
            projectHeader.className = 'project-header';
            projectHeader.style.cssText = 'padding: 1rem; background: rgba(92, 225, 230, 0.1); margin-bottom: 0.5rem; border-radius: 5px;';
            projectHeader.innerHTML = `
                <strong style="color: #5ce1e6;">${project.name}</strong>
                <span style="color: #999; font-size: 0.85rem; margin-left: 0.5rem;">v${project.version}</span>
            `;
            fileTree.appendChild(projectHeader);
            
            const projectContainer = document.createElement('div');
            projectContainer.className = 'project-container';
            buildFileTree(project.structure, projectContainer);
            fileTree.appendChild(projectContainer);
        }
    }
}

// Sayfa yüklendiğinde başlat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCodeViewer);
} else {
    initializeCodeViewer();
}

