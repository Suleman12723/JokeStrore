import React from "react";
import styled from "styled-components";


const Main = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 100%;
  padding: 20px;
  flex-wrap: wrap;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  max-width: 100%;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Listitem = styled.div`
  // box-sizing:border-box
  min-width: 30%;
  background-color: #75de67cc;
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  margin: 10px;
`;

const Type = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #5f50d6cc;
  margin: 10px;
  margin-bottom: 20px;
`;

const Joke = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: black;
  margin: 0;
  color: #fff;
  max-width: 90%;
`;

export default function ListItem(props) {
  return (
    // <Main>
    //   <Type>Family Friendly</Type>
    //   <Container>
        <Listitem>
          <Joke>{props.joke}</Joke>
        </Listitem>
    //     {/* <ListItem>
    //       <Joke>This is a Joke</Joke>
    //     </ListItem>
    //     <ListItem>
    //       <Joke>This is a Joke</Joke>
    //     </ListItem>
    //     <ListItem>
    //       <Joke>This is a Joke</Joke>
    //     </ListItem>
    //     <ListItem>
    //       <Joke>This is a Joke</Joke>
    //     </ListItem>
    //     <ListItem>
    //       <Joke>This is a Joke</Joke>
    //     </ListItem>
    //     <ListItem>
    //       <Joke>This is a Joke</Joke>
    //     </ListItem>
    //   </Container>
    // </Main> */}
  );
}
