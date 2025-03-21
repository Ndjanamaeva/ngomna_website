import React, { useEffect, useState } from 'react';
import Layout from './../components/Layout/Layout';

const Mission = () => {
  const [textData, setTextData] = useState({ title: '', content: '' });

  useEffect(() => {
    const fetchTextData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/text/10'); // Assuming pageId for Mission is 10
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

export default Mission;
