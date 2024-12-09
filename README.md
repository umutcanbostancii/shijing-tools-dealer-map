# Türkiye Bayi Haritası

Bu proje, Türkiye genelindeki bayileri interaktif bir harita üzerinde gösteren bir web uygulamasıdır.

## Özellikler

- İnteraktif Türkiye haritası
- Bayi konumlarını marker ile gösterme
- Şehir, ilçe ve bayi adına göre arama yapabilme
- Anlık filtreleme ve harita zoom
- Responsive tasarım
- Türkçe karakter desteği

## Teknolojiler

- React
- TypeScript
- Leaflet (Harita)
- Styled Components (Stil)

## Kurulum

Projeyi yerel ortamınızda çalıştırmak için:

```bash
# Repoyu klonlayın
git clone [REPO_URL]

# Proje dizinine gidin
cd bayi-harita

# Bağımlılıkları yükleyin
npm install

# Uygulamayı başlatın
npm start
```

Uygulama varsayılan olarak http://localhost:3000 adresinde çalışacaktır.

## Kullanım

- Arama kutusuna şehir, ilçe veya bayi adı yazarak arama yapabilirsiniz
- Harita üzerindeki markerları tıklayarak bayi detaylarını görebilirsiniz
- Haritayı yakınlaştırıp uzaklaştırabilir, sürükleyebilirsiniz

## Katkıda Bulunma

1. Bu repoyu fork edin
2. Yeni bir branch oluşturun (`git checkout -b feature/yeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -am 'Yeni özellik: Detaylar'`)
4. Branch'inizi push edin (`git push origin feature/yeniOzellik`)
5. Pull Request oluşturun 