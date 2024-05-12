CREATE MIGRATION m1wtw7y2zr4c5juzfhftkf7xmeue5ogtjzaylxcp2zqrnt5stcycha
    ONTO m16dcggy75aif3c2owarnrr3e27w6tsjvla63d53pcug6xxyfidoca
{
  ALTER TYPE default::Ideas {
      DROP LINK domainList;
  };
  ALTER TYPE default::Ideas {
      DROP LINK redditRelatedPosts;
  };
  ALTER TYPE default::Ideas {
      DROP LINK topCompetitors;
  };
  ALTER TYPE default::Ideas {
      CREATE PROPERTY domainList: array<std::json>;
  };
  ALTER TYPE default::Ideas {
      CREATE PROPERTY redditRelatedPosts: array<std::json>;
  };
  ALTER TYPE default::Ideas {
      CREATE PROPERTY topCompetitors: array<std::json>;
  };
};
