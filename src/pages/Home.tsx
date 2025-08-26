import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import '@/styles/animations.css';

const floatingIcons = [
  { icon: "⚡", delay: 0, x: -20, y: -30 },
  { icon: "🚀", delay: 0.2, x: 20, y: 20 },
  { icon: "💡", delay: 0.4, x: -30, y: 30 },
  { icon: "🌟", delay: 0.6, x: 30, y: -20 },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-50" />
      
      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          initial={{ x: 0, y: 0, opacity: 0 }}
          animate={{ 
            x: item.x, 
            y: item.y, 
            opacity: 1,
            rotate: [0, 360],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            delay: item.delay,
            repeatType: "reverse",
          }}
          className="absolute text-4xl"
          style={{
            top: `${Math.random() * 60 + 20}%`,
            left: `${Math.random() * 60 + 20}%`,
          }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="container mx-auto px-4 py-20 text-center"
        >
          <motion.h1 
            className="text-6xl font-bold mb-6 gradient-text"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to Smart India Hackathon 2025
          </motion.h1>

          <motion.p
            className="text-xl mb-12 text-gray-300"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Join India's largest innovation challenge and be part of the change
          </motion.p>

          <motion.div 
            className="flex gap-6 justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button
              onClick={() => navigate("/team-registration")}
              className="bg-gradient-to-r from-[#00ff87] to-[#60efff] text-black hover:opacity-90 transition-opacity"
              size="lg"
            >
              Register as Team
            </Button>
            <Button
              onClick={() => navigate("/individual-registration")}
              variant="outline"
              size="lg"
              className="border-[#60efff] text-[#60efff] hover:bg-[#60efff]/10"
            >
              Join as Individual
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {[
              { label: "Prize Pool", value: "₹3 Cr+" },
              { label: "Participants", value: "50K+" },
              { label: "Problem Statements", value: "500+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="glass-card p-6 rounded-xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-4xl font-bold gradient-text mb-2">{stat.value}</h3>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
