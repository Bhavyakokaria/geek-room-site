import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="relative min-h-screen pt-24 pb-16 px-4 sm:px-6 overflow-hidden bg-[#050505] flex items-center justify-center">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#00F2FF]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF8C00]/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="relative z-10 flex items-center justify-center w-full max-w-md mt-8">
        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-[#00F2FF] hover:bg-[#00F2FF]/90 text-black text-sm normal-case",
              card: "bg-[#050505]/40 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]",
              headerTitle: "text-white",
              headerSubtitle: "text-white/60",
              formFieldLabel: "text-white/80",
              formFieldInput: "bg-[#050505]/60 border-white/10 text-white placeholder:text-white/20 focus:border-[#00F2FF]/50",
              footerActionLink: "text-[#00F2FF] hover:text-[#00F2FF]/80",
              identityPreviewText: "text-white",
              identityPreviewEditButtonIcon: "text-[#00F2FF]",
              socialButtonsBlockButton: "border-white/10 text-white hover:bg-white/5",
              socialButtonsBlockButtonText: "text-white",
              dividerLine: "bg-white/10",
              dividerText: "text-white/40"
            },
          }}
        />
      </div>
    </main>
  );
}
