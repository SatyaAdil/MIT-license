import { useState, useEffect, useRef } from "react"
import { Globe, ChevronDown } from "lucide-react"

type Paragraph = {
  text: string
  highlight1?: string
  text2?: string
  school?: string
  university?: string
  text3?: string
  text3extra?: string
  highlight2?: string
}

type Stat = {
  value: string
  label: string
}

type StoryContent = {
  title: string
  subtitle: string
  paragraphs: readonly Paragraph[]
  quote: string
  stats: readonly Stat[]
}

const content = {
  en: {
    title: "ショートバイオグラフィー",
    subtitle: "STORY OF MY LIFE",
    paragraphs: [
      {
        text: "Hello, my name is",
        highlight1: "Satya Adil Faishal",
        text2:
          ", a Frontend Developer from Tegal, Indonesia. I firmly believe that the best code is written with a purpose, not just as a shortcut.",
      },
      {
        text: "My interest in technology started when I was a child. I loved playing video games and often wondered, \"How is the digital world actually built?\" That curiosity kept growing, especially during my time in pesantren, where memorizing and studying the Quran taught me discipline, focus, and a love for learning; habits that proved incredibly helpful when I started diving into coding.",
      },
      {
        text: "At the age of 16, I realized that coding was my true passion. However, my financial situation at the time didn't allow me to go straight to college after graduating from",
        school: "SMKN 3 Tegal",
        text2:
          ". Instead of waiting, I decided to move to Jakarta, work for a year, and save every penny to fund my own education. During that time, I also learned self-taught through",
        highlight1: "online bootcamps, Dicoding, YouTube",
        text3:
          ", and many other resources to keep improving my skills before officially starting college. That determination paid off—I returned to Tegal and enrolled in Informatics Engineering at",
        university: "Universitas Harkat Negeri Tegal",
        text3extra: ". From this experience, I learned that obstacles are not dead ends—they are just detours.",
      },
      {
        text: "Today, I enjoy applying my skills to make a real impact—helping",
        highlight1: "business owners, institutions, and individuals",
        text2:
          " build digital solutions. From management systems to online presence, my work helps them streamline operations and expand their reach. It's more than just writing code; it's building bridges between traditional businesses and modern technology, making tech truly beneficial for people.",
      },
      {
        text: "Looking ahead, I am driven by a desire to keep learning, growing, and making a difference for those around me. Every project, every mistake, and every challenge is an opportunity to improve. My goal is not only personal success but also creating a better future for my",
        highlight2: "family",
        text2:
          " and everyone I help, using technology as a force for good.",
      },
    ],
    quote:
      "Every line of code I write is a step toward a better future—for my family, business owners, institutions, individuals, and myself. Obstacles are not the end; they are simply a detour toward a better path.",
    stats: [
      { value: "2019", label: "Started Coding" },
      { value: "1+", label: "Years in Jakarta" },
      { value: "100%", label: "Self-Funded" },
      { value: "∞", label: "Always Learning" },
    ],
  },
  id: {
    title: "ショートバイオグラフィー",
    subtitle: "CERITA HIDUP SAYA",
    paragraphs: [
      {
        text: "Hallo, nama saya",
        highlight1: "Satya Adil Faishal",
        text2:
          ", seorang Frontend Developer dari Tegal, Indonesia. Saya selalu percaya kalau kode terbaik itu ditulis dengan tujuan, bukan sekadar jalan pintas.",
      },
      {
        text: "Ketertarikan saya dengan dunia teknologi dimulai sejak kecil. Waktu masih anak-anak, saya suka main video game—dan sering bertanya-tanya, \"Gimana ya cara bikin dunia digital itu bisa ada?\" Rasa penasaran itu terus tumbuh, apalagi ketika belajar di pesantren. Menghafal dan mempelajari Al-Quran mengajarkan saya disiplin, fokus, dan cinta belajar; kebiasaan ini ternyata sangat membantu saat saya mulai menekuni dunia coding.",
      },
      {
        text: "Waktu umur 16 tahun, saya sadar kalau coding adalah passion saya. Tapi kondisi finansial waktu itu nggak memungkinkan saya untuk langsung kuliah setelah lulus dari",
        school: "SMKN 3 Tegal",
        text2:
          ". Daripada menunggu, saya memutuskan pindah ke Jakarta, kerja setahun, dan menabung tiap rupiah demi membiayai pendidikan sendiri. Selama itu, saya juga belajar otodidak lewat",
        highlight1: "bootcamp online, Dicoding, YouTube",
        text3:
          ", dan berbagai sumber lainnya, supaya skill saya terus berkembang sebelum resmi masuk kuliah. Tekad itu membuahkan hasil—saya kembali ke Tegal dan masuk Teknik Informatika di",
        university: "Universitas Harkat Negeri Tegal",
        text3extra: ". Dari pengalaman ini, saya belajar kalau hambatan itu bukan akhir jalan, tapi cuma jalan memutar.",
      },
      {
        text: "Sekarang, saya senang bisa menggunakan skill saya untuk hal yang nyata—membantu",
        highlight1: "pelaku usaha, instansi, dan individu",
        text2:
          " membangun solusi digital. Dari sistem manajemen hingga kehadiran online, karya saya membantu mereka mempermudah operasional dan memperluas jangkauan. Rasanya tidak hanya menulis kode, tapi juga membangun jembatan antara bisnis tradisional dan teknologi modern, menjadikan teknologi sesuatu yang bermanfaat bagi banyak orang.",
      },
      {
        text: "Ke depan, saya ingin terus belajar, berkembang, dan memberi manfaat bagi orang-orang di sekitar. Setiap proyek, setiap kesalahan, dan setiap tantangan saya anggap sebagai kesempatan untuk menjadi lebih baik. Tujuan saya bukan sekadar kesuksesan pribadi, tetapi juga menciptakan masa depan yang lebih baik bagi",
        highlight2: "keluarga",
        text2:
          " dan semua pihak yang saya bantu, serta memanfaatkan teknologi sebagai kekuatan untuk kebaikan.",
      },
    ],
    quote:
      "Setiap baris kode yang saya tulis adalah langkah menuju masa depan yang lebih baik—untuk keluarga saya, pelaku usaha, instansi, individu, dan diri saya sendiri. Hambatan itu bukan akhir, tapi cuma pengalihan menuju jalan yang lebih baik.",
    stats: [
      { value: "2019", label: "Mulai Coding" },
      { value: "1+", label: "Tahun di Jakarta" },
      { value: "100%", label: "Biaya Sendiri" },
      { value: "∞", label: "Selalu Belajar" },
    ],
  },
} as const

type Language = keyof typeof content

export default function StorySection() {
  const [language, setLanguage] = useState<Language>("en")
  const [isExpanded, setIsExpanded] = useState(false)
  const [visibleParagraphs, setVisibleParagraphs] = useState<number[]>([])
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const currentContent: StoryContent = content[language]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'))
            setVisibleParagraphs((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.1 }
    )

    paragraphRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="story" className="relative py-0 text-white overflow-hidden">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Language Toggle - Top Right */}
        <div className="flex justify-end mb-12">
          <div className="inline-flex items-center gap-2 bg-gray-900/50 backdrop-blur-sm rounded-full p-1 border border-gray-800/50">
            <button
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                language === "en"
                  ? "bg-cyan-500 text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Globe className="w-5 h-5" />
              English
            </button>
            <button
              onClick={() => setLanguage("id")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                language === "id"
                  ? "bg-cyan-500 text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Globe className="w-5 h-5" />
              Indonesia
            </button>
          </div>
        </div>

        {/* Header - Centered */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-light mb-2 text-cyan-400 tracking-wider">
            {currentContent.title}
          </h2>
          <h3 className="text-sm md:text-base font-semibold tracking-widest text-gray-400 uppercase">
            {currentContent.subtitle}
          </h3>
        </div>

        {/* Biography Content */}
        <div className={`space-y-4 text-gray-300 leading-normal transition-all duration-500 ${isExpanded ? 'max-h-full' : 'max-h-80 overflow-hidden relative'}`}>
          {currentContent.paragraphs.map((p, i) => (
            <p
              key={i}
              ref={(el) => { paragraphRefs.current[i] = el }}
              data-index={i}
              className={`text-sm md:text-base transition-all duration-1000 transform ${
                visibleParagraphs.includes(i)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {p.text}{" "}
              {p.highlight1 && (
                <>
                  <span className="text-cyan-400 font-medium">
                    {p.highlight1}
                  </span>{" "}
                </>
              )}
              {p.text2}{" "}
              {p.school && (
                <>
                  <span className="text-cyan-400 font-medium underline decoration-cyan-400/30">
                    {p.school}
                  </span>{" "}
                </>
              )}
              {p.text3}{" "}
              {p.university && (
                <>
                  <span className="text-cyan-400 font-medium underline decoration-cyan-400/30">
                    {p.university}
                  </span>
                </>
              )}
              {p.text3extra && <>{p.text3extra}</>}
              {p.highlight2 && (
                <>
                  <span className="text-cyan-400 font-medium">
                    {p.highlight2}
                  </span>{" "}
                </>
              )}
            </p>
          ))}
          
          {/* Gradient Overlay when collapsed */}
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
          )}
        </div>

        {/* Hide/Show Article Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-8 py-3 border-2 border-white text-white font-semibold tracking-wider hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 group"
          >
            {isExpanded ? 'HIDE ARTICLE' : 'SHOW MORE'}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Quote Section - Only visible when expanded */}
        {isExpanded && (
          <div className="mt-16 space-y-12 animate-fadeIn">
            <div className="border-l-2 border-gray-700 pl-6 py-4">
              <p className="text-lg md:text-xl text-gray-300 italic leading-relaxed mb-4">
                "{currentContent.quote}"
              </p>
              <p className="text-cyan-400 font-medium">— Satya Adil Faishal</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {currentContent.stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center group"
                >
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500 tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </section>
  )
}