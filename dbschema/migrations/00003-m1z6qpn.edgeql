CREATE MIGRATION m1z6qpn3a36cv23rlihifflem6rmw6iy5pmuouuixm5y4i4jjgaeha
    ONTO m1ingrmyyqdmz5d4twhalks6iu2qaq27s4npfgmhqlwmzqwevcdwwq
{
  ALTER TYPE default::Ideas {
      ALTER PROPERTY createdAt {
          SET TYPE std::int64;
      };
  };
  DROP TYPE default::Test;
};
