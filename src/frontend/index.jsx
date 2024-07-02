import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, Heading, Box, Textfield, xcss, Stack, LinkButton, Image } from '@forge/react';
// import ForgeUI, { Fragment } from '@forge/ui';
import { invoke } from '@forge/bridge';


const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke('getEvents').then(setData);
  }, []);

  const textStyle = xcss({
  color: 'color.text',
  marginBottom: 'space.200',
});

const cardStyle = xcss({
  backgroundColor: 'elevation.surface',
  padding: 'space.200',
  borderColor: 'color.border',
  borderWidth: 'border.width',
  borderStyle: 'solid',
  borderRadius: 'border.radius',
  ':hover': {
    backgroundColor: 'elevation.surface.hovered',
  },
});

const GetStartedCard = ({ header, description, imageUrl }) => {
  return (
    <Box xcss={cardStyle}>
      <Stack space="space.100" alignInline="start">
        <Image src={imageUrl}></Image>
        <Heading as="h3" level="h600">{header}</Heading>
        <Box xcss={textStyle}>{description}</Box>
        <LinkButton spacing="none" appearance="link" href="/">
          Get started
        </LinkButton>
      </Stack>
    </Box>
  );
}

const GetStartedCardList = () => {
  const cardsData = [
    { header: 'Header 1', description: 'Description 1' },
    { header: 'Header 2', description: 'Description 2' },
    { header: 'Header 3', description: 'Description 3' },
    // Add more card data as needed
  ];

  return (
    <Stack space="space.300">
      {cardsData.map((card, index) => (
        <GetStartedCard key={index} header={card.header} description={card.description} />
      ))}
    </Stack>
  );
};



  return (
    <>
      <Box>
        <Heading as="h1">Charitix</Heading>
        <Textfield placeholder='Search for an event'/>
      </Box>
      {data ? data.events.map((event, index) => (
        <GetStartedCard key={event._id} header={event.name} description={event.description} imageUrl={event.bannerImage?.url || 'https://picsum.photos/id/1/200/237'} />
      )) : 'Loading...'}
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
