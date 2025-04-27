import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Mail, 
  ShieldCheck, 
  Clock, 
  Share2, 
  UserCheck, 
  Lock,
  Cookie,
  Users,
  Globe,
  Phone,
  Info
} from "lucide-react";

export default function Privacy() {
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
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Effective Date: April 2025
          </p>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            This Privacy Policy outlines how JAVURO ("we", "our", or "the project") collects, uses, stores, and protects your personal information.
            By using our website or platform, you agree to the terms outlined below.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Info className="mr-2 h-6 w-6 text-[#3A86FF]" />
                1. Information We Collect
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We may collect the following types of information:</p>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Mandatory:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Email address</li>
                    <li>Wallet address</li>
                    <li>IP address</li>
                    <li>Basic technical information (browser, device type)</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Optional:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Name</li>
                    <li>Contact details</li>
                    <li>Social media account (if submitted voluntarily)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <ShieldCheck className="mr-2 h-6 w-6 text-[#3A86FF]" />
                2. Purpose of Collection and Use
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We collect your information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide access to platform features</li>
                  <li>Verify users or prevent malicious activity</li>
                  <li>Respond to inquiries or support requests</li>
                  <li>Improve user experience and platform security</li>
                  <li>Fulfill legal or regulatory requirements</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Clock className="mr-2 h-6 w-6 text-[#3A86FF]" />
                3. Retention and Deletion of Information
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Your data will be retained only as long as necessary to fulfill the purposes outlined above.
                  When data is no longer needed, it will be securely deleted, except where retention is legally required.
                </p>
                <p className="bg-gray-800/30 p-4 rounded-md border border-gray-700">
                  We reserve the right to <span className="font-semibold">temporarily retain or withhold deletion</span> requests for legal, operational, or security-related reasons, for a period not exceeding the maximum allowed by applicable law.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Share2 className="mr-2 h-6 w-6 text-[#3A86FF]" />
                4. Data Sharing and Disclosure
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We do not sell or share your personal data with third parties, except in the following cases:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>With your explicit consent</li>
                  <li>If required by law, court order, or government authority</li>
                  <li>To trusted service providers under binding agreements</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <UserCheck className="mr-2 h-6 w-6 text-[#3A86FF]" />
                5. User Rights
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  You may request to access, correct, or delete your personal data.
                  Requests should be sent to <a href="mailto:support@javuro.com" className="text-[#3A86FF] hover:underline">support@javuro.com</a>.
                </p>
                <p>
                  We will respond to requests <span className="font-semibold">within the timeframe permitted by applicable law</span>, and may request additional verification before taking action.
                </p>
                <p className="bg-gray-800/30 p-4 rounded-md border border-gray-700">
                  In certain cases, we may <span className="font-semibold">lawfully deny or delay a request</span> to protect our platform integrity, comply with law enforcement obligations, or prevent fraudulent misuse.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Lock className="mr-2 h-6 w-6 text-[#3A86FF]" />
                6. Data Security Measures
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We implement commercially reasonable security measures to protect your personal data, including:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access control and encryption</li>
                  <li>Regular security audits</li>
                  <li>Use of third-party secure infrastructure</li>
                  <li>Internal staff training and limited access</li>
                </ul>
                <p className="italic">
                  However, no system is completely secure, and we cannot guarantee absolute protection from all threats.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Cookie className="mr-2 h-6 w-6 text-[#3A86FF]" />
                7. Cookies and Analytics
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We may use cookies and third-party analytics tools to understand usage behavior and improve the platform.
                  You can control cookie usage via your browser settings.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Users className="mr-2 h-6 w-6 text-[#3A86FF]" />
                8. Minors
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  This platform is not intended for individuals under the age of 18.
                  We do not knowingly collect personal information from children.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Globe className="mr-2 h-6 w-6 text-[#3A86FF]" />
                9. Jurisdiction and Updates
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  This Policy is governed by a neutral jurisdiction determined by the operator.
                  We reserve the right to amend this Policy at any time. Updates will be posted on this page, 
                  and continued use of the service constitutes acceptance of the changes.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Phone className="mr-2 h-6 w-6 text-[#3A86FF]" />
                10. Contact
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>If you have any questions or requests regarding this Privacy Policy, please contact:</p>
                <p className="flex items-center mt-2">
                  <Mail className="h-5 w-5 text-[#3A86FF] mr-2" />
                  <a href="mailto:support@javuro.com" className="text-[#3A86FF] hover:underline">support@javuro.com</a>
                </p>
                <p className="mt-2">
                  Please allow up to <span className="font-semibold">30 business days</span> for a full response.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
