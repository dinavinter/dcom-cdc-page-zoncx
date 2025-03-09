import React, { useState, useEffect } from 'react';
import { CheckCircle2, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NFLRegistrationDemoProps {
  onComplete: () => void;
}

export function NFLRegistrationDemo({ onComplete }: NFLRegistrationDemoProps) {
  const [isTyping, setIsTyping] = useState(false);
  const [currentField, setCurrentField] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
  });

  const fields = [
    { name: 'email', value: 'tom.brady@nfl.com' },
    { name: 'password', value: 'GoatQB12!' },
    { name: 'firstName', value: 'Tom' },
    { name: 'lastName', value: 'Brady' },
    { name: 'dateOfBirth', value: '08/03/1977' },
  ];

  useEffect(() => {
    let timeout;
    if (currentField < fields.length) {
      setIsTyping(true);
      const field = fields[currentField];
      let currentText = '';
      const interval = setInterval(() => {
        if (currentText.length < field.value.length) {
          currentText = field.value.slice(0, currentText.length + 1);
          setFormValues((prev) => ({ ...prev, [field.name]: currentText }));
        } else {
          clearInterval(interval);
          setIsTyping(false);
          timeout = setTimeout(() => {
            setCurrentField((prev) => prev + 1);
          }, 300);
        }
      }, 50);

      return () => {
        clearInterval(interval);
        if (timeout) clearTimeout(timeout);
      };
    } else if (currentField === fields.length && !isSubmitting) {
      timeout = setTimeout(() => {
        setIsSubmitting(true);
        setTimeout(() => {
          onComplete();
        }, 2000);
      }, 1000);
    }
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [currentField, isSubmitting, onComplete]);

  return (
    <motion.div
      className="sm:invisible md:invisible lg:visible invisible fixed bottom-8 left-8 z-50 "
      initial={{ scale: 0.8, opacity: 0, y: 100 }}
      animate={{ scale: 1, opacity: 0.9, y: 0 }}
      exit={{
        scale: 0.8,
        opacity: 0,
        y: 100,
        transition: { duration: 0.3 },
      }}
      transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
    >
      <div className="relative w-[280px] h-[480px] bg-white rounded-[30px] shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100px] h-[20px] bg-black rounded-b-[15px] z-10" />

        {/* Content */}
        <div className="p-4 pt-8 h-full overflow-y-auto">
          <button className="mb-4">
            <motion.div
              whileHover={{ x: -5 }}
              className="flex items-center text-gray-600"
            >
              ← Back
            </motion.div>
          </button>

          <motion.div
            className="flex justify-center mb-4"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <img
              src="https://static.www.nfl.com/image/upload/v1554321393/league/nvfr7ogywskqrfaiu38m.svg"
              alt="NFL Logo"
              className="w-12"
            />
          </motion.div>

          <motion.div
            className="text-center mb-6"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg font-bold mb-2">
              One Account is All You Need
            </h2>
            <p className="text-xs text-gray-600">
              Get the latest news on your team
            </p>
          </motion.div>

          <motion.div
            className="space-y-3"
            animate={{
              opacity: isSubmitting ? 0.6 : 1,
              scale: isSubmitting ? 0.98 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {fields.map((field, index) => (
              <motion.div
                key={field.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  scale: isSubmitting ? 0.95 : 1,
                }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <label className="block text-xs text-gray-600 mb-1 capitalize">
                  {field.name.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <div className="relative">
                  <motion.input
                    type={field.name === 'password' ? 'password' : 'text'}
                    className={`text-gray-800 w-full p-2 text-sm border rounded-lg ${
                      currentField === index ? 'border-blue-500 bg-blue-50' : ''
                    }`}
                    value={formValues[field.name]}
                    animate={{
                      scale: currentField === index ? 1.02 : 1,
                      opacity: isSubmitting ? 0.7 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    readOnly
                  />
                  {field.name === 'password' && (
                    <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-3 h-3" />
                  )}
                  {currentField === index && (
                    <motion.div
                      className="absolute right-0 top-0 w-1 h-full bg-blue-500"
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                scale: isSubmitting ? 0.95 : 1,
              }}
              transition={{ delay: 0.9 }}
            >
              <label className="block text-xs text-gray-600 mb-1">
                Country
              </label>
              <select className="w-full p-2 text-sm border rounded-lg bg-white">
                <option>United States</option>
              </select>
            </motion.div>

            <motion.button
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold relative overflow-hidden text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: 0,
                opacity: currentField >= fields.length ? 1 : 0.5,
                scale: isSubmitting ? 0.95 : 1,
              }}
              transition={{ delay: 1 }}
            >
              {isSubmitting ? (
                <motion.div
                  className="absolute inset-0 bg-green-500"
                  initial={{ x: '-100%' }}
                  animate={{ x: '0%' }}
                  transition={{ duration: 0.5 }}
                >
                  <CheckCircle2 className="w-4 h-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white" />
                </motion.div>
              ) : (
                'Create Account'
              )}
            </motion.button>
          </motion.div>

          {/* Success animation */}
          <AnimatePresence>
            {isSubmitting && (
              <motion.div
                className="absolute inset-0 bg-slate-500 bg-opacity-90 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  <motion.div className="bg-white rounded-full p-3 mb-3 mx-auto w-fit">
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </motion.div>
                  <h3 className="text-white text-base font-bold mb-1">
                    Welcome to NFL!
                  </h3>
                  <p className="text-white text-xs opacity-90">
                    Account created successfully
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
