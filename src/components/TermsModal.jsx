import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const TermsModal = ({ isOpen, onClose, onApply }) => {
  const [canAccept, setCanAccept] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const contentRef = useRef(null);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 10) {
      setCanAccept(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white">
        <DialogHeader>
          <DialogTitle>Terms & Conditions</DialogTitle>
          <DialogDescription>Please read and accept to proceed.</DialogDescription>
        </DialogHeader>
        
        <div 
          className="h-64 overflow-y-auto border rounded-md p-4 mb-4 text-sm text-gray-600"
          onScroll={handleScroll}
          ref={contentRef}
        >
          <h4 className="font-bold mb-2">1. Application Integrity</h4>
          <p className="mb-2">You confirm that all information provided in this application is accurate and truthful.</p>
          <h4 className="font-bold mb-2">2. Data Privacy</h4>
          <p className="mb-2">Your resume and personal details will be shared with the employer for recruitment purposes only.</p>
          <h4 className="font-bold mb-2">3. Code of Conduct</h4>
          <p className="mb-2">You agree to maintain professional conduct during the interview process.</p>
          <h4 className="font-bold mb-2">4. No Guarantee</h4>
          <p className="mb-2">Applying does not guarantee an interview or job offer.</p>
          <p>...(Scroll to bottom to accept)...</p>
          <div className="h-20"></div>
          <p className="font-bold text-center">--- End of Terms ---</p>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <Checkbox 
            id="terms" 
            checked={accepted} 
            onCheckedChange={setAccepted}
            disabled={!canAccept}
          />
          <Label htmlFor="terms" className={!canAccept ? "text-gray-400" : ""}>
            I have read and agree to the terms (Scroll to enable)
          </Label>
        </div>

        <Button 
          onClick={onApply} 
          disabled={!accepted}
          className="w-full bg-blue-600 text-white"
        >
          Confirm & Apply
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TermsModal;