import Link from "next/link"
import {
  ArrowRight,
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
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResourcesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-20 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Cybersecurity Learning Resources
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Expand your cybersecurity knowledge with these carefully curated resources, guides, and tutorials.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 lg:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Getting Started</h2>
              <p className="text-muted-foreground">
                New to cybersecurity? Start with these foundational resources to build a solid understanding of key
                concepts.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Cybersecurity Basics
                  </CardTitle>
                  <CardDescription>Essential knowledge for beginners</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Learn the fundamental concepts of cybersecurity, including threat types, basic defense strategies,
                    and common terminology.
                  </p>
                </CardContent>
                <CardFooter>
                  <a
                    href="https://www.cisa.gov/topics/cybersecurity-best-practices"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" className="gap-1 text-primary">
                      Learn more <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Free Online Courses
                  </CardTitle>
                  <CardDescription>Top-rated cybersecurity courses</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    A collection of free online courses from platforms like Coursera, edX, and Cybrary that cover
                    various cybersecurity topics.
                  </p>
                </CardContent>
                <CardFooter>
                  <a
                    href="https://www.coursera.org/collections/free-online-cybersecurity-courses"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" className="gap-1 text-primary">
                      Explore courses <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Video className="h-5 w-5 text-primary" />
                    Video Tutorials
                  </CardTitle>
                  <CardDescription>Visual learning resources</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Curated video tutorials that explain key cybersecurity concepts, tools, and techniques in a visual
                    and engaging format.
                  </p>
                </CardContent>
                <CardFooter>
                  <a href="https://www.youtube.com/c/NetworkChuck" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" className="gap-1 text-primary">
                      Watch videos <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-8 lg:py-12 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Specialized Topics</h2>
              <p className="text-muted-foreground">
                Deep dive into specific cybersecurity domains with these specialized resources.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="h-5 w-5 text-primary" />
                    Network Security
                  </CardTitle>
                  <CardDescription>Protect your network infrastructure</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span>Understanding firewalls and network segmentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span>Intrusion detection and prevention systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span>Secure network architecture design</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <a
                    href="https://www.sans.org/security-resources/networking/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" className="gap-1 text-primary">
                      Explore resources <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Malware Analysis
                  </CardTitle>
                  <CardDescription>Understand and counter malicious software</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span>Static and dynamic analysis techniques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span>Reverse engineering malware samples</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span>Setting up safe malware analysis environments</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <a href="https://malware-traffic-analysis.net/" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" className="gap-1 text-primary">
                      Explore resources <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Social Engineering Defense
                  </CardTitle>
                  <CardDescription>Counter manipulation tactics</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span>Recognizing phishing and pretexting attempts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span>Building a security-aware culture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <span>Implementing effective security awareness training</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <a
                    href="https://www.social-engineer.org/framework/general-discussion/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" className="gap-1 text-primary">
                      Explore resources <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-8 lg:py-12">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Tools & Practice Environments</h2>
              <p className="text-muted-foreground">
                Resources to help you develop practical cybersecurity skills through hands-on practice.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Security Tools</CardTitle>
                  <CardDescription>Essential tools for security professionals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-primary" />
                        Network Analysis
                      </h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>Wireshark</li>
                        <li>Nmap</li>
                        <li>Burp Suite</li>
                        <li>Metasploit Framework</li>
                      </ul>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        Security Monitoring
                      </h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>Splunk</li>
                        <li>ELK Stack</li>
                        <li>OSSEC</li>
                        <li>Suricata</li>
                      </ul>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Folder className="h-4 w-4 text-primary" />
                        Forensics Tools
                      </h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>Autopsy</li>
                        <li>FTK Imager</li>
                        <li>Volatility</li>
                        <li>Redline</li>
                      </ul>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Zap className="h-4 w-4 text-primary" />
                        Vulnerability Assessment
                      </h3>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>OpenVAS</li>
                        <li>Nessus</li>
                        <li>OWASP ZAP</li>
                        <li>Nikto</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <a href="https://www.kali.org/tools/" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" className="gap-1 text-primary">
                      Download guides <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Practice Environments</CardTitle>
                  <CardDescription>Develop skills in safe, controlled environments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Capture The Flag (CTF) Platforms</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Test your skills with cybersecurity challenges and competitions:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                          TryHackMe
                        </div>
                        <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                          HackTheBox
                        </div>
                        <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                          PicoCTF
                        </div>
                        <div className="bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full">
                          VulnHub
                        </div>
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Virtual Labs</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Practice in isolated environments that simulate real-world systems:
                      </p>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                          <span>SANS CyberRanges - Professional training environments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                          <span>OWASP WebGoat - Web application security practice</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                          <span>Metasploitable - Deliberately vulnerable machines</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <a href="https://tryhackme.com/" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" className="gap-1 text-primary">
                      Access environments <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-8 lg:py-12 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4">
              <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">Books & Publications</h2>
              <p className="text-muted-foreground">
                Essential reading materials for deepening your cybersecurity knowledge.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookMarked className="h-5 w-5 text-primary" />
                    Essential Books
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex flex-col">
                      <span className="font-medium">The Art of Deception</span>
                      <span className="text-muted-foreground">Kevin Mitnick</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-medium">Practical Malware Analysis</span>
                      <span className="text-muted-foreground">Michael Sikorski & Andrew Honig</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-medium">Applied Cryptography</span>
                      <span className="text-muted-foreground">Bruce Schneier</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-medium">Hacking: The Art of Exploitation</span>
                      <span className="text-muted-foreground">Jon Erickson</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-medium">The Web Application Hacker's Handbook</span>
                      <span className="text-muted-foreground">Dafydd Stuttard & Marcus Pinto</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <a
                    href="https://www.goodreads.com/list/show/559.Best_Security_Books"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" className="gap-1 text-primary">
                      View book list <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Whitepapers & Research
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex flex-col">
                      <span className="font-medium">NIST Cybersecurity Framework</span>
                      <span className="text-muted-foreground">Best practices for managing cybersecurity risk</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-medium">MITRE ATT&CK Framework</span>
                      <span className="text-muted-foreground">Tactics and techniques used by threat actors</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-medium">OWASP Top 10</span>
                      <span className="text-muted-foreground">Critical web application security risks</span>
                    </li>
                    <li className="flex flex-col">
                      <span className="font-medium">Sans Reading Room</span>
                      <span className="text-muted-foreground">Research papers on various security topics</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <a href="https://attack.mitre.org/" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" className="gap-1 text-primary">
                      Access research <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    Certifications Guide
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-1">Entry Level</h3>
                      <div className="flex flex-wrap gap-2">
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                          CompTIA Security+
                        </div>
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">CEH</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Intermediate</h3>
                      <div className="flex flex-wrap gap-2">
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">CISSP</div>
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">CISM</div>
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">CCSP</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium mb-1">Advanced</h3>
                      <div className="flex flex-wrap gap-2">
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">OSCP</div>
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">GIAC</div>
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">CISA</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <a href="https://www.comptia.org/certifications/security" target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" className="gap-1 text-primary">
                      Explore certifications <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-t from-muted to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Ready to Strengthen Your Cybersecurity Skills?
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Start practicing with our interactive scenarios and continue learning with these resources.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Link href="/scenarios">
                  <Button size="lg" className="gap-1">
                    Try Scenarios <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#top">
                  <Button size="lg" variant="outline">
                    Back to Top
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8">
          <div className="flex flex-col gap-2 md:gap-4">
            <div className="flex items-center gap-2 font-semibold">
              <Shield className="h-6 w-6 text-primary" />
              <span>Cyber Sim Lab</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Train. Defend. Master cybersecurity skills in a safe environment.
            </p>
          </div>
          <div className="ml-auto grid gap-8 sm:grid-cols-2">
            <div className="grid gap-2">
              <h3 className="text-sm font-medium">Platform</h3>
              <nav className="grid gap-2 text-sm">
                <Link href="#" className="text-muted-foreground hover:underline">
                  Features
                </Link>
                <Link href="/scenarios" className="text-muted-foreground hover:underline">
                  Scenarios
                </Link>
                <Link href="/resources" className="text-muted-foreground hover:underline">
                  Resources
                </Link>
              </nav>
            </div>
            <div className="grid gap-2">
              <h3 className="text-sm font-medium">Company</h3>
              <nav className="grid gap-2 text-sm">
                <Link href="#" className="text-muted-foreground hover:underline">
                  About
                </Link>
                <Link href="#" className="text-muted-foreground hover:underline">
                  Blog
                </Link>
                <Link href="#" className="text-muted-foreground hover:underline">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="container py-6 text-center text-sm text-muted-foreground">
          © 2025 Cyber Sim Lab. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

