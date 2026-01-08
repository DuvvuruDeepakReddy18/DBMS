import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import PaymentModal from '@/components/PaymentModal';

const EventRegistrationModal = ({ isOpen, onClose, event, onRegister }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    college: '',
    email: '',
    phone: ''
  });

  const validateForm = () => {
    if (!formData.fullName || !formData.college || !formData.email || !formData.phone) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return false;
    }
    if (!formData.email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (event.price > 0) {
      setShowPayment(true);
    } else {
      processRegistration();
    }
  };

  const processRegistration = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onRegister({
      ...formData,
      eventId: event.id,
      paymentStatus: event.price > 0 ? 'paid' : 'free',
      registrationDate: new Date().toISOString()
    });
    
    setLoading(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Register for {event?.title}</DialogTitle>
            <DialogDescription>
              {event?.price > 0 ? `Fee: ₹${event.price}` : 'Free Event'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder="John Doe"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="college">College / Organization</Label>
              <Input
                id="college"
                value={formData.college}
                onChange={(e) => setFormData({...formData, college: e.target.value})}
                placeholder="University Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+91 98765 43210"
              />
            </div>

            <Button type="submit" className="w-full bg-blue-600 text-white mt-6" disabled={loading}>
              {loading ? 'Processing...' : (event?.price > 0 ? 'Proceed to Payment' : 'Confirm Registration')}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <PaymentModal 
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        amount={event?.price}
        title={`Registration: ${event?.title}`}
        onSuccess={() => {
          setShowPayment(false);
          processRegistration();
        }}
      />
    </>
  );
};

export default EventRegistrationModal;