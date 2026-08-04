import { DetailedService, BlogPost, CareerOpening, TeamMember } from '../types';
import { NEW_SERVICES_DATA } from './newServicesData';

export const BASE_SERVICES_MAP: Record<string, DetailedService> = {
  // --- DOCUMENTS CLEARING DIVISION SERVICES ---
  'business-setup': {
    id: 'doc-business-setup',
    slug: 'business-setup',
    title: 'Mainland & Free Zone Business Setup',
    division: 'documents',
    category: 'Business Formation',
    heroHeadline: 'Incorporate Your Business in Dubai Mainland or Top UAE Free Zones with 100% Foreign Ownership',
    overview: 'Cloudloop Documents Clearing provides end-to-end company formation services in Dubai Mainland (DED) and top UAE Free Zones including DMCC, IFZA, Meydan, RAKEZ, DAFZA, and KIZAD. From initial trade name reservation to MOA notarization, office space solutions, and final license issuance, our government PRO advisors streamline your entire setup journey in record time.',
    pricingStarting: 'AED 12,500',
    timeline: '2 – 4 Working Days',
    benefits: [
      '100% foreign business ownership across Mainland and Free Zones',
      'Zero income and corporate tax optimization for qualified entities',
      'Instant trade license issuance with minimal hassle',
      'Flexible office solutions: Flexi-desk, virtual office, or dedicated space',
      'Unrestricted corporate bank account opening support',
    ],
    processSteps: [
      { step: 1, title: 'Activity Selection & Consultation', desc: 'Identify business activities, license classification, and legal structure (LLC, Branch, FZE).' },
      { step: 2, title: 'Trade Name Reservation & Approval', desc: 'Reserve corporate name with DED or Free Zone authority and acquire initial security clearance.' },
      { step: 3, title: 'Legal Drafting & MOA Signing', desc: 'Draft Memorandum of Association (MOA) and execute digital notarization via court notary.' },
      { step: 4, title: 'Office Space Allocation & License', desc: 'Secure Ejari (tenancy contract) or Flexi-Desk agreement and issue official UAE Trade License.' },
    ],
    requiredDocuments: [
      'Passport copies of all shareholders & directors',
      'Recent passport-size photographs (white background)',
      'UAE Visa page or entry stamp copy (if already in UAE)',
      '3 Proposed company trade names in order of preference',
      'Proof of residential address / utility bill copy',
    ],
    faqs: [
      {
        question: 'Should I setup in Dubai Mainland or a Free Zone?',
        answer: 'Dubai Mainland (DED) licenses allow unlimited trading anywhere in the UAE and participation in local government contracts. Free Zones offer specialized sector ecosystems, 100% foreign ownership, and custom duty exemptions. Our consultants will evaluate your business model to recommend the optimal choice.',
      },
      {
        question: 'Is a local UAE national sponsor required for Mainland LLC?',
        answer: 'Under current UAE Commercial Companies Law, foreigners can own 100% of Mainland commercial and industrial licenses without requiring a local UAE national shareholder.',
      },
    ],
  },

  'visa-processing': {
    id: 'doc-visa-processing',
    slug: 'visa-processing',
    title: 'Investor, Partner & Employment Visas',
    division: 'documents',
    category: 'Visa & Residency',
    heroHeadline: 'Fast-Track UAE Residence Visas for Investors, Executives & Employees',
    overview: 'Our VIP immigration clearing team manages complete residency visa issuance for business owners, company partners, executives, and family dependents across Dubai (GDRFA) and the Federal Authority (ICP). We handle entry permit approval, status change, VIP medical fitness test escort, Emirates ID biometrics, and digital residency stamping.',
    pricingStarting: 'AED 2,800',
    timeline: '3 – 5 Working Days',
    benefits: [
      'VIP Medical Fitness booking with express 2-hour result option',
      'Complete entry permit and status change management without exiting UAE',
      'Emirates ID typing & biometrics appointment scheduling',
      'Family dependent residency visa sponsorship (spouse, children, parents)',
      'Comprehensive error-free document validation preventing rejections',
    ],
    processSteps: [
      { step: 1, title: 'Establishment Card & Quota', desc: 'Register company establishment card with GDRFA & MOHRE for visa quota approval.' },
      { step: 2, title: 'Entry Permit Issuance', desc: 'Issue digital employment/investor entry permit for entry or status adjustment.' },
      { step: 3, title: 'VIP Medical & Biometrics', desc: 'Escort applicant to VIP medical center and Emirates ID biometric center.' },
      { step: 4, title: 'Residency Stamping & ID', desc: 'Finalize digital residency status and deliver physical Emirates ID card.' },
    ],
    requiredDocuments: [
      'Passport copy with minimum 6 months validity',
      'White background high-resolution passport photo',
      'Copy of active UAE Trade License & Establishment Card',
      'Attested educational certificate (for managerial employment visas)',
      'Current visa / cancelled visa copy (if inside UAE)',
    ],
    faqs: [
      {
        question: 'How long is a standard UAE investor or employee visa valid for?',
        answer: 'Free Zone and Mainland investor/partner visas are typically valid for 2 or 3 years, renewable indefinitely. Employment visas are issued for 2 years.',
      },
    ],
  },

  'trade-license': {
    id: 'doc-trade-license',
    slug: 'trade-license',
    title: 'Trade License Renewal & Amendments',
    division: 'documents',
    category: 'Business Formation',
    heroHeadline: 'Seamless Renewal, Activity Expansion & Shareholder Amendments',
    overview: 'Keep your UAE business fully compliant and active without penalties. Cloudloop Documents Clearing handles annual DED and Free Zone trade license renewals, Ejari tenancy approvals, activity additions, manager/shareholder modifications, capital adjustments, and official company de-registration or liquidation.',
    pricingStarting: 'AED 1,200',
    timeline: '24 – 48 Hours',
    benefits: [
      'Penalty-free express license renewal processing',
      'Ejari tenancy lease registration & renewal support',
      'Commercial activity expansion and license upgrades',
      'Share transfer agreements and corporate restructuring',
      'No Objection Certificates (NOC) from external government bodies',
    ],
    processSteps: [
      { step: 1, title: 'Compliance Audit', desc: 'Review existing license status, lease validity, and pending government approvals.' },
      { step: 2, title: 'Lease & NOC Verification', desc: 'Submit updated Ejari or virtual office agreement to DED / Free Zone authority.' },
      { step: 3, title: 'Payment Voucher Generation', desc: 'Generate official government renewal voucher and execute payment.' },
      { step: 4, title: 'Updated License Delivery', desc: 'Deliver renewed UAE Trade License and updated Commercial Register.' },
    ],
    requiredDocuments: [
      'Copy of current Trade License',
      'Valid Ejari / Tenancy contract or Flexi-desk certificate',
      'Passport copies of existing and new shareholders',
      'Board resolution for amendments (if corporate entity)',
    ],
    faqs: [
      {
        question: 'What happens if a trade license is expired in Dubai?',
        answer: 'Fines accrue monthly from the Economic Department (AED 200/month) and establishment cards may freeze visa renewals. We assist with immediate fine waivers and express renewal.',
      },
    ],
  },

  'emirates-id': {
    id: 'doc-emirates-id',
    slug: 'emirates-id',
    title: 'Emirates ID & Medical Typing Services',
    division: 'documents',
    category: 'Visa & Residency',
    heroHeadline: 'VIP Express Medical Fitness & Emirates ID Typing',
    overview: 'Accelerate your residency process with Cloudloop VIP typing services. We handle priority appointment booking at top DHA / MOHAP medical fitness centers across Dubai, complete ICP Emirates ID typing, fingerprint biometrics scheduling, and renewal typing for corporate teams and individuals.',
    pricingStarting: 'AED 450',
    timeline: '24 Hours (Medical VIP)',
    benefits: [
      'Express VIP Medical Fitness results in 2 to 4 hours',
      'Priority biometric appointment booking without waiting queues',
      'Accurate ICP application typing avoiding spelling and code errors',
      'Emirates ID replacement for lost or damaged cards',
      'Corporate bulk typing discount packages for companies',
    ],
    processSteps: [
      { step: 1, title: 'ICP Form Typing', desc: 'Type official Emirates ID application with accurate passport details.' },
      { step: 2, title: 'Medical Center Escort', desc: 'Accompany applicant to VIP DHA medical center for blood test & X-ray.' },
      { step: 3, title: 'Biometric Capture', desc: 'Complete fingerprint, eye scan, and signature capture at EIDA center.' },
      { step: 4, title: 'Physical Card Delivery', desc: 'Track and deliver physical Emirates ID card via official courier.' },
    ],
    requiredDocuments: [
      'Original Passport & Entry Permit copy',
      'White background digital passport photograph',
      'Mobile phone number registered in UAE',
    ],
    faqs: [
      {
        question: 'Is medical fitness mandatory for Emirates ID renewal?',
        answer: 'Yes, medical fitness testing (blood test and chest X-ray) is mandatory for all adult residency visa renewals and new applications.',
      },
    ],
  },

  'golden-visa': {
    id: 'doc-golden-visa',
    slug: 'golden-visa',
    title: 'Golden Visa Assistance (5 & 10 Years)',
    division: 'documents',
    category: 'Visa & Residency',
    heroHeadline: 'Secure Long-Term 10-Year UAE Residency for Real Estate Investors, Entrepreneurs & Executives',
    overview: 'The UAE Golden Visa offers unprecedented long-term stability, 100% self-sponsored residency, and the ability to sponsor family members and domestic staff indefinitely. Cloudloop Group provides specialized end-to-end nomination submission, property valuation auditing, bank capital confirmation, and VIP processing through ICP and Dubai GDRFA.',
    pricingStarting: 'AED 4,500',
    timeline: '5 – 7 Working Days',
    benefits: [
      '10-Year self-sponsored residency without local employer requirement',
      'No restriction on maximum stay duration outside the UAE',
      'Ability to sponsor spouse, children of any age, and parents',
      'Exclusive ESAAD privilege card access with major discounts across UAE',
      'Seamless conversion of existing investor or employment visas',
    ],
    processSteps: [
      { step: 1, title: 'Pre-Assessment & Documentation', desc: 'Verify eligibility under Real Estate (AED 2M+), Executive Salary (AED 30k+), or Investor criteria.' },
      { step: 2, title: 'Nomination & Initial Approval', desc: 'Submit nomination file to ICP or Dubai Land Department (DLD) for Golden Visa clearance.' },
      { step: 3, title: 'Medical & Biometrics VIP', desc: 'Fast-track medical fitness test and VIP Emirates ID biometrics.' },
      { step: 4, title: 'Golden Visa Stamping & Card', desc: 'Issue 10-Year Golden Visa residency status and ESAAD discount card.' },
    ],
    requiredDocuments: [
      'Passport copy with 6+ months validity',
      'Title Deed / Property Certificate (for Real Estate category)',
      'Bank statement & salary certificate / NOC (for Executive category)',
      'Commercial Trade License & Audited Financials (for Business Investor category)',
    ],
    faqs: [
      {
        question: 'Can I sponsor my family under the 10-Year Golden Visa?',
        answer: 'Yes! Golden Visa holders can sponsor spouses, sons of any age, unmarried daughters, and parents with 10-year residency.',
      },
    ],
  },

  'pro-services': {
    id: 'doc-pro-services',
    slug: 'pro-services',
    title: 'Labour, Immigration & Corporate PRO Services',
    division: 'documents',
    category: 'Government Services',
    heroHeadline: 'Outsourced Corporate PRO Management for UAE Government Compliance',
    overview: 'Eliminate the complexity of dealing with UAE government ministries. Our corporate PRO team acts as your dedicated liaison with the Ministry of Human Resources & Emiratisation (MOHRE), General Directorate of Residency and Foreigners Affairs (GDRFA), Dubai Economy (DED), Dubai Municipality, and RTA.',
    pricingStarting: 'AED 1,500 / month',
    timeline: 'Ongoing SLA Retainer',
    benefits: [
      'Dedicated PRO assigned to your business account',
      'Automated tracking of license, visa, and establishment card expiry dates',
      'Work permit quotas, electronic offer letters & MOHRE contract drafting',
      'Government fine waivers and immigration dispute resolution',
      'Doorstep pickup and delivery of corporate legal documents',
    ],
    processSteps: [
      { step: 1, title: 'Account Onboarding', desc: 'Audit existing corporate quota, establishment cards, and employee files.' },
      { step: 2, title: 'MOHRE & GDRFA Setup', desc: 'Link corporate portal credentials with Cloudloop authorized PRO team.' },
      { step: 3, title: 'Routine PRO Processing', desc: 'Execute visa applications, work permits, license renewals, and NOCs.' },
      { step: 4, title: 'Monthly SLA Reporting', desc: 'Deliver detailed monthly compliance logs and renewal reminders.' },
    ],
    requiredDocuments: [
      'Trade License copy',
      'Establishment Card copy (Immigration & Labour)',
      'Authorized Signatory passport copy & E-Signature card',
    ],
    faqs: [
      {
        question: 'Why hire an outsourced PRO service instead of an in-house PRO?',
        answer: 'Outsourcing to Cloudloop saves up to 60% compared to an in-house PRO salary, visa, and vehicle cost, while providing an entire team of senior multi-lingual PRO experts with direct ministry channels.',
      },
    ],
  },

  'corporate-tax-vat': {
    id: 'doc-corporate-tax-vat',
    slug: 'corporate-tax-vat',
    title: 'Corporate Tax & VAT Services',
    division: 'documents',
    category: 'Corporate Finance',
    heroHeadline: 'Federal Tax Authority (FTA) Registration, Tax Accounting & VAT Filing',
    overview: 'Navigate the UAE 9% Corporate Tax framework and 5% Value Added Tax regulations effortlessly. Cloudloop tax specialists handle FTA Corporate Tax registration, Tax Registration Number (TRN) issuance, quarterly VAT return filings, bookkeeping alignment, Qualifying Free Zone Person (QFZP) audits, and FTA penalty appeals.',
    pricingStarting: 'AED 1,800',
    timeline: '3 – 5 Working Days',
    benefits: [
      '100% compliance with UAE Federal Decree-Law on Corporate Tax',
      'Maximization of 0% tax rates for Qualifying Free Zone Persons',
      'Accurate quarterly VAT returns preventing FTA non-compliance fines',
      'Tax Residency Certificates (TRC) for double taxation avoidance',
      'Representation during FTA tax audits and clarification requests',
    ],
    processSteps: [
      { step: 1, title: 'EmaraTax Account Setup', desc: 'Register company portal on official FTA EmaraTax platform.' },
      { step: 2, title: 'TRN Application', desc: 'Submit trade license, financial records, and owner IDs for Corporate Tax TRN.' },
      { step: 3, title: 'Bookkeeping & Tax Calculation', desc: 'Calculate taxable net profit, exemptions, and deductible expenses.' },
      { step: 4, title: 'Return Filing & Certificate', desc: 'File formal Tax Return and archive audit trail for 7 years.' },
    ],
    requiredDocuments: [
      'Trade License copy & MOA',
      'Passport & Emirates ID of authorized signatory',
      'Audited Financial Statements or Income Statement',
      'Bank Statements for tax assessment period',
    ],
    faqs: [
      {
        question: 'Do Free Zone companies need to register for Corporate Tax?',
        answer: 'Yes! All UAE businesses (Mainland and Free Zone) are legally required to register for Corporate Tax and obtain a TRN, even if eligible for 0% tax rate.',
      },
    ],
  },

  'bank-account': {
    id: 'doc-bank-account',
    slug: 'bank-account',
    title: 'Corporate Bank Account Services',
    division: 'documents',
    category: 'Corporate Finance',
    heroHeadline: 'Guaranteed Corporate Banking Assistance with Top UAE & International Banks',
    overview: 'Opening a corporate bank account in Dubai can be complex due to strict Anti-Money Laundering (AML) and Know-Your-Customer (KYC) compliance. Cloudloop Group acts as your financial liaison, preparing bankable compliance dossiers, business plans, proof of funds, and arranging direct meetings with senior corporate banking officers.',
    pricingStarting: 'AED 3,500',
    timeline: '7 – 14 Working Days',
    benefits: [
      'Direct intro to premier banks: Emirates NBD, Mashreq, FAB, ADCB, CBD, Wio',
      'Impeccable AML/KYC dossier preparation preventing file rejections',
      'Multi-currency accounts: AED, USD, EUR, GBP, CHF',
      'Digital neo-bank fast-track approval in 48 hours for SMEs',
      'Dedicated compliance specialist accompanying physical bank interviews',
    ],
    processSteps: [
      { step: 1, title: 'Compliance File Audit', desc: 'Review trade license, business model, counterparty contracts, and CVs.' },
      { step: 2, title: 'Bank Dossier Preparation', desc: 'Draft comprehensive 6-page business profile, financial projection & supplier list.' },
      { step: 3, title: 'Banker Meeting & Verification', desc: 'Submit application directly to senior corporate banker for KYC review.' },
      { step: 4, title: 'Account Activation & Online Banking', desc: 'Finalize account number, token issuance, and debit card dispatch.' },
    ],
    requiredDocuments: [
      'Trade License, MOA & Share Certificate',
      'Passport & Emirates ID of company signatories',
      '6 Months personal or corporate bank statements',
      'Proof of business transactions (invoices, contracts, bill of lading)',
    ],
    faqs: [
      {
        question: 'Which UAE banks does Cloudloop work with?',
        answer: 'We maintain strong relationships with Emirates NBD, Mashreq Bank, First Abu Dhabi Bank (FAB), ADCB, Commercial Bank of Dubai, Mashreq NEOBiz, and Wio Business.',
      },
    ],
  },

  // --- INFORMATION TECHNOLOGY DIVISION SERVICES ---
  'web-development': {
    id: 'it-web-mobile-dev',
    slug: 'web-development',
    title: 'Custom Website & Web App Development',
    division: 'it',
    category: 'Software Engineering',
    heroHeadline: 'High-Performance React, Next.js & E-Commerce Web Engineering',
    overview: 'Cloudloop Information Technology builds blazing-fast, modern, conversion-focused websites and complex web applications. From corporate enterprise portals to headless e-commerce setups and SaaS web applications, our engineering team utilizes React, Next.js, Tailwind CSS, TypeScript, and Node.js for maximum performance, security, and search engine visibility.',
    pricingStarting: 'AED 8,500',
    timeline: '2 – 4 Weeks',
    technologies: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Stripe', 'GraphQL'],
    benefits: [
      '100% Custom engineered UI/UX without slow templates',
      'Sub-second page load times achieving 95+ Core Web Vitals',
      'Full SEO technical optimization & schema markup integration',
      'Secure payment gateway integration (Stripe, Network International, Telr)',
      'Responsive pixel-perfect rendering across mobile, tablet, and ultra-wide screens',
    ],
    processSteps: [
      { step: 1, title: 'Discovery & Architecture', desc: 'Map out user journeys, site map, database schemas, and API requirements.' },
      { step: 2, title: 'Figma UI/UX Prototyping', desc: 'Design interactive high-fidelity wireframes following modern design principles.' },
      { step: 3, title: 'Front-End & Back-End Code', desc: 'Develop modular TypeScript components with headless CMS or Node backend.' },
      { step: 4, title: 'QA Testing & Deployment', desc: 'Conduct cross-browser testing, security hardening, and launch on AWS serverless.' },
    ],
    requiredDocuments: [
      'Brand assets & logo files (Vector SVG / EPS)',
      'Content copy outline & product images',
      'Domain DNS access details (Cloudflare / GoDaddy)',
    ],
    faqs: [
      {
        question: 'Will my website be mobile-friendly and easy to update?',
        answer: 'Yes! Every project is engineered mobile-first and integrated with an intuitive content management system (CMS) so your team can easily update content.',
      },
    ],
  },

  'mobile-apps': {
    id: 'it-mobile-apps',
    slug: 'mobile-apps',
    title: 'iOS & Android Mobile App Development',
    division: 'it',
    category: 'Software Engineering',
    heroHeadline: 'Native & Cross-Platform Mobile Applications Engine for Apple App Store & Google Play',
    overview: 'Transform your business model into an engaging mobile product. Cloudloop IT engineers high-grade React Native and Flutter mobile applications equipped with biometrics login, push notifications, real-time geolocation tracking, in-app purchases, and seamless cloud backend APIs.',
    pricingStarting: 'AED 19,500',
    timeline: '4 – 8 Weeks',
    technologies: ['React Native', 'Flutter', 'iOS Swift', 'Android Kotlin', 'Firebase', 'Node.js', 'REST APIs'],
    benefits: [
      'Single codebase deployment for iOS and Android reducing cost by 40%',
      'Native-grade 60 FPS performance and fluid motion animations',
      'Secure biometrics authentication (FaceID & TouchID)',
      'Real-time push notifications engine for user engagement',
      'App Store & Google Play publishing compliance guarantee',
    ],
    processSteps: [
      { step: 1, title: 'App UX Architecture', desc: 'Define mobile user flows, screen architecture, and offline data sync.' },
      { step: 2, title: 'UI Component Design', desc: 'Craft clean mobile interfaces optimized for one-hand touch navigation.' },
      { step: 3, title: 'Cross-Platform Build', desc: 'Develop mobile application using React Native / Flutter with REST backend.' },
      { step: 4, title: 'App Store Submission', desc: 'Publish app on Apple App Store and Google Play Store.' },
    ],
    requiredDocuments: [
      'Apple Developer Account credentials',
      'Google Play Console Account credentials',
      'App specification brief & feature requirements',
    ],
    faqs: [
      {
        question: 'Do you provide maintenance after app launch?',
        answer: 'Yes, all mobile app developments include 90 days of free bug-fix warranty and optional ongoing SLA maintenance packages for OS updates.',
      },
    ],
  },

  'software-development': {
    id: 'it-custom-software',
    slug: 'software-development',
    title: 'Custom Enterprise Software & ERP/CRM',
    division: 'it',
    category: 'Software Engineering',
    heroHeadline: 'Tailor-Made Enterprise Software, Customer Portals & Automation Systems',
    overview: 'Off-the-shelf software rarely fits specialized UAE enterprise workflows. Cloudloop IT builds custom enterprise resource planning (ERP) platforms, customer relationship management (CRM) portals, automated document processing tools, and inventory management systems tailored precisely to your operational needs.',
    pricingStarting: 'AED 18,000',
    timeline: '6 – 12 Weeks',
    technologies: ['Node.js', 'Python', 'React', 'PostgreSQL', 'Docker', 'AWS ECS', 'Redis', 'REST/GraphQL'],
    benefits: [
      'Zero monthly user license fees compared to proprietary SaaS products',
      '100% ownership of intellectual property (IP) and source code',
      'Automated workflow engines eliminating manual data entry',
      'Role-based granular security access & audit logging',
      'Seamless API integration with UAE payment gateways & ERPs',
    ],
    processSteps: [
      { step: 1, title: 'System Blueprinting', desc: 'Conduct deep workflow mapping and database relational model design.' },
      { step: 2, title: 'Agile Sprint Execution', desc: 'Develop core modules in 2-week bi-weekly sprints with live demo builds.' },
      { step: 3, title: 'User Acceptance Testing (UAT)', desc: 'Run rigorous edge-case testing with key internal company stakeholders.' },
      { step: 4, title: 'Migration & Staff Training', desc: 'Migrate legacy data, launch on cloud, and train enterprise staff.' },
    ],
    requiredDocuments: [
      'Functional specification requirements or workflow diagrams',
      'Legacy database sample schema (if migrating existing system)',
    ],
    faqs: [
      {
        question: 'Do we own the source code after development?',
        answer: 'Absolutely. Cloudloop hands over full source code repositories, documentation, and intellectual property rights upon project completion.',
      },
    ],
  },

  'cyber-security': {
    id: 'it-cyber-security',
    slug: 'cyber-security',
    title: 'Cyber Security & Vulnerability VAPT Audits',
    division: 'it',
    category: 'Cyber Security',
    heroHeadline: 'Penetration Testing, Zero-Trust Defense & UAE Compliance Assurance',
    overview: 'Protect your enterprise assets from cyber threats, ransomware, and data breaches. Cloudloop Cyber Security provides Vulnerability Assessment and Penetration Testing (VAPT), cloud security posture management, endpoint encryption, incident response, and compliance auditing aligned with UAE NESA and DESC regulations.',
    pricingStarting: 'AED 5,000',
    timeline: '3 – 5 Working Days',
    technologies: ['Kali Linux', 'Burp Suite', 'Metasploit', 'Wireshark', 'Palo Alto', 'Fortinet', 'CrowdStrike'],
    benefits: [
      'Comprehensive external & internal penetration testing report',
      'Identification of critical vulnerabilities before malicious hackers exploit them',
      'Compliance alignment with UAE Information Security Regulations',
      'Deployment of Zero-Trust architecture and Next-Gen Firewalls',
      '24/7 Threat intelligence monitoring and incident mitigation SLA',
    ],
    processSteps: [
      { step: 1, title: 'Scope & Reconnaissance', desc: 'Define IP ranges, web apps, and network perimeters for non-destructive scanning.' },
      { step: 2, title: 'Vulnerability Exploitation', desc: 'Perform manual & automated penetration testing targeting OWASP Top 10 vulnerabilities.' },
      { step: 3, title: 'Risk Reporting & Mitigation Plan', desc: 'Deliver detailed executive report detailing threat severity and remediation code fixes.' },
      { step: 4, title: 'Re-Testing & Certification', desc: 'Re-audit patched systems and issue official Cyber Security Attestation Certificate.' },
    ],
    requiredDocuments: [
      'Scope authorization & Non-Disclosure Agreement (NDA)',
      'List of target domain names / public IP ranges',
    ],
    faqs: [
      {
        question: 'Will penetration testing disrupt our live business services?',
        answer: 'No. Our ethical hackers schedule testing during low-traffic windows and utilize non-disruptive techniques to ensure zero system downtime.',
      },
    ],
  },

  'cloud-solutions': {
    id: 'it-cloud-solutions',
    slug: 'cloud-solutions',
    title: 'Cloud Solutions & AWS / Azure Migration',
    division: 'it',
    category: 'Cloud & Hosting',
    heroHeadline: 'Architecting Scalable Cloud Ecosystems on AWS, Azure & Google Cloud',
    overview: 'Modernize your infrastructure with cloud-native engineering. Cloudloop IT designs, migrates, and manages enterprise workloads on Amazon Web Services (AWS), Microsoft Azure, and Google Cloud Platform. We specialize in serverless architectures, Kubernetes containerization, automated disaster recovery, and cost-optimization audits.',
    pricingStarting: 'AED 4,000',
    timeline: '1 – 3 Weeks',
    technologies: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Terraform', 'Cloudflare'],
    benefits: [
      '99.99% Guaranteed uptime SLA for critical enterprise applications',
      'Reduction of cloud hosting bills by 30% to 50% via auto-scaling',
      'Automated daily off-site data backups and disaster recovery',
      'High-speed GCC latency optimization with local UAE cloud nodes',
      'Zero-downtime migration from legacy physical servers to cloud',
    ],
    processSteps: [
      { step: 1, title: 'Cloud Readiness Audit', desc: 'Evaluate existing server workloads, dependencies, and bandwidth consumption.' },
      { step: 2, title: 'Cloud Architecture Design', desc: 'Architect secure VPC networks, multi-zone database clusters, and auto-scaling groups.' },
      { step: 3, title: 'Staging & Data Sync', desc: 'Synchronize server data to cloud staging environment without affecting live operations.' },
      { step: 4, title: 'DNS Cutover & Monitoring', desc: 'Execute live DNS cutover and establish 24/7 cloud performance monitoring.' },
    ],
    requiredDocuments: [
      'Current server inventory & bandwidth usage statistics',
      'Access credentials for existing hosting or cloud accounts',
    ],
    faqs: [
      {
        question: 'Are cloud servers hosted locally within the UAE for compliance?',
        answer: 'Yes! We deploy infrastructure using AWS Middle East (UAE) regions and Microsoft Azure UAE data centers to ensure full compliance with local UAE data sovereignty laws.',
      },
    ],
  },

  'digital-marketing': {
    id: 'it-digital-marketing',
    slug: 'digital-marketing',
    title: 'Digital Marketing & Technical SEO Engineering',
    division: 'it',
    category: 'Digital Growth',
    heroHeadline: 'High-ROI Google Ads, SEO Ranking & Growth Funnels Across Dubai & GCC',
    overview: 'Drive targeted corporate leads and maximize revenue. Cloudloop Digital Marketing engineers data-backed Google PPC search campaigns, high-converting Meta / LinkedIn ad funnels, and technical SEO strategies that position your business on Page 1 of Google search results for lucrative UAE search terms.',
    pricingStarting: 'AED 3,000 / month',
    timeline: 'Monthly SLA Retainer',
    technologies: ['Google Ads', 'Google Analytics 4', 'Semrush', 'Ahrefs', 'Meta Ads', 'LinkedIn Ads', 'Google Tag Manager'],
    benefits: [
      'Immediate qualified lead flow from Google Search PPC campaigns',
      'Long-term organic traffic growth through high-intent UAE SEO keywords',
      'High-converting landing page optimization engineered for conversion',
      'Comprehensive transparent GA4 tracking & monthly ROI performance dashboards',
      'Targeted B2B outreach campaigns targeting C-level executives in Dubai',
    ],
    processSteps: [
      { step: 1, title: 'Competitor & Keyword Audit', desc: 'Analyze high-intent GCC search volume, competitor ad strategies, and SEO gaps.' },
      { step: 2, title: 'Campaign Architecture & Copy', desc: 'Draft high-converting ad copy, negative keyword lists, and landing pages.' },
      { step: 3, title: 'Launch & Daily Bid Tuning', desc: 'Deploy campaigns across Google Ads, Meta, and LinkedIn with continuous A/B testing.' },
      { step: 4, title: 'Monthly Performance Review', desc: 'Deliver granular reports on cost-per-lead (CPL), conversions, and ROAS.' },
    ],
    requiredDocuments: [
      'Google Ads & Analytics manager account access',
      'Target audience profile & primary business value propositions',
    ],
    faqs: [
      {
        question: 'How long before we see results from SEO vs Google Ads?',
        answer: 'Google Ads PPC produces immediate qualified leads within 24 to 48 hours of launch. Technical SEO builds organic momentum, typically achieving top page rankings within 3 to 6 months.',
      },
    ],
  },

  'it-support': {
    id: 'it-support',
    slug: 'it-support',
    title: 'Managed 24/7 IT Support & Infrastructure',
    division: 'it',
    category: 'IT Support',
    heroHeadline: 'Turnkey Office IT Setup, Cat6 Cabling & SLA Managed IT Support',
    overview: 'Ensure zero IT downtime for your UAE workforce. Cloudloop IT provides complete physical and digital IT management: structured Cat6 network cabling, server rack assembly, Cisco/Ubiquiti Wi-Fi mesh coverage, SIRA CCTV security, and proactive 24/7 managed IT support contracts with a guaranteed 30-minute SLA response.',
    pricingStarting: 'AED 2,500 / month',
    timeline: 'Turnkey Setup / SLA Retainer',
    technologies: ['Cat6A Fiber', 'Cisco', 'Ubiquiti UniFi', 'SIRA IP CCTV', 'Fortinet', 'Windows Server', 'Microsoft 365'],
    benefits: [
      'Unlimited remote & on-site technical engineer support',
      'Guaranteed SLA response time of under 30 minutes for urgent issues',
      'Structured Cat6 network cabling and server room rack organization',
      'SIRA-compliant IP CCTV cameras and biometric door access control',
      'Proactive antivirus, patch management, and data backup monitoring',
    ],
    processSteps: [
      { step: 1, title: 'Office Site Survey', desc: 'Conduct floor plan assessment for network cabling drops, CCTV angles & Wi-Fi mesh.' },
      { step: 2, title: 'Cabling & Hardware Install', desc: 'Install Cat6 cabling, patch panels, server racks, switches, and SIRA cameras.' },
      { step: 3, title: 'Network & Security Config', desc: 'Configure enterprise firewalls, Wi-Fi SSIDs, Microsoft 365, and VoIP phones.' },
      { step: 4, title: 'SLA Support Activation', desc: 'Onboard employees to 24/7 helpdesk and begin continuous network monitoring.' },
    ],
    requiredDocuments: [
      'Office floor layout plan (CAD or PDF)',
      'List of active workstations, servers, and network devices',
    ],
    faqs: [
      {
        question: 'What is included in your 24/7 Managed IT SLA?',
        answer: 'Our SLA covers workstation maintenance, network troubleshooting, cloud email management, server backups, antivirus protection, and both remote remote desktop & on-site engineer visits.',
      },
    ],
  },

  'web-hosting': {
    id: 'it-web-hosting',
    slug: 'web-hosting',
    title: 'Enterprise Web Hosting & Cloud Servers',
    division: 'it',
    category: 'Cloud & Hosting',
    heroHeadline: 'Ultra-Fast UAE Cloud Hosting, Dedicated Servers & DDoS Protection',
    overview: 'Host your critical websites and web applications on high-speed cloud infrastructure stationed directly in Dubai data centers. Enjoy low-latency GCC connectivity, automated daily snapshots, enterprise Cloudflare DDoS protection, and SSL certificates managed 24/7 by Cloudloop engineers.',
    pricingStarting: 'AED 450 / month',
    timeline: 'Instant Activation',
    technologies: ['LiteSpeed', 'Nginx', 'Cloudflare Enterprise', 'cPanel/WHM', 'Docker', 'Redis', 'SSL Certificate'],
    benefits: [
      'Local UAE data center IP addresses for optimal GCC search ranking',
      'Sub-50ms latency across Dubai, Abu Dhabi, Saudi Arabia, and Qatar',
      'Free SSL certificates, daily automated off-site backups, and malware scanning',
      '100Gbps Cloudflare Enterprise DDoS attack mitigation',
      '24/7 Managed support by system administrators',
    ],
    processSteps: [
      { step: 1, title: 'Server Provisioning', desc: 'Provision dedicated cloud VPS or enterprise cPanel account in UAE region.' },
      { step: 2, title: 'Migration & SSL Config', desc: 'Migrate site files, database, and issue wildcard SSL security certificates.' },
      { step: 3, title: 'DNS Optimization', desc: 'Route traffic through Cloudflare CDN for global speed & DDoS protection.' },
      { step: 4, title: 'Continuous Monitoring', desc: 'Monitor uptime, CPU load, and disk space 24/7 with automated alerts.' },
    ],
    requiredDocuments: [
      'Domain name control panel access',
      'Full website backup file (zip/tar.gz or database export)',
    ],
    faqs: [
      {
        question: 'Why choose UAE local hosting over overseas hosting?',
        answer: 'Hosting in UAE data centers reduces latency for GCC users from 250ms down to under 30ms, boosting site speed, conversion rates, and local Google search rankings.',
      },
    ],
  },
};

export const DETAILED_SERVICES_MAP: Record<string, DetailedService> = {
  ...BASE_SERVICES_MAP,
  ...NEW_SERVICES_DATA,
  'usa-tourist-visa': NEW_SERVICES_DATA['us-tourist-visa'],
  'international-tourist-visas': NEW_SERVICES_DATA['international-tourist-visa'],
  'uk-visa': NEW_SERVICES_DATA['uk-tourist-visa'],
  'us-visa': NEW_SERVICES_DATA['us-tourist-visa'],
  'canada-visa': NEW_SERVICES_DATA['canada-tourist-visa'],
  'australia-visa': NEW_SERVICES_DATA['australia-tourist-visa'],
  'schengen-visa': NEW_SERVICES_DATA['schengen-tourist-visa'],
};

export const DETAILED_SERVICES = Object.values(DETAILED_SERVICES_MAP).map(service => ({
  ...service,
  shortDesc: service.overview,
  fullDescription: service.overview,
  startingPrice: service.pricingStarting,
  requiredDocs: service.requiredDocuments,
  faqs: service.faqs.map(f => ({
    q: f.question,
    a: f.answer,
    question: f.question,
    answer: f.answer
  }))
}));

import { BLOG_POSTS } from './blogData';
export { BLOG_POSTS };

export const CAREERS_DATA: CareerOpening[] = [
  {
    id: 'job-1',
    title: 'Senior Corporate PRO Specialist',
    division: 'documents',
    location: 'Dubai, UAE (Business Bay Office)',
    type: 'Full-time',
    department: 'Government Relations & Immigration',
    description: 'We are seeking an experienced, bilingual (Arabic & English) Corporate PRO Specialist to manage mainland DED, Free Zone, MOHRE, and GDRFA immigration clearing for high-profile enterprise clients.',
    experience: '5+ Years Experience',
    requirements: [
      '5+ Years direct experience as a Corporate PRO in Dubai / UAE',
      'Fluent verbal and written Arabic and English communication',
      'Extensive knowledge of DED, GDRFA, MOHRE, ICP, and MOFA portals',
      'Valid UAE driving license with clean driving record',
    ],
    benefits: [
      'Competitive salary + performance incentive bonuses',
      'Company car & petrol allowance',
      'Private VIP health insurance & annual flight ticket to home country',
      'Fast-track career growth within Cloudloop Group',
    ],
  },
  {
    id: 'job-2',
    title: 'Lead Full-Stack Software Engineer (React / Node / AWS)',
    division: 'it',
    location: 'Dubai, UAE (Hybrid)',
    type: 'Full-time',
    department: 'Information Technology Division',
    description: 'Join Cloudloop IT as a Lead Software Engineer building high-performance web applications, custom enterprise ERP systems, and cloud-native solutions for UAE corporate clients.',
    experience: '4+ Years Experience',
    requirements: [
      '4+ Years hands-on experience with React, Next.js, TypeScript, Node.js, and PostgreSQL',
      'Strong understanding of AWS serverless architecture (Lambda, S3, CloudFront)',
      'Experience with REST / GraphQL API design and database security',
      'Strong problem-solving mindset and team leadership capability',
    ],
    benefits: [
      'Attractive tax-free salary in Dubai',
      'Flexible hybrid remote / Business Bay office setup',
      'Latest Apple MacBook Pro & hardware equipment provided',
      'Health insurance & continuous technical certification sponsorship (AWS/Azure)',
    ],
  },
  {
    id: 'job-3',
    title: 'Cyber Security Consultant & VAPT Lead',
    division: 'it',
    location: 'Dubai, UAE',
    type: 'Full-time',
    department: 'Cyber Security Division',
    description: 'Lead vulnerability assessment and penetration testing (VAPT) engagements, network security reviews, and DESC / NESA compliance audits for our corporate clients.',
    experience: '3+ Years Experience',
    requirements: [
      'Certified Ethical Hacker (CEH), OSCP, or CISSP certification',
      '3+ Years experience conducting web app and network penetration testing',
      'Deep knowledge of OWASP Top 10, Kali Linux, and security auditing frameworks',
      'Ability to write clear, professional client vulnerability reports',
    ],
    benefits: [
      'Top-tier salary package',
      'Annual security conference attendance allowance',
      'Full health insurance & residency visa sponsorship',
    ],
  },
  {
    id: 'job-4',
    title: 'Senior Business Setup Consultant',
    division: 'documents',
    location: 'Dubai, UAE',
    type: 'Full-time',
    department: 'Business Formation & Advisory',
    description: 'Advise international entrepreneurs and corporate founders on optimal UAE business licensing, Free Zone selection, tax structures, and corporate banking.',
    experience: '3+ Years Experience',
    requirements: [
      '3+ Years sales / consulting experience in UAE business setup companies',
      'Deep understanding of DED Mainland, IFZA, DMCC, Meydan, and RAKEZ license models',
      'Excellent presentation, negotiation, and client relationship skills',
    ],
    benefits: [
      'High base salary + uncapped monthly commission structure',
      'Comprehensive company visa & medical insurance',
      'Luxury office environment in Business Bay',
    ],
  },
];

export const TEAM_DATA: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Faisal Al-Hammadi',
    role: 'Group Managing Director & Founder',
    division: 'group',
    bio: 'Visionary business leader with over 15 years of executive experience guiding international groups and government advisory frameworks across the UAE.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'team-2',
    name: 'Sarah Mansoor',
    role: 'Director of Government Relations & PRO',
    division: 'documents',
    bio: 'Pioneer in UAE immigration law and corporate document clearing, having processed over 3,000 successful company incorporations and golden visas.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'team-3',
    name: 'Dr. Elena Rostova',
    role: 'Chief Technology Officer (CTO)',
    division: 'it',
    bio: 'Former senior cloud architect with 12+ years expertise in React engineering, AWS cloud clusters, and high-security enterprise software systems.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'team-4',
    name: 'Tariq Al-Maktoum',
    role: 'Head of VIP Golden Visa & Corporate Tax',
    division: 'documents',
    bio: 'Specialist in FTA corporate tax compliance, high-net-worth real estate golden visas, and corporate banking liaison with top UAE banks.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
];

export const CERTIFICATIONS_DATA = [
  { name: 'Dubai DED Approved', code: 'DED-884912', icon: 'ShieldCheck' },
  { name: 'MOHRE & GDRFA Registered', code: 'Govt Clearing Partner', icon: 'Building2' },
  { name: 'Dubai Police SIRA Certified', code: 'SIRA-IT-892', icon: 'Camera' },
  { name: 'AWS Select Consulting Partner', code: 'AWS Partner Network', icon: 'CloudServer' },
  { name: 'FTA Tax Agent Compliant', code: 'EmaraTax Partner', icon: 'Calculator' },
  { name: 'ISO 27001 Security Standard', code: 'Certified Operations', icon: 'Lock' },
];
