---
layout: blog
title: "Next.js Blog Deployed on Netlify #2: Going Live with Netlify"
description: "Part 2 of a 3 article series. Follow along as I walk through the
  steps of deploying a Next.js application onto Netlify. "
date: 2021-02-08T20:53:40.676Z
thumbnail: /images/uploads/next-netlify.png
code:
  code: a
---
Welcome back to part 2 of my series on creating and deploying a Next.js blog onto Netlify. In this part, we'll go over the steps to deploy our previous Next application onto Netlify. The steps detailed in this article will be applicable to any Next.js application, but if you're interested in learning how to use Next to create a blog and haven't read my previous article, you can check it out [here](https://www.nam.codes/blog/creating-a-next-js-blog-powered-by-netlifycms-and-deploying-it-on-netlify). 

Before we get started, this tutorial assumes you have a working git repository for your application as it is necessary to deploy on Netlify. The version control system we'll be using to store our code is Github. If you don't already have a repository and are interested in learning how to add your existing project to a Github repository, you can follow the steps I outline in my [previous article](https://www.nam.codes/blog/creating-a-next-js-blog-powered-by-netlifycms-and-deploying-it-on-netlify). 

## Linking to Your Github and Repository

To start off, navigate to <https://app.netlify.com/start>. If you don't already have an account, now is when Netlify would request for you to create one. Once you're signed into your account, you'll be prompted to connect with your Github account. You can follow the authentication process and once done, Netlify will list all of your current repositories for you to choose from. After you've chosen the appropriate repository, you'll be asked to specify a build command for Netlify to use and a directory to publish. 

1. The build command to enter for Next projects is `next build`.
2. Leave the publish directory blank.

After you click "Deploy," there is just one more step and you'll be done. Now you need to install the "Next on Netlify Plugin." It's as simple as following [this link](https://app.netlify.com/teams/namnguyen21/plugins/@netlify/plugin-nextjs/install) and choosing which of your applications you'd like to add it to. After you've chosen the appropriate project, you're done! 

Now, whenever you push a commit to your master branch, Netlify will generate a new build of your Next project.