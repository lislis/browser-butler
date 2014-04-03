# BrowserButler

## What is this for?

This actually for your mental health.  
BrowserButler is meant to live in a subdirectory on your client's server. Actually only the /dist/ folder.  
So when your client calls you and says the site is broken, but has no idea what computer or browser they're using, just tell them to go to htt://yourclientproject.com/browser (or whatever) and let them read the text out loud (or send you an email).  

## Can BrowserButler detect everything?

Unfortunately no. I only have access to limited devices and possibilities and therefore userAgent stings.  
If you want to add some, open an isssue and paste your userAgent string in there. Don't forget to tag it as userAgent.  

## There are other sites like this, why not use those?

I know, like http://whatsmybrowser.org, right? For two reasons:  
- whytsmybrowser is not open source. There is no chance to see how it deals with the userAgent.  
- try to explain to a client who doesn't know what browser they're using the neccessity to visit a completely unrelated webpage. Seriously.