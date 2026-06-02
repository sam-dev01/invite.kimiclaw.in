// Database of 25 Premium Templates + 13 ShaadiPath Templates (Total 38 Premium layouts)
const demos = [
  {
    code: "351",
    id: "bloom-template",
    title: "Bloom",
    tag: "Floral Editorial",
    tier: "Luxury",
    categories: ["bestsellers", "botanical"],
    url: "demos/bloom-template/source/index.html",
    previewImg: "demos/bloom-template/source/assets/venue-illustration-CJozVy2q.png",
    description: "A romantic and beautiful botanical layout with elegant pastel floral visual systems, multi-day guest itineraries, and instant RSVP.",
    features: ["Delicate floral watercolor illustrations", "Interactive ceremony countdown timer", "Multi-day timeline schedules", "WhatsApp RSVP questionnaire", "Elegant masonry photo gallery"]
  },
  {
    code: "352",
    id: "aventureros-demo",
    title: "Aventureros",
    tag: "Travel Inspired",
    tier: "Premium",
    categories: ["bestsellers", "modern"],
    url: "demos/aventureros-demo/source/index.html",
    previewImg: "assets/media__1780062043451.png",
    description: "A cinematic boarding-pass travel style template with custom schedules, flight itinerary visual markers, countdowns, and music.",
    features: ["Unique airline ticket style header", "Travel stamp micro-animations", "Google Maps location links", "Floating media music controller", "Mobile-first booking request form"]
  },
  {
    code: "353",
    id: "maison-doree",
    title: "Maison Dorée",
    tag: "Luxury Gold",
    tier: "Luxury",
    categories: ["bestsellers", "classical"],
    url: "demos/maison-doree/source/index.html",
    previewImg: "demos/bloom-template/source/assets/accommodation-archway-rgzoR4rb.png",
    description: "An extravagant gold-laden wedding suite with elegant high-fashion serif lettering, detailed hotel stay guides, and itinerary notes.",
    features: ["Brushed gold frames & scrollwork", "Premium hotel recommendations grid", "Elegant typography & fine line borders", "Ambient playlist music widget", "Integrated gift registry information"]
  },
  {
    code: "354",
    id: "teatro",
    title: "Teatro",
    tag: "Theatre Reveal",
    tier: "Luxury",
    categories: ["classical", "excellence"],
    url: "demos/teatro/source/index.html",
    previewImg: "assets/gate-final-preview.png",
    description: "A theatrical masterpiece featuring a custom animated stage curtain reveal on load, and vintage stageplay editorial design.",
    features: ["Interactive animated velvet curtain intro", "Retro theater playbill visual aesthetic", "Sophisticated schedule timeline cards", "WhatsApp response form", "Luxury golden typographic styling"]
  },
  {
    code: "355",
    id: "nautical-template",
    title: "Nautical",
    tag: "Coastal Classic",
    tier: "Premium",
    categories: ["classical"],
    url: "demos/nautical-template/source/index.html",
    previewImg: "demos/bloom-template/source/assets/transport-car-B1HQctzX.png",
    description: "A clean oceanfront layout featuring soft blue color palettes, nautical typography details, and dress code cards.",
    features: ["Seaside visual styling & anchors", "Interactive wedding day timeline", "Beach dress code guidelines card", "Integrated photo grid slider", "Direct location mapping"]
  },
  {
    code: "356",
    id: "rosas-template",
    title: "Rosas",
    tag: "Romantic Roses",
    tier: "Premium",
    categories: ["classical"],
    url: "demos/rosas-template/source/index.html",
    previewImg: "demos/bloom-template/source/assets/rsvp-portrait-mMZuOcbA.png",
    description: "Soft pink rose watercolor visual systems with built-in intro video headers, elegant timeline markers, and gift list notes.",
    features: ["Elegant rose illustrations", "Video intro opening frame", "Wedding countdown clock", "Gift notes section", "Interactive guest response forms"]
  },
  {
    code: "357",
    id: "majestic",
    title: "Majestic Elegance",
    tag: "Royal Luxury",
    tier: "Luxury",
    categories: ["bestsellers", "classical"],
    url: "demos/majestic/source/index.html",
    previewImg: "demos/majestic/source/assets/hero-template-majestic-D4H0kti9.webp",
    description: "The crown jewel of classical invitations, featuring royal gold frames, custom crests, and extensive guest RSVP parameters.",
    features: ["Custom digital wax seal crest animation", "Sleek multi-page layout simulator", "Advanced guest preference forms", "Gift list & registry widgets", "Aesthetic parallax photo sections"]
  },
  {
    code: "358",
    id: "majestic-template",
    title: "Majestic Gold",
    tier: "Premium",
    tag: "Classic Gold",
    categories: ["classical"],
    url: "demos/majestic-template/source/index.html",
    previewImg: "demos/bloom-template/source/assets/gallery-10-BJ_0Yhoj.jpg",
    description: "Clean classical layouts with gold leaf details, structured event schedule blocks, and instant RSVP replies.",
    features: ["Brushed gold framing layout", "Clean timeline icons", "Gift registry note widget", "WhatsApp RSVP links", "Elegant mobile photo grid"]
  },
  {
    code: "359",
    id: "editorial",
    title: "Boda Editorial",
    tag: "Modern Editorial",
    tier: "Premium",
    categories: ["editorial"],
    url: "demos/editorial/source/index.html",
    previewImg: "demos/bloom-template/source/assets/gallery-16-BN7G54Qj.jpg",
    description: "A highly sophisticated minimalist style mimicking fashion magazines, high contrast serif titles, and asymmetric photo layouts.",
    features: ["Asymmetric magazine-style layout", "Perfect high-contrast editorial typography", "Sleek inline music player", "Interactive maps & stays section", "Minimalist WhatsApp guest form"]
  },
  {
    code: "360",
    id: "daynight-template",
    title: "Day & Night",
    tag: "Dynamic Chic",
    tier: "Premium",
    categories: ["modern"],
    url: "demos/daynight-template/source/index.html",
    previewImg: "assets/media__1780060613681.jpg",
    description: "A unique design that lets users toggle between a bright elegant cream Day Theme and a dark gold starry Night Theme.",
    features: ["Interactive Day/Night aesthetic switcher", "Constellation micro-graphics", "Elegant dark gold contrast panels", "Floating map directions widget", "WhatsApp RSVP tracking"]
  },
  {
    code: "361",
    id: "dolcevita-demo",
    title: "Dolce Vita",
    tag: "Mediterranean Coast",
    tier: "Luxury",
    categories: ["classical"],
    url: "demos/dolcevita-demo/source/index.html",
    previewImg: "demos/bloom-template/source/assets/accommodation-pool-mJ6MY4xs.png",
    description: "Inspired by the Amalfi Coast, featuring vibrant majolica tiling patterns, deep blue oceans, and romantic scroll layout.",
    features: ["Majolica blue tile framing visual elements", "Elegant Italian serif typography", "Floating audio player with preloaded soundtrack", "Interactive venue links", "Parallax image sections"]
  },
  {
    code: "362",
    id: "excellence-demo",
    title: "Excellence Bespoke",
    tag: "Bespoke Illustration",
    tier: "Excellence",
    categories: ["bestsellers", "excellence"],
    url: "demos/excellence-demo/source/index.html",
    previewImg: "assets/palace_backdrop.png",
    description: "A completely bespoke digital layout including dynamic hand-drawn watercolor venue illustration overlays and custom intro motion.",
    features: ["Hand-drawn custom venue painting overlay", "Premium cinematic opening screen", "Dynamic guest name personalization", "Accommodations booking modules", "Dual RSVP option (WhatsApp & Form)"]
  },
  {
    code: "363",
    id: "excellence-template",
    title: "Excellence Classic",
    tag: "Luxury Art",
    tier: "Luxury",
    categories: ["excellence"],
    url: "demos/excellence-template/source/index.html",
    previewImg: "assets/wedding_gate.png",
    description: "High-end creative templates using beautiful hand-lettered gold headers, luxury fonts, and unlimited photo gallery.",
    features: ["Hand-lettered golden calligraphy details", "Immersive media players", "Accommodation booking blocks", "Interactive wedding day timeline", "VIP Priority support"]
  },
  {
    code: "364",
    id: "finca-demo",
    title: "Rustic Finca",
    tag: "Earth Botanical",
    tier: "Premium",
    categories: ["botanical", "classical"],
    url: "demos/finca-demo/source/index.html",
    previewImg: "demos/bloom-template/source/assets/weekend-church-oval-exdYj30l.png",
    description: "Warm terracotta and sage rustic designs featuring organic olive branch watercolor drawings and country estate guidelines.",
    features: ["Olive branch illustrations", "Warm terracotta & stone color palette", "Aesthetic country wedding timeline", "Accommodation suggestions block", "Interactive WhatsApp RSVPs"]
  },
  {
    code: "365",
    id: "floral-demo",
    title: "Watercolor Floral",
    tag: "Romantic Garden",
    tier: "Premium",
    categories: ["botanical"],
    url: "demos/floral-demo/source/index.html",
    previewImg: "demos/bloom-template/source/assets/welcome-flowers-Dy0evJgO.png",
    description: "Delicate and soft watercolor garden flowers surrounding clean modern invitation grids with music play functions.",
    features: ["Hand-painted floral accents", "Aesthetic event calendar invite", "Sleek checklist guest response", "Google Maps location links", "Floating music controls"]
  },
  {
    code: "366",
    id: "mediterranean-template",
    title: "Mediterranean Blue",
    tag: "Ocean Escape",
    tier: "Premium",
    categories: ["modern"],
    url: "demos/mediterranean-template/source/index.html",
    previewImg: "demos/bloom-template/source/assets/gallery-19-jTDIEDkB.jpg",
    description: "Vibrant oceanfront theme with bright blue details, elegant Greek/Spanish mosaic tiles, and wedding countdown.",
    features: ["Greek mosaic tile illustrations", "Bright maritime color palettes", "Wedding event timeline tracker", "WhatsApp guest confirmations", "Photo gallery grid"]
  },
  {
    code: "367",
    id: "premium-circo",
    title: "Circo Whimsical",
    tag: "Fantasy Carnival",
    tier: "Luxury",
    categories: ["excellence"],
    url: "demos/premium-circo/source/index.html",
    previewImg: "demos/bloom-template/source/assets/checkered-frame-BwM-aUT2.png",
    description: "A whimsical, unique, and delightful vintage circus/carnival layout designed for creative and unconventional couples.",
    features: ["Animated ticket card intro", "Vintage carousel scroll graphics", "Interactive fun maps", "Delightful retro typography", "Custom RSVP questionnaires"]
  },
  {
    code: "368",
    id: "premium-elegante",
    title: "Elegante Noir",
    tag: "Noir Luxury",
    tier: "Luxury",
    categories: ["editorial", "modern"],
    url: "demos/premium-elegante/source/index.html",
    previewImg: "demos/bloom-template/source/assets/black-tie-illustration-Bzqxj15v.png",
    description: "A high-fashion black and deep gold high-contrast theme, combining bold serif headings and sleek photo filters.",
    features: ["High-contrast dark luxury noir palette", "Bold editorial letterings", "Polished fade animations on scroll", "Interactive timeline & stays map", "Custom domain compatibility"]
  },
  {
    code: "369",
    id: "premium-selva",
    title: "Selva Tropical",
    tag: "Tropical Botanical",
    tier: "Luxury",
    categories: ["botanical"],
    url: "demos/premium-selva/source/index.html",
    previewImg: "demos/bloom-template/source/assets/accommodation-key-BlOBCOEh.png",
    description: "Deep lush forest greens, palm leaves, gold foil elements, and comprehensive lodging maps for destination events.",
    features: ["Deep green jungle leaf overlays", "Gold foil accents & border framing", "Multi-day events itinerary", "Hotel accommodations grid", "RSVP with guest count dropdowns"]
  },
  {
    code: "370",
    id: "sweetlove-demo",
    title: "Sweet Love",
    tag: "Romantic Chic",
    tier: "Premium",
    categories: ["modern"],
    url: "demos/sweetlove-demo/source/index.html",
    previewImg: "demos/bloom-template/source/assets/gallery-15-B6WOzNNx.jpg",
    description: "Warm blush pink and champagne gold elements with pre-configured romantic audio loops and streamlined WhatsApp response cards.",
    features: ["Soft pink & ivory aesthetic", "Pre-configured romantic music looping", "Dynamic events countdown timer", "Gift registry note block", "Direct WhatsApp RSVPs"]
  },
  {
    code: "371",
    id: "theatre-demo",
    title: "Theatre Vintage",
    tag: "Retro Playbill",
    tier: "Luxury",
    categories: ["excellence"],
    url: "demos/theatre-demo/source/index.html",
    previewImg: "demos/bloom-template/source/assets/gallery-11-DtICv6j2.jpg",
    description: "Vintage ticket stub and classic playbill visual system with ticket-punch details and old cinema typography.",
    features: ["Vintage ticket stub styling", "Custom ticket punch animations", "Old cinema editorial typography", "Ceremony timeline blocks", "Gift registry cards"]
  },
  {
    code: "372",
    id: "minimalist-demo",
    title: "Sleek Minimalist",
    tag: "Clean Modern",
    tier: "Premium",
    categories: ["minimalist"],
    url: "demos/minimalist-demo/source/index.html",
    previewImg: "demos/bloom-template/source/assets/gallery-2-CSzuzifn.jpg",
    description: "An ultra-clean modern grid focusing attention on details with stunning sans-serif typography, large photos, and simple forms.",
    features: ["Ultra-clean grid styling", "Luxury sans-serif pairings", "Integrated map pins", "Sleek single-button RSVP", "Minimalist timeline list"]
  },
  {
    code: "373",
    id: "save-the-date-candlelight",
    title: "Candlelight STD",
    tag: "Save the Date",
    tier: "Save the Date",
    categories: ["savethedate"],
    url: "demos/save-the-date-candlelight/source/index.html",
    previewImg: "demos/bloom-template/source/assets/gallery-3-B8TX3EAU.jpg",
    description: "A warm candlelight romantic pre-invitation landing card designed to announce your upcoming date with a countdown.",
    features: ["Starry candlelight glowing layouts", "Live countdown clock", "Simple guest count WhatsApp form", "Sleek single photo card", "Pre-invite details banner"]
  },
  {
    code: "374",
    id: "save-the-date-lace",
    title: "Lace STD",
    tag: "Save the Date",
    tier: "Save the Date",
    categories: ["savethedate"],
    url: "demos/save-the-date-lace/source/index.html",
    previewImg: "demos/bloom-template/source/assets/gallery-4-l95HTdkR.jpg",
    description: "Delicate white lace watercolor details layered over elegant sand panels, designed for romantic pre-announcements.",
    features: ["Lace design borders", "Clean romantic fonts", "Aesthetic 'Save our Date' calendar block", "Google Maps location placeholder", "WhatsApp quick response link"]
  },
  {
    code: "375",
    id: "save-the-date-scratch",
    title: "Scratch Card STD",
    tag: "Save the Date",
    tier: "Save the Date",
    categories: ["savethedate"],
    url: "demos/save-the-date-scratch/source/index.html",
    previewImg: "demos/bloom-template/source/assets/gallery-13-DgpPSe4h.jpg",
    description: "An interactive digital scratch card where guests click or drag to rub off a golden coat, revealing the wedding date in a playful way.",
    features: ["Interactive touch/click scratch canvas", "Golden scratch coating surface simulation", "Surprise date reveal animation", "Minimalist location details", "WhatsApp response links"]
  },
  
  // New ShaadiPath Traditional Indian wedding layouts (Copied & Integrated)
  {
    code: "376",
    id: "shaadipath-template01",
    title: "Shaadi Classic",
    tag: "Traditional Tanya",
    tier: "Luxury",
    categories: ["bestsellers", "indian", "traditional", "classical"],
    url: "demos/shaadipath-template01/source/index.html",
    previewImg: "demos/shaadipath-template01/preview.png",
    description: "Ganesha blessings, paper-cut walking elephants transition, and custom multi-celebration Jodhpur timelines.",
    features: ["Traditional Ganesha icon blessing", "Elephant walk scroll transition", "Mehendi, Haldi & Sagan timeline", "Preloaded traditional Indian music loop", "WhatsApp RSVP questionnaire"]
  },
  {
    code: "377",
    id: "shaadipath-template02",
    title: "Rajputana Royal",
    tag: "Traditional Indian",
    tier: "Premium",
    categories: ["indian", "traditional"],
    url: "demos/shaadipath-template02/source/index.html",
    previewImg: "demos/shaadipath-template02/preview.png",
    description: "A gorgeous Rajputana fortress theme with bright saffron watercolor floral details and elegant Hindi-English fonts.",
    features: ["Rajasthan palace watercolor art", "Golden toran framing banners", "Multi-event timeline list", "Aesthetic photo grids", "Google Maps navigation link"]
  },
  {
    code: "378",
    id: "shaadipath-template03",
    title: "Mandap Gold",
    tag: "Traditional Luxury",
    tier: "Luxury",
    categories: ["indian", "traditional", "classical"],
    url: "demos/shaadipath-template03/source/index.html",
    previewImg: "demos/shaadipath-template03/preview.png",
    description: "Mandap marigold visual accents, paper-cut gold filigree, and royal sans-serif lettering.",
    features: ["Marigold toran garlands details", "Golden mandala preloader trace", "Accommodations stays guide", "Sleek musical soundtrack player", "WhatsApp RSVP integration"]
  },
  {
    code: "379",
    id: "shaadipath-template04",
    title: "Chai & Sagan",
    tag: "Rustic Indian",
    tier: "Premium",
    categories: ["indian", "traditional"],
    url: "demos/shaadipath-template04/source/index.html",
    previewImg: "demos/shaadipath-template04/preview.png",
    description: "Warm terracotta clay textured panels, tea cups illustrations, and romantic blessings quotes.",
    features: ["Rustic terracotta visual paneling", "Aesthetic 'Chai Addicts' themed tag", "Haldi & Sagan ceremonies timeline", "Wedding date countdown clock", "Integrated maps location link"]
  },
  {
    code: "380",
    id: "shaadipath-template05",
    title: "Peacock Royal",
    tag: "Mandala Splendor",
    tier: "Luxury",
    categories: ["bestsellers", "indian", "traditional"],
    url: "demos/shaadipath-template05/source/index.html",
    previewImg: "demos/shaadipath-template05/preview.png",
    description: "Traditional watercolor royal peacock sketches, rich gold scroll lines, and dynamic photo galleries.",
    features: ["Watercolor royal peacock illustrations", "Mandala circular visual backdrops", "Accommodations booking modules", "Traditional music player loops", "VIP support included"]
  },
  {
    code: "381",
    id: "shaadipath-template06",
    title: "Shubh Vivah",
    tag: "Vibrant Mandap",
    tier: "Premium",
    categories: ["indian", "traditional"],
    url: "demos/shaadipath-template06/source/index.html",
    previewImg: "demos/shaadipath-template06/preview.png",
    description: "Deep red shubh vivah motif layout, mandala circles, and checklist RSVP questions.",
    features: ["Shubh Vivah traditional banner logo", "Vibrant crimson and gold color system", "Checklist guest reply flow", "Ceremonies timing indicators", "Photo gallery slider"]
  },
  {
    code: "382",
    id: "shaadipath-template07",
    title: "Marigold Garden",
    tag: "Garden Pheras",
    tier: "Premium",
    categories: ["indian", "traditional", "botanical"],
    url: "demos/shaadipath-template07/source/index.html",
    previewImg: "demos/shaadipath-template07/preview.png",
    description: "Delicate marigold branch drawings and garden mandap ceremony notes, ideal for organic rustic celebrations.",
    features: ["Marigold branch watercolor sketches", "Soft sage and sandstone palettes", "Mandap ceremony timeline list", "WhatsApp RSVP links", "Google Maps direct routes"]
  },
  {
    code: "383",
    id: "shaadipath-template08",
    title: "Umaid Palace",
    tag: "Rajasthan Heritage",
    tier: "Luxury",
    categories: ["indian", "traditional", "excellence"],
    url: "demos/shaadipath-template08/source/index.html",
    previewImg: "demos/shaadipath-template08/preview.png",
    description: "Royal palace architectural illustrations, detailed wedding schedules, and stay instructions.",
    features: ["Umaid Bhawan architecture overlays", "Royal Rajputana visual layout", "Accommodations and transport grids", "Bespoke illustrated watercolor map compatibility", "Direct RSVP buttons"]
  },
  {
    code: "384",
    id: "shaadipath-template09",
    title: "Mehndi Raas",
    tag: "Saffron Festive",
    tier: "Premium",
    categories: ["indian", "traditional"],
    url: "demos/shaadipath-template09/source/index.html",
    previewImg: "demos/shaadipath-template09/preview.png",
    description: "Saffron yellow and marigold colors, traditional folk dance patterns, and instant guest feedback.",
    features: ["Mehndi yellow festive visual systems", "Raas/Folk music looping track", "Event details with maps markers", "Dynamic date counter clock", "WhatsApp fast replies"]
  },
  {
    code: "385",
    id: "shaadipath-template10",
    title: "Hawa Mahal",
    tag: "Heritage Pink",
    tier: "Luxury",
    categories: ["indian", "traditional"],
    url: "demos/shaadipath-template10/source/index.html",
    previewImg: "demos/shaadipath-template10/preview.png",
    description: "Heritage pink sand aesthetic, delicate screen overlay textures, and extensive playlist selectors.",
    features: ["Jaipur heritage pink visual overlays", "Traditional Jali screen textures", "Ambient soundtrack selector widget", "Accommodation guides panel", "RSVP with guest count selector"]
  },
  {
    code: "386",
    id: "shaadipath-std-01-sand",
    title: "Sand Mandala STD",
    tag: "Traditional Pre-Invite",
    tier: "Save the Date",
    categories: ["savethedate", "indian", "traditional"],
    url: "demos/shaadipath-std-01-sand/source/index.html",
    previewImg: "demos/shaadipath-std-01-sand/preview.png",
    description: "A gorgeous sand mandala Save the Date pre-invitation card with active countdown.",
    features: ["Mandala gold graphics", "Live countdown clock", "Simple RSVP links", "Elegant Sand color theme"]
  },
  {
    code: "387",
    id: "shaadipath-std-02-peacock",
    title: "Peacock Crest STD",
    tag: "Traditional Pre-Invite",
    tier: "Save the Date",
    categories: ["savethedate", "indian", "traditional"],
    url: "demos/shaadipath-std-02-peacock/source/index.html",
    previewImg: "demos/shaadipath-std-02-peacock/preview.png",
    description: "Watercolor peacock crest pre-invitation landing card designed for royal wedding previews.",
    features: ["Watercolor peacock crest overlay", "Sleek countdown widget", "WhatsApp quick RSVPs", "Traditional typography logo"]
  },
  {
    code: "388",
    id: "shaadipath-std-03-Mirror",
    title: "Shubh Lagan STD",
    tag: "Traditional Pre-Invite",
    tier: "Save the Date",
    categories: ["savethedate", "indian", "traditional"],
    url: "demos/shaadipath-std-03-Mirror/source/index.html",
    previewImg: "demos/shaadipath-std-03-Mirror/preview.png",
    description: "A stunning modern mirrors collage Save the Date template featuring high contrast Indian festive tags.",
    features: ["Indian festive border frames", "Starry glow layouts", "Simple RSVP form", "Google Maps venue pins"]
  }
];

// Bilingual Translations Dictionaries
const i18n = {
  en: {
    brandName: "invite.kimiclaw.in",
    brandSubtitle: "Premium Digital Invitations",
    navHowItWorks: "How it works",
    navPlayground: "Features",
    navDesigns: "Designs",
    navPricing: "Pricing",
    
    heroEyebrow: "Premium Custom Wedding Websites",
    heroTitle: "Handcrafted <span>digital invitations</span> that wow your guests.",
    heroLead: "Elevate your wedding announcement. Stunning invitation websites complete with instant RSVP via WhatsApp, music player, interactive maps, schedules, and photos.",
    heroBtnExplore: "Explore Catalog",
    heroBtnOrder: "Start Guided Order",
    
    stepsEyebrow: "The Process",
    stepsTitle: "From premium template to custom delivery.",
    stepsDesc: "We turn your selected template into a beautifully customized wedding invitation link in 4 simple steps.",
    step1Title: "Select Your Design",
    step1Desc: "Browse our catalog of 38 premium responsive wedding templates and choose the style that resonates with your wedding theme.",
    step2Title: "Personalize Details",
    step2Desc: "Provide your names, dates, maps, photos, custom music playlist, and RSVP questions through our guided order form wizard.",
    step3Title: "Review Draft Preview",
    step3Desc: "Our designers customize the invitation specifically for you, setting up interactive features and delivering a draft preview link.",
    step4Title: "Go Live & Share",
    step4Desc: "Once approved, your premium invite link is live! Share it easily with your guests via WhatsApp, Email, or Social Media.",
    
    playEyebrow: "Interactive Sandbox",
    playTitle: "Try the premium features.",
    playDesc: "Interact with our simulated features below to see how they behave on a guests' mobile phone screen.",
    tabRsvpTitle: "Instant RSVP via WhatsApp",
    tabRsvpDesc: "Simulate filling out food preferences and generating a beautifully formatted RSVP WhatsApp message.",
    tabMusicTitle: "Ambient Music Player",
    tabMusicDesc: "Test our elegant, integrated floating music play widget with simulated sound wave feedback.",
    tabTimeTitle: "Interactive Event Schedule",
    tabTimeDesc: "Interactive wedding itinerary showing ceremonies, dress codes, dinner, and dancing timelines.",
    tabMapsTitle: "Venue Map Integration",
    tabMapsDesc: "Allows guests to view event locations and tap direct navigation coordinates for Google Maps.",
    
    catEyebrow: "Design Catalog",
    catTitle: "Choose your unique style.",
    catDesc: "Explore our comprehensive collection of 38 luxury invitation templates designed to look spectacular on any mobile screen.",
    filterAll: "All Designs",
    filterBest: "Bestsellers",
    filterClassic: "Classical",
    filterModern: "Modern",
    filterEditorial: "Editorial",
    filterTraditional: "Traditional",
    filterIndian: "Indian",
    filterStd: "Save the Date",
    
    hubTitle: "Atelier Collection",
    hubDesc: "Browse all our 38 luxury invitation designs. Filter by category, search by name, and instantly test them in our interactive smartphone simulator.",
    
    plan1Name: "Essential",
    plan1Desc: "Elegantly personal single-page invite featuring core invitation elements and beautiful photo presentation.",
    plan1F1: "Single-section Premium Invitation",
    plan1F2: "Core Ceremony & Venue details",
    plan1F3: "Aesthetic Photo Gallery (up to 8)",
    plan1F4: "Google Maps address listing",
    plan1F5: "Shareable Link hosted for 1 year",
    
    plan2Name: "Premium",
    plan2Desc: "A highly customizable and feature-packed digital wedding invitation experience with custom timelines and RSVP.",
    plan2F1: "Multi-event structured timeline layout",
    plan2F2: "Interactive WhatsApp RSVP form",
    plan2F3: "Ambient Music Player (custom track)",
    plan2F4: "Enriched Gallery (up to 20 photos)",
    plan2F5: "Event countdown timer widget",
    plan2F6: "Accommodation & Dress code notes",
    badgeFeatured: "Popular",
    
    plan3Name: "Excellence",
    plan3Desc: "Completely bespoke high-fashion wedding layout custom engineered with unique illustrations and personal domain.",
    plan3F1: "Highly customizable bespoke layouts",
    plan3F2: "Custom co-branded domain setup",
    plan3F3: "Bespoke watercolor digital map",
    plan3F4: "Dynamic Guest Name Personalization",
    plan3F5: "Animated Opening Video Intro",
    plan3F6: "Premium Support & Unlimited edits",
    
    planBtn: "Select Layout",
    
    priceEyebrow: "Pricing Plans",
    priceTitle: "Tailored packages for premium needs.",
    priceDesc: "Transparent, flat pricing with zero monthly fees. Choose your package and configure custom add-ons instantly.",
    
    calcTitle: "Dynamic Pricing Calculator",
    calcPlanLabel: "1. Choose Base Plan",
    calcAddonsLabel: "2. Select Premium Upgrades (Add-ons)",
    calcTotalLabel: "Estimated Total",
    calcBtnOrder: "Order Package",
    addonDomain: "Custom Domain",
    addonDomainDesc: "e.g., brideandgroom.com",
    addonIntro: "Animated Intro",
    addonIntroDesc: "Luxury opening cinematic intro",
    addonMap: "Illustrated Map",
    addonMapDesc: "Bespoke artistic venue map",
    addonPers: "Name Personalization",
    addonPersDesc: "Add specific names dynamically",
    
    consultEyebrow: "Custom Consultation",
    consultTitle: "Do you want a completely unique masterpiece?",
    consultDesc: "If you need an extraordinary wedding website designed entirely from scratch, with interactive elements, special animations, custom illustrations, or multi-day guest accommodations, get in touch with our lead designer today.",
    consultBtn: "Send Request",
    labelName: "Your Name",
    labelPhone: "WhatsApp / Phone",
    labelNotes: "Wedding details & ideas",
    
    detailBack: "Back to catalog",
    detailPlanLabel: "Choose Layout Base Plan",
    detailBtnOrder: "Personalize This Design",
    detailBtnLive: "Open Live Demo",
    
    wizTitle: "Custom Order Details",
    wizStep1Header: "1. Selection & Package",
    wizStep2Header: "2. Wedding Event details",
    wizStep3Header: "3. Upgrades & Contact",
    wizStep4Header: "4. Order Summary",
    labelPlan: "Target Plan",
    labelBase: "Invitation Base Style",
    labelCurrency: "Preferred Currency",
    labelGuests: "Estimated Guest Count",
    labelBride: "Bride's Name",
    labelGroom: "Groom's Name",
    labelDate: "Wedding Date",
    labelVenue: "Wedding Venue",
    labelContactName: "Your Contact Name",
    labelContactEmail: "Email Address",
    labelContactPhone: "WhatsApp / Phone Number",
    labelUpgrades: "Premium Upgrades (Included in Total):",
    summaryBrideGroom: "Couple Details:",
    summaryDate: "Date & Venue:",
    summaryBasePlan: "Layout Base Plan:",
    summaryBaseStyle: "Design Style:",
    summaryAddons: "Addons Selected:",
    summaryTotal: "Estimated Total:",
    summaryNotice: "The order request will be saved locally. You will now be redirected to complete your payment securely via Razorpay.",
    wizBtnPrev: "Previous",
    wizBtnNext: "Next Step",
    wizBtnSubmit: "Pay & Complete Order",
    viewAllDesignsBtn: "View all 38 designs",
    
    footerTagline: "Bespoke luxury wedding invitation websites crafted by professional designers. Fully interactive, mobile-optimized, and built to amaze your guests.",
    footerProducts: "Solutions",
    footerLinkDemos: "Design Catalog",
    footerLinkPricing: "Package Pricing",
    footerLinkFeatures: "Features Sandbox",
    footerLinkCustom: "Custom Masterpiece",
    footerSupport: "Our Studio",
    footerContactHours: "Mon - Sat: 9:00 - 19:00"
  },
  es: {
    brandName: "invite.kimiclaw.in",
    brandSubtitle: "Invitaciones Digitales Premium",
    navHowItWorks: "Cómo funciona",
    navPlayground: "Funciones",
    navDesigns: "Diseños",
    navPricing: "Precios",
    
    heroEyebrow: "Sitios Web de Boda Premium",
    heroTitle: "Invitaciones <span>digitales y únicas</span> que fascinan a tus invitados.",
    heroLead: "Eleva el anuncio de tu boda. Increíbles invitaciones web equipadas con confirmación RSVP por WhatsApp, música, mapas interactivos, horarios estructurados y fotos.",
    heroBtnExplore: "Ver Catálogo",
    heroBtnOrder: "Pedido Guiado",
    
    stepsEyebrow: "El Proceso",
    stepsTitle: "De plantilla premium a entrega personalizada.",
    stepsDesc: "Convertimos la plantilla elegida en un hermoso enlace web de boda personalizado en 4 sencillos pasos.",
    step1Title: "Elige tu Diseño",
    step1Desc: "Explora nuestro catálogo de 38 plantillas premium y escoge el estilo que mejor combine con el concepto de tu boda.",
    step2Title: "Personaliza Detalles",
    step2Desc: "Facilítanos vuestros nombres, fechas, mapas, fotos y música a través de nuestro wizard de pedido guiado.",
    step3Title: "Aprobación de Borrador",
    step3Desc: "Nuestros diseñadores editan y adaptan la invitación para vosotros, configurando las funciones y enviando un enlace preview.",
    step4Title: "Lanzamiento y Envío",
    step4Desc: "Tras vuestra aprobación final, ¡el enlace ya está activo! Envía la invitación cómodamente a tus invitados por WhatsApp.",
    
    playEyebrow: "Sandbox Interactivo",
    playTitle: "Prueba las funciones premium.",
    playDesc: "Interactúa con las simulaciones de abajo para ver cómo se comportan en la pantalla móvil de un invitado.",
    tabRsvpTitle: "RSVP Instantáneo por WhatsApp",
    tabRsvpDesc: "Simula rellenar preferencias de comida y alergias y generar el mensaje estructurado para WhatsApp.",
    tabMusicTitle: "Reproductor de Música",
    tabMusicDesc: "Prueba nuestro elegante widget flotante de música con simulación visual de ondas de audio.",
    tabTimeTitle: "Cronograma del Evento",
    tabTimeDesc: "Itinerario de boda interactivo que muestra las ceremonias, dress codes, cenas y barra libre.",
    tabMapsTitle: "Integración de Mapas",
    tabMapsDesc: "Permite a los invitados consultar las ubicaciones y abrir coordenadas de navegación en Google Maps.",
    
    catEyebrow: "Catálogo de Diseños",
    catTitle: "Encuentra tu estilo.",
    catDesc: "Explora nuestra colección completa de 38 diseños premium optimizados para lucir espectaculares en pantallas móviles.",
    filterAll: "Todos los Diseños",
    filterBest: "Más Vendidos",
    filterClassic: "Clásicos",
    filterModern: "Modernos",
    filterEditorial: "Editoriales",
    filterTraditional: "Tradicionales",
    filterIndian: "India",
    filterStd: "Save the Date",
    
    hubTitle: "Colección Atelier",
    hubDesc: "Explora todos nuestros 38 diseños de invitaciones de lujo. Filtra por categoría, busca por nombre y pruébalos al instante en el simulador móvil.",
    
    priceEyebrow: "Tarifas de Planes",
    priceTitle: "Paquetes pensados para ti.",
    priceDesc: "Tarifas planas y transparentes sin cuotas recurrentes. Elige tu plan y añade extras a tu medida al instante.",
    plan1Name: "Essential",
    plan1Desc: "Elegante invitación de página única que incluye los datos centrales de la boda y una hermosa galería de fotos.",
    plan1F1: "Invitación de una sola sección premium",
    plan1F2: "Detalles centrales de ceremonia y banquete",
    plan1F3: "Galería de fotos cuidada (hasta 8 fotos)",
    plan1F4: "Enlace y dirección de Google Maps",
    plan1F5: "Enlace activo y alojado durante 1 año",
    
    plan2Name: "Premium",
    plan2Desc: "Nuestra experiencia de boda digital más completa con RSVP interactivo, música y cronogramas a medida.",
    plan2F1: "Cronograma estructurado multi-evento",
    plan2F2: "Confirmación RSVP por WhatsApp interactiva",
    plan2F3: "Reproductor de música de fondo (pista a elección)",
    plan2F4: "Galería de fotos de boda (hasta 20 fotos)",
    plan2F5: "Widget de cuenta atrás del evento",
    plan2F6: "Bloques de alojamiento, transporte y dress code",
    badgeFeatured: "Popular",
    
    plan3Name: "Excellence",
    plan3Desc: "Diseño premium completamente hecho a mano, incluyendo ilustraciones personalizadas y dominio propio.",
    plan3F1: "Diseño y maquetación a medida desde cero",
    plan3F2: "Configuración de dominio web propio",
    plan3F3: "Mapa ilustrado en acuarela por diseñador",
    plan3F4: "Personalización dinámica de nombres de invitados",
    plan3F5: "Intro en vídeo animado de apertura premium",
    plan3F6: "Soporte prioritario y cambios ilimitados",
    
    planBtn: "Seleccionar Diseño",
    
    calcTitle: "Calculadora de Precios",
    calcPlanLabel: "1. Elige Plan de Base",
    calcAddonsLabel: "2. Selecciona Extras Opcionales (Add-ons)",
    calcTotalLabel: "Total Estimado",
    calcBtnOrder: "Realizar Pedido",
    addonDomain: "Dominio Propio",
    addonDomainDesc: "ej. sofiamarc.com",
    addonIntro: "Intro Animada",
    addonIntroDesc: "Vídeo de apertura de cine premium",
    addonMap: "Mapa Ilustrado",
    addonMapDesc: "Mapa de la finca hecho a mano",
    addonPers: "Personalización Invitados",
    addonPersDesc: "Añade nombres individuales dinámicos",
    
    consultEyebrow: "Consulta a Medida",
    consultTitle: "¿Buscáis una obra de arte única?",
    consultDesc: "Si necesitáis una web de boda completamente exclusiva, diseñada y programada desde cero, con animaciones complejas, mapas interactivos avanzados, reservas de hotel o integraciones a medida, contacta con nuestro diseñador jefe.",
    consultBtn: "Solicitar Consulta",
    labelName: "Tu Nombre",
    labelPhone: "WhatsApp / Teléfono",
    labelNotes: "Detalles e ideas de la boda",
    
    detailBack: "Volver al catálogo",
    detailPlanLabel: "Selecciona Plan del Diseño",
    detailBtnOrder: "Personalizar Este Diseño",
    detailBtnLive: "Ver Demo en Vivo",
    
    wizTitle: "Detalles del Pedido",
    wizStep1Header: "1. Selección de Plan",
    wizStep2Header: "2. Datos de la Boda",
    wizStep3Header: "3. Extras y Contacto",
    wizStep4Header: "4. Resumen del Pedido",
    labelPlan: "Plan Elegido",
    labelBase: "Estilo Base de Invitación",
    labelCurrency: "Moneda de Pago",
    labelGuests: "Nº Invitados Estimado",
    labelBride: "Nombre de la Novia",
    labelGroom: "Nombre del Novio",
    labelDate: "Fecha de la Boda",
    labelVenue: "Lugar de la Boda",
    labelContactName: "Nombre de Contacto",
    labelContactEmail: "Correo Electrónico",
    labelContactPhone: "Teléfono / WhatsApp",
    labelUpgrades: "Extras Premium (Incluidos en el Total):",
    summaryBrideGroom: "Nombres Novios:",
    summaryDate: "Fecha y Lugar:",
    summaryBasePlan: "Plan Elegido:",
    summaryBaseStyle: "Estilo Base:",
    summaryAddons: "Extras Seleccionados:",
    summaryTotal: "Total Estimado:",
    summaryNotice: "La solicitud de pedido se guardará localmente. Ahora serás redirigido para completar tu pago de forma segura mediante Razorpay.",
    wizBtnPrev: "Anterior",
    wizBtnNext: "Siguiente Paso",
    wizBtnSubmit: "Pagar y Completar Pedido",
    viewAllDesignsBtn: "Ver los 38 diseños",
    
    footerTagline: "Sitios web de invitación de boda premium hechos a mano por diseñadores profesionales. Interactivos, optimizados para móvil y creados para fascinar a todos.",
    footerProducts: "Soluciones",
    footerLinkDemos: "Catálogo de Diseños",
    footerLinkPricing: "Precios de Planes",
    footerLinkFeatures: "Sandbox de Funciones",
    footerLinkCustom: "Obra de Arte Exclusiva",
    footerSupport: "Estudio",
    footerContactHours: "Lun - Sáb: 9:00 - 19:00"
  }
};

// Global pricing tables
const pricingTable = {
  INR: {
    // Layout base plans
    Simple: 999,
    CustomDomain: 1999,
    ScratchGallery: 2999,
    // Legacy plan keys (kept for calculator section)
    Essential: 4999,
    Premium: 8999,
    Excellence: 14999,
    // Add-ons
    domain: 1999,
    intro: 2499,
    map: 3999,
    personalization: 2999,
    symbol: "₹"
  },
  EUR: {
    Simple: 12,
    CustomDomain: 24,
    ScratchGallery: 36,
    Essential: 175,
    Premium: 295,
    Excellence: 495,
    domain: 49,
    intro: 59,
    map: 99,
    personalization: 79,
    symbol: "€"
  },
  USD: {
    Simple: 13,
    CustomDomain: 24,
    ScratchGallery: 36,
    Essential: 190,
    Premium: 320,
    Excellence: 540,
    domain: 55,
    intro: 65,
    map: 110,
    personalization: 85,
    symbol: "$"
  }
};

// Application State
let state = {
  currentLang: "en",
  currentCurrency: "USD",
  theme: "light",
  selectedPlan: "Premium",
  selectedAddons: new Set(),
  activeFilter: "all",
  activeHubFilter: "all",
  hubSearchQuery: "",
  wizardStep: 1,
  activeSandboxFeature: "rsvp"
};

// Document Selectors
const app = document.querySelector("#app");
const langBtn = document.querySelector("#lang-btn");
const themeBtn = document.querySelector("#theme-btn");
const catalogGrid = document.querySelector("#catalog-grid");
const hubCatalogGrid = document.querySelector("#hub-catalog-grid");
const homeView = document.querySelector("#home-view");
const detailView = document.querySelector("#detail-view");
const designsHubView = document.querySelector("#designs-hub-view");
const hubSearchInput = document.querySelector("#hub-search-input");

// Wizard Selectors
const wizardDialog = document.querySelector("#wizard-dialog");
const wizardForm = document.querySelector("#wizard-form");
const wizPrevBtn = document.querySelector("#wiz-prev-btn");
const wizNextBtn = document.querySelector("#wiz-next-btn");
const wizSubmitBtn = document.querySelector("#wiz-submit-btn");
const wizProgressBar = document.querySelector("#wizard-progress-bar");
const wizardCloseBtn = document.querySelector("#wizard-close-btn");
const wizBaseStyleSelector = document.querySelector("#wiz-base-style");

// Setup Base Style Options in Wizard Form
function populateWizardBaseStyles() {
  if (wizBaseStyleSelector) {
    wizBaseStyleSelector.innerHTML = demos.map(demo => 
      `<option value="${demo.title}">${demo.title} (#${demo.code} - ${demo.tag})</option>`
    ).join("");
  }
}

// Global UI Translation
function translateUI() {
  const dictionary = i18n[state.currentLang];
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.innerHTML = dictionary[key];
    }
  });
  
  // Custom button update
  if (langBtn) {
    langBtn.textContent = state.currentLang === "en" ? "ES" : "EN";
  }
  
  // Placeholder translations
  const nameInput = document.querySelector("#consult-name");
  const phoneInput = document.querySelector("#consult-whatsapp");
  const notesInput = document.querySelector("#consult-details");
  if (nameInput) nameInput.placeholder = state.currentLang === "en" ? "e.g. Sofia & Marc" : "ej. Sofía y Marc";
  if (phoneInput) phoneInput.placeholder = state.currentLang === "en" ? "+34 600 000 000" : "+34 600 000 000";
  if (notesInput) notesInput.placeholder = state.currentLang === "en" ? "Tell us your wedding concept..." : "Cuéntanos vuestra idea de boda...";

  if (hubSearchInput) {
    hubSearchInput.placeholder = state.currentLang === "en" ? "Search designs by name..." : "Buscar diseños por nombre...";
  }
}

// Render dynamic card function helper
function buildCardHtml(demo) {
  const styleAttr = demo.previewImg ? `style="background-image: url('${demo.previewImg}'); background-size: cover; background-position: center;"` : "";
  return `
    <div class="design-card">
      <span class="design-tag">${demo.tag}</span>
      <span class="design-code-badge">#${demo.code}</span>
      <div class="design-thumb" ${styleAttr}>
        ${!demo.previewImg ? `<div class="design-thumb-icon">${demo.title}</div>` : ""}
      </div>
      <div class="design-info">
        <h3>${demo.title} <span style="font-family: var(--font-sans); font-weight: normal; color: var(--text-secondary); font-size: 14px; margin-left: 6px;">#${demo.code}</span></h3>
        <p>${demo.description}</p>
        <div class="design-footer">
          <span class="design-tier">${demo.tier}</span>
          <a class="design-link" href="#design/${demo.id}">
            <span data-i18n="planBtn">Select Layout</span> <span>→</span>
          </a>
        </div>
      </div>
    </div>
  `;
}

// Catalog Grid Generation (Main Landing Page)
function renderCatalog() {
  if (!catalogGrid) return;
  // Landing grid subsets
  let filtered = demos;
  if (state.activeFilter !== "all") {
    filtered = filtered.filter(demo => demo.categories.includes(state.activeFilter));
  }
  // limit landing to first 6 items for visual spacing
  const subset = filtered.slice(0, 6);
  
  catalogGrid.innerHTML = subset.map(buildCardHtml).join("");
  translateLocalUI(catalogGrid);
}

// Separate Page Designs Hub Grid Generation (All 38 items + search + filters)
function renderHubCatalog() {
  if (!hubCatalogGrid) return;
  
  let filtered = demos;
  
  // Filter by category
  if (state.activeHubFilter !== "all") {
    filtered = filtered.filter(demo => demo.categories.includes(state.activeHubFilter));
  }
  
  // Filter by Search Query
  if (state.hubSearchQuery.trim() !== "") {
    const q = state.hubSearchQuery.toLowerCase();
    filtered = filtered.filter(demo => 
      demo.title.toLowerCase().includes(q) || 
      demo.tag.toLowerCase().includes(q) ||
      demo.description.toLowerCase().includes(q) ||
      (demo.code && demo.code.toLowerCase().includes(q))
    );
  }
  
  hubCatalogGrid.innerHTML = filtered.map(buildCardHtml).join("");
  translateLocalUI(hubCatalogGrid);
}

function translateLocalUI(container) {
  const dictionary = i18n[state.currentLang];
  container.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    if (dictionary[key]) {
      element.innerHTML = dictionary[key];
    }
  });
}

// Feature Simulator Sandbox Setup
const featureSandboxWidgets = {
  rsvp: {
    en: `
      <div class="sim-rsvp-form">
        <h4 class="sim-widget-title">Marc & Sofia</h4>
        <p style="font-size:12px; color:var(--text-secondary); text-align:center; margin-bottom:8px;">Kindly reply before September 1st</p>
        <input type="text" id="sim-rsvp-name" placeholder="Guest Name(s)" required>
        <select id="sim-rsvp-attendance">
          <option value="Joyfully Attend">Joyfully Attend</option>
          <option value="Regretfully Decline">Regretfully Decline</option>
        </select>
        <select id="sim-rsvp-food">
          <option value="Standard Menu">Standard Menu</option>
          <option value="Vegetarian Menu">Vegetarian Menu</option>
          <option value="Gluten-Free Menu">Gluten-Free Menu</option>
        </select>
        <button type="button" id="sim-rsvp-submit-btn">Send RSVP via WhatsApp</button>
      </div>
    `,
    es: `
      <div class="sim-rsvp-form">
        <h4 class="sim-widget-title">Sofía & Marc</h4>
        <p style="font-size:12px; color:var(--text-secondary); text-align:center; margin-bottom:8px;">Confirma antes del 1 de Septiembre</p>
        <input type="text" id="sim-rsvp-name" placeholder="Nombre de Invitado(s)" required>
        <select id="sim-rsvp-attendance">
          <option value="Asistiré con Alegría">Asistiré con Alegría</option>
          <option value="No Podré Asistir">No Podré Asistir</option>
        </select>
        <select id="sim-rsvp-food">
          <option value="Menú Estándar">Menú Estándar</option>
          <option value="Menú Vegetariano">Menú Vegetariano</option>
          <option value="Menú Sin Gluten">Menú Sin Gluten</option>
        </select>
        <button type="button" id="sim-rsvp-submit-btn">Enviar RSVP por WhatsApp</button>
      </div>
    `
  },
  music: {
    en: `
      <div class="sim-music-player">
        <h4 class="sim-widget-title">Playlist Soundtrack</h4>
        <p style="font-size:12px; color:var(--text-secondary); margin-bottom:12px;">Romantic Ambient Loop</p>
        <div class="music-waves paused" id="sim-music-waves">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="player-info">
          <strong>A Thousand Years</strong>
          <small>Violin Romantic Version</small>
        </div>
        <button type="button" class="play-pause-btn" id="sim-music-play-btn">▶</button>
      </div>
    `,
    es: `
      <div class="sim-music-player">
        <h4 class="sim-widget-title">Banda Sonora</h4>
        <p style="font-size:12px; color:var(--text-secondary); margin-bottom:12px;">Hilo Musical Romántico</p>
        <div class="music-waves paused" id="sim-music-waves">
          <span></span><span></span><span></span><span></span><span></span>
        </div>
        <div class="player-info">
          <strong>A Thousand Years</strong>
          <small>Versión de Violín</small>
        </div>
        <button type="button" class="play-pause-btn" id="sim-music-play-btn">▶</button>
      </div>
    `
  },
  timeline: {
    en: `
      <div class="sim-timeline">
        <h4 class="sim-widget-title" style="margin-bottom:12px;">Wedding Itinerary</h4>
        <div class="sim-timeline-item active" data-time="17:00">
          <div class="sim-timeline-time">17:00</div>
          <div class="sim-timeline-content">
            <h4>Welcome Ceremony</h4>
            <p>Gathering at the garden patio with champagne welcome toasts.</p>
          </div>
        </div>
        <div class="sim-timeline-item" data-time="18:00">
          <div class="sim-timeline-time">18:00</div>
          <div class="sim-timeline-content">
            <h4>Solemn Ceremony</h4>
            <p>Exchange of vows at the beautiful chapel garden.</p>
          </div>
        </div>
        <div class="sim-timeline-item" data-time="20:00">
          <div class="sim-timeline-time">20:00</div>
          <div class="sim-timeline-content">
            <h4>Grand Dinner Banquet</h4>
            <p>Delightful dinner at the majestic grand saloon hall.</p>
          </div>
        </div>
      </div>
    `,
    es: `
      <div class="sim-timeline">
        <h4 class="sim-widget-title" style="margin-bottom:12px;">Cronograma del Día</h4>
        <div class="sim-timeline-item active" data-time="17:00">
          <div class="sim-timeline-time">17:00</div>
          <div class="sim-timeline-content">
            <h4>Ceremonia de Bienvenida</h4>
            <p>Reunión en el patio del jardín con brindis de champagne.</p>
          </div>
        </div>
        <div class="sim-timeline-item" data-time="18:00">
          <div class="sim-timeline-time">18:00</div>
          <div class="sim-timeline-content">
            <h4>Ceremonia Civil</h4>
            <p>Intercambio de votos matrimoniales en el jardín principal.</p>
          </div>
        </div>
        <div class="sim-timeline-item" data-time="20:00">
          <div class="sim-timeline-time">20:00</div>
          <div class="sim-timeline-content">
            <h4>Banquete de Gala</h4>
            <p>Deliciosa cena de boda en el gran salón de gala.</p>
          </div>
        </div>
      </div>
    `
  },
  maps: {
    en: `
      <div class="sim-maps">
        <div class="sim-map-dummy">Finca Mas Solers</div>
        <div class="sim-maps-info">
          <h4>Venue Celebration</h4>
          <p>Sant Pere de Ribes, Barcelona</p>
          <a href="https://maps.google.com/?q=Finca+Mas+Solers" target="_blank">Get Directions</a>
        </div>
      </div>
    `,
    es: `
      <div class="sim-maps">
        <div class="sim-map-dummy">Finca Mas Solers</div>
        <div class="sim-maps-info">
          <h4>Celebración del Enlace</h4>
          <p>Sant Pere de Ribes, Barcelona</p>
          <a href="https://maps.google.com/?q=Finca+Mas+Solers" target="_blank">Cómo llegar</a>
        </div>
      </div>
    `
  }
};

function renderSandboxFeature() {
  const displayBox = document.querySelector("#sim-display-box");
  if (!displayBox) return;
  
  displayBox.innerHTML = featureSandboxWidgets[state.activeSandboxFeature][state.currentLang];
  
  // Binding internal widgets logic
  if (state.activeSandboxFeature === "rsvp") {
    const rsvpBtn = document.querySelector("#sim-rsvp-submit-btn");
    const nameInput = document.querySelector("#sim-rsvp-name");
    const attendanceSelect = document.querySelector("#sim-rsvp-attendance");
    const foodSelect = document.querySelector("#sim-rsvp-food");
    
    if (rsvpBtn) {
      rsvpBtn.addEventListener("click", () => {
        if (!nameInput.value.trim()) {
          alert(state.currentLang === "en" ? "Please enter your name first!" : "¡Por favor, escribe tu nombre!");
          return;
        }
        const text = state.currentLang === "en"
          ? `Hello Sofia & Marc! I am RSVPing for your wedding. Guest: ${nameInput.value}, Attendance: ${attendanceSelect.value}, Menu option: ${foodSelect.value}. Can't wait!`
          : `¡Hola Sofía & Marc! Confirmo mi asistencia para vuestra boda. Invitado: ${nameInput.value}, Asistencia: ${attendanceSelect.value}, Opción de menú: ${foodSelect.value}. ¡Qué ilusión!`;
        
        alert((state.currentLang === "en" ? "WhatsApp message generated successfully:\n\n" : "Mensaje de WhatsApp generado con éxito:\n\n") + `"${text}"`);
      });
    }
  }
  
  if (state.activeSandboxFeature === "music") {
    const playBtn = document.querySelector("#sim-music-play-btn");
    const waves = document.querySelector("#sim-music-waves");
    if (playBtn && waves) {
      playBtn.addEventListener("click", () => {
        if (waves.classList.contains("paused")) {
          waves.classList.remove("paused");
          playBtn.textContent = "⏸";
        } else {
          waves.classList.add("paused");
          playBtn.textContent = "▶";
        }
      });
    }
  }
  
  if (state.activeSandboxFeature === "timeline") {
    document.querySelectorAll(".sim-timeline-item").forEach(item => {
      item.addEventListener("click", () => {
        document.querySelectorAll(".sim-timeline-item").forEach(t => t.classList.remove("active"));
        item.classList.add("active");
      });
    });
  }
}

// Page Routing & Detail Split Loader
function handleRoute() {
  const hash = location.hash.replace(/^#/, "") || "home";
  
  if (hash === "designs-hub") {
    // Show separate Designs Hub page
    homeView.style.display = "none";
    detailView.style.display = "none";
    designsHubView.style.display = "block";
    window.scrollTo(0,0);
    renderHubCatalog();
  } else if (hash.startsWith("design/")) {
    const designId = hash.split("/")[1];
    const design = demos.find(d => d.id === designId);
    
    if (design) {
      // Toggle views
      homeView.style.display = "none";
      designsHubView.style.display = "none";
      detailView.style.display = "block";
      window.scrollTo(0,0);
      
      // Load Details Content
      document.querySelector("#detail-tag").textContent = design.tag;
      document.querySelector("#detail-title").textContent = design.title;
      const detailCode = document.querySelector("#detail-code");
      if (detailCode) detailCode.textContent = `#${design.code}`;
      document.querySelector("#detail-desc").textContent = design.description;
      document.querySelector("#detail-features").innerHTML = design.features.map(f => `<li>${f}</li>`).join("");
      
      const iframe = document.querySelector("#detail-phone-iframe");
      iframe.src = design.url;
      
      const liveBtn = document.querySelector("#detail-demo-btn");
      if (liveBtn) liveBtn.href = design.url;
      
      // Wizard preloaded style
      wizBaseStyleSelector.value = design.title;
      
      // Reset checkout to step 1
      showCheckoutStep(1);
    }
  } else {
    // Show main page
    homeView.style.display = "block";
    detailView.style.display = "none";
    designsHubView.style.display = "none";
  }
}

// Multistep Form Wizard Logic
function updateWizardStep() {
  document.querySelectorAll(".wizard-step").forEach(step => {
    step.classList.remove("active");
    if (parseInt(step.dataset.step) === state.wizardStep) {
      step.classList.add("active");
    }
  });
  
  // Progress bar
  wizProgressBar.style.width = `${(state.wizardStep / 4) * 100}%`;
  
  // Buttons toggling
  if (state.wizardStep === 1) {
    wizPrevBtn.style.display = "none";
    wizNextBtn.style.display = "block";
    wizSubmitBtn.style.display = "none";
  } else if (state.wizardStep === 2 || state.wizardStep === 3) {
    wizPrevBtn.style.display = "block";
    wizNextBtn.style.display = "block";
    wizSubmitBtn.style.display = "none";
  } else if (state.wizardStep === 4) {
    wizPrevBtn.style.display = "block";
    wizNextBtn.style.display = "none";
    wizSubmitBtn.style.display = "block";
    
    // Compile step 4 summary
    compileWizardSummary();
  }
}

// Helper: convert raw plan key to human-readable label with price
function planLabel(planKey, currency = state.currentCurrency) {
  const table = pricingTable[currency] || pricingTable["INR"];
  const sym = table.symbol;
  const labels = {
    Simple:        `Simple \u2014 ${sym}${(table.Simple || 999).toLocaleString()}`,
    CustomDomain:  `Custom Domain \u2014 ${sym}${(table.CustomDomain || 1999).toLocaleString()}`,
    ScratchGallery:`Scratch + Photo Gallery \u2014 ${sym}${(table.ScratchGallery || 2999).toLocaleString()}`,
    // Keep legacy keys readable too
    Essential:   `Essential \u2014 ${sym}${(table.Essential || 4999).toLocaleString()}`,
    Premium:     `Premium \u2014 ${sym}${(table.Premium || 8999).toLocaleString()}`,
    Excellence:  `Excellence \u2014 ${sym}${(table.Excellence || 14999).toLocaleString()}`,
  };
  return labels[planKey] || planKey;
}

function compileWizardSummary() {
  const formData = new FormData(wizardForm);
  const bride = formData.get("brideName") || "";
  const groom = formData.get("groomName") || "";
  const dateVal = formData.get("weddingDate") || "";
  const venue = formData.get("venue") || "";
  const basePlan = formData.get("package") || "CustomDomain";
  const baseStyle = formData.get("baseStyle") || "Bloom";
  const currency = formData.get("currency") || state.currentCurrency;

  document.querySelector("#summary-names").textContent = `${bride} & ${groom}`;
  document.querySelector("#summary-date-venue").textContent = `${dateVal} at ${venue}`;
  document.querySelector("#summary-package").textContent = planLabel(basePlan, currency);
  
  const selectedDesign = demos.find(d => d.title === baseStyle);
  const displayStyle = selectedDesign ? `${baseStyle} (#${selectedDesign.code})` : baseStyle;
  document.querySelector("#summary-style").textContent = displayStyle;
  
  // Active addons list compiling
  const symbol = pricingTable[currency].symbol;
  const activeAddons = [];
  if (document.querySelector("#wiz-addon-domain").checked) activeAddons.push(i18n[state.currentLang].addonDomain);
  if (document.querySelector("#wiz-addon-intro").checked) activeAddons.push(i18n[state.currentLang].addonIntro);
  if (document.querySelector("#wiz-addon-map").checked) activeAddons.push(i18n[state.currentLang].addonMap);
  if (document.querySelector("#wiz-addon-pers").checked) activeAddons.push(i18n[state.currentLang].addonPers);
  
  document.querySelector("#summary-addons").innerHTML = activeAddons.length 
    ? activeAddons.join(", ") 
    : (state.currentLang === "en" ? "None" : "Ninguno");
    
  // Recalculate summary price
  let total = pricingTable[currency][basePlan];
  if (document.querySelector("#wiz-addon-domain").checked) total += pricingTable[currency].domain;
  if (document.querySelector("#wiz-addon-intro").checked) total += pricingTable[currency].intro;
  if (document.querySelector("#wiz-addon-map").checked) total += pricingTable[currency].map;
  if (document.querySelector("#wiz-addon-pers").checked) total += pricingTable[currency].personalization;
  
  document.querySelector("#summary-total-price").textContent = `${symbol}${total.toLocaleString()}`;
}

// ---- CHECKOUT FLOW HELPERS ----
function showCheckoutStep(stepNum) {
  document.querySelectorAll(".checkout-step").forEach(step => {
    step.classList.remove("checkout-step-active");
  });
  const target = document.querySelector(`#checkout-step-${stepNum}`);
  if (target) {
    target.classList.add("checkout-step-active");
  }
}

function populatePaymentSummary() {
  const designTitle = document.querySelector("#detail-title").textContent;
  const planKey = document.querySelector("#detail-plan-selector").value;
  const bride = document.querySelector("#ck-bride").value || "";
  const groom = document.querySelector("#ck-groom").value || "";
  const dateVal = document.querySelector("#ck-date").value || "—";
  const currency = state.currentCurrency;
  const table = pricingTable[currency];
  const total = table[planKey] || 999;

  document.querySelector("#pay-design-name").textContent = designTitle;
  document.querySelector("#pay-plan-name").textContent = planLabel(planKey, currency);
  document.querySelector("#pay-couple").textContent = `${bride} & ${groom}`;
  document.querySelector("#pay-date").textContent = dateVal;
  document.querySelector("#pay-total").textContent = `${table.symbol}${total.toLocaleString()}`;
}

function saveCheckoutOrder() {
  const data = {
    brideName: document.querySelector("#ck-bride").value,
    groomName: document.querySelector("#ck-groom").value,
    weddingDate: document.querySelector("#ck-date").value,
    venue: document.querySelector("#ck-venue").value,
    notes: document.querySelector("#ck-notes").value,
    contactName: document.querySelector("#ck-contact-name").value,
    contactEmail: document.querySelector("#ck-email").value,
    contactPhone: document.querySelector("#ck-phone").value,
    guests: document.querySelector("#ck-guests").value,
    design: document.querySelector("#detail-title").textContent,
    plan: document.querySelector("#detail-plan-selector").value,
    paymentMethod: document.querySelector("input[name='paymentMethod']:checked")?.value || "upi",
    createdAt: new Date().toISOString()
  };
  
  const savedOrders = JSON.parse(localStorage.getItem("kimiclawOrders") || "[]");
  savedOrders.push(data);
  localStorage.setItem("kimiclawOrders", JSON.stringify(savedOrders));
}

function populateConfirmation() {
  const designTitle = document.querySelector("#detail-title").textContent;
  const planKey = document.querySelector("#detail-plan-selector").value;
  const bride = document.querySelector("#ck-bride").value || "";
  const groom = document.querySelector("#ck-groom").value || "";
  const currency = state.currentCurrency;
  const table = pricingTable[currency];
  const total = table[planKey] || 999;
  
  // Generate unique order ID
  const orderId = `KC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
  
  document.querySelector("#conf-order-id").textContent = orderId;
  document.querySelector("#conf-design").textContent = designTitle;
  document.querySelector("#conf-plan").textContent = planLabel(planKey, currency);
  document.querySelector("#conf-amount").textContent = `${table.symbol}${total.toLocaleString()}`;
  document.querySelector("#conf-couple").textContent = `${bride} & ${groom}`;
  document.querySelector("#conf-delivery").textContent = "Within 48 hours";
}

// Event Listeners Binding
function bindEvents() {
  // Floating Label Logic
  document.querySelectorAll(".form-group.floating input, .form-group.floating textarea").forEach(input => {
    // Initial check
    if (input.value.trim() !== "") {
      input.closest(".form-group.floating").classList.add("has-val");
    }
    input.addEventListener("input", () => {
      if (input.value.trim() !== "") {
        input.closest(".form-group.floating").classList.add("has-val");
      } else {
        input.closest(".form-group.floating").classList.remove("has-val");
      }
    });
  });

  // Mobile Hamburger Menu
  const hamburgerBtn = document.querySelector("#hamburger-btn");
  const navMenu = document.querySelector("#nav-menu");
  
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", () => {
      const isOpen = hamburgerBtn.classList.toggle("open");
      navMenu.classList.toggle("open", isOpen);
      hamburgerBtn.setAttribute("aria-expanded", isOpen);
      
      // Lock body scroll when menu is open
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        hamburgerBtn.classList.remove("open");
        navMenu.classList.remove("open");
        hamburgerBtn.setAttribute("aria-expanded", false);
        document.body.style.overflow = "";
      });
    });
  }
  
  // Language Switcher
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      state.currentLang = state.currentLang === "en" ? "es" : "en";
      translateUI();
      renderCatalog();
      renderHubCatalog();
      renderSandboxFeature();
    });
  }
  
  // Dark/Light Theme Switcher
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      state.theme = state.theme === "light" ? "dark" : "light";
      document.body.dataset.theme = state.theme;
      themeBtn.textContent = state.theme === "light" ? "🌙" : "☀️";
    });
  }
  
  // Sandbox tabs
  document.querySelectorAll(".sandbox-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".sandbox-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      state.activeSandboxFeature = tab.dataset.feature;
      renderSandboxFeature();
    });
  });
  
  // Landing Catalog Filters
  document.querySelectorAll("[data-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.activeFilter = btn.dataset.filter;
      renderCatalog();
    });
  });

  // Separate Designs Hub Filters
  document.querySelectorAll("[data-hub-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-hub-filter]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      state.activeHubFilter = btn.dataset.hubFilter;
      renderHubCatalog();
    });
  });

  // Search input in Designs Hub
  if (hubSearchInput) {
    hubSearchInput.addEventListener("input", (e) => {
      state.hubSearchQuery = e.target.value;
      renderHubCatalog();
    });
  }
  
  // Details Page Back link
  const backBtn = document.querySelector("#detail-back-link");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      // Go back to the Designs Gallery Hub
      location.hash = "designs-hub";
    });
  }
  // Bind Order buttons to trigger Wizard Form
  const triggerWizard = (packageName = "Premium", styleName = "Bloom") => {
    state.wizardStep = 1;
    document.querySelector("#wiz-package").value = packageName;
    if (wizBaseStyleSelector) wizBaseStyleSelector.value = styleName;
    updateWizardStep();
    wizardDialog.showModal();
  };
  
  document.querySelectorAll(".order-package-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      triggerWizard(btn.dataset.package);
    });
  });
  
  const heroWizBtn = document.querySelector("#hero-wizard-btn");
  if (heroWizBtn) {
    heroWizBtn.addEventListener("click", () => {
      triggerWizard();
    });
  }
  
  const detailBuyBtn = document.querySelector("#detail-buy-btn");
  if (detailBuyBtn) {
    detailBuyBtn.addEventListener("click", () => {
      // Move to checkout step 2 (details & contact)
      showCheckoutStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- CHECKOUT FLOW NAVIGATION ----
  const ckBackToStep1 = document.querySelector("#ck-back-to-step1");
  const ckToPayment = document.querySelector("#ck-to-payment");
  const ckBackToStep2 = document.querySelector("#ck-back-to-step2");
  const ckPayNow = document.querySelector("#ck-pay-now");
  const confWhatsappBtn = document.querySelector("#conf-whatsapp-btn");

  if (ckBackToStep1) {
    ckBackToStep1.addEventListener("click", () => {
      showCheckoutStep(1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (ckToPayment) {
    ckToPayment.addEventListener("click", () => {
      // Validate form fields
      const form = document.querySelector("#checkout-details-form");
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      // Populate payment summary
      populatePaymentSummary();
      showCheckoutStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (ckBackToStep2) {
    ckBackToStep2.addEventListener("click", () => {
      showCheckoutStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (ckPayNow) {
    ckPayNow.addEventListener("click", () => {
      // Simulate payment processing
      ckPayNow.disabled = true;
      ckPayNow.textContent = "Processing...";
      
      setTimeout(() => {
        // Save order
        saveCheckoutOrder();
        // Populate confirmation
        populateConfirmation();
        showCheckoutStep(4);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        ckPayNow.disabled = false;
        ckPayNow.textContent = "Pay Now →";
      }, 1800);
    });
  }

  if (confWhatsappBtn) {
    confWhatsappBtn.addEventListener("click", () => {
      const bride = document.querySelector("#ck-bride").value || "";
      const groom = document.querySelector("#ck-groom").value || "";
      const designTitle = document.querySelector("#detail-title").textContent;
      const text = `Hi! I just placed an order for "${designTitle}" wedding invitation for ${bride} & ${groom}. Looking forward to the design!`;
      const whatsappUrl = `https://api.whatsapp.com/send?phone=34600000000&text=${whatsappUrlEncode(text)}`;
      window.open(whatsappUrl, "_blank");
    });
  }

  // Payment method selection UI
  document.querySelectorAll(".payment-method-option input[type='radio']").forEach(radio => {
    radio.addEventListener("change", () => {
      document.querySelectorAll(".payment-method-option").forEach(opt => opt.classList.remove("selected"));
      radio.closest(".payment-method-option").classList.add("selected");
    });
  });
  // ----------------------------
  
  // Wizard buttons controls
  if (wizPrevBtn) {
    wizPrevBtn.addEventListener("click", () => {
      if (state.wizardStep > 1) {
        state.wizardStep--;
        updateWizardStep();
      }
    });
  }
  
  if (wizNextBtn) {
    wizNextBtn.addEventListener("click", () => {
      // Step Validations before going next
      if (state.wizardStep === 1) {
        if (!wizardForm.checkValidity()) {
          wizardForm.reportValidity();
          return;
        }
      } else if (state.wizardStep === 2) {
        const bride = document.querySelector("#wiz-bride");
        const groom = document.querySelector("#wiz-groom");
        const date = document.querySelector("#wiz-date");
        const venue = document.querySelector("#wiz-venue");
        if (!bride.checkValidity() || !groom.checkValidity() || !date.checkValidity() || !venue.checkValidity()) {
          wizardForm.reportValidity();
          return;
        }
      } else if (state.wizardStep === 3) {
        const name = document.querySelector("#wiz-name");
        const email = document.querySelector("#wiz-email");
        const phone = document.querySelector("#wiz-phone");
        if (!name.checkValidity() || !email.checkValidity() || !phone.checkValidity()) {
          wizardForm.reportValidity();
          return;
        }
      }
      
      if (state.wizardStep < 4) {
        state.wizardStep++;
        updateWizardStep();
      }
    });
  }
  
  // Submit Wizard order via WhatsApp / LocalStorage
  if (wizSubmitBtn) {
    wizSubmitBtn.addEventListener("click", () => {
      const formData = new FormData(wizardForm);
      const data = Object.fromEntries(formData.entries());
      
      // Addons checkbox normalization
      data.addon_domain = document.querySelector("#wiz-addon-domain").checked;
      data.addon_intro = document.querySelector("#wiz-addon-intro").checked;
      data.addon_map = document.querySelector("#wiz-addon-map").checked;
      data.addon_pers = document.querySelector("#wiz-addon-pers").checked;
      
      // Save locally
      const savedOrders = JSON.parse(localStorage.getItem("kimiclawOrders") || "[]");
      savedOrders.push({ ...data, createdAt: new Date().toISOString() });
      localStorage.setItem("kimiclawOrders", JSON.stringify(savedOrders));
      
      // Build beautiful WhatsApp text message link
      const lineBreak = "%0A";
      const currency = data.currency || "INR";
      const symbol = pricingTable[currency].symbol;
      
      // Calculate active total
      let total = pricingTable[currency][data.package];
      if (data.addon_domain) total += pricingTable[currency].domain;
      if (data.addon_intro) total += pricingTable[currency].intro;
      if (data.addon_map) total += pricingTable[currency].map;
      if (data.addon_pers) total += pricingTable[currency].personalization;
      
      const selectedDesign = demos.find(d => d.title === data.baseStyle);
      const displayStyle = selectedDesign ? `${data.baseStyle} (#${selectedDesign.code})` : data.baseStyle;

      // Configure Razorpay integration
      if (typeof Razorpay !== "undefined") {
        const rzpOptions = {
          key: "rzp_live_SwqTC3My87u3Hc",
          amount: total * 100, // Amount is in subunits
          currency: currency,
          name: "invite.kimiclaw.in",
          description: "Premium Wedding Invitation",
          image: "https://invite.kimiclaw.in/assets/palace_backdrop.png",
          prefill: {
            name: data.contactName || (data.brideName + " & " + data.groomName),
            email: data.contactEmail,
            contact: data.contactPhone
          },
          theme: { color: "#C5A26B" },
          handler: function (response) {
            // Payment success handler
            const paymentId = response.razorpay_payment_id;
            
            const whatsappText = `*NEW DIGITAL INVITATION ORDER - invite.kimiclaw.in*` + lineBreak + lineBreak +
              `*✅ PAYMENT CONFIRMED (Razorpay)*` + lineBreak +
              `*Payment ID:* ${paymentId}` + lineBreak + lineBreak +
              `*Couple:* ${data.brideName} & ${data.groomName}` + lineBreak +
              `*Wedding Date:* ${data.weddingDate}` + lineBreak +
              `*Venue:* ${data.venue}` + lineBreak + lineBreak +
              `*Order Details:*` + lineBreak +
              `- Layout Plan: ${planLabel(data.package, currency)}` + lineBreak +
              `- Base Design: ${displayStyle}` + lineBreak +
              `- Guest Count: ${data.guests}` + lineBreak +
              `- Currency: ${currency}` + lineBreak +
              `- Add-ons: ${data.addon_domain ? "Custom Domain, " : ""}${data.addon_intro ? "Animated Intro, " : ""}${data.addon_map ? "Illustrated Map, " : ""}${data.addon_pers ? "Name Personalization" : "None"}` + lineBreak + lineBreak +
              `*Total Paid:* *${symbol}${total.toLocaleString()}*` + lineBreak + lineBreak +
              `*Contact:*` + lineBreak +
              `- Name: ${data.contactName}` + lineBreak +
              `- Email: ${data.contactEmail}` + lineBreak +
              `- WhatsApp: ${data.contactPhone}` + lineBreak + lineBreak +
              `*Notes:* ${data.notes || "None"}`;
              
            const whatsappUrl = `https://api.whatsapp.com/send?phone=34600000000&text=${whatsappUrlEncode(whatsappText)}`;
            
            wizardDialog.close();
            
            alert(state.currentLang === "en" 
              ? "Payment successful! We are redirecting you to WhatsApp to finalize your order details." 
              : "¡Pago realizado con éxito! Te estamos redirigiendo a WhatsApp para enviar los detalles finales."
            );
            
            window.open(whatsappUrl, "_blank");
          }
        };

        const rzpInstance = new Razorpay(rzpOptions);
        rzpInstance.on("payment.failed", function (response) {
          console.error("Payment Failed", response.error);
          alert(state.currentLang === "en" 
            ? "Payment failed or was cancelled. Please try again." 
            : "El pago ha fallado o ha sido cancelado. Por favor, inténtalo de nuevo."
          );
        });
        rzpInstance.open();
      } else {
        alert("Payment gateway is currently unavailable. Please check your internet connection and disable ad blockers.");
      }
    });
  }
  
  if (wizardCloseBtn) {
    wizardCloseBtn.addEventListener("click", () => {
      wizardDialog.close();
    });
  }
  
  // Custom Consultation submit
  const consultForm = document.querySelector("#consult-form");
  if (consultForm) {
    consultForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.querySelector("#consult-name").value;
      const phone = document.querySelector("#consult-whatsapp").value;
      const notes = document.querySelector("#consult-details").value;
      
      const savedInquiries = JSON.parse(localStorage.getItem("kimiclawInquiries") || "[]");
      savedInquiries.push({ name, phone, notes, createdAt: new Date().toISOString() });
      localStorage.setItem("kimiclawInquiries", JSON.stringify(savedInquiries));
      
      alert(state.currentLang === "en" 
        ? "Thank you! We have received your consultation request and will message you via WhatsApp shortly." 
        : "¡Muchas gracias! Hemos recibido vuestra consulta y os contactaremos por WhatsApp a la mayor brevedad."
      );
      consultForm.reset();
    });
  }
}

// Safe WhatsApp Text Url Encode Helper
function whatsappUrlEncode(str) {
  return encodeURIComponent(str)
    .replace(/[!'()*]/g, function (c) {
      return '%' + c.charCodeAt(0).toString(16).toUpperCase();
    });
}

// Welcome Screen Logic
function checkWelcomeScreen() {
  const welcomeScreen = document.querySelector("#welcome-screen");
  if (!welcomeScreen) return;

  const savedLang = localStorage.getItem("userPrefLang");
  const savedCurrency = localStorage.getItem("userPrefCurrency");

  if (savedLang && savedCurrency) {
    state.currentLang = savedLang;
    state.currentCurrency = savedCurrency;
    welcomeScreen.style.display = "none";
    document.body.style.overflow = "";
  } else {
    welcomeScreen.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  const continueBtn = document.querySelector("#welcome-continue-btn");
  if (continueBtn) {
    continueBtn.addEventListener("click", () => {
      const langSelect = document.querySelector("#welcome-lang").value;
      const currencySelect = document.querySelector("#welcome-currency").value;

      state.currentLang = langSelect;
      state.currentCurrency = currencySelect;

      localStorage.setItem("userPrefLang", langSelect);
      localStorage.setItem("userPrefCurrency", currencySelect);

      welcomeScreen.classList.add("hidden");
      setTimeout(() => welcomeScreen.style.display = "none", 500); // Wait for transition
      document.body.style.overflow = "";

      // Re-render UI with new preferences
      translateUI();
      updatePricingDisplays();
      renderCatalog();
      renderHubCatalog();
      renderSandboxFeature();
      
      // Update Detail View Dynamic Pricing if open
      const detailPlanSelector = document.querySelector("#detail-plan-selector");
      if (detailPlanSelector) {
        const planKey = detailPlanSelector.value;
        const sym = pricingTable[state.currentCurrency].symbol;
        const total = pricingTable[state.currentCurrency][planKey] || 999;
        const detailPrice = document.querySelector("#detail-price");
        const detailCurrencySuffix = document.querySelector("#detail-currency-suffix");
        if(detailPrice) detailPrice.textContent = `${sym}${total.toLocaleString()}`;
        if(detailCurrencySuffix) detailCurrencySuffix.textContent = state.currentCurrency;
      }
    });
  }
}

// Update all hardcoded pricing displays across the app
function updatePricingDisplays() {
  const currency = state.currentCurrency;
  const table = pricingTable[currency] || pricingTable["INR"];
  const sym = table.symbol;
  
  // 1. Update Detail View Options
  const detailPlanSelector = document.querySelector("#detail-plan-selector");
  if (detailPlanSelector) {
    const options = detailPlanSelector.options;
    for(let i = 0; i < options.length; i++) {
      const val = options[i].value;
      if(val === "Simple") options[i].text = `Simple — ${sym}${(table.Simple || 999).toLocaleString()}`;
      if(val === "CustomDomain") options[i].text = `Custom Domain — ${sym}${(table.CustomDomain || 1999).toLocaleString()}`;
      if(val === "ScratchGallery") options[i].text = `Scratch + Photo Gallery — ${sym}${(table.ScratchGallery || 2999).toLocaleString()}`;
    }
  }

  // 2. Update Wizard Currency Dropdown (if it exists) to match state
  const wizCurrency = document.querySelector("#wiz-currency");
  if (wizCurrency) {
    wizCurrency.value = currency;
  }
}

// Router Event triggers
window.addEventListener("hashchange", () => {
  handleRoute();
});

// Initialization
function init() {
  checkWelcomeScreen();
  updatePricingDisplays();
  populateWizardBaseStyles();
  translateUI();
  renderCatalog();
  renderHubCatalog();
  renderSandboxFeature();
  bindEvents();
  handleRoute();
}

document.addEventListener("DOMContentLoaded", init);
// Run init immediately in case DOMContentLoaded already fired
if (document.readyState === "interactive" || document.readyState === "complete") {
  init();
}
