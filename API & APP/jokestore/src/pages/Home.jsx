import React,{useEffect, useLayoutEffect, useState} from "react";
import styled from "styled-components";
import ListItem from "../components/ListItem";
import {useNavigate} from 'react-router-dom';
import axios from "../axios";



const Header = styled.div`
  display: flex;
  background-color: skyblue;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.p`
  color: #fff;
  font-size: 20px;
  font-weight: 800;
  font-family: calibri;
`;

const Button = styled.button`
  border: none;
  width: 100px;
  height: 40px;
  background-color: #58b084;
  border-radius: 10px;
  color: #fff;
`;


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

const Type = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #5f50d6cc;
  margin: 10px;
  margin-bottom: 20px;
`;

export default function Home() {

    const [jokesList,setJokesList] = useState([]);
    const [type,setType] = useState('All');
    const navigate = useNavigate();
    
    const navigateToAdd = ()=>{
        navigate('/createJoke');
    }

    const getJokes = async ()=>{
        if(type==='All'){
            await axios.get('/api/Joke').then((resp)=>{
               if(resp.data.found === true){
                setJokesList(resp.data.jokes);
                
               }
               else{
                setJokesList([]);
               }
            },(err)=>{alert(err)})
            .catch((err)=>{alert(err)})
        }
        else{
            await axios.get(`/api/Joke?type=${type}`).then((resp)=>{
                console.log(resp);
               if(resp.data.found === true){
                setJokesList(resp.data.jokes);
               }
               else{
                setJokesList([]);
               }
            },(err)=>{alert(err)})
            .catch((err)=>{alert(err)})
        }
        
    }

    useLayoutEffect(()=>{
        getJokes();
        return ()=>{};
    },[type]);


    const handleQuery= async (event)=>{
        setType(event.target.value);

    }


  return (
    <div>
      <Header>
        <Heading>Joke Store</Heading>
        <Button onClick={navigateToAdd}>Post a Joke</Button>
      </Header>
      <Main>
        <Type>{type}</Type>
        
            <select defaultValue={'All'} onChange={handleQuery}>
                <option value='All'>All</option>
                <option value='office'>office</option>
                <option value='friends'>friends</option>
            </select>

        <Container>
            {jokesList.length>0 ? jokesList.map((joke)=><ListItem key={joke._id} joke={joke.joke} />) : <h1>Noting in this category yet!</h1>}
        </Container>
      </Main>
      <p style={{textAlign:'center',fontWeight:'900'}}>created By Suleman Sohail</p>
    </div>
  );
}
