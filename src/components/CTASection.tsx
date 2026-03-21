import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles, Package } from "lucide-react";
import ProductsModal from "./ProductsModal";

export default function CTASection() {
  const sectionRef = useRef(null);
  const thankRef = useRef<HTMLDivElement>(null);
  const [showThank, setShowThank] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.35], [60, 0]);

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-brand-500/20 to-transparent" />

      {/* Circuit dot grid */}
      <div className="absolute inset-0 circuit-dots opacity-30 pointer-events-none" />

      {/* Breathe border */}
      <div className="absolute inset-4 rounded-3xl border border-brand-400/[0.12] animate-breathe-border pointer-events-none" />

      {/* Edge glows */}
      <div className="absolute top-0 left-0 right-0 h-24 edge-glow-top opacity-55 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-28 edge-glow-bottom opacity-50 pointer-events-none" />

      {/* Animated background depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="depth-glow w-[600px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-600/5 animate-depth-glow-1" />
        <div className="depth-glow w-[350px] h-[250px] top-[35%] left-[15%] bg-violet-600/3 animate-depth-glow-2" style={{ animationDelay: '4s' }} />
        {/* Plasma blob */}
        <div className="absolute w-[350px] h-[250px] top-[40%] left-[40%] -translate-x-1/2 bg-brand-500/[0.07] blur-[50px] animate-plasma" style={{ animationDelay: '2s' }} />
        {/* Shimmer */}
        <div className="absolute w-[280px] h-[280px] rounded-full bg-brand-500/[0.02] blur-[60px] animate-grid-shimmer" style={{ top: '40%', left: '40%' }} />
      </div>

      {/* Floating rings + orbit */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-16 h-16 rounded-full border border-brand-500/[0.14] animate-ring-float" />
        <div className="absolute bottom-[30%] right-[15%] w-12 h-12 rounded-full border border-cyan-500/[0.12] animate-ring-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-[45%] left-[60%] w-20 h-20 rounded-full border border-violet-500/[0.10] animate-ring-float" style={{ animationDelay: '1.5s' }} />
        {/* Orbiting dots */}
        <div className="absolute top-[42%] left-[50%]">
          <div className="w-2 h-2 rounded-full bg-brand-400/60 animate-orbit" style={{ boxShadow: '0 0 8px rgba(96,165,250,0.5)' }} />
        </div>
        <div className="absolute top-[30%] right-[25%]">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50 animate-orbit-reverse" style={{ boxShadow: '0 0 6px rgba(34,211,238,0.4)' }} />
        </div>
      </div>

      {/* Double sweep lines */}
      <div className="absolute top-[30%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-400/8 to-transparent animate-sweep-line pointer-events-none" style={{ animationDuration: '10s', animationDelay: '2s' }} />
      <div className="absolute top-[65%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-violet-400/6 to-transparent animate-sweep-line pointer-events-none" style={{ animationDuration: '13s', animationDelay: '6s' }} />

      {/* Data streams */}
      <div className="absolute w-[2px] h-24 animate-data-stream pointer-events-none" style={{ left: '25%', background: 'linear-gradient(180deg, transparent, rgba(96,165,250,0.22), transparent)', animationDelay: '1s', animationDuration: '5.5s' }} />
      <div className="absolute w-[2px] h-28 animate-data-stream pointer-events-none" style={{ left: '80%', background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.18), transparent)', animationDelay: '4s', animationDuration: '7s' }} />

      {/* Signal beacons */}
      <div className="absolute left-[15%] top-[35%] w-2 h-2 rounded-full border border-brand-400/35 animate-signal pointer-events-none" />
      <div className="absolute left-[85%] top-[60%] w-2 h-2 rounded-full border border-cyan-400/30 animate-signal pointer-events-none" style={{ animationDelay: '1.5s' }} />

      {/* Floating hex */}
      <div className="absolute top-[15%] right-[8%] w-10 h-10 border border-brand-500/[0.14] rotate-45 animate-hex-float pointer-events-none" />
      <div className="absolute bottom-[20%] left-[6%] w-8 h-8 border border-violet-500/[0.12] rotate-12 animate-hex-float pointer-events-none" style={{ animationDelay: '4s' }} />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full bg-brand-400/20 animate-float-particle" style={{ left: '18%', top: '25%', width: 2, height: 2, animationDuration: '8s' }} />
        <div className="absolute rounded-full bg-brand-400/20 animate-float-particle" style={{ left: '82%', top: '30%', width: 3, height: 3, animationDuration: '7s', animationDelay: '1.5s' }} />
        <div className="absolute rounded-full bg-brand-400/20 animate-float-particle" style={{ left: '40%', top: '75%', width: 2, height: 2, animationDuration: '9s', animationDelay: '2s' }} />
        <div className="absolute rounded-full bg-brand-400/20 animate-float-particle" style={{ left: '65%', top: '15%', width: 2, height: 2, animationDuration: '6.5s', animationDelay: '0.8s' }} />
        <div className="absolute rounded-full bg-brand-400/20 animate-float-particle" style={{ left: '50%', top: '50%', width: 2, height: 2, animationDuration: '7.5s', animationDelay: '3s' }} />
        <div className="absolute rounded-full bg-brand-400/20 animate-float-particle" style={{ left: '10%', top: '65%', width: 3, height: 3, animationDuration: '8.5s', animationDelay: '1s' }} />
        <div className="absolute top-[35%] left-0 w-[180px] h-px bg-gradient-to-r from-transparent via-brand-400/10 to-transparent animate-sweep-travel" />
      </div>

      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
          Sẵn sàng trải nghiệm?
        </h2>

        <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
          Từ meeting đầu tiên đến tài liệu bàn giao —
          AI đồng hành cùng BA ở mọi giai đoạn.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://youtu.be/x9xTHFL9aO8"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (!showThank) {
                setShowThank(true);
                setTimeout(() => {
                  thankRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
                }, 100);
              }
            }}
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold text-sm hover:from-brand-500 hover:to-brand-400 transition-all duration-500 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 hover:shadow-xl"
          >
            Xem Demo
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            onClick={() => setShowProducts(true)}
            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/15 bg-white/[0.04] text-white font-semibold text-sm hover:bg-white/[0.08] hover:border-brand-500/40 transition-all duration-500 shadow-lg shadow-black/10 hover:shadow-brand-500/10 hover:shadow-xl"
          >
            Sản phẩm
            <Package className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
          </button>
        </div>
      </motion.div>

      {/* Thank you — only appears after clicking Xem Demo */}
      <AnimatePresence>
        {showThank && (
          <motion.div
            ref={thankRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-40 sm:mt-52 pt-10 text-center min-h-[60vh] flex flex-col items-center justify-center"
          >
            <Sparkles className="w-8 h-8 text-brand-400/60 mx-auto mb-6" />
            <p className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-brand-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent pb-2" style={{ lineHeight: '1.4' }}>
              Chân thành cảm ơn quý vị<br />đã chú ý lắng nghe!
            </p>
            <p className="text-gray-500 text-base mt-8">
              Mọi ý kiến đóng góp xin gửi về Team BA
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <motion.footer
        style={{ opacity: contentOpacity }}
        className="mt-16 text-center text-gray-600 text-sm"
      >
        Ứng dụng AI trong công việc của BA — Team BA · 2025
      </motion.footer>
      <ProductsModal open={showProducts} onClose={() => setShowProducts(false)} />
    </section>
  );
}
