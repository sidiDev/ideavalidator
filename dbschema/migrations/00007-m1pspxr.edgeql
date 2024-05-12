CREATE MIGRATION m1pspxrbqvhzkpozcyjgsvymrxiimdacdqgky3bfdcojujhniuyola
    ONTO m1eaw2yeyvp7vqc65lmk6fwvbjpm7esfnpvffpq3bzm7jbkj3pyhuq
{
  ALTER TYPE default::Ideas {
      DROP LINK keywords;
  };
  ALTER TYPE default::Ideas {
      CREATE PROPERTY keywords: array<std::json>;
  };
  DROP TYPE default::Test;
};
