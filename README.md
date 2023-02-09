# 2023 revisit
Address works if slowMo: 250
Submit not work

# old
lastrun.txt is receiving the date in the wrong format (should be in ms)

still not working.

pup IDE mostly works (just doesn't click addr at end)

tsconfig
swapped "lib": ["es2015", "es2016", "es2017"], with "lib": ["ES2021"],

target es2017 with ES2021
# og notes
run node rtdex.js to run it. can view it going via chrome://inspect

Will get confirmation email on every run

Code is there to make sure 1 month has passed in between runs. Now I can just run on boot 
cd ~/WebstormProjects/puppeteer_dexcom&&/opt/homebrew/bin/node rtdex.js

Note: I must cd and not do it all in one go, like node /Users/aidangibson/WebstormProjects/puppeteer_dexcom/rtdex.js, because the txt file are saved as relative paths
I also must specify path to node

As I'm opting to run on startup, THAT provides the necessary randomness for this. (I mean if I'm rebooting consistently, not really?? but honestly doesn't matter too much, I just want it to be not the exact same time every month).

I'm running on startup via Keyboard Maestro; I want to not have to think about this and I trust Keyboard Maestro to keep its shit together more than I trust Apple not to brick launchctl/launchd. Backup of Keyboard Maestro macro attached here.
