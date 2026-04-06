"use client";

import { useEffect, useState, Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { FileText, Target, Activity, ArrowRight, BrainCircuit, PenTool, Globe, Cloud, Network } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { addCredits, logTransaction, unlockCloudVault } from "@/lib/credits";

function DashboardContent() {
  const [userName, setUserName] = useState<string>("User");
  const [userId, setUserId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
     const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
           setUserName(user.user_metadata?.full_name || user.email?.split("@")[0] || "User");
           setUserId(user.id);
        }
     };
     getUser();
  }, []);

  useEffect(() => {
     const addedCredits = searchParams.get('dodo_success_credits');
     const unlockedCloud = searchParams.get('dodo_success_cloudnotes');

     if (unlockedCloud && userId) {
         unlockCloudVault(userId).then(() => {
             alert("Cloud Vault Storage Unlocked! You now have unlimited native PDF Extraction and Storage.");
             router.replace('/dashboard');
         });
     } else if (addedCredits && userId) {
         const qty = parseInt(addedCredits);
         // Mathematical Cost Inverse Resolvers matching Pricing matrices
         let costINR = 0;
         let planName = 'Custom Pack';
         if (qty === 50) { costINR = 149; planName = 'Starter Pack'; }
         if (qty === 100) { costINR = 249; planName = 'Pro Pack'; }
         if (qty === 250) { costINR = 499; planName = 'Ultimate Pack'; }
         if (qty === 200) { costINR = 399; planName = 'UPSC Pro Tier'; }
         if (qty === 300) { costINR = 699; planName = 'Ultimate Tier'; }

         Promise.all([
             addCredits(userId, qty),
             logTransaction(userId, qty, costINR, planName, 'Success')
         ]).then(() => {
             alert(`Payment Successfully Verified by Dodo! ${qty} AI Credits have been instantly deposited.`);
             router.replace('/dashboard');
         });
     }
  }, [searchParams, userId, router]);

  return (
    <div className="p-6 md:p-12 relative">
       {/* Ambient Backlighting */}
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen opacity-50 z-0"></div>
       <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none mix-blend-screen opacity-50 z-0"></div>

       <div className="relative z-10 max-w-7xl mx-auto">
         <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest mb-6 shadow-2xl">
               <BrainCircuit className="w-4 h-4" /> Core Headquarters
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
              Welcome back, <span className="text-white">{userName}</span>.
            </h1>
            <p className="text-white/50 text-lg font-medium max-w-2xl leading-relaxed">
              Your centralized command architecture. Securely access dynamic logic streams, intelligent extraction matrices, and deep historic telemetry natively straight from here.
            </p>
         </motion.div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link href="/quiz" className="block outline-none">
               <motion.div whileHover={{ y: -5 }} className="glass p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group h-full flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div>
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform">
                       <FileText className="w-8 h-8 text-indigo-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3 tracking-tight">PDF Extraction</h3>
                    <p className="text-white/50 text-sm font-medium leading-relaxed mb-10">Upload massive native test series documents and process logic dynamically via Deep GCP routing bypassing structural blocks.</p>
                  </div>
                  <div className="mt-auto flex items-center gap-3 text-indigo-400 font-black text-[11px] uppercase tracking-widest bg-indigo-500/10 px-4 py-2 rounded-xl group-hover:bg-indigo-500 border border-indigo-500/0 group-hover:border-indigo-500/10 group-hover:text-white transition-all w-fit">
                    Spin Up Engine <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                  </div>
               </motion.div>
            </Link>

            <Link href="/ai-prelims" className="block outline-none">
               <motion.div whileHover={{ y: -5 }} className="glass p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group h-full flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div>
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform">
                       <Target className="w-8 h-8 text-amber-500" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3 tracking-tight">AI Generation</h3>
                    <p className="text-white/50 text-sm font-medium leading-relaxed mb-10">Interface directly with neural cores engineering rigorous structural MCQs identical to precise UPSC exam environments.</p>
                  </div>
                  <div className="mt-auto flex items-center gap-3 text-amber-500 font-black text-[11px] uppercase tracking-widest bg-amber-500/10 px-4 py-2 rounded-xl group-hover:bg-amber-500 border border-amber-500/0 group-hover:border-amber-500/10 group-hover:text-white transition-all w-fit">
                    Forge Session <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                  </div>
               </motion.div>
            </Link>

            <Link href="/progress" className="block outline-none">
               <motion.div whileHover={{ y: -5 }} className="glass p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group h-full flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div>
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform">
                       <Activity className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Telemetry Hub</h3>
                    <p className="text-white/50 text-sm font-medium leading-relaxed mb-10">Isolate historical structural biases natively querying massive arrays isolating exact conceptual weaknesses dynamically.</p>
                  </div>
                  <div className="mt-auto flex items-center gap-3 text-emerald-400 font-black text-[11px] uppercase tracking-widest bg-emerald-500/10 px-4 py-2 rounded-xl group-hover:bg-emerald-500 border border-emerald-500/0 group-hover:border-emerald-500/10 group-hover:text-white transition-all w-fit">
                    Render Metrics <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                  </div>
               </motion.div>
            </Link>

            <Link href="/evaluate" className="block outline-none">
               <motion.div whileHover={{ y: -5 }} className="glass p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group h-full flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-fuchsia-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div>
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform">
                       <PenTool className="w-8 h-8 text-fuchsia-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Mains Evaluation</h3>
                    <p className="text-white/50 text-sm font-medium leading-relaxed mb-10">Upload UPSC Mains descriptive answers natively to dynamically construct highly granular semantic grading matrices against standard parameters.</p>
                  </div>
                  <div className="mt-auto flex items-center gap-3 text-fuchsia-400 font-black text-[11px] uppercase tracking-widest bg-fuchsia-500/10 px-4 py-2 rounded-xl group-hover:bg-fuchsia-500 border border-fuchsia-500/0 group-hover:border-fuchsia-500/10 group-hover:text-white transition-all w-fit">
                    Grade Answer <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                  </div>
               </motion.div>
            </Link>

            <Link href="/daily-news" className="block outline-none">
               <motion.div whileHover={{ y: -5 }} className="glass p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group h-full flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div>
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform">
                       <Globe className="w-8 h-8 text-orange-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3 tracking-tight">Daily Current Affairs</h3>
                    <p className="text-white/50 text-sm font-medium leading-relaxed mb-10">Consume strictly parsed multi-source current affairs arrays tracking massive real-time events straight into memory mapping components.</p>
                  </div>
                  <div className="mt-auto flex items-center gap-3 text-orange-400 font-black text-[11px] uppercase tracking-widest bg-orange-500/10 px-4 py-2 rounded-xl group-hover:bg-orange-500 border border-orange-500/0 group-hover:border-orange-500/10 group-hover:text-white transition-all w-fit">
                    Read News <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                  </div>
               </motion.div>
            </Link>

            <Link href="/rag-notes" className="block outline-none">
               <motion.div whileHover={{ y: -5 }} className="glass p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group h-full flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div>
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform">
                       <Cloud className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3 tracking-tight">RAG Cloud Notes</h3>
                    <p className="text-white/50 text-sm font-medium leading-relaxed mb-10">Vault your explicit logic sequences digitally scaling massive interconnected databases retrievable natively through semantic querying loops.</p>
                  </div>
                  <div className="mt-auto flex items-center gap-3 text-cyan-400 font-black text-[11px] uppercase tracking-widest bg-cyan-500/10 px-4 py-2 rounded-xl group-hover:bg-cyan-500 border border-cyan-500/0 group-hover:border-cyan-500/10 group-hover:text-white transition-all w-fit">
                    Access Vault <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                  </div>
               </motion.div>
            </Link>

            <Link href="/mindmaps" className="block outline-none">
               <motion.div whileHover={{ y: -5 }} className="glass p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/5 shadow-2xl relative overflow-hidden group h-full flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div>
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 shadow-inner group-hover:scale-110 transition-transform">
                       <Network className="w-8 h-8 text-orange-400" />
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3 tracking-tight">AI Mindmaps</h3>
                    <p className="text-white/50 text-sm font-medium leading-relaxed mb-10">Consume recursive structural visualization maps tracking massive chronological events seamlessly plotted via Framer nodes.</p>
                  </div>
                  <div className="mt-auto flex items-center gap-3 text-orange-400 font-black text-[11px] uppercase tracking-widest bg-orange-500/10 px-4 py-2 rounded-xl group-hover:bg-orange-500 border border-orange-500/0 group-hover:border-orange-500/10 group-hover:text-white transition-all w-fit">
                    Synthesize Tree <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
                  </div>
               </motion.div>
            </Link>
         </div>
       </div>
    </div>
  );
}

export default function UserDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen p-8 text-center text-white/50 pt-32 font-bold animate-pulse">Initializing Core Headquarters...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
