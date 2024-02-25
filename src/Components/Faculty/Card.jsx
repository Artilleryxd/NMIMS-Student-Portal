import React from 'react';

const Card = ({ title, description,link }) => {
  return (
    <a
  href={link}
  className="block max-w-sm mx-2 p-4 md:p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
>
  <h5 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    {title}
  </h5>
  <p className="font-normal text-sm md:text-base text-gray-700 dark:text-gray-400">
    {description}
  </p>
</a>

  
  );
};

const CardGrid = () => {
  const cardData = [
    {
      title: 'E Library',
      description:
        'The E Library is a digital library that provides access to a wide range of resources.',
        link:
        '/fac/e-library',
    },
    {
        title: 'Attendance QR',
        description:
          'You can take attendance by scanning the QR code of the students.',
          link:
          '/fac/attendance',
      },
      {
        title: 'Assignments',
        description:
          'You can create and manage assignments for the students.',
          link:
          '/fac/assignments',
      },
      {
        title: 'Contact Us',
        description:
          'You can contact us for any queries or issues.',
          link:
            '/fac/contact-us',
      },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {cardData.map((card, index ,link) => (
        <Card key={index} title={card.title} description={card.description} link={card.link} />
      ))}
    </div>
  );
};

export default CardGrid;
