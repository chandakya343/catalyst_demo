// Proposal Copilot - AI-Powered Project Proposal Generation
// Context-aware project suggestions for Indian SMEs

document.addEventListener('DOMContentLoaded', () => {
    initializeProposalCopilot();
});

function initializeProposalCopilot() {
    const proposalArea = document.getElementById('proposal-editor-area');
    if (!proposalArea) return;
    
    // Generate project opportunities
    proposalArea.innerHTML = generateProjectOpportunities();
    
    // Initialize chat with realistic project conversation
    const proposalChat = document.getElementById('proposal-chat');
    if (proposalChat) {
        proposalChat.innerHTML = '';
        
        // User question
        const userMessage = {
            type: 'user',
            content: 'What new products should we develop? I want something that uses our existing equipment and has good market potential.',
            timestamp: new Date(Date.now() - 30000).toISOString() // 30 seconds ago
        };
        
        const userDiv = document.createElement('div');
        userDiv.className = 'chat-message user';
        const userTime = new Date(userMessage.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        userDiv.innerHTML = `
            <div class="message-content">${userMessage.content}</div>
            <div class="message-time">${userTime}</div>
        `;
        proposalChat.appendChild(userDiv);
        
        // AI response
        const aiMessage = {
            type: 'assistant',
            content: 'Based on your current capabilities and market analysis, I recommend **3 high-potential projects**:\n\n**1. Nitrotoluene Synthesis** (Highest ROI)\n• Uses existing 250L reactor\n• ₹2.4L annual revenue potential\n• 1,500% ROI in first year\n\n**2. Benzyl Acetate Yield Enhancement** (Quick Win)\n• Process optimization only\n• ₹28L additional annual revenue\n• 6,200% ROI\n\n**3. Toluene Recovery Enhancement** (Cost Savings)\n• Equipment retrofit\n• ₹18L annual savings\n• 4,000% ROI\n\n**My Recommendation:** Start with **Benzyl Acetate optimization** - it\'s the fastest to implement with immediate returns, then move to **Nitrotoluene** for new revenue streams.\n\nWould you like me to generate detailed proposals for any of these projects?',
            timestamp: new Date().toISOString()
        };
        
        const aiDiv = document.createElement('div');
        aiDiv.className = 'chat-message assistant';
        const aiTime = new Date(aiMessage.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
        aiDiv.innerHTML = `
            <div class="message-content">${aiMessage.content.replace(/\n/g, '<br>')}</div>
            <div class="message-time">${aiTime}</div>
        `;
        proposalChat.appendChild(aiDiv);
    }
    
    // Generate proposal button handler
    const generateBtn = document.getElementById('generate-proposal-btn');
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            showProposalGenerationOverlay();
        });
    }
}

function generateProjectOpportunities() {
    return `
        <div class="proposal-section">
            <h1>AI-Generated Project Opportunities</h1>
            
            <p><strong>Analysis Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Business Context:</strong> Based on current capabilities, equipment inventory, and market analysis</p>
            <p><strong>Focus:</strong> High-ROI projects using existing infrastructure</p>
        </div>

        <div class="opportunity-card">
            <h4><i class="fas fa-star"></i> 1. Nitrotoluene Synthesis (NEW PRODUCT)</h4>
            <p><strong>Project Type:</strong> New Product Development</p>
            <p><strong>Description:</strong> Manufacture nitrotoluene from toluene using mixed acid nitration. This positions you as a complete toluene derivatives supplier to pharmaceutical companies.</p>
            
            <div class="opportunity-metrics">
                <div class="opportunity-metric">
                    <span class="metric-value">₹2.4L</span>
                    <span class="metric-label">Annual Revenue</span>
                </div>
                <div class="opportunity-metric">
                    <span class="metric-value">1,500%</span>
                    <span class="metric-label">ROI</span>
                </div>
                <div class="opportunity-metric">
                    <span class="metric-value">2.5 months</span>
                    <span class="metric-label">Payback</span>
                </div>
                <div class="opportunity-metric">
                    <span class="metric-value">₹15,000</span>
                    <span class="metric-label">Investment</span>
                </div>
            </div>
            
            <div style="margin-top: 16px;">
                <strong>Equipment Status:</strong> ✅ All required equipment available<br>
                <strong>Market:</strong> Pharmaceutical intermediates, growing demand<br>
                <strong>Competitive Advantage:</strong> Complete toluene chemistry suite<br>
                <strong>Risk Level:</strong> 🟡 Medium (safety training required)
            </div>
        </div>

        <div class="opportunity-card">
            <h4><i class="fas fa-chart-line"></i> 2. Benzyl Acetate Yield Enhancement (OPTIMIZATION)</h4>
            <p><strong>Project Type:</strong> Process Optimization</p>
            <p><strong>Description:</strong> Improve yield from 78% to 92% using Dean-Stark trap and p-TsOH catalyst. This qualifies for fragrance-grade pricing (+25% premium).</p>
            
            <div class="opportunity-metrics">
                <div class="opportunity-metric">
                    <span class="metric-value">₹28L</span>
                    <span class="metric-label">Additional Revenue</span>
                </div>
                <div class="opportunity-metric">
                    <span class="metric-value">6,200%</span>
                    <span class="metric-label">ROI</span>
                </div>
                <div class="opportunity-metric">
                    <span class="metric-value">1.6 months</span>
                    <span class="metric-label">Payback</span>
                </div>
                <div class="opportunity-metric">
                    <span class="metric-value">₹45,000</span>
                    <span class="metric-label">Investment</span>
                </div>
            </div>
            
            <div style="margin-top: 16px;">
                <strong>Equipment Status:</strong> ⚠️ Need Dean-Stark trap (₹25,000)<br>
                <strong>Market:</strong> Existing product, premium pricing opportunity<br>
                <strong>Competitive Advantage:</strong> Higher quality, fragrance-grade product<br>
                <strong>Risk Level:</strong> 🟢 Low (proven technology)
            </div>
        </div>

        <div class="opportunity-card">
            <h4><i class="fas fa-recycle"></i> 3. Toluene Recovery Enhancement (EFFICIENCY)</h4>
            <p><strong>Project Type:</strong> Process Efficiency</p>
            <p><strong>Description:</strong> Improve toluene recovery from 96% to 98.2% using structured packing in distillation column. Direct cost savings with minimal investment.</p>
            
            <div class="opportunity-metrics">
                <div class="opportunity-metric">
                    <span class="metric-value">₹18L</span>
                    <span class="metric-label">Annual Savings</span>
                </div>
                <div class="opportunity-metric">
                    <span class="metric-value">4,000%</span>
                    <span class="metric-label">ROI</span>
                </div>
                <div class="opportunity-metric">
                    <span class="metric-value">1.9 months</span>
                    <span class="metric-label">Payback</span>
                </div>
                <div class="opportunity-metric">
                    <span class="metric-value">₹45,000</span>
                    <span class="metric-label">Investment</span>
                </div>
            </div>
            
            <div style="margin-top: 16px;">
                <strong>Equipment Status:</strong> ⚠️ Need structured packing retrofit<br>
                <strong>Market:</strong> Internal efficiency, cost reduction<br>
                <strong>Competitive Advantage:</strong> Lower production costs<br>
                <strong>Risk Level:</strong> 🟢 Low (equipment modification)
            </div>
        </div>

        <div class="opportunity-card">
            <h4><i class="fas fa-seedling"></i> 4. Agrochemical Intermediates (STRATEGIC EXPANSION)</h4>
            <p><strong>Project Type:</strong> Market Expansion</p>
            <p><strong>Description:</strong> Develop 2,4-Dichlorophenoxyacetic acid (2,4-D) intermediate using your toluene chemistry expertise. Tap into India's growing agrochemical sector.</p>
            
            <div class="opportunity-metrics">
                <div class="opportunity-metric">
                    <span class="metric-value">₹45L</span>
                    <span class="metric-label">Annual Revenue</span>
                </div>
                <div class="opportunity-metric">
                    <span class="metric-value">180%</span>
                    <span class="metric-label">ROI</span>
                </div>
                <div class="opportunity-metric">
                    <span class="metric-value">18 months</span>
                    <span class="metric-label">Payback</span>
                </div>
                <div class="opportunity-metric">
                    <span class="metric-value">₹25L</span>
                    <span class="metric-label">Investment</span>
                </div>
            </div>
            
            <div style="margin-top: 16px;">
                <strong>Equipment Status:</strong> ⚠️ Need chlorination reactor (₹15L)<br>
                <strong>Market:</strong> Agrochemical sector, 15% CAGR<br>
                <strong>Competitive Advantage:</strong> First-mover in regional market<br>
                <strong>Risk Level:</strong> 🟡 Medium (new market, higher investment)
            </div>
        </div>

        <div class="proposal-section">
            <h2><i class="fas fa-lightbulb"></i> AI Recommendations</h2>
            
            <h3>Immediate Actions (Next 30 Days)</h3>
            <ol>
                <li><strong>Approve Benzyl Acetate optimization</strong> - Quickest ROI, lowest risk</li>
                <li><strong>Start Nitrotoluene project</strong> - Highest revenue potential</li>
                <li><strong>Plan Toluene recovery upgrade</strong> - Schedule during maintenance</li>
                <li><strong>Research agrochemical market</strong> - Long-term strategic option</li>
            </ol>
            
            <h3>Implementation Priority</h3>
            <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
                <p><strong>Phase 1 (Month 1-2):</strong> Benzyl Acetate optimization + Nitrotoluene pilot</p>
                <p><strong>Phase 2 (Month 3-4):</strong> Toluene recovery upgrade + Nitrotoluene scale-up</p>
                <p><strong>Phase 3 (Month 6+):</strong> Agrochemical intermediates development</p>
            </div>
            
            <h3>Expected Combined Impact</h3>
            <ul>
                <li><strong>Total Investment:</strong> ₹85,000 (first 3 projects)</li>
                <li><strong>Total Annual Revenue/Savings:</strong> ₹48.4 Lakhs</li>
                <li><strong>Combined ROI:</strong> 5,700%</li>
                <li><strong>Payback Period:</strong> 2.1 months</li>
            </ul>
        </div>

        <div class="proposal-section">
            <h2><i class="fas fa-cogs"></i> Equipment Utilization Analysis</h2>
            
            <h3>Current Equipment Utilization</h3>
            <ul>
                <li><strong>250L Reactor:</strong> 60% utilization - can handle additional projects</li>
                <li><strong>Distillation Column:</strong> 45% utilization - available for optimization</li>
                <li><strong>Fume Hood:</strong> 70% utilization - sufficient for new projects</li>
                <li><strong>HPLC:</strong> 40% utilization - can support quality control</li>
            </ul>
            
            <h3>Equipment Requirements for New Projects</h3>
            <ul>
                <li><strong>Nitrotoluene:</strong> Addition funnel (₹3,500) - one-time purchase</li>
                <li><strong>Benzyl Acetate:</strong> Dean-Stark trap (₹25,000) - one-time purchase</li>
                <li><strong>Toluene Recovery:</strong> Structured packing (₹35,000) - retrofit</li>
                <li><strong>Agrochemical:</strong> Chlorination reactor (₹15L) - major investment</li>
            </ul>
        </div>

        <div class="proposal-section">
            <h2><i class="fas fa-users"></i> Market Analysis</h2>
            
            <h3>Target Markets</h3>
            <ul>
                <li><strong>Pharmaceutical:</strong> Existing customer base, growing 12% annually</li>
                <li><strong>Fragrance:</strong> Premium pricing opportunity, stable demand</li>
                <li><strong>Agrochemical:</strong> Government support, 15% CAGR</li>
                <li><strong>Export:</strong> China+1 strategy benefits Indian manufacturers</li>
            </ul>
            
            <h3>Competitive Landscape</h3>
            <ul>
                <li><strong>Large Chemical Companies:</strong> Higher overhead, less flexible</li>
                <li><strong>Regional Competitors:</strong> Limited technical capabilities</li>
                <li><strong>Your Advantage:</strong> Complete toluene chemistry suite, existing relationships</li>
            </ul>
        </div>

        <div class="proposal-section" style="border-top: 2px solid #e5e7eb; padding-top: 24px; margin-top: 32px;">
            <p style="font-size: 13px; color: #6b7280; line-height: 1.6;">
                <strong>Project Opportunities generated by AI Project Advisor</strong><br>
                Based on: Current business portfolio, equipment inventory, market analysis, financial projections<br>
                Last updated: ${new Date().toLocaleDateString()}<br>
                <em>These recommendations are tailored to your specific business context and capabilities.</em>
            </p>
        </div>
    `;
}

function showProposalGenerationOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'research-overlay';
    overlay.innerHTML = `
        <div class="research-container">
            <div class="research-header">
                <h3><i class="fas fa-robot"></i> AI Analyzing Project Opportunities</h3>
                <button class="research-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="research-content">
                <div class="research-query">
                    <h4>PROJECT ANALYSIS QUERY</h4>
                    <p>Generate personalized project opportunities based on current business capabilities, equipment inventory, and market analysis</p>
                </div>
                <div class="thinking-steps" id="thinking-steps"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    overlay.querySelector('.research-close').addEventListener('click', () => {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => overlay.remove(), 300);
    });
    
    animateProposalResearchSteps();
}

function animateProposalResearchSteps() {
    const steps = [
        { title: 'Analyzing Current Business Portfolio', details: 'Reviewing existing products, production capacity, and customer relationships to identify expansion opportunities.', delay: 1000 },
        { title: 'Evaluating Equipment Capabilities', details: 'Assessing current equipment utilization and identifying underutilized assets for new projects.', delay: 1200 },
        { title: 'Market Opportunity Analysis', details: 'Scanning pharmaceutical, fragrance, and agrochemical markets for high-potential opportunities.', delay: 1500 },
        { title: 'Financial Impact Modeling', details: 'Calculating ROI, payback periods, and revenue projections for each opportunity.', delay: 1200 },
        { title: 'Risk Assessment & Prioritization', details: 'Evaluating technical, market, and financial risks to rank opportunities.', delay: 1000 },
        { title: 'Strategic Recommendations', details: 'Generating prioritized project recommendations with implementation timelines.', delay: 1200 }
    ];
    
    const stepsContainer = document.getElementById('thinking-steps');
    let currentDelay = 500;
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            const stepEl = document.createElement('div');
            stepEl.className = 'thinking-step active';
            stepEl.innerHTML = `
                <div class="step-header">
                    <div class="step-icon active"><i class="fas fa-circle-notch fa-spin"></i></div>
                    <div class="step-title">${step.title}</div>
                </div>
                <div class="step-details">${step.details}</div>
            `;
            stepsContainer.appendChild(stepEl);
            
            setTimeout(() => {
                stepEl.classList.remove('active');
                stepEl.classList.add('completed');
                stepEl.querySelector('.step-icon').className = 'step-icon completed';
                stepEl.querySelector('.step-icon').innerHTML = '<i class="fas fa-check"></i>';
                
                if (index === steps.length - 1) {
                    setTimeout(() => {
                        document.querySelector('.research-overlay').style.animation = 'fadeOut 0.3s ease';
                        setTimeout(() => {
                            document.querySelector('.research-overlay').remove();
                            initializeProposalCopilot();
                        }, 300);
                    }, 800);
                }
            }, step.delay);
        }, currentDelay);
        
        currentDelay += step.delay;
    });
}
