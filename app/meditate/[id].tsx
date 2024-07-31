import { View, Text, ImageBackground, Pressable } from "react-native";
import MEDITATION_IMAGES from "@/constants/meditation-images";
import AppGradient from "@/components/AppGradient";
import { router, useLocalSearchParams } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import { useContext, useEffect, useState } from "react";
import { Audio } from "expo-av";
import { AUDIO_FILES, MEDITATION_DATA } from "@/constants/meditation-data";
import { TimerContext } from "@/context/TimerContext";

const Meditate = () => {
  const { id } = useLocalSearchParams();

  const { duration, setDuration } = useContext(TimerContext);

  // const [secondsRemaining, setSecondsRemaining] = useState(10);
  const [isMeditating, setIsMeditating] = useState(false);

  const [audioSound, setAudioSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    // Exit
    if (duration === 0) {
      setIsMeditating(false);
      return;
    }

    if (isMeditating) {
      timerId = setTimeout(() => {
        setDuration(duration - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [duration, isMeditating]);

  useEffect(() => {
    // we call this function when we click the 'back' button and the component unmounts
    return () => {
      setDuration(10);
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  const toggleMeditationSessionStatus = async () => {
    if (duration === 0) setDuration(10);

    setIsMeditating(!isMeditating);

    await toggleSound();
  };

  const toggleSound = async () => {
    const sound = audioSound ? audioSound : await initializeSound();

    const status = await sound?.getStatusAsync();

    if (status?.isLoaded && !isPlayingAudio) {
      await sound.playAsync();
      setIsPlayingAudio(true);
    } else {
      await sound.pauseAsync();
      setIsPlayingAudio(false);
    }
  };

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);

    setAudioSound(sound);

    return sound;
  };

  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();

    router.push("/(modal)/adjust-meditation-duration");
  };

  // format the time left to ensure two digits are displayed
  const formattedTimeMinutes = String(Math.floor(duration / 60)).padStart(
    2,
    "0"
  );

  const formattedTimeSeconds = String(duration % 60).padStart(2, "0");

  return (
    <View className="flex-1">
      <ImageBackground
        source={MEDITATION_IMAGES[Number(id) - 1]}
        resizeMode="cover"
        className="flex-1"
      >
        <AppGradient colors={["transparent", "rgba(0,0,0,0.8)"]}>
          <Pressable
            onPress={() => router.back()}
            className="absolute top-16 left-6 z-10"
          >
            <AntDesign name="leftcircleo" size={50} color="white" />
          </Pressable>

          <View className="flex-1 justify-center">
            <View className="mx-auto bg-neutral-200 rounded-full w-44 h-44 justify-center items-center">
              <Text className="text-4xl text-blue-800 font-rmono">
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </View>

          <View className="mb-5">
            <CustomButton
              title="Adjust Meditation"
              onPress={handleAdjustDuration}
            />

            <CustomButton
              title={isMeditating ? "Stop" : "Start Meditation"}
              onPress={toggleMeditationSessionStatus}
              containerStyles="mt-4"
            />
          </View>
        </AppGradient>
      </ImageBackground>
    </View>
  );
};

export default Meditate;
