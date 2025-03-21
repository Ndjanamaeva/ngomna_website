import React, { useEffect, useState } from 'react';
import Layout from './../components/Layout/Layout';

const Children = () => {
  const [textData, setTextData] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchTextData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/text/6'); // Assuming pageId for Children is 6
        const data = await response.json();
        setTextData(data);
      } catch (error) {
        console.error('Error fetching text data:', error);
      }
    };

    fetchTextData();
  }, []);

  return (
    <Layout 
      title={textData.title} 
      content={textData.content} 
    />
  );
};

export default Children;