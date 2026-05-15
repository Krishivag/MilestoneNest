import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Star, ArrowDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TestimonialsSection } from '@/components/blocks/testimonials-with-marquee';
import Hero3D from '@/components/Hero3D';
import KanbanDemo from '@/components/KanbanDemo';
import useResponsive from '../hooks/useResponsive';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
    const [progress, setProgress] = useState(0);
    const heroRef = useRef(null);
    const sectionsRef = useRef([]);
    const { isMobile, isTablet } = useResponsive();

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;
            setProgress(scrollPercent * 100);
        };

        window.addEventListener('scroll', updateProgress);

        // Hero Animation - Subtle fade out and move up (Only on desktop/tablet for performance)
        let heroCtx;
        if (!isMobile) {
            heroCtx = gsap.context(() => {
                gsap.to(heroRef.current, {
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: true
                    },
                    y: -50,
                    opacity: 0,
                    ease: "power1.out"
                });
            });
        }

        // Sections Entry Animation - Smooth slide up and fade in
        // On mobile, we skip the initial opacity: 0 to ensure content is always visible
        const sectionsCtx = gsap.context(() => {
            if (!isMobile) {
                sectionsRef.current.forEach((section) => {
                    if (!section) return;

                    // Animate IN
                    gsap.fromTo(section.children,
                        { y: 50, opacity: 0 },                                           
                        {
                            scrollTrigger: {
                                trigger: section,
                                start: "top 85%",
                                end: "top 50%",
                                toggleActions: "play none none none"
                            },
                            y: 0,
                            opacity: 1,
                            stagger: 0.1,
                            duration: 1,
                            ease: "power3.out"
                        }
                    );
                });
            }
        });

        return () => {
            window.removeEventListener('scroll', updateProgress);
            if (heroCtx) heroCtx.revert();
            sectionsCtx.revert();
        };
    }, [isMobile]);

    const addToRefs = (el) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

    return (
        <div style={{
            backgroundColor: '#FAFAFA',
            color: '#171717',
            minHeight: '100vh',
            fontFamily: '"Inter", "Helvetica Neue", sans-serif',
            overflowX: 'hidden',
            lineHeight: 1.6
        }}>
            {/* Scroll Progress Indicator */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                height: '3px',
                backgroundColor: '#171717',
                width: `${progress}%`,
                zIndex: 100,
                transition: 'width 0.1s ease-out'
            }} />

            {/* Navigation */}
            <nav style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: isMobile ? '1.5rem 5%' : '2rem 5%',
                maxWidth: '1400px',
                margin: '0 auto',
                position: 'relative',
                zIndex: 20
            }}>
                <div style={{ fontSize: '1.25rem', fontWeight: '600', letterSpacing: '-0.03em' }}>
                    Milestonenest.
                </div>
                <div style={{ display: 'flex', gap: isMobile ? '1rem' : '2rem', alignItems: 'center' }}>
                    <Link to="/login" style={{
                        color: '#525252',
                        textDecoration: 'none',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        transition: 'all 0.2s ease',
                        display: isMobile ? 'none' : 'inline-block'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = '#171717';
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = '#525252';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                    >
                        Log In
                    </Link>
                    <Link to="/login" style={{
                        padding: isMobile ? '0.5rem 1rem' : '0.75rem 1.5rem',
                        borderRadius: '999px',
                        backgroundColor: '#171717',
                        color: 'white',
                        textDecoration: 'none',
                        fontWeight: 500,
                        fontSize: '0.95rem',
                        transition: 'transform 0.2s',
                        display: 'inline-block'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Get Started
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <header ref={heroRef} style={{
                padding: isMobile ? '4rem 5% 3rem' : '8rem 5% 6rem',
                textAlign: 'center',
                position: 'relative',
                minHeight: isMobile ? 'auto' : '90vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Hero3D />

                <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                    <h1 style={{
                        fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
                        fontWeight: '800',
                        lineHeight: 1.05,
                        letterSpacing: '-0.04em',
                        marginBottom: '2rem',
                        color: '#171717'
                    }}>
                        Clarity for your <br />
                        <span style={{ color: '#737373' }}>chaotic workflow.</span>
                    </h1>
                    <p style={{
                        fontSize: 'clamp(1rem, 2vw, 1.5rem)',
                        color: '#525252',
                        marginBottom: '3rem',
                        maxWidth: '600px',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        fontWeight: 400
                    }}>
                        A handcrafted workspace for teams who value focus over features. Track tasks, hit milestones, and breathe easier.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
                        <Link to="/login" style={{
                            padding: isMobile ? '1rem 2rem' : '1.25rem 2.5rem',
                            borderRadius: '999px',
                            backgroundColor: '#171717',
                            color: 'white',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: isMobile ? '1rem' : '1.125rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            transition: 'all 0.3s ease'
                        }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Start for Free <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>

                {!isMobile && (
                    <div style={{
                        marginTop: 'auto',
                        paddingTop: '4rem',
                        opacity: 0.5,
                        animation: 'bounce 2s infinite',
                        position: 'relative',
                        zIndex: 10
                    }}>
                        <ArrowDown size={24} />
                    </div>
                )}
            </header>

            {/* Features Section - Bento Grid Style */}
            <section ref={addToRefs} style={{ padding: isMobile ? '4rem 5%' : '8rem 5%', backgroundColor: '#F5F5F5' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ marginBottom: isMobile ? '3rem' : '6rem' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
                            Designed for focus.
                        </h2>
                        <p style={{ fontSize: '1.25rem', color: '#737373', maxWidth: '500px' }}>
                            Everything you need, nothing you don't.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: isMobile ? '1.5rem' : '2rem',
                        autoRows: 'minmax(300px, auto)'
                    }}>
                        {/* Kanban Feature - Interactive Demo */}
                        <div style={{
                            gridColumn: '1 / -1',
                            backgroundColor: 'white',
                            padding: isMobile ? '1.5rem' : '3rem',
                            borderRadius: '2rem',
                            boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                            display: 'flex',
                            flexDirection: 'column',
                        }}>
                            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                                <div style={{ width: '50px', height: '50px', backgroundColor: '#F5F5F5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                                    <Check size={24} color="#171717" />
                                </div>
                                <h3 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Kanban, refined.</h3>
                                <p style={{ fontSize: '1.125rem', color: '#737373', maxWidth: '600px', margin: '0 auto' }}>
                                    A clutter-free board that lets you visualize your work without the noise. Drag, drop, done.
                                </p>
                            </div>
                            <KanbanDemo />
                        </div>

                        {/* Tall Feature - Milestones */}
                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{
                                backgroundColor: '#171717',
                                color: 'white',
                                padding: isMobile ? '2rem' : '3rem',
                                borderRadius: '2rem',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                height: '100%'
                            }}
                                onMouseEnter={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }
                                }}>
                                <div>
                                    <h3 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Milestones</h3>
                                    <p style={{ fontSize: '1.125rem', color: '#A3A3A3' }}>
                                        Keep your eyes on the prize. Track major goals and celebrate every win.
                                    </p>
                                </div>
                                <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    <span style={{ padding: '0.5rem 1rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '99px', fontSize: '0.875rem' }}>Q4 Launch</span>
                                    <span style={{ padding: '0.5rem 1rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '99px', fontSize: '0.875rem' }}>Design System</span>
                                </div>
                            </div>
                        </Link>

                        {/* Standard Feature - Analytics */}
                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{
                                backgroundColor: 'white',
                                padding: isMobile ? '2rem' : '3rem',
                                borderRadius: '2rem',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                height: '100%'
                            }}
                                onMouseEnter={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)';
                                    }
                                }}>
                                <div style={{ width: '50px', height: '50px', backgroundColor: '#F5F5F5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                                    <Star size={24} color="#171717" />
                                </div>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Analytics</h3>
                                <p style={{ fontSize: '1.125rem', color: '#737373' }}>
                                    Insights that actually matter. See where your time goes.
                                </p>
                            </div>
                        </Link>

                        {/* Standard Feature - Collaboration */}
                        <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div style={{
                                backgroundColor: 'white',
                                padding: isMobile ? '2rem' : '3rem',
                                borderRadius: '2rem',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
                                cursor: 'pointer',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                height: '100%'
                            }}
                                onMouseEnter={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(-4px)';
                                        e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.08)';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!isMobile) {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.02)';
                                    }
                                }}>
                                <div style={{ width: '50px', height: '50px', backgroundColor: '#F5F5F5', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                                    <ArrowRight size={24} color="#171717" />
                                </div>
                                <h3 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Collaboration</h3>
                                <p style={{ fontSize: '1.125rem', color: '#737373' }}>
                                    Built for teams that move fast. Real-time updates, zero lag.
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials Section - Marquee Style */}
            <div ref={addToRefs}>
                <TestimonialsSection
                    title="Loved by the best."
                    description="Join thousands of teams who have found their flow with Milestonenest."
                    testimonials={[
                        {
                            author: {
                                name: "Elena R.",
                                handle: "@elenadesign",
                                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
                            },
                            text: "It feels less like a tool and more like a natural extension of my thought process. The 3D elements are a nice touch!",
                            href: "#"
                        },
                        {
                            author: {
                                name: "Marcus J.",
                                handle: "@marcusdev",
                                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
                            },
                            text: "Finally, project management software that doesn't give me a headache. It's gorgeous and incredibly fast.",
                            href: "#"
                        },
                        {
                            author: {
                                name: "Sarah K.",
                                handle: "@sarahproduct",
                                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
                            },
                            text: "The clarity Milestonenest provides is unmatched. Our velocity increased by 40% since we switched.",
                            href: "#"
                        },
                        {
                            author: {
                                name: "Alex M.",
                                handle: "@alexstartup",
                                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
                            },
                            text: "I've tried them all. This is the only one that actually helps me focus instead of distracting me.",
                            href: "#"
                        }
                    ]}
                />
            </div>

            {/* CTA Section */}
            <section ref={addToRefs} style={{ padding: isMobile ? '4rem 5%' : '8rem 5%', textAlign: 'center', backgroundColor: '#171717', color: 'white' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: '800', marginBottom: '2rem', letterSpacing: '-0.04em' }}>
                        Ready to find your flow?
                    </h2>
                    <p style={{ fontSize: '1.25rem', color: '#A3A3A3', marginBottom: '3rem' }}>
                        Join the waitlist or start your free trial today. No credit card required.
                    </p>
                    <Link to="/login" style={{
                        padding: '1.25rem 3rem',
                        borderRadius: '999px',
                        backgroundColor: 'white',
                        color: '#171717',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '1.125rem',
                        display: 'inline-block',
                        transition: 'transform 0.2s'
                    }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                        Get Started
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '4rem 5%', borderTop: '1px solid #E5E5E5' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                    <div style={{ fontWeight: '600', fontSize: '1.125rem' }}>Milestonenest.</div>
                    <div style={{ display: 'flex', gap: '2rem', color: '#737373', fontSize: '0.9rem' }}>
                        <Link to="/privacy" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy</Link>
                        <Link to="/terms" style={{ color: 'inherit', textDecoration: 'none' }}>Terms</Link>
                        <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Twitter</a>
                    </div>
                    <div style={{ color: '#A3A3A3', fontSize: '0.9rem' }}>
                        &copy; 2025 Milestonenest Inc.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
