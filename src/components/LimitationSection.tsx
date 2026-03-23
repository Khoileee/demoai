import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AlertTriangle, Tablet, Wifi, ShieldAlert } from "lucide-react";

const limitations = [
  {
    icon: Tablet,
    text: "Chạy trên tablet cá nhân (không phải máy công ty)",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    icon: Wifi,
    text: "Hiệu năng phụ thuộc cấu hình phần cứng (RAM, CPU, GPU...) & wifi",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    icon: ShieldAlert,
    text: "Cần đánh giá về an toàn thông tin, bảo mật dữ liệu trước khi triển khai",
    color: "text-red-400",
    bg: "bg-red-500/10",
  },
];

export default function LimitationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section className="relative h-screen px-6 overflow-hidden flex flex-col justify-center">
      {/* Background effects */}
      <div className="absolute inset-0 circuit-dots opacity-25 pointer-events-none" />
      <div className="absolute inset-6 rounded-3xl border border-amber-400/[0.08] animate-breathe-border pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(245,158,11,0.04) 0%, transparent 100%)' }} />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[400px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-amber-500/[0.04] blur-[60px] animate-plasma" />
      </div>

      <div ref={ref} className="max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2.5 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 leading-tight">
            Hạn chế chung
          </h2>
          <p className="text-gray-400 text-base max-w-3xl mx-auto leading-relaxed whitespace-nowrap">
            Đây là giai đoạn thử nghiệm — cần đánh giá thêm trước khi triển khai chính thức.
          </p>
        </motion.div>

        <div className="space-y-4">
          {limitations.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4 p-5 rounded-xl border border-amber-500/10 bg-gray-950/60"
            >
              <div className={`w-11 h-11 rounded-lg ${item.bg} flex items-center justify-center flex-shrink-0`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <p className="text-gray-300 text-base leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
