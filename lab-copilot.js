// Lab Copilot - Form-Based Synthesis Questionnaire System
// Designed for Indian SME chemical manufacturers

// State management
const labCopilotState = {
    phase: 'initial', // 'initial', 'form_shown', 'researching', 'output_generated', 'modifying'
    formData: {},
    compoundName: '',
    userQuery: '',
    showingResultsForm: false,
    resultsHistory: [],
    currentResultsDraft: null,
    aiQuestionIndex: 0
};

document.addEventListener('DOMContentLoaded', () => {
    initializeLabCopilot();
});

function initializeLabCopilot() {
    const protocolArea = document.getElementById('protocol-editor-area');
    if (!protocolArea) return;
    
    // Start with empty protocol area
    protocolArea.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #9ca3af; text-align: center; padding: 48px;">
            <div>
                <i class="fas fa-flask" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                <p style="font-size: 16px; font-weight: 500;">No protocol generated yet</p>
                <p style="font-size: 14px; margin-top: 8px;">Ask me to generate a synthesis procedure in the chat →</p>
            </div>
        </div>
    `;
    
    // Initialize empty chat
    const labChat = document.getElementById('lab-chat');
    if (labChat) {
        labChat.innerHTML = '';
        
        // Welcome message from AI
        const welcomeMessage = {
            type: 'assistant',
            content: '👋 Welcome to Lab Copilot! I can help you generate detailed synthesis procedures for your chemical manufacturing needs.\n\nTo get started, tell me what compound you need to synthesize. For example:\n• "I need to synthesize 4-O-nitrotolidine"\n• "Help me prepare nitrotoluene for fragrance intermediates"\n• "Generate procedure for benzyl acetate synthesis"\n\nI\'ll ask you some questions to understand your lab setup and requirements, then generate a complete, safety-compliant procedure.',
            timestamp: new Date().toISOString()
        };
        
        addChatMessage(welcomeMessage);
    }
    
    // Chat input handler
    const labInput = document.getElementById('lab-input');
    const labSend = document.getElementById('lab-send');
    
    if (labInput && labSend) {
        labSend.addEventListener('click', () => handleUserMessage());
        labInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserMessage();
        });
    }
    
    // Regenerate button handler
    const regenerateBtn = document.getElementById('regenerate-btn');
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', () => {
            if (labCopilotState.phase === 'output_generated') {
                showEnhancedResearchOverlay();
            }
        });
    }
    
    // Log Results button handler
    const logResultsBtn = document.getElementById('log-results-btn');
    if (logResultsBtn) {
        logResultsBtn.addEventListener('click', () => {
            showResultsForm();
        });
    }
}

function handleUserMessage() {
    const labInput = document.getElementById('lab-input');
    const message = labInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addChatMessage({
        type: 'user',
        content: message,
        timestamp: new Date().toISOString()
    });
    
    labInput.value = '';
    
    // HARDCODED FOR DEMO: Always show form regardless of phase
    // This ensures reliable demo behavior
    labCopilotState.userQuery = message;
    labCopilotState.compoundName = extractCompoundName(message);
    
    // Show form immediately (no delay for demo reliability)
    setTimeout(() => {
        generateDynamicForm();
        // Add cost calculation listeners after form is generated
        setTimeout(() => {
            addCostCalculationListeners();
        }, 100);
    }, 500);
}

function extractCompoundName(query) {
    // HARDCODED FOR DEMO: Always return Nitrotoluene for consistent demo
    // This ensures the form always shows the same compound name
    return 'Nitrotoluene';
}

function addChatMessage(message) {
    const labChat = document.getElementById('lab-chat');
    if (!labChat) return;
    
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
    
    labChat.appendChild(messageDiv);
    labChat.scrollTop = labChat.scrollHeight;
}

function generateDynamicForm() {
    labCopilotState.phase = 'form_shown';
    
    const formHtml = `
        <div class="synthesis-form-container">
            <div class="form-header">
                <h3>📋 Synthesis Questionnaire</h3>
                <p>Please provide information about your lab setup and requirements. I'll use this to generate a tailored procedure for <strong>${labCopilotState.compoundName}</strong> synthesis.</p>
            </div>
            
            <form id="synthesis-form" class="synthesis-form">
                <!-- Raw Materials Section -->
                <div class="form-section">
                    <h4><i class="fas fa-flask"></i> Raw Materials & Reagents</h4>
                    
                    <div class="form-field">
                        <label for="starting-material">Starting Material</label>
                        <input type="text" id="starting-material" placeholder="e.g., Toluene" value="Toluene">
                        <span class="field-help">Main substrate for synthesis</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="supplier">Preferred Supplier</label>
                        <select id="supplier">
                            <option value="deepak-nitrite">Deepak Nitrite</option>
                            <option value="gujarat-alkalies">Gujarat Alkalies</option>
                            <option value="aarti-industries">Aarti Industries</option>
                            <option value="balaji-amines">Balaji Amines</option>
                            <option value="other">Other</option>
                        </select>
                        <span class="field-help">Indian chemical supplier</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="reagents">Additional Reagents Available</label>
                        <input type="text" id="reagents" placeholder="e.g., H₂SO₄, HNO₃" value="Concentrated H₂SO₄, Concentrated HNO₃">
                        <span class="field-help">Acids, bases, catalysts in your inventory</span>
                    </div>
                </div>

                <!-- Pricing & Cost Information Section -->
                <div class="form-section">
                    <h4><i class="fas fa-rupee-sign"></i> Pricing & Cost Information</h4>
                    
                    <div class="form-field">
                        <label for="starting-material-price">Starting Material Price (₹/kg)</label>
                        <input type="number" id="starting-material-price" placeholder="e.g., 52" value="${fakeData.companyContext.costAssumptions.toluene.price}" step="0.01">
                        <span class="field-help">Current market price per kg (Toluene: ₹${fakeData.companyContext.costAssumptions.toluene.price}/L)</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="reagent-cost">Total Reagent Cost (₹/kg product)</label>
                        <input type="number" id="reagent-cost" placeholder="e.g., 42" value="${Math.round((fakeData.companyContext.costAssumptions.sulfuricAcid.price + fakeData.companyContext.costAssumptions.nitricAcid.price) / 2)}" step="0.01">
                        <span class="field-help">Estimated cost of all reagents per kg of final product (H₂SO₄: ₹${fakeData.companyContext.costAssumptions.sulfuricAcid.price}/kg, HNO₃: ₹${fakeData.companyContext.costAssumptions.nitricAcid.price}/kg)</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="target-product-price">Target Product Price (₹/kg)</label>
                        <input type="number" id="target-product-price" placeholder="e.g., 1200" value="${fakeData.companyContext.costAssumptions.nitrotoluene.price}" step="0.01">
                        <span class="field-help">Expected selling price of final product (Market range: ${fakeData.companyContext.costAssumptions.nitrotoluene.market})</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="batch-size">Batch Size (kg)</label>
                        <input type="number" id="batch-size" placeholder="e.g., 50" value="50" step="0.1">
                        <span class="field-help">Production batch size for cost calculation</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="utility-cost">Utility Cost (₹/kg product)</label>
                        <input type="number" id="utility-cost" placeholder="e.g., 15" value="${fakeData.companyContext.costAssumptions.steam.cost + fakeData.companyContext.costAssumptions.electricity.cost + fakeData.companyContext.costAssumptions.water.cost}" step="0.01">
                        <span class="field-help">Steam, electricity, water per kg product (Steam: ₹${fakeData.companyContext.costAssumptions.steam.cost}, Electricity: ₹${fakeData.companyContext.costAssumptions.electricity.cost}, Water: ₹${fakeData.companyContext.costAssumptions.water.cost})</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="labor-cost">Labor Cost (₹/kg product)</label>
                        <input type="number" id="labor-cost" placeholder="e.g., 8" value="${fakeData.companyContext.costAssumptions.labor.cost}" step="0.01">
                        <span class="field-help">Labor cost per kg of final product (Rate: ${fakeData.companyContext.costAssumptions.labor.rate})</span>
                    </div>
                </div>
                
                <!-- Equipment Section -->
                <div class="form-section">
                    <h4><i class="fas fa-cog"></i> Equipment & Facilities</h4>
                    
                    <div class="form-field">
                        <label for="reactor-size">Reactor Type & Size</label>
                        <select id="reactor-size">
                            <option value="250ml-rb">250 mL Round-bottom flask</option>
                            <option value="500ml-reactor">500 L Glass-lined reactor</option>
                            <option value="1000l-reactor">1000 L Reactor</option>
                            <option value="2000l-reactor">2000 L Reactor</option>
                        </select>
                        <span class="field-help">Primary reaction vessel</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="temperature-control">Temperature Control</label>
                        <select id="temperature-control">
                            <option value="ice-bath">Ice bath / Cooling bath</option>
                            <option value="water-bath">Water bath</option>
                            <option value="heating-mantle">Heating mantle</option>
                            <option value="jacketed-reactor">Jacketed reactor with chiller</option>
                        </select>
                        <span class="field-help">How you control reaction temperature</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="analytical-equipment">Analytical Equipment</label>
                        <select id="analytical-equipment" multiple size="3">
                            <option value="hplc" selected>HPLC</option>
                            <option value="gc-ms" selected>GC-MS</option>
                            <option value="nmr">NMR</option>
                            <option value="ftir">FTIR</option>
                            <option value="none">None available</option>
                        </select>
                        <span class="field-help">For quality analysis (hold Ctrl to select multiple)</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="fume-hood">Fume Hood Available?</label>
                        <div class="toggle-field">
                            <input type="checkbox" id="fume-hood" checked>
                            <label for="fume-hood" class="toggle-label">Yes</label>
                        </div>
                        <span class="field-help">Required for toxic fume control</span>
                    </div>
                </div>
                
                <!-- Quantities & Scale -->
                <div class="form-section">
                    <h4><i class="fas fa-balance-scale"></i> Quantities & Scale</h4>
                    
                    <div class="form-field">
                        <label for="target-quantity">Target Quantity</label>
                        <input type="text" id="target-quantity" placeholder="e.g., 50 kg" value="50 kg">
                        <span class="field-help">How much product do you need?</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="batch-size-scale">Batch Size</label>
                        <input type="text" id="batch-size-scale" placeholder="e.g., 10 kg per batch" value="Lab scale (50g)">
                        <span class="field-help">Amount per production run</span>
                    </div>
                </div>
                
                <!-- Safety & Compliance -->
                <div class="form-section">
                    <h4><i class="fas fa-shield-alt"></i> Safety & Compliance</h4>
                    
                    <div class="form-field">
                        <label for="ppe-available">PPE Available</label>
                        <input type="text" id="ppe-available" value="Safety goggles, acid-resistant gloves, lab coat">
                        <span class="field-help">Personal protective equipment</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="safety-equipment">Emergency Equipment</label>
                        <input type="text" id="safety-equipment" value="Eye wash, safety shower, fire extinguisher">
                        <span class="field-help">Emergency response equipment nearby</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="cpcb-compliance">CPCB Compliance Required?</label>
                        <div class="toggle-field">
                            <input type="checkbox" id="cpcb-compliance" checked>
                            <label for="cpcb-compliance" class="toggle-label">Yes</label>
                        </div>
                        <span class="field-help">Gujarat pollution control requirements</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="fssai-approval">FSSAI Approval Needed?</label>
                        <div class="toggle-field">
                            <input type="checkbox" id="fssai-approval">
                            <label for="fssai-approval" class="toggle-label">No</label>
                        </div>
                        <span class="field-help">For food-grade products</span>
                    </div>
                </div>
                
                <!-- Budget & Timeline -->
                <div class="form-section">
                    <h4><i class="fas fa-rupee-sign"></i> Budget & Timeline</h4>
                    
                    <div class="form-field">
                        <label for="budget">Budget (₹ Lakhs)</label>
                        <input type="number" id="budget" placeholder="e.g., 5" value="2.5" step="0.1" min="0">
                        <span class="field-help">Total project budget in lakhs</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="timeline">Project Timeline</label>
                        <select id="timeline">
                            <option value="urgent">Urgent (1-2 weeks)</option>
                            <option value="normal" selected>Normal (1-2 months)</option>
                            <option value="flexible">Flexible (3+ months)</option>
                        </select>
                        <span class="field-help">When do you need results?</span>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="start-research-btn">
                        <i class="fas fa-search"></i>
                        Start AI Research & Generate Procedure
                    </button>
                </div>
            </form>
        </div>
    `;
    
    addChatMessage({
            type: 'assistant',
        content: 'Perfect! I need some information about your lab setup to generate the most accurate procedure. Please fill out this questionnaire:',
            timestamp: new Date().toISOString()
    });
    
    // Add form to chat
    const labChat = document.getElementById('lab-chat');
    const formContainer = document.createElement('div');
    formContainer.className = 'chat-message assistant form-message';
    formContainer.innerHTML = formHtml;
    labChat.appendChild(formContainer);
    labChat.scrollTop = labChat.scrollHeight;
    
    // Handle form submission
    const form = document.getElementById('synthesis-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleFormSubmission();
        });
    }
}

function handleFormSubmission() {
    // HARDCODED FOR DEMO: Always use same form data for consistent demo
    labCopilotState.formData = {
        startingMaterial: 'Toluene',
        supplier: 'deepak-nitrite',
        reagents: 'Concentrated H₂SO₄, Concentrated HNO₃',
        reactorSize: '250ml-rb',
        temperatureControl: 'ice-bath',
        fumeHood: true,
        targetQuantity: '50 kg',
        batchSize: 'Lab scale (50g)',
        cpcbCompliance: true,
        fssaiApproval: false,
        budget: '2.5',
        timeline: 'normal'
    };
    
    // Show confirmation message
    const confirmationMsg = `Perfect! I have all the information I need:\n\n✓ Starting from Toluene\n✓ Using 250 mL Round-bottom flask\n✓ Supplier: Deepak Nitrite\n✓ Budget: ₹2.5 Lakhs\n✓ CPCB compliance required\n\nStarting comprehensive research...`;
    
    addChatMessage({
        type: 'assistant',
        content: confirmationMsg,
        timestamp: new Date().toISOString()
    });
    
    // Start research after brief delay
    setTimeout(() => {
        showEnhancedResearchOverlay();
    }, 1200);
}

function getSupplierName(supplierId) {
    const suppliers = {
        'deepak-nitrite': 'Deepak Nitrite',
        'gujarat-alkalies': 'Gujarat Alkalies',
        'aarti-industries': 'Aarti Industries',
        'balaji-amines': 'Balaji Amines',
        'other': 'Other supplier'
    };
    return suppliers[supplierId] || 'Selected supplier';
}

function handleFollowupModification(message) {
    // Extract modification intent
    const lowerMsg = message.toLowerCase();
    
    let modificationNote = '';
    if (lowerMsg.includes('instead of') || lowerMsg.includes('replace')) {
        modificationNote = 'material substitution';
    } else if (lowerMsg.includes('temperature') || lowerMsg.includes('heat')) {
        modificationNote = 'temperature adjustment';
    } else if (lowerMsg.includes('scale') || lowerMsg.includes('quantity')) {
        modificationNote = 'scale modification';
    } else {
        modificationNote = 'procedure modification';
    }
    
    addChatMessage({
        type: 'assistant',
        content: `I'll regenerate the procedure with your requested changes (${modificationNote}). This may affect reaction conditions, yields, and safety considerations. Let me research the updated approach...`,
        timestamp: new Date().toISOString()
    });
    
    labCopilotState.phase = 'modifying';
    
    setTimeout(() => {
        showEnhancedResearchOverlay(true); // true = modification mode (faster)
    }, 1000);
}

function showEnhancedResearchOverlay(isModification = false) {
    labCopilotState.phase = 'researching';
    
    const overlay = document.createElement('div');
    overlay.className = 'research-overlay enhanced';
    overlay.innerHTML = `
        <div class="research-container enhanced">
            <div class="research-header">
                <div class="research-title">
                    <i class="fas fa-atom fa-spin"></i>
                    <h3>${isModification ? 'Re-analyzing & Updating Procedure' : 'AI Research in Progress'}</h3>
                </div>
                <div class="research-subtitle">
                    Generating ${labCopilotState.compoundName} synthesis procedure tailored to your lab
                </div>
            </div>
            
            <div class="research-progress-container">
                <div class="progress-bar-wrapper">
                    <div class="progress-bar" id="research-progress-bar"></div>
                </div>
                <div class="progress-percentage" id="progress-percentage">0%</div>
            </div>
            
            <div class="research-content">
                <div class="research-stages" id="research-stages"></div>
            </div>
            
            <div class="research-footer">
                <i class="fas fa-shield-alt"></i>
                <span>Ensuring CPCB compliance and safety standards</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Animate entrance
    setTimeout(() => overlay.classList.add('visible'), 50);
    
    // Run research stages
    animateEnhancedResearchSteps(isModification);
}

function animateEnhancedResearchSteps(isModification = false) {
    const stages = [
        { 
            title: 'Analyzing Requirements & Context', 
            details: 'Understanding synthesis parameters, safety needs, equipment constraints, and Indian regulatory requirements.',
            icon: 'fas fa-brain',
            duration: isModification ? 3000 : 5000
        },
        { 
            title: 'Searching Chemical Databases', 
            details: 'Accessing PubChem, Organic Syntheses, Sciencemadness community procedures, and peer-reviewed literature.',
            icon: 'fas fa-database',
            duration: isModification ? 3500 : 6000
        },
        { 
            title: 'Verifying Indian Compliance & Suppliers', 
            details: 'Cross-referencing CPCB regulations, FSSAI requirements, checking Deepak Nitrite and Gujarat Alkalies availability.',
            icon: 'fas fa-clipboard-check',
            duration: isModification ? 3000 : 5500
        },
        { 
            title: 'Generating Detailed Procedure', 
            details: 'Creating step-by-step synthesis with hover tooltips, safety warnings, equipment setup, and troubleshooting notes.',
            icon: 'fas fa-file-alt',
            duration: isModification ? 3500 : 6000
        },
        { 
            title: 'Adding Business Context & ROI', 
            details: 'Calculating cost estimates, yield predictions, market feasibility analysis for Indian SME chemical manufacturers.',
            icon: 'fas fa-chart-line',
            duration: isModification ? 2500 : 4500
        }
    ];
    
    const stagesContainer = document.getElementById('research-stages');
    const progressBar = document.getElementById('research-progress-bar');
    const progressPercentage = document.getElementById('progress-percentage');
    
    let currentDelay = 500;
    let progressIncrement = 100 / stages.length;
    let currentProgress = 0;
    
    stages.forEach((stage, index) => {
        setTimeout(() => {
            // Add new stage
            const stageEl = document.createElement('div');
            stageEl.className = 'research-stage active';
            stageEl.innerHTML = `
                <div class="stage-icon active">
                    <i class="${stage.icon} fa-spin"></i>
                </div>
                <div class="stage-content">
                    <div class="stage-title">${stage.title}</div>
                    <div class="stage-details">${stage.details}</div>
                </div>
                <div class="stage-status">
                    <i class="fas fa-circle-notch fa-spin"></i>
                </div>
            `;
            stagesContainer.appendChild(stageEl);
            
            // Update progress bar
            currentProgress += progressIncrement;
            progressBar.style.width = currentProgress + '%';
            progressPercentage.textContent = Math.round(currentProgress) + '%';
            
            // Mark stage as complete after duration
            setTimeout(() => {
                stageEl.classList.remove('active');
                stageEl.classList.add('completed');
                stageEl.querySelector('.stage-icon').classList.remove('active');
                stageEl.querySelector('.stage-icon').classList.add('completed');
                stageEl.querySelector('.stage-icon i').className = 'fas fa-check-circle';
                stageEl.querySelector('.stage-status').innerHTML = '<i class="fas fa-check" style="color: #10b981;"></i>';
                
                // If last stage, complete research
                if (index === stages.length - 1) {
                    progressBar.style.width = '100%';
                    progressPercentage.textContent = '100%';
                    
                    setTimeout(() => {
                        completeResearch(isModification);
                    }, 800);
                }
            }, stage.duration - 500);
        }, currentDelay);
        
        currentDelay += stage.duration;
    });
}

function completeResearch(isModification = false) {
    // Fade out overlay
    const overlay = document.querySelector('.research-overlay');
    if (overlay) {
        overlay.classList.remove('visible');
        setTimeout(() => overlay.remove(), 400);
    }
    
    // Update protocol area
    const protocolArea = document.getElementById('protocol-editor-area');
    if (protocolArea) {
        protocolArea.innerHTML = generateNitrotolueneSynthesisProcedure();
        
        // Calculate and update cost analysis based on form inputs
        setTimeout(() => {
            updateCostAnalysis();
        }, 100);
        
        // If modification, highlight changed sections
        if (isModification) {
            setTimeout(() => {
                const sections = protocolArea.querySelectorAll('.procedure-step');
                sections.forEach((section, index) => {
                    if (index < 3) { // Highlight first 3 steps as "modified"
                        section.style.animation = 'highlight-fade 2s ease';
                        section.style.backgroundColor = '#fef3c7';
                        setTimeout(() => {
                            section.style.backgroundColor = '';
                        }, 2000);
                    }
                });
            }, 300);
        }
    }
    
    // Add completion message to chat
    labCopilotState.phase = 'output_generated';
    
    // Enable Log Results button
    const logResultsBtn = document.getElementById('log-results-btn');
    if (logResultsBtn) {
        logResultsBtn.disabled = false;
        logResultsBtn.classList.remove('disabled');
    }
    
    const completionMsg = isModification 
        ? `✓ Procedure updated successfully! I've regenerated the synthesis procedure with your requested modifications. The updated sections are highlighted in yellow. Review the changes and let me know if you need any further adjustments.`
        : `✓ Research complete! I've generated a comprehensive ${labCopilotState.compoundName} synthesis procedure tailored to your lab setup.\n\nThe procedure includes:\n• Detailed step-by-step instructions with safety protocols\n• Equipment setup specific to your ${labCopilotState.formData.reactorSize}\n• CPCB-compliant waste disposal guidelines\n• Hover over underlined text for additional context\n• Troubleshooting guide and quality checks\n\nFeel free to ask me to modify any aspect, such as:\n• "Use a different starting material"\n• "Adjust temperature ranges"\n• "Add more safety details"\n• "Scale up the quantities"`;
    
    setTimeout(() => {
        addChatMessage({
            type: 'assistant',
            content: completionMsg,
            timestamp: new Date().toISOString()
        });
    }, 500);
}

function generateNitrotolueneSynthesisProcedure() {
    const today = new Date().toLocaleDateString();
    
    return `
        <div class="protocol-section">
            <h1>Nitrotoluene Synthesis: Complete Laboratory Procedure</h1>
            
            <p><strong>Reaction:</strong> Direct nitration of toluene using mixed acid (HNO₃/H₂SO₄)</p>
            <p><strong>Method Type:</strong> Electrophilic aromatic substitution</p>
            <p><strong>Difficulty Level:</strong> Intermediate (requires careful temperature control)</p>
            <p><strong>Time Required:</strong> 3-4 hours total</p>
        </div>

        <div class="safety-warning">
            <div class="callout-header">
                <i class="fas fa-exclamation-triangle"></i>
                CRITICAL SAFETY REQUIREMENTS - READ BEFORE STARTING
            </div>
            <ul style="margin: 8px 0; padding-left: 20px;">
                <li><strong>Fume hood:</strong> MANDATORY - This reaction produces toxic NOx fumes that are corrosive to lungs</li>
                <li><strong>PPE Required:</strong> Safety goggles, acid-resistant gloves, lab coat, closed-toe shoes</li>
                <li><strong>Emergency equipment:</strong> Eye wash station within 10 seconds walk, safety shower accessible</li>
                <li><strong>Fire safety:</strong> Keep ABC fire extinguisher nearby. Nitration reactions can become runaway if overheated</li>
                <li><strong>Never work alone:</strong> Always have another person nearby who knows you're doing this reaction</li>
                <li><strong>Temperature critical:</strong> Exceeding 30°C during addition can cause violent runaway reaction</li>
            </ul>
        </div>

        <div class="protocol-section">
            <h2><i class="fas fa-flask"></i> Materials Required</h2>
            
            <table class="materials-table">
                <thead>
                    <tr>
                        <th>Material</th>
                        <th>Quantity</th>
                        <th>Specification</th>
                        <th>Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Toluene</td>
                        <td>50 g (57.5 mL)</td>
                        <td>≥99% purity, 0.54 mol</td>
                        <td>Starting material</td>
                    </tr>
                    <tr>
                        <td>Concentrated H₂SO₄</td>
                        <td>75 g (40.2 mL)</td>
                        <td>98% concentration</td>
                        <td>Activating agent</td>
                    </tr>
                    <tr>
                        <td>Concentrated HNO₃</td>
                        <td>75 g (50.4 mL)</td>
                        <td>70% concentration</td>
                        <td>Nitrating agent</td>
                    </tr>
                    <tr>
                        <td>Sodium carbonate</td>
                        <td>~10 g</td>
                        <td>For 5% solution</td>
                        <td>Neutralizing wash</td>
                    </tr>
                    <tr>
                        <td>Calcium chloride</td>
                        <td>~5 g</td>
                        <td>Anhydrous</td>
                        <td>Drying agent</td>
                    </tr>
                    <tr>
                        <td>Ice</td>
                        <td>~500 g</td>
                        <td>-</td>
                        <td>Temperature control</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="caution-box">
            <div class="callout-header">
                <i class="fas fa-exclamation-circle"></i>
                Material Handling Notes
            </div>
            <p><strong>Concentrated Sulfuric Acid:</strong> Extremely corrosive. Will cause severe chemical burns. Handle with acid-resistant gloves. If spilled on skin, rinse immediately with copious water for 15 minutes.</p>
            <p><strong>Concentrated Nitric Acid:</strong> Oxidizing acid. Will stain skin yellow (xanthoprotein reaction). Causes chemical burns. Fumes are toxic.</p>
            <p><strong>Toluene:</strong> Flammable. Use away from open flames. Vapors can cause dizziness - work in fume hood.</p>
        </div>

        <div class="protocol-section">
            <h2><i class="fas fa-tools"></i> Equipment Setup</h2>
            
            <h3>Required Glassware</h3>
            <ul>
                <li><span class="hover-comment">250 mL round-bottom flask<span class="comment-tooltip">Round-bottom flask is essential for even heating and magnetic stirring. DO NOT use Erlenmeyer flask - it can crack from exothermic heat</span></span></li>
                <li><span class="hover-comment">Magnetic stir bar<span class="comment-tooltip">Stirring is CRITICAL for temperature control. The reaction is exothermic and must be mixed continuously to dissipate heat evenly</span></span> (clean, Teflon-coated)</li>
                <li>250 mL <span class="hover-comment">separatory funnel<span class="comment-tooltip">Used for liquid-liquid extraction during workup. Ensure stopcock is greased and doesn't leak</span></span></li>
                <li><span class="hover-comment">Addition funnel<span class="comment-tooltip">Allows slow, controlled addition of acid mixture. If you don't have one, use a burette or even a disposable pipette, but addition MUST be dropwise</span></span> (or burette as substitute)</li>
                <li>Buchner funnel and filter paper</li>
                <li>2x 250 mL beakers</li>
                <li>Thermometer (range -10°C to 100°C, calibrated)</li>
            </ul>

            <h3>Required Equipment</h3>
            <ul>
                <li><span class="hover-comment">Magnetic stirrer/hotplate<span class="comment-tooltip">You need precise temperature control. Heating too fast = runaway reaction = potential explosion. Use a stirrer with temperature probe if available</span></span></li>
                <li>Ice bath (large container)</li>
                <li><span class="hover-comment">Fume hood<span class="comment-tooltip">NON-NEGOTIABLE. NOx fumes from this reaction will permanently damage your lungs. Even small exposures cause respiratory problems. Always work in functioning fume hood</span></span> (verified working)</li>
            </ul>
        </div>

        <div class="critical-note">
            <div class="callout-header">
                <i class="fas fa-info-circle"></i>
                Before You Begin - Equipment Check
            </div>
            <p>Verify ALL of the following before proceeding:</p>
            <ul style="margin: 0; padding-left: 20px;">
                <li>☐ Fume hood is turned on and airflow verified (tissue paper test)</li>
                <li>☐ Magnetic stirrer is working</li>
                <li>☐ All glassware is clean and DRY (water will react with acids)</li>
                <li>☐ Thermometer is calibrated</li>
                <li>☐ Emergency shower and eye wash tested</li>
                <li>☐ Someone knows you're performing this experiment</li>
                <li>☐ Waste containers labeled and available</li>
                <li>☐ Enough ice available (you'll need fresh ice during reaction)</li>
            </ul>
        </div>

        <div class="protocol-section">
            <h2><i class="fas fa-list-ol"></i> Detailed Step-by-Step Procedure</h2>
            
            <div class="procedure-step" data-step="1">
                <h4>Prepare Ice Bath and Setup</h4>
                <p><strong>Action:</strong> Fill a large container with ice and water. Add 50 g of salt to lower temperature below 0°C. Place the 250 mL round-bottom flask in the ice bath.</p>
                <p><strong>Details:</strong> Add magnetic stir bar to the flask. Clamp the flask securely. The ice bath should come at least halfway up the flask.</p>
                <p><strong>Why this matters:</strong> The nitration reaction is highly exothermic (releases heat). Starting cold gives you a safety buffer.</p>
            </div>

            <div class="safety-warning">
                <div class="callout-header">
                    <i class="fas fa-exclamation-triangle"></i>
                    CRITICAL SAFETY POINT - Acid Mixing
                </div>
                <p><strong>NEVER add water to concentrated acid - ALWAYS add acid to water.</strong></p>
                <p>Violating this rule causes violent spattering of boiling acid that will cause severe burns.</p>
            </div>

            <div class="procedure-step" data-step="2">
                <h4>Prepare the Mixed Nitrating Acid</h4>
                <p><strong>Action:</strong> In a separate beaker in the ice bath, SLOWLY add 40.2 mL concentrated H₂SO₄ to 50.4 mL concentrated HNO₃.</p>
                <p><strong>Exact procedure:</strong></p>
                <ol style="margin: 8px 0; padding-left: 20px;">
                    <li>Measure 50.4 mL HNO₃ into a 150 mL beaker</li>
                    <li>Place this beaker in the ice bath</li>
                    <li>Measure 40.2 mL H₂SO₄</li>
                    <li>Add H₂SO₄ to HNO₃ slowly, about 5 mL at a time, swirling between additions</li>
                    <li>Wait 30 seconds between additions</li>
                    <li>Let mixed acid cool to <10°C before proceeding (~10 minutes)</li>
                </ol>
                <p><strong>Expected observations:</strong> Mix becomes warm (this is normal). Some fuming may occur. Mixture should be clear to slightly yellow.</p>
            </div>

            <div class="caution-box">
                <div class="callout-header">
                    <i class="fas fa-thermometer-half"></i>
                    Temperature Monitoring - Most Critical Step
                </div>
                <p>The next step is where most accidents happen. Temperature MUST stay below 30°C. Above 30°C, you risk:</p>
                <ul style="margin: 0; padding-left: 20px;">
                    <li>Formation of dinitrotoluene (more explosive)</li>
                    <li>Runaway exothermic reaction</li>
                    <li>Violent boiling and spattering</li>
                </ul>
                <p><strong>If temperature exceeds 30°C:</strong> STOP addition immediately. Let cool to 15-20°C before continuing.</p>
            </div>

            <div class="procedure-step" data-step="3">
                <h4>Add Toluene to Flask</h4>
                <p><strong>Action:</strong> Measure 57.5 mL toluene. Add to the round-bottom flask in the ice bath.</p>
                <p><strong>Details:</strong> Start magnetic stirring at moderate speed. Insert thermometer. Initial temperature should be 5-10°C from ice bath.</p>
            </div>

            <div class="procedure-step" data-step="4">
                <h4>Add Mixed Acid to Toluene (SLOW ADDITION)</h4>
                <p><strong>Action:</strong> Transfer the cooled mixed acid to an addition funnel. Position above the flask.</p>
                <p><strong>Addition procedure (MOST CRITICAL STEP):</strong></p>
                <ol style="margin: 8px 0; padding-left: 20px;">
                    <li>Begin adding acid mixture <span class="hover-comment">dropwise<span class="comment-tooltip">"Dropwise" means approximately 1 drop every 2-3 seconds. This is VERY slow. The entire addition should take 30-60 minutes. YES, this is tedious. YES, it is absolutely necessary for safety.</span></span></li>
                    <li>Watch thermometer constantly. Keep temperature 15-30°C</li>
                    <li>If temperature approaches 30°C: STOP addition, let cool 5 minutes, then resume</li>
                    <li>The addition should take 30-60 minutes total</li>
                    <li>Refresh ice as needed</li>
                </ol>
                <p><strong>Visual cues:</strong> Color shifts from colorless to pale yellow to orange-yellow. Two layers become less distinct as reaction proceeds.</p>
            </div>

            <div class="procedure-step" data-step="5">
                <h4>Continue Reaction at Elevated Temperature</h4>
                <p><strong>Action:</strong> After all acid is added, remove ice bath. Allow to warm to room temperature, then heat gently to 30-45°C.</p>
                <p><strong>Procedure:</strong></p>
                <ol style="margin: 8px 0; padding-left: 20px;">
                    <li>Remove ice bath, let warm naturally (~15 minutes)</li>
                    <li>Turn on heating to low, raise to 30-45°C</li>
                    <li>Hold at this temperature for 1.5-2 hours with stirring</li>
                    <li>You should see brown-orange organic layer and spent acid layer</li>
                </ol>
                <p><strong>Why this step:</strong> Elevated temperature ensures complete conversion.</p>
            </div>

            <div class="procedure-step" data-step="6">
                <h4>Quench and Initial Separation</h4>
                <p><strong>Action:</strong> Cool to room temperature. Pour into separatory funnel containing 100 mL ice water.</p>
                <p><strong>Detailed procedure:</strong></p>
                <ol style="margin: 8px 0; padding-left: 20px;">
                    <li>Cool flask to room temperature (~15 minutes)</li>
                    <li>Prepare 100 mL ice-cold water in separatory funnel</li>
                    <li>Slowly pour reaction mixture into the water</li>
                    <li>Shake gently, vent pressure</li>
                    <li>Let layers separate (2-5 minutes)</li>
                    <li>Organic layer (nitrotoluene) will be on TOP (less dense)</li>
                    <li>Drain BOTTOM aqueous acid layer into waste</li>
                </ol>
            </div>

            <div class="procedure-step" data-step="7">
                <h4>Wash with Sodium Carbonate Solution</h4>
                <p><strong>Action:</strong> Wash the organic layer with 5% sodium carbonate solution.</p>
                <p><strong>Procedure:</strong></p>
                <ol style="margin: 8px 0; padding-left: 20px;">
                    <li>Prepare 5% Na₂CO₃ solution (5 g Na₂CO₃ in 100 mL water)</li>
                    <li>Add 50 mL to separatory funnel with product</li>
                    <li>Shake GENTLY - there will be CO₂ gas evolution (fizzing)</li>
                    <li>VENT frequently (point away from face)</li>
                    <li>Shake and vent 5-6 times until fizzing stops</li>
                    <li>Drain bottom aqueous layer</li>
                    <li>Repeat with fresh 50 mL Na₂CO₃ solution</li>
                    <li>Final wash with 50 mL plain water</li>
                </ol>
            </div>

            <div class="procedure-step" data-step="8">
                <h4>Dry the Product</h4>
                <p><strong>Action:</strong> Remove water using anhydrous calcium chloride.</p>
                <p><strong>Procedure:</strong></p>
                <ol style="margin: 8px 0; padding-left: 20px;">
                    <li>Drain washed nitrotoluene into clean, dry flask</li>
                    <li>Add ~5 g anhydrous calcium chloride</li>
                    <li>Swirl occasionally for 20-30 minutes</li>
                    <li><span class="hover-comment">If CaCl₂ clumps<span class="comment-tooltip">Clumping means it's absorbed water and is saturated. Add another 2-3 g fresh CaCl₂ and wait 15 more minutes</span></span>, add more and wait longer</li>
                    <li>When CaCl₂ remains powdery, drying is complete</li>
                    <li>Filter through paper to remove CaCl₂</li>
                    <li>Product should be clear pale yellow to orange oil</li>
                </ol>
            </div>

            <div class="procedure-step" data-step="9">
                <h4>Optional: Isomer Separation</h4>
                <p><strong>Action:</strong> To get pure para-nitrotoluene, separate by freezing.</p>
                <p><strong>Procedure:</strong></p>
                <ol style="margin: 8px 0; padding-left: 20px;">
                    <li>Transfer dried product to small beaker</li>
                    <li>Place in freezer (-20°C) for 2-4 hours</li>
                    <li>Para-nitrotoluene will crystallize (yellow crystals, mp 51°C)</li>
                    <li>Filter cold on pre-chilled Buchner funnel</li>
                    <li>Wash with ice-cold petroleum ether</li>
                    <li>Filtrate contains mostly ortho-nitrotoluene (liquid)</li>
                </ol>
            </div>
        </div>

        <div class="protocol-section">
            <h2><i class="fas fa-clipboard-check"></i> Expected Results & Quality Check</h2>
            
            <h3>Yield</h3>
            <ul>
                <li><strong>Theoretical:</strong> ~74 g nitrotoluene (100%)</li>
                <li><strong>Typical actual:</strong> 52-59 g (70-80% yield)</li>
                <li><strong>If low (<60%):</strong> Incomplete reaction, product loss during washing, or overheating side reactions</li>
            </ul>

            <h3>Physical Properties</h3>
            <ul>
                <li><strong>Appearance:</strong> Pale yellow to orange oil</li>
                <li><strong>Odor:</strong> Aromatic, almond-like (don't deliberately sniff - toxic!)</li>
                <li><strong>Density:</strong> ~1.16 g/mL (denser than water)</li>
                <li><strong>Boiling point:</strong> Ortho: 222°C, Para: 238°C</li>
            </ul>
        </div>

        <div class="protocol-section">
            <h2><i class="fas fa-recycle"></i> Waste Disposal</h2>
            
            <div class="caution-box">
                <div class="callout-header">
                    <i class="fas fa-exclamation-circle"></i>
                    CPCB Compliant Disposal
                </div>
                <p><strong>Acidic waste:</strong></p>
                <ul style="margin: 0; padding-left: 20px;">
                    <li>Collect in designated acid waste container</li>
                    <li>Neutralize with solid sodium carbonate until pH 6-8</li>
                    <li>Dispose per local CPCB guidelines</li>
                    <li>NEVER pour concentrated acids down drain</li>
                </ul>
                
                <p><strong>Organic waste:</strong></p>
                <ul style="margin: 0; padding-left: 20px;">
                    <li>Collect in organic waste container (away from acids)</li>
                    <li>Label clearly with contents</li>
                    <li>Dispose through hazardous waste program</li>
                </ul>
            </div>
        </div>

        <div class="protocol-section">
            <h2><i class="fas fa-wrench"></i> Troubleshooting Guide</h2>
            
            <h3>Temperature rose above 30°C during addition</h3>
            <p><strong>Solution:</strong> Stop immediately. Add fresh ice. Wait until 15-20°C. Resume more slowly.</p>
            
            <h3>Dark brown or black color</h3>
            <p><strong>Cause:</strong> Overheating causing oxidation and side reactions. Product may still be usable but lower quality.</p>
            
            <h3>Very low yield (<50%)</h3>
            <p><strong>Possible causes:</strong> Reaction time too short, acids not concentrated enough, product lost in washing, or water contamination.</p>
            
            <h3>No crystals when freezing</h3>
            <p><strong>Solution:</strong> Try seeding with tiny crystal, cool to -78°C (dry ice), or accept mixed product.</p>
        </div>

        <div class="protocol-section" style="border-top: 2px solid #e5e7eb; padding-top: 24px; margin-top: 32px;">
            <p style="font-size: 13px; color: #6b7280; line-height: 1.6;">
                <strong>Procedure generated by AI Lab Copilot</strong><br>
                Sources: PubChem, Organic Syntheses, Sciencemadness community procedures, CPCB safety guidelines<br>
                Last updated: ${today}<br>
                <em>This procedure assumes basic laboratory skills. If unfamiliar with any technique, consult with an experienced chemist before proceeding.</em>
            </p>
        </div>

        <div class="protocol-section cost-analysis">
            <h2><i class="fas fa-calculator"></i> Cost Analysis & Economic Feasibility</h2>
            
            <div class="cost-summary">
                <h3>💰 Financial Overview</h3>
                <div class="cost-metrics">
                    <div class="cost-metric">
                        <span class="metric-label">Total Cost per kg Product</span>
                        <span class="metric-value" id="total-cost-per-kg">₹93</span>
                    </div>
                    <div class="cost-metric">
                        <span class="metric-label">Target Selling Price</span>
                        <span class="metric-value" id="target-price">₹1,200/kg</span>
                    </div>
                    <div class="cost-metric">
                        <span class="metric-label">Gross Margin</span>
                        <span class="metric-value" id="gross-margin">92.3%</span>
                    </div>
                    <div class="cost-metric">
                        <span class="metric-label">Monthly Revenue Potential</span>
                        <span class="metric-value" id="monthly-revenue">₹60,000</span>
                    </div>
                </div>
            </div>

            <div class="cost-breakdown">
                <h3>📊 Detailed Cost Breakdown (per kg product)</h3>
                <div class="cost-item">
                    <span>Starting Material (Toluene)</span>
                    <span id="material-cost">₹45</span>
                </div>
                <div class="cost-item">
                    <span>Reagents (H₂SO₄, HNO₃, etc.)</span>
                    <span id="reagent-cost-display">₹25</span>
                </div>
                <div class="cost-item">
                    <span>Utilities (Steam, Electricity, Water)</span>
                    <span id="utility-cost-display">₹15</span>
                </div>
                <div class="cost-item">
                    <span>Labor Cost</span>
                    <span id="labor-cost-display">₹8</span>
                </div>
                <div class="cost-item total">
                    <span><strong>Total Cost per kg</strong></span>
                    <span><strong id="total-cost-display">₹93</strong></span>
                </div>
            </div>

            <div class="economic-analysis">
                <h3>📈 Economic Analysis</h3>
                <div class="analysis-grid">
                    <div class="analysis-item">
                        <h4>Profitability</h4>
                        <p><strong>Profit per kg:</strong> ₹1,107</p>
                        <p><strong>ROI:</strong> 1,190%</p>
                        <p><strong>Payback Period:</strong> 0.3 months</p>
                    </div>
                    <div class="analysis-item">
                        <h4>Production Economics</h4>
                        <p><strong>Batch Size:</strong> 50 kg</p>
                        <p><strong>Batches per Month:</strong> 1</p>
                        <p><strong>Monthly Profit:</strong> ₹55,350</p>
                    </div>
                    <div class="analysis-item">
                        <h4>Market Position</h4>
                        <p><strong>Market Price Range:</strong> ₹1,000-1,400/kg</p>
                        <p><strong>Our Position:</strong> Competitive</p>
                        <p><strong>Quality Premium:</strong> High purity advantage</p>
                    </div>
                </div>
            </div>

            <div class="cost-validation">
                <h3>⚠️ Cost Sanity Check</h3>
                <div class="validation-results">
                    <div class="validation-item valid">
                        <i class="fas fa-check-circle"></i>
                        <span>Cost structure is realistic and competitive</span>
                    </div>
                    <div class="validation-item valid">
                        <i class="fas fa-check-circle"></i>
                        <span>Raw material costs align with current market prices</span>
                    </div>
                    <div class="validation-item valid">
                        <i class="fas fa-check-circle"></i>
                        <span>Target selling price is within market range</span>
                    </div>
                    <div class="validation-item valid">
                        <i class="fas fa-check-circle"></i>
                        <span>Gross margin of 92.3% is sustainable for specialty chemicals</span>
                    </div>
                </div>
            </div>

            <div class="recommendations">
                <h3>💡 Business Recommendations</h3>
                <ul>
                    <li><strong>Proceed with project:</strong> Strong economic viability with excellent ROI</li>
                    <li><strong>Focus on quality:</strong> High purity commands premium pricing</li>
                    <li><strong>Scale gradually:</strong> Start with 50kg batches, scale to 200kg monthly</li>
                    <li><strong>Market positioning:</strong> Target pharmaceutical and fragrance industries</li>
                    <li><strong>Cost monitoring:</strong> Track raw material price fluctuations monthly</li>
                </ul>
            </div>
        </div>
    `;
}

// ====================================
// Results Logging System Functions
// ====================================

function showResultsForm() {
    labCopilotState.showingResultsForm = true;
    
    // Replace chat panel with results form
    const chatPanel = document.querySelector('.chat-panel');
    if (chatPanel) {
        chatPanel.innerHTML = generateResultsForm();
        
        // Add event listeners for the form
        setupResultsFormHandlers();
        
        // Start AI questioning sequence
        setTimeout(() => {
            startAIQuestioning();
        }, 1000);
    }
}

// ====================================
// Cost Analysis Functions
// ====================================

function updateCostAnalysis() {
    // Get form data
    const formData = getFormData();
    
    // Calculate costs
    const costAnalysis = calculateCostAnalysis(formData);
    
    // Update display
    updateCostDisplay(costAnalysis);
    
    // Validate costs
    validateCosts(costAnalysis);
}

function getFormData() {
    // Get cost assumptions from data.js
    const costData = fakeData.companyContext.costAssumptions;
    
    return {
        startingMaterialPrice: parseFloat(document.getElementById('starting-material-price')?.value || costData.toluene.price),
        reagentCost: parseFloat(document.getElementById('reagent-cost')?.value || (costData.sulfuricAcid.price + costData.nitricAcid.price) / 2),
        targetProductPrice: parseFloat(document.getElementById('target-product-price')?.value || costData.nitrotoluene.price),
        batchSize: parseFloat(document.getElementById('batch-size')?.value || 50),
        utilityCost: parseFloat(document.getElementById('utility-cost')?.value || (costData.steam.cost + costData.electricity.cost + costData.water.cost)),
        laborCost: parseFloat(document.getElementById('labor-cost')?.value || costData.labor.cost)
    };
}

function calculateCostAnalysis(formData) {
    const {
        startingMaterialPrice,
        reagentCost,
        targetProductPrice,
        batchSize,
        utilityCost,
        laborCost
    } = formData;
    
    // Calculate total cost per kg
    const totalCostPerKg = startingMaterialPrice + reagentCost + utilityCost + laborCost;
    
    // Calculate profit per kg
    const profitPerKg = targetProductPrice - totalCostPerKg;
    
    // Calculate gross margin percentage
    const grossMargin = (profitPerKg / targetProductPrice) * 100;
    
    // Calculate monthly revenue (assuming 1 batch per month)
    const monthlyRevenue = targetProductPrice * batchSize;
    
    // Calculate monthly profit
    const monthlyProfit = profitPerKg * batchSize;
    
    // Calculate ROI (assuming this is a one-time investment)
    const roi = (profitPerKg / totalCostPerKg) * 100;
    
    // Calculate payback period (in months)
    const paybackPeriod = totalCostPerKg / profitPerKg;
    
    return {
        totalCostPerKg,
        targetProductPrice,
        grossMargin,
        monthlyRevenue,
        monthlyProfit,
        roi,
        paybackPeriod,
        startingMaterialPrice,
        reagentCost,
        utilityCost,
        laborCost,
        batchSize
    };
}

function updateCostDisplay(costAnalysis) {
    // Update cost metrics
    const elements = {
        'total-cost-per-kg': `₹${costAnalysis.totalCostPerKg.toFixed(0)}`,
        'target-price': `₹${costAnalysis.targetProductPrice.toFixed(0)}/kg`,
        'gross-margin': `${costAnalysis.grossMargin.toFixed(1)}%`,
        'monthly-revenue': `₹${(costAnalysis.monthlyRevenue / 1000).toFixed(0)}K`,
        'material-cost': `₹${costAnalysis.startingMaterialPrice.toFixed(0)}`,
        'reagent-cost-display': `₹${costAnalysis.reagentCost.toFixed(0)}`,
        'utility-cost-display': `₹${costAnalysis.utilityCost.toFixed(0)}`,
        'labor-cost-display': `₹${costAnalysis.laborCost.toFixed(0)}`,
        'total-cost-display': `₹${costAnalysis.totalCostPerKg.toFixed(0)}`
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    });
    
    // Update economic analysis section
    updateEconomicAnalysis(costAnalysis);
}

function updateEconomicAnalysis(costAnalysis) {
    const profitPerKg = costAnalysis.targetProductPrice - costAnalysis.totalCostPerKg;
    
    // Update profitability section
    const profitabilitySection = document.querySelector('.analysis-item h4');
    if (profitabilitySection) {
        const profitabilityDiv = profitabilitySection.parentElement;
        profitabilityDiv.innerHTML = `
            <h4>Profitability</h4>
            <p><strong>Profit per kg:</strong> ₹${profitPerKg.toFixed(0)}</p>
            <p><strong>ROI:</strong> ${costAnalysis.roi.toFixed(0)}%</p>
            <p><strong>Payback Period:</strong> ${costAnalysis.paybackPeriod.toFixed(1)} months</p>
        `;
    }
    
    // Update production economics section
    const productionSection = document.querySelectorAll('.analysis-item')[1];
    if (productionSection) {
        productionSection.innerHTML = `
            <h4>Production Economics</h4>
            <p><strong>Batch Size:</strong> ${costAnalysis.batchSize} kg</p>
            <p><strong>Batches per Month:</strong> 1</p>
            <p><strong>Monthly Profit:</strong> ₹${(costAnalysis.monthlyProfit / 1000).toFixed(0)}K</p>
        `;
    }
}

function validateCosts(costAnalysis) {
    const validationContainer = document.querySelector('.validation-results');
    if (!validationContainer) return;
    
    const validations = [];
    
    // Check if costs are realistic
    if (costAnalysis.totalCostPerKg < costAnalysis.targetProductPrice * 0.1) {
        validations.push({
            valid: false,
            message: 'Costs seem too low - verify raw material prices',
            icon: 'fas fa-exclamation-triangle'
        });
    } else {
        validations.push({
            valid: true,
            message: 'Cost structure is realistic and competitive',
            icon: 'fas fa-check-circle'
        });
    }
    
    // Check gross margin
    if (costAnalysis.grossMargin < 50) {
        validations.push({
            valid: false,
            message: 'Gross margin is low - consider increasing selling price or reducing costs',
            icon: 'fas fa-exclamation-triangle'
        });
    } else {
        validations.push({
            valid: true,
            message: `Gross margin of ${costAnalysis.grossMargin.toFixed(1)}% is sustainable for specialty chemicals`,
            icon: 'fas fa-check-circle'
        });
    }
    
    // Check if selling price is reasonable
    if (costAnalysis.targetProductPrice < costAnalysis.totalCostPerKg * 1.5) {
        validations.push({
            valid: false,
            message: 'Selling price may be too low for sustainable margins',
            icon: 'fas fa-exclamation-triangle'
        });
    } else {
        validations.push({
            valid: true,
            message: 'Target selling price is within market range',
            icon: 'fas fa-check-circle'
        });
    }
    
    // Check raw material costs
    if (costAnalysis.startingMaterialPrice < 20 || costAnalysis.startingMaterialPrice > 100) {
        validations.push({
            valid: false,
            message: 'Starting material price seems unrealistic - verify with suppliers',
            icon: 'fas fa-exclamation-triangle'
        });
    } else {
        validations.push({
            valid: true,
            message: 'Raw material costs align with current market prices',
            icon: 'fas fa-check-circle'
        });
    }
    
    // Update validation display
    validationContainer.innerHTML = validations.map(validation => `
        <div class="validation-item ${validation.valid ? 'valid' : 'invalid'}">
            <i class="${validation.icon}"></i>
            <span>${validation.message}</span>
        </div>
    `).join('');
}

// Add real-time cost calculation listeners
function addCostCalculationListeners() {
    const costInputs = [
        'starting-material-price',
        'reagent-cost',
        'target-product-price',
        'batch-size',
        'utility-cost',
        'labor-cost'
    ];
    
    costInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.addEventListener('input', () => {
                updateCostAnalysis();
            });
        }
    });
}

function generateResultsForm() {
    const currentDate = new Date().toLocaleDateString('en-IN');
    const currentTime = new Date().toLocaleTimeString('en-IN', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    return `
        <div class="results-form-container">
            <div class="results-form-header">
                <button class="back-to-chat-btn" onclick="hideResultsForm()">
                    <i class="fas fa-arrow-left"></i>
                    Back to Chat
                </button>
                <h3>📊 Log Experimental Results</h3>
                <p>Record your actual lab outcomes for comprehensive tracking and analysis</p>
            </div>
            
            <form id="results-form" class="results-form">
                <!-- Batch Information Section -->
                <div class="results-section">
                    <h4><i class="fas fa-barcode"></i> Batch Information</h4>
                    
                    <div class="form-field">
                        <label for="batch-id">Batch ID</label>
                        <input type="text" id="batch-id" value="BATCH-NT-2024-001" readonly>
                        <span class="field-help">Auto-generated batch identifier</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="batch-date">Date & Time</label>
                        <input type="text" id="batch-date" value="${currentDate} at ${currentTime}" readonly>
                        <span class="field-help">Experiment completion timestamp</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="operator-name">Operator Name</label>
                        <input type="text" id="operator-name" value="Dr. Anjali Sharma">
                        <span class="field-help">Lead scientist conducting experiment</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="material-lot">Starting Material Lot #</label>
                        <input type="text" id="material-lot" value="TL-2024-045">
                        <span class="field-help">Toluene lot number for traceability</span>
                    </div>
                </div>
                
                <!-- Reaction Performance Section -->
                <div class="results-section">
                    <h4><i class="fas fa-chart-line"></i> Reaction Performance</h4>
                    
                    <div class="form-field">
                        <label for="actual-yield">Actual Yield</label>
                        <input type="text" id="actual-yield" value="89.5%">
                        <span class="field-help">Measured product yield percentage</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="theoretical-yield">Theoretical Yield</label>
                        <input type="text" id="theoretical-yield" value="100%" readonly>
                        <span class="field-help">Maximum possible yield (calculated)</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="purity-hplc">Purity (HPLC)</label>
                        <input type="text" id="purity-hplc" value="98.2%">
                        <span class="field-help">HPLC purity analysis result</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="appearance">Color/Appearance</label>
                        <input type="text" id="appearance" value="Pale yellow oil">
                        <span class="field-help">Visual product characteristics</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="reaction-time">Reaction Time</label>
                        <input type="text" id="reaction-time" value="3.5 hours">
                        <span class="field-help">Total reaction duration</span>
                    </div>
                </div>
                
                <!-- Process Deviations Section -->
                <div class="results-section">
                    <h4><i class="fas fa-exclamation-triangle"></i> Process Deviations</h4>
                    
                    <div class="form-field">
                        <label for="temp-variance">Temperature Variance</label>
                        <input type="text" id="temp-variance" value="±2°C from target">
                        <span class="field-help">Temperature control deviations</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="timing-changes">Timing Changes</label>
                        <input type="text" id="timing-changes" value="None">
                        <span class="field-help">Any timing modifications made</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="material-substitutions">Material Substitutions</label>
                        <input type="text" id="material-substitutions" value="None">
                        <span class="field-help">Any material changes from procedure</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="issues-encountered">Issues Encountered</label>
                        <input type="text" id="issues-encountered" value="Minor foaming during acid addition">
                        <span class="field-help">Problems or challenges faced</span>
                    </div>
                </div>
                
                <!-- Quality Metrics Section -->
                <div class="results-section">
                    <h4><i class="fas fa-microscope"></i> Quality Metrics</h4>
                    
                    <div class="form-field">
                        <label for="hplc-retention">HPLC Retention Time</label>
                        <input type="text" id="hplc-retention" value="12.3 min">
                        <span class="field-help">HPLC retention time for product peak</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="gcms-confirmation">GC-MS Confirmation</label>
                        <input type="text" id="gcms-confirmation" value="✓ Structure confirmed">
                        <span class="field-help">GC-MS structural confirmation</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="impurity-profile">Impurity Profile</label>
                        <input type="text" id="impurity-profile" value="<1.5% total">
                        <span class="field-help">Total impurity content</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="meets-spec">Meets Specification?</label>
                        <select id="meets-spec">
                            <option value="yes" selected>✓ Yes</option>
                            <option value="no">✗ No</option>
                            <option value="marginal">⚠ Marginal</option>
                        </select>
                        <span class="field-help">Does product meet quality specifications</span>
                    </div>
                </div>
                
                <!-- Cost Analysis Section -->
                <div class="results-section">
                    <h4><i class="fas fa-rupee-sign"></i> Cost Analysis</h4>
                    
                    <div class="form-field">
                        <label for="raw-material-cost">Raw Material Cost</label>
                        <input type="text" id="raw-material-cost" value="₹3,250">
                        <span class="field-help">Cost of starting materials used</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="utilities-cost">Utilities Cost</label>
                        <input type="text" id="utilities-cost" value="₹480">
                        <span class="field-help">Electricity, steam, cooling costs</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="labor-hours">Labor Hours</label>
                        <input type="text" id="labor-hours" value="4.5 hours">
                        <span class="field-help">Total labor time invested</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="total-batch-cost">Total Batch Cost</label>
                        <input type="text" id="total-batch-cost" value="₹3,730" readonly>
                        <span class="field-help">Calculated total cost (auto-calculated)</span>
                    </div>
                    
                    <div class="form-field">
                        <label for="cost-per-kg">Cost per kg</label>
                        <input type="text" id="cost-per-kg" value="₹74,600/kg" readonly>
                        <span class="field-help">Cost per kg of product (auto-calculated)</span>
                    </div>
                </div>
                
                <!-- Observations & Notes Section -->
                <div class="results-section">
                    <h4><i class="fas fa-sticky-note"></i> Observations & Notes</h4>
                    
                    <div class="form-field">
                        <label for="observations">Detailed Observations</label>
                        <textarea id="observations" rows="4">Excellent batch. Slight foaming controlled by slower addition rate. Product quality exceeds specification. Recommend this procedure for production scale-up.</textarea>
                        <span class="field-help">Detailed notes about the experiment, observations, and recommendations</span>
                    </div>
                </div>
                
                <!-- AI Chat Section -->
                <div class="ai-chat-section" id="ai-chat-section">
                    <div class="ai-chat-header">
                        <i class="fas fa-robot"></i>
                        <span>AI Lab Assistant</span>
                        <div class="question-progress" id="question-progress">Question 1 of 3</div>
                    </div>
                    <div class="ai-chat-messages" id="ai-chat-messages">
                        <!-- AI questions will appear here -->
                    </div>
                    <div class="ai-chat-input" id="ai-chat-input" style="display: none;">
                        <input type="text" id="ai-response-input" placeholder="Type your response...">
                        <button id="ai-send-response"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
                
                <!-- Form Actions -->
                <div class="results-form-actions">
                    <button type="submit" class="submit-results-btn">
                        <i class="fas fa-save"></i>
                        Submit Results
                    </button>
                </div>
            </form>
        </div>
    `;
}

function setupResultsFormHandlers() {
    // Form submission handler
    const resultsForm = document.getElementById('results-form');
    if (resultsForm) {
        resultsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            submitResults();
        });
    }
    
    // AI response input handler
    const aiResponseInput = document.getElementById('ai-response-input');
    const aiSendResponse = document.getElementById('ai-send-response');
    
    if (aiResponseInput && aiSendResponse) {
        aiSendResponse.addEventListener('click', () => handleAIResponse());
        aiResponseInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleAIResponse();
        });
    }
}

function startAIQuestioning() {
    labCopilotState.aiQuestionIndex = 0;
    showAIQuestion(0);
}

function showAIQuestion(index) {
    const questions = [
        {
            text: "I'm reviewing your data. Let me ask a few clarifying questions...",
            type: "intro"
        },
        {
            text: "You mentioned 'minor foaming' - did this affect the yield or purity? Should we add a caution note to the procedure?",
            type: "question",
            options: ["No impact on yield/purity", "Slight yield reduction", "Purity affected", "Add caution note"]
        },
        {
            text: "Your purity is excellent at 98.2%. Did you use the same analytical method specified in the procedure?",
            type: "question",
            options: ["Yes, same method", "Modified method", "Different column", "Calibrated differently"]
        },
        {
            text: "Cost per kg seems higher than projected. Is this due to raw material price increases or batch size?",
            type: "question",
            options: ["Raw material price increase", "Small batch size", "Labor intensive", "Utilities cost"]
        },
        {
            text: "Perfect! I have all the information needed. Ready to save?",
            type: "conclusion"
        }
    ];
    
    const aiChatMessages = document.getElementById('ai-chat-messages');
    const questionProgress = document.getElementById('question-progress');
    const aiChatInput = document.getElementById('ai-chat-input');
    
    if (index < questions.length) {
        const question = questions[index];
        
        // Update progress
        if (index > 0) {
            questionProgress.textContent = `Question ${index} of 3`;
        }
        
        // Add AI message
        const messageDiv = document.createElement('div');
        messageDiv.className = 'ai-message';
        messageDiv.innerHTML = `
            <div class="ai-message-content">${question.text}</div>
            <div class="ai-message-time">${new Date().toLocaleTimeString()}</div>
        `;
        aiChatMessages.appendChild(messageDiv);
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
        
        // Show input if it's a question
        if (question.type === 'question') {
            aiChatInput.style.display = 'flex';
            aiChatInput.querySelector('input').focus();
        } else if (question.type === 'conclusion') {
            aiChatInput.style.display = 'none';
        }
    }
}

function handleAIResponse() {
    const aiResponseInput = document.getElementById('ai-response-input');
    const response = aiResponseInput.value.trim();
    
    if (!response) return;
    
    // Add user response to chat
    const aiChatMessages = document.getElementById('ai-chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'user-message';
    messageDiv.innerHTML = `
        <div class="user-message-content">${response}</div>
        <div class="user-message-time">${new Date().toLocaleTimeString()}</div>
    `;
    aiChatMessages.appendChild(messageDiv);
    aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    
    aiResponseInput.value = '';
    
    // Move to next question
    labCopilotState.aiQuestionIndex++;
            setTimeout(() => {
        showAIQuestion(labCopilotState.aiQuestionIndex);
    }, 1000);
}

function submitResults() {
    // Show saving animation
    const submitBtn = document.querySelector('.submit-results-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving results...';
    submitBtn.disabled = true;
    
    // Simulate save delay
                    setTimeout(() => {
        // Add to results history
        const batchData = {
            id: 'BATCH-NT-2024-001',
            date: new Date().toLocaleDateString('en-IN'),
            yield: 89.5,
            purity: 98.2,
            status: 'meets-spec',
            cost: 3730
        };
        
        labCopilotState.resultsHistory.unshift(batchData);
        
        // Show success message
        submitBtn.innerHTML = '<i class="fas fa-check"></i> ✓ Saved Successfully';
        submitBtn.style.background = '#10b981';
        
                        setTimeout(() => {
            hideResultsForm();
            addResultsHistoryToProtocol();
        }, 1500);
    }, 2000);
}

function hideResultsForm() {
    labCopilotState.showingResultsForm = false;
    
    // Restore chat panel
    const chatPanel = document.querySelector('.chat-panel');
    if (chatPanel) {
        chatPanel.innerHTML = `
            <div class="chat-header">
                <h3>Lab Copilot Assistant</h3>
                <div class="chat-status">
                    <span class="status-indicator online"></span>
                    AI Researcher Active
                </div>
            </div>
            
            <div class="chat-container">
                <div class="chat-messages" id="lab-chat">
                    <!-- Chat messages will be populated by JS -->
                </div>
                <div class="chat-input">
                    <input type="text" id="lab-input" placeholder="Ask me to generate procedures, add safety notes, or clarify any step...">
                    <button id="lab-send"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
        `;
        
        // Re-initialize chat
        const labChat = document.getElementById('lab-chat');
        if (labChat) {
            labChat.innerHTML = '';
            addChatMessage({
                type: 'assistant',
                content: '✓ Results logged successfully! Your experiment data has been saved and added to the results history. You can now ask me about modifications, scaling up, or any other questions about your synthesis.',
                timestamp: new Date().toISOString()
            });
        }
        
        // Re-attach chat handlers
        const labInput = document.getElementById('lab-input');
        const labSend = document.getElementById('lab-send');
        
        if (labInput && labSend) {
            labSend.addEventListener('click', () => handleUserMessage());
            labInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleUserMessage();
            });
        }
    }
}

function addResultsHistoryToProtocol() {
    const protocolArea = document.getElementById('protocol-editor-area');
    if (protocolArea) {
        const existingContent = protocolArea.innerHTML;
        const resultsHistory = generateResultsHistory();
        
        protocolArea.innerHTML = existingContent + resultsHistory;
    }
}

function generateResultsHistory() {
    return `
        <div class="results-history-section">
            <div class="results-history-header">
                <h2><i class="fas fa-chart-bar"></i> Results History</h2>
                <div class="history-toggle">
                    <span class="history-count">3 experiments logged</span>
                    <i class="fas fa-chevron-down" id="history-toggle-icon"></i>
                </div>
            </div>
            
            <div class="results-history-content" id="results-history-content">
                <div class="result-card">
                    <div class="result-card-header">
                        <div class="batch-info">
                            <h4>BATCH-NT-2024-001</h4>
                            <span class="batch-date">${new Date().toLocaleDateString('en-IN')}</span>
                        </div>
                        <div class="result-metrics">
                            <div class="yield-metric yield-excellent">89.5%</div>
                            <div class="purity-metric">98.2%</div>
                            <div class="status-badge status-good">✓ Meets Spec</div>
                        </div>
                        <button class="view-details-btn" onclick="expandResultsCard('BATCH-NT-2024-001')">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    </div>
                </div>
                
                <div class="result-card">
                    <div class="result-card-header">
                        <div class="batch-info">
                            <h4>BATCH-NT-2023-042</h4>
                            <span class="batch-date">15/12/2023</span>
                        </div>
                        <div class="result-metrics">
                            <div class="yield-metric yield-excellent">91.2%</div>
                            <div class="purity-metric">97.8%</div>
                            <div class="status-badge status-good">✓ Meets Spec</div>
                        </div>
                        <button class="view-details-btn" onclick="expandResultsCard('BATCH-NT-2023-042')">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    </div>
                </div>
                
                <div class="result-card">
                    <div class="result-card-header">
                        <div class="batch-info">
                            <h4>BATCH-NT-2023-038</h4>
                            <span class="batch-date">28/11/2023</span>
                        </div>
                        <div class="result-metrics">
                            <div class="yield-metric yield-poor">78.5%</div>
                            <div class="purity-metric">96.5%</div>
                            <div class="status-badge status-warning">⚠ Below Spec</div>
                        </div>
                        <button class="view-details-btn" onclick="expandResultsCard('BATCH-NT-2023-038')">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function expandResultsCard(batchId) {
    // This would expand the card to show full details
    // For demo purposes, just show an alert
    alert(`Full details for ${batchId}:\n\nYield: 89.5%\nPurity: 98.2%\nCost: ₹3,730\nStatus: Meets Specification\n\nNotes: Excellent batch. Slight foaming controlled by slower addition rate. Product quality exceeds specification.`);
}
