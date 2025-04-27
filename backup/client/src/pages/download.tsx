import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Bell, Phone, Calendar, Apple } from "lucide-react";
import { SiGoogleplay } from "react-icons/si";

export default function Download() {
  return (
    <div className="bg-background">
      <main className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            JAVURO App Coming Soon
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Be the first to know when we launch. Sign up for launch notifications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center p-8 rounded-lg border bg-card"
          >
            <Apple className="w-16 h-16 mx-auto mb-6 text-[#3A86FF]" />
            <h2 className="text-2xl font-semibold mb-4">iOS Version</h2>
            <p className="text-muted-foreground mb-6">
              Coming soon to App Store
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-[#3A86FF] to-[#3A86FF]/80" 
              size="lg"
              disabled
            >
              <Calendar className="mr-2 h-5 w-5" />
              Coming Soon
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center p-8 rounded-lg border bg-card"
          >
            <SiGoogleplay className="w-16 h-16 mx-auto mb-6 text-[#3A86FF]" />
            <h2 className="text-2xl font-semibold mb-4">Android Version</h2>
            <p className="text-muted-foreground mb-6">
              Coming soon to Google Play
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-[#3A86FF] to-[#3A86FF]/80" 
              size="lg"
              disabled
            >
              <Calendar className="mr-2 h-5 w-5" />
              Coming Soon
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-8 rounded-lg border bg-card max-w-md w-full">
            <Bell className="w-16 h-16 mx-auto mb-6 text-[#3A86FF]" />
            <h3 className="text-2xl font-semibold mb-4">Get Launch Notification</h3>
            <p className="text-muted-foreground mb-6">
              Be the first to know when we launch
            </p>
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-[#3A86FF] to-[#3A86FF]/80"
            >
              <Bell className="mr-2 h-5 w-5" />
              Sign Up for Updates
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}