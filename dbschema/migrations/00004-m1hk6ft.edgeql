CREATE MIGRATION m1hk6ft4swxmozqrfnzlir3n272eaw465vytxqpuk7ojs2ruvi7ylq
    ONTO m1qnjiaz5etcgqcpkmosolg3oqnw5nczeltyyiwf7nlw6lssc3f5ja
{
  ALTER TYPE default::Ideas {
      ALTER PROPERTY keywords {
          RESET CARDINALITY USING (SELECT
              .keywords 
          LIMIT
              1
          );
      };
  };
};
