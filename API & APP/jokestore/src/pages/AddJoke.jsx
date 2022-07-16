import React,{useRef,useState} from 'react'
import styled from "styled-components";
import {useNavigate} from 'react-router-dom';
import axios from "../axios";


const Container = styled.div`
  box-sizing: border-box;
 
`;


const InsideContainer = styled.div`
  display: flex;
  margin:auto;
  margin-top:50px;
  border-radius:10px;
  max-width:70%;
  flex-direction: column;
  box-sizing: border-box;
  flex-wrap:wrap;
  background-color: #339933;
  padding: 20px;
  height:400px;

`;

const Text = styled.p`
    font-size:30px;
    font-weight:900;
    color: #fff;
`

const InputContainer = styled.div`

    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    align-items:center;
`

const Label = styled.p`
    font-size:20px;
    font-weight:900;
    color: #fff;
    width:130px;
    
`

const Input = styled.input`
    box-sizing:border-box;
    width:30vw;
    height:30px;
    border:none;
    border-radius:5px;
    padding:0 10px;

`

const Button = styled.button`
  border: none;
  width: 100px;
  height: 40px;
  background-color: #58b084;
  border-radius: 10px;
  color: #fff;
  margin-top:20px;
`;


const TypeContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    margin:0;
    padding:0;
    margin:10px;
    color:#fff;

`



export default function AddJoke() {
    const [joke,setJoke] = useState('');
    const jokeType = useRef([]);
    
    const handleClick = (event)=>{
        if(jokeType.current.indexOf(event.target.value)>=0){
            jokeType.current = jokeType.current.filter((jokes)=>jokes!=event.target.value);
        }
        else{
            jokeType.current.push(event.target.value);
        }
        console.log(jokeType.current);
    }   

    const postJoke = async()=>{
        await axios.post('/api/joke',{joke:joke,jokeType:jokeType.current})
        .then((resp)=>{
            alert('Joke has been posted!');
        },(err)=>{alert(err)})
        .catch((err)=>{alert(err)});

        setJoke('');
        jokeType.current = [];
        document.getElementsByClassName('undo')[0].checked=false;
        document.getElementsByClassName('undo')[1].checked=false;
    }

  return (
    <Container>
        <InsideContainer>
            <Text>Post a Joke</Text>
            
            <InputContainer>
                <Label>Joke:</Label>
                <Input name='joke' value={joke}  onChange={(event)=>setJoke(event.target.value)} />
            </InputContainer>
            <InputContainer>
                <Label>Joke Type :</Label><p style={{fontSize:12,margin:0,padding:0, color:'#fff'}}>(optional)</p>
                <TypeContainer><input style={{border:'none'}} className='undo' name='joketype' type={'checkbox'} value='office'  onChange={handleClick} />Office</TypeContainer>
                <TypeContainer><input style={{border:'none'}} className='undo' name='joketype' type={'checkbox'} value='friends'  onChange={handleClick}  />Friends</TypeContainer>
                
                
                {/* <Input  onChange={(event)=>jokeType.current.push(event.target.value)} /> */}
            </InputContainer>
            <Button onClick={postJoke}>Submit</Button>
            
        </InsideContainer>
    </Container>
  )
}
