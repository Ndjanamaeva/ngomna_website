import React, { useEffect, useState } from 'react';
import Layout from './../components/Layout/Layout';

const Perspectives = () => {
  const [textData, setTextData] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchTextData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/text/12'); // Assuming pageId for Perspectives is 12
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

export default Perspectives;
