import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Loader2, RefreshCw } from 'lucide-react';
import { apiClient } from '@/lib/api';

export const BackendStatus = () => {
  const [status, setStatus] = useState<'checking' | 'available' | 'unavailable'>('checking');
  const [isRetrying, setIsRetrying] = useState(false);

  const checkBackendStatus = async () => {
    try {
      await apiClient.checkHealth();
      setStatus('available');
    } catch (error) {
      setStatus('unavailable');
    }
  };

  const handleRetry = async () => {
    setIsRetrying(true);
    setStatus('checking');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Brief delay for UX
    await checkBackendStatus();
    setIsRetrying(false);
  };

  useEffect(() => {
    checkBackendStatus();
    
    // Check status every 10 seconds when unavailable
    const interval = setInterval(() => {
      if (status === 'unavailable') {
        checkBackendStatus();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [status]);



  if (status === 'checking') {
    return (
      <Alert className="mb-6 border-blue-200 bg-blue-50 text-blue-800">
        <Loader2 className="h-4 w-4 animate-spin" />
        <AlertDescription>
          <strong>Connecting to MongoDB backend...</strong>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      {/* <Alert className="mb-6 border-orange-200 bg-orange-50 text-orange-800">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="space-y-3">
          <div>
            <strong>⚠️ Backend Server Required:</strong> MongoDB backend is not running.
        </div>
        <div className="text-sm">
          <strong>To start the server:</strong>
          <pre className="mt-1 p-2 bg-gray-800 text-white rounded text-xs overflow-x-auto">
cd backend{'\n'}npm run dev
          </pre>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRetry}
            disabled={isRetrying}
          >
            {isRetrying ? (
              <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            ) : (
              <RefreshCw className="w-3 h-3 mr-1" />
            )}
            Check Again
          </Button>
          <span className="text-xs text-muted-foreground">
            Auto-checking every 10 seconds...
          </span>
        </div>
      </AlertDescription>
    </Alert> */}
    </div>
  );
};
