# Packages viewer

### Ubuntu installed packages web interface

![Home page](https://i.imgur.com/NyTvgRt.png)

---

Web interface for browsing installed packages in Ubuntu located in
```sh
var/lib/dpkg/status
```

App shows list of installed packages alphabetically with clickable package names.
The following information is included:
 * Name
 * Description
 * The names of the packages the current package depends on both installed and not installed (not clickable)
 * The names of the packages that depend on the current package
 * The dependencies and reverse dependencies are clickable and the user can navigate the package structure by expanding/collapsing individual packages.

---

### Tech stack
Movies catalog uses several projects to work properly:

* [Node.js] - JavaScript runtime built on Chrome's V8 JavaScript engine
* [React] - Javascript library for building user interfaces

---

### Installation

* Download and extract the [latest version of Packages viewer](https://github.com/paratagas/packages-viewer)
* Install the dependencies and devDependencies:
```sh
$ cd packages-viewer
$ npm install
```

---

### Launching (in development mode)
```sh
$ npm run dev
```

After that your web application is available at:

http://localhost:3000

---

### License

MIT

 [Node.js]: <https://nodejs.org/>
 [React]: <https://facebook.github.io/react>
