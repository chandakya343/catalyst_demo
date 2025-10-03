// Enhanced Fake Data for Project Catalyst Demo
// Context: Patel Fine Chemicals - Indian Specialty Chemicals Manufacturer
// Specializes in: Toluene-based specialty chemicals, pharmaceutical intermediates, fine chemicals

const fakeData = {
    companyContext: {
        name: "Patel Fine Chemicals Pvt. Ltd.",
        location: "Ankleshwar, Gujarat, India",
        specialization: "Toluene-based specialty chemicals and fragrance intermediates",
        established: "1998",
        currentProducts: [
            "Para-Cresol (2500 kg/month)", 
            "Benzyl Alcohol (1800 kg/month)",
            "Toluene Diamine (1200 kg/month)",
            "Benzyl Chloride (3000 kg/month)",
            "Meta-Xylene derivatives (800 kg/month)",
            "Benzyl Acetate (950 kg/month)"
        ],
        equipment: {
            reactors: [
                "500L Glass-lined reactor (primary)",
                "250L SS reactor (secondary)",
                "100L pilot reactor (R&D)"
            ],
            distillation: [
                "Toluene recovery column (efficiency: 96%)",
                "Vacuum distillation unit",
                "Fractional distillation setup"
            ],
            analytical: [
                "HPLC with UV/DAD detector",
                "GC-MS for impurity analysis", 
                "IR spectrophotometer",
                "Melting point apparatus"
            ],
            safety: [
                "Fume hood system",
                "Emergency shower/eyewash",
                "Fire suppression system",
                "Chemical storage cabinets"
            ],
            utilities: [
                "Steam boiler (2 ton/hr)",
                "Chilled water system",
                "Nitrogen generation plant",
                "ETP (Effluent Treatment Plant)"
            ]
        },
        rawMaterials: {
            solvents: ["Toluene (₹45/L)", "Methanol (₹38/L)", "Acetone (₹52/L)", "DCM (₹85/L)"],
            acids: ["Acetic Acid (₹60/kg)", "HCl (₹28/kg)", "H2SO4 (₹35/kg)"],
            bases: ["NaOH (₹42/kg)", "K2CO3 (₹125/kg)", "Triethylamine (₹380/kg)"],
            catalysts: ["Palladium/C (₹45,000/kg)", "Zinc dust (₹250/kg)", "AlCl3 (₹180/kg)"]
        },
        suppliers: [
            "Gujarat Alkalies & Chemicals Ltd. (Caustic Soda)",
            "Deepak Nitrite Ltd. (Specialty Chemicals)",
            "SRF Ltd. (Solvents)",
            "Aarti Industries (Intermediates)"
        ],
        regulations: [
            "CPCB NOC for Air & Water",
            "Factory License (Gujarat State)",
            "FSSAI approval for fragrance-grade chemicals",
            "ISO 9001:2015 certified"
        ]
    },
    projects: [
        // Ideas (3)
        {
            id: 'proj_001',
            title: 'Toluene Recovery Enhancement',
            description: 'Upgrade distillation column to achieve 98% toluene recovery (vs current 96%)',
            status: 'idea',
            priority: 'high',
            researcher: 'Dr. Priya Sharma',
            estimatedSavings: '₹18 Lakhs',
            estimatedCost: '₹45,000',
            timeline: '4 weeks',
            successProbability: 85,
            createdDate: '2024-09-15',
            category: 'sustainability',
            marketContext: 'Toluene prices up 15% due to crude oil volatility',
            riskFactors: ['Equipment downtime during upgrade', 'CPCB approval for modifications']
        },
        {
            id: 'proj_002',
            title: 'Benzyl Chloride Process Intensification',
            description: 'Implement continuous flow reactor for benzyl chloride synthesis to reduce batch time',
            status: 'idea',
            priority: 'high',
            researcher: 'Dr. Rajesh Kumar',
            estimatedSavings: '₹32 Lakhs',
            estimatedCost: '₹85,000',
            timeline: '6 weeks',
            successProbability: 75,
            createdDate: '2024-09-18',
            category: 'efficiency',
            marketContext: 'High demand from pharma sector for benzyl alcohol derivatives',
            riskFactors: ['Flow reactor learning curve', 'Heat management in continuous mode']
        },
        {
            id: 'proj_003',
            title: 'Para-Cresol Purification Upgrade',
            description: 'Replace current crystallization with liquid-liquid extraction for higher purity',
            status: 'idea',
            priority: 'medium',
            researcher: 'Dr. Anjali Mehta',
            estimatedSavings: '₹12 Lakhs',
            estimatedCost: '₹32,000',
            timeline: '5 weeks',
            successProbability: 70,
            createdDate: '2024-09-20',
            category: 'quality-improvement',
            marketContext: 'Export quality requirements demanding >99.5% purity',
            riskFactors: ['Solvent selection', 'Extraction efficiency optimization']
        },

        // Approved (2)
        {
            id: 'proj_004',
            title: 'Friedel-Crafts Optimization for Toluene Derivatives',
            description: 'Optimize AlCl3 catalyst loading and temperature for meta-xylene synthesis',
            status: 'approved',
            priority: 'high',
            researcher: 'Dr. Vikram Singh',
            estimatedSavings: '₹24 Lakhs',
            estimatedCost: '₹38,000',
            timeline: '4 weeks',
            successProbability: 82,
            createdDate: '2024-09-10',
            approvedDate: '2024-09-22',
            category: 'efficiency',
            businessJustification: 'Meta-xylene demand up 25% from agrochemical sector',
            approvalNotes: 'Mr. Patel approved based on strong market demand and proven chemistry'
        },
        {
            id: 'proj_005',
            title: 'ETP Sludge Treatment Innovation',
            description: 'Convert ETP sludge into useful organic fertilizer using bio-treatment',
            status: 'approved',
            priority: 'medium',
            researcher: 'Dr. Neha Gupta',
            estimatedSavings: '₹15 Lakhs',
            estimatedCost: '₹42,000',
            timeline: '8 weeks',
            successProbability: 68,
            createdDate: '2024-09-12',
            approvedDate: '2024-09-21',
            category: 'sustainability',
            businessJustification: 'Reduce sludge disposal costs + new revenue stream',
            approvalNotes: 'Aligns with Gujarat State pollution control initiatives'
        },

        // In Progress (3)
        {
            id: 'proj_006',
            title: 'Benzyl Acetate Yield Enhancement',
            description: 'Optimize esterification reaction conditions for higher yield and purity',
            status: 'in_progress',
            priority: 'high',
            researcher: 'Dr. Anjali Mehta',
            estimatedSavings: '₹28 Lakhs',
            estimatedCost: '₹45,000',
            timeline: '3 weeks',
            successProbability: 85,
            createdDate: '2024-09-05',
            approvedDate: '2024-09-08',
            startedDate: '2024-09-10',
            category: 'efficiency',
            progress: 65,
            marketContext: 'Growing demand from fragrance and flavoring industry',
            riskFactors: ['Acetic acid price volatility', 'Temperature control optimization']
        },
        {
            id: 'proj_007',
            title: 'Continuous Flow Optimization',
            description: 'Implement continuous flow reactor for increased throughput',
            status: 'in_progress',
            priority: 'medium',
            researcher: 'Dr. Arjun Patel',
            estimatedSavings: '₹35 Lakhs',
            estimatedCost: '₹75,000',
            timeline: '8 weeks',
            successProbability: 72,
            createdDate: '2024-08-28',
            approvedDate: '2024-09-02',
            startedDate: '2024-09-05',
            category: 'efficiency',
            progress: 40
        },
        {
            id: 'proj_008',
            title: 'Temperature Control Upgrade',
            description: 'Install precise temperature control for better yield consistency',
            status: 'in_progress',
            priority: 'low',
            researcher: 'Dr. Priya Sharma',
            estimatedSavings: '₹9 Lakhs',
            estimatedCost: '₹32,000',
            timeline: '3 weeks',
            successProbability: 88,
            createdDate: '2024-09-01',
            approvedDate: '2024-09-06',
            startedDate: '2024-09-12',
            category: 'quality-improvement',
            progress: 25
        },

        // Completed (5)
        {
            id: 'proj_009',
            title: 'Solvent Recovery System',
            description: 'Implemented distillation unit for toluene recovery',
            status: 'completed',
            priority: 'high',
            researcher: 'Dr. Rajesh Kumar',
            estimatedSavings: '₹24 Lakhs',
            actualSavings: '₹26 Lakhs',
            estimatedCost: '₹55,000',
            actualCost: '₹52,000',
            timeline: '4 weeks',
            actualTimeline: '3.5 weeks',
            successProbability: 85,
            createdDate: '2024-07-15',
            approvedDate: '2024-07-18',
            startedDate: '2024-07-22',
            completedDate: '2024-08-15',
            category: 'sustainability'
        },
        {
            id: 'proj_010',
            title: 'pH Control Automation',
            description: 'Automated pH monitoring and adjustment system',
            status: 'completed',
            priority: 'medium',
            researcher: 'Dr. Vikram Singh',
            estimatedSavings: '₹16 Lakhs',
            actualSavings: '₹18 Lakhs',
            estimatedCost: '₹38,000',
            actualCost: '₹41,000',
            timeline: '3 weeks',
            actualTimeline: '3 weeks',
            successProbability: 75,
            createdDate: '2024-08-01',
            approvedDate: '2024-08-05',
            startedDate: '2024-08-08',
            completedDate: '2024-08-29',
            category: 'efficiency'
        },
        {
            id: 'proj_011',
            title: 'Impurity Reduction Protocol',
            description: 'Developed new purification protocol reducing impurities by 40%',
            status: 'completed',
            priority: 'high',
            researcher: 'Dr. Neha Gupta',
            estimatedSavings: '₹20 Lakhs',
            actualSavings: '₹22 Lakhs',
            estimatedCost: '₹28,000',
            actualCost: '₹30,000',
            timeline: '2 weeks',
            actualTimeline: '2.5 weeks',
            successProbability: 82,
            createdDate: '2024-08-10',
            approvedDate: '2024-08-12',
            startedDate: '2024-08-15',
            completedDate: '2024-09-02',
            category: 'quality-improvement'
        },
        {
            id: 'proj_012',
            title: 'Energy Efficient Heating',
            description: 'Replaced steam heating with electrical heating for better control',
            status: 'completed',
            priority: 'medium',
            researcher: 'Dr. Anjali Mehta',
            estimatedSavings: '₹14 Lakhs',
            actualSavings: '₹15 Lakhs',
            estimatedCost: '₹65,000',
            actualCost: '₹68,000',
            timeline: '5 weeks',
            actualTimeline: '4.5 weeks',
            successProbability: 70,
            createdDate: '2024-07-01',
            approvedDate: '2024-07-05',
            startedDate: '2024-07-10',
            completedDate: '2024-08-12',
            category: 'efficiency'
        },
        {
            id: 'proj_013',
            title: 'Quality Control Automation',
            description: 'Automated sampling and analysis system',
            status: 'completed',
            priority: 'low',
            researcher: 'Dr. Arjun Patel',
            estimatedSavings: '₹11 Lakhs',
            actualSavings: '₹12 Lakhs',
            estimatedCost: '₹45,000',
            actualCost: '₹48,000',
            timeline: '6 weeks',
            actualTimeline: '5.5 weeks',
            successProbability: 68,
            createdDate: '2024-06-15',
            approvedDate: '2024-06-20',
            startedDate: '2024-06-25',
            completedDate: '2024-08-05',
            category: 'quality-improvement'
        }
    ],

    labConversations: {
        'proj_006': [
            {
                id: 'msg_001',
                type: 'user',
                content: 'I need to optimize our benzyl acetate production. The current yield is only 78% and we\'re getting impurities. The fragrance industry demands higher purity. Can you help?',
                timestamp: '2024-09-10T09:15:00Z'
            },
            {
                id: 'msg_002',
                type: 'assistant',
                content: 'Excellent timing, Dr. Anjali! Benzyl acetate demand is surging in the fragrance sector. Let me analyze your current process.\n\n**Current Analysis (Benzyl Alcohol + Acetic Acid):**\n- Your 500L glass-lined reactor handles esterification well\n- Current 950 kg/month production at 78% yield\n- Main impurities: Unreacted benzyl alcohol, acetic acid\n\n**Optimization Strategies:**\n1. **Catalyst Enhancement**: Add p-toluenesulfonic acid (0.1 mol%)\n2. **Azeotropic Distillation**: Remove water continuously\n3. **Temperature Profile**: 140°C → 160°C staged heating\n\n**Equipment Compatibility:**\n✓ Glass-lined reactor suitable for acid catalysis\n✓ Your distillation column can handle azeotropic separation\n✓ HPLC ready for purity monitoring\n\nTarget: 92% yield, >99% purity. Shall I design the optimization protocol?',
                timestamp: '2024-09-10T09:16:30Z'
            },
            {
                id: 'msg_003',
                type: 'user',
                content: 'Yes, let\'s optimize the esterification. What would be the detailed experimental protocol?',
                timestamp: '2024-09-10T09:18:00Z'
            },
            {
                id: 'msg_004',
                type: 'assistant',
                content: 'Perfect! Here\'s an optimized protocol for your 100L pilot reactor:\n\n**Enhanced Esterification Protocol:**\n\n**Materials (from your inventory):**\n- Benzyl Alcohol: 108 kg (1.0 equiv)\n- Glacial Acetic Acid: 72 kg (1.2 equiv excess)\n- p-Toluenesulfonic acid: 0.5 kg (0.1 mol% catalyst)\n- Toluene: 50 kg (azeotropic agent)\n\n**Equipment Setup:**\n- 100L pilot reactor with Dean-Stark trap\n- Reflux condenser with water separation\n- HPLC sampling every 45 minutes\n- Temperature controller ±2°C precision\n\n**Procedure:**\n1. Charge benzyl alcohol and acetic acid\n2. Add p-TsOH catalyst slowly with stirring\n3. Heat to 140°C, maintain for 2 hours\n4. Add toluene, increase to 160°C\n5. Collect water via Dean-Stark (monitor conversion)\n6. Cool, wash with sodium bicarbonate solution\n7. Distill product at reduced pressure\n\n**Quality Targets:**\n- Yield: >92% (vs current 78%)\n- Purity: >99% (fragrance grade)\n- Water content: <0.05%\n\nExpected batch time: 6 hours. Shall we proceed?',
                timestamp: '2024-09-10T09:20:15Z'
            },
            {
                id: 'msg_005',
                type: 'user',
                content: 'This looks promising. How do I monitor the reaction progress and what should I watch for?',
                timestamp: '2024-09-10T10:30:00Z'
            },
            {
                id: 'msg_006',
                type: 'assistant',
                content: 'Excellent question! Here\'s your comprehensive monitoring strategy:\n\n**Reaction Monitoring:**\n- **HPLC Analysis**: Track benzyl alcohol consumption (should drop from 100% to <5%)\n- **Water Collection**: Dean-Stark trap should collect ~18L water (theoretical)\n- **Temperature Profile**: Maintain 160±2°C for optimal conversion\n- **GC Analysis**: Monitor impurity formation every 2 hours\n\n**Quality Indicators:**\n- **Target Conversion**: >95% benzyl alcohol consumption\n- **Purity Check**: Benzyl acetate peak >99% by HPLC\n- **Aroma Test**: Sweet floral fragrance (subjective but important)\n- **Refractive Index**: 1.502 ± 0.002 at 20°C\n\n**Critical Parameters:**\n- **pH Control**: Maintain slightly acidic (pH 5-6)\n- **Water Removal**: Complete removal essential for high yield\n- **Temperature Control**: Avoid >165°C (decomposition risk)\n\n**Economic Impact:**\n- Yield improvement: 78% → 92% = 18% more product\n- Quality premium: Fragrance grade commands 25% higher price\n- Annual impact: ₹28L additional revenue\n\nReady to start the optimization run?',
                timestamp: '2024-09-10T10:32:45Z'
            }
        ],
        'proj_001': [
            {
                id: 'msg_t001',
                type: 'user',
                content: 'I want to improve our toluene recovery from 96% to 98%. Dr. Priya suggested upgrading the distillation column. What do you think?',
                timestamp: '2024-09-24T10:15:00Z'
            },
            {
                id: 'msg_t002',
                type: 'assistant',
                content: '**Excellent opportunity, Dr. Priya!** With current toluene at ₹52/L, every 1% recovery improvement = ₹2.4L annual savings.\n\n**Current Analysis:**\n- Your toluene column: 96% efficiency, 15 theoretical plates\n- Monthly toluene usage: ~25,000L\n- Lost toluene: 1,000L/month = ₹52,000/month\n\n**Upgrade Options:**\n1. **Structured Packing Retrofit** (Recommended)\n   - Add 5 more theoretical plates\n   - Fits existing column shell\n   - Cost: ₹35,000, Timeline: 3 weeks\n   - Expected efficiency: 98.2%\n\n2. **New Column** \n   - Higher efficiency but ₹8L investment\n   - 6-month timeline\n\n**Equipment Compatibility:**\n✓ Current reboiler adequate\n✓ Condenser capacity sufficient\n✓ Control system upgradeable\n\n**CPCB Compliance:** Minor modification, existing NOC covers this.\n\n**Business Auto-Analysis Generated:**\nMr. Patel will see: ₹18L annual savings, 3-week payback, 85% success probability.\n\nShall I design the structured packing specifications?',
                timestamp: '2024-09-24T10:17:30Z'
            }
        ]
    },

    businessConversations: [
        {
            id: 'msg_b001',
            type: 'user',
            content: 'Show me all projects focused on cost reduction this quarter',
            timestamp: '2024-09-23T14:15:00Z'
        },
        {
            id: 'msg_b002',
            type: 'assistant',
            content: '🔍 **Searching business intelligence databases...**\n*Sources: Chemical Engineering Progress, Indian Chemical Council Reports, Bloomberg Terminal*\n\n**Research Complete: Q4 2024 Portfolio Analysis**\n\n**High Priority Active:**\n• Benzyl Acetate Yield Enhancement (Dr. Anjali) - ₹28L potential, 65% complete\n  *Research validates: Fragrance market CAGR 8.2% (Source: Global Fragrance Report 2024)*\n• Toluene Recovery Enhancement (Dr. Priya) - ₹18L potential, awaiting approval\n  *Market driver confirmed: Crude volatility analysis (Brent +15% YoY)*\n\n**Research-Backed Performance:**\n• Total Achieved: ₹44 Lakhs (3,667% ROI)\n• **Industry Benchmark:** 300-500% ROI (McKinsey Chemical ROI Study 2024)\n• **Your Performance:** Leading sector by 700%\n\n**Market Intelligence:**\n*Scanning 15 market databases, 50+ technical journals*\n• Gujarat chemicals: 12% growth confirmed\n• Quality positioning: 40% margin premium sustainable\n\n🔍 *Continuing research across 250+ sources for real-time market updates...*',
            timestamp: '2024-09-23T14:16:22Z'
        },
        {
            id: 'msg_b003',
            type: 'user',
            content: 'What\'s the status of Dr. Anjali\'s benzyl acetate optimization project? When will we see results?',
            timestamp: '2024-09-23T14:18:00Z'
        },
        {
            id: 'msg_b004',
            type: 'assistant',
            content: '**Benzyl Acetate Yield Enhancement - Live Status:**\n\n**Progress:** 65% complete (ahead of schedule)\n**Timeline:** On track for completion by October 1st\n**Current Phase:** Production scale-up and fragrance-grade validation\n\n**Latest Update (Today):**\nDr. Anjali achieved 92% yield with 99.2% purity in yesterday\'s 50kg trial. This exceeds fragrance industry specifications!\n\n**Financial Projection:**\n• Yield improvement: 78% → 92% (+18% more product)\n• Quality premium: Fragrance grade commands 25% higher price\n• Expected annual revenue increase: ₹28 Lakhs\n• Payback period: 1.6 months\n\n**Next Milestones:**\n• Sept 25: Final aroma profile validation\n• Sept 28: Fragrance customer sample approval\n• Oct 1: Production line implementation\n\n**Market Impact:** This positions us for premium fragrance market entry - 40% higher margins than commodity grade!',
            timestamp: '2024-09-23T14:19:15Z'
        },
        {
            id: 'msg_b005',
            type: 'user',
            content: 'How much have we spent on R&D this quarter and what\'s our return so far?',
            timestamp: '2024-09-23T14:25:00Z'
        },
        {
            id: 'msg_b006',
            type: 'assistant',
            content: '🔍 **Analyzing R&D benchmarks & best practices...**\n*Searching: Harvard Business Review, MIT Sloan, Industry reports*\n\n**Research Found:** "Small-Scale Chemical R&D Excellence"\n*McKinsey & Company, Chemical Sector Report 2024*\n\n**Q4 2024 R&D Financial Analysis:**\n\n**Investment Efficiency:**\n• Total Spent: ₹1.2 Lakhs\n• **Benchmark Validation:** Top quartile R&D spend ratio (0.3% of revenue)\n• **Performance:** 3,667% ROI vs industry 300-500%\n\n**Research-Validated Returns:**\n*Cross-referenced with 50+ similar chemical optimization cases*\n• Your achieved: ₹44L annual savings\n• Industry average: ₹8-15L for similar investment\n• **Performance multiplier:** 3-5x above sector norm\n\n**Best Practice Analysis:**\n*Source: "Agile R&D in Specialty Chemicals" - Boston Consulting Group*\n• Speed advantage: 3-week project cycles vs 12-week industry\n• Success rate: 85% vs 60% industry average\n• Resource efficiency: 40% better than comparable companies\n\n🔍 *Monitoring 150+ R&D performance studies for continuous benchmarking...*',
            timestamp: '2024-09-23T14:26:45Z'
        }
    ],

    labNotebook: {
        'proj_006': [
            {
                id: 'entry_001',
                title: 'Literature Review - Benzyl Acetate Optimization',
                date: '2024-09-10',
                content: 'Reviewed 12 papers on esterification optimization. Key findings: p-Toluenesulfonic acid most effective catalyst (0.1-0.2 mol%), azeotropic water removal crucial. Dean-Stark apparatus essential. Expected yield improvement from 78% to 90-95% with proper optimization.'
            },
            {
                id: 'entry_002',
                title: 'Equipment Setup & Safety Protocol',
                date: '2024-09-11',
                content: 'Verified equipment compatibility:\n✓ 100L pilot reactor with heating jacket\n✓ Dean-Stark water trap installed\n✓ Reflux condenser with water cooling\n✓ HPLC ready for monitoring\n✓ p-TsOH handling protocols reviewed\nSafety reminders: Acid catalyst handling, high temperature operations (160°C)'
            },
            {
                id: 'entry_003',
                title: 'Raw Material Cost Analysis',
                date: '2024-09-12',
                content: 'Current materials pricing:\n• Benzyl Alcohol: ₹185/kg (Deepak Nitrite contract)\n• Glacial Acetic Acid: ₹60/kg\n• p-Toluenesulfonic acid: ₹450/kg (catalyst, recoverable)\n• Toluene: ₹52/kg (azeotropic agent)\nCost impact of optimization: +₹15/kg raw materials, but +18% yield = Net ₹45/kg savings'
            },
            {
                id: 'entry_004',
                title: 'Experiment 1 - Catalyst Loading Study',
                date: '2024-09-14',
                content: 'Catalyst optimization trials:\n• Baseline (no catalyst): 65% yield, 6 hours\n• 0.05 mol% p-TsOH: 78% yield, 4.5 hours\n• 0.1 mol% p-TsOH: 89% yield, 3.5 hours\n• 0.2 mol% p-TsOH: 91% yield, 3 hours (some discoloration)\nOptimal: 0.1 mol% p-TsOH for best yield-quality balance'
            },
            {
                id: 'entry_005',
                title: 'Azeotropic Distillation Optimization',
                date: '2024-09-16',
                content: 'Water removal efficiency study:\n• Without toluene: 82% yield (incomplete water removal)\n• With toluene (3:1 ratio): 89% yield, clean separation\n• Dean-Stark monitoring: 18.2L water collected (theory: 18.0L)\n• Toluene recovery: 95% via distillation\nAzeotropic method essential for high conversion'
            },
            {
                id: 'entry_006',
                title: 'Scale-up Trial - 50kg Batch',
                date: '2024-09-20',
                content: 'Production scale trial:\n• Successful scale-up to 50kg benzyl alcohol\n• Yield: 92% (exceeds target!)\n• Purity: 99.2% by HPLC\n• Reaction time: 4 hours total\n• Water collection: Complete (18.5L)\n• Product quality: Fragrance grade achieved\nExcellent results - ready for production implementation!'
            },
            {
                id: 'entry_007',
                title: 'Final Quality Validation',
                date: '2024-09-22',
                content: 'Comprehensive quality analysis:\n• Purity: 99.2% (spec: >99%) ✓\n• Water content: 0.03% (spec: <0.05%) ✓\n• Refractive Index: 1.5018 (spec: 1.502±0.002) ✓\n• Aroma profile: Sweet floral (fragrance grade) ✓\n• Acidity: 0.02% as acetic acid (spec: <0.05%) ✓\nAll parameters exceed fragrance industry specifications. Process validated!'
            }
        ]
    },

    businessAnalytics: [
        {
            title: 'Current Quarter ROI',
            value: '3,667%',
            description: 'Return on ₹1.2L R&D investment',
            trend: 'up'
        },
        {
            title: 'Projects Success Rate',
            value: '85%',
            description: 'Completed projects meeting targets',
            trend: 'up'
        },
        {
            title: 'Average Payback Period',
            value: '2.3 months',
            description: 'Time to recover project investment',
            trend: 'down'
        },
        {
            title: 'Pipeline Value',
            value: '₹147 Lakhs',
            description: 'Total potential annual savings',
            trend: 'up'
        },
        {
            title: 'Cost Reduction Focus',
            value: '65%',
            description: 'Projects targeting cost reduction',
            trend: 'stable'
        },
        {
            title: 'Research Efficiency',
            value: '₹42L/₹1.2L',
            description: 'Savings generated per rupee invested',
            trend: 'up'
        }
    ],

    researchers: [
        {
            id: 'dr_anjali',
            name: 'Dr. Anjali Mehta',
            specialization: 'Organic Chemistry',
            activeProjects: 2,
            completedProjects: 3,
            successRate: 92,
            totalSavings: '₹45 Lakhs'
        },
        {
            id: 'dr_rajesh',
            name: 'Dr. Rajesh Kumar',
            specialization: 'Catalysis & Process Chemistry',
            activeProjects: 1,
            completedProjects: 2,
            successRate: 88,
            totalSavings: '₹48 Lakhs'
        },
        {
            id: 'dr_priya',
            name: 'Dr. Priya Sharma',
            specialization: 'Green Chemistry',
            activeProjects: 2,
            completedProjects: 1,
            successRate: 75,
            totalSavings: '₹15 Lakhs'
        },
        {
            id: 'dr_vikram',
            name: 'Dr. Vikram Singh',
            specialization: 'Process Engineering',
            activeProjects: 1,
            completedProjects: 2,
            successRate: 85,
            totalSavings: '₹34 Lakhs'
        },
        {
            id: 'dr_neha',
            name: 'Dr. Neha Gupta',
            specialization: 'Analytical Chemistry',
            activeProjects: 1,
            completedProjects: 2,
            successRate: 80,
            totalSavings: '₹34 Lakhs'
        },
        {
            id: 'dr_arjun',
            name: 'Dr. Arjun Patel',
            specialization: 'Automation & Control',
            activeProjects: 1,
            completedProjects: 1,
            successRate: 90,
            totalSavings: '₹47 Lakhs'
        }
    ],

    insights: [
        {
            title: 'Cost Reduction Focus',
            description: '3 active projects targeting ₹35L annual savings'
        },
        {
            title: 'Top Performer',
            description: 'Dr. Anjali - 3 successful projects this quarter'
        },
        {
            title: 'Budget Alert',
            description: '65% of Q4 R&D budget utilized'
        }
    ],

    predefinedQuestions: {
        lab: [
            'How can I optimize this reaction for our 500L reactor?',
            'What safety protocols apply for toluene-based synthesis?',
            'Calculate scale-up parameters for production batch',
            'Suggest equipment modifications for better yield',
            'What analytical methods should I use for monitoring?',
            'How does this fit with our ETP capabilities?'
        ],
        business: [
            'Show me all projects targeting toluene cost reduction',
            'What is our R&D ROI compared to industry benchmarks?',
            'Which projects have the fastest payback period?',
            'How do Gujarat regulatory changes affect our projects?',
            'What is the market opportunity for our new products?',
            'Calculate potential savings from process improvements'
        ]
    },

    marketInsights: {
        toluenePrice: '₹52/L (up 15% QoQ due to crude volatility)',
        aceticAcidPrice: '₹60/kg (stable, competitive advantage)',
        benzylChloridedemand: 'Up 25% driven by specialty chemical and fragrance demand',
        fragranceMarket: 'Premium fragrance chemicals showing 30% growth in export markets',
        regulatoryUpdates: [
            'Gujarat State ETP norms updated - stricter COD limits',
            'Central Drug License renewals due March 2025',
            'New GST structure for specialty chemicals effective Jan 2025'
        ],
        competitorAnalysis: [
            'Aarti Industries expanding toluene derivatives capacity',
            'Deepak Nitrite entering benzyl alcohol market',
            'Import duty on Chinese intermediates increased to 25%'
        ]
    },

    realtimeSync: {
        lastLabUpdate: '2024-09-24T10:17:30Z',
        lastBusinessUpdate: '2024-09-24T10:18:45Z',
        pendingBusinessAnalysis: ['proj_001'],
        autoGeneratedBusinessCases: {
            'proj_001': {
                roiAnalysis: '₹18L annual savings, 3-week payback',
                marketJustification: 'Toluene prices rising, recovery improvement critical',
                riskAssessment: 'Low risk - proven technology, existing equipment base',
                regulatoryImpact: 'Positive - aligns with Gujarat green initiative',
                implementationPlan: '3-week shutdown during monsoon maintenance window'
            }
        }
    }
};

// Export for use in app.js
window.fakeData = fakeData;
