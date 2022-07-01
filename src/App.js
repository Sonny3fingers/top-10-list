import React, { useEffect, useState } from "react";
import Congratulations from "./components/Congratulations";
import "../src/index.css";

function App() {
  const [startIndex, setStartIndex] = useState();
  const [checkedId, setCheckedId] = useState([]);
  const [startElement, setStartElement] = useState(null);
  const [result, setResult] = useState(false);

  const bestMovies = [
    {
      key: "b1",
      id: "a1",
      title: "The Godfather",
    },
    {
      key: "b2",
      id: "a2",
      title: "Once Upon a Time in America",
    },
    {
      key: "b3",
      id: "a3",
      title: "The Godfather Part II",
    },
    {
      key: "b4",
      id: "a4",
      title: "Goodfellas",
    },
    {
      key: "b5",
      id: "a5",
      title: "The Departed",
    },
    {
      key: "b6",
      id: "a6",
      title: "Scarface",
    },
    {
      key: "b7",
      id: "a7",
      title: "Blow",
    },
    {
      key: "b8",
      id: "a8",
      title: "Taxi Driver",
    },
    {
      key: "b9",
      id: "a9",
      title: "Carlito's Way",
    },
    {
      key: "b10",
      id: "a10",
      title: "The Green Mile",
    },
  ];

  let bestMoviesRandom = [...bestMovies];

  const shuffleArray = (arr) => {
    let currentIndex = arr.length;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex],
        arr[currentIndex],
      ];
    }
    return arr;
  };

  bestMoviesRandom = shuffleArray(bestMoviesRandom);

  const [bestMoviesRandomList, setBestMoviesRandomList] = useState([
    ...bestMoviesRandom,
  ]);

  // useEffect(() => {
  //   for (let i = 0; i < bestMoviesRandomList.length; i++) {
  //     if (bestMovies[i].title === bestMoviesRandomList[i].title) {
  //       console.log(bestMoviesRandomList[i].title);
  //       let updatedList = bestMoviesRandomList.map((item) => {
  //         if (bestMovies[i].title === bestMoviesRandomList[i].title) {
  //           return {
  //             ...item,
  //             title: `${bestMoviesRandomList[i].title} <<Correct`,
  //           };
  //         }
  //         return item;
  //       });
  //       setBestMoviesRandomList(updatedList);
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   for (let i = 0; i < bestMoviesRandomList.length; i++) {
  //     if (bestMovies[i].title === bestMoviesRandomList[i].title) {
  //       return { title: `${bestMoviesRandomList[i].title} <<correct` };
  //     }
  //   }
  // }, []);

  useEffect(() => {
    setResult(
      bestMoviesRandomList.every((item, index) => {
        return +item.id.slice(1) === index + 1;
      })
    );
  }, [bestMoviesRandomList]);

  console.log(result);

  useEffect(() => {
    let updatedMovies = bestMoviesRandomList.map((item, index) => {
      console.log(+item.id.slice(1), +(index + 1));
      if (+item.id.slice(1) === +(index + 1)) {
        setCheckedId(true);
        return { ...item, title: `${item.title} << correct answer` };
        // return { ...item, title: `${(<Correct>{item.title}</Correct>)}` };
      }
      return item;
    });
    setBestMoviesRandomList(updatedMovies);
  }, []);

  const dragStartHandler = (e) => {
    setStartIndex(+e.target.getAttribute("index"));
    setStartElement(e.target);
  };

  const dragEnterHandler = (e) => {
    e.target.classList.add("greyBackground");
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const dragLeaveHandler = (e) => {
    e.target.classList.remove("greyBackground");
  };

  const dragDropHandler = (e) => {
    e.target.classList.remove("greyBackground");
    setBestMoviesRandomList((bestMoviesRandomList) => {
      let data = [...bestMoviesRandomList];

      let dropElementText = data[+e.target.getAttribute("index")];
      data[+e.target.getAttribute("index")] = data[startIndex];
      data[startIndex] = dropElementText;

      if (data[startIndex].title === bestMovies[startIndex].title) {
        e.target.classList.add("green");
      } else {
        e.target.classList.remove("green");
      }
      if (
        data[+e.target.getAttribute("index")].title ===
        bestMovies[+e.target.getAttribute("index")].title
      ) {
        startElement.classList.add("green");
      } else {
        startElement.classList.remove("green");
      }

      return data;
    });
  };

  return (
    <>
      <div className="app">
        <h1>Top 10 Crime Movies Of All Time</h1>
        <p>Drag and drop the items into their corresponding spots.</p>
        <ul>
          {bestMoviesRandomList.map((item, index) => (
            <li
              key={item.key}
              index={index}
              id={item.id}
              draggable={true}
              onDragStart={dragStartHandler}
              onDragEnter={dragEnterHandler}
              onDragOver={dragOverHandler}
              onDragLeave={dragLeaveHandler}
              onDrop={dragDropHandler}
              className={item.title.includes("<<") ? "green" : ""}
            >
              <span className="number">{index + 1}.</span>
              {item.title}
            </li>
          ))}
        </ul>
      </div>
      {result && <Congratulations />}
    </>
  );
}

export default App;
