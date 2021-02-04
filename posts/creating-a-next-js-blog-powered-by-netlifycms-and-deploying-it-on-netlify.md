---
layout: blog
title: Creating a Next.js Blog Powered by NetlifyCMS, and Deploying it on Netlify
description: Follow me as I'll walk through the steps of using Next.js to create
  a blog, NetlifyCMS to create and provide content, and Netlify to deploy the
  blog effortlessly. We'll cover topics such as dynamic routing, static site
  generation, and CMS integration.
date: 2021-02-04T18:48:23.423Z
thumbnail: /images/uploads/next-blog-netlify.png
code:
  lang: easybuild
  code: asf
---


Creating a personal blog has always been a goal of mine as it allows a medium for communication and interaction. Instead of using an established blogging platform, such as [Medium](https://medium.com/) or [Dev](dev.to), I wanted to build my own blog in order to learn more and add to my skillset. Prior to building, I had a couple of specific requirements for my blog prior to choosing the right tools for the job. 

1. The blog must utilize static site generation (SSG) to optimize user experience.
2. It must use a CMS to allow for easier content creation.

Without going too much into detail as to why I chose Next and NetlifyCMS to satisfy these requirements, it essentially boiled down to Next's ability to provide static site generation, as well as server-side rendering, and the ability to deploy the site on Netlify with quick and easy integration with their CMS. 

Hopefully by the end of this article, you will be able to see how easy it is to get your own blog up and running. So lets get right to it. 

## Configuring the Next Project

To get your Next project set up, it's as easy as navigating to your preferred working directory from your terminal and running `npx create-next-app sample-blog` (this assumes you have node installed on your machine).  You can go ahead and change `sample-blog` to whatever you want your project to be named. You should now have the following file structure in your directory upon completion: 

![Next.js File Structure](/images/uploads/screen-shot-2021-02-04-at-2.29.20-pm.png "Next.js File Structure")

### Connecting Your Project with Github

This step can be skipped for now, although you will eventually need your project hosted in a Git repository for it to be deployed on Netlify. To create a repository from your current working directory (assuming your versional control software of choice is Github), you must: 

1. Create a new repository on Github and copy your repository's url similar to how you would when cloning a repo.
2. In your command line, navigate into the root of your project and run `git init`.
3. Run `git add .` and subsequently `git commit -m "your commit message"`.
4. Now you're ready to link your directory to your repository. Run `git remote add origin yourgitrepourl.com`.
5. `git push origin master`

Now your working directory is linked to your repository and from here on out, you can add, commit, push, and pull as you wish! 

## A Brief Intro to Markdown and Front Matter

We're almost at the point we can start coding, so hang with me. First, we need to know a bit about markdown templating, as NetlifyCMS will create markdown (.md) files in our git repository for our Next site to statically generate. 

In markdown files, there is something known as front matter. Front matter differs from the main "body" of markdown files. Assuming you're familiar with HTML, front matter is similar to the <head /> in an html file - it is designated to identify the markdown file and you can customize this however you want. To better understand front matter, create a folder at the root of your project titled 'posts', create an 'example.md' file, and copy & paste the following into the file:

```markdown
---
# Front matter
title: Sample Blog Post
author: Nam Nguyen
description: This is the description for this sample blog post
date: Feb 4, 2021
# End front matter
---
# Body text
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

```

The first thing you might notice is the usage of "---" as delimiters. This is to indicate that the information between the two "---" is considered as front matter when parsing your markdown files. In the example above, we have four data points in the front matter for the title, author, description, and date of the blog post. 

Now that you're aware of front matter, we can get started coding! 

## Creating the Blog

In the creation of a blog, we can assume some basic blog functionality:

1. A /blog route that lists all of our existing blog posts.
2. A /blog/blog-post route that displays a specific blog post.

To get started, navigate to your pages directory. Next.js uses a file-based routing system. This comes with a specific set of rules such as:

* Folder and file names are used for routing purposes.
* Index.js files will create a route based on its parent folder's name (i.e. /pages/blog/index.js will create a route at yourwebsite.com/blog.

Knowing this, we can go ahead and create a /blog folder in our /pages folder, and in there, create an index.js file. This is where all of our blog posts will we be displayed.

### Displaying All of the Blog Posts

From the /blog/index.js file, we must export a react component to be displayed in our browser. 

```
export default function BlogList(){
  // page info
}
```

Now comes a little bit of Next.js magic. Since we are using Next for static site generation, we must let the Next compiler know that so it can compile everything needed at build time. For example, we'll have all of our blog posts that we want to display in our /posts directory. We want Next to know that, so that when Next builds our application, it can gather all the assets (blog posts). For the purpose of listing all of our blog posts, add the following adjustments to your index.js file:

```
import fs from 'fs'

export default function BlogList(){
  // page info
}

export const getStaticProps = () => {
  const files = fs.readdirSync('posts');
  
  const trimmmedFiles = files.map(file => file.replace(".md","")
  
  return {
    props : {
      slugs: files
    }
  }
}
```