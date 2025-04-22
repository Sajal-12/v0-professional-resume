import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Github, Linkedin, ExternalLink } from "lucide-react"

export default function Resume() {
  return (
    <Card className="w-[210mm] min-h-[297mm] mx-auto p-8 bg-white shadow-lg print:shadow-none">
      <CardContent className="p-0">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">SAJAL SWAPNIL</h1>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2">
              <span className="text-gray-600">Basant Bihar, Begusarai, 851101</span>
              <span className="hidden md:inline text-gray-400">|</span>
              <span className="text-gray-600">7779876622</span>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end mt-2 md:mt-0">
            <span className="text-gray-600">sajalvictorious83@gmail.com</span>
            <div className="flex gap-3 mt-2">
              <Link
                href="https://www.linkedin.com/in/sajal-swapnil-a93a741ba"
                className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
                <span className="hidden md:inline">LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/Sajal-12"
                className="text-gray-700 hover:text-gray-900 transition-colors flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
                <span className="hidden md:inline">GitHub</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <Section title="EDUCATION">
          <div className="flex flex-col md:flex-row justify-between mb-1">
            <div className="font-semibold">Chandigarh University, Gharuan</div>
            <div className="text-gray-600">August 2020 - June 2024</div>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <div>B.E. Computer Science Engineering</div>
            <div>CGPA: 7.7</div>
          </div>

          <div className="mt-3">
            <div className="flex flex-col md:flex-row justify-between mb-1">
              <div className="font-semibold">ST JOSEPH PUBLIC SCHOOL, Begusarai</div>
              <div className="text-gray-600">2018 - 2019</div>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <div>Intermediate (CBSE)</div>
              <div>Percentage: 62%</div>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex flex-col md:flex-row justify-between mb-1">
              <div className="font-semibold">DAV PUBLIC SCHOOL, Begusarai</div>
              <div className="text-gray-600">2016 - 2017</div>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <div>Matriculation (CBSE)</div>
              <div>Percentage: 79%</div>
            </div>
          </div>
        </Section>

        {/* Projects Section */}
        <Section title="PROJECTS">
          <div className="space-y-4">
            <Project
              title="PATHFINDING VISUALIZER"
              tech="React.js, JavaScript, CSS, Data Structures & Algorithms"
              githubLink="https://github.com/Sajal-12/pathfinding-visualizer"
              demoLink="https://pathfinding-visualizer-ss.netlify.app/"
            >
              <li>
                Developed an <strong>interactive web application</strong> to visualize various pathfinding algorithms
                including <strong>Dijkstra's, A*, BFS, and DFS</strong> with real-time visualization capabilities
              </li>
              <li>
                Implemented a responsive grid system with <strong>customizable animation speed</strong> and obstacle
                placement for enhanced user experience
              </li>
              <li>
                Utilized <strong>React.js</strong> for efficient state management and component-based architecture,
                resulting in a smooth and responsive user interface
              </li>
            </Project>

            <Project
              title="GERICHT RESTAURANT"
              tech="React.js, Node.js, Express.js, MongoDB, Tailwind CSS"
              githubLink="https://github.com/Sajal-12/Gericht-Restaurant"
              demoLink="https://lucent-kitten-5ba2da.netlify.app/"
            >
              <li>
                Built a <strong>full-stack MERN application</strong> for a restaurant featuring an elegant UI with{" "}
                <strong>responsive design</strong> across all device sizes
              </li>
              <li>
                Implemented <strong>RESTful API</strong> endpoints for menu items, reservations, and user authentication
                with <strong>JWT token</strong> based security
              </li>
              <li>
                Utilized <strong>MongoDB</strong> for database operations and <strong>Express.js</strong> for
                server-side routing with optimized performance
              </li>
            </Project>

            <Project
              title="SMARTJOBBER"
              tech="React.js, Supabase, Tailwind CSS, JavaScript"
              githubLink="https://github.com/Sajal-12/smartjobber"
              demoLink="https://supabase.com/dashboard/project/qvrhegtdstcfpbhjvwsk"
            >
              <li>
                Developed a <strong>job application tracking system</strong> with <strong>Supabase</strong> for backend
                services including authentication and database operations
              </li>
              <li>
                Created an intuitive dashboard for users to <strong>track application status</strong>, set reminders,
                and organize job search activities
              </li>
              <li>
                Implemented <strong>real-time notifications</strong> and data synchronization using{" "}
                <strong>Supabase's realtime subscriptions</strong> for instant updates
              </li>
            </Project>
          </div>
        </Section>

        {/* Technical Skills Section */}
        <Section title="TECHNICAL SKILLS">
          <div className="space-y-2">
            <SkillRow
              title="Programming Languages:"
              skills="JavaScript, TypeScript, Java (Core, Advanced), Solidity, HTML, CSS"
            />
            <SkillRow
              title="Frameworks & Libraries:"
              skills="React.js, Node.js, Express.js, MongoDB, Next.js, Tailwind CSS, Material UI"
            />
            <SkillRow title="Development Tools:" skills="Git, GitHub, VS Code, Webpack, npm, Postman" />
            <SkillRow
              title="Technologies:"
              skills="RESTful APIs, GraphQL, Blockchain, Web Development, Google Cloud (Basics), Responsive Design"
            />
            <SkillRow
              title="Relevant Coursework:"
              skills="Data Structures & Algorithms, Object-Oriented Programming, Database Management Systems"
            />
          </div>
        </Section>

        {/* Achievements Section */}
        <Section title="ACHIEVEMENTS">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Open Source Contributor with <strong>250+ Contributions</strong> and <strong>70+ Repositories</strong> on
              GitHub
            </li>
            <li>Technical Content Creator specializing in Web Development and AI topics on Medium</li>
            <li>
              Technical Team Lead and Student Coordinator at <strong>Hackoverflow Society</strong>
            </li>
            <li>
              Secured Gold Medal in Interstate <strong>Chess Championship</strong> (2019)
            </li>
          </ul>
        </Section>

        {/* Certifications Section */}
        <Section title="CERTIFICATIONS">
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Full Stack Web Development Certification</strong> - Udemy
            </li>
            <li>
              <strong>Google Cloud Platform Fundamentals Certification</strong>
            </li>
            <li>
              <strong>Enterprise Blockchain Development Certification</strong> - SimpliLearn
            </li>
            <li>
              <strong>AI Tools and Prompt Engineering Workshop Certification</strong> - be10x
            </li>
          </ul>
        </Section>
      </CardContent>
    </Card>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-bold mb-3 pb-1 border-b-2 border-gray-300">{title}</h2>
      <div className="mt-2">{children}</div>
    </section>
  )
}

function Project({
  title,
  tech,
  githubLink,
  demoLink,
  children,
}: {
  title: string
  tech: string
  githubLink: string
  demoLink: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="font-semibold flex items-center gap-2">
          {title}
          <span className="text-gray-500 font-normal">|</span>
          <span className="text-gray-600 font-normal text-sm">{tech}</span>
        </div>
        <div className="flex gap-2 mt-1 md:mt-0">
          <Link
            href={githubLink}
            className="text-gray-700 hover:text-gray-900 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Repository"
          >
            <Github size={16} />
          </Link>
          <Link
            href={demoLink}
            className="text-blue-600 hover:text-blue-800 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Live Demo"
          >
            <ExternalLink size={16} />
          </Link>
        </div>
      </div>
      <ul className="list-disc pl-5 mt-1 space-y-1">{children}</ul>
    </div>
  )
}

function SkillRow({ title, skills }: { title: string; skills: string }) {
  return (
    <div className="flex flex-col md:flex-row">
      <span className="font-semibold min-w-[200px]">{title}</span>
      <span className="text-gray-700">{skills}</span>
    </div>
  )
}
