# Idea validator project built using EdgeDB and Vercel AI SDK

## Getting Started

1. Clone the repository by running the following command:

```bash
git clone https://github.com/sidiDev/ideavalidator.git
```

2. After cloning the repository, navigate to the project directory:

```bash
cd ideavalidator
```

## EdgeDB Setup

This project uses [EdgeDB](https://edgedb.com/) as a database. You can install it by following the instructions:

- [Install EdgeDB CLI](https://www.edgedb.com/docs/intro/cli)

After installing the CLI, you can initialize the project by running the following command:

```bash
edgedb project init
```

Next, you can apply the schema migrations by running the following command:

```bash
edgedb migration apply
```

### Install Dependencies

This project uses [pnpm](https://pnpm.io/) as a package manager, but you can use `npm` or `yarn`.

You can install the dependencies by running the following command:

```bash
pnpm install
```

## Environment Variables

This project uses Google APIs for oauth for users authentication. And Google Ads to generate keywors search volume ...etc

To find these API keys below, go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

```
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=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
NEXTAUTH_SECRET
```

And to find these API keys below, go to [Google Ads](https://ads.google.com/aw/apicenter)

```
GOOGLE_API_DEV_TOKEN
GOOGLE_API_CUSTOMER_ID
GOOGLE_API_KEY
GOOGLE_API_PRIVATE_KEY
GOOGLE_API_CLIENT_EMAIL
GOOGLE_API_TOKEN_CLAIM_CUB
```

## Generate the Types of EdgeDB

To generate the types for the EdgeDB schema, you can run the following command:

```bash
pnpm generate:all
```

It runs npx @edgedb/generate interfaces and npx @edgedb/generate edgeql-js to generate the types. You can also run these commands separately if you want.

You will find the generated types in the dbschema directory.

## Development Server

First, run the development server:

```bash
pnpm dev
```

## Learn More

To learn more about the stack used in this project, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn more about Next.js.
- [EdgeDB with Next.js](https://docs.edgedb.com/guides/tutorials/nextjs_app_router) - Learn how to setup EdgeDB in Nextjs.
- [EdgeDB Auth with Nextjs](https://authjs.dev/getting-started/adapters/edgedb) - Learn to use authjs in Nextjs with EdgeDB.
- [Vercel AI SDK](https://sdk.vercel.ai/docs/introduction) - Learn how to use AI in your Nextjs app.
- [Deployement](https://www.edgedb.com/blog/vercel-edgedb-branches-workflow-and-hackathon-alert) - How to deploy EdgeDB on the cloud and Nextjs on Vercel.
