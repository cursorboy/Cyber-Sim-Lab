import { NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { messages, scenarioId } = await req.json()

    // Define the system message based on the context
    const systemMessage = {
      role: "system",
      content: `You are an expert cybersecurity instructor and mentor. Your role is to help users learn about cybersecurity through interactive scenarios. 
      ${scenarioId ? `You are specifically helping with the ${scenarioId} scenario.` : "You are helping users choose and understand different cybersecurity scenarios."}
      
      Guidelines:
      1. Provide clear, concise explanations
      2. Use real-world examples when possible
      3. Encourage critical thinking
      4. Guide users to discover solutions rather than giving direct answers
      5. Maintain a professional but approachable tone
      6. Focus on practical, hands-on learning
      7. Emphasize security best practices
      8. Help users understand the underlying concepts
      
      If you don't know something, be honest about it. Never provide incorrect or potentially harmful information.`,
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [systemMessage, ...messages],
      temperature: 0.7,
      max_tokens: 1000,
    })

    return NextResponse.json({
      role: "assistant",
      content: completion.choices[0].message.content,
    })
  } catch (error) {
    console.error("Error in AI chat:", error)
    return NextResponse.json(
      { error: "Failed to get AI response" },
      { status: 500 }
    )
  }
} 