import React, {useEffect, useState} from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import {Typography} from "@components/atoms";
import {COLORS} from "@constants/colors";
import analytics from "@react-native-firebase/analytics";
import InvestlyServices, {Topic} from "@services/InvestlyServices";

interface Step3Props {
  formData: {
    email: string;
    name: string;
    username: string;
    selectedTopics: string[];
  };
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const Step3: React.FC<Step3Props> = ({formData, setFormData}) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadTopics = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const fetchedTopics = await fetchTopics();
        setTopics(fetchedTopics);
      } catch (err) {
        setError("Failed to fetch topics");
      } finally {
        setIsLoading(false);
      }
    };

    loadTopics();
  }, []);

  const fetchTopics = async () => {
    const response = await InvestlyServices.getTopics();
    if (response.data.status) {
      return response.data.data;
    }
    throw new Error("Failed to fetch topics");
  };

  const handleTopicSelection = (topic: Topic) => {
    setFormData(prev => {
      const updatedTopics = prev.selectedTopics.includes(topic.id)
        ? prev.selectedTopics.filter((t: string) => t !== topic.id)
        : [...prev.selectedTopics, topic.id].slice(0, 3);

      const analyticsEvent = prev.selectedTopics.includes(topic.id)
        ? "click_register_unselect_topic"
        : "click_register_select_topic";

      analytics().logEvent(analyticsEvent, {
        email: formData.email,
        name: formData.name,
        username: formData.username,
        topic_id: topic.id,
        topic_name: topic.label,
      });

      return {...prev, selectedTopics: updatedTopics};
    });
  };

  if (isLoading)
    return <ActivityIndicator size="large" color={COLORS.purple500} />;
  if (error)
    return (
      <Typography type="special" size="large">
        {error}
      </Typography>
    );

  return (
    <View style={styles.topicContainer}>
      <FlatList
        data={topics}
        keyExtractor={item => item.id}
        numColumns={3}
        renderItem={({item}) => (
          <TopicItem
            topic={item}
            isSelected={formData.selectedTopics.includes(item.id)}
            onSelect={handleTopicSelection}
          />
        )}
      />
    </View>
  );
};

interface TopicItemProps {
  topic: Topic;
  isSelected: boolean;
  onSelect: (topic: Topic) => void;
}

const TopicItem: React.FC<TopicItemProps> = ({topic, isSelected, onSelect}) => (
  <View style={styles.topicCard}>
    <Pressable
      style={[styles.topic, isSelected && styles.selectedTopic]}
      onPress={() => onSelect(topic)}>
      <Image
        source={{uri: topic.file.full_path}}
        style={[styles.topicImage, isSelected && styles.selectedImage]}
      />
    </Pressable>
    <Typography
      type="heading"
      size="xsmall"
      numberOfLines={2}
      ellipsizeMode="tail"
      style={[styles.topicLabel, isSelected && styles.selectedTopicLabel]}>
      {topic.label}
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  topicContainer: {
    gap: 1,
    rowGap: 16,
    columnGap: 10,
  },
  topicCard: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    gap: 4,
    minHeight: 120,
    maxHeight: 140,
    marginTop: 16,
  },
  topic: {
    borderWidth: 4,
    borderColor: COLORS.neutral100,
  },
  topicLabel: {
    textAlign: "center",
    width: 97.33,
  },
  selectedTopic: {
    borderColor: COLORS.purple500,
    borderWidth: 4,
    borderRadius: 8,
  },
  topicImage: {
    borderRadius: 8,
    width: 97.33,
    height: 96,
  },
  selectedImage: {
    borderRadius: 0,
  },
  selectedTopicLabel: {
    color: COLORS.purple700,
  },
});

export default Step3;
