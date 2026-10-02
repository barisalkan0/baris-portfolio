# Barış Alkan portfolio

Personal portfolio (React 19 · Vite · Tailwind CSS 4 · framer-motion). One page, English, mobile-first.

**Canlı site:** https://barisalkan0.github.io (`main`'e her push'ta otomatik yayınlanır, 1-2 dakika sürer).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run lint
npm run og       # link önizleme görselini (public/og.png) yeniden üretir
```

## Başka bilgisayarda çalışmak (Derin için)

1. [Node.js](https://nodejs.org) (20 veya üstü) ve [Git](https://git-scm.com) kurulu olsun.
2. Repoyu indir ve kur:
   ```bash
   git clone https://github.com/barisalkan0/baris-portfolio.git
   cd baris-portfolio
   npm install
   npm run dev
   ```
3. Claude Code'u bu klasörde aç. Proje kurallarını `CLAUDE.md` dosyasından otomatik okur.
4. Her çalışmaya başlamadan önce `git pull`, bitince:
   ```bash
   git add -A
   git commit -m "Kısa açıklama"
   git push
   ```
   Push için repoya collaborator olarak eklenmiş olman gerekir (GitHub'dan gelen daveti kabul et).

## İçeriği güncellemek (CV değişince)

**Tüm metinler tek dosyada:** `src/data/profile.js`

- Bir kelimeyi **kalın** yapmak için `**böyle**` yaz.
- Logolar: `microsoft`, `basarsoft`, `teknofest`, `metu`, `esc`, `googleplay` (`src/components/BrandLogo.jsx`). Yeni şirket logosu için dosyayı `src/assets/logos/` altına koyup oraya bir satır ekle.
- Sayfadaki sıra: Hero → Selected work → Experience → About → Education & Skills → Contact.

| Ne | Nerede |
|---|---|
| İsim, durum etiketi, başlık cümlesi, e-posta, LinkedIn, GitHub | `person` |
| İlk ekrandaki 3 kanıt kutusu (logolu) | `proofs` |
| About metni, "What I work on" kartları, hobiler | `aboutTitle`, `about`, `focusAreas`, `hobbies` |
| Deneyimler (en yeni en üstte) | `experience` |
| Öne çıkan projeler / diğer projeler | `featuredProjects`, `moreProjects` |
| Eğitim, sertifika/ödüller, beceriler, diller | `education`, `credentials`, `techStack`, `skillGroups`, `spokenLanguages` |
| İmleç izi ve kod yağmuru efektlerini aç/kapat | `effects` |

## CV

Güncel CV'yi **`public/Baris_Alkan_CV.pdf`** adıyla koy (tam bu isim). Nav'daki "Resume", hero'daki "View Resume" ve iletişimdeki "Resume" butonları bu dosyayı yeni sekmede açar.

## Görseller: dosyayı bırak, otomatik görünür

`src/assets/` altına doğru isimle bir görsel koyduğunda kod değişikliği gerekmez (`.jpg`, `.png`, `.webp` olabilir).

150 KB'tan büyük PNG/JPG dosyaları `npm run dev` / `npm run build` öncesinde otomatik olarak küçük bir `.webp` kopyasına dönüştürülür (`scripts/optimize-images.mjs`) ve site o kopyayı kullanır. Fotoğrafı değiştirirsen webp de kendiliğinden yenilenir.

| Dosya | Nerede görünür | Nasıl olmalı |
|---|---|---|
| `src/assets/profile.png` ✅ | Yedek portre (cut-out yoksa kullanılır) | Dikey 4:5, en az 1000×1250. Omuzdan yukarı, düz/koyu arka plan, iyi ışık, sade gömlek/ceket. |
| `src/assets/profile-cutout.png` ✅ | Masaüstündeki hologram kart + mobildeki küçük fotoğraf | Aynı fotoğrafın **arka planı silinmiş** PNG hali (remove.bg). Baş kartın üst yarısında, omuzlar alt kenara değecek şekilde. |
| `src/assets/projects/teknofest-uav.jpg` | TEKNOFEST kartının kapağı (stok fotoğrafın yerine geçer, tespit kutusu da kalkar) | Yatay 16:10, en az 1600×1000. İHA ile takım fotoğrafı veya İHA'nın kendisi. |
| `src/assets/projects/quadra/*.webp` ✅ | Quadra kartındaki 3 telefon | Google Play mağaza ekran görüntüleri (değiştirmek için aynı isimle üzerine yaz). |
| `src/assets/projects/rag-assistant.png` | Local RAG Assistant kartı (terminal çizimi yerine geçer) | Web arayüzünün ekran görüntüsü, 16:9. |
| `src/assets/projects/cifar10.png` | CIFAR-10 kartı (metrik çizimi yerine geçer) | Eğitim grafiği / confusion matrix, 16:9. |

## Yayına alma

Otomatik: `main` branch'ine her push'ta GitHub Actions (`.github/workflows/deploy.yml`) siteyi derler ve `barisalkan0/barisalkan0.github.io` reposuna yayınlar. Elle tetiklemek için GitHub'da *Actions → Deploy to barisalkan0.github.io → Run workflow*.

- `public/app-ads.txt` dosyasını **silme**: Quadra Rotate'in Google Play'deki geliştirici sitesi bu adres ve AdMob bu dosyayı kökten okuyor.
- Site adresi `.env` içindeki `VITE_SITE_URL` (QR kodu, paylaş butonu, link önizlemesi bunu kullanır).

## Credits

- Animated components adapted from [React Bits](https://reactbits.dev) (MIT): Profile Card, Blur Text, Logo Loop.
- Company logos (Microsoft, Başarsoft official brand pack, TEKNOFEST, METU, European Solidarity Corps) are used only to identify where Barış worked or studied.
- Quadra Rotate screenshots are from its own Google Play listing.
- TEKNOFEST card placeholder photo by [@emperorparrott](https://unsplash.com/@emperorparrott) on [Unsplash](https://unsplash.com/photos/gE6YqIS5ii0) (Unsplash License).
- Icons: [react-icons](https://react-icons.github.io/react-icons/) (Lucide, Simple Icons, Font Awesome, Tabler).
