# Introduction
This is an app for world-building

# Scripts

## ```npm```

To get started, install all the packages.

## ```npm start```

The run the app in development

## ```npm run package```

To compile the code into basic html, css, js and required electron stuff

## ```npm run make```
To build distributable file like `.exe` file. The file could be found inside `/out` folder

## ```npm run publish```

To publish the app to select url or in a form that can be shared with other users.

## ```npm run lint```

To lint the files

# ```git```
The `main` branch is protected. To make any update use `dev-` for example: `dev-init`

```sh
git branch dev-fix-lint
git checkout dev-fix-lint
```

# Workspace
This is where all the projects will be saved. It follows this pattern

```

📁 Workspace
├── 📁 projectName.sbnd
    ├── ⚙️ .config
    ├── 📁 collection
        ├── ⚙️ .template
        ├── 📄 document1.document
        ├── 📄 document2.document
├── 📁 The Lord of the Rings.sbnd
    ├── ⚙️ .config
    ├── 📁 characters.collection
        ├── ⚙️ .template
        ├── 📄 Gandalf.document
        ├── 📄 Bilbo Baggins.document
        ├── 📄 Boromir.document
        ├── 📄 Gimli.document
        ├── 📄 Gollum.document
        ├── 📄 Legolas.document
        ├── 📄 Aragon.document
        ├── 📄 Frodo.document
        ├── 📄 Galadriel.document
```