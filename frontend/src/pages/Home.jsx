import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Globe, Heart, Users } from "lucide-react";
import ImageWithLoader from "../components/ImageWithLoader";

/* IMPORT IMAGES */
import CF1 from "../assets/images/CF1.jpg";
import CF2 from "../assets/images/CF2.jpg";
import CF3 from "../assets/images/CF3.jpg";
import CS1 from "../assets/images/CS1.jpg";
import CS2 from "../assets/images/CS2.jpg";
import FD from "../assets/images/FD.jpg";
import FD1 from "../assets/images/FD1.jpg";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const mainRef = useRef(null);
  const heroRef = useRef(null);
  const heroImageRef = useRef(null);
  const pinnedSectionRef = useRef(null);
  const pinnedContentRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. HERO PARALLAX (Advanced)
      // The hero image moves slightly slower than scroll to create depth
      gsap.to(heroImageRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Hero Text Reveal
      const tl = gsap.timeline();
      tl.from(".hero-char", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.2,
      });

      // 2. PINNED "PHILOSOPHY" SECTION (The BEC "Sticky" Effect)
      // The left side (text) stays pinned while the right side (content) scrolls
      if (window.innerWidth > 768) { // Only on desktop
        ScrollTrigger.create({
          trigger: pinnedSectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: ".pinned-text",
          pinSpacing: false,
        });

        // Animate the image cards as they enter the pinned view
        const cards = gsap.utils.toArray(".scroll-card");
        cards.forEach((card, i) => {
          gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 20%",
              toggleActions: "play none none reverse",
              scrub: 1,
            },
          });
        });
      }

      // 3. IMPACT TEXT REVEAL (Scrubbed)
      gsap.fromTo(".impact-text span",
        { color: "#333" },
        {
          color: "#fff",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".impact-section",
            start: "top 60%",
            end: "bottom 60%",
            scrub: true,
          }
        }
      );

      // 4. HORIZONTAL GALLERY SCROLL
      gsap.to(".gallery-track", {
        xPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: galleryRef.current,
          pin: true,
          scrub: 1,
          start: "center center",
          end: "+=2000", // Scroll distance
        },
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-[#fffbf2] overflow-x-hidden">

      {/* ================= HERO SECTION ================= */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden z-0">
        <div className="absolute inset-0 z-0 h-[120%] -top-[10%]" ref={heroImageRef}>
          <ImageWithLoader
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920&auto=format&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover brightness-[0.6]"
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto text-white">
          <p className="hero-char uppercase tracking-[0.3em] text-sm md:text-base font-medium mb-6 text-orange-200">
            The Movement
          </p>
          <h1 className="text-6xl md:text-8xl lg:text-[9rem] font-serif leading-none tracking-tighter mb-8 mix-blend-overlay opacity-90">
            <span className="hero-char inline-block">S</span>
            <span className="hero-char inline-block">h</span>
            <span className="hero-char inline-block">a</span>
            <span className="hero-char inline-block">r</span>
            <span className="hero-char inline-block">e</span>
            <span className="inline-block w-4"></span>
            <span className="hero-char inline-block text-orange-400">H</span>
            <span className="hero-char inline-block text-orange-400">o</span>
            <span className="hero-char inline-block text-orange-400">p</span>
            <span className="hero-char inline-block text-orange-400">e</span>
          </h1>

          <div className="hero-char mt-12 flex justify-center">
            <div className="w-[1px] h-24 bg-gradient-to-b from-white to-transparent animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* ================= PINNED SCROLL SECTION (BEC Style) ================= */}
      <section ref={pinnedSectionRef} className="relative min-h-[200vh] flex flex-col md:flex-row bg-[#fffbf2] z-10">

        {/* LEFT: PINNED TEXT */}
        <div className="w-full md:w-1/2 h-screen flex flex-col justify-center px-8 md:px-20 pinned-text sticky top-0">
          <h2 className="text-orange-600 font-bold tracking-widest uppercase text-xs mb-4">
            OUR PHILOSOPHY
          </h2>
          <h3 className="text-5xl md:text-7xl font-serif text-gray-900 leading-[0.9] mb-8">
            Bridging<br />Abundance<br /><span className="italic text-orange-500">&</span> Need.
          </h3>
          <p className="text-gray-600 text-lg max-w-md leading-relaxed">
            We believe that hunger is a logistics problem, not a scarcity problem. By connecting surplus with need, we create a world where everyone eats.
          </p>
          <div className="mt-10">
            <Link to="/donate" className="inline-flex items-center gap-2 text-black border-b border-black pb-1 hover:text-orange-600 hover:border-orange-600 transition-all group">
              LEARN MORE <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* RIGHT: SCROLLING CONTENT */}
        <div ref={pinnedContentRef} className="w-full md:w-1/2 flex flex-col gap-[20vh] py-[20vh] px-6 md:px-20 relative z-10">

          {/* Card 1 */}
          <div className="scroll-card w-full">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl mb-6">
              <ImageWithLoader src={FD} alt="Food" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <h4 className="text-2xl font-serif mb-2">Reduce Waste</h4>
            <p className="text-gray-500 text-sm">Every meal saved is a step towards a greener planet.</p>
          </div>

          {/* Card 2 */}
          <div className="scroll-card w-full translate-y-20">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl mb-6">
              <ImageWithLoader src={CS1} alt="Community" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <h4 className="text-2xl font-serif mb-2">Feed Community</h4>
            <p className="text-gray-500 text-sm">Direct connection between donors and local families.</p>
          </div>

          {/* Card 3 */}
          <div className="scroll-card w-full">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-2xl mb-6">
              <ImageWithLoader src={CF1} alt="Joy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <h4 className="text-2xl font-serif mb-2">Share Joy</h4>
            <p className="text-gray-500 text-sm">The simple act of giving transforms lives permanently.</p>
          </div>
        </div>
      </section>

      {/* ================= IMPACT (Dark Mode Scrub) ================= */}
      <section className="impact-section min-h-screen bg-black flex items-center justify-center relative px-6 z-20">
        <div className="text-center max-w-5xl">
          <h2 className="impact-text text-5xl md:text-8xl font-serif font-bold text-[#333] leading-tight transition-colors">
            <span>One </span><span>Action </span><span>Can </span><br />
            <span>Change </span><span>Everything.</span>
          </h2>
          <div className="mt-20">
            <Link to="/login">
              <button className="px-10 py-4 border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-all duration-300">
                JOIN US TODAY
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ================= HORIZONTAL SCROLL GALLERY ================= */}
      <section ref={galleryRef} className="h-screen bg-orange-50 overflow-hidden flex items-center relative z-20">
        <div className="gallery-track flex gap-10 px-[10vw] w-fit">
          <div className="min-w-[60vw] md:min-w-[40vw] text-left">
            <h2 className="text-8xl font-serif text-orange-900 leading-none">
              Moments<br />of Hope
            </h2>
            <p className="text-xl mt-6 max-w-md text-orange-800/60">
              Real stories from real people making a difference in their local communities.
            </p>
          </div>

          {[CF1, CS1, FD, CF2, CS2, CF3, FD1].map((img, i) => (
            <div key={i} className="min-w-[80vw] md:min-w-[40vw] aspect-[4/3] bg-gray-200 rounded-lg overflow-hidden relative group">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10"></div>
              <img src={img} alt="Gallery" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
              <div className="absolute bottom-6 left-6 z-20 text-white">
                <p className="text-lg font-bold">Captured Moment {i + 1}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute bottom-10 left-10 text-orange-900/40 text-sm font-mono tracking-widest animate-pulse">
          SCROLL TO EXPLORE &rarr;
        </div>
      </section>

    </div>
  );
};

export default Home;
