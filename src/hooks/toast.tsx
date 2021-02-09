import React, { createContext, useCallback, useContext, useState } from 'react';
import { v4 as uuid } from 'uuid';


import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'info' | 'success' | 'error';
  title: string;
  description?: string;
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

type PartialToastContextData = Partial<ToastContextData>;


const ToastContext = createContext<PartialToastContextData>({});

const ToastProvider: React.FC = ({ children }) => {
  const [ messages, setMessages ] = useState<ToastMessage[]>([]); 

  const addToast = useCallback(({type, title, description}: Omit<ToastMessage, 'id'>) => {
    const id = uuid();

    const toast = {
      id,
      type,
      title,
      description
    }

    setMessages([...messages, toast])
  }, [messages]);

  const removeToast = useCallback((id:string) => {
    setMessages((message) => message.filter((message) => message.id != id))
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

function useToast(): PartialToastContextData {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within an ToastProvider');
  }

  return context;
}

export { ToastProvider, useToast };