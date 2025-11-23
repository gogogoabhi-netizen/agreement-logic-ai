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

    const systemPrompt = `You are an expert contract and workflow analyst. Given an agreement or contract text, you must:

1. Extract ALL key entities: parties, obligations, deliverables, SLAs, renewals, approvals, and data fields
2. Design a comprehensive Maestro-style workflow with:
   - Clear triggers for starting the workflow
   - Detailed steps (trigger, system_task, human_task, approval, recurring, decision)
   - Conditional branches for different scenarios
   - Role-based permissions
3. Recommend integration systems and field mappings
4. Identify potential risks and compliance concerns

Return ONLY valid JSON matching this exact structure:
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
