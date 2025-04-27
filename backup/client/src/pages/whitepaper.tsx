import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Languages, 
  History,
  ScrollText,
  MapPin,
  MessageSquare,
  Users,
  Coins
} from "lucide-react";

// 백서 버전에 대한 타입 정의
interface WhitepaperVersion {
  version: string;
  date: string;
  language: string;
  fileName?: string;
  directDownloadUrl: string;
  embeddedViewUrl: string;
  fallbackViewUrl: string;
}

/**
 * 백서 버전 정보
 * 
 * 각 환경에 맞는 4가지 URL 형태를 제공:
 * 1. localFileName: 로컬 개발환경에서 사용할 파일 이름
 * 2. directDownloadUrl: 절대 경로로 배포 환경에서 직접 다운로드할 URL
 * 3. embeddedViewUrl: iframe에 직접 표시할 수 있는 URL (Google Drive PDF Viewer 사용)
 * 4. fallbackViewUrl: 대체 뷰어 URL (재시도용)
 */
// 백서 기본 정보 정의
const whitepaperInfo = {
  version: "v0.3.1",
  date: "April 2025",
  language: "English",
  fileName: "JAVURO Whitepaper EN 0.3.1.pdf"
};

const whitepaperSections = [
  {
    icon: <FileText className="h-8 w-8" />,
    title: "Project Overview",
    description: "Comprehensive overview of JAVURO's vision to combine real-time location-based services with Web3 functionality"
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    title: "Location-Based Platform",
    description: "Real-time recommendation system for places within 500m-1km radius, personalized by AI algorithms and human curation"
  },
  {
    icon: <MessageSquare className="h-8 w-8" />,
    title: "Ephemeral Group Chat",
    description: "Automatic creation of temporary group chats when users arrive at recommended locations, enabling real-time interaction"
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Community Governance",
    description: "User-driven platform development through voting mechanisms and community participation in decision-making"
  },
  {
    icon: <Coins className="h-8 w-8" />,
    title: "JXRO Token Economy",
    description: "BNB Chain-based utility token functions, distribution structure, and reward mechanisms within the platform"
  },
  {
    icon: <Languages className="h-8 w-8" />,
    title: "Technical Architecture",
    description: "Detailed explanation of the platform's infrastructure, including dual curation system and Web3 integration"
  },
  {
    icon: <History className="h-8 w-8" />,
    title: "Development Roadmap",
    description: "Phased implementation plan from 2025 through 2026 with key milestones and technical deliverables"
  }
];

export default function Whitepaper() {
  const [whitepaperVersions, setWhitepaperVersions] = useState<WhitepaperVersion[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // 클라이언트 사이드에서만 실행
    if (typeof window === 'undefined') return;
    
    // 실행 환경에 따라 다른 URL 구조 사용 (개발용/프로덕션용)
    const isProduction = import.meta.env.PROD;
    const baseUrl = isProduction ? "https://javuro.com" : window.location.origin;
    
    // PDF 파일 경로
    const pdfPath = `/docs/${encodeURIComponent(whitepaperInfo.fileName)}`;
    
    // 백서 파일 URL 설정
    const versions: WhitepaperVersion[] = [{
      version: whitepaperInfo.version,
      date: whitepaperInfo.date,
      language: whitepaperInfo.language,
      directDownloadUrl: `${baseUrl}${pdfPath}`,
      embeddedViewUrl: `https://docs.google.com/viewer?url=${encodeURIComponent(`${baseUrl}${pdfPath}`)}&embedded=true`,
      fallbackViewUrl: `${baseUrl}${pdfPath}`
    }];
    
    setWhitepaperVersions(versions);
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="bg-background">
      <main className="container mx-auto px-4 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            JAVURO Whitepaper
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive overview of the JAVURO platform's vision, technical architecture, 
            real-time location-based features, and JXRO token economy
          </p>
        </motion.div>

        {/* Whitepaper Download Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-[#3A86FF]/10 to-[#FF6F61]/10 backdrop-blur-sm border-gray-800">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="inline-block p-4 rounded-full bg-[#3A86FF]/20 mb-4">
                  <FileText className="h-10 w-10 text-[#3A86FF]" />
                </div>
                <h2 className="text-3xl font-bold mb-2">Whitepaper</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Access the complete whitepaper detailing JAVURO's real-time location-based features, 
                  ephemeral group chat system, community governance, and BNB Chain-based JXRO token utility.
                </p>
              </div>

              <div className="grid md:grid-cols-1 gap-6 max-w-xl mx-auto">
                {isLoaded && whitepaperVersions.length > 0 ? (
                  whitepaperVersions.map((doc, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >
                      <Card className="bg-card/70 backdrop-blur-md border-gray-800 hover:border-[#3A86FF]/50 transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center mb-4">
                            <div>
                              <h3 className="text-xl font-semibold">{doc.language}</h3>
                              <p className="text-sm text-muted-foreground">Version {doc.version} • {doc.date}</p>
                            </div>
                            <div className="text-[#3A86FF]">
                              <FileText className="h-6 w-6" />
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button 
                              className="flex-1 bg-gradient-to-r from-[#3A86FF] to-[#FF6F61]/80"
                              onClick={() => {
                                // 절대 URL 사용 (Netlify 배포 환경에서 안정적으로 작동)
                                window.open(doc.directDownloadUrl, '_blank');
                              }}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download PDF
                            </Button>
                            <Button 
                              className="flex-1 bg-gradient-to-r from-[#FF6F61] to-[#3A86FF]/80"
                              onClick={() => {
                                // 내장형 PDF 뷰어 페이지로 같은 창에서 이동
                                window.location.href = `/embedded-pdf?url=${encodeURIComponent(doc.directDownloadUrl)}`;
                              }}
                            >
                              <FileText className="mr-2 h-4 w-4" />
                              View Online
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                ) : (
                  <div className="flex items-center justify-center p-8 w-full">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-4 border-t-[#3A86FF] border-r-[#FF6F61] border-b-[#3A86FF] border-l-[#FF6F61] rounded-full animate-spin"></div>
                      <p className="text-muted-foreground text-sm">Loading whitepaper...</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Whitepaper Content Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Whitepaper Content</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {whitepaperSections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm hover:border-[#3A86FF]/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4 text-[#3A86FF]">{section.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                    <p className="text-muted-foreground">{section.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="bg-gray-900/30 backdrop-blur-sm border-gray-800">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-3">Important Notice</h3>
              <p className="text-sm text-muted-foreground mb-3">
                This whitepaper is presented for informational purposes only. It describes 
                the JAVURO platform's vision, functionality, and planned technical developments.
                The JXRO token is a utility token designed for use within the JAVURO ecosystem.
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                The document does not constitute any form of investment advice, solicitation, or 
                offer to buy or sell any financial instruments. JXRO is not an investment product, 
                security, or financial instrument. Implementation details and timelines described 
                are subject to change based on technological developments, regulatory considerations, 
                and other factors.
              </p>
              <div className="flex items-center justify-center mt-4 pt-3 border-t border-gray-800">
                <p className="text-sm text-muted-foreground">
                  For technical documentation inquiries: <a href="mailto:support@javuro.com" className="text-[#3A86FF] hover:underline">support@javuro.com</a>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}