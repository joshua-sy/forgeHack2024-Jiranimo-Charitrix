import ForgeReconciler, { Text, Heading, Box, Textfield, xcss, Stack, LinkButton, Image, Button } from '@forge/react';
import React, { useState, useEffect } from 'react';
import { invoke } from '@forge/bridge';

const Events = ({handleSetPage}) => {
  const [data, setData] = useState(null);
  // const [toShowData, setToShowData] = useState(null);


  useEffect(() => {
    invoke('getEvents').then(setData);
  }, []);

  const textStyle = xcss({
  color: 'color.text',
  marginBottom: 'space.200',
});

const titleContainerStyle = xcss({
  padding: 'space.200',
  backgroundColor: 'color.background.accent.teal.subtle',

});
const eventsContainerStyle = xcss({
  marginTop: 'space.200',
});
const logoTextStyle = xcss({
  color: 'color.text.inverse',
  marginBottom: 'space.200',
});

const containerStyle = xcss({
  borderStyle: 'solid',
  padding: 'space.200',
});

const textFieldContainerStyle = xcss({
  padding: 'space.200',
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

const handleSearchReq = (e) => {
  const searchReq = e.target.value;
  if (searchReq === '') {
    invoke('getEvents').then(setData);
  } else {
    const filteredEvents = data.events.filter(event => 
      event.name.toLowerCase().includes(searchReq.toLowerCase())
    ) || [];
    setData(filteredEvents);
  }
}

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

  return (
    <>
    <Box xcss={containerStyle}>
      <Box xcss={titleContainerStyle}>
        <Heading xcss={logoTextStyle} as="h1">Charitix</Heading>
        <Box xcss={textFieldContainerStyle}>
          <Textfield placeholder='Search for an event'/>
        </Box>
      </Box>
      <Box xcss={eventsContainerStyle}>
        {data ? data.events.map((event, index) => (
          <GetStartedCard key={event._id} header={event.name} description={event.description} imageUrl={event.bannerImage?.url || 'https://picsum.photos/id/237/200/300'} />
        )) : 'Loading...'}
      </Box>
    </Box>
    </>
  );
};

// ForgeReconciler.render(
//   <React.StrictMode>
//     <Events />
//   </React.StrictMode>
// );

export default Events;