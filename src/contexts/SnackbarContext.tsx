import React, { createContext, useState } from 'react';
import { Snackbar } from '@material-ui/core';

type ContextProps = {
  setSnackbarMessage: (newMessage: string) => void;
};

export const SnackbarContext = createContext<ContextProps>({
  setSnackbarMessage: () => undefined,
});

export const SnackbarProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState<string | undefined>();
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Snackbarに表示するメッセージを設定し、表示する
   *
   * @param newMessage
   */
  const setSnackbarMessage = (newMessage: string) => {
    setMessage(newMessage);
    setIsOpen(true);
  };

  return (
    <SnackbarContext.Provider value={{ setSnackbarMessage }}>
      {children}

      <Snackbar
        open={isOpen}
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        onClose={() => {
          setMessage(undefined);
          setIsOpen(false);
        }}
        message={message}
      />
    </SnackbarContext.Provider>
  );
};
