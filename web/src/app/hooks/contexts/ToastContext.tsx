import { createContext, PropsWithChildren, useContext, useState } from 'react';

interface ToastContextReturn {
  message: string;
  showMessage: (message: string) => void;
  clearMessage: () => void;
}

export const ToastContext = createContext({
  message: '',
  showMessage: (message: string) => {},
  clearMessage: () => {},
});

export const useToastContext = (): ToastContextReturn => useContext(ToastContext);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [message, setMessage] = useState('');

  const clearMessage = () =>{
    setMessage('');
  }

  const showMessage = (message: string) => {
    setMessage(message);
    setTimeout(() => {
      clearMessage();
    }, 3000);
  }

  return (
    <ToastContext.Provider value={{ message, showMessage, clearMessage }}>
      { children }
    </ToastContext.Provider>
  )
}