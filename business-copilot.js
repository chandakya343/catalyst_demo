// Business Copilot - Real Business Analysis for Indian SMEs
// Context-aware business intelligence for chemical manufacturing

document.addEventListener('DOMContentLoaded', () => {
    initializeBusinessCopilot();
});

function initializeBusinessCopilot() {
    const businessArea = document.getElementById('business-editor-area');
    if (!businessArea) return;
    
    // Generate nitrotoluene business analysis
    businessArea.innerHTML = generateNitrotolueneBusinessAnalysis();
    
    // Initialize chat with realistic business conversation
    const businessChat = document.getElementById('business-chat');
    if (businessChat) {
        businessChat.innerHTML = '';
        
        // User question
        const userMessage = {
            type: 'user',
            content: 'How complicated is this nitrotoluene project? Do we need any new equipment?',
            timestamp: new Date(Date.now() - 45000).toISOString() // 45 seconds ago
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
        businessChat.appendChild(userDiv);
        
        // AI response
        const aiMessage = {
            type: 'assistant',
            content: 'Based on the business analysis, this nitrotoluene project is **MEDIUM complexity** with **LOW equipment requirements**.\n\n**Equipment Status:**\n✅ All required equipment already available in your facility\n✅ No new equipment purchases needed\n✅ Uses existing 250L reactor and distillation setup\n\n**Complexity Factors:**\n• **Technical:** Medium (requires careful temperature control)\n• **Safety:** High (fume hood mandatory, acid handling)\n• **Timeline:** 2-3 weeks for first batch\n• **Training:** Lab team needs nitration safety training\n\n**Business Impact:**\n• **Investment:** ₹15,000 (materials only)\n• **Revenue Potential:** ₹2.4L annually (new product line)\n• **ROI:** 1,500% in first year\n\nWould you like me to break down the cost analysis or discuss market opportunities for nitrotoluene?',
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
        businessChat.appendChild(aiDiv);
    }
    
    // Regenerate button handler
    const regenerateBtn = document.getElementById('regenerate-business-btn');
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', () => {
            showBusinessResearchOverlay();
        });
    }
    
    // Project selector handler
    const projectSelector = document.getElementById('business-project-selector');
    if (projectSelector) {
        projectSelector.addEventListener('change', (e) => {
            loadBusinessProject(e.target.value);
        });
    }
}

function generateNitrotolueneBusinessAnalysis() {
    return `
        <div class="business-section">
            <h1>Nitrotoluene Synthesis: Business Analysis & Feasibility Report</h1>
            
            <p><strong>Project Type:</strong> New Product Development</p>
            <p><strong>Business Impact:</strong> Medium-term revenue opportunity</p>
            <p><strong>Investment Level:</strong> Low (materials only)</p>
            <p><strong>Timeline:</strong> 2-3 weeks to first production batch</p>
        </div>

        <div class="impact-card">
            <h4><i class="fas fa-chart-line"></i> Business Impact Summary</h4>
            <div class="metric">
                <span class="metric-label">Annual Revenue Potential</span>
                <span class="metric-value">₹2.4 Lakhs</span>
            </div>
            <div class="metric">
                <span class="metric-label">Initial Investment Required</span>
                <span class="metric-value">₹15,000</span>
            </div>
            <div class="metric">
                <span class="metric-label">ROI (First Year)</span>
                <span class="metric-value">1,500%</span>
            </div>
            <div class="metric">
                <span class="metric-label">Payback Period</span>
                <span class="metric-value">2.5 months</span>
            </div>
            <div class="metric">
                <span class="metric-label">Monthly Production Capacity</span>
                <span class="metric-value">200 kg</span>
            </div>
        </div>

        <div class="business-section">
            <h2><i class="fas fa-industry"></i> Current Business Context</h2>
            
            <h3>Existing Product Portfolio</h3>
            <p>Your current specialty chemical portfolio includes toluene-based derivatives. Nitrotoluene would complement this perfectly:</p>
            <ul>
                <li><strong>Para-Cresol (2,500 kg/month):</strong> Uses toluene as starting material - same supply chain</li>
                <li><strong>Benzyl Alcohol (1,800 kg/month):</strong> Similar market segment (pharmaceutical intermediates)</li>
                <li><strong>Toluene Diamine (1,200 kg/month):</strong> Related aromatic amine chemistry</li>
                <li><strong>Benzyl Chloride (3,000 kg/month):</strong> Same customer base (pharma companies)</li>
            </ul>
            
            <h3>Market Position</h3>
            <p>Adding nitrotoluene to your portfolio creates a <strong>complete toluene derivative suite</strong>, making you a one-stop supplier for pharmaceutical companies. This is a significant competitive advantage.</p>
        </div>

        <div class="equipment-analysis">
            <h4><i class="fas fa-cogs"></i> Equipment Analysis</h4>
            <div class="equipment-item">
                <span class="equipment-name">250L Round-bottom Reactor</span>
                <span class="equipment-status available">Available</span>
            </div>
            <div class="equipment-item">
                <span class="equipment-name">Magnetic Stirrer/Hotplate</span>
                <span class="equipment-status available">Available</span>
            </div>
            <div class="equipment-item">
                <span class="equipment-name">Fume Hood System</span>
                <span class="equipment-status available">Available</span>
            </div>
            <div class="equipment-item">
                <span class="equipment-name">Separatory Funnel (250L)</span>
                <span class="equipment-status available">Available</span>
            </div>
            <div class="equipment-item">
                <span class="equipment-name">Addition Funnel</span>
                <span class="equipment-status needed">Need to Purchase</span>
            </div>
            <div class="equipment-item">
                <span class="equipment-name">Ice Bath Container</span>
                <span class="equipment-status available">Available</span>
            </div>
            <div class="equipment-item">
                <span class="equipment-name">Distillation Column</span>
                <span class="equipment-status available">Available</span>
            </div>
            <div class="equipment-item">
                <span class="equipment-name">HPLC for Quality Control</span>
                <span class="equipment-status available">Available</span>
            </div>
        </div>

        <div class="business-section">
            <h2><i class="fas fa-rupee-sign"></i> Financial Analysis</h2>
            
            <div class="cost-breakdown">
                <h4><i class="fas fa-calculator"></i> Investment Breakdown</h4>
                <div class="cost-item">
                    <span>Raw Materials (First Batch)</span>
                    <span>₹8,500</span>
                </div>
                <div class="cost-item">
                    <span>Equipment (Addition Funnel)</span>
                    <span>₹3,500</span>
                </div>
                <div class="cost-item">
                    <span>Safety Equipment Upgrade</span>
                    <span>₹2,000</span>
                </div>
                <div class="cost-item">
                    <span>Training & Documentation</span>
                    <span>₹1,000</span>
                </div>
                <div class="cost-item total">
                    <span>Total Initial Investment</span>
                    <span>₹15,000</span>
                </div>
            </div>

            <h3>Revenue Projections</h3>
            <div class="impact-card">
                <h4><i class="fas fa-chart-bar"></i> Monthly Revenue Analysis</h4>
                <div class="metric">
                    <span class="metric-label">Production Capacity</span>
                    <span class="metric-value">200 kg/month</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Market Price (Nitrotoluene)</span>
                    <span class="metric-value">₹1,200/kg</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Production Cost</span>
                    <span class="metric-value">₹800/kg</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Gross Margin</span>
                    <span class="metric-value">33%</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Monthly Revenue</span>
                    <span class="metric-value">₹2.4 Lakhs</span>
                </div>
                <div class="metric">
                    <span class="metric-label">Monthly Profit</span>
                    <span class="metric-value">₹80,000</span>
                </div>
            </div>
        </div>

        <div class="business-section">
            <h2><i class="fas fa-users"></i> Market Analysis</h2>
            
            <h3>Target Customers</h3>
            <ul>
                <li><strong>Pharmaceutical Companies:</strong> Nitrotoluene is a key intermediate for drug synthesis</li>
                <li><strong>Dye Manufacturers:</strong> Used in azo dye production</li>
                <li><strong>Agrochemical Companies:</strong> Intermediate for pesticide synthesis</li>
                <li><strong>Export Market:</strong> EU and US companies seeking reliable Indian suppliers</li>
            </ul>
            
            <h3>Competitive Advantage</h3>
            <p>Your existing customer relationships in the pharmaceutical sector give you immediate market access. Most competitors are large chemical companies with higher overhead costs.</p>
            
            <h3>Market Size & Growth</h3>
            <ul>
                <li><strong>Indian Market:</strong> ₹45 Cr annually, growing at 8% CAGR</li>
                <li><strong>Your Addressable Market:</strong> ₹2-3 Cr (regional pharmaceutical companies)</li>
                <li><strong>Export Potential:</strong> ₹5-8 Cr (EU/US markets)</li>
            </ul>
        </div>

        <div class="business-section">
            <h2><i class="fas fa-truck"></i> Supply Chain Integration</h2>
            
            <h3>Raw Material Sourcing</h3>
            <p><strong>Good News:</strong> All raw materials are already in your supply chain:</p>
            <ul>
                <li><strong>Toluene:</strong> Already purchasing 25,000L/month from Deepak Nitrite</li>
                <li><strong>Concentrated H₂SO₄:</strong> Available from Gujarat Alkalies (existing supplier)</li>
                <li><strong>Concentrated HNO₃:</strong> Can source from same supplier as current acids</li>
                <li><strong>No new supplier relationships needed</strong></li>
            </ul>
            
            <h3>Production Integration</h3>
            <p>Nitrotoluene production can be scheduled during downtime between your current product batches. No disruption to existing operations.</p>
        </div>

        <div class="risk-assessment">
            <h4><i class="fas fa-exclamation-triangle"></i> Risk Assessment</h4>
            <div class="risk-item">
                <span class="risk-level medium">MEDIUM</span>
                <span class="risk-description">Safety risks during nitration - requires proper training and fume hood operation</span>
            </div>
            <div class="risk-item">
                <span class="risk-level low">LOW</span>
                <span class="risk-description">Market risk - existing customer base and established demand</span>
            </div>
            <div class="risk-item">
                <span class="risk-level low">LOW</span>
                <span class="risk-description">Technical risk - well-established chemistry with proven procedures</span>
            </div>
            <div class="risk-item">
                <span class="risk-level medium">MEDIUM</span>
                <span class="risk-description">Regulatory risk - requires proper waste disposal procedures for spent acids</span>
            </div>
        </div>

        <div class="business-section">
            <h2><i class="fas fa-calculator"></i> Cost Sanity Check & Validation</h2>
            
            <div class="cost-validation-panel">
                <h3>🔍 Cost Analysis Validation</h3>
                <div class="validation-grid">
                    <div class="validation-item">
                        <div class="validation-header">
                            <i class="fas fa-check-circle validation-pass"></i>
                            <span class="validation-title">Raw Material Costs</span>
                        </div>
                        <div class="validation-details">
                            <p><strong>Status:</strong> ✅ Realistic</p>
                            <p><strong>Toluene:</strong> ₹45/kg (Market: ₹40-50/kg)</p>
                            <p><strong>Acids:</strong> ₹25/kg total (Within range)</p>
                            <p><strong>Assessment:</strong> Costs align with current market prices</p>
                        </div>
                    </div>
                    
                    <div class="validation-item">
                        <div class="validation-header">
                            <i class="fas fa-check-circle validation-pass"></i>
                            <span class="validation-title">Production Economics</span>
                        </div>
                        <div class="validation-details">
                            <p><strong>Status:</strong> ✅ Profitable</p>
                            <p><strong>Total Cost:</strong> ₹93/kg</p>
                            <p><strong>Selling Price:</strong> ₹1,200/kg</p>
                            <p><strong>Margin:</strong> 92.3% (Excellent for specialty chemicals)</p>
                        </div>
                    </div>
                    
                    <div class="validation-item">
                        <div class="validation-header">
                            <i class="fas fa-exclamation-triangle validation-warning"></i>
                            <span class="validation-title">Market Price Validation</span>
                        </div>
                        <div class="validation-details">
                            <p><strong>Status:</strong> ⚠️ Verify</p>
                            <p><strong>Our Price:</strong> ₹1,200/kg</p>
                            <p><strong>Market Range:</strong> ₹1,000-1,400/kg</p>
                            <p><strong>Recommendation:</strong> Confirm with 2-3 potential customers</p>
                        </div>
                    </div>
                    
                    <div class="validation-item">
                        <div class="validation-header">
                            <i class="fas fa-check-circle validation-pass"></i>
                            <span class="validation-title">ROI Analysis</span>
                        </div>
                        <div class="validation-details">
                            <p><strong>Status:</strong> ✅ Excellent</p>
                            <p><strong>ROI:</strong> 1,190% (Outstanding)</p>
                            <p><strong>Payback:</strong> 0.3 months</p>
                            <p><strong>Assessment:</strong> Exceptional return on investment</p>
                        </div>
                    </div>
                </div>
                
                <div class="cost-alerts">
                    <h4>⚠️ Cost Validation Alerts</h4>
                    <div class="alert-item alert-success">
                        <i class="fas fa-thumbs-up"></i>
                        <span>Cost structure is realistic and competitive for specialty chemicals</span>
                    </div>
                    <div class="alert-item alert-info">
                        <i class="fas fa-info-circle"></i>
                        <span>Gross margin of 92.3% is sustainable - industry average is 60-80%</span>
                    </div>
                    <div class="alert-item alert-warning">
                        <i class="fas fa-exclamation-triangle"></i>
                        <span>Verify selling price with actual customers before finalizing business case</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="business-section">
            <h2><i class="fas fa-calendar-alt"></i> Implementation Timeline</h2>
            
            <h3>Phase 1: Preparation (Week 1)</h3>
            <ul>
                <li>Purchase addition funnel and safety equipment</li>
                <li>Lab team training on nitration safety procedures</li>
                <li>Update safety protocols and emergency procedures</li>
            </ul>
            
            <h3>Phase 2: Pilot Production (Week 2-3)</h3>
            <ul>
                <li>First 50kg batch production</li>
                <li>Quality testing and process optimization</li>
                <li>Customer sample preparation</li>
            </ul>
            
            <h3>Phase 3: Commercial Production (Week 4+)</h3>
            <ul>
                <li>Scale to 200kg/month production</li>
                <li>Customer orders and delivery</li>
                <li>Market expansion</li>
            </ul>
        </div>

        <div class="business-section">
            <h2><i class="fas fa-lightbulb"></i> Strategic Recommendations</h2>
            
            <h3>Immediate Actions</h3>
            <ol>
                <li><strong>Approve project immediately</strong> - Low investment, high return</li>
                <li><strong>Start customer discussions</strong> - Begin talking to existing pharma clients about nitrotoluene needs</li>
                <li><strong>Safety training</strong> - Schedule nitration safety training for lab team</li>
                <li><strong>Equipment purchase</strong> - Order addition funnel and safety equipment</li>
            </ol>
            
            <h3>Long-term Strategy</h3>
            <p>This project positions you as a <strong>complete toluene derivatives supplier</strong>. Consider developing a "Toluene Chemistry Suite" marketing approach to pharmaceutical customers.</p>
            
            <h3>Success Metrics</h3>
            <ul>
                <li>First commercial batch within 3 weeks</li>
                <li>₹2L+ monthly revenue within 2 months</li>
                <li>3+ regular customers within 6 months</li>
                <li>Zero safety incidents</li>
            </ul>
        </div>

        <div class="business-section" style="border-top: 2px solid #e5e7eb; padding-top: 24px; margin-top: 32px;">
            <p style="font-size: 13px; color: #6b7280; line-height: 1.6;">
                <strong>Business Analysis generated by AI Business Copilot</strong><br>
                Based on: Current business portfolio, equipment inventory, market analysis, financial projections<br>
                Last updated: ${new Date().toLocaleDateString()}<br>
                <em>This analysis is tailored to Patel Fine Chemicals' specific business context and capabilities.</em>
            </p>
        </div>
    `;
}

function loadBusinessProject(projectId) {
    const businessArea = document.getElementById('business-editor-area');
    if (!businessArea) return;
    
    switch(projectId) {
        case 'nitrotoluene_synthesis':
            businessArea.innerHTML = generateNitrotolueneBusinessAnalysis();
            break;
        case 'benzyl_acetate_optimization':
            businessArea.innerHTML = generateBenzylAcetateBusinessAnalysis();
            break;
        case 'toluene_recovery':
            businessArea.innerHTML = generateTolueneRecoveryBusinessAnalysis();
            break;
        case 'new_product_development':
            businessArea.innerHTML = generateNewProductDevelopmentAnalysis();
            break;
    }
}

function generateBenzylAcetateBusinessAnalysis() {
    return `
        <div class="business-section">
            <h1>Benzyl Acetate Yield Enhancement: Business Impact Analysis</h1>
            
            <p><strong>Project Type:</strong> Process Optimization</p>
            <p><strong>Business Impact:</strong> Immediate revenue increase</p>
            <p><strong>Investment Level:</strong> Low (catalyst and equipment upgrade)</p>
            <p><strong>Timeline:</strong> 2 weeks to implementation</p>
        </div>

        <div class="impact-card">
            <h4><i class="fas fa-chart-line"></i> Optimization Impact</h4>
            <div class="metric">
                <span class="metric-label">Current Yield</span>
                <span class="metric-value">78%</span>
            </div>
            <div class="metric">
                <span class="metric-label">Target Yield</span>
                <span class="metric-value">92%</span>
            </div>
            <div class="metric">
                <span class="metric-label">Yield Improvement</span>
                <span class="metric-value">+18%</span>
            </div>
            <div class="metric">
                <span class="metric-label">Additional Monthly Revenue</span>
                <span class="metric-value">₹2.3 Lakhs</span>
            </div>
            <div class="metric">
                <span class="metric-label">Annual Revenue Increase</span>
                <span class="metric-value">₹28 Lakhs</span>
            </div>
        </div>

        <div class="business-section">
            <h2><i class="fas fa-industry"></i> Current Production Context</h2>
            
            <h3>Existing Benzyl Acetate Production</h3>
            <ul>
                <li><strong>Current Production:</strong> 950 kg/month</li>
                <li><strong>Current Yield:</strong> 78%</li>
                <li><strong>Current Price:</strong> ₹450/kg (commodity grade)</li>
                <li><strong>Monthly Revenue:</strong> ₹4.3 Lakhs</li>
            </ul>
            
            <h3>Optimization Opportunity</h3>
            <p>With 92% yield, you can produce <strong>1,122 kg/month</strong> from the same raw materials. Additionally, the improved purity qualifies for <strong>fragrance-grade pricing</strong> at ₹562/kg (+25% premium).</p>
        </div>

        <div class="equipment-analysis">
            <h4><i class="fas fa-cogs"></i> Equipment Requirements</h4>
            <div class="equipment-item">
                <span class="equipment-name">100L Pilot Reactor</span>
                <span class="equipment-status available">Available</span>
            </div>
            <div class="equipment-item">
                <span class="equipment-name">Dean-Stark Trap</span>
                <span class="equipment-status needed">Need to Purchase</span>
            </div>
            <div class="equipment-item">
                <span class="equipment-name">HPLC for Monitoring</span>
                <span class="equipment-status available">Available</span>
            </div>
            <div class="equipment-item">
                <span class="equipment-name">Distillation Column</span>
                <span class="equipment-status available">Available</span>
            </div>
        </div>

        <div class="cost-breakdown">
            <h4><i class="fas fa-calculator"></i> Investment Required</h4>
            <div class="cost-item">
                <span>Dean-Stark Trap (100L)</span>
                <span>₹25,000</span>
            </div>
            <div class="cost-item">
                <span>p-TsOH Catalyst (Annual)</span>
                <span>₹8,000</span>
            </div>
            <div class="cost-item">
                <span>Validation Studies</span>
                <span>₹12,000</span>
            </div>
            <div class="cost-item total">
                <span>Total Investment</span>
                <span>₹45,000</span>
            </div>
        </div>

        <div class="business-section">
            <h2><i class="fas fa-rupee-sign"></i> Financial Impact</h2>
            
            <h3>Revenue Increase Calculation</h3>
            <ul>
                <li><strong>Additional Production:</strong> 172 kg/month (18% increase)</li>
                <li><strong>Quality Premium:</strong> ₹112/kg (25% higher price)</li>
                <li><strong>Monthly Revenue Increase:</strong> ₹2.3 Lakhs</li>
                <li><strong>Annual Revenue Increase:</strong> ₹28 Lakhs</li>
            </ul>
            
            <h3>ROI Analysis</h3>
            <ul>
                <li><strong>Investment:</strong> ₹45,000</li>
                <li><strong>Annual Return:</strong> ₹28 Lakhs</li>
                <li><strong>ROI:</strong> 6,200%</li>
                <li><strong>Payback Period:</strong> 1.6 months</li>
            </ul>
        </div>

        <div class="business-section">
            <h2><i class="fas fa-users"></i> Market Impact</h2>
            
            <h3>Fragrance Market Opportunity</h3>
            <p>Fragrance-grade benzyl acetate commands 25% premium pricing. This positions you in the <strong>premium fragrance market</strong> with higher margins and more stable demand.</p>
            
            <h3>Customer Benefits</h3>
            <ul>
                <li>Higher quality product for existing customers</li>
                <li>Access to fragrance industry customers</li>
                <li>Reduced waste and improved efficiency</li>
                <li>Competitive advantage over commodity suppliers</li>
            </ul>
        </div>

        <div class="risk-assessment">
            <h4><i class="fas fa-exclamation-triangle"></i> Risk Assessment</h4>
            <div class="risk-item">
                <span class="risk-level low">LOW</span>
                <span class="risk-description">Technical risk - well-established esterification chemistry</span>
            </div>
            <div class="risk-item">
                <span class="risk-level low">LOW</span>
                <span class="risk-description">Market risk - existing product with proven demand</span>
            </div>
            <div class="risk-item">
                <span class="risk-level low">LOW</span>
                <span class="risk-description">Investment risk - low cost, high return</span>
            </div>
        </div>

        <div class="business-section">
            <h2><i class="fas fa-lightbulb"></i> Recommendation</h2>
            <p><strong>APPROVE IMMEDIATELY</strong> - This is a no-brainer optimization with exceptional ROI. The investment pays for itself in less than 2 months and provides long-term competitive advantage.</p>
        </div>
    `;
}

function generateTolueneRecoveryBusinessAnalysis() {
    return `
        <div class="business-section">
            <h1>Toluene Recovery Enhancement: Cost Reduction Analysis</h1>
            
            <p><strong>Project Type:</strong> Process Efficiency Improvement</p>
            <p><strong>Business Impact:</strong> Direct cost savings</p>
            <p><strong>Investment Level:</strong> Low (equipment retrofit)</p>
            <p><strong>Timeline:</strong> 3 weeks implementation</p>
        </div>

        <div class="impact-card">
            <h4><i class="fas fa-chart-line"></i> Recovery Improvement</h4>
            <div class="metric">
                <span class="metric-label">Current Recovery</span>
                <span class="metric-value">96%</span>
            </div>
            <div class="metric">
                <span class="metric-label">Target Recovery</span>
                <span class="metric-value">98.2%</span>
            </div>
            <div class="metric">
                <span class="metric-label">Recovery Improvement</span>
                <span class="metric-value">+2.2%</span>
            </div>
            <div class="metric">
                <span class="metric-label">Monthly Toluene Savings</span>
                <span class="metric-value">550L</span>
            </div>
            <div class="metric">
                <span class="metric-label">Annual Cost Savings</span>
                <span class="metric-value">₹18 Lakhs</span>
            </div>
        </div>

        <div class="business-section">
            <h2><i class="fas fa-industry"></i> Current Toluene Usage</h2>
            
            <h3>Monthly Toluene Consumption</h3>
            <ul>
                <li><strong>Total Usage:</strong> 25,000L/month</li>
                <li><strong>Current Recovery:</strong> 24,000L (96%)</li>
                <li><strong>Lost Toluene:</strong> 1,000L/month</li>
                <li><strong>Cost of Loss:</strong> ₹52,000/month</li>
                <li><strong>Annual Loss:</strong> ₹6.24 Lakhs</li>
            </ul>
            
            <h3>Price Context</h3>
            <p>Toluene prices have increased 15% YoY due to crude oil volatility. Every liter saved is more valuable than before.</p>
        </div>

        <div class="equipment-analysis">
            <h4><i class="fas fa-cogs"></i> Equipment Modification</h4>
            <div class="equipment-item">
                <span class="equipment-name">Existing Distillation Column</span>
                <span class="equipment-status available">Available</span>
            </div>
            <div class="equipment-item">
                <span class="equipment-name">Structured Packing (5 plates)</span>
                <span class="equipment-status needed">Need to Purchase</span>
            </div>
            <div class="equipment-item">
                <span class="equipment-name">Installation Services</span>
                <span class="equipment-status needed">Need to Contract</span>
            </div>
        </div>

        <div class="cost-breakdown">
            <h4><i class="fas fa-calculator"></i> Investment Required</h4>
            <div class="cost-item">
                <span>Structured Packing Material</span>
                <span>₹35,000</span>
            </div>
            <div class="cost-item">
                <span>Installation & Labor</span>
                <span>₹10,000</span>
            </div>
            <div class="cost-item total">
                <span>Total Investment</span>
                <span>₹45,000</span>
            </div>
        </div>

        <div class="business-section">
            <h2><i class="fas fa-rupee-sign"></i> Financial Impact</h2>
            
            <h3>Savings Calculation</h3>
            <ul>
                <li><strong>Additional Recovery:</strong> 550L/month</li>
                <li><strong>Toluene Price:</strong> ₹52/L</li>
                <li><strong>Monthly Savings:</strong> ₹28,600</li>
                <li><strong>Annual Savings:</strong> ₹18 Lakhs</li>
            </ul>
            
            <h3>ROI Analysis</h3>
            <ul>
                <li><strong>Investment:</strong> ₹45,000</li>
                <li><strong>Annual Savings:</strong> ₹18 Lakhs</li>
                <li><strong>ROI:</strong> 4,000%</li>
                <li><strong>Payback Period:</strong> 1.9 months</li>
            </ul>
        </div>

        <div class="business-section">
            <h2><i class="fas fa-shield-alt"></i> Risk Mitigation</h2>
            
            <h3>Price Volatility Protection</h3>
            <p>With toluene prices rising due to crude oil volatility, this project provides <strong>price protection</strong> by reducing your dependence on fresh toluene purchases.</p>
            
            <h3>Supply Chain Benefits</h3>
            <ul>
                <li>Reduced raw material procurement needs</li>
                <li>Lower transportation costs</li>
                <li>Reduced supplier dependency</li>
                <li>Better inventory management</li>
            </ul>
        </div>

        <div class="risk-assessment">
            <h4><i class="fas fa-exclamation-triangle"></i> Risk Assessment</h4>
            <div class="risk-item">
                <span class="risk-level low">LOW</span>
                <span class="risk-description">Technical risk - proven technology, fits existing equipment</span>
            </div>
            <div class="risk-item">
                <span class="risk-level low">LOW</span>
                <span class="risk-description">Market risk - internal efficiency improvement</span>
            </div>
            <div class="risk-item">
                <span class="risk-level medium">MEDIUM</span>
                <span class="risk-description">Implementation risk - requires 3-week shutdown</span>
            </div>
        </div>

        <div class="business-section">
            <h2><i class="fas fa-lightbulb"></i> Recommendation</h2>
            <p><strong>APPROVE IMMEDIATELY</strong> - This is a straightforward efficiency improvement with guaranteed returns. Schedule during planned maintenance window to minimize downtime impact.</p>
        </div>
    `;
}

function generateNewProductDevelopmentAnalysis() {
    return `
        <div class="business-section">
            <h1>New Product Development: Strategic Analysis</h1>
            
            <p><strong>Project Type:</strong> Strategic Expansion</p>
            <p><strong>Business Impact:</strong> Long-term growth opportunity</p>
            <p><strong>Investment Level:</strong> Medium to High</p>
            <p><strong>Timeline:</strong> 6-12 months to market</p>
        </div>

        <div class="business-section">
            <h2><i class="fas fa-lightbulb"></i> Development Opportunities</h2>
            
            <h3>Based on Your Current Capabilities</h3>
            <ul>
                <li><strong>Pharmaceutical Intermediates:</strong> Expand into more complex drug intermediates</li>
                <li><strong>Fragrance Chemicals:</strong> Leverage your toluene chemistry expertise</li>
                <li><strong>Agrochemical Intermediates:</strong> Tap into India's growing agrochemical sector</li>
                <li><strong>Export-Grade Products:</strong> Develop products for EU/US markets</li>
            </ul>
            
            <h3>Market Analysis</h3>
            <ul>
                <li><strong>Indian Specialty Chemicals:</strong> ₹2.3 Cr market, 12% CAGR</li>
                <li><strong>Export Opportunities:</strong> China+1 strategy benefits Indian manufacturers</li>
                <li><strong>Government Support:</strong> PLI scheme for specialty chemicals</li>
                <li><strong>Regulatory Advantage:</strong> Easier compliance compared to China</li>
            </ul>
        </div>

        <div class="business-section">
            <h2><i class="fas fa-chart-line"></i> Investment Requirements</h2>
            
            <h3>Typical New Product Development</h3>
            <ul>
                <li><strong>R&D Investment:</strong> ₹5-15 Lakhs</li>
                <li><strong>Equipment Upgrades:</strong> ₹10-25 Lakhs</li>
                <li><strong>Regulatory Compliance:</strong> ₹2-5 Lakhs</li>
                <li><strong>Market Development:</strong> ₹3-8 Lakhs</li>
                <li><strong>Total Investment:</strong> ₹20-53 Lakhs</li>
            </ul>
            
            <h3>Revenue Potential</h3>
            <ul>
                <li><strong>New Product Revenue:</strong> ₹50-100 Lakhs annually</li>
                <li><strong>ROI Timeline:</strong> 2-3 years</li>
                <li><strong>Market Position:</strong> First-mover advantage in niche</li>
            </ul>
        </div>

        <div class="business-section">
            <h2><i class="fas fa-lightbulb"></i> Strategic Recommendations</h2>
            
            <h3>Immediate Actions</h3>
            <ol>
                <li><strong>Market Research:</strong> Identify specific high-value products</li>
                <li><strong>Customer Surveys:</strong> Ask existing customers about unmet needs</li>
                <li><strong>Competitor Analysis:</strong> Find gaps in current market offerings</li>
                <li><strong>Regulatory Check:</strong> Ensure compliance requirements are manageable</li>
            </ol>
            
            <h3>Development Strategy</h3>
            <p>Focus on products that leverage your existing toluene chemistry expertise and customer relationships. This reduces technical risk and accelerates market entry.</p>
        </div>
    `;
}

function showBusinessResearchOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'research-overlay';
    overlay.innerHTML = `
        <div class="research-container">
            <div class="research-header">
                <h3><i class="fas fa-robot"></i> AI Analyzing Business Context</h3>
                <button class="research-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="research-content">
                <div class="research-query">
                    <h4>BUSINESS ANALYSIS QUERY</h4>
                    <p>Generate comprehensive business analysis for nitrotoluene synthesis project considering current business portfolio, equipment, and market context</p>
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
    
    animateBusinessResearchSteps();
}

function animateBusinessResearchSteps() {
    const steps = [
        { title: 'Analyzing Current Business Portfolio', details: 'Reviewing existing products, equipment, and customer base to understand project fit.', delay: 800 },
        { title: 'Evaluating Equipment Requirements', details: 'Checking available equipment against project needs, identifying gaps and opportunities.', delay: 1200 },
        { title: 'Market Analysis & Revenue Projections', details: 'Analyzing target market, pricing, and revenue potential based on current business context.', delay: 1500 },
        { title: 'Financial Impact Assessment', details: 'Calculating ROI, payback period, and investment requirements specific to your business.', delay: 1200 },
        { title: 'Risk Assessment & Mitigation', details: 'Identifying business risks and developing mitigation strategies.', delay: 1000 },
        { title: 'Strategic Recommendations', details: 'Generating actionable business recommendations based on complete analysis.', delay: 1200 }
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
                            initializeBusinessCopilot();
                        }, 300);
                    }, 800);
                }
            }, step.delay);
        }, currentDelay);
        
        currentDelay += step.delay;
    });
}
