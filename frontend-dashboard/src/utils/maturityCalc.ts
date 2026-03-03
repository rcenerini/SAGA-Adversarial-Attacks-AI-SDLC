export type MaturityLevel = 'Elite' | 'Alta' | 'Média' | 'Baixa';

export function getMaturityInfo(score: number): { level: MaturityLevel; colorClass: string; desc: string } {
    if (score > 95) return { level: 'Elite', colorClass: 'text-maturity-elite', desc: '> 95%' };
    if (score >= 80) return { level: 'Alta', colorClass: 'text-maturity-alta', desc: '80% - 94%' };
    if (score > 50) return { level: 'Média', colorClass: 'text-maturity-media', desc: '51% - 79%' };
    return { level: 'Baixa', colorClass: 'text-maturity-baixa', desc: '<= 50%' };
}

export interface Finding {
    id: string;
    name: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    status: 'passed' | 'failed';
    evidence: string;
}

export interface SecurityReport {
    execution_date: string;
    environment: string;
    total_scenarios_run: number;
    failures: number;
    maturity_score: number;
    findings: Finding[];
}
