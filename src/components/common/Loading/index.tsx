import React from 'react';

import css from './style.module.css';

function Loading() {
  return (
    <div className={css.loading}>
      <div className={css.loaderAround} />
      <div className={css.loaderInside} />
    </div>
  );
}

export default Loading;
