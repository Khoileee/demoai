import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function ThankSection() {
  return (
    <section className="relative h-screen px-6 overflow-hidden flex flex-col items-center justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 circuit-dots opacity-20 pointer-events-none" />
      <div className="absolute inset-6 rounded-3xl border border-brand-400/[0.08] animate-breathe-border pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-500/[0.05] blur-[70px] animate-plasma" />
        <div className="absolute w-[300px] h-[300px] top-[30%] right-[15%] bg-violet-500/[0.03] blur-[50px] animate-depth-glow-2" style={{ animationDelay: '3s' }} />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full bg-brand-400/20 animate-float-particle" style={{ left: '20%', top: '30%', width: 3, height: 3, animationDuration: '8s' }} />
        <div className="absolute rounded-full bg-violet-400/20 animate-float-particle" style={{ left: '75%', top: '25%', width: 2, height: 2, animationDuration: '7s', animationDelay: '1.5s' }} />
        <div className="absolute rounded-full bg-cyan-400/20 animate-float-particle" style={{ left: '50%', top: '70%', width: 3, height: 3, animationDuration: '9s', animationDelay: '2.5s' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="text-center"
      >
        <Sparkles className="w-10 h-10 text-brand-400/60 mx-auto mb-8" />
        <p
          className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-brand-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent pb-2"
          style={{ lineHeight: '1.4' }}
        >
          Chân thành cảm ơn quý vị<br />đã chú ý lắng nghe!
        </p>
        <p className="text-gray-500 text-base mt-8">
          Mọi ý kiến đóng góp xin gửi về Team BA
        </p>
        <p className="text-gray-600 text-sm mt-12">
          Ứng dụng AI trong công việc của BA — Team BA · 2026
        </p>
      </motion.div>
    </section>
  );
}
