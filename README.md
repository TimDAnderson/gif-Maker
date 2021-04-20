# gif-Maker

## How to install and run:

```bash
$ npm install
$ mysql -u root < db/schema.sql
$ grunt
$ npm run start
```

## App Architecture:
This is a simple web application that converts any video file to a .gif.

![image](https://user-images.githubusercontent.com/71040019/115314223-a04c0600-a129-11eb-8f77-51ecab8132d0.png)

## Dependencies:
```
- ffmpeg must be installed and in the system path
- mysql must be installed and in the system path, set login info
```

## Notes from the developer:

This was a fun project to help sharpen my full stack development skills.  Users can upload any type of video.  The express server uses a ffmpeg npm library for automatic conversion to a .gif file format.  The .gif media assets are uploaded to an AWS S3 bucket.  The text URL strings are persisted in a MySQL relational database and are available to the client at any time.