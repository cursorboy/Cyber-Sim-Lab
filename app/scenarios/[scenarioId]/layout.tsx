"use client"

import { AIAssistant } from "@/components/ai-assistant"

export default function ScenarioLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { scenarioId: string }
}) {
  return (
    <div className="flex-1">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
          <div>{children}</div>
          <div className="h-[calc(100vh-12rem)]">
            <AIAssistant
              scenarioId={params.scenarioId}
              initialContext="I'm your AI security assistant for this scenario. I can help you understand the concepts, guide you through the steps, and answer any questions you have. What would you like to know?"
            />
          </div>
        </div>
      </div>
    </div>
  )
} 