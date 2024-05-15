CREATE MIGRATION m1pqvrgucwhyol44niq3atqnc6odf3rn2p6jwndvassrhtpp2eoq4a
    ONTO initial
{
  CREATE EXTENSION pgcrypto VERSION '1.3';
  CREATE EXTENSION auth VERSION '1.0';
  CREATE FUTURE nonrecursive_access_policies;
  CREATE TYPE default::Account {
      CREATE REQUIRED PROPERTY provider: std::str;
      CREATE REQUIRED PROPERTY providerAccountId: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE CONSTRAINT std::exclusive ON ((.provider, .providerAccountId));
      CREATE PROPERTY access_token: std::str;
      CREATE PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE PROPERTY expires_at: std::int64;
      CREATE PROPERTY id_token: std::str;
      CREATE PROPERTY refresh_token: std::str;
      CREATE PROPERTY scope: std::str;
      CREATE PROPERTY session_state: std::str;
      CREATE PROPERTY token_type: std::str;
      CREATE REQUIRED PROPERTY type: std::str;
  };
  CREATE TYPE default::User {
      CREATE PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY email: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE PROPERTY emailVerified: std::datetime;
      CREATE PROPERTY image: std::str;
      CREATE PROPERTY name: std::str;
  };
  ALTER TYPE default::Account {
      CREATE REQUIRED LINK user: default::User {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY userId := (.user.id);
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK accounts := (.<user[IS default::Account]);
  };
  CREATE TYPE default::Competitor {
      CREATE REQUIRED PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY link: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::Domain {
      CREATE REQUIRED PROPERTY domain: std::str;
      CREATE REQUIRED PROPERTY name: std::str;
  };
  CREATE TYPE default::Growth {
      CREATE REQUIRED PROPERTY m12: std::int64;
      CREATE REQUIRED PROPERTY m3: std::int64;
      CREATE REQUIRED PROPERTY m6: std::int64;
  };
  CREATE TYPE default::Metrics {
      CREATE REQUIRED LINK g: default::Growth;
      CREATE REQUIRED PROPERTY avgSearches: std::int64;
      CREATE REQUIRED PROPERTY c: std::str;
      CREATE REQUIRED PROPERTY cIx: std::int64;
      CREATE REQUIRED PROPERTY high: std::int64;
      CREATE REQUIRED PROPERTY low: std::int64;
  };
  CREATE TYPE default::Keyword {
      CREATE REQUIRED LINK metrics: default::Metrics;
      CREATE REQUIRED PROPERTY text: std::str;
  };
  CREATE TYPE default::Keywords {
      CREATE MULTI LINK keywords: default::Keyword;
      CREATE REQUIRED PROPERTY keyword: std::str;
  };
  CREATE TYPE default::RedditData {
      CREATE REQUIRED PROPERTY created: std::int64;
      CREATE REQUIRED PROPERTY selftext: std::str;
      CREATE REQUIRED PROPERTY subreddit: std::str;
      CREATE REQUIRED PROPERTY title: std::str;
      CREATE REQUIRED PROPERTY url: std::str;
  };
  CREATE TYPE default::RedditPost {
      CREATE REQUIRED LINK data: default::RedditData;
  };
  CREATE TYPE default::Ideas {
      CREATE MULTI LINK topCompetitors: default::Competitor;
      CREATE MULTI LINK domainList: default::Domain;
      CREATE REQUIRED LINK keywords: default::Keywords;
      CREATE MULTI LINK redditRelatedPosts: default::RedditPost;
      CREATE REQUIRED PROPERTY createdAt: std::int64;
      CREATE REQUIRED PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY slug: std::str;
      CREATE REQUIRED PROPERTY userId: std::str;
  };
  CREATE TYPE default::MockedType {
      CREATE PROPERTY name: std::str;
  };
  CREATE TYPE default::Session {
      CREATE REQUIRED LINK user: default::User {
          ON TARGET DELETE DELETE SOURCE;
      };
      CREATE REQUIRED PROPERTY userId := (.user.id);
      CREATE PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY expires: std::datetime;
      CREATE REQUIRED PROPERTY sessionToken: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK sessions := (.<user[IS default::Session]);
  };
  CREATE TYPE default::VerificationToken {
      CREATE REQUIRED PROPERTY identifier: std::str;
      CREATE REQUIRED PROPERTY token: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE CONSTRAINT std::exclusive ON ((.identifier, .token));
      CREATE PROPERTY createdAt: std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY expires: std::datetime;
  };
};
