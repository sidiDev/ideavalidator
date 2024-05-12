CREATE MIGRATION m16dcggy75aif3c2owarnrr3e27w6tsjvla63d53pcug6xxyfidoca
    ONTO m1pspxrbqvhzkpozcyjgsvymrxiimdacdqgky3bfdcojujhniuyola
{
  CREATE TYPE default::Test {
      CREATE PROPERTY ss: std::str;
  };
};
