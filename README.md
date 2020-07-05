# media-manager
This Project will enable you to Upload and View images(jpg) and videos(mp4).

## Technology used:
* .NET Core
* EF Core (code first migration)
* Angular 8

## Getting started
### Setting up NPM packages.
* Install [Node.js](https://nodejs.org/en/download/).
* Open cmd.
* Go to media-manager\web-manager\ClientApp directory and install npm packages.
```
npm install
```
### Creating Database using [Sqlite](https://www.sqlite.org/index.html).
* Open project solution.
* Set `web_manager` as Startup Project.
* Open `Package Manager Console` and set `model-manager` as Default Project.

After creating media-manager DB you can use [DB Browser for SQLite](https://sqlitebrowser.org/) to view the Database.

### List of NPM Packages used:
* Angular
* [Bootstrap](https://www.npmjs.com/package/bootstrap)
* [videogular2](https://www.npmjs.com/package/videogular2)
* [angular-file](https://www.npmjs.com/package/angular-file)

### List of NuGet Packages used:
* Microsoft.EntityFrameworkCore.Sqlite
* Microsoft.EntityFrameworkCore.Tools
* Microsoft.AspNetCore.SpaServices.Extensions
* NETStandard.Library

### Task Lists
- [x] Allow uploading and persisting .jpg and .mp4 files
- [x] Show a UI where users can upload new files, and show the list of files uploaded so far
- [x] Provide a way to "preview" the uploaded files.  For images, we want to see the image, and for mp4's, play the video
- [ ] Write basic tests for your code, and document a way to run them

### Nice to have:
- [ ] Generate code coverage for your tests, and document how coverage stats can be generated
- [ ] Add a login mechanism, and allow each user to have their own list of files
- [ ] Add a way to associate a title, description and tags with a file and have those changes persist.  Allow for filtering the list of files with search terms that can match these new fields
- [ ] Use S3 or some other cloud-based storage for the files
- [ ] In addition to mp4 and jpg, support pdf files, including the ability to render and preview them
- [x] Use a responsive layout that works and looks great on desktops and mobile devices
- [x] Add player controls when previewing mp4 files.  Include controls that allow for:
  - [ ] Skipping forward and back 10 seconds
  - [x] Pause/Play
  - [x] Speed up/slow down playback
