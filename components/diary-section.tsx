import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export default function DiarySection() {
  const entries = [
    {
      date: "2025-01-15",
      title: "Launched New Portfolio",
      content: "Finally completed my new portfolio website with interactive features and modern design.",
    },
    {
      date: "2025-01-10",
      title: "Learning Three.js",
      content: "Started exploring 3D graphics on the web. The possibilities are endless!",
    },
    {
      date: "2025-01-05",
      title: "Coffee and Code",
      content: "Perfect Sunday morning spent refactoring old projects and sipping coffee.",
    },
  ]

  return (
    <section id="diary" className="relative py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-4 text-balance">Life Diary</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Thoughts, experiences, and daily adventures
        </p>
        <div className="space-y-6">
          {entries.map((entry, index) => (
            <Card key={index} className="glass-effect">
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{entry.date}</span>
                </div>
                <CardTitle>{entry.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">{entry.content}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
