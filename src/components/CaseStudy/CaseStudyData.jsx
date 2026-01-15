//CaseStudies.jsx
import { Globe, Smartphone, Monitor, Code, Calendar, Users } from 'lucide-react';

export const caseStudies = [
  {
    id: 1,
    title: "E-Commerce Revolution",
    client: "RetailMax Inc.",
    industry: "E-Commerce",
    type: "Website",
    year: "2024",
    duration: "6 months",
    team: "5 people",
    icon: <Globe className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Complete redesign of e-commerce platform with modern UX/UI and optimized checkout flow.",
    overview: "RetailMax was struggling with an outdated e-commerce platform that resulted in 60% cart abandonment rates, poor mobile experience, and loading times exceeding 8 seconds. We transformed their digital presence with a modern, high-performance platform.",
    challenge: "The existing platform was built on legacy technology, causing severe performance issues and user experience problems that directly impacted sales and customer satisfaction.",
    solution: "We built a modern, responsive e-commerce platform using React.js and Node.js with optimized checkout flow, integrated modern payment gateways, and implemented progressive web app features.",
    results: "85% increase in conversion rates, 300% faster loading times, 200% increase in mobile traffic, and 150% revenue growth within the first quarter.",
    services: ["Web Development", "UX/UI Design", "Performance Optimization", "SEO", "Analytics Integration"],
    technologies: ["React.js", "Node.js", "MongoDB", "Stripe API", "AWS"],
    projectImages: [
      {
        title: "Homepage Design",
        image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Modern homepage with hero section and product showcase",
        type: "desktop"
      },
      {
        title: "Product Catalog",
        image: "https://images.pexels.com/photos/4050312/pexels-photo-4050312.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Advanced filtering and search functionality",
        type: "desktop"
      },
      {
        title: "Checkout Process",
        image: "https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Streamlined one-click checkout experience",
        type: "desktop"
      },
      {
        title: "Mobile Shopping",
        image: "https://images.pexels.com/photos/4968630/pexels-photo-4968630.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Responsive design optimized for mobile devices",
        type: "mobile"
      },
      {
        title: "Mobile Checkout",
        image: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Mobile-optimized checkout process",
        type: "mobile"
      },
      {
        title: "Admin Dashboard",
        image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Comprehensive admin panel for inventory management",
        type: "desktop"
      }
    ],
    testimonial: "Arohance Tech transformed our struggling online store into a conversion machine. Sales have never been better!"
  },
  {
    id: 2,
    title: "FinTech Mobile Banking",
    client: "SecureBank Digital",
    industry: "Financial Services",
    type: "Mobile App",
    year: "2024",
    duration: "8 months",
    team: "7 people",
    icon: <Smartphone className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Comprehensive mobile banking app with biometric security and real-time transaction features.",
    overview: "SecureBank needed a mobile banking solution that met strict security compliance requirements while providing an intuitive user experience. The challenge was balancing security with usability.",
    challenge: "Creating a mobile banking app that meets stringent financial regulations while maintaining user-friendly interface and ensuring top-level security for financial transactions.",
    solution: "We developed a secure mobile banking app using React Native with advanced biometric authentication, end-to-end encryption, and real-time banking features that exceeded industry security standards.",
    results: "400% increase in user adoption, 99.9% reduction in security incidents, 70% faster transaction processing, and maintained a 4.8/5 star rating from users.",
    services: ["Mobile App Development", "Security Implementation", "UX/UI Design", "API Integration", "Compliance Testing"],
    technologies: ["React Native", "Node.js", "PostgreSQL", "AWS", "Biometric APIs"],
    projectImages: [
      {
        title: "Login & Security",
        image: "https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Biometric authentication and security features",
        type: "desktop"
      },
      {
        title: "Dashboard Overview",
        image: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Clean and intuitive account overview",
        type: "desktop"
      },
      {
        title: "Mobile Banking",
        image: "https://images.pexels.com/photos/4386374/pexels-photo-4386374.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Mobile banking interface and navigation",
        type: "mobile"
      },
      {
        title: "Mobile Transfers",
        image: "https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Seamless money transfer on mobile",
        type: "mobile"
      },
      {
        title: "Transaction History",
        image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Digital card management and controls",
        type: "desktop"
      },
      {
        title: "Investment Portfolio",
        image: "https://images.pexels.com/photos/5473302/pexels-photo-5473302.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Investment tracking and portfolio management",
        type: "desktop"
      }
    ],
    testimonial: "The app exceeded our security standards while delivering an exceptional user experience."
  },
  {
    id: 3,
    title: "Healthcare Management",
    client: "MediCare Solutions",
    industry: "Healthcare",
    type: "Web App",
    year: "2023",
    duration: "10 months",
    team: "8 people",
    icon: <Monitor className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Unified healthcare management platform streamlining patient care and administrative tasks.",
    overview: "MediCare faced fragmented patient data across multiple departments, HIPAA compliance requirements, complex scheduling needs, and integration challenges with legacy systems affecting patient care quality.",
    challenge: "Creating a unified system that consolidates patient data from multiple sources while maintaining HIPAA compliance and integrating with existing medical equipment and legacy systems.",
    solution: "We created a comprehensive healthcare management system using Vue.js and Python Django with secure patient data management, automated scheduling, and real-time analytics dashboards.",
    results: "60% improvement in efficiency, 95% increase in data accuracy, 40% higher patient satisfaction, and 30% reduction in administrative costs.",
    services: ["Web Development", "System Integration", "Data Migration", "Compliance Implementation", "Training & Support"],
    technologies: ["Vue.js", "Python Django", "PostgreSQL", "Redis", "Docker"],
    projectImages: [
      {
        title: "Patient Dashboard",
        image: "https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Comprehensive patient information overview",
        type: "desktop"
      },
      {
        title: "Appointment Scheduling",
        image: "https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Automated scheduling and calendar management",
        type: "desktop"
      },
      {
        title: "Medical Records",
        image: "https://images.pexels.com/photos/4386370/pexels-photo-4386370.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Digital medical records and history",
        type: "desktop"
      },
      {
        title: "Mobile Patient Portal",
        image: "https://images.pexels.com/photos/4386442/pexels-photo-4386442.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Patient portal mobile interface",
        type: "mobile"
      },
      {
        title: "Mobile Appointments",
        image: "https://images.pexels.com/photos/4386374/pexels-photo-4386374.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Mobile appointment booking system",
        type: "mobile"
      },
      {
        title: "Analytics Dashboard",
        image: "https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Healthcare analytics and reporting",
        type: "desktop"
      }
    ],
    testimonial: "This system revolutionized how we manage patient care. Everything is now seamlessly connected."
  },
  {
    id: 4,
    title: "Real Estate Platform",
    client: "PropertyPro Realty",
    industry: "Real Estate",
    type: "Website",
    year: "2024",
    duration: "7 months",
    team: "6 people",
    icon: <Globe className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Advanced real estate platform with 3D virtual tours and AI-powered property matching.",
    overview: "PropertyPro needed modern property search capabilities, high-resolution image management, virtual tour integration, and lead generation optimization to compete in the digital real estate market.",
    challenge: "Building a sophisticated real estate platform that handles large property databases, integrates virtual tour technology, and provides intelligent property matching for buyers.",
    solution: "We built a cutting-edge real estate platform using Next.js with 3D virtual tours, advanced search filters, and AI-powered property recommendations that revolutionized property browsing.",
    results: "250% increase in lead generation, 180% improvement in user engagement, 300% more property views, and 120% higher conversion rates.",
    services: ["Web Development", "3D Integration", "AI Implementation", "SEO Optimization", "Lead Generation"],
    technologies: ["Next.js", "Three.js", "Python", "MongoDB", "AWS"],
    projectImages: [
      {
        title: "Property Listings",
        image: "https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Beautiful property listing interface",
        type: "desktop"
      },
      {
        title: "Virtual Tours",
        image: "https://images.pexels.com/photos/1974594/pexels-photo-1974594.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Interactive 3D virtual property tours",
        type: "desktop"
      },
      {
        title: "Search & Filters",
        image: "https://images.pexels.com/photos/1974595/pexels-photo-1974595.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Advanced search and filtering system",
        type: "desktop"
      },
      {
        title: "Mobile Property Search",
        image: "https://images.pexels.com/photos/1974592/pexels-photo-1974592.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Mobile property search and browsing",
        type: "mobile"
      },
      {
        title: "Mobile Property Details",
        image: "https://images.pexels.com/photos/1974598/pexels-photo-1974598.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Mobile property details and gallery",
        type: "mobile"
      },
      {
        title: "Market Analytics",
        image: "https://images.pexels.com/photos/1974593/pexels-photo-1974593.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Real estate market data and trends",
        type: "desktop"
      }
    ],
    testimonial: "Our property listings have never looked better. The virtual tours are a game-changer!"
  },
  {
    id: 5,
    title: "Fitness Tracking App",
    client: "FitLife Technologies",
    industry: "Health & Fitness",
    type: "Mobile App",
    year: "2024",
    duration: "5 months",
    team: "4 people",
    icon: <Smartphone className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/4162483/pexels-photo-4162483.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Social fitness app with workout tracking, nutrition monitoring, and community challenges.",
    overview: "FitLife needed a comprehensive fitness app with complex data visualization, social features integration, wearable device compatibility, and motivational user engagement systems.",
    challenge: "Creating a fitness app that seamlessly integrates with multiple wearable devices, provides accurate health tracking, and maintains user engagement through social features.",
    solution: "We developed a comprehensive fitness app using React Native with social features, workout tracking, nutrition monitoring, and gamification elements that keep users motivated.",
    results: "70% increase in user retention, 200% growth in daily active users, 85% higher workout completion rates, and maintained a 4.7/5 star app rating.",
    services: ["Mobile Development", "Wearable Integration", "Social Features", "Data Analytics", "UI/UX Design"],
    technologies: ["React Native", "Node.js", "MongoDB", "HealthKit", "Google Fit"],
    projectImages: [
      {
        title: "Dashboard Overview",
        image: "https://images.pexels.com/photos/4162483/pexels-photo-4162483.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Comprehensive fitness dashboard and stats",
        type: "desktop"
      },
      {
        title: "Workout Tracking",
        image: "https://images.pexels.com/photos/4162494/pexels-photo-4162494.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Real-time workout tracking and monitoring",
        type: "desktop"
      },
      {
        title: "Nutrition Logging",
        image: "https://images.pexels.com/photos/4162495/pexels-photo-4162495.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Food tracking and nutrition analysis",
        type: "desktop"
      },
      {
        title: "Mobile Workouts",
        image: "https://images.pexels.com/photos/4162496/pexels-photo-4162496.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Mobile workout interface and tracking",
        type: "mobile"
      },
      {
        title: "Mobile Social",
        image: "https://images.pexels.com/photos/4162497/pexels-photo-4162497.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Social challenges and community features",
        type: "mobile"
      },
      {
        title: "Progress Analytics",
        image: "https://images.pexels.com/photos/4162498/pexels-photo-4162498.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Detailed progress tracking and insights",
        type: "desktop"
      }
    ],
    testimonial: "The app keeps our users motivated and engaged like never before!"
  },
  {
    id: 6,
    title: "Inventory Management",
    client: "LogiTech Warehouse",
    industry: "Logistics",
    type: "Desktop App",
    year: "2023",
    duration: "9 months",
    team: "5 people",
    icon: <Code className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/4481263/pexels-photo-4481263.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Comprehensive desktop application for automated inventory management and logistics optimization.",
    overview: "LogiTech struggled with manual inventory processes, lack of real-time tracking, complex warehouse layouts, and integration challenges with existing systems causing operational inefficiencies.",
    challenge: "Developing a robust desktop application that can handle complex inventory operations, integrate with existing warehouse systems, and provide real-time tracking capabilities.",
    solution: "We created a comprehensive desktop application using Electron and React with automated inventory tracking, barcode scanning, predictive analytics, and seamless system integration.",
    results: "98% improvement in inventory accuracy, 80% reduction in stockouts, 65% increase in operational efficiency, and 40% reduction in operational costs.",
    services: ["Desktop Development", "System Integration", "Barcode Integration", "Analytics Implementation", "Training"],
    technologies: ["Electron", "React", "Node.js", "SQLite", "Barcode APIs"],
    projectImages: [
      {
        title: "Inventory Dashboard",
        image: "https://images.pexels.com/photos/4481263/pexels-photo-4481263.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Real-time inventory overview and management",
        type: "desktop"
      },
      {
        title: "Barcode Scanning",
        image: "https://images.pexels.com/photos/4481942/pexels-photo-4481942.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Integrated barcode scanning system",
        type: "desktop"
      },
      {
        title: "Warehouse Layout",
        image: "https://images.pexels.com/photos/4481944/pexels-photo-4481944.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Visual warehouse layout and navigation",
        type: "desktop"
      },
      {
        title: "Mobile Inventory",
        image: "https://images.pexels.com/photos/4481945/pexels-photo-4481945.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Mobile inventory management interface",
        type: "mobile"
      },
      {
        title: "Mobile Scanning",
        image: "https://images.pexels.com/photos/4481946/pexels-photo-4481946.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Mobile barcode scanning and updates",
        type: "mobile"
      },
      {
        title: "Reporting System",
        image: "https://images.pexels.com/photos/4481947/pexels-photo-4481947.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Comprehensive reporting and analytics",
        type: "desktop"
      }
    ],
    testimonial: "This system eliminated our inventory nightmares. We now have complete visibility and control."
  },
  {
    id: 7,
    title: "EdTech Learning Platform",
    client: "EduMaster Academy",
    industry: "Education",
    type: "Web App",
    year: "2024",
    duration: "8 months",
    team: "9 people",
    icon: <Monitor className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Interactive online learning platform with AI-powered personalized curriculum and progress tracking.",
    overview: "EduMaster needed a modern e-learning platform that could deliver personalized education experiences, track student progress effectively, and provide interactive learning tools for multiple subjects.",
    challenge: "Building a scalable education platform that supports multiple content types, provides personalized learning paths, and integrates with various educational tools and assessments.",
    solution: "We developed an advanced learning management system using React and Django with AI-powered content recommendations, interactive assessments, and comprehensive progress analytics.",
    results: "300% increase in student engagement, 85% improvement in completion rates, 200% growth in active users, and 95% student satisfaction rating.",
    services: ["Web Development", "AI Integration", "Content Management", "Assessment Tools", "Analytics Dashboard"],
    technologies: ["React", "Django", "PostgreSQL", "TensorFlow", "AWS"],
    projectImages: [
      {
        title: "Student Dashboard",
        image: "https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Personalized student learning dashboard",
        type: "desktop"
      },
      {
        title: "Course Catalog",
        image: "https://images.pexels.com/photos/4144924/pexels-photo-4144924.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Comprehensive course catalog and enrollment",
        type: "desktop"
      },
      {
        title: "Interactive Lessons",
        image: "https://images.pexels.com/photos/4144925/pexels-photo-4144925.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Interactive video lessons and content",
        type: "desktop"
      },
      {
        title: "Mobile Learning",
        image: "https://images.pexels.com/photos/4144926/pexels-photo-4144926.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Mobile learning interface and courses",
        type: "mobile"
      },
      {
        title: "Mobile Assessments",
        image: "https://images.pexels.com/photos/4144927/pexels-photo-4144927.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Mobile assessment and testing tools",
        type: "mobile"
      },
      {
        title: "Teacher Portal",
        image: "https://images.pexels.com/photos/4144928/pexels-photo-4144928.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Comprehensive teacher management tools",
        type: "desktop"
      }
    ],
    testimonial: "Our students love the interactive learning experience. Engagement has skyrocketed!"
  },
  {
    id: 8,
    title: "Restaurant Management",
    client: "Gourmet Chain",
    industry: "Food & Beverage",
    type: "Web App",
    year: "2023",
    duration: "6 months",
    team: "6 people",
    icon: <Monitor className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Complete restaurant management system with POS integration, inventory tracking, and customer ordering.",
    overview: "Gourmet Chain needed a unified system to manage multiple restaurant locations, streamline ordering processes, track inventory across locations, and provide customer-facing ordering solutions.",
    challenge: "Creating a multi-location restaurant management system that integrates with existing POS systems, manages complex inventory, and provides seamless customer ordering experiences.",
    solution: "We built a comprehensive restaurant management platform using Angular and Node.js with POS integration, real-time inventory management, and customer ordering capabilities.",
    results: "50% reduction in order processing time, 75% improvement in inventory accuracy, 120% increase in online orders, and 40% reduction in food waste.",
    services: ["Web Development", "POS Integration", "Inventory Management", "Mobile Ordering", "Analytics"],
    technologies: ["Angular", "Node.js", "MongoDB", "Socket.io", "Stripe"],
    projectImages: [
      {
        title: "Restaurant Dashboard",
        image: "https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Comprehensive restaurant operations dashboard",
        type: "desktop"
      },
      {
        title: "Order Management",
        image: "https://images.pexels.com/photos/1581385/pexels-photo-1581385.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Real-time order tracking and management",
        type: "desktop"
      },
      {
        title: "Menu Management",
        image: "https://images.pexels.com/photos/1581386/pexels-photo-1581386.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Digital menu creation and management",
        type: "desktop"
      },
      {
        title: "Mobile Ordering",
        image: "https://images.pexels.com/photos/1581387/pexels-photo-1581387.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Customer mobile ordering interface",
        type: "mobile"
      },
      {
        title: "Mobile Payment",
        image: "https://images.pexels.com/photos/1581388/pexels-photo-1581388.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Mobile payment and checkout system",
        type: "mobile"
      },
      {
        title: "Analytics Reports",
        image: "https://images.pexels.com/photos/1581389/pexels-photo-1581389.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Sales analytics and performance reports",
        type: "desktop"
      }
    ],
    testimonial: "This system streamlined our operations across all locations. Efficiency has improved dramatically!"
  },
  {
    id: 9,
    title: "Travel Booking Platform",
    client: "Wanderlust Travels",
    industry: "Travel & Tourism",
    type: "Website",
    year: "2024",
    duration: "7 months",
    team: "8 people",
    icon: <Globe className="w-6 h-6" />,
    image: "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Comprehensive travel booking platform with AI recommendations, itinerary planning, and social features.",
    overview: "Wanderlust Travels wanted to create a modern travel booking platform that combines booking functionality with social travel features, AI-powered recommendations, and comprehensive itinerary planning tools.",
    challenge: "Integrating multiple travel APIs, creating intelligent recommendation systems, and building social features while maintaining fast performance and reliable booking processes.",
    solution: "We developed a feature-rich travel platform using Vue.js and Laravel with AI-powered recommendations, social travel features, and seamless booking integration with major travel providers.",
    results: "180% increase in bookings, 90% improvement in user engagement, 250% growth in repeat customers, and 4.6/5 customer satisfaction rating.",
    services: ["Web Development", "API Integration", "AI Implementation", "Social Features", "Payment Integration"],
    technologies: ["Vue.js", "Laravel", "MySQL", "Python", "Third-party APIs"],
    projectImages: [
      {
        title: "Search & Discovery",
        image: "https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Intelligent travel search and discovery",
        type: "desktop"
      },
      {
        title: "Booking Interface",
        image: "https://images.pexels.com/photos/1008156/pexels-photo-1008156.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Streamlined booking process and payments",
        type: "desktop"
      },
      {
        title: "Itinerary Planner",
        image: "https://images.pexels.com/photos/1008157/pexels-photo-1008157.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Interactive itinerary planning tools",
        type: "desktop"
      },
      {
        title: "Mobile Travel Search",
        image: "https://images.pexels.com/photos/1008158/pexels-photo-1008158.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Mobile travel search and booking",
        type: "mobile"
      },
      {
        title: "Mobile Trip Management",
        image: "https://images.pexels.com/photos/1008159/pexels-photo-1008159.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "Mobile trip management and tracking",
        type: "mobile"
      },
      {
        title: "Reviews & Ratings",
        image: "https://images.pexels.com/photos/1008160/pexels-photo-1008160.jpeg?auto=compress&cs=tinysrgb&w=800",
        description: "User reviews and destination ratings",
        type: "desktop"
      }
    ],
    testimonial: "Our booking rates have tripled! The platform makes travel planning effortless and enjoyable."
  }
];