import { SecurityReport, getMaturityInfo } from '@/utils/maturityCalc';

export default function MaturityScore({ report }: { report: SecurityReport }) {
    const { level, colorClass, desc } = getMaturityInfo(report.maturity_score);

    return (
        <div className="corp-border p-6 bg-white flex flex-col justify-between h-full">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Índice de Maturidade
            </h3>
            <div className="flex items-end gap-3 mb-2">
                <span className={`text-6xl font-bold tracking-tighter ${colorClass}`}>
                    {report.maturity_score}%
                </span>
                <span className={`text-2xl font-bold mb-1 ${colorClass}`}>
                    {level}
                </span>
            </div>
            <p className="text-sm text-slate-500">
                Classificação ({desc}) calculada baseada em {report.total_scenarios_run} cenários.
            </p>

            <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xs text-slate-400 uppercase">Ambiente</p>
                    <p className="font-medium">{report.environment}</p>
                </div>
                <div>
                    <p className="text-xs text-slate-400 uppercase">Falhas Severas</p>
                    <p className="font-medium text-red-600">{report.failures}</p>
                </div>
            </div>
        </div>
    );
}
