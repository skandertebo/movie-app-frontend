import { createContext, useContext, useState } from "react";

const loadingContext = createContext({
  loading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

export const useLoadingContext = () => useContext(loadingContext);

export const LoadingContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return (
    <loadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      {children}
    </loadingContext.Provider>
  );
};
