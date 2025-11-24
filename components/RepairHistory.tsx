import React from 'react';
import { ChevronLeft, Clock, CheckCircle, Wrench, Calendar, AlertTriangle, FileText } from 'lucide-react';
import { RepairRecord } from '../types';

interface RepairHistoryProps {
  history: RepairRecord[];
  onBack: () => void;
}

export const RepairHistory: React.FC<RepairHistoryProps> = ({ history, onBack }) => {
  
  // Sort history by newest first
  const sortedHistory = [...history].sort((a, b) => b.timestamp - a.timestamp);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'Processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Cancelled': return 'bg-gray-100 text-gray-500 border-gray-200';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getIcon = (type: string) => {
    if (type.includes('緊急') || type.includes('Emergency')) return <AlertTriangle className="w-5 h-5 text-red-500" />;
    if (type.includes('保養') || type.includes('Maintenance')) return <Wrench className="w-5 h-5 text-blue-500" />;
    return <FileText className="w-5 h-5 text-brand-primary" />;
  };

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col">
      {/* Header */}
      <div className="bg-brand-primary p-4 text-white flex items-center shadow-lg sticky top-0 z-40">
        <button onClick={onBack} className="mr-3 p-1 hover:bg-white/20 rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-lg font-bold">維修紀錄 (History)</h2>
      </div>

      <div className="flex-1 p-4 pb-20">
        {sortedHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
               <FileText className="w-10 h-10 text-gray-300" />
            </div>
            <p className="text-lg font-bold">暫無紀錄</p>
            <p className="text-sm">No repair history found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedHistory.map((record) => (
              <div key={record.id} className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100 hover:shadow-md transition-shadow">
                {/* Top Row: Date & Status */}
                <div className="flex justify-between items-start mb-3">
                   <div className="flex items-center text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                      <Calendar className="w-3 h-3 mr-1" />
                      {record.dateStr}
                   </div>
                   <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getStatusColor(record.status)}`}>
                      {record.status === 'Pending' ? '處理中' : 
                       record.status === 'Completed' ? '已完成' : 
                       record.status === 'Processing' ? '跟進中' : record.status}
                   </span>
                </div>

                {/* Main Content */}
                <div className="flex items-start space-x-3 mb-3">
                   <div className="mt-1 p-2 bg-brand-light/30 rounded-xl">
                      {getIcon(record.serviceType)}
                   </div>
                   <div>
                      <h3 className="font-bold text-gray-800 text-lg leading-tight mb-1">{record.serviceType}</h3>
                      <p className="text-sm text-gray-500 font-medium">{record.carBrand}</p>
                   </div>
                </div>

                {/* Details Footer */}
                <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                   <p className="text-xs text-gray-500 line-clamp-1 flex-1 mr-2">
                     {record.details}
                   </p>
                   {record.amount && (
                     <span className="font-mono font-bold text-brand-dark text-sm">
                        {record.amount}
                     </span>
                   )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};