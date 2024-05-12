CREATE MIGRATION m1ptobnwxuqk6ltws5tuqwerxko5azmluxlv7cbxvyy7f3rksvyjza
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
