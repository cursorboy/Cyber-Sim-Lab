import Link from "next/link"
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Folder,
  GraduationCap,
  BookMarked,
  Shield,
  Terminal,
  Trophy,
  Video,
  Zap,
  Link as LinkIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResourcesPage() {
  const resources = {
    documentation: [
      {
        title: "Network Security Fundamentals",
        description: "Learn the basics of network security and common attack vectors",
        type: "Guide",
        readTime: "15 min read",
        icon: FileText
      },
      {
        title: "Malware Analysis Techniques",
        description: "Understanding different types of malware and analysis methods",
        type: "Documentation",
        readTime: "25 min read",
        icon: FileText
      },
      {
        title: "Incident Response Playbook",
        description: "Step-by-step guide for handling security incidents",
        type: "Guide",
        readTime: "20 min read",
        icon: FileText
      }
    ],
    tutorials: [
      {
        title: "Setting Up a Security Lab",
        description: "Learn how to create your own cybersecurity testing environment",
        type: "Video Tutorial",
        duration: "45 min",
        icon: Video
      },
      {
        title: "Penetration Testing Basics",
        description: "Introduction to ethical hacking and penetration testing",
        type: "Interactive Tutorial",
        duration: "60 min",
        icon: Video
      },
      {
        title: "Social Engineering Defense",
        description: "Techniques to identify and prevent social engineering attacks",
        type: "Workshop",
        duration: "30 min",
        icon: Video
      }
    ],
    external: [
      {
        title: "OWASP Top 10",
        description: "Web application security risks and mitigation strategies",
        link: "https://owasp.org/www-project-top-ten/",
        icon: LinkIcon
      },
      {
        title: "NIST Cybersecurity Framework",
        description: "Standards, guidelines, and best practices for cybersecurity",
        link: "https://www.nist.gov/cyberframework",
        icon: LinkIcon
      },
      {
        title: "MITRE ATT&CK",
        description: "Knowledge base of adversary tactics and techniques",
        link: "https://attack.mitre.org/",
        icon: LinkIcon
      }
    ]
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container flex h-16 items-center px-4 md:px-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 font-semibold">
            <Shield className="h-6 w-6 text-primary" />
            <span>Cyber Sim Lab</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="/scenarios" className="text-sm font-medium transition-colors hover:text-primary">
              Scenarios
            </Link>
            <Link href="/resources" className="text-sm font-medium transition-colors hover:text-primary">
              Resources
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <div className="container max-w-7xl mx-auto px-4 md:px-6 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Learning Resources</h1>
          </div>

          <div className="space-y-12">
            <section>
              <div className="flex items-center gap-2 mb-6">
                <BookOpen className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Documentation</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.documentation.map((resource, index) => {
                  const Icon = resource.icon
                  return (
                    <Card key={index} className="hover:shadow-lg transition-all duration-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle>{resource.title}</CardTitle>
                            <CardDescription>{resource.description}</CardDescription>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{resource.type}</span>
                          <span>{resource.readTime}</span>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-6">
                <Video className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">Video Tutorials</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.tutorials.map((tutorial, index) => {
                  const Icon = tutorial.icon
                  return (
                    <Card key={index} className="hover:shadow-lg transition-all duration-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <CardTitle>{tutorial.title}</CardTitle>
                            <CardDescription>{tutorial.description}</CardDescription>
                          </div>
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>{tutorial.type}</span>
                          <span>{tutorial.duration}</span>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-6">
                <LinkIcon className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-semibold">External Resources</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resources.external.map((resource, index) => {
                  const Icon = resource.icon
                  return (
                    <a 
                      key={index} 
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Card className="hover:shadow-lg transition-all duration-200 h-full">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <CardTitle>{resource.title}</CardTitle>
                              <CardDescription>{resource.description}</CardDescription>
                            </div>
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <Icon className="h-4 w-4 text-primary" />
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    </a>
                  )
                })}
              </div>
            </section>
          </div>
        </div>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container py-6 text-center text-sm text-muted-foreground max-w-7xl mx-auto px-4 md:px-6">
          © 2025 Cyber Sim Lab. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

