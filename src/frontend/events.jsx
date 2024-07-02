import ForgeReconciler, { Text, Heading, Box, Textfield, xcss, Stack, LinkButton, Image, Button } from '@forge/react';
import React, { useState, useEffect } from 'react';
import { invoke } from '@forge/bridge';

const Events = ({handleSetPage}) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    invoke('getEvents').then(setData);
  }, []);

  const textStyle = xcss({
  color: 'color.text',
  marginBottom: 'space.200',
});

const logoTextStyle = xcss({
  color: 'color.text.accent.blue800',
  marginBottom: 'space.200',
});

const removePTags = (stringWithPTags) => {
  const stringWithNoPTags = stringWithPTags.replace(/<\/?p>/g, '');
  return stringWithNoPTags;
}

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
        <Box xcss={textStyle}>{removePTags(description)}</Box>
        <LinkButton spacing="none" appearance="link" href={`https://humanitix.com/au/search?query=${header}`}>
          Check me out in Humanatix!
        </LinkButton>
        <Button appearance='primary' onClick={() => {
          console.log('Button to go to details page clicked', typeof(handleSetPage()));
          handleSetPage();
        }}>Or get more details here</Button>      
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
        <Heading xcss={logoTextStyle} as="h1">Charitix</Heading>
        <Textfield placeholder='Search for an event'/>
      </Box>
      {data ? data.events.map((event, index) => (
        <GetStartedCard key={event._id} header={event.name} description={event.description} imageUrl={event.bannerImage?.url || 'https://picsum.photos/id/237/200/300'} />
      )) : 'Loading...'}
    </>
  );
};

// ForgeReconciler.render(
//   <React.StrictMode>
//     <Events />
//   </React.StrictMode>
// );

export default Events;