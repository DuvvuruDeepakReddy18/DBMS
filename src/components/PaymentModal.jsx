import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CreditCard, Wallet } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const PaymentModal = ({ isOpen, onClose, amount, onSuccess, title }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePayment = (method) => {
    setLoading(true);
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      onSuccess();
      toast({
        title: "Payment Successful!",
        description: `Successfully paid ₹${amount} via ${method}`,
      });
      onClose();
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            Purchase: {title}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="text-3xl font-bold text-center mb-6">₹{amount}</div>
          
          <div className="space-y-4">
            <Button 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-12 flex items-center justify-center gap-2"
              onClick={() => handlePayment('Stripe Card')}
              disabled={loading}
            >
              {loading ? 'Processing...' : <><CreditCard className="w-5 h-5" /> Pay with Card (Stripe)</>}
            </Button>
            
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 flex items-center justify-center gap-2"
              onClick={() => handlePayment('Razorpay UPI')}
              disabled={loading}
            >
              {loading ? 'Processing...' : <><Wallet className="w-5 h-5" /> Pay with UPI (Razorpay)</>}
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 text-center mt-4">
            Secure payment powered by Stripe & Razorpay (Test Mode)
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
