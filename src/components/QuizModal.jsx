import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const QuizModal = ({ isOpen, onClose, questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  if (!questions || questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentIndex]: answer });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(answers);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-xl bg-white min-h-[400px]">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Quiz Question {currentIndex + 1}/{questions.length}</span>
            <span className="text-sm text-gray-500 font-normal">Select one</span>
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <h3 className="text-lg font-medium mb-6">{currentQuestion?.question}</h3>
          <div className="space-y-3">
            {currentQuestion?.options.map((option) => (
              <div
                key={option}
                onClick={() => handleAnswer(option)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  answers[currentIndex] === option
                    ? 'border-blue-600 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    answers[currentIndex] === option ? 'border-blue-600' : 'border-gray-300'
                  }`}>
                    {answers[currentIndex] === option && <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                  </div>
                  {option}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button 
            onClick={handleNext} 
            disabled={!answers[currentIndex]}
            className="bg-blue-600 text-white"
          >
            {currentIndex === questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizModal;