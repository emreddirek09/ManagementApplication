Görev Yönetim Uygulaması

Bu proje, bir ekip içinde görevlerin etkin bir şekilde takip edilmesi ve yönetilmesini sağlayan basit bir Görev Yönetim Uygulamasıdır. Proje, Frontend (Kullanıcı Arayüzü) ve Backend (Sunucu Tarafı) olmak üzere iki ana bileşen halinde geliştirilmiştir.

Backend
Backend tarafında, CQRS (Command and Query Responsibility Segregation) mimarisi ile birlikte MediatR kütüphanesi kullanılmıştır. Ayrıca, proje Onion Architecture (Soğan Mimarisi) prensiplerine uygun bir şekilde tasarlanmıştır. Bu yaklaşım, kodun sürdürülebilirliğini artırırken modülerlik ve bağımsızlık sağlar.

Backend, .NET Core framework’ü ile geliştirilmiş olup, veritabanı işlemleri için Entity Framework Core kullanılarak Code-First Yaklaşımı uygulanmıştır. Görevler ve kullanıcı verileri MsSQL veritabanında saklanmaktadır. API, aşağıdaki uç noktaları sağlamaktadır: 

Kullanıcılar, yalnızca kendilerine ait görevleri görebilir, düzenleyebilir ve silebilir.
Yönetici (admin) rolüne sahip kullanıcılar ise tüm görevleri görme ve düzenleme yetkisine sahiptir.
Kimlik doğrulama süreci, kullanıcıların TCKimlik No doğrulamasını içerir.
Frontend
Kullanıcı arayüzü, React.js framework’ü kullanılarak geliştirilmiştir. Kullanıcılar, uygulama aracılığıyla görev oluşturma, düzenleme, silme ve görev durumunu değiştirme işlemlerini gerçekleştirebilir. Görev kartları aşağıdaki bilgileri içerecek şekilde tasarlanmıştır:

Görev Başlığı
Görev Açıklaması
Görev Durumu (Tamamlanmadı / Tamamlandı)
İlgili Kullanıcı
Frontend ile Backend arasındaki iletişim, RESTful API standartları doğrultusunda gerçekleştirilmiştir.

Projenin Yapılandırılması
Backend: ManagementApplication.Api klasörü altında yer almakta olup API uç noktalarını içermektedir.
Frontend: ManagementApplication.Ui klasörü altında bulunmakta olup React tabanlı kullanıcı arayüzü bileşenlerini barındırmaktadır.
Projenin Teknik Özeti
Bu proje, ekipler için görev yönetimini basitleştirmeyi ve daha organize bir yapı sunmayı hedefleyen bir uygulamadır. Uygulama, sürdürülebilir bir yazılım mimarisi ve modern teknolojiler ile geliştirilmiştir. Kullanıcı deneyimi odaklı bir arayüz ile birlikte güçlü bir backend altyapısı, uygulamanın temelini oluşturmaktadır.
