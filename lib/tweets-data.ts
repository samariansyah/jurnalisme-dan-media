export type Sentimen = "Positif" | "Netral" | "Negatif";

export interface Tweet {
  id: number;
  tanggal: string;
  username: string;
  teks: string;
  likes: number;
  retweet: number;
  sentimen: Sentimen;
  skor: number;
}

export const tweets: Tweet[] = [
  { id:1, tanggal:"2026-04-01", username:"@ustadz_digital", teks:"Membaca konten islami setiap pagi bikin hati lebih tenang dan pikiran jernih. Alhamdulillah berkah sekali", likes:245, retweet:89, sentimen:"Positif", skor:0.97 },
  { id:2, tanggal:"2026-04-01", username:"@pemuda_hijrah", teks:"Ada yang bisa rekomendasiin aplikasi baca konten islami yang bagus? Mau mulai rutin baca setiap hari", likes:45, retweet:12, sentimen:"Netral", skor:0.81 },
  { id:3, tanggal:"2026-04-02", username:"@kritis_medsos", teks:"Konten islami di Twitter makin kesini makin clickbait dan provokatif. Mana konten yang benar-benar mendidik?", likes:123, retweet:67, sentimen:"Negatif", skor:0.89 },
  { id:4, tanggal:"2026-04-02", username:"@ibu_sholehah", teks:"Alhamdulillah anak-anak sekarang semangat baca Al-Quran digital dan konten islami online. Generasi yang lebih baik", likes:312, retweet:134, sentimen:"Positif", skor:0.96 },
  { id:5, tanggal:"2026-04-03", username:"@mahasiswabaru", teks:"Sebenernya susah banget cari konten islami yang mudah dipahami buat pemula. Kebanyakan terlalu berat bahasanya", likes:78, retweet:23, sentimen:"Negatif", skor:0.84 },
  { id:6, tanggal:"2026-04-03", username:"@hijrah_journey", teks:"Konten islami yang berkualitas itu beneran langka sekarang. Banyak yang cuma mau viral tapi kurang substansi", likes:98, retweet:45, sentimen:"Negatif", skor:0.87 },
  { id:7, tanggal:"2026-04-04", username:"@belajarislamid", teks:"Baru nemu channel YouTube tentang tafsir Al-Quran yang keren banget. Penjelasannya mudah dipahami dan inspiratif", likes:189, retweet:76, sentimen:"Positif", skor:0.94 },
  { id:8, tanggal:"2026-04-04", username:"@netizen_indo", teks:"Jujur aku lebih suka baca novel daripada konten islami. Konten islaminya kurang menarik dan terlalu kaku", likes:56, retweet:18, sentimen:"Negatif", skor:0.83 },
  { id:9, tanggal:"2026-04-05", username:"@daailislamiyah", teks:"Subhanallah artikel tentang sejarah Islam yang baru dibaca tadi bikin hati terharu. Ilmu yang sangat bermanfaat", likes:267, retweet:98, sentimen:"Positif", skor:0.96 },
  { id:10, tanggal:"2026-04-05", username:"@generasiemas", teks:"Minat baca konten islami di kalangan anak muda Indonesia perlu ditingkatkan. Mari kita buat konten yang lebih relevan", likes:145, retweet:87, sentimen:"Netral", skor:0.76 },
  { id:11, tanggal:"2026-04-06", username:"@pecinta_sunnah", teks:"Aplikasi Muslim Pro sangat membantu rutin baca doa dan konten islami harian. Recommended banget untuk semua", likes:234, retweet:102, sentimen:"Positif", skor:0.95 },
  { id:12, tanggal:"2026-04-06", username:"@random_user123", teks:"Entah kenapa konten islami itu membosankan buat saya. Mungkin cara penyampaiannya kurang modern dan engaging", likes:67, retweet:19, sentimen:"Negatif", skor:0.86 },
  { id:13, tanggal:"2026-04-07", username:"@annisa_hijab", teks:"Masyaallah baru selesai khatam buku fiqih online. Teknologi digital memudahkan kita belajar Islam kapanpun", likes:178, retweet:65, sentimen:"Positif", skor:0.93 },
  { id:14, tanggal:"2026-04-07", username:"@tech_muslim", teks:"Platform baca konten islami digital makin berkembang. Keren banget bisa akses kajian ulama dunia dari Indonesia", likes:289, retweet:121, sentimen:"Positif", skor:0.92 },
  { id:15, tanggal:"2026-04-08", username:"@skeptis_online", teks:"Konten islami di medsos seringkali tidak terverifikasi kebenarannya. Harus hati-hati pilih sumber yang terpercaya", likes:156, retweet:89, sentimen:"Negatif", skor:0.82 },
  { id:16, tanggal:"2026-04-08", username:"@pelajar_muda", teks:"Tugas kuliah tentang literasi konten islami digital. Ternyata banyak banget platform yang menyediakan kajian berkualitas", likes:89, retweet:34, sentimen:"Netral", skor:0.78 },
  { id:17, tanggal:"2026-04-09", username:"@ustadzah_online", teks:"Alhamdulillah konten islami yang kita buat sudah dibaca ribuan orang. Semoga bermanfaat untuk umat", likes:345, retweet:167, sentimen:"Positif", skor:0.97 },
  { id:18, tanggal:"2026-04-09", username:"@bored_netizen", teks:"Udah scroll media sosial sejam tapi konten islami yang muncul itu-itu aja. Kurang variatif dan tidak inovatif", likes:43, retweet:11, sentimen:"Negatif", skor:0.88 },
  { id:19, tanggal:"2026-04-10", username:"@muallaf_baru", teks:"Sebagai muallaf sangat terbantu dengan konten islami online yang ramah pemula. Jazakallah khairan kepada para pembuat konten", likes:198, retweet:87, sentimen:"Positif", skor:0.95 },
  { id:20, tanggal:"2026-04-10", username:"@ibu_rumahan", teks:"Sering share artikel islami ke grup keluarga. Lumayan buat dakwah digital sehari-hari yang bermanfaat", likes:123, retweet:56, sentimen:"Positif", skor:0.91 },
  { id:21, tanggal:"2026-04-11", username:"@ayah_teladan", teks:"Mengajarkan anak membaca konten islami sejak dini sangat penting untuk membentuk karakter islami yang kuat", likes:234, retweet:112, sentimen:"Positif", skor:0.93 },
  { id:22, tanggal:"2026-04-11", username:"@pemuda_kritis", teks:"Banyak konten islami yang malah memecah belah umat. Harusnya konten islami mempersatukan bukan memfitnah", likes:178, retweet:93, sentimen:"Negatif", skor:0.85 },
  { id:23, tanggal:"2026-04-12", username:"@santri_digital", teks:"Pondok pesantren kami sekarang sudah pakai platform digital untuk baca kitab kuning. Luar biasa perkembangan teknologi", likes:267, retweet:134, sentimen:"Positif", skor:0.94 },
  { id:24, tanggal:"2026-04-12", username:"@warga_biasa", teks:"Jujur lebih suka baca berita hiburan daripada konten islami. Tidak bermaksud tidak religius ya hehe", likes:34, retweet:8, sentimen:"Negatif", skor:0.79 },
  { id:25, tanggal:"2026-04-13", username:"@hijrah_squad", teks:"Setelah hijrah jadi lebih semangat baca konten islami dan kajian online. Hidup jadi lebih bermakna alhamdulillah", likes:289, retweet:145, sentimen:"Positif", skor:0.96 },
  { id:26, tanggal:"2026-04-13", username:"@content_creator", teks:"Sedang riset konten islami untuk channel baru. Ternyata demand-nya tinggi tapi supply konten berkualitas masih kurang", likes:156, retweet:72, sentimen:"Netral", skor:0.77 },
  { id:27, tanggal:"2026-04-14", username:"@muslimah_produktif", teks:"Baca buku islami digital sambil nyusui bayi. Alhamdulillah teknologi memudahkan ibu muda belajar agama", likes:223, retweet:98, sentimen:"Positif", skor:0.94 },
  { id:28, tanggal:"2026-04-14", username:"@galau_banget", teks:"Konten islami sering bikin saya merasa guilty trip terus. Kurang konten yang memotivasi dan membangkitkan semangat", likes:87, retweet:29, sentimen:"Negatif", skor:0.83 },
  { id:29, tanggal:"2026-04-15", username:"@akademisi_islam", teks:"Penelitian menunjukkan minat baca konten islami digital terus meningkat di Indonesia. Tren yang sangat positif", likes:312, retweet:167, sentimen:"Positif", skor:0.91 },
  { id:30, tanggal:"2026-04-15", username:"@guru_ngaji", teks:"Alhamdulillah metode ngaji online via aplikasi sangat membantu anak-anak yang tidak bisa datang ke TPQ langsung", likes:198, retweet:89, sentimen:"Positif", skor:0.95 },
  { id:31, tanggal:"2026-04-16", username:"@digital_nomad", teks:"Sering baca konten islami sambil kerja di kafe. Teknologi memang memudahkan akses ilmu agama di mana saja", likes:145, retweet:67, sentimen:"Positif", skor:0.90 },
  { id:32, tanggal:"2026-04-16", username:"@remaja_zaman", teks:"Konten islami yang ada sekarang kurang relate sama kehidupan anak muda. Perlu ada konten yang lebih kekinian", likes:112, retweet:45, sentimen:"Negatif", skor:0.86 },
  { id:33, tanggal:"2026-04-17", username:"@convert_muslim", teks:"Setelah masuk Islam langsung cari banyak konten islami online. Sangat terbantu dengan banyaknya sumber belajar", likes:267, retweet:123, sentimen:"Positif", skor:0.94 },
  { id:34, tanggal:"2026-04-17", username:"@mahasiswa_s2", teks:"Sedang nulis tesis tentang konsumsi konten islami digital di kalangan milenial Indonesia. Temuannya sangat menarik", likes:89, retweet:45, sentimen:"Netral", skor:0.79 },
  { id:35, tanggal:"2026-04-18", username:"@emak_emak", teks:"Grup whatsapp ibu-ibu rajin share konten islami setiap pagi. Alhamdulillah saling mengingatkan dan menyemangati", likes:178, retweet:78, sentimen:"Positif", skor:0.93 },
  { id:36, tanggal:"2026-04-18", username:"@lelaki_sibuk", teks:"Tidak ada waktu buat baca konten islami yang panjang. Perlu konten yang singkat padat dan langsung intinya", likes:67, retweet:23, sentimen:"Negatif", skor:0.81 },
  { id:37, tanggal:"2026-04-19", username:"@youtuber_dakwah", teks:"Alhamdulillah subscribers channel dakwah kami sudah 500K. Terima kasih atas dukungan semua yang selalu setia", likes:456, retweet:234, sentimen:"Positif", skor:0.98 },
  { id:38, tanggal:"2026-04-19", username:"@orang_tua", teks:"Khawatir anak-anak lebih suka nonton konten hiburan daripada baca konten islami. Gimana cara menarik minat mereka", likes:123, retweet:56, sentimen:"Negatif", skor:0.80 },
  { id:39, tanggal:"2026-04-20", username:"@anak_rantau", teks:"Di perantauan jadi lebih rajin baca konten islami online. Obat rindu kampung dan pengingat nilai-nilai agama", likes:212, retweet:98, sentimen:"Positif", skor:0.92 },
  { id:40, tanggal:"2026-04-20", username:"@netizen_nyinyir", teks:"Konten islami yang viral itu biasanya yang kontroversial bukan yang mendidik. Sedih melihat kondisi ini", likes:145, retweet:78, sentimen:"Negatif", skor:0.87 },
  { id:41, tanggal:"2026-04-21", username:"@dosen_komunikasi", teks:"Mengajar mata kuliah komunikasi Islam. Sangat bangga melihat mahasiswa antusias riset konten islami digital", likes:234, retweet:112, sentimen:"Positif", skor:0.93 },
  { id:42, tanggal:"2026-04-21", username:"@single_parent", teks:"Konten islami parenting online sangat membantu saya mendidik anak seorang diri. Jazakallah para penulis", likes:189, retweet:87, sentimen:"Positif", skor:0.95 },
  { id:43, tanggal:"2026-04-22", username:"@pengusaha_muda", teks:"Strategi bisnis islami yang baca online benar-benar mengubah cara saya berbisnis. Barakah dan menguntungkan", likes:267, retweet:134, sentimen:"Positif", skor:0.92 },
  { id:44, tanggal:"2026-04-22", username:"@capek_hidup", teks:"Kadang baca konten islami malah bikin stress karena terlalu banyak larangan dan tuntutan. Perlu konten yang lebih positif", likes:78, retweet:34, sentimen:"Negatif", skor:0.84 },
  { id:45, tanggal:"2026-04-23", username:"@hafizh_muda", teks:"Menghafalkan Al-Quran lebih mudah dengan aplikasi digital yang ada sekarang. Alhamdulillah sangat membantu sekali", likes:312, retweet:156, sentimen:"Positif", skor:0.96 },
  { id:46, tanggal:"2026-04-23", username:"@jurnalis_muda", teks:"Meliput perkembangan konten islami digital di Indonesia. Ekosistemnya berkembang sangat pesat dan menjanjikan", likes:145, retweet:67, sentimen:"Positif", skor:0.89 },
  { id:47, tanggal:"2026-04-24", username:"@ibu_milenial", teks:"Senang baca artikel parenting islami online karena praktis dan bisa dibaca sambil menunggu anak sekolah", likes:198, retweet:89, sentimen:"Positif", skor:0.93 },
  { id:48, tanggal:"2026-04-24", username:"@bingung_hidup", teks:"Sering dapat kiriman konten islami di medsos tapi tidak pernah dibaca sampai habis. Kontennya terlalu panjang", likes:56, retweet:17, sentimen:"Negatif", skor:0.82 },
  { id:49, tanggal:"2026-04-25", username:"@pns_soleh", teks:"Setiap pagi sebelum kerja sempatkan baca artikel islami. Membuat hati lebih tenang dan siap menghadapi hari", likes:223, retweet:98, sentimen:"Positif", skor:0.94 },
  { id:50, tanggal:"2026-04-25", username:"@komika_muslim", teks:"Bikin konten dakwah dengan pendekatan humor ternyata lebih banyak yang baca dan share. Dakwah bisa asik", likes:345, retweet:178, sentimen:"Positif", skor:0.91 },
  { id:51, tanggal:"2026-04-26", username:"@pesimis_aja", teks:"Konten islami di Indonesia masih didominasi konten arabisasi yang kurang kontekstual dengan budaya lokal kita", likes:112, retweet:56, sentimen:"Negatif", skor:0.85 },
  { id:52, tanggal:"2026-04-26", username:"@muda_semangat", teks:"Ikut komunitas baca buku islami online setiap minggu. Seru bisa diskusi dengan sesama muslimah yang inspiratif", likes:189, retweet:87, sentimen:"Positif", skor:0.93 },
  { id:53, tanggal:"2026-04-27", username:"@ustadz_gaul", teks:"Konten islami harus dikemas lebih modern dan kekinian agar bisa menjangkau generasi Z yang butuh konten relevan", likes:256, retweet:123, sentimen:"Netral", skor:0.77 },
  { id:54, tanggal:"2026-04-27", username:"@mahasiswi_aktif", teks:"Perpustakaan digital islami memudahkan saya riset skripsi tentang perkembangan Islam di Indonesia modern", likes:134, retweet:67, sentimen:"Positif", skor:0.90 },
  { id:55, tanggal:"2026-04-28", username:"@bapak_bijak", teks:"Mengajak anak-anak ikut webinar kajian islami online setiap weekend. Investasi terbaik untuk generasi penerus", likes:245, retweet:112, sentimen:"Positif", skor:0.93 },
  { id:56, tanggal:"2026-04-28", username:"@pemalas_tobat", teks:"Semangat baca konten islami tapi sering keburu ketiduran. Kayaknya harus lebih disiplin mengatur waktu", likes:67, retweet:23, sentimen:"Negatif", skor:0.80 },
  { id:57, tanggal:"2026-04-29", username:"@muslimah_karir", teks:"Konten islami tentang muslimah karir sangat sedikit. Kebanyakan masih membahas peran domestik saja", likes:134, retweet:72, sentimen:"Negatif", skor:0.83 },
  { id:58, tanggal:"2026-04-29", username:"@anak_pesantren", teks:"Bangga pesantren kami sudah go digital. Santri bisa akses konten islami berkualitas dari seluruh dunia", likes:289, retweet:145, sentimen:"Positif", skor:0.95 },
  { id:59, tanggal:"2026-04-30", username:"@pasangan_baru", teks:"Baca buku fiqih nikah online bareng pasangan sebelum nikah. Sangat bermanfaat untuk persiapan pernikahan islami", likes:312, retweet:167, sentimen:"Positif", skor:0.94 },
  { id:60, tanggal:"2026-04-30", username:"@hopeless_guy", teks:"Banyak konten islami yang judulnya menarik tapi isinya mengecewakan dan tidak bersubstansi sama sekali", likes:78, retweet:34, sentimen:"Negatif", skor:0.88 },
  { id:61, tanggal:"2026-05-01", username:"@aktivis_dakwah", teks:"Alhamdulillah gerakan literasi islami digital semakin masif. Mari kita dukung para penulis konten islami berkualitas", likes:289, retweet:145, sentimen:"Positif", skor:0.96 },
  { id:62, tanggal:"2026-05-01", username:"@ibu_berpendidikan", teks:"Membaca konten islami setiap hari sebagai bagian dari self-development. Sangat meningkatkan wawasan keislaman", likes:198, retweet:89, sentimen:"Positif", skor:0.94 },
  { id:63, tanggal:"2026-05-02", username:"@pengamat_media", teks:"Konten islami di platform digital Indonesia tumbuh 40 persen tahun ini. Potensi yang luar biasa untuk dikembangkan", likes:234, retweet:112, sentimen:"Positif", skor:0.90 },
  { id:64, tanggal:"2026-05-02", username:"@frustrasi_nih", teks:"Konten islami terlalu sering membahas hal yang sama berulang-ulang. Tidak ada inovasi dan kreativitas sama sekali", likes:89, retweet:34, sentimen:"Negatif", skor:0.87 },
  { id:65, tanggal:"2026-05-03", username:"@remaja_hijrah", teks:"Sejak hijrah rutin baca konten islami setiap hari. Alhamdulillah hidup jadi lebih terarah dan bermakna", likes:267, retweet:134, sentimen:"Positif", skor:0.96 },
  { id:66, tanggal:"2026-05-03", username:"@kreator_konten", teks:"Butuh riset mendalam sebelum buat konten islami. Tanggung jawab besar karena menyangkut ilmu agama yang sakral", likes:156, retweet:78, sentimen:"Netral", skor:0.76 },
  { id:67, tanggal:"2026-05-04", username:"@dokter_muslim", teks:"Konten islami tentang kesehatan dan kedokteran Islam sangat dibutuhkan masyarakat. Saya akan mulai membuat", likes:223, retweet:102, sentimen:"Netral", skor:0.78 },
  { id:68, tanggal:"2026-05-04", username:"@males_ngaji", teks:"Niatnya mau baca konten islami tapi selalu kalah sama scrolling sosmed yang tidak bermanfaat", likes:56, retweet:19, sentimen:"Negatif", skor:0.85 },
  { id:69, tanggal:"2026-05-05", username:"@kepsek_islami", teks:"Sekolah kami wajibkan siswa baca satu artikel islami per hari. Hasilnya karakter siswa jauh lebih baik", likes:312, retweet:156, sentimen:"Positif", skor:0.94 },
  { id:70, tanggal:"2026-05-05", username:"@bujang_lapok", teks:"Konten islami tidak ada yang bahas isu anak muda masa kini. Relevansinya kurang dengan kehidupan sehari-hari", likes:78, retweet:28, sentimen:"Negatif", skor:0.84 },
  { id:71, tanggal:"2026-05-06", username:"@peneliti_muda", teks:"Data penelitian menunjukkan konsumsi konten islami digital meningkat signifikan pasca pandemi COVID-19", likes:189, retweet:89, sentimen:"Positif", skor:0.89 },
  { id:72, tanggal:"2026-05-06", username:"@emak_viral", teks:"Konten parenting islami yang saya tulis dibaca jutaan orang. Alhamdulillah bisa memberi manfaat yang luas", likes:456, retweet:234, sentimen:"Positif", skor:0.97 },
  { id:73, tanggal:"2026-05-07", username:"@perantau_jawa", teks:"Jauh dari keluarga jadi makin rajin baca konten islami untuk menjaga keimanan di perantauan", likes:234, retweet:112, sentimen:"Positif", skor:0.93 },
  { id:74, tanggal:"2026-05-07", username:"@toxic_person", teks:"Konten islami malah sering dijadikan alat untuk menghakimi orang lain. Merusak nilai-nilai Islam itu sendiri", likes:134, retweet:67, sentimen:"Negatif", skor:0.88 },
  { id:75, tanggal:"2026-05-08", username:"@guru_sd", teks:"Siswa SD sekarang sudah bisa akses konten islami digital sendiri. Perlu panduan orang tua dalam memilih konten", likes:198, retweet:89, sentimen:"Netral", skor:0.77 },
  { id:76, tanggal:"2026-05-08", username:"@fresh_graduate", teks:"Setelah lulus kuliah makin sering baca konten islami untuk bekal hidup mandiri. Banyak hikmah yang bisa dipetik", likes:167, retweet:78, sentimen:"Positif", skor:0.92 },
  { id:77, tanggal:"2026-05-09", username:"@wirausaha_berkah", teks:"Prinsip bisnis islami yang dipelajari dari konten online benar-benar mengubah mindset berbisnis saya", likes:245, retweet:112, sentimen:"Positif", skor:0.93 },
  { id:78, tanggal:"2026-05-09", username:"@apatis_nih", teks:"Konten islami itu tidak menarik buat generasi yang sudah terbiasa dengan konten hiburan yang seru", likes:56, retweet:21, sentimen:"Negatif", skor:0.86 },
  { id:79, tanggal:"2026-05-10", username:"@komunitas_muslimah", teks:"Workshop literasi islami digital yang kami adakan diikuti 500 peserta. Antusiasme luar biasa dari masyarakat", likes:345, retweet:178, sentimen:"Positif", skor:0.95 },
  { id:80, tanggal:"2026-05-10", username:"@bijak_bestari", teks:"Konten islami yang dikemas dengan storytelling lebih mudah dicerna dan diingat dibanding ceramah konvensional", likes:289, retweet:134, sentimen:"Positif", skor:0.91 },
  { id:81, tanggal:"2026-05-11", username:"@santai_aja", teks:"Kadang bingung mau mulai dari mana belajar Islam secara online. Terlalu banyak pilihan konten yang tersedia", likes:112, retweet:45, sentimen:"Netral", skor:0.75 },
  { id:82, tanggal:"2026-05-11", username:"@ikhwan_semangat", teks:"Bergabung dengan komunitas baca islami online adalah keputusan terbaik tahun ini. Banyak ilmu dan teman baru", likes:234, retweet:112, sentimen:"Positif", skor:0.94 },
  { id:83, tanggal:"2026-05-12", username:"@muslimah_cantik", teks:"Konten tentang kecantikan dan fashion muslimah islami yang edukatif sangat diminati. Prospek sangat menjanjikan", likes:178, retweet:87, sentimen:"Positif", skor:0.90 },
  { id:84, tanggal:"2026-05-12", username:"@tidak_puas", teks:"Kualitas konten islami di Indonesia masih jauh di bawah konten dari negara-negara Muslim lain seperti Malaysia", likes:98, retweet:45, sentimen:"Negatif", skor:0.84 },
  { id:85, tanggal:"2026-05-13", username:"@ayahkeren", teks:"Membacakan cerita islami untuk anak sebelum tidur setiap malam. Rutinitas yang mempererat ikatan keluarga", likes:267, retweet:123, sentimen:"Positif", skor:0.94 },
  { id:86, tanggal:"2026-05-13", username:"@bad_mood", teks:"Konten islami yang terlalu menggurui membuat saya malas membaca. Butuh konten yang lebih dialogis dan interaktif", likes:89, retweet:38, sentimen:"Negatif", skor:0.86 },
  { id:87, tanggal:"2026-05-14", username:"@muslimah_peduli", teks:"Donasi untuk platform islami gratis itu penting agar konten berkualitas bisa diakses semua kalangan masyarakat", likes:189, retweet:89, sentimen:"Positif", skor:0.91 },
  { id:88, tanggal:"2026-05-14", username:"@gen_z_muslim", teks:"Sebagai gen Z aku prefer konten islami yang singkat di TikTok atau Reels daripada artikel panjang", likes:156, retweet:72, sentimen:"Netral", skor:0.79 },
  { id:89, tanggal:"2026-05-15", username:"@pesantren_modern", teks:"Integrasi teknologi di pesantren kami meningkatkan minat santri baca konten islami berlipat ganda", likes:312, retweet:156, sentimen:"Positif", skor:0.94 },
  { id:90, tanggal:"2026-05-15", username:"@pengangguran_nih", teks:"Nganggur jadi banyak waktu baca konten islami. Lumayan ngisi waktu daripada gabut tidak ada kegiatan", likes:67, retweet:23, sentimen:"Netral", skor:0.74 },
  { id:91, tanggal:"2026-05-16", username:"@cendekiawan", teks:"Diskursus intelektual islami di media digital Indonesia semakin kaya dan beragam. Perkembangan sangat positif", likes:245, retweet:112, sentimen:"Positif", skor:0.92 },
  { id:92, tanggal:"2026-05-16", username:"@muda_galau", teks:"Konten islami tentang mental health dan kesehatan jiwa dalam Islam sangat dibutuhkan generasi sekarang", likes:198, retweet:98, sentimen:"Netral", skor:0.78 },
  { id:93, tanggal:"2026-05-17", username:"@ibu_sibuk", teks:"Podcast islami sangat membantu saya yang tidak bisa baca panjang karena kesibukan mengurus keluarga sehari-hari", likes:234, retweet:108, sentimen:"Positif", skor:0.93 },
  { id:94, tanggal:"2026-05-17", username:"@kesal_banget", teks:"Konten islami di Facebook yang sering di-share itu kebanyakan tidak jelas sumbernya dan tidak bisa dipercaya", likes:112, retweet:56, sentimen:"Negatif", skor:0.87 },
  { id:95, tanggal:"2026-05-18", username:"@duta_dakwah", teks:"Mari kita jadikan Indonesia sebagai pusat konten islami berkualitas dunia. Kita punya potensi yang besar", likes:289, retweet:145, sentimen:"Positif", skor:0.92 },
  { id:96, tanggal:"2026-05-18", username:"@intelektual_muda", teks:"Kajian tafsir kontemporer yang bisa diakses online membuka wawasan baru tentang relevansi Islam di era modern", likes:267, retweet:123, sentimen:"Positif", skor:0.93 },
  { id:97, tanggal:"2026-05-19", username:"@tukang_kritik", teks:"Miris melihat banyak konten islami yang dibuat hanya untuk viral tanpa memperhatikan keakuratan ilmu agama", likes:134, retweet:67, sentimen:"Negatif", skor:0.86 },
  { id:98, tanggal:"2026-05-19", username:"@semangat45", teks:"Alhamdulillah program literasi islami digital berhasil menjangkau ribuan pelajar di seluruh pelosok Indonesia", likes:345, retweet:178, sentimen:"Positif", skor:0.96 },
  { id:99, tanggal:"2026-05-20", username:"@bunda_solehah", teks:"Momen Ramadan jadi waktu terbaik untuk tingkatkan konsumsi konten islami berkualitas. Semangat bermuhasabah", likes:289, retweet:134, sentimen:"Positif", skor:0.94 },
  { id:100, tanggal:"2026-05-20", username:"@reflektif_nih", teks:"Konten islami yang paling berkesan adalah yang berhasil mengubah perilaku pembacanya menjadi lebih baik", likes:223, retweet:102, sentimen:"Positif", skor:0.91 },
];

export const COLOR_MAP: Record<Sentimen, string> = {
  Positif: "#10b981",
  Netral:  "#6366f1",
  Negatif: "#ef4444",
};

export function getSentimenStats() {
  const counts = { Positif: 0, Netral: 0, Negatif: 0 };
  tweets.forEach(t => counts[t.sentimen]++);
  return counts;
}

export function getWordFrequency(sentimen?: Sentimen): { text: string; value: number }[] {
  const stopwords = new Set([
    "yang","dan","di","ke","dari","ini","itu","dengan","untuk","adalah","pada","ada","juga",
    "tidak","bisa","dalam","akan","sudah","saya","kami","kita","mereka","dia","ia","anda",
    "kamu","nya","pun","nih","sih","deh","dong","loh","kan","ya","yg","yah","ga","gak",
    "nggak","ngga","gk","udah","udh","mau","buat","kalau","kalo","tapi","atau","karena",
    "karna","sama","lebih","sangat","banget","sekali","paling","jadi","lagi","lg","masih",
    "belum","sdh","blm","emang","memang","aja","saja","hanya","cuma","punya","maka","jika",
    "bila","ketika","saat","waktu","setelah","sebelum","tentang","oleh","bagi","atas","bawah",
    "lain","semua","setiap","para","pak","bu","mas","mba","kak","bang","om","tante","rt",
    "ku","mu","si","the","a","an","is","in","of","to","bisa","itu","ini","kami","kita",
    "cara","banyak","lebih","sangat","sangat","saya","kami","kita","mereka","semakin","makin",
    "sudah","masih","belum","jadi","juga","lagi","baru","ada","buat","bikin","mau","mau"
  ]);

  const filtered = sentimen ? tweets.filter(t => t.sentimen === sentimen) : tweets;
  const freq: Record<string, number> = {};

  filtered.forEach(t => {
    t.teks.toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .forEach(w => {
        if (w.length > 3 && !stopwords.has(w)) {
          freq[w] = (freq[w] || 0) + 1;
        }
      });
  });

  return Object.entries(freq)
    .map(([text, value]) => ({ text, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 60);
}

export function getTrendByDate() {
  const grouped: Record<string, Record<Sentimen, number>> = {};
  tweets.forEach(t => {
    if (!grouped[t.tanggal]) grouped[t.tanggal] = { Positif: 0, Netral: 0, Negatif: 0 };
    grouped[t.tanggal][t.sentimen]++;
  });
  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, counts]) => ({ date, ...counts }));
}
