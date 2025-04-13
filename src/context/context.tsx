import { createContext, useState, useContext, ReactNode } from "react"

interface MessageContextProps {
  handleDeleteButton: ((id: string) => void) | undefined
  setHandleDeleteButton: (callback: (id: string) => void) => void
}

const MessageContext = createContext<MessageContextProps | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {

  const [handleDeleteButton, setHandleDeleteButtonState] = useState<((id: string) => void) | undefined>(undefined);

  const setHandleDeleteButton = (callback: (id: string) => void) => {
    setHandleDeleteButtonState(() => callback)
  }

  return (
    <MessageContext.Provider value={{ handleDeleteButton, setHandleDeleteButton }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessage must be used within a MessageProvider');
  }
  return context;
};