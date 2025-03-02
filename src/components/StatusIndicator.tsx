import { CheckCircle2, Circle, Loader2 } from "lucide-react";

interface StatusStep {
  label: string;
  status: 'completed' | 'in-progress' | 'pending';
  detail: string;
}

export interface StatusIndicatorProps {
  readonly steps: StatusStep[];
}

export function StatusIndicator({ steps }: StatusIndicatorProps) {
  return (
    <div className="fixed right-8 top-32 w-80 bg-white rounded-xl shadow-lg border p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        Status
        <button className="ml-auto hover:bg-accent p-1 rounded">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
          </svg>
        </button>
      </h3>
      
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {index !== steps.length - 1 && (
              <div 
                className={`absolute left-[15px] top-[30px] w-[2px] h-[calc(100%+12px)] 
                  ${step.status === 'completed' ? 'bg-primary' : 'bg-muted'}`}
              />
            )}
            
            <div className="flex items-start gap-4">
              <div className="mt-1">
                {step.status === 'completed' && (
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                )}
                {step.status === 'in-progress' && (
                  <Circle className="w-8 h-8 text-primary animate-pulse" />
                )}
                {step.status === 'pending' && (
                  <Circle className="w-8 h-8 text-muted" />
                )}
              </div>
              
              <div>
                <h4 className="font-medium text-base">{step.label}</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {step.status === 'in-progress' ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-3 h-3 animate-spin" />
                      {step.detail}
                    </span>
                  ) : (
                    step.detail
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 