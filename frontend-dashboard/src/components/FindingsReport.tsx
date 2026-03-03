"use client";

import { useState } from 'react';
import { SecurityReport } from '@/utils/maturityCalc';

export default function FindingsReport({ report }: { report: SecurityReport }) {
    const [filter, setFilter] = useState<'all' | 'failed'>('all');

    const filteredFindings = report.findings.filter(
        (f) => filter === 'all' || f.status === 'failed'
    );

    return (
        <div className="corp-border bg-white flex flex-col h-full max-h-[800px]">
            <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
                <h3 className="text-lg font-semibold text-cielo-dark">Log de Achados (Findings)</h3>
                <div className="flex gap-2 text-sm">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-3 py-1 rounded-sm border ${filter === 'all' ? 'bg-cielo text-white border-cielo' : 'bg-white text-slate-600 border-slate-300'}`}
                    >
                        Todos ({report.total_scenarios_run})
                    </button>
                    <button
                        onClick={() => setFilter('failed')}
                        className={`px-3 py-1 rounded-sm border ${filter === 'failed' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-slate-600 border-slate-300'}`}
                    >
                        Falhas ({report.failures})
                    </button>
                </div>
            </div>

            <div className="overflow-y-auto p-0 flex-1">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 shadow-sm">
                        <tr>
                            <th className="px-4 py-3 font-medium text-slate-500">ID</th>
                            <th className="px-4 py-3 font-medium text-slate-500 w-1/3">Cenário</th>
                            <th className="px-4 py-3 font-medium text-slate-500">Severidade</th>
                            <th className="px-4 py-3 font-medium text-slate-500">Status</th>
                            <th className="px-4 py-3 font-medium text-slate-500 w-1/2">Evidência</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredFindings.map((finding, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="px-4 py-3 text-slate-500 font-mono text-xs">{finding.id}</td>
                                <td className="px-4 py-3 text-slate-900 truncate max-w-xs" title={finding.name}>{finding.name}</td>
                                <td className="px-4 py-3 text-xs">
                                    <span className={`px-2 py-1 uppercase rounded-sm font-bold tracking-wider ${finding.severity === 'critical' ? 'bg-red-100 text-red-700' :
                                            finding.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                                                finding.severity === 'medium' ? 'bg-amber-100 text-amber-700' :
                                                    'bg-slate-100 text-slate-700'
                                        }`}>
                                        {finding.severity}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    {finding.status === 'failed' ? (
                                        <span className="text-red-600 font-semibold text-xs uppercase">Fail</span>
                                    ) : (
                                        <span className="text-emerald-600 font-semibold text-xs uppercase">Pass</span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-slate-600 truncate max-w-sm" title={finding.evidence}>
                                    {finding.evidence}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredFindings.length === 0 && (
                    <div className="p-8 text-center text-slate-400">
                        Nenhum finding correspondente ao filtro.
                    </div>
                )}
            </div>
        </div>
    );
}
