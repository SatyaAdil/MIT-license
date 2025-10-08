"use client"
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

const colorClasses = [
  "text-cyan-400",
  "text-sky-400",
  "text-teal-400",
  "text-blue-400",
  "text-indigo-400",
  "text-violet-400",
  "text-pink-400",
]

const content = {
  en: {
    title: "Journey Diary",
    subtitle: "STORY OF MY LIFE",
    paragraphs: [
      {
        text: "Hello, my name is",
        highlight1: "Satya Adil Faishal",
        text2: ", a Frontend Developer from Tegal, Indonesia. I firmly believe that the best code is written with a purpose — not just as a shortcut.",
      },
      {
        text: "My interest in technology started when I was a child. I loved playing video games and often wondered, \"How can a digital world like that exist?\" That curiosity grew even stronger when I studied at a pesantren. Memorizing and studying the Quran taught me discipline, focus, and a love for learning — habits that turned out to be very helpful when I started learning to code.",
      },
      {
        text: "At the age of 16, I realized that coding was my passion. However, financial conditions at that time did not allow me to go straight to college after graduating from",
        school: "SMKN 3 Tegal",
        text2: ". So I decided to go to Jakarta to work while learning to code self-taught through",
        highlight1: "online bootcamps, Dicoding, YouTube",
        text3: " and various other resources. After more than a year of working and studying in Jakarta, I returned to Tegal and continued my studies at",
        university: "Universitas Harkat Negeri Tegal",
        text3extra: ", majoring in Informatics Engineering. From this experience, I learned that obstacles are not the end of the road — they are just a detour.",
      },
      {
        text: "Now, I'm glad to be able to use my abilities to make something meaningful — helping",
        highlight1: "business owners, institutions, and individuals",
        text2: " build digital solutions. From management systems to online presence, my work helps them streamline operations and expand their reach. It's not just about writing code — it's about building bridges between traditional businesses and modern technology, making technology something truly useful for people.",
      },
      {
        text: "Looking ahead, I want to keep learning, growing, and contributing to those around me. Every project, mistake, and challenge is an opportunity to become better. My goal is not only personal success, but also to create a better future for my family and",
        highlight1: "everyone I help",
        text2: " — using technology as a force for good.",
      },
    ],
    quote:
      "Every line of code I write is a step toward a better future — for my family, businesses, and community. Obstacles are not endings; they are redirections to a better path.",
    stats: [
      { value: "2019", label: "Started Coding" },
      { value: "1+", label: "Years in Jakarta" },
      { value: "100%", label: "Self-Funded" },
      { value: "∞", label: "Always Learning" },
    ],
  },
  id: {
    title: "Journey Diary",
    subtitle: "CERITA HIDUP SAYA",
    paragraphs: [
      {
        text: "Hallo, nama saya",
        highlight1: "Satya Adil Faishal",
        text2: ", seorang Frontend Developer dari Tegal, Indonesia. Saya selalu percaya bahwa kode terbaik ditulis dengan tujuan — bukan sekadar jalan pintas.",
      },
      {
        text: "Ketertarikan saya pada dunia teknologi dimulai sejak kecil. Waktu masih anak-anak, saya suka main video game dan sering bertanya-tanya, \"Gimana ya cara bikin dunia digital itu bisa ada?\" Rasa penasaran itu terus tumbuh, apalagi ketika saya belajar di pesantren. Menghafal dan mempelajari Al-Quran mengajarkan saya disiplin, fokus, dan cinta belajar — kebiasaan yang ternyata sangat membantu ketika mulai menekuni dunia coding.",
      },
      {
        text: "Saat berusia 16 tahun, saya sadar bahwa coding adalah passion saya. Namun, kondisi finansial waktu itu belum memungkinkan saya untuk langsung kuliah setelah lulus dari",
        school: "SMKN 3 Tegal",
        text2: ". Maka saya memutuskan untuk merantau ke Jakarta untuk bekerja sambil belajar coding secara otodidak lewat",
        highlight1: "bootcamp online, Dicoding, YouTube",
        text3: " serta berbagai sumber lainnya. Setelah lebih dari setahun bekerja dan belajar di Jakarta, saya kembali ke Tegal dan melanjutkan studi di",
        university: "Universitas Harkat Negeri Tegal",
        text3extra: ", jurusan Teknik Informatika. Dari pengalaman ini, saya belajar bahwa hambatan bukan akhir jalan, melainkan hanya jalan memutar.",
      },
      {
        text: "Sekarang, saya senang bisa menggunakan kemampuan saya untuk hal yang nyata — membantu",
        highlight1: "pelaku usaha, instansi, dan individu",
        text2: " membangun solusi digital. Dari sistem manajemen hingga kehadiran online, karya saya membantu mereka mempermudah operasional dan memperluas jangkauan. Rasanya bukan hanya menulis kode, tapi juga membangun jembatan antara bisnis tradisional dan teknologi modern — menjadikan teknologi sesuatu yang bermanfaat bagi banyak orang.",
      },
      {
        text: "Ke depan, saya ingin terus belajar, berkembang, dan memberi manfaat bagi orang-orang di sekitar. Setiap proyek, setiap kesalahan, dan setiap tantangan saya anggap sebagai kesempatan untuk menjadi lebih baik. Tujuan saya bukan sekadar kesuksesan pribadi, tetapi juga menciptakan masa depan yang lebih baik untuk keluarga dan",
        highlight1: "semua pihak yang saya bantu",
        text2: " — dengan memanfaatkan teknologi sebagai kekuatan untuk kebaikan.",
      },
    ],
    quote:
      "Setiap baris kode yang saya tulis adalah langkah menuju masa depan yang lebih baik — untuk keluarga saya, pelaku usaha, instansi, individu, dan diri saya sendiri. Hambatan itu bukan akhir, tapi hanya pengalihan menuju jalan yang lebih baik.",
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
  const [language, setLanguage] = useState<Language>("id")
  const [isExpanded, setIsExpanded] = useState(false)
  const [visibleParagraphs, setVisibleParagraphs] = useState<number[]>([])
  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const currentContent: StoryContent = content[language]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
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
    <section id="story" className="relative py-20 text-white overflow-hidden">
      <div className="container mx-auto max-w-3xl px-4">
        {/* Language Toggle */}
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

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-light mb-2 text-cyan-400 tracking-wider">
            {currentContent.title}
          </h2>
          <h3 className="text-sm md:text-base font-semibold tracking-widest text-gray-400 uppercase">
            {currentContent.subtitle}
          </h3>
        </div>

        {/* Content */}
        <div
          className={`space-y-4 text-gray-300 leading-relaxed transition-all duration-500 ${
            isExpanded ? "max-h-full" : "max-h-80 overflow-hidden relative"
          }`}
        >
          {currentContent.paragraphs.map((p, i) => {
            const color = colorClasses[i % colorClasses.length]
            return (
              <p
                key={i}
                ref={(el) => {
                  paragraphRefs.current[i] = el
                }}
                data-index={i}
                className={`text-sm md:text-base transition-all duration-1000 transform ${
                  visibleParagraphs.includes(i)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: `${i * 100}ms`,
                  textAlign: "justify",
                  textIndent: "2em",
                }}
              >
                {p.text}
                {p.highlight1 && !p.school && <> <span className={`${color} font-medium`}>{p.highlight1}</span></>}
                {p.school && <> <span className={`${color} font-medium`}>{p.school}</span></>}
                {p.text2 && <>{p.text2}</>}
                {p.highlight1 && p.school && <> <span className={`${color} font-medium`}>{p.highlight1}</span></>}
                {p.text3 && <>{p.text3}</>}
                {p.university && <> <span className={`${color} font-medium`}>{p.university}</span></>}
                {p.text3extra && <>{p.text3extra}</>}
                {p.highlight2 && <> <span className={`${color} font-medium`}>{p.highlight2}</span></>}
              </p>
            )
          })}

          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 border-2 border-white text-white font-semibold tracking-wider hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 group"
          >
            {isExpanded ? "HIDE ARTICLE" : "CONTINUE"}
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        {isExpanded && (
          <div className="mt-8 flex justify-end">
            <div className="max-w-xs text-right">
              <p className="text-xs text-gray-400 italic leading-relaxed mb-1">
                "{currentContent.quote}"
              </p>
              <p className="text-xs text-cyan-400/70">— Satya Adil Faishal</p>
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