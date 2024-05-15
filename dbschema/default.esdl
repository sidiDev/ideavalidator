using extension auth;
module default {
    type User {
        property name -> str;
        required property email -> str {
            constraint exclusive;
        };
        property emailVerified -> datetime;
        property image -> str;
        multi link accounts := .<user[is Account];
        multi link sessions := .<user[is Session];
        property createdAt -> datetime {
            default := datetime_current();
        };
    }
 
    type Account {
       required property userId := .user.id;
       required property type -> str;
       required property provider -> str;
       required property providerAccountId -> str {
        constraint exclusive;
       };
       property refresh_token -> str;
       property access_token -> str;
       property expires_at -> int64;
       property token_type -> str;
       property scope -> str;
       property id_token -> str;
       property session_state -> str;
       required link user -> User {
            on target delete delete source;
       };
       property createdAt -> datetime {
            default := datetime_current();
        };
       constraint exclusive on ((.provider, .providerAccountId));
    }
 
    type Session {
        required property sessionToken -> str {
            constraint exclusive;
        };
        required property userId := .user.id;
        required property expires -> datetime;
        required link user -> User {
            on target delete delete source;
        };
        property createdAt -> datetime {
            default := datetime_current();
        };
    }
 
    type VerificationToken {
        required property identifier -> str;
        required property token -> str {
            constraint exclusive;
        };
        required property expires -> datetime;
        property createdAt -> datetime {
            default := datetime_current();
        };
 
        constraint exclusive on ((.identifier, .token));
    }

    type Ideas {
        required keywords: Keywords;
        required userId: str;
        required slug: str;
        required description: str;
        required createdAt: int64;
        multi domainList: Domain;
        multi topCompetitors: Competitor;
        multi redditRelatedPosts: RedditPost;
    }

    type Keywords {
        required keyword: str;
        multi keywords: Keyword;
    }

    type Keyword {
        required metrics: Metrics;
        required text: str;
    }

    type Metrics {
        required c: str;
        required avgSearches: int64;
        required cIx: int64;
        required low: int64;
        required high: int64;
        required g: Growth;
    }

    type Growth {
        required m3: int64;
        required m6: int64;
        required m12: int64;
    }

    type Domain {
        required name: str;
        required domain: str;
    }

    type Competitor {
        required link: str;
        required name: str;
        required description: str;
    }

    type RedditPost {
        required data: RedditData;
    }

    type RedditData {
        required title: str;
        required subreddit: str;
        required selftext: str;
        required created: int64;
        required url: str;
    }
}

# Disable the application of access policies within access policies
# themselves. This behavior will become the default in EdgeDB 3.0.
# See: https://www.edgedb.com/docs/reference/ddl/access_policies#nonrecursive
 
using future nonrecursive_access_policies;