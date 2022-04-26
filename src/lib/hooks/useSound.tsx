import { Howl, Howler } from "howler";

export const useSound = (): {
  victorySound: () => void;
  defeatSound: () => void;
  stopSound: () => void;
  finishSound: () => void;
} => {
  const victorySound = () => sfx.victory.play();
  const defeatSound = () => sfx.defeat.play();
  const finishSound = () => sfx.finish.play();

  const stop = Howler.stop;
  const sfx = {
    victory: new Howl({
      src: "/sounds/victory.mp3",
      volume: 0.2,
    }),
    defeat: new Howl({
      src: "/sounds/defeat.mp3",
      volume: 0.2,
    }),
    finish: new Howl({
      src: "/sounds/finish.mp3",
      volume: 0.2,
    }),
  };
  return {
    victorySound,
    defeatSound,
    finishSound,
    stopSound: stop,
  };
};
