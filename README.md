![SWD14 logo](http://i.imgur.com/ce4TSEU.jpg)

# Rich Internet Applications - Code Snippets Project
_Simone Hierhold, Krenn Benjamin [SWD14]_

## Table of Contents
1. [Installation](#Installation)
1. [Starting The Application](#Installation)

**Installation**
<br>
First clone the repository by running:<br>
`$ git clone https://git-iit.fh-joanneum.at/hierhold14/RIA_Cheat-App.git`
<br><br>
Afterwards run:<br>
`$ npm install`
<br>
to install the needed dependencies.
<br><br><br><br>
**Starting The Application**
<br>
To start the application run:<br>
`$ npm start`
<br>
or if you use [**supervisor**](https://www.npmjs.com/browse/keyword/supervisor)<br>
`$ supervisor bin/www`
<br>
<br>
now the application is accessible via a browser of your choice by navigating to:<br>
`http://localhost:3000`
<br><br><br><br>
**General Information And Acknowledgements**
<br>
Used technologies:
<br>
![nodejs logo](https://cdn4.iconfinder.com/data/icons/logos-3/456/nodejs-new-pantone-black-128.png)&nbsp;
![express logo](http://nodejs-cloud.com/img/128px/expressjs.png)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
![mongo db logo](https://community.logentries.com/wp-content/uploads/2015/03/mongodb-pack-icon.png)
<br>
![jade logo](https://d13yacurqjgara.cloudfront.net/users/11525/screenshots/541227/dribble_f_teaser.png)&nbsp;&nbsp;
![intellij logo](https://chocolatey.org/content/packageimages/IntelliJIDEA.2016.0.png)&nbsp;&nbsp;
![javascript logo](http://www.devpointlabs.com/assets/javascript/javascript-icon-59b52f096f36f476bbdfac982a25240583d483b1157b76771e59077025f62d38.png)
<br><br>
Special thanks to:
* Mr. DI. Feiner: _for his outstanding lecture._
* &#9749; : _for keeping us awake._

<br><br>
![StackOverflow API call](http://i.imgur.com/JTvQiLd.png)
popular Stack Overflow question will be returned if there is no entry in database yet

![Add Snippet](http://i.imgur.com/KtbwPtJ.png)
add a new code snippet to the database

![results](http://imgur.com/1wCToNI.png)
if the topic is available in database, we will queue it first
with the "result Result" button the choosen entry will be added to the browsers offline storage (in case if there is no internet connection during an exam ;) ) 


