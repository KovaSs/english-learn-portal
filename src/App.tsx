import React, { useEffect, useState } from 'react';

import { routes } from 'api';
import initSentry from 'config/sentry';
import { ConfigTypes } from 'store/config';
import { Loading } from 'components/common';
import AppContainer from 'components/containers/AppContainer';

function App() {
  const [config, setConfig] = useState<ConfigTypes.Config>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(routes.getConfig)
      .then((res) => res.json())
      .then((data) => {
        initSentry(data.sentry);
        setConfig(data);
        setIsLoading(false);
      })
      .catch(() => {
        initSentry();
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;

  return <AppContainer config={config} />;
}

export default App;
