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

    type Domain {
    required domain: str;
    required name: str;
    }

    type KeywordMetrics {
    required avgSearches: int64;
    required c: str;
    required cIx: int64;
    required high: int64;
    required low: int64;
    }

    type Keywords {
    required text: str;
    required metrics: KeywordMetrics;
    }

    type Competitors {
    required link: str;
    required name: str;
    required description: str;
    }

    type RedditRelatedPostData {
    required subreddit: str;
    required title: str;
    required selftext: str;
    required url: str;
    required created: int64;
    }

    type Ideas {
        required keyword: str;
        required slug: str;
        required userId: str;
        required description: str;
        keywords: array<json>;
        domainList: array<json>;
        topCompetitors: array<json>;
        redditRelatedPosts: array<json>;
    }
}

# Disable the application of access policies within access policies
# themselves. This behavior will become the default in EdgeDB 3.0.
# See: https://www.edgedb.com/docs/reference/ddl/access_policies#nonrecursive
 
using future nonrecursive_access_policies;