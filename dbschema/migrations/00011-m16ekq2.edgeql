CREATE MIGRATION m16ekq2fuurtvnv57twq2lqgipq3sidai4lxhllaqukj7cn74npsdq
    ONTO m1bfau37b2upjbrildweqwt2wwg6lilt2mabxxnavcudlipxczkrva
{
  ALTER TYPE default::Ideas {
      CREATE REQUIRED PROPERTY userId: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
