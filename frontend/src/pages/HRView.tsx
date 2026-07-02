import React from 'react';
import { newHires } from '../lib/mockData';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';

const HRView: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-deep-navy">HR Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of all new hires and their current onboarding progress.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-mint">
          <p className="text-gray-600 font-medium">Total New Hires (Active)</p>
          <p className="text-3xl font-bold text-deep-navy mt-2">{newHires.length}</p>
        </div>
        <div className="card">
          <p className="text-gray-600 font-medium">Starting This Week</p>
          <p className="text-3xl font-bold text-deep-navy mt-2">1</p>
        </div>
        <div className="card bg-orange-50 border-orange-100">
          <p className="font-medium text-orange-800">Action Required</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">1</p>
        </div>
      </div>

      {/* New Hires List */}
      <div className="card overflow-hidden p-0!">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="p-4 font-bold text-gray-600">Employee</th>
              <th className="p-4 font-bold text-gray-600">Start Date</th>
              <th className="p-4 font-bold text-gray-600">Status</th>
              <th className="p-4 font-bold text-gray-600">Progress</th>
              <th className="p-4 font-bold text-gray-600">Action Needed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {newHires.map((hire) => (
              <tr key={hire.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-deep-navy">{hire.name}</p>
                  <p className="text-sm text-gray-500">{hire.role}</p>
                </td>
                <td className="p-4 text-gray-600">{hire.startDate}</td>
                <td className="p-4">
                  <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600">
                    {hire.status === "Upcoming" && <Clock className="w-3 h-3 mr-1" />}
                    {hire.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-full bg-gray-200 rounded-full h-2 max-w-[100px]">
                      <div className="bg-soft-teal h-2 rounded-full" style={{ width: `${hire.progress}%` }}></div>
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{hire.progress}%</span>
                  </div>
                </td>
                <td className="p-4">
                  {hire.actionRequired ? (
                    <div className="flex items-center text-sm font-medium text-orange-600">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {hire.actionNote}
                    </div>
                  ) : (
                    <div className="flex items-center text-sm font-medium text-green-600">
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      All good
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HRView;
