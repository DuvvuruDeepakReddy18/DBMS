import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Check, Crown } from 'lucide-react';
import PaymentModal from './PaymentModal';

const PremiumModal = ({ isOpen, onClose, onUpgrade }) => {
  const [showPayment, setShowPayment] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState(null);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setShowPayment(true);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold flex items-center justify-center gap-2">
              <Crown className="w-6 h-6 text-yellow-500" /> Upgrade to Premium
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-4 py-4">
            <div className="border rounded-xl p-6 hover:border-blue-500 cursor-pointer transition-all" onClick={() => handlePlanSelect({price: 399, name: 'Monthly'})}>
              <h3 className="font-bold text-lg">Monthly</h3>
              <div className="text-3xl font-bold text-blue-600 my-2">₹399</div>
              <p className="text-sm text-gray-500 mb-4">per month</p>
              <Button variant="outline" className="w-full">Select Monthly</Button>
            </div>
            
            <div className="border rounded-xl p-6 border-blue-600 bg-blue-50 cursor-pointer relative" onClick={() => handlePlanSelect({price: 2999, name: 'Yearly'})}>
              <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-2 py-1 rounded-bl-lg">SAVE 37%</div>
              <h3 className="font-bold text-lg">Yearly</h3>
              <div className="text-3xl font-bold text-blue-600 my-2">₹2999</div>
              <p className="text-sm text-gray-500 mb-4">per year</p>
              <Button className="w-full bg-blue-600 text-white">Select Yearly</Button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2">Premium Features:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {['Unlimited Courses', 'Certificates', 'AI Mentorship', 'Priority Support'].map(f => (
                <div key={f} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" /> {f}
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {selectedPlan && (
        <PaymentModal 
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          amount={selectedPlan.price}
          title={`Premium ${selectedPlan.name}`}
          onSuccess={() => {
            onUpgrade(selectedPlan.name);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default PremiumModal;