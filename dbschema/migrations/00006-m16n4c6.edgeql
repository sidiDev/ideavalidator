CREATE MIGRATION m16n4c6jp6sham5jzqbenwlz6w3gghfdephuynuht2nn2lnkenx2sa
    ONTO m1xmqu322adrvsyc3afli3xvt6vxoffstkbabja4u3s4ntnu2otu4q
{
  ALTER TYPE default::Domain {
      DROP PROPERTY available;
      DROP PROPERTY isPremiumName;
  };
};
