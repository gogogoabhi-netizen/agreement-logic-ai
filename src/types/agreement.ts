export type AgreementAnalysis = {
  entities: {
    parties: Array<{
      name: string;
      role?: string;        // Provider, Client, Data Processor, etc.
      contact?: string;
    }>;
    obligations: Array<{
      id: string;           // e.g. "OBL-001"
      description: string;
      responsible: string;  // party name
      deadline?: string;    // date or relative text
      frequency?: string;   // e.g. "Monthly"
      related_sla_id?: string;
    }>;
    deliverables: Array<{
      name: string;
      due_date?: string;
      format?: string;
      owner?: string;
    }>;
    slas: Array<{
      id?: string;
      metric: string;       // e.g. "System Uptime"
      target: string;       // e.g. "99.9%"
      measurement?: string; // e.g. "Monthly"
      penalty?: string;
    }>;
    renewals: Array<{
      date?: string;
      notice_period?: string;
      auto_renew?: boolean;
      special_terms?: string;
    }>;
    approvals: Array<{
      item: string;
      approver: string;
      threshold?: string;
    }>;
    data_fields: Array<{
      name: string;
      value?: string;
      type?: string;        // Currency, Date, Duration, etc.
    }>;
  };
  workflow_json: {
    name: string;
    description?: string;
    triggers: Array<{
      event: string;        // e.g. "Agreement executed", "SLA breach"
      action: string;       // e.g. "Start workflow", "Notify owner"
    }>;
    steps: Array<{
      id: string;
      name: string;
      type: "trigger" | "system_task" | "human_task" | "approval" | "recurring" | "decision";
      description?: string;
      input_fields?: string[];
      output_fields?: string[];
      linked_obligations?: string[];  // OBL-ids
      assignee_role?: string;
      next_step_ids?: string[];
    }>;
    branches: Array<{
      condition: string;    // e.g. "If approval rejected"
      from_step_id?: string;
      to_step_id?: string;
      description?: string;
    }>;
    permissions?: Array<{
      role: string;         // e.g. "Legal", "Sales Ops"
      allowed_actions: string[];
      scope?: string;
    }>;
  };
  integrations: {
    systems: Array<{
      name: string;         // e.g. Salesforce, ServiceNow
      purpose: string;      // CRM, ticketing, finance, etc.
      status?: "Recommended" | "Optional" | "Existing";
    }>;
    actions: Array<{
      system: string;
      action: string;       // e.g. "Create Contract Record"
      trigger: string;      // e.g. "On workflow initiation"
    }>;
    field_mappings: Array<{
      contract_field: string;
      system: string;
      system_field: string;
    }>;
  };
  risks: Array<{
    severity: "low" | "medium" | "high";
    description: string;
    category?: string;      // e.g. "Renewals", "Data Privacy"
  }>;
  notes: string;            // Overall commentary + summary.
};
