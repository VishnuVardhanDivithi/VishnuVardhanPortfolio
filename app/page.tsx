"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Menu,
  X,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Code,
  Database,
  Cpu,
  Award,
  GraduationCap,
  Briefcase,
  Send,
  User,
  Calendar,
  Star,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

interface EmailResponse {
  success?: boolean
  message?: string
  error?: string
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({})
  const [buttonStates, setButtonStates] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "-80px 0px -50% 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    // Visual feedback for navigation buttons
    setButtonStates((prev) => ({ ...prev, [sectionId]: true }))

    const element = document.getElementById(sectionId)
    if (element) {
      // Calculate offset for fixed header
      const headerOffset = 64 // Changed from 80 to 64
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })

      setActiveSection(sectionId)
      setIsMenuOpen(false)

      // Reset button state after animation
      setTimeout(() => {
        setButtonStates((prev) => ({ ...prev, [sectionId]: false }))
      }, 300)
    }
  }

  const handleExternalLink = (url: string, buttonId: string) => {
    // Visual feedback for external link buttons
    setButtonStates((prev) => ({ ...prev, [buttonId]: true }))

    try {
      window.open(url, "_blank", "noopener,noreferrer")
    } catch (error) {
      console.error("Failed to open link:", error)
    }

    // Reset button state
    setTimeout(() => {
      setButtonStates((prev) => ({ ...prev, [buttonId]: false }))
    }, 300)
  }

  const handleEmailClick = () => {
    setButtonStates((prev) => ({ ...prev, email: true }))

    const subject = encodeURIComponent("Portfolio Contact")
    const body = encodeURIComponent("Hi Vishnu,\n\nI found your portfolio and would like to connect.\n\nBest regards,")
    const mailtoUrl = `mailto:vishnuvardhandivithi9550@gmail.com?subject=${subject}&body=${body}`

    try {
      window.location.href = mailtoUrl
    } catch (error) {
      console.error("Failed to open email client:", error)
      // Fallback: copy email to clipboard
      navigator.clipboard?.writeText("vishnuvardhandivithi9550@gmail.com")
    }

    setTimeout(() => {
      setButtonStates((prev) => ({ ...prev, email: false }))
    }, 300)
  }

  const handlePhoneClick = () => {
    setButtonStates((prev) => ({ ...prev, phone: true }))

    try {
      window.location.href = "tel:+919550295760"
    } catch (error) {
      console.error("Failed to initiate phone call:", error)
      // Fallback: copy phone number to clipboard
      navigator.clipboard?.writeText("+91 9550295760")
    }

    setTimeout(() => {
      setButtonStates((prev) => ({ ...prev, phone: false }))
    }, 300)
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "internships", label: "Internships" },
    { id: "extracurricular", label: "Extracurricular" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <button
                onClick={() => scrollToSection("home")}
                className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
              >
                Vishnu Vardhan
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeSection === item.id
                        ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:scale-105"
                    }`}
                    style={{ textDecoration: 'none' }}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-blue-50 transition-colors"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  disabled={buttonStates[item.id]}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-200 disabled:opacity-70 ${
                    activeSection === item.id
                      ? "text-white bg-gradient-to-r from-blue-600 to-indigo-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-16 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        {/* Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="">
            <div className="mb-8">
              {/* Profile Photo */}
              <div className="w-40 h-40 mx-auto mb-8 relative">
                <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 p-1 shadow-2xl">
                  <img
                    src="myphoto.png"
                    alt="Vishnu Vardhan Divithi"
                    className="w-full h-full rounded-full object-cover bg-white"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">👋</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-4 leading-tight">
                Hi, I'm{" "}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Vishnu Vardhan
                </span>
              </h1>
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-6">
                Computer Science & Engineering Student
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                Motivated undergraduate passionate about leveraging technology to solve real-world challenges.
                Experienced in software development with a focus on scalable solutions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a
                href="#projects"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group text-center"
                style={{ textDecoration: 'none' }}
              >
                View My Work <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform inline" />
              </a>
              <a
                href="#contact"
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 text-center"
                style={{ textDecoration: 'none' }}
              >
                Get In Touch
              </a>
              <a
                href="/Divithi_Vishnu_Vardhan_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 text-center"
                style={{ textDecoration: 'none' }}
              >
                My Resume
              </a>
            </div>

            <div className="flex justify-center space-x-8">
              <button
                onClick={handleEmailClick}
                disabled={buttonStates.email}
                className="text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:scale-110 disabled:opacity-70 disabled:scale-100"
                aria-label="Send email"
              >
                <Mail className="h-7 w-7" />
              </button>
              <button
                onClick={() => handleExternalLink("https://linkedin.com/in/vishnuvardhandivithi", "linkedin-hero")}
                disabled={buttonStates["linkedin-hero"]}
                className="text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:scale-110 disabled:opacity-70 disabled:scale-100"
                aria-label="Visit LinkedIn profile"
              >
                <Linkedin className="h-7 w-7" />
              </button>
              <button
                onClick={handlePhoneClick}
                disabled={buttonStates.phone}
                className="text-gray-600 hover:text-blue-600 transition-all duration-300 transform hover:scale-110 disabled:opacity-70 disabled:scale-100"
                aria-label="Call phone number"
              >
                <Phone className="h-7 w-7" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card className="bg-gradient-to-br from-white to-blue-50 border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Personal Info</h3>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  I'm a motivated undergraduate in Computer Science and Engineering with hands-on experience in software
                  development and problem-solving. I'm passionate about leveraging technology to solve real-world
                  challenges and am known for being adaptable and collaborative.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3 text-blue-600" />
                    <span className="font-medium">Hyderabad, Telangana</span>
                  </div>
                  <button
                    onClick={handlePhoneClick}
                    disabled={buttonStates.phone}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-70"
                  >
                    <Phone className="h-5 w-5 mr-3 text-blue-600" />
                    <span className="font-medium">+91 9550295760</span>
                  </button>
                  <button
                    onClick={handleEmailClick}
                    disabled={buttonStates.email}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors disabled:opacity-70"
                  >
                    <Mail className="h-5 w-5 mr-3 text-blue-600" />
                    <span className="font-medium">vishnuvardhandivithi9550@gmail.com</span>
                  </button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Star className="h-6 w-6 mr-3" />
                    <h3 className="text-xl font-semibold">Current Focus</h3>
                  </div>
                  <p className="text-blue-100">Java Development & AI/ML Applications</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-teal-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Award className="h-6 w-6 mr-3" />
                    <h3 className="text-xl font-semibold">Achievement</h3>
                  </div>
                  <p className="text-green-100">1.5K+ users reached through projects</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Code className="h-6 w-6 mr-3" />
                    <h3 className="text-xl font-semibold">Expertise</h3>
                  </div>
                  <p className="text-purple-100">Full-Stack Development & Problem Solving</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Education</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div className="space-y-6">
            <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      <GraduationCap className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          B.Tech in Computer Science & Engineering (AI/ML)
                        </h3>
                        <p className="text-blue-600 font-semibold text-lg">
                          Kalasalingam Academy of Research and Education
                        </p>
                        <p className="text-gray-600 mt-1">2022 – 2026</p>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2 mt-2 sm:mt-0">CGPA: 8.26</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">Intermediate (MPC)</h3>
                      <p className="text-green-600 font-semibold">Sri Chaitanya Junior College</p>
                      <Badge className="bg-green-100 text-green-800 mt-2">Score: 954/1000</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                      <GraduationCap className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">SSC</h3>
                      <p className="text-purple-600 font-semibold">ST Mary's High School</p>
                      <Badge className="bg-purple-100 text-purple-800 mt-2">CGPA: 10.0</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible.skills ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Technical Skills</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div
            className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${isVisible.skills ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Code className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Programming Languages</h3>
                <div className="space-y-3">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors text-lg px-4 py-2 mr-2 mb-2">
                    Java
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors text-lg px-4 py-2 mr-2 mb-2">
                    Python
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors text-lg px-4 py-2 mr-2 mb-2">
                    C
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-teal-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Database className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Tools & Technologies</h3>
                <div className="space-y-3">
                  <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors text-lg px-4 py-2 mr-2 mb-2">
                    Git
                  </Badge>
                  <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors text-lg px-4 py-2 mr-2 mb-2">
                    GitHub
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-50 to-red-100 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 group">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Cpu className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Interests</h3>
                <div className="space-y-3">
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors text-lg px-4 py-2 mr-2 mb-2">
                    Competitive Coding
                  </Badge>
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-200 transition-colors text-lg px-4 py-2 mr-2 mb-2">
                    AI/ML
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible.projects ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and passion for development
            </p>
          </div>

          <div
            className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-300 ${isVisible.projects ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white border-0 shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">C-Orbit</h3>
                  <p className="text-blue-100">Content Sharing Platform</p>
                </div>
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => handleExternalLink("https://kannected.onrender.com", "c-orbit-link")}
                    disabled={buttonStates["c-orbit-link"]}
                    className="text-white hover:text-blue-200 transition-colors transform hover:scale-110 disabled:opacity-70 disabled:scale-100"
                    aria-label="Visit C-Orbit project"
                  >
                    {buttonStates["c-orbit-link"] ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <ExternalLink className="h-6 w-6" />
                    )}
                  </button>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  A comprehensive content-sharing platform focused on privacy and scalability. Features responsive UI
                  design and secure content management with emphasis on user privacy.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
                    Privacy-Focused
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors">Scalable</Badge>
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors">
                    Responsive
                  </Badge>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-4">
                  <p className="font-semibold text-gray-900 mb-2">📊 Impact Metrics:</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-blue-600 font-bold text-lg">1.5K+</span>
                      <p className="text-gray-600">Unique Users</p>
                    </div>
                    <div>
                      <span className="text-indigo-600 font-bold text-lg">7K+</span>
                      <p className="text-gray-600">Total Views</p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => handleExternalLink("https://kannected.onrender.com", "c-orbit-button")}
                  disabled={buttonStates["c-orbit-button"]}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white disabled:opacity-70"
                >
                  {buttonStates["c-orbit-button"] ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <ExternalLink className="h-4 w-4 mr-2" />
                  )}
                  Visit Project
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white border-0 shadow-lg overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-green-400 to-teal-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">PARK'N RIDE</h3>
                  <p className="text-green-100">Smart Parking Solution</p>
                </div>
              </div>
              <CardContent className="p-6">
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Innovative smart parking solution featuring real-time slot booking and integrated payment system.
                  Designed to reduce urban congestion and improve smart city infrastructure.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 transition-colors">
                    Real-time
                  </Badge>
                  <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 transition-colors">Smart Cities</Badge>
                  <Badge className="bg-indigo-100 text-indigo-800 hover:bg-indigo-200 transition-colors">
                    Payment Integration
                  </Badge>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg mb-4">
                  <p className="font-semibold text-gray-900 mb-2">🎯 Key Features:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Real-time slot availability</li>
                    <li>• Integrated payment system</li>
                    <li>• Urban congestion reduction</li>
                  </ul>
                </div>
                <Button disabled className="w-full bg-gray-400 text-white cursor-not-allowed">
                  <Code className="h-4 w-4 mr-2" />
                  In Development
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Internships Section */}
      <section id="internships" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible.internships ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Internships</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div
            className={`space-y-8 transition-all duration-1000 delay-300 ${isVisible.internships ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Card className="bg-gradient-to-r from-white to-purple-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                      <Briefcase className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Software Engineer Intern</h3>
                        <p className="text-purple-600 font-semibold text-lg">YugaYatra Retail (OPC) Pvt. Ltd.</p>
                      </div>
                      <div className="flex items-center text-gray-600 mt-2 sm:mt-0">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="font-medium">July 2025 – September 2025 | Remote</span>
                      </div>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <span>
                          Developed a web application using Cursor AI, Firebase Studio, and Canva for real-world
                          freelancing projects
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <span>
                          Collaborated with team members via Google Workspace on content creation and UI/UX workflows
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <span>
                          Executed client-facing projects via Upwork, gaining hands-on experience with freelancing
                          delivery cycles and technical requirements
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-white to-blue-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      <Briefcase className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Java Developer Intern</h3>
                        <p className="text-blue-600 font-semibold text-lg">Elevate Labs</p>
                      </div>
                      <div className="flex items-center text-gray-600 mt-2 sm:mt-0">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="font-medium">June 2025 – Present</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4 italic">
                      Elevate Labs is a leading technology company focused on innovative software solutions and digital
                      transformation services.
                    </p>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <span>
                          Java-based application development and debugging with focus on performance optimization
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <span>Applied Object-Oriented Programming principles and design patterns</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <span>Implemented clean code practices and industry best practices</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Extracurricular Section */}
      <section id="extracurricular" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible.extracurricular ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Extracurricular Activities</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
              Leadership roles and community involvement that have enhanced my collaborative and organizational skills
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-300 ${isVisible.extracurricular ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Card className="bg-gradient-to-r from-white to-green-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Java Expert</h3>
                        <button
                          onClick={() =>
                            handleExternalLink("https://www.linkedin.com/company/csi-kare/", "csi-kare-link")
                          }
                          disabled={buttonStates["csi-kare-link"]}
                          className="text-green-600 font-semibold text-lg hover:text-green-700 transition-colors disabled:opacity-70 text-left"
                        >
                          Computer Society of India – KARE Chapter
                          {buttonStates["csi-kare-link"] ? (
                            <Loader2 className="h-4 w-4 ml-2 inline animate-spin" />
                          ) : (
                            <ExternalLink className="h-4 w-4 ml-2 inline" />
                          )}
                        </button>
                      </div>
                      <div className="flex items-center text-gray-600 mt-2 sm:mt-0">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="font-medium">September 2024 – Present</span>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="flex items-center mb-3">
                        <Star className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-semibold text-gray-900">Key Responsibilities & Achievements:</span>
                      </div>
                    </div>

                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <span>
                          Worked closely with peers to organize coding competitions and tech events, improving teamwork
                          and coordination skills
                        </span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <span>Gained hands-on experience in designing Java challenges and debugging exercises</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                        <span>
                          Learned how to manage events effectively and contribute to a collaborative tech community
                        </span>
                      </li>
                    </ul>

                    <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Code className="h-5 w-5 text-green-600 mr-2" />
                        <span className="font-semibold text-gray-900">Skills Developed:</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200 transition-colors">
                          Event Management
                        </Badge>
                        <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200 transition-colors">
                          Team Leadership
                        </Badge>
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors">
                          Java Expertise
                        </Badge>
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors">
                          Community Building
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${isVisible.certifications ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Certifications</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          </div>

          <div
            className={`grid md:grid-cols-2 gap-8 transition-all duration-1000 delay-300 ${isVisible.certifications ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Career Essentials in Software Development</h3>
                    <p className="text-blue-600 font-semibold text-lg">Microsoft & LinkedIn</p>
                    <p className="text-gray-600 mt-2 mb-4">
                      Comprehensive certification covering software development fundamentals and industry best
                      practices.
                    </p>
                    <Button
                      onClick={() =>
                        handleExternalLink(
                          "https://www.linkedin.com/learning/certificates/5a3890753c5b9a662b9e627729ad4f2a958a0b7ee1db668e698fedab23fbe046?trk=share_certificate",
                          "cert-career-essentials",
                        )
                      }
                      disabled={buttonStates["cert-career-essentials"]}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-sm px-4 py-2 disabled:opacity-70"
                    >
                      {buttonStates["cert-career-essentials"] ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <ExternalLink className="h-4 w-4 mr-2" />
                      )}
                      View Certificate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
              <CardContent className="p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Java Programming</h3>
                    <p className="text-green-600 font-semibold text-lg">Great Learning</p>
                    <p className="text-gray-600 mt-2">
                      Advanced Java programming certification covering OOP concepts, data structures, and application
                      development.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto">
          <div
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Get In Touch</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 mt-6 max-w-2xl mx-auto">
              Ready to collaborate? Let's discuss your next project or just connect over technology.
            </p>
          </div>

          <div
            className=""
          >
            {/* Quick Contact Options */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Email Me</h3>
                  <p className="text-gray-600 text-sm mb-4">Quick response guaranteed</p>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=vishnuvardhandivithi9550@gmail.com&su=Portfolio%20Contact&body=Hi%20Vishnu,%0A%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20connect.%0A%0ABest%20regards,"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-md shadow-lg transition-all duration-300"
                    style={{ textDecoration: 'none' }}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Call Me</h3>
                  <p className="text-gray-600 text-sm mb-4">Let's talk directly</p>
                  <Button
                    onClick={handlePhoneClick}
                    disabled={buttonStates.phone}
                    className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white disabled:opacity-70"
                  >
                    {buttonStates.phone ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Phone className="h-4 w-4 mr-2" />
                    )}
                    Call Now
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Linkedin className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">LinkedIn</h3>
                  <p className="text-gray-600 text-sm mb-4">Professional networking</p>
                  <Button
                    onClick={() =>
                      handleExternalLink("https://linkedin.com/in/vishnuvardhandivithi", "linkedin-contact-card")
                    }
                    disabled={buttonStates["linkedin-contact-card"]}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white disabled:opacity-70"
                  >
                    {buttonStates["linkedin-contact-card"] ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Linkedin className="h-4 w-4 mr-2" />
                    )}
                    Connect
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info Footer */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 mb-4">Prefer direct contact?</p>
                <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8">
                  <button
                    onClick={handleEmailClick}
                    disabled={buttonStates.email}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors disabled:opacity-70"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    <span className="font-medium">vishnuvardhandivithi9550@gmail.com</span>
                  </button>
                  <button
                    onClick={handlePhoneClick}
                    disabled={buttonStates.phone}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition-colors disabled:opacity-70"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    <span className="font-medium">+91 9550295760</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-6">
            <button
              onClick={() => scrollToSection("home")}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2 hover:scale-105 transition-transform duration-200"
            >
              Vishnu Vardhan Divithi
            </button>
            <p className="text-gray-400">Computer Science & Engineering Student</p>
          </div>
          <div className="flex justify-center space-x-6 mb-6">
            <button
              onClick={handleEmailClick}
              disabled={buttonStates.email}
              className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110 disabled:opacity-70 disabled:scale-100"
              aria-label="Send email"
            >
              <Mail className="h-6 w-6" />
            </button>
            <button
              onClick={() => handleExternalLink("https://linkedin.com/in/vishnuvardhandivithi", "linkedin-footer")}
              disabled={buttonStates["linkedin-footer"]}
              className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110 disabled:opacity-70 disabled:scale-100"
              aria-label="Visit LinkedIn profile"
            >
              <Linkedin className="h-6 w-6" />
            </button>
            <button
              onClick={handlePhoneClick}
              disabled={buttonStates.phone}
              className="text-gray-400 hover:text-blue-400 transition-colors transform hover:scale-110 disabled:opacity-70 disabled:scale-100"
              aria-label="Call phone number"
            >
              <Phone className="h-6 w-6" />
            </button>
          </div>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-400">© 2025 Vishnu Vardhan Divithi</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
