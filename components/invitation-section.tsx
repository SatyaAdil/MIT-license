"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2 } from "lucide-react"

export default function InvitationSection() {
  const [roomData, setRoomData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchRoomData = async () => {
    setLoading(true)
    try {
      const response = await fetch("https://roomstydcode.netlify.app/api/data")
      const data = await response.json()
      setRoomData(data)
    } catch (error) {
      console.error("[v0] Failed to fetch room data:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoomData()
  }, [])

  return (
    <section className="relative py-32 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="glass-effect p-12 rounded-2xl">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Want to Know More About Me?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Come play in my room and explore my world
          </p>

          {loading ? (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading room data...</span>
            </div>
          ) : roomData ? (
            <div className="mb-8 p-4 rounded-lg bg-primary/10 text-sm">
              <p className="text-muted-foreground">Room Status: Connected</p>
            </div>
          ) : null}

          <Button
            size="lg"
            className="text-lg px-8 py-6"
            onClick={() => window.open("https://roomstydcode.netlify.app", "_blank")}
          >
            Enter My Room
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        <footer className="mt-20 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">© 2025 Your Name. Built with Next.js and love.</p>
        </footer>
      </div>
    </section>
  )
}
