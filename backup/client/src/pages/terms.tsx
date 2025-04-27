import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  BookOpen, 
  AlertTriangle, 
  FileText, 
  Shield, 
  UserCheck, 
  Briefcase, 
  Scale, 
  GanttChart, 
  Settings, 
  Phone,
  Lock,
  Check
} from "lucide-react";

export default function Terms() {
  return (
    <div className="bg-background">
      <main className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Terms of Use
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Effective Date: April 2025
          </p>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Welcome to JAVURO. By accessing or using our website, platform, or any related services, 
            you agree to be bound by the following terms and conditions ("Terms").
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <BookOpen className="mr-2 h-6 w-6 text-[#3A86FF]" /> 
                1. Definitions
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">• "Platform"</span> 
                    refers to the JAVURO website (https://javuro.com), applications, and all related services.
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">• "User"</span> 
                    refers to any individual or entity accessing or using the Platform.
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">• "JXRO"</span> 
                    refers to the utility token issued for functional use within the JAVURO ecosystem.
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">• "Content"</span> 
                    means all information, text, images, data, and other materials published on or through the Platform.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <UserCheck className="mr-2 h-6 w-6 text-[#3A86FF]" />
                2. Use of the Platform
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    Users must be at least 18 years old or of legal age in their jurisdiction.
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    Use of the Platform is at your own risk and discretion.
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    You agree not to use the Platform for unlawful, fraudulent, or malicious purposes, or to violate applicable laws and regulations.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Briefcase className="mr-2 h-6 w-6 text-[#3A86FF]" />
                3. Intellectual Property
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    All trademarks, content, and proprietary materials are owned or licensed by JAVURO.
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    Users may not copy, reproduce, distribute, or use any content without prior written consent, unless expressly permitted by law.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <AlertTriangle className="mr-2 h-6 w-6 text-[#3A86FF]" />
                4. No Financial or Legal Advice
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    Information provided on the Platform is for general informational purposes only.
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    Nothing on the Platform constitutes legal, investment, financial, or tax advice.
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    You are solely responsible for your own decisions and actions.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FileText className="mr-2 h-6 w-6 text-[#3A86FF]" />
                5. Token Disclaimer
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    JXRO is a digital utility token intended for platform-related functionality only.
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    It does not represent ownership, equity, profit rights, or claims against JAVURO.
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    The use or trading of JXRO may be subject to regional laws. Users must ensure compliance with local regulations.
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    JAVURO makes no guarantees regarding the value, liquidity, or future use of JXRO tokens.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Shield className="mr-2 h-6 w-6 text-[#3A86FF]" />
                6. User Responsibility
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    You agree to use the Platform in compliance with all applicable laws.
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    You are solely responsible for all activity under your wallet or account, and any damage caused through your actions or omissions.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Lock className="mr-2 h-6 w-6 text-[#3A86FF]" />
                7. Limitation of Liability
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>JAVURO and its affiliates are not liable for any direct, indirect, incidental, or consequential damages arising from:</p>
                <ul className="space-y-3 pl-6 list-disc">
                  <li>Use or inability to use the Platform</li>
                  <li>Loss of data, digital assets, or unauthorized access</li>
                  <li>Changes to services, smart contract failures, or third-party behavior</li>
                </ul>
                <p className="font-medium">Your use of the Platform is entirely at your own risk.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Settings className="mr-2 h-6 w-6 text-[#3A86FF]" />
                8. Service Modifications and Termination
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    We may modify, suspend, or terminate all or part of the Platform at any time without prior notice.
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    JAVURO has no liability for any discontinuation or loss of access to the Platform or associated services.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Scale className="mr-2 h-6 w-6 text-[#3A86FF]" />
                9. Jurisdiction and Governing Law
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    These Terms shall be governed and interpreted in accordance with the laws of a neutral international jurisdiction.
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    Any disputes shall be subject to the exclusive jurisdiction of a competent court designated by JAVURO.
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    Users waive any objection to venue or jurisdiction on the basis of convenience or conflict of laws.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <GanttChart className="mr-2 h-6 w-6 text-[#3A86FF]" />
                10. Updates and Revisions
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    These Terms may be updated at any time. The latest version will always be published at https://javuro.com/terms.
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-[#3A86FF] mt-1 mr-2 flex-shrink-0" />
                    Continued use of the Platform after updates constitutes acceptance of the revised Terms.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Phone className="mr-2 h-6 w-6 text-[#3A86FF]" />
                11. Contact
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>If you have any questions about these Terms, please contact us at:</p>
                <p className="flex items-center">
                  <span className="text-[#3A86FF] mr-2">📧</span>
                  support@javuro.com
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
