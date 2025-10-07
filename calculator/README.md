# Hesap Makinesi

Basit, modern ve duyarlı bir web hesap makinesi. Türkçe ondalık ayırıcı desteği (",")
klavye kısayolları ve yüzde işlemi içerir.

## Çalıştırma

1. Bu klasörü bir statik sunucuda açın veya doğrudan `index.html` dosyasını tarayıcıda açın.
2. İnternet erişimi yoksa Google Fonts bağlantısını kaldırabilirsiniz.

## Özellikler

- Temel işlemler: toplama, çıkarma, çarpma, bölme
- Yüzde hesabı (n → n/100)
- CE (C) ve AC temizleme
- Geri silme (Backspace)
- Klavye desteği: 0-9, + - * /, . veya , , Enter(=), Backspace, Esc
- Türkçe biçimlendirme: binlik ayırıcılar ve virgül ondalık

## Dosyalar

- `index.html`: Uygulama iskeleti ve tuş takımı
- `styles.css`: Stil dosyası
- `app.js`: İş mantığı ve klavye desteği

## Notlar

- Bölme için sıfıra bölme kontrolü yapılır.
- Maksimum giriş uzunluğu 18 karakter ile sınırlandırılmıştır.