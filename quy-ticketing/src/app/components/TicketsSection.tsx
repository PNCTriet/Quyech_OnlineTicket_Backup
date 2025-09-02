"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
// import Tooltip from "./Tooltip";

// List of 3 ticket types, each with main and sub images (same as LineupSection)
const TICKETS = [
  {
    main: "/images/ticket_vip3_main_quyech_alt1.png",
    sub: "/images/ticket_vip3_sub_quyech_alt1.png",
    name: "Vip 3"
  },
  {
    main: "/images/ticket_vip2_main_quyech_alt1.png",
    sub: "/images/ticket_vip2_sub_quyech_alt1.png",
    name: "Vip 2"
  },
  {
    main: "/images/ticket_vip1_main_quyech_alt1.png",
    sub: "/images/ticket_vip1_sub_quyech_alt1.png",
    name: "Vip 1"
  },
];

export default function TicketsSection({ lang }: { lang: "vi" | "en" }) {
  // ===== STATE MANAGEMENT =====
  // Track hovered card index for desktop
  const [hovered, setHovered] = useState<number | null>(null);
  // Track flipped state for mobile (all cards flip together)
  const [mobileFlipped, setMobileFlipped] = useState(false);
  // const [showTooltip, setShowTooltip] = useState(false);
  const [sectionTimer, setSectionTimer] = useState<NodeJS.Timeout | null>(null);

  // ===== Tooltip visibility and mobile flip while in view =====
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollDirection = 'down';
    const scrollThreshold = 50; // Minimum scroll distance to trigger flip
    let lastFlipTime = 0;
    const flipCooldown = 1000; // 1 second cooldown between flips
    
    const handleScroll = () => {
      const ticketSection = document.getElementById('tickets');
      if (!ticketSection) return;
      
      const rect = ticketSection.getBoundingClientRect();
      const isInView = rect.top < window.innerHeight && rect.bottom > 0;
      
      // Determine scroll direction and distance
      const currentScrollY = window.scrollY;
      const scrollDistance = Math.abs(currentScrollY - lastScrollY);
      scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
      lastScrollY = currentScrollY;
      
      if (isInView) {
        if (sectionTimer) clearTimeout(sectionTimer);
        const timer = setTimeout(() => {
          // setShowTooltip(true);
        }, 100);
        setSectionTimer(timer);
        
        // Improved mobile flip logic with threshold and cooldown
        if (window.innerWidth < 768) {
          const now = Date.now();
          
          // Only flip if enough time has passed and scroll distance is significant
          if (now - lastFlipTime > flipCooldown && scrollDistance > scrollThreshold) {
            if (scrollDirection === 'down') {
              setMobileFlipped(true);
              lastFlipTime = now;
            } else if (scrollDirection === 'up') {
              setMobileFlipped(false);
              lastFlipTime = now;
            }
          }
        }
      } else {
        if (sectionTimer) clearTimeout(sectionTimer);
        // setShowTooltip(false);
        // Reset flip state when out of view on mobile
        if (window.innerWidth < 768) {
          setMobileFlipped(false);
        }
      }
    };
    
    // Debounce scroll events to reduce jitter
    let scrollTimeout: NodeJS.Timeout;
    const debouncedHandleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 50); // 50ms debounce
    };
    
    window.addEventListener('scroll', debouncedHandleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
      if (sectionTimer) clearTimeout(sectionTimer);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [sectionTimer]);

  return (
    // ===== TICKET SECTION LAYOUT =====
    <section 
      id="tickets" 
      className="py-5 sm:py-16 relative"
      style={{
        backgroundImage: 'url(/images/hero_backround_ss3_alt1.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-8 text-center" style={{ fontFamily: 'BDStreetSignSans' }}>
          {lang === "vi" ? "LOẠI VÉ" : "Ticket Types"}
        </h2>

        {/* Desktop Layout: 3 tickets in a row with hover flip */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {TICKETS.map((ticket, i) => (
            <Link href="/ticket" key={i}>
              <div
                className="group perspective cursor-pointer transition-transform duration-300"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className={`relative w-full aspect-[3/5] transition-transform duration-500 transform-style-3d ${
                  hovered === i ? 'rotate-y-180' : ''
                }`}>
                  {/* Front side (main image) */}
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl">
                      <Image
                        src={ticket.main}
                        alt={`Ticket Main ${i+1}`}
                        fill
                        className="object-contain"
                        priority={i === 0}
                      />
                    </div>
                  </div>
                  {/* Back side (sub image) */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl">
                      <Image
                        src={ticket.sub}
                        alt={`Ticket Sub ${i+1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Layout: 1 ticket on first row, 2 tickets on second row */}
        <div className="md:hidden">
          {/* First row: 1 ticket centered */}
          <div className="flex justify-center">
            <Link href="/ticket">
              <div className="group perspective cursor-pointer transition-transform duration-300">
                <div className={`relative w-48 aspect-[3/5] transition-transform duration-500 transform-style-3d ${
                  mobileFlipped ? 'rotate-y-180' : ''
                }`}>
                  {/* Front side */}
                  <div className="absolute w-full h-full backface-hidden">
                    <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl">
                      <Image
                        src={TICKETS[0].main}
                        alt="Ticket Main 1"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                  {/* Back side */}
                  <div className="absolute w-full h-full backface-hidden rotate-y-180">
                    <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl">
                      <Image
                        src={TICKETS[0].sub}
                        alt="Ticket Sub 1"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          {/* Second row: 2 tickets side by side */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            {TICKETS.slice(1).map((ticket, i) => (
              <Link href="/ticket" key={i + 1}>
                <div className="group perspective cursor-pointer transition-transform duration-300">
                  <div className={`relative w-full aspect-[3/5] transition-transform duration-500 transform-style-3d ${
                    mobileFlipped ? 'rotate-y-180' : ''
                  }`}>
                    {/* Front side */}
                    <div className="absolute w-full h-full backface-hidden">
                      <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl">
                        <Image
                          src={ticket.main}
                          alt={`Ticket Main ${i+2}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    {/* Back side */}
                    <div className="absolute w-full h-full backface-hidden rotate-y-180">
                      <div className="relative w-full h-full overflow-hidden rounded-xl shadow-2xl">
                        <Image
                          src={ticket.sub}
                          alt={`Ticket Sub ${i+2}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Buy Ticket Button - Moved down with more spacing */}
        <div className="flex justify-center mt-16 sm:mt-20">
          <div className="relative">
            <Link 
              href="/ticket" 
              className="inline-flex items-center px-8 py-3 text-lg font-bold text-white bg-[#2A6FB0] rounded-full hover:bg-[#1F5A90] transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{ fontFamily: 'BDStreetSignSans' }}
            >
              {lang === "vi" ? "MUA VÉ NGAY" : "BUY TICKETS NOW"}
              <svg 
                className="w-5 h-5 ml-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </Link>

            {/* <Tooltip showTooltip={showTooltip} lang={lang} /> */}
          </div>
        </div>
      </div>
    </section>
  );
} 