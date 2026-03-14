// Tech corner decorations component for cyberpunk aesthetic
export function TechDecorations() {
  return (
    <>
      {/* Top Left Decor */}
      <div className="fixed top-4 left-4 z-0 pointer-events-none opacity-30">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 15 0 L 0 0 L 0 15" stroke="#00F2FF" strokeWidth="1" fill="none" />
          <path d="M 30 0 L 0 0 L 0 30" stroke="#00F2FF" strokeWidth="0.5" opacity="0.5" fill="none" />
          <circle cx="5" cy="5" r="2" fill="#00F2FF" />
        </svg>
      </div>

      {/* Top Right Decor */}
      <div className="fixed top-4 right-4 z-0 pointer-events-none opacity-30">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 45 0 L 60 0 L 60 15" stroke="#FF8C00" strokeWidth="1" fill="none" />
          <path d="M 30 0 L 60 0 L 60 30" stroke="#FF8C00" strokeWidth="0.5" opacity="0.5" fill="none" />
          <circle cx="55" cy="5" r="2" fill="#FF8C00" />
        </svg>
      </div>

      {/* Bottom Left Decor */}
      <div className="fixed bottom-4 left-4 z-0 pointer-events-none opacity-30">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 15 60 L 0 60 L 0 45" stroke="#FF8C00" strokeWidth="1" fill="none" />
          <path d="M 30 60 L 0 60 L 0 30" stroke="#FF8C00" strokeWidth="0.5" opacity="0.5" fill="none" />
          <circle cx="5" cy="55" r="2" fill="#FF8C00" />
        </svg>
      </div>

      {/* Bottom Right Decor */}
      <div className="fixed bottom-4 right-4 z-0 pointer-events-none opacity-30">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 45 60 L 60 60 L 60 45" stroke="#00F2FF" strokeWidth="1" fill="none" />
          <path d="M 30 60 L 60 60 L 60 30" stroke="#00F2FF" strokeWidth="0.5" opacity="0.5" fill="none" />
          <circle cx="55" cy="55" r="2" fill="#00F2FF" />
        </svg>
      </div>
    </>
  );
}
