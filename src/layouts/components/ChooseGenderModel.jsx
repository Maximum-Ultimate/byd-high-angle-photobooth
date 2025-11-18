import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";

import male1 from "../../assets/models/male1.jpg";
import male2 from "../../assets/models/male2.jpg";
import male3 from "../../assets/models/male3.jpg";

import female1 from "../../assets/models/female1.jpg";
import female2 from "../../assets/models/female2.jpg";
import female3 from "../../assets/models/female3.jpg";
import female4 from "../../assets/models/female4.jpg";
import female5 from "../../assets/models/female5.jpg";

import { ArrowLeft, ArrowRight, Mars, Triangle, Venus } from "lucide-solid";
import menGenderBase from "../../assets/img/menIdle.webp";
import menGenderBaseClicked from "../../assets/img/menActive.webp";
import womenGenderBase from "../../assets/img/womenIdle.webp";
import womenGenderBaseClicked from "../../assets/img/womenActive.webp";
// import rightArrow from "../../assets/img/rightArrow.webp";
// import leftArrow from "../../assets/img/leftArrow.webp";
import sfxButton from "../../assets/sfx/sfxbtn.mp3";
import styles from "../../App.module.css";

export default function ChooseGenderModel() {
  const navigate = useNavigate();
  const buttonSound = new Audio(sfxButton);
  const [selectedGender, setSelectedGender] = createSignal(null);
  const [isMaleActive, setIsMaleActive] = createSignal(false);
  const [isFemaleActive, setIsFemaleActive] = createSignal(false);
  const [currentIndex, setCurrentIndex] = createSignal(0);

  // untuk swipe manual
  const [dragStartX, setDragStartX] = createSignal(null);
  const [dragOffset, setDragOffset] = createSignal(0);
  const [isDragging, setIsDragging] = createSignal(false);

  const maleModels = [
    { id: 1, src: male1, alt: "Male Model 1" },
    { id: 2, src: male2, alt: "Male Model 2" },
    { id: 3, src: male3, alt: "Male Model 3" },
  ];

  const femaleModels = [
    { id: 1, src: female1, alt: "Female Model 1" },
    { id: 2, src: female2, alt: "Female Model 2" },
    { id: 3, src: female3, alt: "Female Model 3" },
    { id: 4, src: female4, alt: "Female Model 4" },
    { id: 5, src: female5, alt: "Female Model 5" },
  ];

  const getModels = () => (selectedGender() === 1 ? maleModels : femaleModels);

  const handleGenderClick = (gender) => {
    buttonSound.play();

    if (gender === "male") {
      setIsMaleActive(true);
      setTimeout(() => {
        setIsMaleActive(false);
        setSelectedGender(1);
        setCurrentIndex(0);
      }, 300);
    } else {
      setIsFemaleActive(true);
      setTimeout(() => {
        setIsFemaleActive(false);
        setSelectedGender(2);
        setCurrentIndex(0);
      }, 300);
    }
  };

  const handleModelSelect = (model) => {
    buttonSound.play();
    setTimeout(() => {
      navigate(`/take-photo-ai?gender=${selectedGender()}&modelId=${model.id}`);
    }, 800);
  };

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1) % getModels().length);

  const prevSlide = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + getModels().length) % getModels().length
    );

  // gesture kiri-kanan
  const handlePointerDown = (e) => {
    setDragStartX(e.clientX || e.touches?.[0]?.clientX);
    setIsDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!isDragging()) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX;
    setDragOffset(currentX - dragStartX());
  };

  const handlePointerUp = () => {
    if (!isDragging()) return;

    if (dragOffset() > 100) {
      prevSlide();
    } else if (dragOffset() < -100) {
      nextSlide();
    }

    setDragOffset(0);
    setIsDragging(false);
  };

  return (
    <div class="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden text-white">
      <div
        class={`flex flex-col items-center px-5 gap-20 ${styles.fadeIn}`}
        style={{ "font-family": "Conthrax" }}
      >
        {/* pilihan gender */}
        {selectedGender() === null ? (
          <div class="flex flex-col gap-16 mt-10 text-center">
            <p
              class="text-[65px] text-[#00774a] text-center tracking-widest leading-20"
              style={{ "font-family": "BCAFont" }}
            >
              Pilih Jenis Kelamin
            </p>
            <div class="flex gap-24 justify-center">
              <button
                onClick={() => handleGenderClick("male")}
                class="flex flex-col w-[400px] h-[400px] items-center justify-center rounded-2xl hover:scale-110 active:scale-90 duration-300 transition-all"
                style={{
                  "background-image": `url(${
                    !isMaleActive() ? menGenderBase : menGenderBaseClicked
                  })`,
                  "background-size": "cover",
                  "background-position": "center",
                }}
              ></button>

              <button
                onClick={() => handleGenderClick("female")}
                class="flex flex-col w-[400px] h-[400px] items-center justify-center rounded-2xl hover:scale-110 active:scale-90 duration-300 transition-all"
                style={{
                  "background-image": `url(${
                    !isFemaleActive() ? womenGenderBase : womenGenderBaseClicked
                  })`,
                  "background-size": "cover",
                  "background-position": "center",
                }}
              ></button>
            </div>
          </div>
        ) : (
          // bagian slider model
          <div class="relative w-full max-w-[2000px] h-screen flex flex-col items-center justify-center text-black">
            {/* Judul */}
            <p
              class="absolute top-[340px] text-[65px] text-[#00774a] text-center tracking-widest leading-20"
              style={{ "font-family": "BCAFont" }}
            >
              Pilih Karakter Mu
            </p>
            {/* Wrapper foto + tombol */}
            <div class="relative flex items-center justify-center w-full mt-[200px]">
              {/* Tombol kiri */}
              <button
                onClick={prevSlide}
                class="absolute -left-[90px] top-1/2 -translate-y-1/2 
         w-[130px] h-[209px] transition-transform z-20
         hover:scale-110 active:scale-90 animate-glow"
                // style={{
                //   "background-image": `url(${leftArrow})`,
                //   "background-size": "cover",
                //   "background-position": "center",
                //   filter: "drop-shadow(0 0 8px rgba(255, 0, 0, 0.6))",
                // }}
              >
                <Triangle class="rotate-270 text-[#00774a]" size={100} />
              </button>

              <div
                class="relative flex items-center justify-center px-52 w-[860px] h-[1800px] overflow-hidden"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onTouchStart={handlePointerDown}
                onTouchMove={handlePointerMove}
                onTouchEnd={handlePointerUp}
              >
                {getModels().map((model, index) => {
                  const offset = index - currentIndex();
                  const isActive = index === currentIndex();

                  return (
                    <div
                      onClick={(e) => {
                        const imgEl = e.currentTarget.querySelector("img");
                        imgEl.classList.add("flash-glow");
                        setTimeout(
                          () => imgEl.classList.remove("flash-glow"),
                          600
                        );

                        handleModelSelect(model);
                      }}
                      class={`absolute cursor-pointer transition-all duration-[700ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
                        isActive ? "z-20" : "z-10"
                      }`}
                      style={{
                        transform: `translateX(${
                          offset * 400 + dragOffset()
                        }px) scale(${isActive ? 1 : 0.7}) rotateY(${
                          offset * -30
                        }deg)`,
                        opacity: Math.abs(offset) > 2 ? 0 : 1,
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                    >
                      <img
                        src={model.src}
                        alt={model.alt}
                        class={`rounded-[60px] w-[800px] h-auto object-contain p-[5px] transition-all duration-[700ms] ${
                          isActive ? "glow-pulse" : "opacity-70"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Tombol kanan */}
              <button
                onClick={nextSlide}
                class="absolute -right-[115px] top-1/2 -translate-y-1/2 
         w-[130px] h-[209px] text-4xl transition-transform z-20 
         hover:scale-110 active:scale-90 animate-glow"
                // style={{
                //   "background-image": `url(${rightArrow})`,
                //   "background-size": "cover",
                //   "background-position": "center",
                //   filter: "drop-shadow(0 0 8px rgba(255, 0, 0, 0.6))",
                // }}
              >
                <Triangle class="rotate-90 text-[#00774a]" size={100} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
