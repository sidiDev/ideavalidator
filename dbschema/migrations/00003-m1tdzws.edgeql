CREATE MIGRATION m1tdzwsb74eq3ed4varkdss4tarxvdl5mqp2skhvh4zznr44kojcoa
    ONTO m1k5id5qd4akyx3po4kr4haeogp4h7r7l7hveticoiae3xlrsy3c5a
{
  CREATE TYPE default::Competitors {
      CREATE REQUIRED PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY link: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::Domain {
      CREATE PROPERTY available: std::bool;
      CREATE REQUIRED PROPERTY domain: std::str;
      CREATE PROPERTY isPremiumName: std::bool;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::Ideas {
      CREATE REQUIRED PROPERTY description: std::str;
      CREATE PROPERTY domainList: array<std::json>;
      CREATE REQUIRED PROPERTY keyword: std::str;
      CREATE PROPERTY keywords: array<std::json>;
      CREATE PROPERTY redditRelatedPosts: array<std::json>;
      CREATE REQUIRED PROPERTY slug: std::str;
      CREATE PROPERTY topCompetitors: array<std::json>;
      CREATE REQUIRED PROPERTY userId: std::str;
  };
  CREATE TYPE default::KeywordMetrics {
      CREATE REQUIRED PROPERTY avgSearches: std::int64;
      CREATE REQUIRED PROPERTY c: std::str;
      CREATE REQUIRED PROPERTY cIx: std::int64;
      CREATE REQUIRED PROPERTY high: std::int64;
      CREATE REQUIRED PROPERTY low: std::int64;
  };
  CREATE TYPE default::Keywords {
      CREATE REQUIRED LINK metrics: default::KeywordMetrics;
      CREATE REQUIRED PROPERTY text: std::str;
  };
  CREATE TYPE default::RedditRelatedPostData {
      CREATE REQUIRED PROPERTY created: std::int64;
      CREATE REQUIRED PROPERTY selftext: std::str;
      CREATE REQUIRED PROPERTY subreddit: std::str;
      CREATE REQUIRED PROPERTY title: std::str;
      CREATE REQUIRED PROPERTY url: std::str;
  };
};
