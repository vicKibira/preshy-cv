import React from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { 
  GraduationCap, 
  MapPin, 
  Mail, 
  Phone, 
  BookOpen, 
  Microscope, 
  Leaf, 
  Users, 
  Lightbulb, 
  ChevronRight,
  Award,
  Heart,
  Target,
  FlaskConical,
  Stethoscope,
  Utensils,
  Brain,
  Dumbbell,
  Baby,
  ArrowUp
} from "lucide-react";
import { cn } from "@/src/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const SectionHeader = ({ label, title, subtitle }: { label: string; title: string; subtitle?: string | React.ReactNode }) => (
  <motion.div variants={containerVariants} className="mb-12 md:mb-20">
    <motion.span 
      variants={itemVariants}
      className="text-sage-600 font-bold tracking-[0.3em] text-[10px] sm:text-xs uppercase block mb-4"
    >
      {label}
    </motion.span>
    <motion.h2 
      variants={itemVariants}
      className="text-3xl sm:text-4xl md:text-6xl font-serif text-slate-900 leading-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        variants={itemVariants}
        className="mt-6 text-lg text-slate-600 max-w-2xl font-light italic"
      >
        {subtitle}
      </motion.p>
    )}
  </motion.div>
);

const SkillCard = ({ icon: Icon, title, skills, delay }: { icon: any; title: string; skills: { name: string; level: number; desc: string }[]; delay: number }) => (
  <motion.div 
    variants={itemVariants}
    className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group h-full"
  >
    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-sage-50 rounded-2xl flex items-center justify-center text-sage-600 mb-6 group-hover:bg-sage-600 group-hover:text-white transition-colors duration-500">
      <Icon size={24} className="sm:w-7 sm:h-7" />
    </div>
    <h3 className="text-xl sm:text-2xl font-serif mb-6 sm:mb-8 text-slate-900">{title}</h3>
    <div className="space-y-6">
      {skills.map((skill, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between items-end gap-2">
            <span className="font-semibold text-slate-800 text-sm sm:text-base leading-tight">{skill.name}</span>
            <span className="text-[10px] sm:text-xs text-slate-400 font-mono shrink-0">{skill.level}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: delay + 0.2 + (i * 0.1) }}
              className="h-full bg-gradient-to-r from-sage-600 to-sage-400 rounded-full"
            />
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 font-light leading-relaxed">{skill.desc}</p>
        </div>
      ))}
    </div>
  </motion.div>
);

const TimelineItem = ({ date, title, sub, desc, badge, isLast }: { date: string; title: string; sub: string; desc: string; badge: string; isLast?: boolean }) => (
  <motion.div 
    variants={itemVariants}
    className="relative pl-8 sm:pl-12 pb-12 sm:pb-16"
  >
    {!isLast && <div className="absolute left-[11px] top-8 bottom-0 w-px bg-gradient-to-b from-sage-600/30 to-transparent" />}
    <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-sage-600 bg-white flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-sage-600" />
    </div>
    
    <div className="space-y-3">
      <span className="text-[10px] sm:text-xs font-bold tracking-widest text-sage-600 uppercase">{date}</span>
      <h3 className="text-xl sm:text-2xl font-serif text-slate-900 leading-tight">{title}</h3>
      <div className="text-sage-600 font-medium flex items-center gap-2 text-sm">
        <GraduationCap size={16} className="shrink-0" />
        <span className="leading-tight">{sub}</span>
      </div>
      <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light max-w-2xl" dangerouslySetInnerHTML={{ __html: desc }} />
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-sage-50 border border-sage-100 text-sage-700 text-[10px] font-bold uppercase tracking-wider">
        {badge}
      </span>
    </div>
  </motion.div>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const [showScrollTop, setShowScrollTop] = React.useState(false);
  const cvRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const accentY = useTransform(scrollYProgress, [0, 0.5], [0, -150]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);

  return (
    <div ref={cvRef} className="min-h-screen selection:bg-sage-200 selection:text-sage-900">
      {/* Progress Bar */}
      <motion.div 
        data-html2canvas-ignore="true"
        className="fixed top-0 left-0 right-0 h-1 bg-sage-600 origin-left z-50" 
        style={{ scaleX }} 
      />

      {/* Scroll to Top Button */}
      <motion.button
        data-html2canvas-ignore="true"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0, 
          scale: showScrollTop ? 1 : 0.5,
          pointerEvents: showScrollTop ? "auto" : "none" 
        }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 bg-sage-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-sage-700 transition-colors group"
      >
        <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
      </motion.button>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center overflow-hidden bg-white py-20 sm:py-0">
        {/* Background Accents */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute top-0 right-0 w-1/2 h-full bg-sage-50/50 -skew-x-12 translate-x-1/4 pointer-events-none" 
        />
        <motion.div 
          style={{ y: accentY }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-terracotta-50 rounded-full blur-3xl opacity-50 pointer-events-none" 
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            style={{ y: textY }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center"
          >
            <div className="space-y-8 sm:space-y-10">
              <motion.div 
                variants={itemVariants}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-sage-100 border border-sage-200 text-sage-800 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]"
              >
                <div className="w-2 h-2 rounded-full bg-sage-600 animate-pulse" />
                Curriculum Vitae
              </motion.div>

              <div className="space-y-4">
                <motion.h1 
                  variants={itemVariants}
                  className="text-4xl sm:text-7xl md:text-9xl font-serif text-slate-900 leading-[0.9] tracking-tighter"
                >
                  Precious <br />
                  <span className="text-sage-600 italic font-normal">Syombua</span>
                </motion.h1>
                <motion.p 
                  variants={itemVariants}
                  className="text-lg sm:text-xl md:text-2xl text-slate-500 font-light max-w-xl leading-relaxed"
                >
                  Human Nutrition & Dietetics specialist dedicated to advancing community health through evidence-based dietary practices.
                </motion.p>
              </div>

              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                {[
                  { icon: MapPin, text: "Juja, Kenya" },
                  { icon: Mail, text: "precioussyombua25@gmail.com" },
                  { icon: Phone, text: "0727898346" },
                  { icon: GraduationCap, text: "JKUAT · Year 2" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow w-full sm:w-auto">
                    <item.icon size={18} className="text-sage-600 shrink-0" />
                    <span className="text-sm font-medium text-slate-600 truncate">{item.text}</span>
                  </div>
                ))}
              </motion.div>

              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4 pt-4"
              >
                <a 
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-sage-600 text-white rounded-full font-bold hover:bg-sage-700 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-sage-200"
                >
                  Get in Touch
                </a>
              </motion.div>
            </div>

            <motion.div 
              variants={itemVariants}
              className="relative hidden lg:block"
            >
              <div className="relative w-[450px] h-[450px] mx-auto">
                <div className="absolute inset-0 border-[1px] border-dashed border-sage-200 rounded-full animate-[spin_60s_linear_infinite]" />
                <div className="absolute inset-8 border-[1px] border-slate-100 rounded-full" />
                <motion.div 
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 2, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-16 bg-gradient-to-br from-sage-600 to-sage-400 rounded-full shadow-2xl flex items-center justify-center text-white text-9xl font-serif will-change-transform"
                >
                  PS
                </motion.div>
                
                {/* Floating Badges */}
                <motion.div 
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-terracotta-50 rounded-2xl flex items-center justify-center text-terracotta-600">
                    <Utensils size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Nutrition Science</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Clinical & Community</div>
                  </div>
                </motion.div>

                <motion.div 
                  animate={{ y: [0, 15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-12 -left-12 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-sage-50 rounded-2xl flex items-center justify-center text-sage-600">
                    <Microscope size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Lab & Research</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Evidence-Based</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-slate-200 to-transparent" />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-40 bg-slate-50">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-6"
        >
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div variants={itemVariants}>
              <SectionHeader 
                label="Who I Am" 
                title={<>Fuelled by <em>passion</em> for health & wellness</>}
              />
              <div className="space-y-6 text-lg md:text-xl text-slate-600 font-light leading-relaxed">
                <p>
                  I am <span className="font-semibold text-slate-900">Precious Syombua</span>, a driven and enthusiastic student of Human Nutrition and Dietetics currently in my second year at JKUAT.
                </p>
                <p>
                  My academic journey is built on a strong foundation of nutritional biochemistry, food science, and public health nutrition. I am eager to apply my expertise in a professional healthcare environment to sharpen my clinical and community nutrition skills.
                </p>
                <p className="italic text-sage-600">
                  "I bring boundless curiosity, scientific rigor, and a genuine commitment to transforming lives through evidence-based nutritional therapy."
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {[
                { label: "Year at JKUAT", value: "2nd", icon: Award },
                { label: "High School", value: "Kisumu Girls", icon: BookOpen },
                { label: "Degree", value: "BSc Nutrition", icon: GraduationCap },
                { label: "Focus", value: "Clinical", icon: Stethoscope }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  className="bg-white p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-500 group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-sage-50 rounded-xl sm:rounded-2xl flex items-center justify-center text-sage-600 mb-4 sm:mb-6 group-hover:bg-sage-600 group-hover:text-white transition-colors">
                    <stat.icon size={20} className="sm:w-6 sm:h-6" />
                  </div>
                  <div className="text-2xl sm:text-4xl font-serif text-slate-900 mb-1 sm:mb-2">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Education Section */}
      <section className="py-16 md:py-40 bg-white">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-6"
        >
          <SectionHeader 
            label="Background" 
            title="Academic Journey"
            subtitle="Building a rigorous scientific foundation in human nutrition and applied dietetics."
          />
          
          <div className="max-w-4xl">
            <TimelineItem 
              date="2024 – Present"
              title="BSc Human Nutrition & Dietetics"
              sub="Jomo Kenyatta University of Agriculture and Technology (JKUAT)"
              desc="Advancing through a comprehensive curriculum in nutritional sciences. Core competencies include: <br/>• <strong>Clinical Dietetics:</strong> Therapeutic nutrition and patient dietary management. <br/>• <strong>Food Science:</strong> Analysis of food composition and safety standards. <br/>• <strong>Biochemistry:</strong> Understanding metabolic pathways and nutrient interactions."
              badge="In Progress"
            />
            <TimelineItem 
              date="2020 – 2023"
              title="Kenya Certificate of Secondary Education (KCSE)"
              sub="Kisumu Girls High School · Kisumu, Kenya"
              desc="Graduated with a strong focus on laboratory sciences and nutrition-related coursework. Actively participated in academic research projects and health-oriented clubs."
              badge="Completed"
            />
            <TimelineItem 
              date="Upcoming"
              title="Professional Practice"
              sub="Clinical / Community / Research"
              desc="Prepared to apply academic expertise in real-world environments. Focus areas: patient assessment, therapeutic meal planning, nutrition education, and community health outreach."
              badge="Next Step"
              isLast
            />
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="py-16 md:py-40 bg-sage-50">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-6"
        >
          <SectionHeader 
            label="Capabilities" 
            title="Core Expertise"
            subtitle="A blend of scientific rigor, clinical empathy, and community-focused strategy."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkillCard 
              icon={FlaskConical}
              title="Technical & Scientific"
              delay={0.1}
              skills={[
                { name: "Nutritional Assessment", level: 85, desc: "Anthropometric, biochemical & clinical methods." },
                { name: "Food Analysis", level: 80, desc: "Compositional analysis & quality control." },
                { name: "Biochemistry", level: 75, desc: "Metabolic pathways & micronutrient science." }
              ]}
            />
            <SkillCard 
              icon={Users}
              title="Clinical & Community"
              delay={0.2}
              skills={[
                { name: "Dietary Planning", level: 80, desc: "Therapeutic meal planning for diverse patients." },
                { name: "Health Education", level: 88, desc: "Nutritional counseling & public health awareness." },
                { name: "Community Outreach", level: 82, desc: "Implementing local nutrition programs." }
              ]}
            />
            <SkillCard 
              icon={Lightbulb}
              title="Professional Skills"
              delay={0.3}
              skills={[
                { name: "Teamwork", level: 95, desc: "Collaborative problem solving in clinical settings." },
                { name: "Research & Analysis", level: 80, desc: "Data-driven approach to nutritional studies." },
                { name: "Communication", level: 90, desc: "Clear articulation of complex health concepts." }
              ]}
            />
          </div>
        </motion.div>
      </section>

      {/* Objectives Section */}
      <section className="py-16 md:py-40 bg-white">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-6"
        >
          <SectionHeader 
            label="Vision" 
            title="Professional Objectives"
            subtitle="My roadmap for contributing to the field of nutrition and dietetics."
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Apply Knowledge", desc: "Bridging the gap between theoretical nutritional sciences and real-world practice.", icon: BookOpen },
              { title: "Develop Skills", desc: "Gaining hands-on experience in dietary assessment and patient counseling.", icon: Stethoscope },
              { title: "Contribute", desc: "Bringing enthusiasm and up-to-date scientific knowledge to a healthcare team.", icon: Heart },
              { title: "Evolution", desc: "Cultivating ethical work habits and building a professional network.", icon: Target }
            ].map((obj, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:border-sage-200 hover:shadow-xl transition-all duration-500 group"
              >
                <div className="text-sage-600 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <obj.icon size={32} />
                </div>
                <h3 className="text-xl font-serif text-slate-900 mb-4">{obj.title}</h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed">{obj.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Interests Section */}
      <section className="py-16 md:py-40 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sage-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-terracotta-600/10 rounded-full blur-[120px]" />
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="container mx-auto px-6 relative z-10"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-8">
            <div className="max-w-2xl">
              <motion.span 
                variants={itemVariants}
                className="text-sage-400 font-bold tracking-[0.3em] text-[10px] sm:text-xs uppercase block mb-4"
              >
                Passions
              </motion.span>
              <motion.h2 
                variants={itemVariants}
                className="text-3xl sm:text-4xl md:text-6xl font-serif leading-tight"
              >
                Interests & <br />
                <span className="text-sage-400 italic">Specializations</span>
              </motion.h2>
            </div>
            <motion.div 
              variants={itemVariants}
              className="text-slate-400 font-light text-base md:text-lg italic max-w-xs"
            >
              "Nutrition is not just about eating, it's about healing and community."
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: "Clinical Nutrition", icon: Stethoscope },
              { name: "Community Health", icon: Users },
              { name: "Food Culture", icon: Utensils },
              { name: "Research", icon: Microscope },
              { name: "Sports Nutrition", icon: Dumbbell },
              { name: "Maternal & Child", icon: Baby }
            ].map((item, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                className="aspect-square bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 hover:bg-white/10 hover:border-sage-500/50 transition-all cursor-default group"
              >
                <div className="text-sage-400 group-hover:text-sage-300 group-hover:scale-110 transition-all duration-300 ease-out">
                  <item.icon size={32} />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-center px-4 text-slate-300">
                  {item.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-20 bg-white border-t border-slate-100">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="container mx-auto px-6"
        >
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="w-16 h-16 bg-gradient-to-br from-sage-600 to-sage-400 rounded-2xl flex items-center justify-center text-white text-2xl font-serif shadow-lg">
              PS
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif text-slate-900">Precious Syombua</h3>
              <p className="text-sm text-slate-400 uppercase tracking-[0.3em] font-bold">Nutrition & Dietetics Specialist</p>
            </div>
            <div className="flex gap-8">
              <a href="mailto:precioussyombua25@gmail.com" className="text-slate-400 hover:text-sage-600 transition-colors">
                <Mail size={20} />
              </a>
              <a href="tel:0727898346" className="text-slate-400 hover:text-sage-600 transition-colors">
                <Phone size={20} />
              </a>
              <div className="text-slate-400">
                <MapPin size={20} />
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 w-full max-w-xs">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                © 2024 · Designed for Excellence
              </p>
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
