import { useState, useEffect } from 'react';
import { projectStorage, projectFirestore, timestamp } from '../components/Firebase/firebase';

const useStorage = (item) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // references
    const storageRef = projectStorage.ref(item.name);
    const collectionRef = projectFirestore.collection('items');

    storageRef.put(item).on('state_changed', (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      const url = await storageRef.getDownloadURL();
      const createdAt = timestamp();
      collectionRef.add({ 
        url, 
        createdAt, 
        name: item.name,  
        description: item.description,
        cost: item.cost, 
        quantity: item.quantity,
        dateRestocked: item.dateRestocked
      });
      setUrl(url);
    })
  }, [item])

  return { progress, url, error };
}

export default useStorage;