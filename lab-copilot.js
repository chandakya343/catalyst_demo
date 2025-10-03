// Lab Copilot - Nitrotoluene Synthesis Protocol Generator
// Designed for "dumbest person" - maximum detail and safety

document.addEventListener('DOMContentLoaded', () => {
    initializeLabCopilot();
});

function initializeLabCopilot() {
    const protocolArea = document.getElementById('protocol-editor-area');
    if (!protocolArea) return;
    
    protocolArea.innerHTML = generateNitrotolueneSynthesisProcedure();
    
    // Initialize chat with user question and AI response
    const labChat = document.getElementById('lab-chat');
    if (labChat) {
        labChat.innerHTML = '';
        
        // User question
        const userMessage = {
            type: 'user',
            content: 'Give me a preparation for my lab for 4-O-nitrotolidine. I need the complete procedure with safety notes.',
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
        labChat.appendChild(userDiv);
        
        // AI response
        const aiMessage = {
            type: 'assistant',
            content: 'I\'ve generated a complete nitrotoluene synthesis procedure based on the most common lab-scale method. The procedure includes:\n\n✓ Detailed step-by-step instructions\n✓ Safety warnings and cautions (highlighted in red/yellow boxes)\n✓ Hover over blue underlined text for additional context\n✓ All measurements and timing specified\n✓ Troubleshooting guide included\n\nFeel free to ask me to:\n• Add more safety details to any step\n• Clarify anything that\'s unclear\n• Modify quantities or timing\n• Add troubleshooting notes',
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
        labChat.appendChild(aiDiv);
    }
    
    // Regenerate button handler
    const regenerateBtn = document.getElementById('regenerate-btn');
    if (regenerateBtn) {
        regenerateBtn.addEventListener('click', () => {
            showResearchOverlay();
        });
    }
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
    `;
}

// Regenerate functionality
function showResearchOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'research-overlay';
    overlay.innerHTML = `
        <div class="research-container">
            <div class="research-header">
                <h3><i class="fas fa-robot"></i> AI Researching & Generating Procedure</h3>
                <button class="research-close"><i class="fas fa-times"></i></button>
            </div>
            <div class="research-content">
                <div class="research-query">
                    <h4>RESEARCH QUERY</h4>
                    <p>Generate detailed nitrotoluene synthesis procedure for Indian SME lab with complete safety protocols</p>
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
    
    animateResearchSteps();
}

function animateResearchSteps() {
    const steps = [
        { title: 'Analyzing Query Requirements', details: 'Understanding context: Lab-scale synthesis for maximum detail and safety emphasis.', delay: 800 },
        { title: 'Searching Chemical Databases', details: 'Accessing PubChem, Organic Syntheses, Sciencemadness community procedures.', delay: 1500 },
        { title: 'Compiling Safety Protocols', details: 'Cross-referencing CPCB guidelines, OSHA standards, Indian lab requirements.', delay: 1200 },
        { title: 'Generating Step-by-Step Instructions', details: 'Creating detailed procedure with hover comments and troubleshooting notes.', delay: 1500 },
        { title: 'Adding Cautions & Warnings', details: 'Inserting critical safety warnings, temperature alerts, emergency procedures.', delay: 1000 },
        { title: 'Finalizing Document', details: 'Adding waste disposal, quality checks, troubleshooting guide.', delay: 1200 }
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
                            initializeLabCopilot();
                        }, 300);
                    }, 800);
                }
            }, step.delay);
        }, currentDelay);
        
        currentDelay += step.delay;
    });
}

