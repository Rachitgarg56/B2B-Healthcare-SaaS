import { Activity } from 'lucide-react';

const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center min-h-[50vh]">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
        <Activity size={18} className="text-primary-500 animate-pulse" />
      </div>
      <div className="flex gap-1">
        {[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: `${i*0.15}s` }} />)}
      </div>
    </div>
  </div>
);

export default PageLoader;