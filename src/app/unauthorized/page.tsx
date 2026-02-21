import React from 'react';
import { Ban } from 'lucide-react';

const AccessDenied = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 via-green-100 to-white flex flex-col items-center justify-center text-center px-4">
      
      <h1 className="text-red-600 text-[40px] md:text-[20px] font-bold mb-4 flex items-center gap-2 justify-center">
  Access Denied
  <Ban size={20} strokeWidth={2.5} />
</h1>
      <p className="text-black text-[15px] md:text-[10px] font-light mb-10">
        You don't have permission to view this site.
      </p>
      <p className="text-red-700 text-[10px] mt-8 uppercase tracking-widest font-semibold">
        error code: 403 forbidden
      </p>
      
    </div>
  );
};

export default AccessDenied;