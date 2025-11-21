import { createSignal, onCleanup, onMount } from "solid-js";
import { Router, Route } from "@solidjs/router";
import Home from "./layouts/components/Home";
import Loading from "./layouts/Loading";
import NotFoundPage from "./layouts/NotFoundPage";
import backgroundPhotobooth from "./assets/img/bgPhotobooth.webp";
import bgmPhotobooth from "./assets/sfx/bgmphotobooth.mp3";

import backgroundPhotoboothVideo from "./assets/videos/bgMain.mp4";
import bgImage from "./assets/img/background.webp";
import bgmMain from "./assets/sfx/bgm1.mp3";
import ChooseGenderModel from "./layouts/components/ChooseGenderModel";
import TakePhoto from "./layouts/components/TakePhoto";

let bgmAudio;

function App() {
  const [loading, setLoading] = createSignal(true);
  const [hasPlayed, setHasPlayed] = createSignal(false);

  const handleUserInteraction = () => {
    if (!hasPlayed()) {
      bgmAudio = new Audio(bgmPhotobooth);
      bgmAudio.loop = true;
      bgmAudio.volume = 0.5;

      bgmAudio
        .play()
        .then(() => {
          console.log("BGM started after user interaction");
          setHasPlayed(true);
        })
        .catch((err) => {
          console.warn("Play failed after interaction:", err);
        });

      document.removeEventListener("click", handleUserInteraction);
    }
  };

  // Pasang event listener 1x aja
  document.addEventListener("click", handleUserInteraction);

  // Cleanup biar gak double listener kalau komponen re-mount
  onCleanup(() => {
    document.removeEventListener("click", handleUserInteraction);
  });

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  return (
    <div
      class="flex flex-col items-center min-h-screen bg-cover bg-center"
      style={{
        "background-image": `url(${bgImage})`,
        "background-size": "cover",
        "background-position": "center",
        "background-repeat": "no-repeat",
      }}
    >
      {/* <video
        src={backgroundPhotoboothVideo}
        autoplay
        muted
        playsinline
        loop
        class="absolute inset-0 w-full h-full object-cover z-0"
      /> */}
      {loading() ? (
        <Loading />
      ) : (
        <Router>
          <Route path="/" component={Home} />
          <Route path="/take-photo" component={TakePhoto} />
          <Route path="/choose-gender-model" component={ChooseGenderModel} />
          <Route path="/loading" component={Loading} />
          <Route path="/*" component={NotFoundPage} />
        </Router>
      )}
    </div>
  );
}

export default App;
