import { useNavigate } from "@solidjs/router";
import styles from "../../App.module.css";
import buttonBase from "../../assets/img/btnBase.webp";
import buttonBaseClicked from "../../assets/img/btnBaseActive.webp";
import sfxButton from "../../assets/sfx/sfxbtn.mp3";
import backgroundHome from "../../assets/videos/bgHome.mp4";
import { createSignal } from "solid-js";
import { useOrientation } from "../../hooks/useOrientation";

export default function Home() {
  const [isActive, setIsActive] = createSignal(false);
  const navigate = useNavigate();
  const buttonSound = new Audio(sfxButton);
  const isLandscape = useOrientation();

  const takePhotoAI = () => {
    setIsActive(true);
    buttonSound.play();
    setTimeout(() => setIsActive(false), 300);
    setTimeout(() => navigate("/take-photo"), 1000);
  };

  return (
    <div class="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
      {/* 🔄 Jika portrait → tampilkan peringatan */}
      {!isLandscape() && (
        <div class="absolute inset-0 bg-black/80 text-white flex flex-col items-center justify-center z-[9999] p-10 text-center">
          <p class="text-4xl font-bold mb-6">Rotate Your Device</p>
          <p class="text-xl opacity-80">
            Aplikasi ini lebih baik digunakan dalam mode landscape.
          </p>
        </div>
      )}

      {/* 🌅 Konten utama hanya muncul kalau landscape */}
      {isLandscape() && (
        <>
          {/* Background Video */}
          {/* <video
            src={backgroundHome}
            autoplay
            muted
            loop
            playsinline
            class="absolute inset-0 w-full h-full object-cover -z-10"
          /> */}

          {/* Main Content */}
          <div
            class={`flex flex-col items-center px-5 gap-40 ${styles.fadeIn} relative z-10`}
            style={{ "font-family": "BYDFont" }}
          >
            <div class="flex flex-col gap-4 w-full">
              <button
                onClick={takePhotoAI}
                style={{
                  "background-image": `url(${!isActive() ? buttonBase : buttonBaseClicked})`,
                  "background-size": "cover",
                  "background-position": "center",
                }}
                class="w-[770px] h-[120px] font-bold mb-24 text-[60px] text-[#00335f] transition-all duration-300 active:scale-90 tracking-wide"
              >
                Buat Foto
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
