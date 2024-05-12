CREATE MIGRATION m1id7ligz6wpteybkpvaek63ttqhtbx6v23wibtqduyrk6n3ysuuqq
    ONTO m1gf4dvdyoge2azdp44c6zun73boydqdbxkkqaitk5mpvqlvrv7xpq
{
  ALTER TYPE default::Ideas {
      ALTER PROPERTY keyword {
          RESET CARDINALITY USING (SELECT
              .keyword 
          LIMIT
              1
          );
          SET REQUIRED USING (<std::str>{});
      };
  };
  ALTER TYPE default::KeywordMetrics {
      DROP PROPERTY g_m12;
      DROP PROPERTY g_m3;
      DROP PROPERTY g_m6;
      DROP PROPERTY text;
  };
};
