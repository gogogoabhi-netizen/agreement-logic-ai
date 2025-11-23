import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { contractText } = await req.json();
    
    if (!contractText || typeof contractText !== 'string') {
      return new Response(
        JSON.stringify({ error: 'Contract text is required' }), 
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Analyzing contract with AI...');

    const systemPrompt = `You are an Agreement Workflow Architect for Docusign Maestro-style workflows. You must analyze contracts using a multi-stage agentic approach:

STAGE 1: PREPROCESS & CHUNK
- Read the entire contract text carefully
- Identify major sections (parties, terms, obligations, SLAs, termination, etc.)
- Note any ambiguities or missing information

STAGE 2: EXTRACT ENTITIES
Extract ALL of these entities with maximum detail:
- PARTIES: Every organization or person mentioned with their role (Provider, Client, Data Processor, etc.)
- OBLIGATIONS: Every commitment, requirement, or deliverable with ID (OBL-001, OBL-002...), responsible party, deadline, and frequency
- DELIVERABLES: Specific outputs or products to be delivered
- SLAs: Service level agreements with metrics, targets, measurement periods, and penalties
- RENEWALS: Contract renewal dates, notice periods, auto-renewal status, special terms
- APPROVALS: Items requiring approval, who approves, and thresholds
- DATA FIELDS: Key data points like contract value, duration, effective dates, currencies

STAGE 3: DESIGN MAESTRO-STYLE WORKFLOW
Create a complete executable workflow:
- TRIGGERS: What events start the workflow (e.g., "Agreement executed", "SLA breach detected")
- STEPS: Detailed sequential steps with:
  * Unique IDs (STEP-001, STEP-002...)
  * Clear names and descriptions
  * Type: trigger, system_task, human_task, approval, recurring, or decision
  * Input/output fields
  * Assignee roles (Legal, Sales Ops, Finance, etc.)
  * Links to related obligations (OBL-IDs)
  * Next step IDs for flow
- BRANCHES: Conditional logic (e.g., "If approval rejected, return to STEP-003")
- PERMISSIONS: Role-based access (who can view, edit, approve)

STAGE 4: RECOMMEND INTEGRATIONS
Identify systems and mappings:
- SYSTEMS: CRM (Salesforce), ERP (Workday), Ticketing (ServiceNow), Finance systems
- ACTIONS: What to do in each system (e.g., "Create Contract Record in Salesforce on workflow start")
- FIELD MAPPINGS: Map contract fields to system fields (e.g., "Contract Value → Salesforce Opportunity Amount")

STAGE 5: RISK ASSESSMENT & SUMMARY
- RISKS: Identify compliance, operational, or financial risks with severity (low/medium/high)
- NOTES: Provide a comprehensive 3-4 sentence summary of the agreement and workflow

Return ONLY valid JSON matching this exact structure (no markdown, no extra keys):
{
  "entities": {
    "parties": [{"name": "string", "role": "string", "contact": "string"}],
    "obligations": [{"id": "string", "description": "string", "responsible": "string", "deadline": "string", "frequency": "string", "related_sla_id": "string"}],
    "deliverables": [{"name": "string", "due_date": "string", "format": "string", "owner": "string"}],
    "slas": [{"id": "string", "metric": "string", "target": "string", "measurement": "string", "penalty": "string"}],
    "renewals": [{"date": "string", "notice_period": "string", "auto_renew": boolean, "special_terms": "string"}],
    "approvals": [{"item": "string", "approver": "string", "threshold": "string"}],
    "data_fields": [{"name": "string", "value": "string", "type": "string"}]
  },
  "workflow_json": {
    "name": "string",
    "description": "string",
    "triggers": [{"event": "string", "action": "string"}],
    "steps": [{"id": "string", "name": "string", "type": "trigger|system_task|human_task|approval|recurring|decision", "description": "string", "input_fields": ["string"], "output_fields": ["string"], "linked_obligations": ["string"], "assignee_role": "string", "next_step_ids": ["string"]}],
    "branches": [{"condition": "string", "from_step_id": "string", "to_step_id": "string", "description": "string"}],
    "permissions": [{"role": "string", "allowed_actions": ["string"], "scope": "string"}]
  },
  "integrations": {
    "systems": [{"name": "string", "purpose": "string", "status": "Recommended|Optional|Existing"}],
    "actions": [{"system": "string", "action": "string", "trigger": "string"}],
    "field_mappings": [{"contract_field": "string", "system": "string", "system_field": "string"}]
  },
  "risks": [{"severity": "low|medium|high", "description": "string", "category": "string"}],
  "notes": "string"
}

Be thorough and precise. Extract every relevant detail and design a complete, actionable workflow.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this agreement and provide a complete structured analysis:\n\n${contractText}` }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }), 
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service credits exhausted. Please add credits to continue.' }), 
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Failed to analyze agreement' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error('No content in AI response');
      return new Response(
        JSON.stringify({ error: 'Invalid response from AI service' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse the JSON response from the AI
    let analysis;
    try {
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysis = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error('Failed to parse AI response as JSON:', parseError);
      console.error('AI response content:', content);
      return new Response(
        JSON.stringify({ error: 'Failed to parse analysis results' }), 
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Analysis completed successfully');
    
    return new Response(
      JSON.stringify({ analysis }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in analyze-agreement function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error occurred' }), 
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
