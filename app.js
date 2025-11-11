// Project Catalyst Demo Application

class ProjectCatalystApp {
    constructor() {
        this.currentView = 'dashboard';
        this.currentRole = 'manager'; // 'manager' or 'researcher'
        this.currentProject = 'proj_006'; // Default to Paracetamol project
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.populateDashboard();
        this.populateLabProjects();
        this.populateBusinessAnalytics();
        this.populateLabConversation();
        this.populateLabNotebook();
        this.populateBusinessConversation();
        this.populateBusinessAnalysis();
        this.updateUserRole();
    }

    setupEventListeners() {
        // Navigation tabs
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                this.switchView(view);
            });
        });

        // User role toggle
        const roleToggle = document.getElementById('user-role-toggle');
        roleToggle.addEventListener('click', () => {
            this.toggleUserRole();
        });

        // Chat inputs
        const labInput = document.getElementById('lab-input');
        const labSend = document.getElementById('lab-send');
        const businessInput = document.getElementById('business-input');
        const businessSend = document.getElementById('business-send');

        // DISABLED: Old lab chat handler - now using lab-copilot.js form system
        // if (labInput) {
        //     labInput.addEventListener('keypress', (e) => {
        //         if (e.key === 'Enter') {
        //             this.handleLabMessage();
        //         }
        //     });
        // }

        // if (labSend) {
        //     labSend.addEventListener('click', () => {
        //         this.handleLabMessage();
        //     });
        // }

        if (businessInput) {
            businessInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleBusinessMessage();
                }
            });
        }

        if (businessSend) {
            businessSend.addEventListener('click', () => {
                this.handleBusinessMessage();
            });
        }

        // Editor tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchEditorTab(e.target.dataset.tab);
            });
        });

        // Preview toggle
        const previewBtn = document.getElementById('toggle-preview');
        if (previewBtn) {
            previewBtn.addEventListener('click', () => {
                this.toggleMarkdownPreview();
            });
        }

        // Business preview toggle
        const businessPreviewBtn = document.getElementById('business-toggle-preview');
        if (businessPreviewBtn) {
            businessPreviewBtn.addEventListener('click', () => {
                this.toggleBusinessPreview();
            });
        }

        // Business product selector
        const businessProductSelector = document.getElementById('business-product-selector');
        if (businessProductSelector) {
            businessProductSelector.addEventListener('change', (e) => {
                this.selectBusinessProduct(e.target.value);
            });
        }

        // Quick action buttons
        document.querySelectorAll('.quick-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleQuickAction(e.target.closest('.quick-btn').dataset.action);
            });
        });

        // Project selector
        const projectSelector = document.getElementById('project-selector');
        if (projectSelector) {
            projectSelector.addEventListener('change', (e) => {
                this.selectProject(e.target.value);
            });
        }

        // Terminal clear button
        const clearBtn = document.querySelector('.clear-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearTerminal();
            });
        }

        // Project selection in lab (legacy)
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('project-item')) {
                this.selectProject(e.target.dataset.projectId);
            }
        });
    }

    switchView(view) {
        // Update navigation
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');

        // Update views
        document.querySelectorAll('.view').forEach(v => {
            v.classList.remove('active');
        });
        document.getElementById(view).classList.add('active');

        this.currentView = view;
    }

    toggleUserRole() {
        this.currentRole = this.currentRole === 'manager' ? 'researcher' : 'manager';
        this.updateUserRole();
    }

    updateUserRole() {
        const roleDisplay = document.getElementById('current-role');
        roleDisplay.textContent = this.currentRole === 'manager' ? 'Manager View' : 'Researcher View';

        // Update interface based on role
        if (this.currentRole === 'researcher') {
            // Show lab-focused interface
            this.switchView('lab-copilot');
        } else {
            // Show business-focused interface
            this.switchView('business-copilot');
        }
    }

    populateDashboard() {
        const columns = {
            'ideas': document.getElementById('ideas-column'),
            'approved': document.getElementById('approved-column'),
            'in-progress': document.getElementById('in-progress-column'),
            'completed': document.getElementById('completed-column')
        };

        Object.keys(columns).forEach(status => {
            const column = columns[status];
            if (!column) return;

            const projects = fakeData.projects.filter(p => {
                if (status === 'in-progress') return p.status === 'in_progress';
                return p.status === status;
            });

            column.innerHTML = '';
            projects.forEach(project => {
                const card = this.createProjectCard(project);
                column.appendChild(card);
            });
        });
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-project-id', project.id);

        const priorityClass = `priority-${project.priority}`;
        const savings = project.actualSavings || project.estimatedSavings || 'TBD';
        const progressBar = project.progress ? 
            `<div style="background: #e5e7eb; height: 4px; border-radius: 2px; margin-top: 8px;">
                <div style="background: #3b82f6; height: 100%; width: ${project.progress}%; border-radius: 2px;"></div>
            </div>` : '';

        card.innerHTML = `
            <h4>${project.title}</h4>
            <p>${project.description}</p>
            <div class="project-meta">
                <span>₹${savings.replace('₹', '')}</span>
                <span class="project-priority ${priorityClass}">${project.priority.toUpperCase()}</span>
            </div>
            <div style="font-size: 11px; color: var(--text-tertiary); margin-top: 4px;">
                ${project.researcher}
            </div>
            ${progressBar}
        `;

        return card;
    }

    populateLabProjects() {
        const projectsList = document.getElementById('lab-projects');
        if (!projectsList) return;

        const userProjects = fakeData.projects.filter(p => 
            ['idea', 'approved', 'in_progress'].includes(p.status.replace('_', '-'))
        );

        projectsList.innerHTML = '';
        userProjects.forEach(project => {
            const item = document.createElement('div');
            item.className = `project-item ${project.id === this.currentProject ? 'active' : ''}`;
            item.setAttribute('data-project-id', project.id);
            item.textContent = project.title;
            projectsList.appendChild(item);
        });
    }

    selectProject(projectId) {
        this.currentProject = projectId;
        
        // Update project list selection (legacy)
        document.querySelectorAll('.project-item').forEach(item => {
            item.classList.remove('active');
        });
        const legacyProjectElement = document.querySelector(`[data-project-id="${projectId}"]`);
        if (legacyProjectElement) {
            legacyProjectElement.classList.add('active');
        }

        // Update project selector dropdown
        const projectSelector = document.getElementById('project-selector');
        if (projectSelector) {
            projectSelector.value = projectId;
        }

        // Update project title (legacy)
        const project = fakeData.projects.find(p => p.id === projectId);
        const titleElement = document.getElementById('lab-project-title');
        if (titleElement && project) {
            titleElement.textContent = project.title;
        }

        // Update editor content based on project
        this.updateEditorContent(project);

        // Update conversation and notebook
        this.populateLabConversation();
        this.populateLabNotebook();
    }

    updateEditorContent(project) {
        if (!project) return;

        // Update protocol editor with project-specific content
        const protocolEditor = document.getElementById('protocol-editor');
        if (protocolEditor && project.id === 'proj_006') {
            // Benzyl Acetate project content is already in the placeholder
        } else if (protocolEditor && project.id === 'proj_001') {
            protocolEditor.placeholder = `# Toluene Recovery Enhancement Protocol

## Objective
Upgrade distillation column to achieve 98% toluene recovery (vs current 96%)

## Current Analysis
- Toluene column: 96% efficiency, 15 theoretical plates
- Monthly usage: ~25,000L
- Lost toluene: 1,000L/month = ₹52,000/month

## Upgrade Plan
1. Install structured packing (5 additional theoretical plates)
2. Fits existing column shell
3. Cost: ₹35,000, Timeline: 3 weeks
4. Expected efficiency: 98.2%

## Implementation Steps
1. Schedule shutdown during monsoon maintenance window
2. Install structured packing sections
3. Update control system parameters
4. Commission and validate performance
5. Document new operating procedures

## Economic Impact
- Annual savings: ₹18 Lakhs
- Payback period: 3 weeks
- Success probability: 85%`;
        }

        // Update terminal output based on project
        const terminalOutput = document.getElementById('terminal-output');
        if (terminalOutput) {
            if (project.id === 'proj_006') {
                // Keep benzyl acetate output
            } else if (project.id === 'proj_001') {
                terminalOutput.innerHTML = `
                    <div class="output-line">$ Starting toluene recovery enhancement analysis...</div>
                    <div class="output-line">✓ Current column efficiency: 96%</div>
                    <div class="output-line">✓ Monthly toluene loss: 1,000L (₹52,000)</div>
                    <div class="output-line">📊 Structured packing retrofit analysis complete</div>
                    <div class="output-line">📈 Projected efficiency: 98.2% | Annual savings: ₹18L</div>
                    <div class="output-line">⏱️ Implementation timeline: 3 weeks | ROI: 3-week payback</div>
                    <div class="output-line">💰 Business case auto-generated for Mr. Patel's approval</div>
                `;
            }
        }
    }

    populateLabConversation() {
        const chatContainer = document.getElementById('lab-chat');
        if (!chatContainer) return;

        const conversation = fakeData.labConversations[this.currentProject] || [];
        
        chatContainer.innerHTML = '';
        conversation.forEach(message => {
            const messageDiv = this.createChatMessage(message);
            chatContainer.appendChild(messageDiv);
        });

        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    populateLabNotebook() {
        const notebookContainer = document.getElementById('lab-notebook-content');
        if (!notebookContainer) return;

        const entries = fakeData.labNotebook[this.currentProject] || [];
        
        notebookContainer.innerHTML = '';
        entries.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.className = 'notebook-entry';
            entryDiv.innerHTML = `
                <div class="entry-header">
                    <span class="entry-title">${entry.title}</span>
                    <span class="entry-date">${entry.date}</span>
                </div>
                <div class="entry-content">${entry.content.replace(/\n/g, '<br>')}</div>
            `;
            notebookContainer.appendChild(entryDiv);
        });
    }

    populateBusinessConversation() {
        const chatContainer = document.getElementById('business-chat');
        if (!chatContainer) return;

        chatContainer.innerHTML = '';
        fakeData.businessConversations.forEach(message => {
            const messageDiv = this.createChatMessage(message);
            chatContainer.appendChild(messageDiv);
        });

        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    populateBusinessAnalytics() {
        const analyticsContainer = document.getElementById('business-analytics-content');
        if (!analyticsContainer) return;

        analyticsContainer.innerHTML = '';
        fakeData.businessAnalytics.forEach(analytic => {
            const card = document.createElement('div');
            card.className = 'analytics-card';
            card.innerHTML = `
                <div class="analytics-title">${analytic.title}</div>
                <div class="analytics-value">${analytic.value}</div>
                <div class="analytics-description">${analytic.description}</div>
            `;
            analyticsContainer.appendChild(card);
        });
    }

    createChatMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${message.type}`;
        
        const time = new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        messageDiv.innerHTML = `
            <div class="message-content">${message.content.replace(/\n/g, '<br>')}</div>
            <div class="message-time">${time}</div>
        `;

        return messageDiv;
    }

    // DISABLED: Old lab message handler - now using lab-copilot.js form system
    // handleLabMessage() {
    //     const input = document.getElementById('lab-input');
    //     const message = input.value.trim();
    //     if (!message) return;

    //     // Add user message
    //     const chatContainer = document.getElementById('lab-chat');
    //     const userMessage = {
    //         type: 'user',
    //         content: message,
    //         timestamp: new Date().toISOString()
    //     };
        
    //     chatContainer.appendChild(this.createChatMessage(userMessage));
    //     input.value = '';

    //     // Simulate AI response
    //     setTimeout(() => {
    //         const response = this.generateLabResponse(message);
    //         const aiMessage = {
    //             type: 'assistant',
    //             content: response,
    //             timestamp: new Date().toISOString()
    //         };
    //         chatContainer.appendChild(this.createChatMessage(aiMessage));
    //         chatContainer.scrollTop = chatContainer.scrollHeight;
    //     }, 1000);
    // }

    handleBusinessMessage() {
        const input = document.getElementById('business-input');
        const message = input.value.trim();
        if (!message) return;

        // Add user message
        const chatContainer = document.getElementById('business-chat');
        const userMessage = {
            type: 'user',
            content: message,
            timestamp: new Date().toISOString()
        };
        
        chatContainer.appendChild(this.createChatMessage(userMessage));
        input.value = '';

        // Simulate AI response
        setTimeout(() => {
            const response = this.generateBusinessResponse(message);
            const aiMessage = {
                type: 'assistant',
                content: response,
                timestamp: new Date().toISOString()
            };
            chatContainer.appendChild(this.createChatMessage(aiMessage));
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 1000);
    }

    generateLabResponse(message) {
        const context = fakeData.companyContext;
        const currentProject = fakeData.projects.find(p => p.id === this.currentProject);
        
        // Context-aware responses based on company equipment and capabilities
        const contextualResponses = [
            `**Equipment-Optimized Suggestion:**\nFor your ${context.equipment.reactors[0]}, I recommend:\n• Temperature: 125±5°C (glass-lined compatibility)\n• Nitrogen blanket using your existing N2 generation plant\n• Monitor with your HPLC every 30 minutes\n• Expected batch time: 3.5 hours for optimal conversion\n\n**Cost Analysis:**\nUsing current Patel Fine Chemicals pricing:\n• Raw materials: ₹${Math.floor(Math.random() * 50 + 30)}/kg\n• Utilities: ₹${Math.floor(Math.random() * 8 + 5)}/kg\n• Total savings: ₹${Math.floor(Math.random() * 25 + 15)}L annually`,
            
            `**Toluene-Based Chemistry Expertise:**\nGiven your specialization in toluene derivatives, consider:\n• Solvent recovery through your 96% efficient column\n• Temperature profile: Start at 110°C, ramp to 130°C\n• Your ETP can handle the aqueous waste stream\n• AlCl3 catalyst from your inventory (₹180/kg)\n\n**Safety Protocol for Gujarat Factory:**\n• Fume hood ventilation: ✓ Adequate for toluene vapors\n• Emergency protocols: SOP-CH-015 applies\n• CPCB compliance: Within existing NOC limits`,
            
            `**Scale-up to Production:**\nFrom 100L pilot to your 500L production reactor:\n• Heat transfer coefficient adjustment needed\n• Mixing time: Scale from 15 min to 35 min\n• Your steam boiler (2 ton/hr) can handle heating requirements\n• Distillation through existing fractional column\n\n**Quality Control:**\nUsing your analytical capabilities:\n• HPLC with UV/DAD: Monitor conversion\n• GC-MS: Verify impurity profile\n• IR spectrophotometer: Confirm structure\nTarget: >99.5% purity for export quality`,
            
            `**Market-Driven Optimization:**\nCurrent market conditions favor this approach:\n• Toluene prices: ₹52/L (up 15% due to crude volatility)\n• Alternative solvent costs: DCM at ₹85/L\n• Regulatory advantage: Aligns with Gujarat green chemistry initiative\n\n**Supplier Integration:**\n• Source from Deepak Nitrite Ltd. (existing contract)\n• Backup: Gujarat Alkalies for caustic wash\n• Lead time: 7 days for specialty reagents\n\n**Auto-Generated Business Update:**\nMr. Patel will see: ROI: ${Math.floor(Math.random() * 500 + 200)}%, Payback: ${Math.floor(Math.random() * 3 + 1)} months`,
            
            `**Process Integration with Existing Operations:**\nThis modification fits perfectly with your current setup:\n• Para-cresol line can share utilities\n• Benzyl alcohol process has similar temperature profile\n• Waste streams compatible with your ETP\n• Quality systems: ISO 9001:2015 certified procedures apply\n\n**Risk Mitigation:**\n• Batch size validation: Start with 50L trials\n• Equipment qualification: Glass-lined reactor suitable\n• Regulatory: Drug license covers this intermediate\n• Supply chain: 2 backup suppliers identified`,
            
            `**Digital Integration:**\nI'm automatically updating the business analysis:\n• Raw material cost impact: Calculated\n• Production capacity utilization: Optimized\n• Timeline coordination: Aligned with maintenance window\n• Regulatory documentation: Templates prepared\n\n**Equipment Utilization:**\n• Primary reactor: ${Math.floor(Math.random() * 20 + 65)}% utilization\n• Distillation column: Available during week 2\n• Analytical queue: HPLC scheduled for batch monitoring\n• Waste treatment: ETP capacity sufficient`
        ];

        // Add context about real-time sync
        const syncNote = this.currentRole === 'researcher' ? 
            '\n\n**Note:** Business analysis has been automatically updated for Mr. Patel\'s review.' : '';
        
        return contextualResponses[Math.floor(Math.random() * contextualResponses.length)] + syncNote;
    }

    switchEditorTab(tabName) {
        // Update tab appearance
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    toggleMarkdownPreview() {
        const editor = document.getElementById('protocol-editor');
        const preview = document.getElementById('protocol-preview');
        if (!editor || !preview) return;

        // If preview is hidden -> render and show; else hide
        if (preview.classList.contains('hidden')) {
            const md = editor.value || editor.placeholder || '';
            try {
                if (typeof marked !== 'undefined') {
                    preview.innerHTML = marked.parse(md);
                } else {
                    preview.innerHTML = md
                        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
                        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
                        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
                        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
                        .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
                        .replace(/`([^`]*)`/gim, '<code>$1</code>')
                        .replace(/\n/g, '<br>');
                }
            } catch (e) {
                preview.textContent = md;
            }
            editor.classList.add('hidden');
            preview.classList.remove('hidden');
        } else {
            preview.classList.add('hidden');
            editor.classList.remove('hidden');
        }
    }

    populateBusinessAnalysis() {
        this.selectBusinessProduct('portfolio_overview');
    }

    selectBusinessProduct(productId) {
        const analysisContent = document.getElementById('business-analysis-content');
        const marketContent = document.getElementById('market-research-content');
        const financialContent = document.getElementById('financial-model-content');
        const terminalOutput = document.getElementById('business-terminal-output');

        if (!analysisContent) return;

        // Business analysis content based on product
        const businessData = this.getBusinessAnalysisData(productId);
        analysisContent.innerHTML = businessData.analysis;
        
        if (marketContent) marketContent.innerHTML = businessData.market;
        if (financialContent) financialContent.innerHTML = businessData.financial;
        
        // Update terminal with relevant insights
        if (terminalOutput && businessData.terminal) {
            terminalOutput.innerHTML = businessData.terminal;
        }
    }

    getBusinessAnalysisData(productId) {
        const data = {
            portfolio_overview: {
                analysis: `
                    <div class="business-section">
                        <h3>Q4 2024 R&D Portfolio Performance</h3>
                        
                        <div class="business-highlight">
                            <h4>🎯 Key Performance Indicators</h4>
                            <div class="business-metric">
                                <span class="label">Total Pipeline Value:</span>
                                <span class="value">₹147 Lakhs</span>
                            </div>
                            <div class="business-metric">
                                <span class="label">Achieved Savings (YTD):</span>
                                <span class="value">₹44 Lakhs</span>
                            </div>
                            <div class="business-metric">
                                <span class="label">Average ROI:</span>
                                <span class="value">3,667%</span>
                            </div>
                            <div class="business-metric">
                                <span class="label">Success Rate:</span>
                                <span class="value">85%</span>
                            </div>
                        </div>

                        <h4>🔬 Python Analysis Summary</h4>
                        <p><strong>analysis.py</strong> is performing real-time optimization calculations:</p>
                        <ul>
                            <li><strong>Yield Optimization Models:</strong> Calculating optimal reaction conditions</li>
                            <li><strong>ROI Projections:</strong> Monte Carlo simulations for risk assessment</li>
                            <li><strong>Cost-Benefit Analysis:</strong> Raw material price volatility modeling</li>
                            <li><strong>Scale-up Calculations:</strong> Heat/mass transfer scaling factors</li>
                        </ul>

                        <h4>📊 Results.json Insights</h4>
                        <p><strong>Results data structure contains:</strong></p>
                        <table class="business-table">
                            <tr><th>Field</th><th>Purpose</th><th>Business Impact</th></tr>
                            <tr><td>baseline_conditions</td><td>Current process metrics</td><td>Cost calculation baseline</td></tr>
                            <tr><td>optimized_conditions</td><td>Target performance</td><td>Revenue projection basis</td></tr>
                            <tr><td>economic_impact</td><td>Financial projections</td><td>Investment decision data</td></tr>
                            <tr><td>next_steps</td><td>Implementation plan</td><td>Resource allocation guide</td></tr>
                        </table>
                    </div>
                `,
                market: `
                    <div class="business-section">
                        <h3>Market Intelligence Dashboard</h3>
                        
                        <h4>🌍 Global Specialty Chemicals Market</h4>
                        <ul>
                            <li><strong>Market Size:</strong> $150B globally, $2.3B in India</li>
                            <li><strong>Growth Rate:</strong> 12% CAGR (vs 6% for commodities)</li>
                            <li><strong>Key Drivers:</strong> Pharma growth, fragrance demand, export opportunities</li>
                        </ul>

                        <h4>🇮🇳 India Specialty Chemical Outlook</h4>
                        <div class="business-highlight">
                            <p><strong>Government Support:</strong> PLI scheme for specialty chemicals</p>
                            <p><strong>Regulatory Advantage:</strong> China+1 strategy benefits</p>
                            <p><strong>Cost Advantage:</strong> 20-30% lower than China/EU</p>
                        </div>
                    </div>
                `,
                financial: `
                    <div class="business-section">
                        <h3>Financial Performance Model</h3>
                        
                        <h4>💰 Revenue Breakdown (Annual)</h4>
                        <table class="business-table">
                            <tr><th>Product Line</th><th>Current Revenue</th><th>Optimized Potential</th><th>Uplift</th></tr>
                            <tr><td>Para-Cresol</td><td>₹2.8 Cr</td><td>₹3.2 Cr</td><td>+14%</td></tr>
                            <tr><td>Benzyl Alcohol</td><td>₹2.1 Cr</td><td>₹2.6 Cr</td><td>+24%</td></tr>
                            <tr><td>Benzyl Acetate</td><td>₹1.4 Cr</td><td>₹1.8 Cr</td><td>+28%</td></tr>
                            <tr><td>Toluene Derivatives</td><td>₹1.8 Cr</td><td>₹2.1 Cr</td><td>+17%</td></tr>
                        </table>
                    </div>
                `,
                terminal: `
                    <div class="output-line">$ Portfolio analysis complete - Processing 8 active projects</div>
                    <div class="output-line">📊 Market intelligence: Specialty chemicals growth at 12% CAGR</div>
                    <div class="output-line">💰 Financial model: ₹90L potential pipeline value</div>
                    <div class="output-line">🎯 Strategic focus: Quality differentiation over cost competition</div>
                    <div class="output-line">📈 Performance benchmark: 3,667% ROI vs industry 300-500%</div>
                `
            },
            benzyl_acetate: {
                analysis: `
                    <div class="business-section">
                        <h3>Benzyl Acetate Business Case Analysis</h3>
                        
                        <div class="business-highlight">
                            <h4>🎯 Project Overview</h4>
                            <div class="business-metric">
                                <span class="label">Current Yield:</span>
                                <span class="value">78%</span>
                            </div>
                            <div class="business-metric">
                                <span class="label">Target Yield:</span>
                                <span class="value">92% (+18%)</span>
                            </div>
                            <div class="business-metric">
                                <span class="label">Annual Revenue Impact:</span>
                                <span class="value">₹28 Lakhs</span>
                            </div>
                            <div class="business-metric">
                                <span class="label">Payback Period:</span>
                                <span class="value">1.6 months</span>
                            </div>
                        </div>

                        <h4>🔬 Python Analysis Results</h4>
                        <p><strong>BenzylAcetateAnalysis.py</strong> findings:</p>
                        <ul>
                            <li><strong>Optimal Temperature:</strong> 160°C (vs current 140°C)</li>
                            <li><strong>Catalyst Loading:</strong> 0.1 mol% p-TsOH</li>
                            <li><strong>Reaction Time:</strong> 3.5 hours (reduced from 4.5h)</li>
                            <li><strong>Purity Achievement:</strong> 99.2% (fragrance grade)</li>
                        </ul>

                        <h4>📊 Results.json Business Translation</h4>
                        <div class="business-highlight">
                            <p><strong>Market Driver:</strong> Fragrance industry demanding >99% purity</p>
                            <p><strong>Quality Premium:</strong> +25% price for fragrance grade</p>
                            <p><strong>Export Opportunity:</strong> EU fragrance houses seeking suppliers</p>
                            <p><strong>Competitive Edge:</strong> First Indian manufacturer with consistent quality</p>
                        </div>
                    </div>
                `,
                market: `
                    <div class="business-section">
                        <h3>Benzyl Acetate Market Research</h3>
                        
                        <h4>🌸 Fragrance Market Analysis</h4>
                        <ul>
                            <li><strong>Global Market:</strong> $4.2B, growing at 5.8% CAGR</li>
                            <li><strong>Indian Market:</strong> ₹8,500 Cr, growing at 8.2% CAGR</li>
                            <li><strong>Key Applications:</strong> Personal care (60%), Home care (25%), Fine fragrances (15%)</li>
                            <li><strong>Quality Requirements:</strong> >99% purity, <0.05% water content</li>
                        </ul>

                        <h4>🏭 Competitive Landscape</h4>
                        <div class="business-highlight">
                            <p><strong>Current Suppliers:</strong> Mainly Chinese and European</p>
                            <p><strong>Indian Players:</strong> Commodity grade only (95-97% purity)</p>
                            <p><strong>Opportunity:</strong> First fragrance-grade manufacturer in India</p>
                        </div>
                    </div>
                `,
                financial: `
                    <div class="business-section">
                        <h3>Benzyl Acetate Financial Model</h3>
                        
                        <h4>💰 Revenue Impact Analysis</h4>
                        <table class="business-table">
                            <tr><th>Metric</th><th>Current</th><th>Optimized</th><th>Improvement</th></tr>
                            <tr><td>Monthly Production</td><td>950 kg</td><td>1,122 kg</td><td>+18%</td></tr>
                            <tr><td>Average Price</td><td>₹450/kg</td><td>₹562/kg</td><td>+25%</td></tr>
                            <tr><td>Monthly Revenue</td><td>₹4.3L</td><td>₹6.3L</td><td>+47%</td></tr>
                            <tr><td>Annual Impact</td><td>-</td><td>₹28L</td><td>+65%</td></tr>
                        </table>

                        <h4>💸 Investment Breakdown</h4>
                        <ul>
                            <li><strong>Equipment Upgrade:</strong> ₹25,000 (Dean-Stark trap)</li>
                            <li><strong>Catalyst Cost:</strong> ₹8,000 (annual)</li>
                            <li><strong>Validation Studies:</strong> ₹12,000</li>
                            <li><strong>Total Investment:</strong> ₹45,000</li>
                        </ul>
                    </div>
                `,
                terminal: `
                    <div class="output-line">$ Benzyl acetate optimization analysis complete</div>
                    <div class="output-line">🎯 Target achieved: 92% yield, 99.2% purity (fragrance grade)</div>
                    <div class="output-line">💰 Revenue impact: ₹28L annual (+65% vs current)</div>
                    <div class="output-line">📈 Market premium: +25% for fragrance-grade quality</div>
                    <div class="output-line">🚀 Competitive advantage: First Indian fragrance-grade producer</div>
                    <div class="output-line">⏱️ Implementation timeline: 3 weeks to full production</div>
                `
            },
            toluene_recovery: {
                analysis: `
                    <div class="business-section">
                        <h3>Toluene Recovery Enhancement ROI</h3>
                        
                        <div class="business-highlight">
                            <h4>💧 Current Situation</h4>
                            <div class="business-metric">
                                <span class="label">Current Recovery:</span>
                                <span class="value">96%</span>
                            </div>
                            <div class="business-metric">
                                <span class="label">Monthly Loss:</span>
                                <span class="value">1,000L (₹52,000)</span>
                            </div>
                            <div class="business-metric">
                                <span class="label">Target Recovery:</span>
                                <span class="value">98.2%</span>
                            </div>
                            <div class="business-metric">
                                <span class="label">Annual Savings:</span>
                                <span class="value">₹18 Lakhs</span>
                            </div>
                        </div>

                        <h4>🔧 Technical Solution Analysis</h4>
                        <p><strong>Python optimization model results:</strong></p>
                        <ul>
                            <li><strong>Solution:</strong> Structured packing retrofit</li>
                            <li><strong>Efficiency Gain:</strong> +5 theoretical plates</li>
                            <li><strong>Implementation:</strong> Fits existing column shell</li>
                            <li><strong>Downtime:</strong> 3 weeks (during maintenance window)</li>
                        </ul>
                    </div>
                `,
                market: `
                    <div class="business-section">
                        <h3>Toluene Market Dynamics</h3>
                        
                        <h4>📈 Price Volatility Analysis</h4>
                        <div class="business-highlight">
                            <p><strong>Current Price:</strong> ₹52/L (up 15% YoY)</p>
                            <p><strong>Price Driver:</strong> Crude oil volatility</p>
                            <p><strong>Forecast:</strong> Continued upward pressure</p>
                        </div>

                        <h4>🏭 Strategic Importance</h4>
                        <ul>
                            <li><strong>Usage:</strong> Key solvent for all product lines</li>
                            <li><strong>Risk:</strong> Price volatility impacts margins</li>
                            <li><strong>Mitigation:</strong> Enhanced recovery reduces exposure</li>
                        </ul>
                    </div>
                `,
                financial: `
                    <div class="business-section">
                        <h3>Toluene Recovery Financial Analysis</h3>
                        
                        <h4>💰 Cost-Benefit Analysis</h4>
                        <table class="business-table">
                            <tr><th>Item</th><th>Current</th><th>Post-Upgrade</th><th>Savings</th></tr>
                            <tr><td>Monthly Toluene Loss</td><td>1,000L</td><td>450L</td><td>550L</td></tr>
                            <tr><td>Monthly Cost Impact</td><td>₹52,000</td><td>₹23,400</td><td>₹28,600</td></tr>
                            <tr><td>Annual Savings</td><td>-</td><td>-</td><td>₹18L</td></tr>
                        </table>

                        <h4>🎯 Investment Return</h4>
                        <ul>
                            <li><strong>Equipment Cost:</strong> ₹35,000</li>
                            <li><strong>Installation:</strong> ₹10,000</li>
                            <li><strong>Total Investment:</strong> ₹45,000</li>
                            <li><strong>Payback Period:</strong> 1.9 months</li>
                        </ul>
                    </div>
                `,
                terminal: `
                    <div class="output-line">$ Toluene recovery optimization analysis initiated</div>
                    <div class="output-line">📊 Current efficiency: 96% | Target: 98.2%</div>
                    <div class="output-line">💰 Savings potential: ₹18L annually</div>
                    <div class="output-line">⚡ Quick implementation: 3-week retrofit</div>
                    <div class="output-line">🎯 Strategic benefit: Reduced raw material price exposure</div>
                    <div class="output-line">✅ Risk mitigation: Price volatility protection</div>
                `
            }
        };

        return data[productId] || data.portfolio_overview;
    }

    toggleBusinessPreview() {
        const content = document.getElementById('business-analysis-content');
        const preview = document.getElementById('business-analysis-preview');
        if (!content || !preview) return;

        if (preview.classList.contains('hidden')) {
            // Generate business summary/preview
            const summaryContent = `
                <div class="business-section">
                    <h3>Executive Summary</h3>
                    <div class="business-highlight">
                        <h4>🎯 Investment Recommendation: APPROVE</h4>
                        <p><strong>Rationale:</strong> High-impact, low-risk projects with exceptional ROI</p>
                    </div>
                    
                    <h4>📊 Portfolio Metrics</h4>
                    <div class="business-metric">
                        <span class="label">Total Pipeline Value:</span>
                        <span class="value">₹147 Lakhs</span>
                    </div>
                    <div class="business-metric">
                        <span class="label">Expected ROI:</span>
                        <span class="value">3,667%</span>
                    </div>
                    
                    <h4>🚀 Next Actions</h4>
                    <ul>
                        <li>Approve benzyl acetate optimization (₹45K investment)</li>
                        <li>Fast-track toluene recovery project</li>
                        <li>Prepare export quality certification</li>
                    </ul>
                </div>
            `;
            preview.innerHTML = summaryContent;
            content.classList.add('hidden');
            preview.classList.remove('hidden');
        } else {
            preview.classList.add('hidden');
            content.classList.remove('hidden');
        }
    }

    handleQuickAction(action) {
        // Determine which terminal to use based on current view
        const isBusinessView = this.currentView === 'business-copilot';
        const terminalOutput = isBusinessView ? 
            document.getElementById('business-terminal-output') : 
            document.getElementById('terminal-output');
        
        const timestamp = new Date().toLocaleTimeString();
        
        let response = '';
        
        if (isBusinessView) {
            // Business-specific quick actions
            switch (action) {
                case 'market-analysis':
                    response = `$ [${timestamp}] Initiating market analysis...\n🔍 Searching research databases: ScienceDirect, PubMed, Chemical Abstracts\n📊 Market intelligence: Fragrance industry growth at 8.2% CAGR\n💰 Price analysis: Premium grade commands 25% higher pricing\n🌍 Export opportunities: EU regulatory compliance favorable`;
                    break;
                case 'competitor-research':
                    response = `$ [${timestamp}] Analyzing competitor landscape...\n🏭 Scanning: Aarti Industries, Deepak Nitrite, Camlin Fine Sciences\n📈 Market positioning: Cost leadership vs quality differentiation\n🔬 Patent analysis: 23 relevant patents, 3 expiring in 2025\n⚡ First-mover advantage: Fragrance-grade quality in India`;
                    break;
                case 'roi-calculation':
                    response = `$ [${timestamp}] Calculating investment returns...\n💰 Portfolio ROI: 3,667% (vs industry 300-500%)\n📊 Payback analysis: Average 1.6 months\n🎯 Risk assessment: Low technical risk, high market opportunity\n📈 Projected returns: ₹90L pipeline potential`;
                    break;
                case 'regulatory-check':
                    response = `$ [${timestamp}] Regulatory compliance scan...\n✅ CPCB NOC: Valid until 2026\n✅ FSSAI approval: Fragrance-grade chemicals certified\n✅ ISO 9001:2015: Quality management systems compliant\n⚠️ Drug license renewal: Due March 2025`;
                    break;
            }
        } else {
            // Lab-specific quick actions
            switch (action) {
                case 'analyze':
                    response = `$ [${timestamp}] Running yield analysis...\n✓ Current yield: 92% (target: >90%)\n✓ Purity: 99.2% (fragrance grade achieved)\n📊 Optimization successful - ready for production scale-up`;
                    break;
                case 'optimize':
                    response = `$ [${timestamp}] AI optimization suggestions:\n🔧 Increase temperature to 165°C for faster conversion\n⚠️ Monitor for decomposition above 165°C\n💡 Consider continuous flow for scale-up efficiency`;
                    break;
                case 'scaleup':
                    response = `$ [${timestamp}] Scale-up calculations:\n📐 100L → 500L reactor scaling\n⚖️ Materials: 5x increase (540kg benzyl alcohol)\n⏱️ Reaction time: +20% (heat transfer considerations)\n💰 Expected ROI: ₹28L annually`;
                    break;
                case 'safety':
                    response = `$ [${timestamp}] Safety compliance check:\n✅ Temperature <165°C (decomposition limit)\n✅ p-TsOH handling per SOP-CH-015\n✅ Fume hood ventilation adequate\n⚠️ Emergency shower tested and ready`;
                    break;
            }
        }

        if (terminalOutput && response) {
            // Add to terminal with AI modification effect
            const outputLine = document.createElement('div');
            outputLine.className = 'output-line';
            outputLine.innerHTML = response.replace(/\n/g, '<br>');
            terminalOutput.appendChild(outputLine);
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }

        // Simulate AI modifying the protocol based on action (lab only)
        if (!isBusinessView && action === 'optimize') {
            this.simulateAIEdit('protocol-editor', 'temperature to 160°C', 'temperature to 165°C');
        }
    }

    simulateAIEdit(editorId, oldText, newText) {
        const editor = document.getElementById(editorId);
        if (editor) {
            setTimeout(() => {
                const content = editor.value;
                const newContent = content.replace(oldText, newText);
                editor.value = newContent;
                
                // Highlight the change
                editor.style.backgroundColor = '#e6f3ff';
                setTimeout(() => {
                    editor.style.backgroundColor = '';
                }, 1000);

                // Add notification
                this.showAINotification(`AI updated: ${oldText} → ${newText}`);
            }, 500);
        }
    }

    showAINotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            font-size: 13px;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <i class="fas fa-robot" style="font-size: 14px;"></i>
                ${message}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    clearTerminal() {
        const terminalOutput = document.getElementById('terminal-output');
        if (terminalOutput) {
            terminalOutput.innerHTML = '<div class="output-line">$ Terminal cleared</div>';
        }
    }

    generateBusinessResponse(message) {
        const context = fakeData.companyContext;
        const marketData = fakeData.marketInsights;
        const autoAnalysis = fakeData.realtimeSync.autoGeneratedBusinessCases;
        
        // Business responses with research search simulation
        const businessResponses = [
            `🔍 **Searching research databases...**\n*ScienceDirect, Chemical Abstracts, MarketResearch.com*\n\n**Research Found: "Benzyl Acetate Market Dynamics in Fragrance Industry"**\n*Published: Chemical Engineering Research, 2024*\n\n**Key Findings:**\n• Global fragrance market: $4.2B, CAGR 5.8%\n• Quality premium: >99% purity commands +25% pricing\n• Supply gap: Indian manufacturers limited to 95-97% purity\n\n**Business Intelligence:**\n• **Opportunity Size:** ₹28L annual revenue potential\n• **First-Mover Advantage:** No Indian competitor at fragrance grade\n• **Export Potential:** EU regulatory compliance pathway clear\n\n*Sources: 15 research papers, 8 market reports, 3 patent analyses*`,
            
            `🔍 **Market Intelligence Search in Progress...**\n*Scanning: Bloomberg Terminal, Chemical Week, ICIS Pricing*\n\n**Best Practice Analysis: "R&D Portfolio Optimization"**\n*MIT Sloan Management Review, 2024*\n\n**Benchmark Data:**\n• Industry average R&D ROI: 300-500%\n• **Patel Fine Chemicals: 3,667% ROI** ⭐\n• Top quartile: >1000% ROI\n\n**Strategic Recommendations from Research:**\n• Focus on quality differentiation over cost competition\n• Accelerate projects with <2-month payback\n• Leverage technical expertise for export markets\n\n**Competitive Analysis:**\n*Real-time data from company filings, trade publications*\n• Aarti Industries: Capacity expansion strategy\n• Deepak Nitrite: Backward integration focus\n• **Your Edge:** Agile R&D with superior ROI`,
            
            `🔍 **Searching Patent Databases & Technical Literature...**\n*USPTO, EPO, Google Patents, ResearchGate*\n\n**Research Discovery: "Catalytic Esterification Optimization"**\n*Journal of Chemical Technology, 2024*\n\n**Technical Validation:**\n• p-TsOH catalyst: Validated in 23 peer-reviewed papers\n• Temperature optimization: 160°C confirmed optimal\n• Azeotropic distillation: 18% yield improvement achievable\n\n**Business Translation:**\n• **Scientific Confidence:** 95% success probability\n• **Patent Freedom:** No blocking patents identified\n• **Regulatory Path:** FSSAI approval process 6-8 weeks\n\n**Market Research Results:**\n*Fragrance industry reports, supplier interviews*\n• Current suppliers: 90% China/EU based\n• Indian quality gap: First to achieve fragrance grade\n• Price premium justified: Export quality commands higher margins`,
            
            `🔍 **Competitive Intelligence Scan Active...**\n*Company filings, trade journals, LinkedIn insights*\n\n**Industry Best Practices Research:**\n*"Specialty Chemical Manufacturing Excellence" - McKinsey, 2024*\n\n**Benchmarking Results:**\n• **Process Efficiency:** Top quartile performance\n• **Innovation Speed:** 3x faster than industry average\n• **ROI Performance:** Leading sector by 700%\n\n**Research-Backed Opportunities:**\n*Literature review: 150+ papers on toluene derivatives*\n• Green chemistry trends: 40% growth in eco-friendly processes\n• Export potential: India-EU chemical trade agreement benefits\n• Technology gaps: Advanced catalyst systems underutilized\n\n**Strategic Intelligence:**\n• Competitors focus on scale, you excel at quality\n• Market timing: Fragrance sector consolidation creates premium opportunities\n• Regulatory trends favor Indian suppliers (China+1 strategy)`,
            
            `🔍 **Academic Research & Market Analysis...**\n*Searching: Nature Chemistry, Chemical Engineering Science, Business databases*\n\n**Research Paper Found: "Small-Scale Chemical Innovation Impact"**\n*Harvard Business Review, 2024*\n\n**Relevant Insights:**\n• Agile R&D delivers 2-5x better ROI than large-scale programs\n• Time-to-market advantage crucial in specialty chemicals\n• Quality positioning beats cost competition long-term\n\n**Market Research Results:**\n*Primary interviews with 12 fragrance companies*\n• **Unmet Need:** Reliable Indian supplier for premium grades\n• **Willingness to Pay:** 15-30% premium for consistent quality\n• **Partnership Interest:** 8/12 companies open to trial orders\n\n**Financial Model Validation:**\n*Cross-checked against 5 similar case studies*\n• Payback period: 1.6 months (confirmed realistic)\n• Revenue scaling: 47% increase achievable in 12 months`,
            
            `🔍 **Real-Time Research & Best Practice Analysis...**\n*Live feeds: Chemical Engineering Magazine, Process Safety Progress*\n\n**Latest Research: "Digital Transformation in Chemical R&D"**\n*MIT Technology Review, September 2024*\n\n**Implementation Insights:**\n• AI-driven optimization: 40% faster development cycles\n• Digital twins: Reduce pilot plant requirements by 60%\n• Real-time monitoring: Improve yield consistency by 25%\n\n**Your Current Status vs. Best Practices:**\n✅ **Ahead:** ROI optimization (3,667% vs 500% industry)\n✅ **Ahead:** Speed to market (3 weeks vs 12 weeks industry)\n🔧 **Opportunity:** Digital monitoring integration\n🔧 **Opportunity:** Predictive maintenance systems\n\n**Research-Validated Next Steps:**\n• Scale benzyl acetate to fragrance grade production\n• Implement continuous improvement protocols\n• Develop IP portfolio for licensing opportunities`
        ];

        // Add research search behavior
        const searchBehavior = `\n\n🔍 **Continuing research scan...**\n*Monitoring: 250+ technical journals, 15 market intelligence feeds*\n*Next scan in 15 minutes for updated market conditions*`;
        
        return businessResponses[Math.floor(Math.random() * businessResponses.length)] + searchBehavior;
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ProjectCatalystApp();
});

// Enhanced demo helper functions with real-time sync simulation
window.demoFunctions = {
    showProjectDetails: (projectId) => {
        const project = fakeData.projects.find(p => p.id === projectId);
        const businessCase = fakeData.realtimeSync.autoGeneratedBusinessCases[projectId];
        
        let details = `**${project.title}**\n\nResearcher: ${project.researcher}\nStatus: ${project.status}\nPotential Savings: ${project.estimatedSavings || project.actualSavings}\nTimeline: ${project.timeline}\nSuccess Probability: ${project.successProbability}%`;
        
        if (businessCase) {
            details += `\n\n**Auto-Generated Business Analysis:**\nROI: ${businessCase.roiAnalysis}\nMarket Context: ${businessCase.marketJustification}`;
        }
        
        alert(details);
    },
    
    simulateLabToBusinessSync: () => {
        const notifications = [
            {
                title: "Lab Update: Toluene Recovery",
                message: "Dr. Priya completed distillation column analysis.<br>Business case auto-generated: ₹18L savings, 3-week payback.",
                type: "lab-to-business"
            },
            {
                title: "Lab Update: Benzyl Chloride Process",
                message: "Dr. Rajesh optimized flow reactor parameters.<br>Production scale-up feasibility confirmed.",
                type: "lab-to-business"
            },
            {
                title: "Business Alert: Market Opportunity",
                message: "Toluene prices up 15%. Urgent: Approve recovery enhancement project.<br>Potential monthly savings: ₹52,000.",
                type: "business-to-lab"
            }
        ];
        
        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
        
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${randomNotification.type === 'lab-to-business' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 320px;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <i class="fas fa-${randomNotification.type === 'lab-to-business' ? 'flask' : 'chart-line'}" style="font-size: 16px;"></i>
                <strong>${randomNotification.title}</strong>
            </div>
            <div style="font-size: 14px; line-height: 1.4;">
                ${randomNotification.message}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    },
    
    simulateBusinessApproval: () => {
        const approvals = [
            "✅ Mr. Patel approved Toluene Recovery Enhancement<br>Budget: ₹45,000 | Timeline: 3 weeks",
            "✅ Board approved Benzyl Chloride Process Intensification<br>Budget: ₹85,000 | Expected ROI: 380%",
            "⏸️ Para-Cresol Purification on hold<br>Reason: Awaiting export quality validation"
        ];
        
        const randomApproval = approvals[Math.floor(Math.random() * approvals.length)];
        const isApproved = randomApproval.includes('✅');
        
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${isApproved ? '#059669' : '#d97706'};
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 350px;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <i class="fas fa-briefcase" style="font-size: 16px;"></i>
                <strong>Business Decision</strong>
            </div>
            <div style="font-size: 14px; line-height: 1.4;">
                ${randomApproval}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    },
    
    showCompanyContext: () => {
        const context = fakeData.companyContext;
        alert(`**${context.name}**\nLocation: ${context.location}\nSpecialization: ${context.specialization}\n\nCurrent Products:\n${context.currentProducts.slice(0, 3).join('\n')}\n\nKey Equipment:\n${context.equipment.reactors.join('\n')}`);
    },
    
    simulateMarketAlert: () => {
        const alerts = [
            "🚨 Toluene prices surged 8% overnight due to refinery shutdown in Mumbai",
            "📈 Benzyl chloride demand up 30% - major pharma company signed exclusive contract",
            "⚖️ New Gujarat ETP regulations effective next month - compliance check needed",
            "🏭 Aarti Industries announced capacity expansion - competitive pressure increasing"
        ];
        
        const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
        
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: #dc2626;
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 320px;
        `;
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 16px;"></i>
                <strong>Market Alert</strong>
            </div>
            <div style="font-size: 14px; line-height: 1.4;">
                ${randomAlert}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 6000);
    },
    
    toggleDemoMode: () => {
        document.body.classList.toggle('demo-mode');
        console.log('🎯 Demo mode toggled!\n\nTry these commands:\n• demoFunctions.simulateLabToBusinessSync()\n• demoFunctions.simulateBusinessApproval()\n• demoFunctions.simulateMarketAlert()\n• demoFunctions.showCompanyContext()');
    }
};

// Add CSS for enhanced demo animations
const demoStyles = document.createElement('style');
demoStyles.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .demo-mode .project-card {
        border: 2px dashed #3b82f6 !important;
        cursor: pointer !important;
        transition: all 0.3s ease !important;
    }
    
    .demo-mode .project-card:hover {
        transform: scale(1.02) !important;
        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.15) !important;
    }
    
    .demo-mode .nav-tab {
        position: relative;
    }
    
    .demo-mode .nav-tab::after {
        content: '●';
        position: absolute;
        top: -2px;
        right: -2px;
        width: 8px;
        height: 8px;
        background: #ef4444;
        border-radius: 50%;
        font-size: 8px;
        animation: pulse 2s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.1); }
    }
    
    .sync-indicator {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(16, 185, 129, 0.9);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 12px;
        font-weight: 500;
        z-index: 999;
        animation: fadeInOut 3s ease-in-out infinite;
    }
    
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translateY(10px); }
        50% { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(demoStyles);

// Add real-time sync indicator
const syncIndicator = document.createElement('div');
syncIndicator.className = 'sync-indicator';
syncIndicator.innerHTML = '<i class="fas fa-sync-alt"></i> Live Sync Active';
document.body.appendChild(syncIndicator);

// Synthesis Research Demo Handler
document.addEventListener('DOMContentLoaded', () => {
    const demoBtn = document.getElementById('synthesis-demo-btn');
    if (demoBtn) {
        demoBtn.addEventListener('click', startSynthesisDemo);
    }
});

function startSynthesisDemo() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'research-overlay';
    overlay.innerHTML = `
        <div class="research-container">
            <div class="research-header">
                <h3>
                    <i class="fas fa-robot"></i>
                    AI Research Assistant
                </h3>
                <button class="research-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="research-content">
                <div class="research-query">
                    <h4>RESEARCH QUERY</h4>
                    <p>How do I synthesize nitrotoluene from commonly available substances? What is the most common laboratory-scale procedure?</p>
                </div>
                <div class="thinking-steps" id="thinking-steps"></div>
                <div id="research-result"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Close handler
    const closeBtn = overlay.querySelector('.research-close');
    closeBtn.addEventListener('click', () => {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => overlay.remove(), 300);
    });
    
    // Start animated research
    animateResearchSteps();
}

function animateResearchSteps() {
    const steps = [
        {
            title: 'Analyzing Query & Context',
            details: 'Understanding the request: Nitrotoluene synthesis using basic chemistry principles for lab-scale production.',
            delay: 800
        },
        {
            title: 'Searching Chemical Databases',
            details: `Accessing knowledge bases:
                <ul>
                    <li>PubChem (pubchem.ncbi.nlm.nih.gov) - Compound properties & reactions</li>
                    <li>Organic Syntheses (orgsyn.org) - Peer-reviewed procedures</li>
                    <li>Chemical patents database - Industrial methods</li>
                </ul>`,
            delay: 1500
        },
        {
            title: 'Identifying Common Route',
            details: 'Found: <strong>Direct nitration of toluene</strong> with mixed acid (HNO₃/H₂SO₄). Used in >90% of global production. Most economical and scalable method.',
            delay: 1200
        },
        {
            title: 'Retrieving Lab Procedures',
            details: `Analyzing verified protocols:
                <ul>
                    <li>Sciencemadness.org - Community-verified bench-scale methods</li>
                    <li>Educational lab manuals - Micro-scale safety protocols</li>
                    <li>Academic literature - Yield optimization data</li>
                </ul>`,
            delay: 1500
        },
        {
            title: 'Validating Safety & Feasibility',
            details: 'Checking hazards: Nitration requires fume hood, temperature control <30°C during addition. Equipment: Basic glassware sufficient. Suitable for Indian SME labs.',
            delay: 1000
        },
        {
            title: 'Synthesizing Complete Answer',
            details: 'Compiling: Step-by-step procedure, reagent specifications, safety protocols, yield expectations, and scale-up considerations.',
            delay: 1200
        }
    ];
    
    const stepsContainer = document.getElementById('thinking-steps');
    let currentDelay = 500;
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            const stepElement = document.createElement('div');
            stepElement.className = 'thinking-step active';
            stepElement.innerHTML = `
                <div class="step-header">
                    <div class="step-icon active">
                        <i class="fas fa-circle-notch fa-spin"></i>
                    </div>
                    <div class="step-title">${step.title}</div>
                </div>
                <div class="step-details">${step.details}</div>
            `;
            stepsContainer.appendChild(stepElement);
            
            // Mark as completed after delay
            setTimeout(() => {
                stepElement.classList.remove('active');
                stepElement.classList.add('completed');
                const icon = stepElement.querySelector('.step-icon');
                icon.classList.remove('active');
                icon.classList.add('completed');
                icon.innerHTML = '<i class="fas fa-check"></i>';
                
                // Show final result after last step
                if (index === steps.length - 1) {
                    setTimeout(() => showFinalResult(), 500);
                }
            }, step.delay);
            
        }, currentDelay);
        
        currentDelay += step.delay;
    });
}

function showFinalResult() {
    const resultContainer = document.getElementById('research-result');
    resultContainer.innerHTML = `
        <div class="result-header">
            <i class="fas fa-check-circle"></i>
            <h4>Research Complete - Synthesis Procedure Generated</h4>
        </div>
        <div class="result-content">
            <h5><i class="fas fa-flask"></i> Nitrotoluene Synthesis: Lab-Scale Protocol</h5>
            <p><strong>Method:</strong> Direct nitration of toluene with mixed acid (HNO₃/H₂SO₄)</p>
            
            <div class="procedure-section">
                <h6>📋 Materials Required</h6>
                <ul>
                    <li>Toluene: 50 g (57.5 mL, 0.54 mol)</li>
                    <li>Concentrated H₂SO₄ (98%): 75 g (40.2 mL)</li>
                    <li>Concentrated HNO₃ (70%): 75 g (50.4 mL)</li>
                    <li>5% Na₂CO₃ solution: 50 mL (for washing)</li>
                    <li>CaCl₂: ~5 g (drying agent)</li>
                </ul>
            </div>
            
            <div class="procedure-section">
                <h6>🔬 Step-by-Step Procedure</h6>
                <ol>
                    <li><strong>Setup:</strong> Use 250 mL round-bottom flask with magnetic stirrer and ice bath</li>
                    <li><strong>Prepare Nitrating Mix:</strong> Cool HNO₃ + H₂SO₄ mixture to <10°C in ice bath</li>
                    <li><strong>Nitration:</strong> Add acid mix dropwise to toluene over 30-60 min, keeping temp <30°C</li>
                    <li><strong>Reaction:</strong> Stir at 30-45°C for 2 hours (color shifts yellow-orange)</li>
                    <li><strong>Workup:</strong> Pour into separatory funnel, separate organic layer</li>
                    <li><strong>Wash:</strong> Wash with water, then 5% Na₂CO₃ solution, then water again</li>
                    <li><strong>Dry:</strong> Dry over CaCl₂ for 30 minutes, filter</li>
                    <li><strong>Purify:</strong> Optional - Freeze at -20°C to crystallize para-isomer</li>
                </ol>
            </div>
            
            <div class="procedure-section">
                <h6>⚗️ Expected Results</h6>
                <ul>
                    <li><strong>Yield:</strong> 70-80% crude mixture (ortho + para isomers)</li>
                    <li><strong>Isomer Ratio:</strong> ~60% ortho-nitrotoluene, 40% para-nitrotoluene</li>
                    <li><strong>Time:</strong> 3-4 hours total</li>
                    <li><strong>Appearance:</strong> Pale yellow oil</li>
                </ul>
            </div>
            
            <div class="procedure-section">
                <h6>⚠️ Safety Notes</h6>
                <ul>
                    <li>Use fume hood - NOx fumes are toxic and corrosive</li>
                    <li>Monitor temperature carefully - exothermic reaction</li>
                    <li>Wear appropriate PPE: gloves, goggles, lab coat</li>
                    <li>Have neutralizing agent ready (NaHCO₃) for spills</li>
                    <li>Dispose of waste acids per CPCB guidelines</li>
                </ul>
            </div>
            
            <p style="margin-top: 16px; padding: 12px; background: #eff6ff; border-radius: 6px; border-left: 3px solid #3b82f6;">
                <strong>💡 Scale-Up Note:</strong> For manufacturing scale (100L+), use continuous stirred-tank reactors with acid recycling and fractional distillation for isomer separation. Expected industrial yield: 90-95%.
            </p>
            
            <p style="font-size: 12px; color: #6b7280; margin-top: 12px;">
                <strong>Sources consulted:</strong> PubChem, Organic Syntheses, Sciencemadness forums, Chemical patents database, Indian CPCB safety guidelines
            </p>
        </div>
    `;
}

// Add fadeOut animation
const fadeOutStyle = document.createElement('style');
fadeOutStyle.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(fadeOutStyle);
