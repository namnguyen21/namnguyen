---
layout: blog
title: "Next.js Blog Deployed on Netlify #1: Blogging with Next"
description: As part 1 of a 3 article series, I'll cover the basics of how to
  create a blog with Next.js.
date: 2021-02-04T18:48:23.423Z
thumbnail: /images/uploads/next-blog-netlify.png
code:
  lang: easybuild
  code: asf
---
Welcome to part 1 of a 3 article series to kickstart my own tech blog. In it, I will cover the process in which I utilized Next.js and Netlify to create this blog you're on right now. 

Before we dive into it, maybe you'd like to know why I chose Next.js and Netlify for this specific use case. Let me lay out the two primary requirements I had for this blog.

1. The blog must utilize static site generation (SSG) to optimize user experience and page loading times.
2. It must use a content management system (CMS) to allow for easier content creation.

As a React developer, I had two options when looking for SSG: Next and Gatsby. The reason I ended up going with Next is because Next provides support for server-side rendering as well. Thus, by learning the architecture and patterns of a Next project, I could apply that knowledge to a wider array of use cases. 

Then I was left with the decision of which CMS to use. There are many different CMS options to choose from; the most notable being WordPress. The decision to go with NetlifyCMS was one of convenience and ease. Next.js projects are easily deployed on Netlify with built-in plugins created by the Next team, so I knew that I wanted to deploy and host on Netlify. Therefore using Netlify's CMS would allow for easy integration and reduce any headaches by introducing new players into the mix. 

With the back story out of the way, lets get right to it! In this first part of the series, we'll walk through the steps of creating a Next.js template capable of parsing and displaying markdown files, which is how NetlifyCMS stores your content. 

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
author: John Doe
description: This is the description for this sample blog post
date: Feb 4, 2021
---
# Body 
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
```

The first thing you might notice is the usage of "---" as delimiters. This is to indicate that the information between the two "---" is considered as front matter when parsing your markdown files. In the example above, we have four data points in the front matter for the title, author, description, and date of the blog post. 

Now that you're aware of front matter, we can get started coding! 

## Creating the Blog

In the creation of a blog, we can assume some basic blog functionality that the website has:

1. A /blog route that lists all of our existing blog posts.
2. A /blog/:blog-post route that utilizes dynamic url's to display a specific post.

To get started, navigate to your pages directory. Next.js uses a file-based routing system. This comes with a specific set of rules such as:

* Folder and file names are used for routing purposes.
* Index.js files will create a route based on its parent folder's name (i.e. /pages/blog/index.js will create a route at yourwebsite.com/blog.

Knowing this, we can go ahead and create a /blog folder in our /pages folder, and in there, create an index.js file. This is where all of our blog posts will we be displayed.

### Displaying All of the Blog Posts

From the /blog/index.js file, we must export a react component to be displayed in our browser. 

```javascript
export default function BlogList(){
  // page info
}
```

Now comes a little bit of Next.js magic. Since we are using Next for static site generation, we must let the Next compiler know that so it can compile everything needed at build time. For example, we'll have all of our blog posts that we want to display in our /posts directory. We want Next to know that, so that when Next builds our application, it can gather all the assets (blog posts). For the purpose of listing all of our blog posts, add the following adjustments to your index.js file:

```javascript
import fs from "fs";
import Link from "next/link"


export default function BlogList({ slugs }) {
  return (
    <ul>
      {slugs &&
        slugs.map((slug, i) => {
          return (
            <ul key={i}>
              <Link href={`/blog/${slug}`} >
                <a>{slug}</a>
              </Link>
            </ul>
          );
        })}
    </ul>
  );
};

export const getStaticProps = async () => {
  const files = fs.readdirSync('posts');
  const trimmmedFiles = files.map(file => file.replace(".md",""))
  return {
    props : {
      slugs: trimmedFiles
    }
  }
}
```

Whew, that's quite a lot to take in. It might look like a lot but it's quite easy to digest so let's break it down.

1. The most noticeable change is probably the addition of a new async `getStaticProps() `function. Take note of the name and functionality of this function as it's vital to static site generation. This function must be named exactly the way it's named since it is a way for Next to generate static assets. In it, we're using the "fs" module to read our 'posts' directory which returns an array of filenames, mapping over the array of filenames to strip them of the tailing ".md" and returning an object containing props for our BlogList component.

   But hold on a second... If you're like me, you might be saying to yourself "I thought we can't use the "fs" module when working on the front end!" You'd be correct in that sentiment, however, it's important to remember that Next works server-side. 
2. This "props" object will be passed to our BlogList component. Look similar? That's because it is React's prop system! Remember, Next.js is a React framework 🤯 .
3. We then iterate over the newly created array of blog slugs and create a list of links pointing to their unique routes. 

   You might notice that we're using Next's built in Link component. This component comes out of the box and is how you handle routing in Next applications. 

Just like that, we now have our "/blog" route working. You can start up your development server by running `npm run dev` in the command line and open up "localhost:3000/blog" to see the fruits of your labor. 

### Displaying Unique Blog Posts

The next, and last step, in leveraging Next.js to create a blog is to display each unique post. In order to do so, we'll need some dynamic routing. For example, when a user visit "yourwebsite.com/blog/example-blog-post," we expect our site to display all the content for our post titled "Example Blog Post."

Luckily for us, Next provides a nifty, simple way of handling dynamic routing. Since we'll want our posts to be under the "/blog" route, we'll need to work in the "/blog" directory. To create a page containing dynamic routes, we'll create a file named "\[slug].js." Pause. Did we just use square brackets in a filename? Yes, yes we did. That's a way of letting Next.js know that we're going to use dynamic routing. 

Same as before, we'll initialize this file with some basic React component architecture as well as our new friend `getStaticProps()`.

```javascript
export default function Post() {
  return <div></div>
}

export const getStaticProps = async () => {

}
```

Before we add anything else, we'll need to let Next know of all of our possible "/blog/" routes. After all, we are using static assets so therefore all of our routes should be known at build time. To do this, we introduce a new helper function for Next: `getStaticPaths()`. Add the following code and we'll go over the new changes.

```javascript
import fs from "fs";

export default function Post() {
  return <div></div>
}

export const getStaticPaths = async () => {
  const files = fs.readdirSync("posts");
  
  const paths = files.map((file) => ({
      params: {
        slug: file.replace(".md", ""),
      },
    });
    
  return {
   paths, 
   fallback: false;
 }
  
}

export const getStaticProps = async () => {

}
```

Let's break that down.

1. First, we're reading all the filenames from our posts directory - same as before. 
2. We map over our list of file names, and return an object for each file that contains a `params` object. This `params` object is specifically named so do not change it. It lets Next know of our url parameters for dynamic routing. 
3. This params object contains a `slug` property which is the filename without the trailing ".md." Be mindful, this `slug` key directly correlates to the filename you are working out of (i.e. \[slug].js). If you opted to name your file differently, then you must also change the `slug` property to the correct name. 
4. The `fallback` property is also required. When setting it to false, if a user goes to a non-existent route, they'll receive a 404 page. 

With this helper function, we've successfully let Next know of all of our possible dynamic routes. Now that we have that finished, we can focus on fetching our blog content from the specific markdown file and displaying that information. Add the following to your `getStaticProps()`:

```javascript
import path from "path"; // add to top of file

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const markdown = fs
    .readFileSync(path.join("posts", slug + ".md"))
    .toString();
};
```

Something new introduced to this `getStaticProps()` is the addition of the context parameter. Next creates an object that's passed into the function, and we can access the unique url parameters of each dynamic route by accessing the `context.params` object. Here, we have destructured the `slug` key, which once again, correlates specifically to the filename. Thus, you can change it accordingly. After that, we simply read the contents of the specific markdown file using the "fs" module (don't forget to import both the "fs" and "path" modules to the top of your file), and then converted the file to a string. Now we have the contents of our markdown file. 

Now what? Remember our discussion on front matter earlier? Now we need to parse our file into two parts: the front matter and the body. Fortunately, there are libraries out there to help with this. There are a few to choose from but in this example we'll be using "gray-matter" to split our markdown into the front matter and body, and "marked" to parse our body into valid HTML. In your command line, run `npm i --save gray-matter marked` and then now we can add some code to parse our markdown.

```javascript
import matter from "gray-matter" // add to top of file
import marked from "marked" // add to top of file

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const markdown = fs
    .readFileSync(path.join("posts", slug + ".md"))
    .toString();

  const parsedMarkdown = matter(markdown);

  const htmlString = marked(parsedMarkdown.content);

  return {
    props: {
      htmlString,
      data: parsedMarkdown.data,
    },
  };
};
```

In the above code, we:

1. Used the `matter` library to parse our markdown. This created an object with the properties `data` and `content`. The data contains all of our front matter in the form of an object.
2. We then used the `marked` library on our content to parse our markdown body and create valid HTML.
3. Finally, like before, we returned both as props to be consumed by our page component. 

Now that we have the proper information to be displayed on our page, let's display it! 

```javascript
export default function Post({htmlString, data}) {
  return <div dangerouslySetInnerHTML={{__html: htmlString}}></div>
}
```

And just like that, by setting the inner html of our component with the HTML generated by our `getStaticProps()`, we can now display our markdown content! Now, what about that data from our front matter? Well, in comes Next.js with another handy tool: `next/head`. 

```javascript
import Head from "next/head";

export default function Post({htmlString, data}) {
  return (
    <>
      <Head>
        <meta name="description" content={data.description} />
        <meta name="author" content={data.author} />
        <title>{data.title}</title>
      </Head>
      <div dangerouslySetInnerHTML={{ __html: htmlString }}></div>
    </>
  );
}
```

What we now added to our component is the Head component provided by Next.js and used our front matter data to fill in meta tags for our page. Now we've added some vital information for SEO purposes in just a few lines of code. Neat! 

And... Voila! You've now successfully coded the logic required to read and display blog posts. In the next part of this series, we'll work on deploying this current project to Netlify so we can get a live site up and running.