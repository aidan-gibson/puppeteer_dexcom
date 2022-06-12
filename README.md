run node rtdex.js to run it. can view it going via chrome://inspect

Will get confirmation email on every run

Code is there to make sure 1 month has passed in between runs. Now I can just run on boot 
cd ~/WebstormProjects/puppeteer_dexcom&&node rtdex.js

Note: I must cd and not do it all in one go, like node /Users/aidangibson/WebstormProjects/puppeteer_dexcom/rtdex.js, because the txt file are saved as relative paths