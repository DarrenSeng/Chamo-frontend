import React from 'react';
import TopicItem from './TopicItem';

const TopicContainer = ({ identifier, authUser, containerItems = [], className }) => {
  const groupedItems = [];
  for (let i = 0; i < containerItems.length; i += 4) {
    groupedItems.push(containerItems.slice(i, i + 4));
  }

  return (
    <div className={`px-[100px] ${className}`}>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-300">{identifier}</h1>
        </div>
        {groupedItems.map((rowItems, rowIndex) => (
          <div key={rowIndex} className="flex gap-4 py-4 justify-center text-gray-700">
            {rowItems.map((item, index) => (
              <TopicItem
                authUser={authUser}
                key={index}
                name={item.topicTitle}
                image={item.topicImage.data}
                description={item.TopicDescription}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicContainer;