import type { DatasetInfo, DatasetPreview, Options, PredictionResult, CompareAllResult } from "./api";

export const mockHealth = {
  status: "healthy",
  models_loaded: ["logistic_regression", "decision_tree", "random_forest"],
  dataset_rows: 5000,
};

export const mockOptions: Options = {
  platforms: ["Instagram", "YouTube", "TikTok", "Twitter", "Facebook", "LinkedIn"],
  content_types: ["Post", "Story", "Reel", "Video", "Short", "Tweet", "Thread", "Carousel", "Photo", "Poll", "Live", "Article", "Document", "Duet", "Stitch", "Retweet", "Community Post"],
  categories: ["Business", "Health", "Technology", "Entertainment", "Education", "Lifestyle", "Finance", "Sports", "Food", "Travel"],
  time_periods: ["Morning", "Afternoon", "Evening", "Night"],
};

export const mockDatasetInfo: DatasetInfo = {
  total_rows: 5000,
  total_columns: 20,
  columns: [
    "Platform", "Content_Type", "Category", "Likes", "Comments", "Shares",
    "Views", "Saves", "Follower_Count", "Engagement_Rate", "Hour_of_Day",
    "Day_of_Week", "Hashtag_Count", "Content_Length", "Sentiment",
    "Influencer_Tier", "Has_Media", "Is_Verified", "Time_Period", "Engagement_Class",
  ],
  engagement_class_distribution: { "0": 2499, "1": 2501 },
  platform_distribution: { Instagram: 920, YouTube: 850, TikTok: 880, Twitter: 780, Facebook: 820, LinkedIn: 750 },
  content_type_distribution: { Post: 377, Story: 568, Reel: 305, Video: 628, Short: 121, Tweet: 239, Thread: 235, Carousel: 333, Photo: 319, Poll: 380, Live: 356, Article: 116, Document: 131, Duet: 248, Stitch: 258, Retweet: 251, "Community Post": 135 },
  category_distribution: { Business: 520, Health: 490, Technology: 510, Entertainment: 530, Education: 480, Lifestyle: 500, Finance: 470, Sports: 500, Food: 490, Travel: 510 },
  time_period_distribution: { Morning: 1280, Afternoon: 1250, Evening: 1270, Night: 1200 },
  numeric_stats: {
    Likes: { mean: 4995, std: 6850, min: 10, max: 98000 },
    Comments: { mean: 263, std: 350, min: 1, max: 5200 },
    Shares: { mean: 545, std: 720, min: 1, max: 9800 },
    Views: { mean: 43200, std: 58000, min: 50, max: 950000 },
    Saves: { mean: 480, std: 620, min: 0, max: 8500 },
    Follower_Count: { mean: 325000, std: 280000, min: 500, max: 2000000 },
    Engagement_Rate: { mean: 4.2, std: 5.8, min: 0.01, max: 98.5 },
  },
};

const previewRows: Record<string, string | number>[] = [
  { Platform: "Instagram", Content_Type: "Carousel", Category: "Business", Likes: 8287, Comments: 247, Shares: 51, Views: 29502, Saves: 20, Follower_Count: 223080, Engagement_Rate: 3.85, Hour_of_Day: 1, Day_of_Week: "Monday", Hashtag_Count: 16, Content_Length: 985, Sentiment: "Positive", Influencer_Tier: "Macro", Has_Media: "Yes", Is_Verified: "No", Time_Period: "Night", Engagement_Class: 1 },
  { Platform: "LinkedIn", Content_Type: "Document", Category: "Health", Likes: 1711, Comments: 27, Shares: 247, Views: 24538, Saves: 139, Follower_Count: 312647, Engagement_Rate: 0.63, Hour_of_Day: 5, Day_of_Week: "Monday", Hashtag_Count: 9, Content_Length: 627, Sentiment: "Negative", Influencer_Tier: "Macro", Has_Media: "No", Is_Verified: "Yes", Time_Period: "Morning", Engagement_Class: 0 },
  { Platform: "TikTok", Content_Type: "Stitch", Category: "Entertainment", Likes: 45200, Comments: 1200, Shares: 3400, Views: 520000, Saves: 4500, Follower_Count: 890000, Engagement_Rate: 12.5, Hour_of_Day: 20, Day_of_Week: "Saturday", Hashtag_Count: 5, Content_Length: 350, Sentiment: "Positive", Influencer_Tier: "Mega", Has_Media: "Yes", Is_Verified: "Yes", Time_Period: "Night", Engagement_Class: 1 },
  { Platform: "YouTube", Content_Type: "Video", Category: "Technology", Likes: 12300, Comments: 560, Shares: 890, Views: 185000, Saves: 780, Follower_Count: 456000, Engagement_Rate: 5.2, Hour_of_Day: 14, Day_of_Week: "Wednesday", Hashtag_Count: 8, Content_Length: 1200, Sentiment: "Positive", Influencer_Tier: "Macro", Has_Media: "Yes", Is_Verified: "Yes", Time_Period: "Afternoon", Engagement_Class: 1 },
  { Platform: "Twitter", Content_Type: "Tweet", Category: "Lifestyle", Likes: 320, Comments: 45, Shares: 89, Views: 12500, Saves: 15, Follower_Count: 45000, Engagement_Rate: 0.95, Hour_of_Day: 9, Day_of_Week: "Tuesday", Hashtag_Count: 3, Content_Length: 280, Sentiment: "Neutral", Influencer_Tier: "Micro", Has_Media: "No", Is_Verified: "No", Time_Period: "Morning", Engagement_Class: 0 },
  { Platform: "Facebook", Content_Type: "Post", Category: "Food", Likes: 2100, Comments: 180, Shares: 340, Views: 45000, Saves: 95, Follower_Count: 178000, Engagement_Rate: 2.1, Hour_of_Day: 18, Day_of_Week: "Friday", Hashtag_Count: 6, Content_Length: 550, Sentiment: "Positive", Influencer_Tier: "Macro", Has_Media: "Yes", Is_Verified: "No", Time_Period: "Evening", Engagement_Class: 1 },
  { Platform: "Instagram", Content_Type: "Reel", Category: "Travel", Likes: 18500, Comments: 890, Shares: 2100, Views: 320000, Saves: 3200, Follower_Count: 670000, Engagement_Rate: 8.7, Hour_of_Day: 12, Day_of_Week: "Sunday", Hashtag_Count: 12, Content_Length: 420, Sentiment: "Positive", Influencer_Tier: "Macro", Has_Media: "Yes", Is_Verified: "Yes", Time_Period: "Afternoon", Engagement_Class: 1 },
  { Platform: "LinkedIn", Content_Type: "Article", Category: "Finance", Likes: 450, Comments: 35, Shares: 120, Views: 18000, Saves: 65, Follower_Count: 95000, Engagement_Rate: 0.42, Hour_of_Day: 8, Day_of_Week: "Monday", Hashtag_Count: 4, Content_Length: 1800, Sentiment: "Neutral", Influencer_Tier: "Micro", Has_Media: "No", Is_Verified: "No", Time_Period: "Morning", Engagement_Class: 0 },
  { Platform: "TikTok", Content_Type: "Duet", Category: "Entertainment", Likes: 38900, Comments: 980, Shares: 2800, Views: 480000, Saves: 3900, Follower_Count: 720000, Engagement_Rate: 11.2, Hour_of_Day: 21, Day_of_Week: "Friday", Hashtag_Count: 7, Content_Length: 300, Sentiment: "Positive", Influencer_Tier: "Mega", Has_Media: "Yes", Is_Verified: "Yes", Time_Period: "Night", Engagement_Class: 1 },
  { Platform: "YouTube", Content_Type: "Short", Category: "Education", Likes: 8700, Comments: 320, Shares: 560, Views: 95000, Saves: 420, Follower_Count: 280000, Engagement_Rate: 4.8, Hour_of_Day: 16, Day_of_Week: "Thursday", Hashtag_Count: 3, Content_Length: 200, Sentiment: "Positive", Influencer_Tier: "Macro", Has_Media: "Yes", Is_Verified: "No", Time_Period: "Afternoon", Engagement_Class: 1 },
];

export const mockDatasetPreview: DatasetPreview = {
  columns: [
    "Platform", "Content_Type", "Category", "Likes", "Comments", "Shares",
    "Views", "Saves", "Follower_Count", "Engagement_Rate", "Hour_of_Day",
    "Day_of_Week", "Hashtag_Count", "Content_Length", "Sentiment",
    "Influencer_Tier", "Has_Media", "Is_Verified", "Time_Period", "Engagement_Class",
  ],
  rows: previewRows,
};

export function mockPredict(): PredictionResult {
  return {
    model_name: "random_forest",
    prediction: "High Engagement",
    prediction_label: 1,
    high_engagement_probability: 0.78,
  };
}

export function mockPredictAll(): CompareAllResult {
  return {
    logistic_regression: {
      prediction: "High Engagement",
      prediction_label: 1,
      probability: 0.72,
    },
    decision_tree: {
      prediction: "High Engagement",
      prediction_label: 1,
      probability: 1.0,
    },
    random_forest: {
      prediction: "High Engagement",
      prediction_label: 1,
      probability: 0.78,
    },
  };
}
