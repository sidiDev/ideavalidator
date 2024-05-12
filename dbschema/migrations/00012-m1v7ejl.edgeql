CREATE MIGRATION m1v7ejlapgcayoxaadiqesipnkdfnj7carjwhkrkwz6yurvnpwxgya
    ONTO m16ekq2fuurtvnv57twq2lqgipq3sidai4lxhllaqukj7cn74npsdq
{
  CREATE TYPE default::Test {
      CREATE PROPERTY jds: std::str;
  };
};
