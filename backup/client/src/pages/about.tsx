import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  LocateFixed,
  Users,
  Coins,
  Target,
  Globe,
  Shield,
  MessageSquare,
  Brain,
  Vote,
  Workflow,
  Milestone,
  CheckCircle2,
  Clock,
  FileText,
  Rocket,
  Gauge
} from "lucide-react";

const features = [
  {
    icon: <LocateFixed className="h-8 w-8" />,
    title: "Real-time Location Based",
    description: "Automatic recommendations for restaurants, cafes, and events within 500m-1km"
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Auto Group Chat",
    description: "Instant communication channels created upon arrival at recommended locations"
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "Dual Curation",
    description: "Personalized content through AI and human curators"
  },
  {
    icon: <Vote className="h-8 w-8" />,
    title: "Community Decisions",
    description: "New locations and events determined by user votes"
  }
];

const techStack = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: "BNB Chain",
    description: "Secure and efficient blockchain technology for token operations"
  },
  {
    icon: <Workflow className="h-8 w-8" />,
    title: "Real-time Processing",
    description: "Firebase-based real-time data processing system"
  }
];

const longRoadmapText = `
The JAVURO project progresses systematically according to a phased roadmap within achievable parameters, strategically connecting technical development, community building, Web3 functionality integration, and ecosystem expansion.

Q2 2025:
The JAVURO utility token JXRO has been developed through smart contract technology, with the comprehensive platform utility structure finalized. This period marks the beginning of systematic planning for technical documentation enhancement, MVP design planning, and ecosystem development strategies. Technical requirement definitions for digital hub and application architecture design have commenced.

Q3 2025:
The release of official technical documentation will transparently share the project's vision, design structure, and platform mechanics with the global community and partners. The application prototype undergoes comprehensive redesign, with user experience-focused interface improvements and Web3 functionality integration planning (including wallet connectivity and participation recognition systems) moving forward. The structuring of platform community interaction flows and initial contribution-based community models begins to take shape.

Q4 2025:
The initial user participation system will be released in beta form, experimentally implementing community contribution recognition structures and curation features. The contributor-centered content ecosystem planning becomes more visible, with the platform simultaneously conducting feature enhancements and UX refinements based on real user feedback. Feedback collection systems are designed concurrently, laying the groundwork for community input channels.

Q1 2026:
The initial version of the Web3-centered digital ecosystem system is implemented, with participation features, premium functionality, and on-chain feedback structures being applied sequentially. The application transitions to an official release version, strengthening user-centered interface stability and community-based operational structures. Additionally, pilot events for connecting online and offline communities are planned, initiating participatory brand experiences.

Q2 2026:
JAVURO enters a dedicated user base expansion strategy, with multi-language and multi-cultural UX design reflected in recommendation engine enhancements. User-generated content (UGC) features are introduced, with location registration, reviews, and video content being integrated with recognition structures for creative contribution activities. These content systems operate based on community autonomy and trust-based evaluation structures.

H2 2026 and Beyond:
The platform gradually evolves with enhanced community participation features. Token holders and community contributors can propose and provide input on key platform policies within the feedback structure, with community budget systems being introduced to expand from an operator-centered structure to a community-based participation framework. In the long term, the vision is for growth into a Web3 application with real-time recommendation and participation-based practical use features.

Roadmap Notice:
This development timeline may be flexibly adjusted according to internal implementation schedules and external environmental changes. The JAVURO team is committed to technical excellence and community trust, promising responsible implementation of each milestone.
`;

const roadmapPhases = [
  {
    icon: <FileText className="h-8 w-8" />,
    phase: "Phase 1",
    title: "Technical Foundation",
    timeline: "Q2 2025",
    status: "In Progress",
    activities: [
      "Platform utility architecture development",
      "Technical documentation enhancement",
      "Digital hub technical planning",
      "Application architecture and MVP design"
    ]
  },
  {
    icon: <Users className="h-8 w-8" />,
    phase: "Phase 2",
    title: "Community Framework",
    timeline: "Q3 2025",
    status: "Scheduled",
    activities: [
      "Technical documentation public release",
      "User experience interface enhancement",
      "Platform participation system planning",
      "Community interaction framework design"
    ]
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    phase: "Phase 3",
    title: "Participation Systems",
    timeline: "Q4 2025",
    status: "Scheduled",
    activities: [
      "Beta release of platform participation features",
      "Community contribution recognition implementation",
      "User feedback collection mechanisms",
      "Feature enhancements based on community input"
    ]
  },
  {
    icon: <Gauge className="h-8 w-8" />,
    phase: "Phase 4",
    title: "Feature Enhancement",
    timeline: "Q1 2026",
    status: "Scheduled",
    activities: [
      "Premium functionality implementation",
      "Digital ecosystem integration",
      "Community feedback system enhancements",
      "Official application release preparation"
    ]
  },
  {
    icon: <Globe className="h-8 w-8" />,
    phase: "Phase 5",
    title: "Global Expansion",
    timeline: "Q2 2026",
    status: "Scheduled",
    activities: [
      "Multi-language and cultural adaptation",
      "User-generated content feature introduction",
      "Advanced recommendation system implementation",
      "Cross-platform community connection features"
    ]
  },
  {
    icon: <Users className="h-8 w-8" />,
    phase: "Phase 6",
    title: "Advanced Community Features",
    timeline: "H2 2026",
    status: "Planned",
    activities: [
      "Enhanced community participation systems",
      "Advanced content creation and sharing tools",
      "Expanded platform utility features",
      "Long-term platform sustainability initiatives"
    ]
  }
];

export default function About() {
  return (
    <div className="bg-background">
      <main className="container mx-auto px-4 py-20">
        {/* Project Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About JAVURO
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            An innovative Web3 platform building a community-driven ecosystem through real-time location-based recommendations and token economics
          </p>
        </motion.div>

        {/* Core Features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm hover:border-[#3A86FF]/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 text-[#3A86FF]">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Brand Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Brand Story</h2>
              <div className="space-y-6 text-muted-foreground">
                <p>
                  JAVURO was born from the value of spontaneous experiences and connections. While existing location-based 
                  apps focused solely on information provision, we introduced 'instant communication' and 'community-driven 
                  decision' systems to reflect users' desires for new experiences.
                </p>
                <p>
                  The name "JAVURO" embodies our core philosophy—combining spontaneous journey ('JA' from Journey) with 
                  innovative experience and connection ('X' representing the crossing point where users meet). Our name 
                  captures the essence of our platform: an instant journey (Journey) that connects (X-Connect) users 
                  through real-time, location-based experiences.
                </p>
                <p>
                  Through our futuristic and minimal design, powerful color combination of neon blue and coral orange, 
                  and logo design emphasizing 'X', we express the aesthetics of the Web3 era while reinforcing our 
                  mission of creating meaningful connections.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Vision and Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Vision and Mission</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Vision</h3>
                  <p className="text-muted-foreground">
                    To grow into a global Web3 platform where users can enjoy spontaneous and innovative 
                    experiences anywhere in the world, building a new digital ecosystem where users are 
                    connected and rewarded in real-time.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Mission</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Provide optimal experiences through real-time location-based recommendations</li>
                    <li>• Let communities determine platform direction through voting</li>
                    <li>• Build sustainable ecosystem through hybrid token system and fair rewards</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tech Stack */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm hover:border-[#3A86FF]/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="mb-4 text-[#3A86FF]">{tech.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{tech.title}</h3>
                  <p className="text-muted-foreground">{tech.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Community and Governance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Community and Governance</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Participatory System</h3>
                  <p className="text-muted-foreground">
                    Users can go beyond just consuming content to propose and vote on locations and events.
                    Community voting reflects user opinions on important decisions such as new features,
                    regional expansion, and event selection.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-4">Future Plans</h3>
                  <p className="text-muted-foreground">
                    In the long term, we plan to introduce DAO (Decentralized Autonomous Organization) 
                    governance, creating an environment where users can directly participate in platform 
                    operation and development direction.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Development Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-card/50 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Development Roadmap</h2>
              <p className="text-center mb-10 text-muted-foreground max-w-3xl mx-auto">
                Our anticipated platform development timeline outlines the planned evolution of JAVURO.
                Note that all timelines are subject to change based on technological advancements, 
                regulatory developments, and community feedback.
              </p>
              
              {/* Timeline with vertical connector */}
              <div className="relative">
                {/* Vertical line connector */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#3A86FF] to-[#FF6F61] rounded-full"></div>
                
                {/* Timeline phases */}
                <div className="space-y-24 relative">
                  {roadmapPhases.map((phase, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      className={`flex items-start gap-8 relative ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                    >
                      {/* Content card */}
                      <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                        <div className={`p-6 bg-card/70 backdrop-blur-md rounded-lg border border-gray-800 shadow-lg ${index % 2 === 0 ? 'ml-auto' : 'mr-auto'}`}>
                          <div className={`mb-4 text-[#3A86FF] ${index % 2 === 0 ? 'ml-auto' : ''}`}>{phase.icon}</div>
                          <div className={`flex items-center mb-1 ${index % 2 === 0 ? 'justify-between' : 'flex-row-reverse justify-between'}`}>
                            <h4 className="text-lg font-semibold text-[#FF6F61]">{phase.phase} - {phase.timeline}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${index % 2 === 0 ? 'ml-2' : 'mr-2'}
                              ${phase.status === 'Completed' ? 'bg-green-500/20 text-green-400' : 
                                phase.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' : 
                                'bg-gray-500/20 text-gray-400'}`}
                            >
                              {phase.status === 'Completed' ? '✓ Completed' : 
                                phase.status === 'In Progress' ? '→ In Progress' : 
                                '⧖ Scheduled'}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                          <ul className={`space-y-2 text-sm text-muted-foreground ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                            {phase.activities.map((activity, actIndex) => (
                              <li key={actIndex} className="flex items-start gap-2">
                                <span className={`text-xs rounded-full px-2 py-1 bg-[#3A86FF]/10 text-[#3A86FF] ${index % 2 === 0 ? 'ml-auto order-2' : ''}`}>
                                  {actIndex + 1}
                                </span>
                                <span className={index % 2 === 0 ? 'order-1' : ''}>{activity}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      {/* Center milestone circle */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-r from-[#3A86FF] to-[#FF6F61] flex items-center justify-center z-10">
                        <div className="text-white font-bold">{index + 1}</div>
                      </div>
                      
                      {/* Empty space for the other side */}
                      <div className="w-1/2"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="mt-16 p-4 bg-gray-900/30 rounded-lg text-sm text-muted-foreground">
                <p className="font-medium mb-2">Disclaimer:</p>
                <p>This development roadmap is for informational purposes only and represents current intentions which may be altered based on multiple factors including technological challenges, regulatory requirements, or market conditions. The roadmap does not constitute any binding commitment and should not be relied upon for any specific feature implementation or timing.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}