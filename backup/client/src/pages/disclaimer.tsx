import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, FileText, Shield, Scale, Wallet, BarChart, FileCode, Info } from "lucide-react";

export default function Disclaimer() {
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
            Legal Disclaimer
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Last Updated: April 2025
          </p>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            This document outlines the legal disclaimers applicable to the JAVURO project and the use of the JXRO token.<br />
            By accessing this website or referencing any materials related to JAVURO, you acknowledge and agree to the following:
          </p>
        </motion.div>

        {/* Quick Summary Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card className="bg-gradient-to-br from-black/60 to-[#3A86FF]/10 border-[#3A86FF]/20">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Info className="mr-2 h-6 w-6 text-[#3A86FF]" /> 
                Quick Summary (Key Points)
              </h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="flex items-start">
                  <span className="text-[#3A86FF] mr-2">1.</span> 
                  This document is for informational purposes only and does not constitute legal, financial, or investment advice.
                </p>
                <p className="flex items-start">
                  <span className="text-[#3A86FF] mr-2">2.</span> 
                  JXRO is a utility token and is not classified as a security, stock, or investment product.
                </p>
                <p className="flex items-start">
                  <span className="text-[#3A86FF] mr-2">3.</span> 
                  The project does not guarantee any value appreciation, returns, or income from holding the token.
                </p>
                <p className="flex items-start">
                  <span className="text-[#3A86FF] mr-2">4.</span> 
                  All token use and participation are subject to your local laws and your own responsibility.
                </p>
                <p className="flex items-start">
                  <span className="text-[#3A86FF] mr-2">5.</span> 
                  JAVURO is not liable for losses arising from technical failures, regulatory changes, or market conditions.
                </p>
                <p className="flex items-start">
                  <span className="text-[#3A86FF] mr-2">6.</span> 
                  Governance functions may be introduced in the future but hold no legal authority at this time.
                </p>
                <p className="flex items-start">
                  <span className="text-[#3A86FF] mr-2">7.</span> 
                  All future plans and projections are forward-looking and subject to change.
                </p>
                <p className="flex items-start">
                  <span className="text-[#3A86FF] mr-2">8.</span> 
                  Official information is only provided through designated channels.
                </p>
                <p className="flex items-start">
                  <span className="text-[#3A86FF] mr-2">9.</span> 
                  By using this information, you accept full responsibility for your actions.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Full Legal Disclaimer</h2>
          <p className="text-muted-foreground mb-10 text-center">
            The Whitepaper is provided for informational purposes only and does not constitute a binding agreement, 
            investment solicitation, financial advice, legal counsel, or an offer to sell financial instruments in any jurisdiction.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Wallet className="mr-2 h-6 w-6 text-[#3A86FF]" />
                1. Legal Nature of the Token
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  JXRO is a digital utility token intended for use within the JAVURO platform. It is not considered legal tender, a security, equity share, bond, derivative, or investment product.
                </p>
                <p>
                  Ownership of JXRO does not grant rights to dividends, profit-sharing, voting, or any claim on the platform's assets or operations.
                </p>
                <p>
                  JXRO may be traded or exchanged on external platforms or marketplaces; however, such transactions occur outside the direct control of the project.
                  The legal treatment and applicability of such trading may vary depending on regional laws and are the sole responsibility of the user.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FileText className="mr-2 h-6 w-6 text-[#3A86FF]" />
                2. Non-Binding and Subject to Change
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  All plans, metrics, projections, and roadmap items presented in this document are based on current assumptions and are subject to change without prior notice.
                </p>
                <p>
                  JAVURO does not guarantee the accuracy, completeness, or timeliness of any information contained herein.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Shield className="mr-2 h-6 w-6 text-[#3A86FF]" />
                3. Limitation of Liability
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Any decision made based on this document is the sole responsibility of the user.
                </p>
                <p>
                  JAVURO, its affiliates, team members, and associated entities shall not be held liable for direct, indirect, incidental, consequential, or any form of damages resulting from the use of this document or related materials.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Scale className="mr-2 h-6 w-6 text-[#3A86FF]" />
                4. Regulatory Compliance
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Users are responsible for ensuring that their use, acquisition, or trading of JXRO complies with the laws and regulations applicable in their jurisdiction.
                </p>
                <p>
                  JAVURO does not provide legal or tax advice and assumes no liability for users' compliance with applicable laws.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <AlertTriangle className="mr-2 h-6 w-6 text-[#3A86FF]" />
                5. Risk Disclosure
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  JXRO and the JAVURO platform are subject to various risks, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Smart contract bugs or vulnerabilities</li>
                  <li>Blockchain network instability or high transaction costs</li>
                  <li>Cybersecurity threats including hacks and phishing</li>
                  <li>Regulatory and policy changes</li>
                  <li>Development delays or technical failures</li>
                  <li>Market volatility or liquidity issues</li>
                </ul>
                <p>
                  Users must fully understand and accept these risks before engaging with the project.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <FileCode className="mr-2 h-6 w-6 text-[#3A86FF]" />
                6. Governance and DAO Disclaimer
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  While the project may introduce decentralized governance (DAO) features in the future,
                  such features are currently experimental and do not constitute a legal body or decision-making authority.
                </p>
                <p>
                  Voting, proposals, and participation within the community may be encouraged but remain non-binding.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <BarChart className="mr-2 h-6 w-6 text-[#3A86FF]" />
                7. Forward-Looking Statements
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  This document may include projections or statements about future plans, products, or outcomes.
                </p>
                <p>
                  These statements are based on assumptions and may differ significantly from actual results.
                  No representation or warranty is made regarding their realization.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Info className="mr-2 h-6 w-6 text-[#3A86FF]" />
                8. Official Sources
              </h2>
              <p className="text-muted-foreground mb-4">
                Only official channels (e.g., the project's website and authenticated community accounts) provide verified information.
                JAVURO assumes no responsibility for unofficial statements, rumors, or third-party commentary.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Info className="mr-2 h-6 w-6 text-[#3A86FF]" />
                9. Acceptance of Terms
              </h2>
              <p className="text-muted-foreground mb-4">
                By accessing or using the information contained in this document or the project's platform,
                you acknowledge that you have read, understood, and accepted the terms of this disclaimer, and that you are solely responsible for your actions.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}