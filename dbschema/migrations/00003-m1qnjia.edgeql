CREATE MIGRATION m1qnjiaz5etcgqcpkmosolg3oqnw5nczeltyyiwf7nlw6lssc3f5ja
    ONTO m1id7ligz6wpteybkpvaek63ttqhtbx6v23wibtqduyrk6n3ysuuqq
{
  ALTER TYPE default::Ideas {
      DROP LINK keywords;
  };
  ALTER TYPE default::Ideas {
      CREATE MULTI PROPERTY keywords: array<std::json>;
  };
};
