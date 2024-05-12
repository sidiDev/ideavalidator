CREATE MIGRATION m1zoeh5fv4dyolazmubezi44lyvhfqxknlcfeo2sekf6kypvvt5qga
    ONTO m1v7ejlapgcayoxaadiqesipnkdfnj7carjwhkrkwz6yurvnpwxgya
{
  ALTER TYPE default::Ideas {
      CREATE REQUIRED PROPERTY description: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
  DROP TYPE default::Test;
};
