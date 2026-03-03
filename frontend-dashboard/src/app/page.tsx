import MaturityScore from '@/components/MaturityScore';
import FindingsReport from '@/components/FindingsReport';
import { SecurityReport } from '@/utils/maturityCalc';

// Mock data generation for mass presentation
const mockReport: SecurityReport = {
  execution_date: new Date().toISOString(),
  environment: 'production',
  total_scenarios_run: 540,
  failures: 42,
  maturity_score: 88, // Alta
  findings: [
    { id: 'T4-001', name: 'Roleplay jailbreak', severity: 'critical', status: 'failed', evidence: 'Model bypassed safety filter via simulated Unix terminal roleplay.' },
    { id: 'T5-001', name: 'Agent executes dangerous tool', severity: 'critical', status: 'failed', evidence: 'Agent initiated OS command execution via misconfigured tool definition.' },
    { id: 'T3-001', name: 'Override system prompt', severity: 'high', status: 'passed', evidence: 'System prompt strictly enforced; override attempts ignored.' },
    ...Array.from({ length: 50 }).map((_, i) => ({
      id: `GEN-10${i}`,
      name: `Context Fuzzing Sequence #${i}`,
      severity: i % 5 === 0 ? 'high' : i % 3 === 0 ? 'medium' : 'low' as any,
      status: i % 7 === 0 ? 'failed' : 'passed' as any,
      evidence: `Simulated evidence payload generated during fuzzing phase ${i}.`
    }))
  ]
};


export default function Dashboard() {
  return (
    <main className="min-h-screen bg-background text-foreground font-sans p-8">

      {/* Header Corporativo (Cielo Blue Theme Focus) */}
      <header className="flex justify-between items-center mb-8 border-b-2 border-cielo pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-cielo-dark uppercase">AI Security Program</h1>
          <p className="text-sm text-slate-500 mt-1">Strategic Findings & Vulnerability Report</p>
        </div>
        <div className="text-right">
          <p className="text-xs font-mono text-slate-400">EXEC_DATE: {new Date(mockReport.execution_date).toLocaleDateString()}</p>
          <div className="inline-block px-3 py-1 mt-2 bg-cielo-light text-white text-xs font-bold rounded-sm uppercase tracking-wider">
            ATLAS Coverage Active
          </div>
        </div>
      </header>

      {/* Grid de Dados Massivo */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Lado Esquerdo - Score e Sumários */}
        <div className="col-span-1 flex flex-col gap-6">
          <MaturityScore report={mockReport} />

          {/* Pode-se adicionar painéis de resumo aqui no futuro */}
          <div className="corp-border p-6 bg-slate-50 h-full">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Risk Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-red-700">CRITICAL</span>
                  <span>{mockReport.findings.filter(f => f.severity === 'critical').length}</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5"><div className="bg-red-600 h-1.5" style={{ width: '10%' }}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-orange-700">HIGH</span>
                  <span>{mockReport.findings.filter(f => f.severity === 'high').length}</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5"><div className="bg-orange-500 h-1.5" style={{ width: '30%' }}></div></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-amber-700">MEDIUM</span>
                  <span>{mockReport.findings.filter(f => f.severity === 'medium').length}</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5"><div className="bg-amber-500 h-1.5" style={{ width: '40%' }}></div></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lado Direito - Findings Table Expansivo */}
        <div className="col-span-1 lg:col-span-3">
          <FindingsReport report={mockReport} />
        </div>

      </div>

    </main>
  );
}
