import React, {useState, useCallback, FunctionComponent} from "react";
import {View, TouchableOpacity, StyleSheet} from "react-native";

import Typography from "@components/atoms/Typography";
import {COLORS} from "@constants/colors";

export type FeedContentProps = {
  post_header: string;
  post_content: string;
};

const MAX_CONTENT_LENGTH = 120;

const FeedContent: FunctionComponent<FeedContentProps> = ({
  post_header,
  post_content,
}) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = useCallback(() => {
    setExpanded(!expanded);
  }, [expanded]);

  const shouldShowReadMore = post_content.length > MAX_CONTENT_LENGTH;
  const displayContent = expanded
    ? post_content
    : `${post_content.slice(0, MAX_CONTENT_LENGTH)}...`;

  return (
    <View style={styles.postContent}>
      <Typography type="heading" size="medium" style={styles.postHeader}>
        {post_header}
      </Typography>
      <Typography type="paragraph" size="medium" style={styles.contentText}>
        {displayContent}
      </Typography>
      {shouldShowReadMore && (
        <TouchableOpacity onPress={toggleExpand} style={styles.readMoreButton}>
          <Typography
            type="paragraph"
            size="medium"
            style={styles.readMoreText}>
            {expanded ? "Baca Lebih Sedikit" : "Baca Lebih Lanjut"}
          </Typography>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  postContent: {gap: 4},
  postHeader: {color: COLORS.neutral700},
  contentText: {color: COLORS.neutral700},
  readMoreButton: {marginTop: 8},
  readMoreText: {color: COLORS.neutral500},
});

export default FeedContent;
