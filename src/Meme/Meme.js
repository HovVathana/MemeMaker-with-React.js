import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./styles.module.css";

export const Meme = () => {
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [captions, setCaptions] = useState([]);

  const history = useHistory();

  const updateCaption = (e, index) => {
    const text = e.target.value || "";
    setCaptions(
      captions.map((val, i) => {
        return index === i ? text : val;
      })
    );
  };

  const noneEmpty = (arr) => {
    for (var i = 0; i < arr.length; i++) {
      return arr[i] === "";
    }
  };

  const makeMeme = () => {
    const currentMeme = memes[memeIndex];
    const formData = new FormData();

    formData.append("username", "nana_2005");
    formData.append("password", "123456789");
    formData.append("template_id", currentMeme.id);
    captions.forEach((val, index) =>
      formData.append(`boxes[${index}][text]`, val)
    );

    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: formData,
    }).then((res) => {
      res.json().then((res) => {
        history.push(`/generated?url=${res.data.url}`);
        console.log(history);
      });
    });
  };

  const shuffleMemes = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  };

  useEffect(() => {
    document.title = "MAKE MEME";
  }, []);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then((x) => {
      x.json().then((res) => {
        const _memes = res.data.memes;
        shuffleMemes(_memes);
        setMemes(_memes);
      });
    });
  }, []);

  useEffect(() => {
    if (memes.length) {
      setCaptions(Array(memes[memeIndex].box_count).fill(""));
    }
  }, [memeIndex, memes]);

  return memes.length ? (
    <div>
      <div>
        <button onClick={makeMeme} disabled={noneEmpty(captions)}>
          <span>Make</span>
        </button>

        <button onClick={() => setMemeIndex(memeIndex + 1)}>
          <span>Skip</span>
        </button>
      </div>
      {captions.map((value, index) => (
        <div>
          <input
            placeholder="text"
            onChange={(e) => updateCaption(e, index)}
            key={index}
          />
        </div>
      ))}

      <img
        alt={memes[memeIndex].name}
        key={memes[memeIndex].id}
        src={memes[memeIndex].url}
      />
    </div>
  ) : (
    <></>
  );
};
