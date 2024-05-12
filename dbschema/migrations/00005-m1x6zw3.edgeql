CREATE MIGRATION m1x6zw3ufjonfxqkcylpica43wjbcdg6ufhoysgmx45jhvjkyncnjq
    ONTO m1hk6ft4swxmozqrfnzlir3n272eaw465vytxqpuk7ojs2ruvi7ylq
{
  ALTER TYPE default::Ideas {
      DROP PROPERTY keywords;
  };
  ALTER TYPE default::Ideas {
      CREATE MULTI LINK keywords: default::Keywords;
  };
};
