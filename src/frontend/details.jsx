import ForgeReconciler, { Text, Heading, Box, Textfield, xcss, Stack, LinkButton, Image, Button, Icon, ProgressBar } from '@forge/react';
import React, { useState, useEffect } from 'react';
import { invoke } from '@forge/bridge';

const Details = ({handleSetPage}) => {
  // const [clicked, setClicked] = useState(false)

  const [data, setData] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);


  const newComponent = () => {
    setClicked(true)
  }
  
  const backButtonStyle = xcss({
    margin: 'space.200',
  });

  const textStyle = xcss({
    color: 'color.text.accent.blue',
    marginBottom: 'space.200',
  });

  const containerStyle = xcss({
    borderStyle: 'solid',
    padding: 'space.200',
  });

  const subContainerStyle = xcss({
    padding: 'space.200',
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

  useEffect(() => {
    invoke('getOrders').then(setData);
    invoke('getSpecificEvent').then(setEventDetails);
  }, []);

  const PersonCard = ({ firstName, lastName, email }) => {
    return (
      <Box xcss={cardStyle}>
        <Stack space="space.100" alignInline="start">
          <Heading as="h3" level="h600">{firstName + ' ' + lastName}</Heading>
          <Box xcss={textStyle}>{email}</Box>    
          </Stack>
      </Box>
    );
  }

  const removePTags = (stringWithPTags) => {
    const removedTags = stringWithPTags.replace(/<\/?p>/g, '');
    console.log('removed tags ' , removedTags);
    return removedTags;
  }

  const calcPeopleAttending = () => {
    if (eventDetails === null || data === null) {
      return 0.0
    } else {
      const peopleAttending = data.total;
      const maxCapacity = eventDetails.totalCapacity;
      return (peopleAttending/maxCapacity);
    }
    // return 0.4;
  }


  return (
    <>
      <Box xcss={containerStyle}>
        <Box xcss={subContainerStyle}>
          <Button xcss={backButtonStyle} onClick={() => {
            console.log('Button to go back to events page clicked', typeof(handleSetPage()));
            handleSetPage();
          }}>
            <Icon xcss={backButtonStyle} glyph="arrow-left" label="Arrow-left" />
          </Button>
          <Image src={eventDetails ? eventDetails.bannerImage.url : 'https://picsum.photos/id/237/200/300' }></Image>
          <Heading as="h2" level="h600" >{eventDetails ? eventDetails.name : 'Loading...' }</Heading>
          <Text>{eventDetails ? removePTags(eventDetails.description) : 'Loading...' }</Text>
          <LinkButton spacing="none" appearance="link" href={eventDetails ? `https://humanitix.com/au/search?query=${eventDetails.name}` : '/'}>
            Let's join through Humanatix!
          </LinkButton>
        </Box>
        <Box xcss={subContainerStyle}>
          <Box xcss={subContainerStyle}>
            <Heading as="h3" level="h600">Join before this fills up</Heading>
            <ProgressBar ariaLabel="attendees/max-capacity" value={calcPeopleAttending()}/>
          </Box>
          <Box xcss={subContainerStyle}>
            <Heading as="h3" level="h600">The people attending are .....</Heading>
            <Textfield placeholder='Search for a friend...'/>
            {data ? data.orders.map((order, index) => (
            <PersonCard key={order._id} firstName={order.firstName} lastName={order.lastName} email={order.email} />
            )) : 'Loading...'}
          </Box>
          
        </Box>
      </Box>
    </>
  );
};

// ForgeReconciler.render(
//   <React.StrictMode>
//     <Details />
//   </React.StrictMode>
// );

export default Details;