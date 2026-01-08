
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const QuizResultsModal = ({ isOpen, onClose, results, userAnswers }) => {
  if (!results) return null;

  const { score, total, percentage, questions } = results;
  const isPassing = percentage >= 70;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">Quiz Results</DialogTitle>
        </DialogHeader>
        
        <div className="text-center py-6">
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mb-4"
          >
            {isPassing ? (
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Award className="w-10 h-10 text-green-600" />
              </div>
            ) : (
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <XCircle className="w-10 h-10 text-orange-600" />
              </div>
            )}
            <h2 className="text-4xl font-bold text-gray-900">{percentage}%</h2>
            <p className="text-gray-600 text-lg">
              You answered {score} out of {total} correctly
            </p>
            {isPassing && (
              <p className="text-green-600 font-semibold mt-2">Excellent work! You've mastered this module.</p>
            )}
          </motion.div>

          <div className="text-left space-y-6 mt-8">
            {questions.map((q, index) => {
              const userAnswer = userAnswers[index];
              const isCorrect = userAnswer === q.correctAnswer;

              return (
                <motion.div 
                  key={q.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-lg border ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-gray-500">#{index + 1}</span>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 mb-2">{q.question}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                        <div className={`p-2 rounded text-sm ${
                          isCorrect ? 'bg-green-200 text-green-800 font-medium' : 'bg-red-200 text-red-800'
                        }`}>
                          Your Answer: {userAnswer || 'Skipped'}
                        </div>
                        {!isCorrect && (
                          <div className="p-2 rounded text-sm bg-green-200 text-green-800 font-medium">
                            Correct Answer: {q.correctAnswer}
                          </div>
                        )}
                      </div>
                      
                      <p className="text-sm text-gray-600 italic">
                        <span className="font-semibold">Explanation:</span> {q.explanation}
                      </p>
                    </div>
                    <div>
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8">
            <Button onClick={onClose} size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto px-8">
              Complete & Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizResultsModal;