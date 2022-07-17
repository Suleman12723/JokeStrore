import React, { useLayoutEffect, useState, useRef } from "react";
import styled from "styled-components";
import axios from "../axios";

const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 50%;
  max-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  min-width: 50%;
  height: 150px;
  padding: 0 10px;
`;

const H1White = styled.h1`
  color: #fff;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  align-items: center;
  border-radius: 5px;
  // height:30px;
  flex-wrap: wrap;
  border: none;
  // box-shadow: 8px 17px 24px -7px rgba(0,0,0,0.75);
`;

const InputField = styled.input`
  border: none;
  margin-left: 10px;
  flex: 1;
  font-size: 17px;
  padding: 5px;
  margin-right: 10px;
`;
const SeprateContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const EnterJoke = styled(ItemContainer)`
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  box-shadow: 8px 17px 24px -7px rgba(0, 0, 0, 0.75);
`;

const NormalText = styled.p`
  font-size: 15px;
  margin: 0;
  padding: 0;
  margin-right: 7px;
`;

const Radio = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid;
  margin-right: 5px;
`;
const RadioBtn = styled.input`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 1px solid;
  margin-right: 5px;
`;

const ListConatiner = styled(Main)`
  min-width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  min-height: 60%;
  max-height: 60%;
  background-color: #fff;
  border-radius: 5px;
`;

const Joke = styled(ItemContainer)`
  padding: 15px;
  // border-bottom:1px solid #8b8f8c;
  margin-bottom: 5px;
  box-shadow: none;
`;

const JokeText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 18px;
  font-weight: 600;
  margin-left: 10px;
`;

const FilterContainer = styled(ItemContainer)`
  padding: 20px;
  // border-top:1px solid;
  justify-content: space-between;
  box-shadow: 8px 17px 24px -7px rgba(0, 0, 0, 0.75);
`;

export default function Home() {
  const [jokesList, setJokesList] = useState([]);
  const [type, setType] = useState("All");
  const [joke, setJoke] = useState("");
  const jokeType = useRef([]);

  const handleClick = (event) => {
    if (jokeType.current.indexOf(event.target.value) >= 0) {
      jokeType.current = jokeType.current.filter(
        (jokes) => jokes !== event.target.value
      );
    } else {
      jokeType.current.push(event.target.value);
    }
    console.log(jokeType);
  };

  const postJoke = async () => {
    await axios
      .post("/api/joke", { joke: joke, jokeType: jokeType.current })
      .then(
        (resp) => {
          if (resp.data.err) {
            console.log(resp.data.message);
          } else {
            alert("Joke has been posted!");
            console.log(resp.data.joke.jokeType);
            if (type === "All") {
              setJokesList([
                ...jokesList,
                { joke: resp.data.joke.joke, _id: resp.data.joke._id },
              ]);
            } else if (resp.data.joke.jokeType.includes(type)) {
              setJokesList([
                ...jokesList,
                { joke: resp.data.joke.joke, _id: resp.data.joke._id },
              ]);
            }
          }
        },
        (err) => {
          if (joke === "") {
            alert("Minimum Joke Length is 1");
          } else {
            alert(err.response.data.message);
          }
        }
      )
      .catch((err) => {
        if (joke === "") {
          alert("Minimum Length of Joke is 1");
        } else {
          alert(err.response.data.message);
        }
      });

    setJoke("");
    jokeType.current = [];
    document.getElementsByClassName("undo")[0].checked = false;
    document.getElementsByClassName("undo")[1].checked = false;
  };

  useLayoutEffect(() => {
    const getJokes = async () => {
      if (type === "All") {
        await axios
          .get("/api/Joke")
          .then(
            (resp) => {
              if (resp.data.found === true) {
                setJokesList(resp.data.jokes);
              } else {
                setJokesList([]);
              }
            },
            (err) => {
              alert(err);
            }
          )
          .catch((err) => {
            alert(err);
          });
      } else {
        await axios
          .get(`/api/Joke?type=${type}`)
          .then(
            (resp) => {
              console.log(resp);
              if (resp.data.found === true) {
                setJokesList(resp.data.jokes);
              } else {
                setJokesList([]);
              }
            },
            (err) => {
              alert(err);
            }
          )
          .catch((err) => {
            alert(err);
          });
      }
    };
    getJokes();
  }, [type]);

  const handleQuery = async (event) => {
    setType(event.target.value);
  };

  const handleEnter = () => {
    postJoke();
  };

  return (
    <div className="background">
      <Main className="main">
        <Header>
          <H1White>Joke Store</H1White>
        </Header>
        <EnterJoke className="enterJoke">
          <InputField
            value={joke}
            onChange={(event) => setJoke(event.target.value)}
            placeholder="Enter Joke"
          />
          <SeprateContainer>
            <p style={{ fontSize: 15, color: "green" }}>(optional)</p>
            <RadioBtn
              className="undo"
              type={"checkbox"}
              name="joketype"
              value="office"
              onChange={handleClick}
            />
            <NormalText>Office</NormalText>
            <RadioBtn
              className="undo"
              type={"checkbox"}
              name="joketype"
              value="friends"
              onChange={handleClick}
            />
            <NormalText>Friends</NormalText>
          </SeprateContainer>
          <button
            style={{
              border: "none",
              backgroundColor: "green",
              color: "white",
              padding: 10,
              borderRadius: 10,
            }}
            onClick={handleEnter}
          >
            Submit
          </button>
        </EnterJoke>
        <ListConatiner className="listContainer">
          {jokesList.length > 0 ? (
            jokesList.map((joke) => (
              <Joke key={joke._id} className="Joke">
                <Radio />
                <JokeText>{joke.joke}</JokeText>
              </Joke>
            ))
          ) : (
            <h1
              style={{
                textAlign: "center",
                marginTop: "20%",
                color: "#9da19e",
              }}
            >
              Nothing to Show in {type}
            </h1>
          )}
        </ListConatiner>
        <FilterContainer>
          <NormalText>{jokesList.length} items</NormalText>
          <SeprateContainer>
            <NormalText style={{ marginRight: 100, fontWeight: 900 }}>
              By Suleman Sohail
            </NormalText>
            <NormalText
              className="filter"
              style={{ color: type === "All" && "blue" }}
            >
              <option
                style={{ fontWeight: type === "All" && "700" }}
                value={"All"}
                onClick={handleQuery}
              >
                All
              </option>
            </NormalText>
            <NormalText
              className="filter"
              style={{ color: type === "office" && "blue" }}
            >
              <option
                style={{ fontWeight: type === "office" && "700" }}
                value={"office"}
                onClick={handleQuery}
              >
                Office
              </option>
            </NormalText>
            <NormalText
              className="filter"
              style={{ color: type === "friends" && "blue" }}
            >
              <option
                style={{ fontWeight: type === "friends" && "700" }}
                value={"friends"}
                onClick={handleQuery}
              >
                Friends
              </option>
            </NormalText>
          </SeprateContainer>
        </FilterContainer>
      </Main>
    </div>
  );
}
