import React, { useEffect } from 'react';
import { Progress } from 'semantic-ui-react';
import useStorage from '../../hooks/useStorage';

const ProgressBar = ({ item, setItem }) => {
  const { url, progress } = useStorage(item);

  useEffect(() => {
    if (url) {
      setItem(null)
    }
  }, [item, setItem]);

  return (
    <div>
      <Progress percent={progress} indicating/>
    </div>
  )
}

export default ProgressBar;
