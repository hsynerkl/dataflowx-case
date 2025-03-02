Kullanıcı Bilgileri

Kullanıcı Adı: emilys
Şifre: emilyspass

### Proje Başlangıcı

✅ Proje, Vite ve Typescript kullanılarak başlatıldı.

### Form ve Veri Yönetimi

✅ Ekipler oluşturulabilecek bir form oluşturuldu.
✅ Ekiplerin altına kullanıcıların eklenebileceği başka bir form eklendi ve veriler **Zustand** kullanılarak saklandı.

- **Zustand** kullanma sebebim: Performans açısından Context API'dan daha iyi bir çözüm sunuyor. Aynı zamanda gereksiz re-render'ları önleyerek daha verimli çalışıyor. Context API'nin aksine, state'leri daha bağımsız bir şekilde yönetebilme avantajı sağlıyor.

### Diyagram Sayfası

✅ React Flow ile bir diyagram sayfası oluşturuldu. Bu sayfada ekipler ve altına bağlı kullanıcılar görselleştirildi.
✅ Ekip node'una sağ tıklayarak kullanıcıları gösterip gizleme özelliği eklendi.
✅ Kullanıcı node'una sağ tıklayarak ekipten silme işlemi gerçekleştirilebiliyor.

### Chart Sayfası

✅ **Pie Chart** ve **Bar Chart** içeren bir charts sayfası oluşturuldu.

### Login Sistemi

✅ Kullanıcı giriş yapabilmesi için bir **Login** sayfası oluşturuldu. 30 dakika dolunca oto logout yapıyor cookielerde tutuluyor.

### Veri İşlemleri

✅ **TanStack Query** kullanarak GET, POST, PUT, DELETE işlemlerini gerçekleştiren **custom hook'lar** oluşturuldu.

### Navigasyon ve Data Grid

✅ Bir **navigasyon barı** oluşturuldu.
✅ **Tek bir sayfa** oluşturularak, **data grid içeren iki farklı yerde** aynı sayfa gösterildi.
✅ Public bir API'dan veriler çekildi ve zustand içinde saklandı.
✅ **Tablodaki veriler** düzenlenebilir hale getirildi; **add, edit, delete** işlemleri eklendi.
✅ **MUI bileşenleri** ve **styled-components** ile stillendirme yapıldı.

### Ekstra Bilgiler

❌ **Projeye başlamadan önce Figma'da tasarım yapılmadı.**
✅ **.env dosyası oluşturuldu**, ancak API URL'leri içine kaydedilmedi. **Sebebi:** Projede **base URL** kullanmadığım için ihtiyaç duyulmadı.
❌ **Types klasörü kullanılmadı.** **Sebebi:** Projeyi hızlıca tamamlamam gerektiğinden dolayı zaman kazanmak adına bu adım atlandı.
