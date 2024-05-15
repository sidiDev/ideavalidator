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
