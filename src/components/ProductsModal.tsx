import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, FileText, Globe } from "lucide-react";

const BASE = import.meta.env.BASE_URL;

interface ProductsModalProps {
  open: boolean;
  onClose: () => void;
}

const prototypes = [
  {
    name: "SQL Workflow",
    desc: "Quản lý truy vấn SQL, template, workflow tự động",
    url: "https://sqlwf.lovable.app",
  },
  {
    name: "WebView CMS",
    desc: "Hệ thống quản trị nội dung chatbot & kho tri thức",
    url: "https://webvieww.lovable.app",
  },
  {
    name: "AuthCenter",
    desc: "Hệ thống phân quyền tập trung đa hệ thống",
    url: "https://authcenter.lovable.app",
  },
];

const documents = [
  {
    name: "Hướng dẫn sử dụng AI trong công việc BA",
    file: "HDSD_AI_TRONG_CONG_VIEC_BA.html",
  },
  {
    name: "Meeting Notes — vMLP / MLOps Platform",
    file: "MN_vMLP_MLOps_Platform.html",
  },
  {
    name: "Meeting Notes — Chatbot & Trung tâm Hỗ trợ",
    file: "MN_Chatbot_TrungTamHoTro.html",
  },
  {
    name: "Nghiên cứu Tổng quan AuthCenter",
    file: "Nghien_cuu_Tong_quan_Authcenter.html",
  },
];

export default function ProductsModal({ open, onClose }: ProductsModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-gray-950/95 shadow-2xl shadow-brand-500/10"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gray-950/90 backdrop-blur-md rounded-t-2xl">
              <h3 className="text-lg font-semibold text-white">
                Sản phẩm & Tài liệu
              </h3>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Prototypes section */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="w-4 h-4 text-brand-400" />
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-400">
                    UI Prototype
                  </h4>
                </div>
                <p className="text-xs text-gray-500 mb-4">
                  Gen bằng Lovable + Agent / Skill
                </p>

                <div className="grid gap-3">
                  {prototypes.map((p) => (
                    <a
                      key={p.name}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-brand-500/30 transition-all duration-300"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white group-hover:text-brand-300 transition-colors truncate">
                          {p.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">
                          {p.desc}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 shrink-0 text-gray-600 group-hover:text-brand-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Documents section */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                    Tài liệu
                  </h4>
                </div>

                <div className="grid gap-3">
                  {documents.map((d) => (
                    <a
                      key={d.file}
                      href={`${BASE}docs/${d.file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 px-4 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.06] hover:border-cyan-500/30 transition-all duration-300"
                    >
                      <p className="text-sm font-medium text-white group-hover:text-cyan-300 transition-colors min-w-0 truncate">
                        {d.name}
                      </p>
                      <ExternalLink className="w-4 h-4 shrink-0 text-gray-600 group-hover:text-cyan-400 transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
