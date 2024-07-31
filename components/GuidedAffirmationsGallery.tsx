import { GalleryPreviewData } from "@/constants/models/AffirmationCategory";
import { Link } from "expo-router";
import { View, Text, FlatList, Pressable, Image } from "react-native";

interface GuidedAffirmationsGalleryProps {
  title: string;
  previews: GalleryPreviewData[];
}

const GuidedAffirmationsGallery: React.FC<GuidedAffirmationsGalleryProps> = ({
  previews,
  title,
}) => {
  return (
    <View className="my-5">
      <View className="mb-2">
        <Text className="text-white font-bold text-xl">{title}</Text>
      </View>

      <View className="space-y-2">
        <FlatList
          horizontal
          data={previews}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Link href={`/affirmations/${item.id}`} asChild>
              {/* We use 'asChild' prop since we are not simply specifying a simple text string as the child of the Link element but rather a more complex child component */}
              <Pressable>
                <View className="h-36 w-32 rounded-md mr-4">
                  <Image
                    source={item.image}
                    resizeMode="cover"
                    className="w-full h-full"
                  />
                </View>
              </Pressable>
            </Link>
          )}
        />
      </View>
    </View>
  );
};

export default GuidedAffirmationsGallery;
