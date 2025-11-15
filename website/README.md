# AC-T-IDE Web Sitesi

AC-T-IDE projesi için detaylı ve modern bir web sitesi. Bu site GitHub Pages veya başka bir statik hosting servisi üzerinden yayınlanabilir.

## 📋 İçerik

Bu web sitesi aşağıdaki bilgileri içerir:

- **Genel Proje Bilgileri**: Proje hakkında genel açıklamalar
- **Versiyonlar**: Tüm proje versiyonları ve detayları
  - Desktop IDE v3.0
  - Android IDE v1.0
  - KBIR Interpreter v1.1.0
  - AC T V3.2
  - AC-IDE-MODER
- **Proje Yapısı**: Kod organizasyonu ve klasör yapısı
- **Özellikler**: IDE'nin tüm özellikleri ve fonksiyonları
- **Kod Yapısı**: Ana sınıflar, fonksiyonlar ve kod organizasyonu
- **Kurulum Talimatları**: Her platform için detaylı kurulum kılavuzu
- **Teknoloji Yığını**: Kullanılan teknolojiler

## 🚀 Yayınlama

### GitHub Pages ile Yayınlama

1. **GitHub Repository Oluşturun**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AC-T-IDE website"
   git branch -M main
   git remote add origin https://github.com/kullaniciadi/act-ide-website.git
   git push -u origin main
   ```

2. **GitHub Pages'i Aktifleştirin**
   - GitHub repository'nize gidin
   - Settings > Pages bölümüne gidin
   - Source olarak "main" branch'ini seçin
   - Root klasörünü seçin
   - Save butonuna tıklayın

3. **Site Yayında**
   - Birkaç dakika sonra siteniz şu adreste yayınlanacak:
   - `https://kullaniciadi.github.io/act-ide-website/`

### Netlify ile Yayınlama

1. **Netlify'e Giriş Yapın**
   - [Netlify](https://www.netlify.com) sitesine gidin
   - GitHub hesabınızla giriş yapın

2. **Projeyi Yükleyin**
   - "Add new site" > "Import an existing project"
   - GitHub repository'nizi seçin
   - Build settings:
     - Build command: (boş bırakın)
     - Publish directory: `website`

3. **Deploy**
   - Deploy site butonuna tıklayın
   - Site otomatik olarak yayınlanacak

### Vercel ile Yayınlama

1. **Vercel'e Giriş Yapın**
   - [Vercel](https://vercel.com) sitesine gidin
   - GitHub hesabınızla giriş yapın

2. **Projeyi İçe Aktarın**
   - "New Project" butonuna tıklayın
   - GitHub repository'nizi seçin
   - Root Directory: `website` olarak ayarlayın

3. **Deploy**
   - Deploy butonuna tıklayın
   - Site birkaç saniye içinde yayınlanacak

### Manuel Yayınlama

1. **Dosyaları Hazırlayın**
   - `website` klasöründeki tüm dosyaları bir web sunucusuna yükleyin

2. **Sunucu Gereksinimleri**
   - Statik HTML/CSS/JS dosyalarını destekleyen herhangi bir web sunucusu
   - Örnek: Apache, Nginx, IIS

## 📁 Dosya Yapısı

```
website/
├── index.html      # Ana HTML dosyası
├── styles.css      # CSS stilleri
├── script.js       # JavaScript dosyası
└── README.md       # Bu dosya
```

## 🎨 Özellikler

- ✅ Tamamen responsive tasarım (mobil, tablet, desktop)
- ✅ Modern ve şık arayüz
- ✅ Smooth scroll animasyonları
- ✅ Interaktif navigasyon menüsü
- ✅ Tab sistemi (kurulum bölümü için)
- ✅ Kod kopyalama özelliği
- ✅ Scroll progress bar
- ✅ Fade-in animasyonları
- ✅ SEO dostu yapı

## 🔧 Özelleştirme

### Renkleri Değiştirme

`styles.css` dosyasındaki CSS değişkenlerini düzenleyin:

```css
:root {
    --primary-color: #3f5e5f;
    --secondary-color: #5ce1e6;
    --accent-color: #2d8a8f;
    /* ... */
}
```

### İçerik Güncelleme

`index.html` dosyasını düzenleyerek içeriği güncelleyebilirsiniz. Tüm bölümler açıkça işaretlenmiştir.

## 📱 Tarayıcı Desteği

- Chrome (son 2 versiyon)
- Firefox (son 2 versiyon)
- Safari (son 2 versiyon)
- Edge (son 2 versiyon)

## 📝 Lisans

Bu web sitesi AC-T-IDE projesinin bir parçasıdır.

## 👨‍💻 Geliştirici

**Mehemmed AC**

## 🔗 Bağlantılar

- Proje Repository: [GitHub](https://github.com/kullaniciadi/act-ide)
- Web Sitesi: [Live Site](https://kullaniciadi.github.io/act-ide-website)

## 📞 Destek

Herhangi bir sorunuz veya öneriniz için GitHub Issues kullanabilirsiniz.

---

**Not**: Bu web sitesi statik bir site olduğu için herhangi bir backend gerektirmez. Tüm dosyalar doğrudan tarayıcıda çalışır.

